document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initHeroCanvas();
  initScrollSpy();
  initAchievementsCounter();
  initContactForm();
});

/* ----------------------------------------------------
   STICKY NAVBAR & SCROLL PARADIGMS
---------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("shrink", "shadow");
    } else {
      // Don't remove shrink/shadow if we are on a case study page (which has shrink/shadow preset)
      if (!document.body.classList.contains("case-study-page") && !navbar.classList.contains("case-study-nav")) {
        // Checking if it's the home page
        const isHomePage = document.querySelector(".hero") !== null;
        if (isHomePage) {
          navbar.classList.remove("shrink", "shadow");
        }
      }
    }
  };

  window.addEventListener("scroll", handleNavbarScroll);
  handleNavbarScroll(); // Initial call
}

/* ----------------------------------------------------
   MOBILE HAMBURGER MENU
---------------------------------------------------- */
function initMobileMenu() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

/* ----------------------------------------------------
   HERO CANVAS MICRO-ANIMATION (Neural Web)
---------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  const heroSection = document.getElementById("home");
  if (!canvas || !heroSection) return;

  const ctx = canvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }
  let animationFrameId;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };
  let active = true;

  // Configuration
  const particleCount = 45;
  const connectionDistance = 120;
  const particleColor = "hsla(30, 20%, 80%, 0.8)";
  const lineColor = "rgba(220, 210, 200, 0.4)";

  class Particle {
    constructor() {
      this.reset();
      // Scatter initially
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1; // 1px to 3px
      this.speedX = Math.random() * 0.4 - 0.2; // Slow velocities
      this.speedY = Math.random() * 0.4 - 0.2;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 20 + 2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce on edges
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

      // Mouse interactive push
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.hypot(dx, dy);
        
        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          let directionX = dx / distance;
          let directionY = dy / distance;
          this.x -= directionX * force * 1.5;
          this.y -= directionY * force * 1.5;
        }
      }
    }

    draw() {
      ctx.fillStyle = particleColor;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  function resizeCanvas() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.hypot(dx, dy);

        if (dist < connectionDistance) {
          // Fade connection based on distance
          let opacity = 1 - (dist / connectionDistance);
          ctx.strokeStyle = lineColor.replace("0.4", (opacity * 0.4).toFixed(2));
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }

  function animate() {
    if (!active) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    drawConnections();
    animationFrameId = requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener("resize", resizeCanvas);
  
  heroSection.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  heroSection.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Intersection Observer: Pause canvas rendering when hero is out of screen (battery saving)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      active = entry.isIntersecting;
      if (active) {
        animate();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(heroSection);
  resizeCanvas();
}

/* ----------------------------------------------------
   SCROLL SPY (Nav Active Link Sync)
---------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  if (!sections.length || !navLinks.length) return;

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeSectionId = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.remove("active");
          const href = link.getAttribute("href");
          if (href === `#${activeSectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, {
    rootMargin: "-25% 0px -70% 0px" // Triggers when section occupies middle 25-30% of viewport
  });

  sections.forEach(section => {
    spyObserver.observe(section);
  });
}

/* ----------------------------------------------------
   STATISTIC COUNTER ANIMATION
---------------------------------------------------- */
function initAchievementsCounter() {
  const counters = document.querySelectorAll(".counter");
  const achievementsSection = document.getElementById("achievements");
  if (!counters.length || !achievementsSection) return;

  let animated = false;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      if (prefersReducedMotion) {
        counter.textContent = target;
        return;
      }
      const duration = 2000; // 2 seconds
      const startTime = performance.now();
      
      const updateValue = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing out quadratic function
        const easeProgress = progress * (2 - progress);
        const currentValue = Math.floor(easeProgress * target);
        
        counter.textContent = currentValue;
        
        if (progress < 1) {
          requestAnimationFrame(updateValue);
        } else {
          counter.textContent = target;
        }
      };
      
      requestAnimationFrame(updateValue);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animateCounters();
        animated = true;
        observer.unobserve(achievementsSection); // Run once and stop
      }
    });
  }, { threshold: 0.2 });

  observer.observe(achievementsSection);
}

/* ----------------------------------------------------
   CONTACT FORM SUBMIT (Mock Backend Sync)
---------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const responseMsg = document.getElementById("form-response-msg");
  if (!form || !responseMsg) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector(".btn-submit");
    const nameInput = document.getElementById("form-name");
    const emailInput = document.getElementById("form-email");
    const messageInput = document.getElementById("form-message");

    // UI Loading feedback
    const originalBtnText = submitBtn.querySelector("span").textContent;
    submitBtn.querySelector("span").textContent = "Sending Message...";
    submitBtn.style.opacity = "0.75";
    submitBtn.style.pointerEvents = "none";
    
    // Simulate API request delay
    setTimeout(() => {
      // Mock Success Response
      responseMsg.textContent = `Thank you, ${nameInput.value}! Your message has been sent successfully.`;
      responseMsg.className = "form-response-msg success";
      
      // Reset inputs & float labels
      form.reset();
      
      // Revert Button state
      submitBtn.querySelector("span").textContent = originalBtnText;
      submitBtn.style.opacity = "1";
      submitBtn.style.pointerEvents = "auto";
      
      // Fade out response message after 5 seconds
      setTimeout(() => {
        responseMsg.className = "form-response-msg";
        responseMsg.textContent = "";
      }, 5000);
      
    }, 1500);
  });
}
