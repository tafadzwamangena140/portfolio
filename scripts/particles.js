function initParticles() {
    var c = document.getElementById('particles-container');
    for (var i = 0; i < 15; i++) {
        var p = document.createElement('div');
        p.className = 'particle';
        var sz = Math.random() * 6 + 2;
        p.style.cssText = 'width:' + sz + 'px;height:' + sz + 'px;left:' + Math.random() * 100 + '%;top:' + Math.random() * 100 + '%;animation-duration:' + (Math.random() * 15 + 10) + 's;animation-delay:' + (Math.random() * 10) + 's;background:' + (Math.random() > .5 ? 'rgba(79,70,229,0.3)' : 'rgba(0,212,255,0.2)') + ';';
        c.appendChild(p);
    }
}
