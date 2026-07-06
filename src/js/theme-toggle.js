(function() {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');

    if (initialTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Wait for DOM to be ready to attach event listener
    document.addEventListener('DOMContentLoaded', () => {
        const toggleBtn = document.getElementById('themeToggle');
        if (!toggleBtn) return;

        // Set initial button text
        toggleBtn.textContent = initialTheme === 'dark' ? '☀ Light Mode' : '☾ Dark Mode';

        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            if (newTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }

            localStorage.setItem('theme', newTheme);
            toggleBtn.textContent = newTheme === 'dark' ? '☀ Light Mode' : '☾ Dark Mode';
        });
    });
})();
