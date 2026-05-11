function initScrollAnimations() {
    var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                e.target.querySelectorAll('.progress-fill').forEach(function(b) {
                    b.style.width = b.dataset.width;
                });
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.fade-up').forEach(function(el) {
        obs.observe(el);
    });
    var aObs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) {
                document.querySelectorAll('.progress-fill').forEach(function(b) {
                    b.style.width = b.dataset.width;
                });
                aObs.disconnect();
            }
        });
    }, { threshold: 0.3 });
    var about = document.getElementById('about');
    if (about) aObs.observe(about);
}

function initCounters() {
    var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) {
                var sec = e.target;
                sec.querySelectorAll('.counter[data-target]').forEach(animateCounter);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('section').forEach(function(s) {
        obs.observe(s);
    });
    setTimeout(function() {
        document.querySelectorAll('#hero .counter[data-target]').forEach(animateCounter);
    }, 2500);
}

function animateCounter(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = '1';
    var target = +el.dataset.target,
        prefix = el.dataset.prefix || '',
        suffix = el.dataset.suffix || '',
        dur = 1800,
        start = Date.now();

    function tick() {
        var p = Math.min((Date.now() - start) / dur, 1);
        el.textContent = prefix + Math.floor(easeOut(p) * target).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(tick);
    }
    tick();
}

function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
}
