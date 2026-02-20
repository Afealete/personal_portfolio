// Mobile hamburger toggle (if you later add a hamburger icon)
(function () {
    'use strict';

    const nav = document.querySelector('.navbar');
    const toggleBtn = document.querySelector('.nav-toggle');
    const navLinks = Array.from(document.querySelectorAll('.navbar .nav-item li a'));
    const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

    // Toggle mobile nav open/close and manage backdrop/focus
    const backdrop = document.querySelector('.nav-backdrop');
    let lastFocused = null;

    function openNav() {
        nav.classList.add('open');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
        if (backdrop) backdrop.classList.add('visible');
        // save last focused element and move focus to first nav link
        lastFocused = document.activeElement;
        const firstLink = nav.querySelector('.nav-item li a');
        if (firstLink) firstLink.focus();
        document.body.style.overflow = 'hidden'; // prevent background scroll
    }

    function closeNav() {
        nav.classList.remove('open');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
        if (backdrop) backdrop.classList.remove('visible');
        if (lastFocused) lastFocused.focus();
        document.body.style.overflow = '';
    }

    if (toggleBtn && nav) {
        toggleBtn.addEventListener('click', function () {
            const isOpen = nav.classList.contains('open');
            if (isOpen) closeNav(); else openNav();
        });
    }

    // close on backdrop click
    if (backdrop) {
        backdrop.addEventListener('click', () => closeNav());
    }

    // close on ESC key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            if (nav && nav.classList.contains('open')) closeNav();
        }
    });

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

            // Close mobile nav after click
            if (nav && nav.classList.contains('open')) {
                nav.classList.remove('open');
                if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
            }
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
