// Navigation functionality with smooth scrolling
(function () {
    'use strict';

    const navLinks = Array.from(document.querySelectorAll('.navbar .nav-item li a'));
    const mobileMenuLinks = Array.from(document.querySelectorAll('.mobile-menu-link'));
    const allNavLinks = [...navLinks, ...mobileMenuLinks];
    const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    // Hamburger menu toggle
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    allNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;
            e.preventDefault();
            
            // Close hamburger and mobile menu
            if (hamburgerMenu) {
                hamburgerMenu.classList.remove('active');
            }
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }

            const target = document.querySelector(targetId);
            if (!target) return;

            // Account for navbar height
            const navHeight = 70;
            const yOffset = -16 - navHeight;
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });

    // Update active nav item on scroll
    function onScroll() {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        let currentIndex = -1;
        sections.forEach((sec, i) => {
            const rect = sec.getBoundingClientRect();
            const top = rect.top + window.pageYOffset - 120; // tolerance for header
            if (scrollPos >= top) currentIndex = i;
        });

        // Update desktop nav
        navLinks.forEach((link, i) => {
            const li = link.closest('li');
            if (!li) return;
            if (i === currentIndex) li.classList.add('active'); else li.classList.remove('active');
        });

        // Update mobile menu
        mobileMenuLinks.forEach((link, i) => {
            if (i === currentIndex) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', onScroll);

    // Keyboard accessibility - focus outlines for nav links
    navLinks.forEach(link => link.addEventListener('focus', () => link.classList.add('focus')));
    navLinks.forEach(link => link.addEventListener('blur', () => link.classList.remove('focus')));
})();

// Theme switching functionality
(function () {
    'use strict';

    const themeSwitcher = document.getElementById('theme-switcher');
    const html = document.documentElement;
    const icon = themeSwitcher ? themeSwitcher.querySelector('i') : null;

    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    function updateThemeIcon(theme) {
        if (icon) {
            icon.className = theme === 'light' ? 'bx bx-sun' : 'bx bx-moon';
        }
    }

    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Add a smooth transition with a ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, ${newTheme === 'light' ? 'rgba(255, 140, 0, 0.3)' : 'rgba(255, 140, 0, 0.2)'}, transparent);
            z-index: 9999;
            pointer-events: none;
            transition: all 0.8s ease-out;
        `;
        document.body.appendChild(ripple);

        // Trigger the ripple animation
        setTimeout(() => {
            ripple.style.width = '200vw';
            ripple.style.height = '200vw';
        }, 10);

        // Apply theme change
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);

        // Add transition effect to body
        document.body.style.transition = 'background-color 0.6s ease, color 0.6s ease';

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
            document.body.style.transition = '';
        }, 800);

        // Add a subtle shake effect to the theme switcher
        if (themeSwitcher) {
            themeSwitcher.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                themeSwitcher.style.animation = '';
            }, 500);
        }
    }

    if (themeSwitcher) themeSwitcher.addEventListener('click', toggleTheme);
})();
