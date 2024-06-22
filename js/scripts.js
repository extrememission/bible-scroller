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

        // Add event listener to copy verse text to clipboard
        verseBox.addEventListener('click', (event) => {
          const clickedElement = event.target;
          if (clickedElement.classList.contains('verse-box')) {
            const verseText = clickedElement.textContent.trim(); // Get the text content of the clicked verse box
            navigator.clipboard.writeText(verseText)
              .then(() => {
                console.log('Verse copied to clipboard:', verseText);
                // Optionally, provide user feedback or UI indication here
              })
              .catch(err => {
                console.error('Failed to copy verse to clipboard:', err);
                // Handle error or provide user feedback
              });
          }
        });

      });

      const reloadBox = document.createElement('div');
      reloadBox.classList.add('reload-box');
      reloadBox.textContent = 'RELOAD';
      reloadBox.addEventListener('click', () => location.reload());
      versesContainer.appendChild(reloadBox);

      versesContainer.scrollTop = 0;
      document.getElementById('chapters').style.display = 'none';
      versesContainer.style.display = 'block';
    })
    .catch(error => console.error('Error fetching verses:', error));
}
