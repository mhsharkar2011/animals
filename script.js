// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");

      // Change icon
      const icon = navToggle.querySelector("i");
      if (navMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        const icon = navToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      const isClickInsideNav =
        navToggle.contains(event.target) || navMenu.contains(event.target);

      if (!isClickInsideNav && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        const icon = navToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html") ||
      (currentPage === "index.html" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Fade in animation on scroll
  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeInOnScroll = function () {
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("active");
      }
    });
  };

  // Check on scroll
  window.addEventListener("scroll", fadeInOnScroll);

  // Initial check
  fadeInOnScroll();

  // =============================================
  // HERO SLIDER FUNCTIONALITY
  // =============================================
  const sliderContainer = document.querySelector(".slider-container");
  const slides = document.querySelectorAll(".slider-slide");
  const dots = document.querySelectorAll(".slider-dot");
  const prevBtn = document.querySelector(".slider-btn-prev");
  const nextBtn = document.querySelector(".slider-btn-next");
  const progressBar = document.querySelector(".slider-progress-bar");

  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 5000; // 5 seconds per slide

  // Initialize slider
  function initSlider() {
    if (!sliderContainer) return;

    // Start autoplay
    startAutoSlide();

    // Add click event to dots
    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const slideIndex = parseInt(this.getAttribute("data-slide"));
        goToSlide(slideIndex);
        resetAutoSlide();
      });
    });

    // Add click event to navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        prevSlide();
        resetAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        nextSlide();
        resetAutoSlide();
      });
    }

    // Progress bar animation
    updateProgressBar();

    // Pause autoplay on hover
    sliderContainer.addEventListener("mouseenter", pauseAutoSlide);
    sliderContainer.addEventListener("mouseleave", startAutoSlide);

    // Keyboard navigation
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        prevSlide();
        resetAutoSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
        resetAutoSlide();
      }
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Update current slide index
    currentSlide = index;

    // Ensure index is within bounds
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    // Add active class to current slide and dot
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");

    // Update progress bar
    updateProgressBar();
  }

  // Next slide
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  // Previous slide
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Start autoplay
  function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);

    slideInterval = setInterval(() => {
      nextSlide();
    }, slideDuration);
  }

  // Pause autoplay
  function pauseAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Reset autoplay timer
  function resetAutoSlide() {
    pauseAutoSlide();
    startAutoSlide();
  }

  // Update progress bar
  function updateProgressBar() {
    if (!progressBar) return;

    // Reset progress bar
    progressBar.style.width = "0%";

    // Animate progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 100 / (slideDuration / 50); // Update every 50ms
      progressBar.style.width = progress + "%";

      if (progress >= 100) {
        clearInterval(progressInterval);
      }
    }, 50);
  }

  // Initialize slider if it exists
  if (sliderContainer) {
    initSlider();
  }

  // =============================================
  // FLOATING DOGS FOR EACH SLIDE
  // =============================================
  function addFloatingDogs() {
    const slides = document.querySelectorAll(".slider-slide");

    slides.forEach((slide, index) => {
      const floatingDogsContainer = document.createElement("div");
      floatingDogsContainer.className = "floating-dogs";

      // Add different number of dogs to each slide
      const dogCount = 3 + index; // 3, 4, 5, 6 dogs

      for (let i = 0; i < dogCount; i++) {
        const dog = document.createElement("div");
        dog.className = `floating-dog floating-dog-${i + 1}`;

        // Alternate between dog and paw icons
        if (i % 2 === 0) {
          dog.innerHTML = '<i class="fas fa-dog"></i>';
        } else {
          dog.innerHTML = '<i class="fas fa-paw"></i>';
        }

        // Randomize position
        const top = 10 + Math.random() * 80;
        const left = 5 + Math.random() * 90;
        dog.style.top = `${top}%`;
        dog.style.left = `${left}%`;

        // Randomize size
        const size = 2 + Math.random() * 3;
        dog.style.fontSize = `${size}rem`;

        // Randomize animation delay
        const delay = Math.random() * 5;
        dog.style.animationDelay = `${delay}s`;

        floatingDogsContainer.appendChild(dog);
      }

      slide.appendChild(floatingDogsContainer);
    });
  }

  // Add floating dogs to slides
  if (document.querySelector(".slider-slide")) {
    addFloatingDogs();
  }

  // ... rest of existing code ...
});

// Footer functionality
function initFooter() {
  // Update current year
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Update current date
  const dateElement = document.getElementById("currentDate");
  if (dateElement) {
    const updateDate = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      dateElement.textContent = now.toLocaleDateString("en-US", options);
    };

    updateDate();
    // Update time every minute
    setInterval(updateDate, 60000);
  }

  // Back to top button
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (email) {
        // In a real application, you would send this to a server
        // For demo purposes, show success message
        alert(
          `Thank you! You've subscribed with: ${email}\nYou'll receive updates about our dogs soon! 🐶`,
        );
        emailInput.value = "";

        // Add visual feedback
        const submitBtn = this.querySelector("button");
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i>';
        submitBtn.style.background = "#25d366";

        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
          submitBtn.style.background = "";
        }, 2000);
      }
    });
  }

  // Add ripple effect to footer links
  const footerLinks = document.querySelectorAll(
    ".footer-link, .social-btn, .legal-link",
  );
  footerLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
      `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Add ripple animation to CSS
const rippleStyles = document.createElement("style");
rippleStyles.textContent = `
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyles);

// Initialize footer when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Your existing code...

  // Initialize footer
  initFooter();

  // Initialize footer functionality
  document.addEventListener("DOMContentLoaded", function () {
    // Update current year
    const yearElement = document.getElementById("currentYear");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    // Update current date and time
    const dateTimeElement = document.getElementById("currentDateTime");
    if (dateTimeElement) {
      const updateDateTime = () => {
        const now = new Date();
        const options = {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        };
        dateTimeElement.textContent = now.toLocaleDateString("en-US", options);
      };

      updateDateTime();
      setInterval(updateDateTime, 60000); // Update every minute
    }

    // Back to top functionality
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          backToTop.style.opacity = "1";
          backToTop.style.visibility = "visible";
          backToTop.style.transform = "translateY(0)";
        } else {
          backToTop.style.opacity = "0";
          backToTop.style.visibility = "hidden";
          backToTop.style.transform = "translateY(10px)";
        }
      });

      backToTop.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      // Initial state
      backToTop.style.transition = "all 0.3s ease";
      backToTop.style.opacity = "0";
      backToTop.style.visibility = "hidden";
      backToTop.style.transform = "translateY(10px)";
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector(".newsletter-form-modern");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const checkbox = this.querySelector('input[type="checkbox"]');
        const submitBtn = this.querySelector(".subscribe-btn");

        if (!checkbox.checked) {
          alert("Please agree to receive updates");
          return;
        }

        if (emailInput.value) {
          // Show success state
          const originalHTML = submitBtn.innerHTML;
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
          submitBtn.style.background =
            "linear-gradient(135deg, #25d366, #128c7e)";
          submitBtn.disabled = true;

          // Reset after 3 seconds
          setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = "";
            submitBtn.disabled = false;
            emailInput.value = "";
            checkbox.checked = false;
          }, 3000);
        }
      });
    }

    // Add hover effects to all links
    const footerLinks = document.querySelectorAll(
      ".footer-link, .legal-link, .social-platform",
    );
    footerLinks.forEach((link) => {
      link.addEventListener("mouseenter", function () {
        this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      });
    });

    // Language selector functionality
    const languageBtn = document.querySelector(".language-btn");
    if (languageBtn) {
      languageBtn.addEventListener("click", function () {
        this.classList.toggle("active");
      });
    }
  });
});
