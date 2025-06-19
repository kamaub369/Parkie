(function () {
  emailjs.init("Wbqmag0y0RZQmoSdK"); // Your Public Key
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_d05u1lm", "template_95njcla", this)
    .then(function () {
      alert("✅ Message sent successfully!");
      document.getElementById("contact-form").reset();
    }, function (error) {
      alert("❌ Failed to send message. Please try again.");
      console.error("EmailJS Error:", error);
    });
});
