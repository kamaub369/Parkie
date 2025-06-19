// Load tours from tours.json and display them
fetch('data/tours.json')
  .then(response => response.json())
  .then(tours => {
    const tourList = document.getElementById('tourList');

    tours.forEach(tour => {
      const card = document.createElement('div');
      card.className = 'tour-card';
      card.innerHTML = `
        <img src="${tour.image}" alt="${tour.title}" />
        <h3>${tour.title}</h3>
        <p>${tour.summary}</p>
        <a href="${tour.link}" class="view-btn">View Details</a>
      `;
      tourList.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading tours:', error));

// Horizontal scrolling with arrows
const scrollContainer = document.getElementById('tourList');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

scrollLeftBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
});

scrollRightBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
});
