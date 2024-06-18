document.addEventListener("DOMContentLoaded", () => {
  const books = [
    { book: "Genesis", chapters: 50 },
    { book: "Exodus", chapters: 40 },
    { book: "Leviticus", chapters: 27 },
    { book: "Numbers", chapters: 36 },
    { book: "Deuteronomy", chapters: 34 },
    { book: "Joshua", chapters: 24 },
    { book: "Judges", chapters: 21 },
    { book: "Ruth", chapters: 4 },
    { book: "1 Samuel", chapters: 31 },
    { book: "2 Samuel", chapters: 24 },
    { book: "1 Kings", chapters: 22 },
    { book: "2 Kings", chapters: 25 },
    { book: "1 Chronicles", chapters: 29 },
    { book: "2 Chronicles", chapters: 36 },
    { book: "Ezra", chapters: 10 },
    { book: "Nehemiah", chapters: 13 },
    { book: "Esther", chapters: 10 },
    { book: "Job", chapters: 42 },
    { book: "Psalms", chapters: 150 },
    { book: "Proverbs", chapters: 31 },
    { book: "Ecclesiastes", chapters: 12 },
    { book: "Song of Solomon", chapters: 8 },
    { book: "Isaiah", chapters: 66 },
    { book: "Jeremiah", chapters: 52 },
    { book: "Lamentations", chapters: 5 },
    { book: "Ezekiel", chapters: 48 },
    { book: "Daniel", chapters: 12 },
    { book: "Hosea", chapters: 14 },
    { book: "Joel", chapters: 3 },
    { book: "Amos", chapters: 9 },
    { book: "Obadiah", chapters: 1 },
    { book: "Jonah", chapters: 4 },
    { book: "Micah", chapters: 7 },
    { book: "Nahum", chapters: 3 },
    { book: "Habakkuk", chapters: 3 },
    { book: "Zephaniah", chapters: 3 },
    { book: "Haggai", chapters: 2 },
    { book: "Zechariah", chapters: 14 },
    { book: "Malachi", chapters: 4 },
    { book: "Matthew", chapters: 28 },
    { book: "Mark", chapters: 16 },
    { book: "Luke", chapters: 24 },
    { book: "John", chapters: 21 },
    { book: "Acts", chapters: 28 },
    { book: "Romans", chapters: 16 },
    { book: "1 Corinthians", chapters: 16 },
    { book: "2 Corinthians", chapters: 13 },
    { book: "Galatians", chapters: 6 },
    { book: "Ephesians", chapters: 6 },
    { book: "Philippians", chapters: 4 },
    { book: "Colossians", chapters: 4 },
    { book: "1 Thessalonians", chapters: 5 },
    { book: "2 Thessalonians", chapters: 3 },
    { book: "1 Timothy", chapters: 6 },
    { book: "2 Timothy", chapters: 4 },
    { book: "Titus", chapters: 3 },
    { book: "Philemon", chapters: 1 },
    { book: "Hebrews", chapters: 13 },
    { book: "James", chapters: 5 },
    { book: "1 Peter", chapters: 5 },
    { book: "2 Peter", chapters: 3 },
    { book: "1 John", chapters: 5 },
    { book: "2 John", chapters: 1 },
    { book: "3 John", chapters: 1 },
    { book: "Jude", chapters: 1 },
    { book: "Revelation", chapters: 22 }
  ];

  const colors = ['#C3B49D', '#C3B49D', '#DED0B9', '#DED9B9', '#D8C4B6'];

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
    reloadBox.textContent = 'Back to the Books of the Bible';
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
        reloadBox.textContent = 'Back to the Books of the Bible';
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

  createBookOptions();
});
