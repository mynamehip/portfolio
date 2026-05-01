// ============================================
// Particle Animation
// ============================================
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  let animationId;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      // Random color between accent-primary and accent-secondary
      this.color = Math.random() > 0.5 ? "108, 99, 255" : "0, 212, 170";
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Create particles
  const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const opacity = (1 - distance / 150) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    connectParticles();
    animationId = requestAnimationFrame(animate);
  }

  animate();
}

// ============================================
// Send Email
// ============================================
function sendEmail() {
  const recipient = "myname8102@gmail.com";
  const subject = document.getElementById("title").value;
  const body = document.getElementById("message").value;

  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

// ============================================
// Header scroll effect
// ============================================
const header = document.getElementById("header");
const backToTop = document.getElementById("back-to-top");

function handleScroll() {
  const scrollY = window.scrollY;

  // Header glass effect
  if (scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Back to top button
  if (scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }

  // Active navbar on scroll
  sections.forEach((sec) => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (scrollY >= offset && scrollY < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + id) {
          link.classList.add("active");
        }
      });
    }
  });
}

// ============================================
// Active navbar on scroll
// ============================================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a:not(.btn--solid-primary)");

window.addEventListener("scroll", handleScroll);

// ============================================
// Toggle icon navbar (mobile)
// ============================================
const menuIcon = document.getElementById("menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Close mobile menu when clicking a link
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  });
});

// ============================================
// Scroll Reveal animations
// ============================================
ScrollReveal({
  distance: "30px",
  duration: 1200,
  delay: 100,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
});

ScrollReveal().reveal(".home-content, .heading, .section-subtitle", {
  origin: "top",
});
ScrollReveal().reveal(".home-image, .project-box, .contact form, .skill-category, .project-btn", {
  origin: "bottom",
  interval: 150,
});
ScrollReveal().reveal(".home-content h3", { origin: "left" });
ScrollReveal().reveal(".home-content p", { origin: "right" });
ScrollReveal().reveal(".contact-info", { origin: "left" });
ScrollReveal().reveal(".contact form", { origin: "right" });
ScrollReveal().reveal(".stat-item", { origin: "bottom", interval: 100 });
ScrollReveal().reveal(".timeline-item", { origin: "bottom", interval: 200 });
ScrollReveal().reveal(".work-project-card", { origin: "bottom", interval: 150 });

// ============================================
// Stats Counter Animation
// ============================================
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 1500;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

// Trigger counter on scroll into view
const statsSection = document.querySelector(".stats");
let statsAnimated = false;

if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          animateCounters();
        }
      });
    },
    { threshold: 0.3 }
  );
  statsObserver.observe(statsSection);
}

// ============================================
// Typed.js - typing effect
// ============================================
const typed = new Typed(".typing-text", {
  strings: [
    "web applications.",
    "scalable APIs.",
    "beautiful interfaces.",
    "fullstack solutions.",
  ],
  startDelay: 800,
  typeSpeed: 40,
  backSpeed: 20,
  backDelay: 2000,
  loop: true,
});

// ============================================
// Project Horizontal Scroll (Mouse Wheel)
// ============================================
function initProjectScroll() {
  const projectContainer = document.querySelector(".project-container");

  if (projectContainer) {
    projectContainer.addEventListener("wheel", (evt) => {
      // Prevent default vertical scroll and scroll horizontally instead
      evt.preventDefault();
      // Increase scroll speed even more for a faster feel
      projectContainer.scrollLeft += evt.deltaY * 2.5;
    }, { passive: false });
  }
}

// ============================================
// Initialize
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initProjectScroll();
});

// Run particles and scroll immediately if DOM is already loaded
if (document.readyState === "complete" || document.readyState === "interactive") {
  initParticles();
  initProjectScroll();
}
