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
    document.getElementById('hamburger').addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.toggle('open');
    });
}

function closeMobile() {
    document.getElementById('mobile-menu').classList.remove('open');
}
