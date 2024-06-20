document.addEventListener("DOMContentLoaded", () => {
    const books = [
        { book: "Genesis", chapters: 50 },
        { book: "Exodus", chapters: 40 },
        // Other books here
    ];

    const colors = ['#acac9c', '#948c8c', '#c7c4cc', '#bbbcb8', '#b4b3b4'];

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function createBookOptions() {
        const booksContainer = document.getElementById('books');
        booksContainer.innerHTML = '';
        books.forEach((book) => {
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
                bookData.verses.forEach((verse) => {
                    const verseBox = document.createElement('div');
                    verseBox.classList.add('verse-box', 'vignette');
                    verseBox.textContent = `${verse.text}`;
                    const color = getRandomColor();
                    verseBox.style.backgroundColor = color;
                    verseBox.style.setProperty('--vignette-color', color);
                    versesContainer.appendChild(verseBox);
                });

                const reloadBox = document.createElement('div');
                reloadBox.classList.add('reload-box');
                reloadBox.textContent = 'RELOAD';
                reloadBox.addEventListener('click', showBooksWindow);
                versesContainer.appendChild(reloadBox);

                versesContainer.scrollTop = 0;
                document.getElementById('chapters').style.display = 'none';
                versesContainer.style.display = 'block';
            })
            .catch(error => console.error('Error fetching verses:', error));
    }

    function showSearchModal() {
        document.getElementById('search-modal').style.display = 'flex';
    }

    function closeSearchModal() {
        document.getElementById('search-modal').style.display = 'none';
    }

    function showBooksWindow() {
        document.getElementById('books').style.display = 'block';
        document.getElementById('chapters').style.display = 'none';
        document.getElementById('verses').style.display = 'none';
    }

    document.getElementById('close-modal-btn').addEventListener('click', closeSearchModal);

    createBookOptions();
});
