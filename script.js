//send email==========================
function sendEmail() {
  let recipient = "myname8102@gmail.com";
  let subject = document.getElementById("title").value;
  let body = document.getElementById("message").value;

  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

//active navbar on scoll===========================
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top <= offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
      });
    }
  });

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

//toggle icon navbar========================
let menuIcon = document.getElementById("menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

//scoll reveal=======================
ScrollReveal({
  // reset: true,
  distance: "50px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading, .skill-icon", { origin: "top" });
ScrollReveal().reveal(".home-image, .project-box, .contact form, .skill-content, .project-btn", {
  origin: "bottom",
});
ScrollReveal().reveal(".home-content h3, .about-image", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

//typing text============================
const typed = new Typed(".typing-text", {
  strings: ["Fullstack Developer", "Fresher"],
  startDelay: 1600,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 1500,
  loop: true,
});
