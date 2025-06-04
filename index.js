document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-links li a');
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.nav-links');
  const preloader = document.getElementById("preloader");

  let currentSectionIndex = 0;
  let isScrolling = false;
  const scrollDuration = 800; // milliseconds for smooth scroll

  // Function to smoothly scroll to a section
  function scrollToSection(index) {
    if (index >= 0 && index < sections.length && !isScrolling) {
      isScrolling = true;
      const targetSection = sections[index];
      const headerHeight = document.querySelector('.main-header').offsetHeight; // Get dynamic header height

      // Calculate target scroll position, accounting for fixed header
      const targetScrollTop = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });

      currentSectionIndex = index;
      updateActiveNavLink();

      // Reset isScrolling flag after the scroll animation is likely finished
      setTimeout(() => {
        isScrolling = false;
      }, scrollDuration + 50); // Add a small buffer
    }
  }

  // Update active class on navigation links
  function updateActiveNavLink() {
    navLinks.forEach((link, index) => {
      if (index === currentSectionIndex) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Event listener for navigation links
  navLinks.forEach((link, index) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      scrollToSection(index);
      // Close mobile menu if open
      if (mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        hamburgerMenu.classList.remove('active');
      }
    });
  });

  // Handle scroll events (wheel and keydown) for section navigation
  window.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    if (e.deltaY > 0) { // Scrolling down
      scrollToSection(currentSectionIndex + 1);
    } else { // Scrolling up
      scrollToSection(currentSectionIndex - 1);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (isScrolling) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault(); // Prevent default page scroll
      scrollToSection(currentSectionIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); // Prevent default page scroll
      scrollToSection(currentSectionIndex - 1);
    }
  });

  // Intersection Observer for updating active link on manual scroll
  const observerOptions = {
    root: null, // viewport
    rootMargin: `-${document.querySelector('.main-header').offsetHeight}px 0px 0px 0px`, // Adjust threshold based on header height
    threshold: 0.5 // When 50% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isScrolling) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          if (link.getAttribute('href').includes(id)) {
            link.classList.add('active');
            // Update currentSectionIndex based on the intersecting section
            currentSectionIndex = Array.from(sections).indexOf(entry.target);
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Preloader logic
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
      document.body.style.overflowY = 'auto'; // Re-enable scroll after preloader disappears
    }, 600); // Matches CSS transition duration for opacity
  }, 1800); // Preloader visible for 1.8 seconds

  // Hamburger menu toggle for mobile
  hamburgerMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
    // Prevent body scroll when mobile menu is open
    if (mobileNav.classList.contains('active')) {
        document.body.style.overflowY = 'hidden';
    } else {
        document.body.style.overflowY = 'auto';
    }
  });

  // Initialize active link on page load
  updateActiveNavLink();
});
