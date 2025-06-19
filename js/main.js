// ADD DESTINATION FIELD
function addDestination() {
  const container = document.getElementById('destinations');
  const inputCount = container.querySelectorAll('input').length + 1;
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.placeholder = `Destination ${inputCount}`;
  newInput.required = true;
  container.appendChild(newInput);
}

// PRINT ITINERARY
document.getElementById('tripForm').addEventListener('submit', function (e) {
  e.preventDefault();
  window.print();
});

// SEND EMAIL (EmailJS)
function sendEmail() {
  const email = document.querySelector('#tripForm input[type="email"]').value;
  const tel = document.querySelector('#tripForm input[type="tel"]').value;
  const travellers = document.querySelector('#tripForm input[type="number"]').value;
  const date = document.querySelector('#tripForm input[type="date"]').value;

  const destinations = Array.from(document.querySelectorAll('#destinations input')).map(input => input.value).join(', ');

  const body = `
    Travellers: ${travellers}\n
    Date: ${date}\n
    Destinations: ${destinations}\n
    WhatsApp: ${tel}\n
    Email: ${email}
  `;

  emailjs.send("your_service_id", "your_template_id", {
    to_email: "your_email@example.com",
    from_email: email,
    message: body
  }).then(function () {
    alert("Itinerary sent to your email!");
  }, function (error) {
    alert("Failed to send email. Try again later.");
    console.error(error);
  });
}

// LEAFLET MAP
const map = L.map('map').setView([-1.2921, 36.8219], 6); // Nairobi

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Example pins
const destinations = [
  {
    name: "Masai Mara",
    coords: [-1.4931, 35.1436],
    blog: "blog/masai-mara.html"
  },
  {
    name: "Mount Kenya",
    coords: [0.1521, 37.3084],
    blog: "blog/mount-kenya.html"
  }
];

destinations.forEach(place => {
  L.marker(place.coords)
    .addTo(map)
    .bindPopup(`<b>${place.name}</b><br><a href="${place.blog}" target="_blank">Read more</a>`);
});

document.addEventListener("DOMContentLoaded", () => {
  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach(button => {
    button.addEventListener("click", () => {
      const item = button.parentElement;
      item.classList.toggle("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Load FAQs from JSON file
  fetch("data/faqs.json")
    .then(response => response.json())
    .then(data => {
      const faqContainer = document.getElementById("faq-container");

      data.forEach(faq => {
        const item = document.createElement("div");
        item.className = "faq-item";

        const question = document.createElement("button");
        question.className = "faq-question";
        question.innerHTML = `${faq.question} <span class="icon">+</span>`;

        const answer = document.createElement("div");
        answer.className = "faq-answer";
        answer.innerHTML = `<p>${faq.answer}</p>`;

        // Toggle logic
        question.addEventListener("click", () => {
          item.classList.toggle("active");
        });

        item.appendChild(question);
        item.appendChild(answer);
        faqContainer.appendChild(item);
      });
    })
    .catch(error => {
      console.error("Error loading FAQs:", error);
      document.getElementById("faq-container").innerHTML =
        "<p>FAQs could not be loaded. Please try again later.</p>";
    });
});


document.addEventListener("DOMContentLoaded", () => {
  fetch("data/social.json")
    .then(response => response.json())
    .then(posts => {
      const container = document.getElementById("social-container");

      posts.forEach(post => {
        const card = document.createElement("div");
        card.classList.add("social-card");

        card.innerHTML = `
          <div class="social-header">
            <img src="${post.profilePic}" alt="${post.name}" class="profile-pic">
            <div>
              <strong>${post.name}</strong><br>
              <small>${post.username} • ${post.platform}</small><br>
              <small>${post.date}</small>
            </div>
          </div>
          <p class="social-content">"${post.content}"</p>
          <img src="${post.image}" class="social-image" alt="Post from ${post.username}">
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Failed to load social posts:", error);
      document.getElementById("social-container").innerHTML =
        "<p>We couldn't load our social feed right now. Please check again soon.</p>";
    });
});


document.addEventListener("DOMContentLoaded", () => {
  const reviewsContainer = document.getElementById("reviews-container");
  const avgRatingEl = document.getElementById("average-rating");

  fetch("data/reviews.json")
    .then(res => res.json())
    .then(reviews => {
      let total = 0;
      reviews.forEach(review => {
        total += review.rating;

        const div = document.createElement("div");
        div.className = "review";
        div.innerHTML = `
          <strong>${review.name}</strong> <span class="stars">${"⭐".repeat(review.rating)}</span><br>
          <small>${review.date}</small>
          <p>${review.comment}</p>
        `;
        reviewsContainer.appendChild(div);
      });

      const avg = (total / reviews.length).toFixed(1);
      avgRatingEl.innerHTML = `<h3>Average Rating: ${avg} / 5 ⭐</h3>`;
    });

  // Handle form submission (this example doesn't save reviews)
  document.getElementById("review-form").addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you for your review! (Note: Saving not set up yet.)");
    e.target.reset();
  });
});


// Load social posts
fetch('data/social.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('socialContainer');
    data.forEach(post => {
      const card = document.createElement('div');
      card.className = 'social-card';
      card.innerHTML = `
        <div class="social-header">
          <img src="${post.profilePic}" alt="${post.username}" class="profile-pic" />
          <strong>@${post.username}</strong>
        </div>
        <div class="social-content">${post.content}</div>
        <img src="${post.image}" alt="Post image" class="social-image" />
      `;
      container.appendChild(card);
    });
  });

// Scroll function
function scrollSocial(direction) {
  const container = document.getElementById('socialContainer');
  const scrollAmount = 320; // Adjust based on card width + gap
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}


document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const answers = [...this.querySelectorAll("select")].map(s => s.value);
  const [tripType, group, pace, priority] = answers;

  let destinationId = "";
  let message = "";

  if (tripType === "safari" && priority === "wildlife") {
    destinationId = "maasai-mara";
    message = "🦁 You’d love the Maasai Mara Safari!";
  } else if (tripType === "beach") {
    destinationId = "diani-beach";
    message = "🏖️ Diani Beach is calling!";
  } else if (tripType === "adventure" && group === "solo") {
    destinationId = "mount-kenya";
    message = "🥾 Mount Kenya is your perfect adventure!";
  } else if (tripType === "culture" || priority === "culture") {
    destinationId = "northern-kenya";
    message = "🎭 Explore the rich cultures of Northern Kenya!";
  } else {
    destinationId = "nairobi-park";
    message = "🌍 Nairobi National Park is a unique wild city escape!";
  }

  const resultBox = document.getElementById("quizResult");
  resultBox.innerHTML = `
    <strong>Our Recommendation:</strong><br>${message}<br><br>
    <a href="tours.html#${destinationId}" class="explore-btn">Explore This Tour</a>
  `;
  resultBox.style.display = "block";
});

