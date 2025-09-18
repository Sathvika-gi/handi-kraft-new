// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  initializeFilters();
  initializeSearch();
  initializeProductCards();
  initializeCategoryCards();
  initializeReviewActions();
});

// Filter functionality
function initializeFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");
  const categoryCards = document.querySelectorAll(".category-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const selectedCategory = this.getAttribute("data-category");

      // Filter product cards
      productCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (selectedCategory === "all" || cardCategory === selectedCategory) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });

      // Filter category cards
      categoryCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (
          selectedCategory === "all" ||
          !cardCategory ||
          cardCategory === selectedCategory
        ) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

// Search functionality
function initializeSearch() {
  const searchInputs = document.querySelectorAll(
    ".search-input, .main-search-input",
  );

  searchInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      filterProductsBySearch(searchTerm);
    });

    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const searchTerm = this.value.toLowerCase();
        filterProductsBySearch(searchTerm);
      }
    });
  });
}

function filterProductsBySearch(searchTerm) {
  const productCards = document.querySelectorAll(".product-card");
  const artisanCards = document.querySelectorAll(".artisan-card");

  productCards.forEach((card) => {
    const title =
      card.querySelector(".product-title")?.textContent.toLowerCase() || "";
    const description =
      card.querySelector(".product-description")?.textContent.toLowerCase() ||
      "";

    if (
      title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      searchTerm === ""
    ) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });

  artisanCards.forEach((card) => {
    const name =
      card.querySelector(".artisan-name")?.textContent.toLowerCase() || "";
    const specialty =
      card.querySelector(".artisan-specialty")?.textContent.toLowerCase() || "";

    if (
      name.includes(searchTerm) ||
      specialty.includes(searchTerm) ||
      searchTerm === ""
    ) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

// Product card interactions
function initializeProductCards() {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Navigate to product detail page
      // In a real app, you would get the product ID and navigate accordingly
      const productTitle = this.querySelector(".product-title")?.textContent;

      if (productTitle && productTitle.includes("Kanjeevaram")) {
        window.location.href = "product-detail.html";
      } else {
        // For demo purposes, just show an alert
        alert(`Navigating to ${productTitle} detail page`);
      }
    });

    // Add hover effects
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// Category card interactions
function initializeCategoryCards() {
  const categoryCards = document.querySelectorAll(".category-card");

  categoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const categoryTitle =
        this.querySelector(".category-title")?.textContent.toLowerCase();
      const filterButtons = document.querySelectorAll(".filter-btn");

      // Find and activate corresponding filter button
      filterButtons.forEach((button) => {
        if (button.getAttribute("data-category") === categoryTitle) {
          button.click();

          // Scroll to filtered products
          const featuredSection = document.querySelector(".featured-products");
          if (featuredSection) {
            featuredSection.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });

    // Add hover effects
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// Review action interactions
function initializeReviewActions() {
  const reviewActionBtns = document.querySelectorAll(".review-action-btn");

  reviewActionBtns.forEach((button) => {
    button.addEventListener("click", function () {
      const countSpan = this.querySelector("span:last-child");
      const isThumbsUp = this.querySelector(".thumbs-up-icon");

      if (countSpan) {
        let currentCount = parseInt(countSpan.textContent);

        // Toggle the action (simplified for demo)
        if (this.classList.contains("active")) {
          currentCount--;
          this.classList.remove("active");
        } else {
          currentCount++;
          this.classList.add("active");
        }

        countSpan.textContent = currentCount;
      }
    });
  });
}

// Add to cart functionality
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart-btn")) {
    e.preventDefault();

    // Simple animation and feedback
    const button = e.target;
    const originalText = button.textContent;

    button.textContent = "Added!";
    button.style.background = "#4CAF50";
    button.style.color = "#ffffff";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = "#EDD9BF";
      button.style.color = "#171412";
    }, 2000);

    // Show notification (you could implement a toast notification here)
    alert("Product added to cart!");
  }
});

// Smooth scrolling for navigation
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Navigation handling
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("nav-link")) {
    const href = e.target.getAttribute("href");

    if (href && href.startsWith("#")) {
      e.preventDefault();
      smoothScroll(href);
    }
  }
});

// Responsive navigation toggle (for mobile)
function toggleMobileNav() {
  const nav = document.querySelector(".nav");
  nav.classList.toggle("mobile-open");
}

// Lazy loading for images
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
if ("IntersectionObserver" in window) {
  initializeLazyLoading();
}

// Utility function to debounce search input
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Apply debouncing to search
const debouncedSearch = debounce(filterProductsBySearch, 300);

// Update search event listeners to use debounced function
document.addEventListener("DOMContentLoaded", function () {
  const searchInputs = document.querySelectorAll(
    ".search-input, .main-search-input",
  );

  searchInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      debouncedSearch(searchTerm);
    });
  });
});

// Back to top functionality
function addBackToTopButton() {
  const backToTop = document.createElement("button");
  backToTop.innerHTML = "↑";
  backToTop.className = "back-to-top";
  backToTop.setAttribute("aria-label", "Back to top");

  backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #ED7829;
        color: white;
        border: none;
        font-size: 18px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

  document.body.appendChild(backToTop);

  // Show/hide based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  // Scroll to top when clicked
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Initialize back to top button
addBackToTopButton();
