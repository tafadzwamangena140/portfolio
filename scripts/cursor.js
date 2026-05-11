function initCursorGlow() {
    var el = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', function(e) {
        el.style.left = e.clientX + 'px';
        el.style.top = e.clientY + 'px';
    });
}
