function initHeroCanvas() {
    var canvas = document.getElementById('hero-canvas'),
        ctx = canvas.getContext('2d'),
        w, h, nodes = [];

    function resize() {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    for (var i = 0; i < 60; i++) nodes.push({
        x: Math.random() * 1400,
        y: Math.random() * 800,
        vx: (Math.random() - .5) * .4,
        vy: (Math.random() - .5) * .4,
        r: Math.random() * 2 + 1
    });

    function draw() {
        var isDark = document.body.classList.contains('dark');
        ctx.clearRect(0, 0, w, h);
        var lc = isDark ? 'rgba(0,212,255,0.08)' : 'rgba(79,70,229,0.06)';
        var dc = isDark ? 'rgba(0,212,255,0.4)' : 'rgba(79,70,229,0.3)';
        for (var i = 0; i < nodes.length; i++) {
            for (var j = i + 1; j < nodes.length; j++) {
                var dx = nodes[i].x - nodes[j].x,
                    dy = nodes[i].y - nodes[j].y,
                    dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = lc;
                    ctx.lineWidth = 1;
                    ctx.globalAlpha = 1 - dist / 120;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
            nodes.forEach(function(n) {
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = dc;
                ctx.fill();
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > w) n.vx *= -1;
                if (n.y < 0 || n.y > h) n.vy *= -1;
            });
        }
        requestAnimationFrame(draw);
    }
    draw();
}
