document.addEventListener("DOMContentLoaded", () => {
  const books = [
    { book: "Genesis", chapters: 50 },
    { book: "Exodus", chapters: 40 },
    //... (remaining books here)
    { book: "Revelation", chapters: 22 }
  ];

  const colors = ['#acac9c', '#948c8c', '#c7c4cc', '#bbbcb8', '#b4b3b4'];

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function createBookOptions() {
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = '';
    books.forEach((book, index) => {
      const bookBox = document.createElement('div');
      bookBox.classList.add('book-box', 'vignette');
      bookBox.textContent = book.book;
      const color = getRandomColor();
      bookBox.style.backgroundColor = color;
      bookBox.style.setProperty('--vignette-color', color);
      bookBox.addEventListener('click', () => showChapters(book));
      booksContainer.appendChild(bookBox);
    });

    const searchBox = document.getElementById('search-box');
    booksContainer.appendChild(searchBox);
    searchBox.addEventListener('click', showSearchModal);
  }

  function showChapters(book) {
    const chaptersContainer = document.getElementById('chapters');
    chaptersContainer.innerHTML = '';
    for (let i = 1; i <= book.chapters; i++) {
      const chapterBox = document.createElement('div');
      chapterBox.classList.add('chapter-box', 'vignette');
      chapterBox.textContent = `${book.book} ${i}`;
      const color = getRandomColor();
      chapterBox.style.backgroundColor = color;
      chapterBox.style.setProperty('--vignette-color', color);
      chapterBox.addEventListener('click', () => showVerses(book.book, i));
      chaptersContainer.appendChild(chapterBox);
    }

    // Add RELOAD button
    const reloadBox = document.createElement('div');
    reloadBox.classList.add('reload-box');
    reloadBox.textContent = 'RELOAD';
    reloadBox.addEventListener('click', showBooksWindow);
    chaptersContainer.appendChild(reloadBox);

    chaptersContainer.scrollTop = 0;
    document.getElementById('books').style.display = 'none';
    chaptersContainer.style.display = 'block';
  }

  function showVerses(bookName, chapterNumber) {
    const filePath = `data/${bookName}.json`;
    fetch(filePath)
      .then(response => response.json())
      .then(data => {
        const bookData = data.chapters.find(chapter => chapter.chapter == chapterNumber);
        const versesContainer = document.getElementById('verses');
        versesContainer.innerHTML = '';
        bookData.verses.forEach((verse, index) => {
          const verseBox = document.createElement('div');
          verseBox.classList.add('verse-box', 'vignette');
          verseBox.textContent = `${verse.text}`;
          const color = getRandomColor();
          verseBox.style.backgroundColor = color;
          verseBox.style.setProperty('--vignette-color', color);

          const reference = document.createElement('div');
          reference.textContent = `(${bookName} ${chapterNumber}:${verse.verse})`;
          reference.classList.add('reference');
          verseBox.appendChild(reference);

          verseBox.addEventListener('click', () => copyVerseToPhotos(verseBox));
          versesContainer.appendChild(verseBox);
        });

        // Add RELOAD button
        const reloadBox = document.createElement('div');
        reloadBox.classList.add('reload-box');
        reloadBox.textContent = 'RELOAD';
        reloadBox.addEventListener('click', showBooksWindow);
        versesContainer.appendChild(reloadBox);

        versesContainer.scrollTop = 0;
        document.getElementById('chapters').style.display = 'none';
        versesContainer.style.display = 'block';
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  function showBooksWindow() {
    document.getElementById('books').style.display = 'block';
    document.getElementById('chapters').style.display = 'none';
    document.getElementById('verses').style.display = 'none';
  }

  function copyVerseToPhotos(verseBox) {
    html2canvas(verseBox).then(canvas => {
      canvas.toBlob(blob => {
        const verseText = verseBox.textContent.trim();
        const referenceMatch = verseText.match(/\(.*:\d+\)/);
        let reference = "";
        if (referenceMatch) {
          reference = referenceMatch[0].slice(1, -1);
        } else {
          console.warn("Verse reference not found in verseBox content. Using default filename.");
          reference = "verse_image.png";
        }

        const filename = `${reference}.png`;

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    });
  }

  function showSearchModal() {
    document.getElementById('search-modal').style.display = 'flex';
    document.getElementById('close-modal-btn').addEventListener('click', hideSearchModal);
  }

  function hideSearchModal() {
    document.getElementById('search-modal').style.display = 'none';
  }

  function performSearch() {
    const searchTerm = document.getElementById('search-field').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    books.forEach(book => {
      const filePath = `data/${book.book}.json`;
      fetch(filePath)
        .then(response => response.json())
        .then(data => {
          data.chapters.forEach(chapter => {
            chapter.verses.forEach((verse, index) => {
              if (verse.text.toLowerCase().includes(searchTerm)) {
                const verseBox = document.createElement('div');
                verseBox.classList.add('verse-box', 'vignette');
                verseBox.textContent = `${verse.text}`;
                const color = getRandomColor();
                verseBox.style.backgroundColor = color;
                verseBox.style.setProperty('--vignette-color', color);

                const reference = document.createElement('div');
                reference.textContent = `(${book.book} ${chapter.chapter}:${verse.verse})`;
                reference.classList.add('reference');
                verseBox.appendChild(reference);

                verseBox.addEventListener('click', () => copyVerseToPhotos(verseBox));
                resultsContainer.appendChild(verseBox);
              }
            });
          });
        })
        .catch(error => console.error('Error fetching data:', error));
    });
  }

  document.querySelector('.begin-search-box').addEventListener('click', performSearch);

  // Event listener for Enter key press in the search field
  const searchField = document.getElementById('search-field');
  searchField.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) { // 13 is the Enter key
      performSearch();
    }
  });

  createBookOptions();
});
