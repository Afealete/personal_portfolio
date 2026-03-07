// Navigation functionality with smooth scrolling
(function () {
    'use strict';

    const navLinks = Array.from(document.querySelectorAll('.navbar .nav-item li a'));
    const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

    // Smooth scroll for internal links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (!target) return;
            const yOffset = -16; // small offset for fixed top nav
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

        navLinks.forEach((link, i) => {
            const li = link.closest('li');
            if (!li) return;
            if (i === currentIndex) li.classList.add('active'); else li.classList.remove('active');
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', onScroll);

    // Keyboard accessibility - focus outlines for nav links
    navLinks.forEach(link => link.addEventListener('focus', () => link.classList.add('focus')));
    navLinks.forEach(link => link.addEventListener('blur', () => link.classList.remove('focus')));
})();
