function initNav() {
    var links = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', function() {
        var secs = document.querySelectorAll('section'),
            cur = '';
        secs.forEach(function(s) {
            if (window.scrollY >= s.offsetTop - 100) cur = s.id;
        });
        links.forEach(function(l) {
            l.classList.remove('active');
            if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
        });
    });
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
        });
    }
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
            }
        });
    });
}

function closeMobile() {
    var menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.remove('open');
}
