function initDarkMode() {
    var t = document.getElementById('darkToggle'),
        b = document.getElementById('body');
    if (localStorage.getItem('darkMode') === 'true') {
        b.classList.remove('light');
        b.classList.add('dark');
        t.checked = true;
    }
    t.addEventListener('change', function() {
        if (t.checked) {
            b.classList.remove('light');
            b.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            b.classList.remove('dark');
            b.classList.add('light');
            localStorage.setItem('darkMode', 'false');
        }
        setTimeout(updateChartsColors, 100);
    });
}
