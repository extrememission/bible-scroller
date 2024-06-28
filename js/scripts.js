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
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = '';

    books.forEach((book) => {
      const bookBox = document.createElement('div');
      bookBox.classList.add('book-box', 'vignette');
      bookBox.textContent = book.book;
      bookBox.addEventListener('click', () => showChapters(book));
      booksContainer.appendChild(bookBox);
    });

    const searchBox = document.getElementById('search-box');
    booksContainer.appendChild(searchBox);
    searchBox.addEventListener('click', showSearchModal);
  }

  function showChapters(selectedBook) {
    const chaptersContainer = document.getElementById('chapters');
    chaptersContainer.innerHTML = '';

    for (let i = 1; i <= selectedBook.chapters; i++) {
      const chapterBox = document.createElement('div');
      chapterBox.classList.add('chapter-box', 'vignette');
      chapterBox.textContent = `${selectedBook.book} ${i}`;
      chapterBox.addEventListener('click', () => showVerses(selectedBook.book, i));
      chaptersContainer.appendChild(chapterBox);
    }

    document.getElementById('books').style.display = 'none';
    chaptersContainer.style.display = 'block';
  }

  function showVerses(bookName, chapterNumber) {
    const versesContainer = document.getElementById('verses');
    versesContainer.innerHTML = '';

    // Simulate fetching verses from a JSON file (replace with actual fetch)
    const verses = [
      { verse: 1, text: "Verse 1 text" },
      { verse: 2, text: "Verse 2 text" },
      // Add more verses as needed
    ];

    verses.forEach((verse) => {
      const verseBox = document.createElement('div');
      verseBox.classList.add('verse-box', 'vignette');
      verseBox.textContent = `${bookName} ${chapterNumber}:${verse.verse} - ${verse.text}`;
      versesContainer.appendChild(verseBox);
    });

    document.getElementById('chapters').style.display = 'none';
    document.getElementById('verses-carousel').style.display = 'flex';
    initializeCarousel();
  }

  function initializeCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('#next-button');
    const prevButton = document.querySelector('#prev-button');

    let currentIndex = 0;

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextButton.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateCarousel();
      }
    });

    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    updateCarousel(); // Initialize carousel position
  }

  function showSearchModal() {
    const modal = document.getElementById('search-modal');
    modal.style.display = 'flex';
    document.getElementById('close-modal-btn').addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // Initialize
  createBookOptions();
});
