// HandiKraft Interactive JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active");
    });
  }

  function toggleMobileMenu() {
        const mobileNav = document.getElementById('mobileNav');
        mobileNav.classList.toggle('active');
      }

  // Profile tabs functionality
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Show corresponding tab content
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });

  // Category filter for resources page
  const categoryButtons = document.querySelectorAll("[data-category]");
  const resourceCards = document.querySelectorAll(".resource-card");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-category");

      // Update active button
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter resources (simple show/hide for demo)
      resourceCards.forEach((card) => {
        if (category === "all") {
          card.style.display = "flex";
        } else {
          // In a real app, you'd filter based on data attributes
          card.style.display = "flex";
        }
      });
    });
  });

  // Search functionality
  const searchInputs = document.querySelectorAll(
    ".search-input, .search-input-large, .hero-search-input",
  );

  searchInputs.forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch(this.value);
      }
    });
  });

  // Search button functionality
  const searchButtons = document.querySelectorAll(
    ".hero-search-btn, .search-btn",
  );

  searchButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const searchInput =
        this.closest(".hero-search")?.querySelector(".hero-search-input");
      if (searchInput) {
        performSearch(searchInput.value);
      }
    });
  });

  function performSearch(query) {
    if (query.trim()) {
      console.log("Searching for:", query);
      // In a real app, this would trigger an API call or filter results
      showNotification(`Searching for "${query}"...`);
    }
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".artisan-card, .trainer-card, .resource-card, .story-card, .about-section",
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Contact form handling (for profile page)
  const contactButton = document.querySelector(
    '.btn[text*="Contact"], .btn:contains("Contact")',
  );

  if (contactButton) {
    contactButton.addEventListener("click", function (e) {
      e.preventDefault();
      showNotification("Contact form would open here!");
    });
  }

  // Review actions
  const reviewActions = document.querySelectorAll(".review-action");

  reviewActions.forEach((action) => {
    action.addEventListener("click", function () {
      const isLiked = this.classList.contains("liked");
      if (isLiked) {
        this.classList.remove("liked");
      } else {
        this.classList.add("liked");
      }
      // Update count would happen here in a real app
    });
  });

  // Trainer card clicks
  const trainerCards = document.querySelectorAll(".trainer-card");

  trainerCards.forEach((card) => {
    card.addEventListener("click", function () {
      const trainerLink = this.querySelector(".trainer-link");
      if (trainerLink) {
        window.location.href = trainerLink.href;
      } else {
        // For demo purposes, go to profile page
        window.location.href = "profile.html";
      }
    });
  });

  // Button click animations
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });

  // Form validation (if forms exist)
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      console.log("Form submitted with data:", Object.fromEntries(formData));
      showNotification("Form submitted successfully!");
    });
  });

  // Image lazy loading
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("loading");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });

  // Notification system
  function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ed7829;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      font-weight: 500;
      animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;

    // Add animation styles
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }

  // Keyboard navigation improvements
  document.addEventListener("keydown", function (e) {
    // Escape key to close mobile menu
    if (e.key === "Escape" && navMenu?.classList.contains("active")) {
      navMenu.classList.remove("active");
      mobileMenuToggle?.classList.remove("active");
    }

    // Tab navigation for accessibility
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  // Remove keyboard navigation class on mouse use
  document.addEventListener("mousedown", function () {
    document.body.classList.remove("keyboard-navigation");
  });

  // Performance optimization: Debounced scroll handler
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScroll, 16); // ~60fps
  });

  function handleScroll() {
    const scrollY = window.scrollY;
    const navbar = document.querySelector(".navbar");

    // Add shadow to navbar on scroll
    if (navbar) {
      if (scrollY > 10) {
        navbar.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
      } else {
        navbar.style.boxShadow = "none";
      }
    }
  }

  // Initialize tooltips (if needed)
  const elementsWithTooltips = document.querySelectorAll("[data-tooltip]");

  elementsWithTooltips.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      const tooltip = this.getAttribute("data-tooltip");
      showTooltip(this, tooltip);
    });

    element.addEventListener("mouseleave", function () {
      hideTooltip();
    });
  });

  function showTooltip(element, text) {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = text;
    tooltip.style.cssText = `
      position: absolute;
      background: #171412;
      color: white;
      padding: 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      z-index: 1000;
      pointer-events: none;
      white-space: nowrap;
    `;

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left =
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + "px";
  }

  function hideTooltip() {
    const tooltip = document.querySelector(".tooltip");
    if (tooltip) {
      tooltip.remove();
    }
  }

  // Initialize the page
  console.log("HandiKraft platform loaded successfully!");

  // Show welcome message on first visit
  if (!localStorage.getItem("handikraft-visited")) {
    setTimeout(() => {
      showNotification("Welcome to HandiKraft! 🎨");
      localStorage.setItem("handikraft-visited", "true");
    }, 1000);
  }
});

// Service Worker registration for better performance (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("SW registered: ", registration);
      })
      .catch(function (registrationError) {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Export functions for use in other scripts
window.HandiKraft = {
  showNotification: function (message, type = "info") {
    // Implementation would be here
  },
  performSearch: function (query) {
    // Implementation would be here
  },
};



document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.querySelector('.search-input');
            const programItems = document.querySelectorAll('.program-item');
            const featuredCards = document.querySelectorAll('.featured-card');

            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();

                // Filter all programs
                programItems.forEach(item => {
                    const title = item.querySelector('.program-title').textContent.toLowerCase();
                    const description = item.querySelector('.program-description').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Filter featured programs
                featuredCards.forEach(card => {
                    const title = card.querySelector('.featured-card-title').textContent.toLowerCase();
                    const description = card.querySelector('.featured-card-description').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });

            // Enroll button functionality
            const enrollButtons = document.querySelectorAll('.enroll-btn');
            enrollButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const programTitle = this.closest('.program-item')?.querySelector('.program-title')?.textContent ||
                                       this.closest('.featured-card')?.querySelector('.featured-card-title')?.textContent;
                    alert(`Enrollment for "${programTitle}" will be available soon!`);
                });
            });
        });
    