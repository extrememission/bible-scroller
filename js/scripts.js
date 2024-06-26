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

  function createBookOptions() {
    // Your existing code for creating book options
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
      chapterBox.addEventListener('click', () => showVerses(book.book, i)); // Attach event listener correctly
      chaptersContainer.appendChild(chapterBox);
    }

    const reloadBox = document.createElement('div');
    reloadBox.classList.add('reload-box');
    reloadBox.textContent = 'Home';
    reloadBox.addEventListener('click', () => location.reload());
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
        const chapterData = data.chapters.find(chapter => chapter.chapter == chapterNumber);
        const verses = chapterData.verses;

        const versesContainer = document.getElementById('verses');
        versesContainer.innerHTML = '';

        verses.forEach((verse) => {
          const verseBox = document.createElement('div');
          verseBox.classList.add('verse-box', 'vignette');
          verseBox.innerHTML = `${verse.text}<div style="text-align: center;">${bookName} ${chapterNumber}:${verse.verse}</div>`;
          const color = getRandomColor();
          verseBox.style.backgroundColor = color;
          verseBox.style.setProperty('--vignette-color', color);

          versesContainer.appendChild(verseBox);
        });

        const reloadBox = document.createElement('div');
        reloadBox.classList.add('reload-box');
        reloadBox.textContent = 'RELOAD';
        reloadBox.addEventListener('click', () => location.reload());
        versesContainer.appendChild(reloadBox);

        versesContainer.scrollTop = 0;
        document.getElementById('chapters').style.display = 'none';
        versesContainer.style.display = 'block';

        // Event delegation for handling click on any verseBox
        versesContainer.addEventListener('click', (event) => {
          const clickedElement = event.target.closest('.verse-box');
          if (clickedElement) {
            const textToCopy = clickedElement.textContent;
            navigator.clipboard.writeText(textToCopy)
              .then(() => alert('Verse copied to clipboard'))
              .catch(err => console.error('Failed to copy text: ', err));
          }
        });
      })
      .catch(error => console.error('Error fetching verses:', error));
  }

  function showSearchModal() {
    document.getElementById('search-modal').style.display = 'flex';
  }

  function closeSearchModal() {
    document.getElementById('search-modal').style.display = 'none';
  }

  function closeSearchModalAndReload() {
    document.getElementById('search-modal').style.display = 'none';
    location.reload();
  }

  function showBooksWindow() {
    document.getElementById('books').style.display = 'block';
    document.getElementById('chapters').style.display = 'none';
    document.getElementById('verses').style.display = 'none';
  }

  function searchScriptures() {
    const searchField = document.getElementById('search-field');
    const searchQuery = searchField.value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    books.forEach(book => {
      const filePath = `data/${book.book}.json`;
      fetch(filePath)
        .then(response => response.json())
        .then(data => {
          data.chapters.forEach(chapter => {
            chapter.verses.forEach(verse => {
              if (verse.text.toLowerCase().includes(searchQuery)) {
                const resultBox = document.createElement('div');
                resultBox.classList.add('verse-box', 'vignette');
                resultBox.textContent = `${book.book} ${chapter.chapter}:${verse.verse} - ${verse.text}`;
                const color = getRandomColor();
                resultBox.style.backgroundColor = color;
                resultBox.style.setProperty('--vignette-color', color);
                resultBox.addEventListener('click', () => { showVerses(book.book, chapter.chapter); closeSearchModal(); });
                resultsContainer.appendChild(resultBox);
              }
            });
          });
        })
        .catch(error => console.error('Error searching verses:', error));
    });

    // Hide unnecessary elements
    document.getElementById('books').style.display = 'none';
    document.getElementById('chapters').style.display = 'none';
    document.getElementById('verses').style.display = 'none';
    document.getElementById('search-box').style.display = 'none';
  }

  document.getElementById('close-modal-btn').addEventListener('click', closeSearchModalAndReload);
  document.querySelector('.begin-search-box').addEventListener('click', searchScriptures);

  createBookOptions();
});
