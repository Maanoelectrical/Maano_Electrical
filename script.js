// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active'); // Toggle visibility class
            // Optional: Change toggle button text/icon
             menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
             if (mainNav.classList.contains('active')) {
                 menuToggle.innerHTML = '×'; // Change to close icon
                 menuToggle.setAttribute('aria-label', 'Close Menu');
             } else {
                 menuToggle.innerHTML = '☰'; // Change back to hamburger
                 menuToggle.setAttribute('aria-label', 'Toggle Menu');
             }
        });

        // Close menu when a link is clicked (optional)
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.innerHTML = '☰';
                    menuToggle.setAttribute('aria-label', 'Toggle Menu');
                     menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

         // Close menu if clicking outside the nav/toggle on mobile
         document.addEventListener('click', (event) => {
            if (mainNav.classList.contains('active') &&
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)) {
                    mainNav.classList.remove('active');
                    menuToggle.innerHTML = '☰';
                    menuToggle.setAttribute('aria-label', 'Toggle Menu');
                     menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }


    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }

    // --- Simple Image Lightbox ---
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const captionText = document.getElementById("lightbox-caption");
    const closeBtn = document.querySelector(".lightbox-close");
    const galleryImages = document.querySelectorAll(".gallery-grid img");

    if (lightboxModal && lightboxImg && captionText && closeBtn && galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                lightboxModal.style.display = "block";
                lightboxImg.src = this.src;
                captionText.innerHTML = this.alt || '';
                document.body.style.overflow = 'hidden'; // Prevent scrolling background
            });
        });

        function closeLightbox() {
            lightboxModal.style.display = "none";
            lightboxImg.src = "";
            captionText.innerHTML = "";
            document.body.style.overflow = ''; // Restore scrolling
        }

        closeBtn.addEventListener('click', closeLightbox);
        lightboxModal.addEventListener('click', (event) => {
            if (event.target === lightboxModal) closeLightbox();
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === "Escape" && lightboxModal.style.display === "block") closeLightbox();
        });
    }

    // --- Smooth Scrolling (Using CSS `scroll-behavior: smooth;` is often sufficient) ---
    // The smooth scroll JS might still be useful for more complex offsets or specific cases,
    // but the CSS version handles basic #hash links well. We'll keep the JS for robustness.
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = document.getElementById('main-header')?.offsetHeight || 0; // Get header height
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // --- Update Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Optional: Add 'active' class to nav link based on scroll position ---
    // This is more complex and can be added later if needed. It involves tracking scroll position
    // and comparing it to section offsets.

}); // End of DOMContentLoaded listener