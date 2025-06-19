// Fetch and display blog posts from blog.json
fetch('data/blog.json')
  .then(response => response.json())
  .then(posts => {
    const blogContainer = document.getElementById('blogPosts');

    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'blog-card';
      card.innerHTML = `
        <img src="${post.image}" alt="${post.title}">
        <div class="blog-content">
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <a href="${post.link}" class="read-more">Read More</a>
        </div>
      `;
      blogContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading blog posts:', error));
