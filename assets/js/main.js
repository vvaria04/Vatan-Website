/**
 * Vatan Indian Vegetarian Restaurant - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initGalleryTabs();
  initLightbox();
  initReviewForm();
  initContactForm();
  initScrollReveal();
  initDishSlider();
  initTestimonialSlider();
  initSmartHeader();
});

/**
 * 1. Mobile Navigation Menu Toggle
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('mobile-active');
    document.body.classList.toggle('nav-open');
    
    // Toggle hamburger icon (could be svg change or text change)
    if (navMenu.classList.contains('mobile-active')) {
      toggleBtn.innerHTML = '&#10005;'; // Close symbol (X)
      toggleBtn.setAttribute('aria-label', 'Close Menu');
    } else {
      toggleBtn.innerHTML = '&#9776;'; // Hamburger symbol
      toggleBtn.setAttribute('aria-label', 'Open Menu');
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('mobile-active')) {
      navMenu.classList.remove('mobile-active');
      document.body.classList.remove('nav-open');
      toggleBtn.innerHTML = '&#9776;';
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Open Menu');
    }
  });
}

/**
 * 2. Gallery Tabs Filter
 */
function initGalleryTabs() {
  const tabButtons = document.querySelectorAll('.gallery-tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (tabButtons.length === 0) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active from other buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const categories = item.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          item.style.display = 'block';
          // Enable lazy loading images if needed
          const img = item.querySelector('img[loading="lazy"]');
          if (img) {
            img.setAttribute('loading', 'eager'); // load immediately when filtered
          }
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 3. Gallery Lightbox View
 */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const body = document.body;

  if (galleryItems.length === 0) return;

  // Create lightbox markup
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Image Lightbox');
  
  const lightboxContent = document.createElement('div');
  lightboxContent.className = 'lightbox-content';
  
  const closeBtn = document.createElement('span');
  closeBtn.className = 'lightbox-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.setAttribute('role', 'button');
  closeBtn.setAttribute('aria-label', 'Close Image');
  closeBtn.setAttribute('tabindex', '0');
  
  const lightboxImg = document.createElement('img');
  lightboxImg.setAttribute('alt', 'Expanded View');
  
  lightboxContent.appendChild(closeBtn);
  lightboxContent.appendChild(lightboxImg);
  lightbox.appendChild(lightboxContent);
  body.appendChild(lightbox);

  let activeTrigger = null;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      
      activeTrigger = item;
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt');
      
      lightboxImg.setAttribute('src', src);
      lightboxImg.setAttribute('alt', alt);
      
      lightbox.classList.add('active');
      closeBtn.focus();
      
      // Prevent scrolling
      body.style.overflow = 'hidden';
    });
    
    // Add accessibility keys
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    body.style.overflow = '';
    if (activeTrigger) {
      activeTrigger.focus();
    }
  };

  closeBtn.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeLightbox();
    }
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/**
 * 4. Client-side Reviews Rating Select and Submit Validation
 */
function initReviewForm() {
  const stars = document.querySelectorAll('.rating-star');
  const ratingInput = document.getElementById('review-rating');
  const reviewForm = document.getElementById('review-submit-form');

  if (stars.length > 0 && ratingInput) {
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const val = star.getAttribute('data-value');
        ratingInput.value = val;

        stars.forEach(s => {
          if (parseInt(s.getAttribute('data-value')) <= parseInt(val)) {
            s.classList.add('selected');
            s.innerHTML = '&#9733;'; // filled star
          } else {
            s.classList.remove('selected');
            s.innerHTML = '&#9734;'; // empty star
          }
        });
      });
      
      // Accessibility keys for stars
      star.setAttribute('tabindex', '0');
      star.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          star.click();
        }
      });
    });
  }

  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('review-name').value.trim();
      const email = document.getElementById('review-email').value.trim();
      const title = document.getElementById('review-title').value.trim();
      const rating = ratingInput.value;
      const content = document.getElementById('review-content').value.trim();
      
      if (!name || !email || !title || !rating || !content) {
        alert('Please fill out all fields and select a rating.');
        return;
      }

      alert('Thank you! Your review has been submitted for moderation.');
      reviewForm.reset();
      
      // Reset stars
      stars.forEach(s => {
        s.classList.remove('selected');
        s.innerHTML = '&#9734;';
      });
      ratingInput.value = '';
    });
  }
}

/**
 * 5. Contact Form Submit Validation
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-submit-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const captcha = document.getElementById('contact-captcha').value.trim();

    if (!name || !email || !subject || !message || !captcha) {
      alert('Please fill out all fields.');
      return;
    }

    if (parseInt(captcha) !== 12) {
      alert('Security verification failed. Please try again.');
      return;
    }

    alert('Your message has been sent successfully. We will get back to you soon!');
    contactForm.reset();
  });
}


/**
 * 7. Scroll-driven Reveal Animations
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // trigger once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  reveals.forEach(element => {
    revealOnScroll.observe(element);
  });
}

/**
 * 8. Signature Dishes Carousel Slider
 */
function initDishSlider() {
  const track = document.querySelector('.dish-slider-track');
  const prevBtn = document.querySelector('.dish-slider-btn.prev');
  const nextBtn = document.querySelector('.dish-slider-btn.next');
  
  if (!track || !prevBtn || !nextBtn) return;

  const cards = Array.from(track.children);
  if (cards.length === 0) return;

  let currentIndex = 0;

  function getCardsPerScreen() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  }

  function updateSlider() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 20; // 20px gap defined in CSS
    const cardsPerScreen = getCardsPerScreen();
    
    const maxIndex = Math.max(0, cards.length - cardsPerScreen);
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    
    const amountToMove = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${amountToMove}px)`;

    // Toggle button visibilities/disabled styles
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
    
    nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
  }

  nextBtn.addEventListener('click', () => {
    const maxIndex = cards.length - getCardsPerScreen();
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  updateSlider();
  window.addEventListener('resize', updateSlider);
}

/**
 * 9. Testimonial Crossfade Slider
 */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  
  if (slides.length === 0 || dots.length === 0) return;

  let currentSlide = 0;
  let intervalId = null;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    dots[currentSlide].setAttribute('aria-selected', 'false');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    dots[currentSlide].setAttribute('aria-selected', 'true');
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
  }

  function startAutoCycle() {
    stopAutoCycle();
    intervalId = setInterval(nextSlide, 5000);
  }

  function stopAutoCycle() {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      startAutoCycle();
    });
  });

  startAutoCycle();
}
