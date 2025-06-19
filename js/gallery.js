document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById("gallery-grid");

  fetch("data/gallery.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        const link = document.createElement("a");
        link.href = item.image;
        link.setAttribute("data-lightbox", "gallery");
        link.setAttribute("data-title", item.caption);

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.caption;

        link.appendChild(img);
        galleryGrid.appendChild(link);
      });
    })
    .catch(error => {
      console.error("Failed to load gallery images:", error);
    });
});
