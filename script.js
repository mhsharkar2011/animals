// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      navMenu.classList.remove("active");
    }
  });
});

// Active navigation highlight
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Lazy loading images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

function setActiveLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

setActiveLink();

// Gallery Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");
const galleryEmpty = document.getElementById("galleryEmpty");

function filterGallery(filterValue) {
  let visibleCount = 0;

  galleryItems.forEach((item) => {
    if (filterValue === "all" || item.dataset.category === filterValue) {
      item.style.display = "block";
      visibleCount++;
    } else {
      item.style.display = "none";
    }
  });

  // Show/hide empty state
  if (visibleCount === 0) {
    galleryEmpty.style.display = "block";
  } else {
    galleryEmpty.style.display = "none";
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    this.classList.add("active");

    const filterValue = this.dataset.filter;
    filterGallery(filterValue);
  });
});

// Lightbox functionality
const lightboxModal = document.getElementById("lightboxModal");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImageIndex = 0;
let galleryImages = [];

// Collect all gallery images
document.querySelectorAll(".gallery-item").forEach((item, index) => {
  const img = item.querySelector("img");
  const title =
    item.querySelector(".gallery-title")?.textContent || "Dog Photo";
  const category = item.dataset.category;

  galleryImages.push({
    src: img.src,
    title: title,
    category: category,
    element: item,
  });

  // Add click event to open lightbox
  item.addEventListener("click", function () {
    currentImageIndex = index;
    openLightbox(index);
  });
});

function openLightbox(index) {
  const image = galleryImages[index];
  lightboxImage.src = image.src;
  lightboxCaption.textContent = `${image.title} • ${image.category}`;
  lightboxModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightboxModal.classList.remove("active");
  document.body.style.overflow = "";
}

function navigateLightbox(direction) {
  currentImageIndex += direction;

  if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  } else if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  }

  const image = galleryImages[currentImageIndex];
  lightboxImage.src = image.src;
  lightboxCaption.textContent = `${image.title} • ${image.category}`;
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  navigateLightbox(-1);
});
lightboxNext.addEventListener("click", (e) => {
  e.stopPropagation();
  navigateLightbox(1);
});

// Close lightbox when clicking outside the image
lightboxModal.addEventListener("click", function (e) {
  if (e.target === lightboxModal) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (lightboxModal.classList.contains("active")) {
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      navigateLightbox(-1);
    } else if (e.key === "ArrowRight") {
      navigateLightbox(1);
    }
  }
});

// Like button functionality
document.querySelectorAll(".gallery-likes i").forEach((heart) => {
  heart.addEventListener("click", function (e) {
    e.stopPropagation();
    this.classList.toggle("fas");
    this.classList.toggle("far");

    const countSpan = this.parentElement;
    let count = parseInt(countSpan.textContent);

    if (this.classList.contains("fas")) {
      countSpan.innerHTML = `<i class="fas fa-heart" style="color: #ef4444;"></i> ${count + 1}`;
    } else {
      countSpan.innerHTML = `<i class="far fa-heart"></i> ${count - 1}`;
    }
  });
});

// Contact Form Handling
const contactForm = document.getElementById("contactForm");
const alertContainer = document.getElementById("alertContainer");

function showAlert(message, type = "success") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `
                <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
                <span>${message}</span>
            `;

  alertContainer.innerHTML = "";
  alertContainer.appendChild(alertDiv);

  // Auto dismiss after 5 seconds
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

function validateForm(name, email, subject, message) {
  if (!name.trim()) {
    showAlert("Please enter your name", "error");
    return false;
  }

  if (!email.trim()) {
    showAlert("Please enter your email address", "error");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showAlert("Please enter a valid email address", "error");
    return false;
  }

  if (!subject.trim()) {
    showAlert("Please enter a subject", "error");
    return false;
  }

  if (!message.trim()) {
    showAlert("Please enter your message", "error");
    return false;
  }

  return true;
}

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Validate form
  if (!validateForm(name, email, subject, message)) {
    return;
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    // Show success message
    showAlert(
      `Thank you, ${name}! Your message has been sent. We'll bark back soon! 🐕`,
      "success",
    );

    // Reset form
    contactForm.reset();

    // Restore button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      navMenu.classList.remove("active");
    }
  });
});

// Add floating animation to contact icons
const contactIcons = document.querySelectorAll(".contact-icon");
contactIcons.forEach((icon, index) => {
  icon.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
});
