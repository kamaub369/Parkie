// Initialize the map centered on Kenya
const map = L.map('map').setView([-0.0236, 37.9062], 6); // Kenya center

// Load and display OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

// Destination markers
const destinations = [
  {
    name: 'Masai Mara',
    coords: [-1.4931, 35.1439],
    blogLink: 'blog/mara-reasons.html',
  },
  {
    name: 'Diani Beach',
    coords: [-4.2797, 39.5913],
    blogLink: 'blog/diani-guide.html',
  },
  {
    name: 'Mount Kenya',
    coords: [0.1521, 37.3084],
    blogLink: 'blog/mount-kenya-hike.html',
  },
  {
    name: 'Samburu',
    coords: [0.5151, 37.5289],
    blogLink: 'blog/northern-culture.html',
  }
];

// Add markers with popups
destinations.forEach(dest => {
  const marker = L.marker(dest.coords).addTo(map);
  marker.bindPopup(`
    <strong>${dest.name}</strong><br/>
    <a href="${dest.blogLink}" target="_blank">Read More</a>
  `);
});
