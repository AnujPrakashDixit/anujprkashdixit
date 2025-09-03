document.addEventListener('DOMContentLoaded', function() {
    // --- Fade-in on Scroll Animation ---
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, options);

    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .hidden {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // --- Dark/Light Theme Toggle ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    // On page load, check for a saved theme in localStorage
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-theme') {
            themeToggleButton.textContent = '☀️'; // Sun icon for dark theme
        }
    }

    // Add click event listener to the toggle button
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        let theme = 'light-theme'; // Default to light

        // If dark-theme is now active, update theme variable and icon
        if (document.body.classList.contains('dark-theme')) {
            theme = 'dark-theme';
            themeToggleButton.textContent = '☀️';
        } else {
            themeToggleButton.textContent = '🌙';
        }
        
        // Save the current theme to localStorage
        localStorage.setItem('theme', theme);
    });
});