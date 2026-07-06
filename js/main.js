document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initContactForm();
  initScrollAnimations();
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

/* ----------------------------------------------------
   NATIVE SCROLL FADE-UP INTERSECTION OBSERVER
---------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".fade-up");
  if (animatedElements.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // trigger animation only once
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}
