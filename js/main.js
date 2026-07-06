document.addEventListener("DOMContentLoaded", () => {
  try { initNavbar(); } catch(e) { console.error("Navbar Error:", e); }
  try { initMobileMenu(); } catch(e) { console.error("Mobile Menu Error:", e); }
  try { initScrollSpy(); } catch(e) { console.error("ScrollSpy Error:", e); }
  try { initContactForm(); } catch(e) { console.error("Contact Form Error:", e); }
  try { initScrollAnimations(); } catch(e) { console.error("Scroll Animations Error:", e); }
  try { initHeroAnimation(); } catch(e) { console.error("Hero Animation Error:", e); }
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

  // Set elements to hidden state only via JS so that if JS fails/is paused, they remain visible!
  animatedElements.forEach(el => el.classList.add("init-hide"));

  try {
    const observerOptions = {
      root: null,
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.remove("init-hide");
          observer.unobserve(entry.target); // trigger animation only once
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
  } catch (e) {
    console.warn("IntersectionObserver not supported, falling back to visible elements:", e);
    animatedElements.forEach(el => {
      el.classList.add("visible");
      el.classList.remove("init-hide");
    });
  }

  // Fallback 1: Trigger immediately for any elements that are already visible in the viewport
  setTimeout(() => {
    animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add("visible");
        el.classList.remove("init-hide");
      }
    });
  }, 150);

  // Fallback 2: Make everything visible after 1.2 seconds as a final safety net
  setTimeout(() => {
    animatedElements.forEach(el => {
      el.classList.add("visible");
      el.classList.remove("init-hide");
    });
  }, 1200);
}

/* ----------------------------------------------------
   HERO STAGGERED ANIMATIONS IN JS
---------------------------------------------------- */
function initHeroAnimation() {
  const heroChildren = document.querySelectorAll(".hero-content > *");
  if (!heroChildren.length) return;

  // Initialize hidden classes via JS
  heroChildren.forEach(el => el.classList.add("hero-init-hide"));

  // Trigger staggered reveal
  heroChildren.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("hero-visible");
      el.classList.remove("hero-init-hide");
    }, 100 + index * 150);
  });
}
