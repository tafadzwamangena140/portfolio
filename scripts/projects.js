var projects = [
    { title: 'E-Commerce Revenue Analysis', desc: 'Identified $2.4M revenue leakage through customer segment churn analysis and basket size optimisation using SQL and Python.', tools: ['SQL', 'Python', 'Tableau'], icon: '🛒', color: '#4F46E5', ct: 'bar' },
    { title: 'Financial KPI Dashboard', desc: 'Built executive-level Power BI dashboard tracking 40+ KPIs across 12 business units, adopted by C-suite for weekly reviews.', tools: ['Power BI', 'DAX', 'Excel'], icon: '💰', color: '#00D4FF', ct: 'line' },
    { title: 'Customer Lifetime Value Model', desc: 'Developed ML-based CLV prediction model increasing targeted campaign ROI by 34% through precise segmentation.', tools: ['Python', 'Scikit-learn', 'SQL'], icon: '🧬', color: '#818CF8', ct: 'bar' },
    { title: 'Supply Chain Optimisation', desc: 'Reduced stockout incidents by 28% via predictive inventory analysis pipeline processing 500K+ daily transactions.', tools: ['SQL', 'Python', 'Airflow'], icon: '⛓️', color: '#0ea5e9', ct: 'bar' },
    { title: 'Social Media Analytics', desc: 'Created unified analytics platform consolidating data from 6 platforms, uncovering 45% content efficiency gap.', tools: ['Python', 'Looker', 'BigQuery'], icon: '📱', color: '#7c3aed', ct: 'line' },
    { title: 'HR Attrition Predictor', desc: 'Built predictive model identifying flight-risk employees with 84% accuracy, enabling proactive retention strategies.', tools: ['R', 'Excel', 'Tableau'], icon: '👥', color: '#059669', ct: 'bar' }
];

function initProjects() {
    var VISIBLE_DEFAULT = 3;
    var grid = document.getElementById('projects-grid');
    projects.forEach(function(p, i) {
        var card = document.createElement('div');
        card.className = 'card p-5 fade-up project-col';
        card.dataset.index = i;
        card.style.transitionDelay = (i % 3 * 0.1) + 's';
        card.innerHTML = '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;"><div style="width:44px;height:44px;border-radius:12px;background:' + p.color + '20;display:flex;align-items:center;justify-content:center;font-size:20px;">' + p.icon + '</div><h3 style="font-family:Syne,sans-serif;font-weight:700;font-size:14px;line-height:1.3;">' + p.title + '</h3></div><p style="font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:14px;font-weight:300;">' + p.desc + '</p><div style="height:100px;margin-bottom:14px;"><canvas id="proj-chart-' + i + '"></canvas></div><div style="display:flex;flex-wrap:wrap;gap:6px;">' + p.tools.map(function(t) { return '<span class="tag">' + t + '</span>'; }).join('') + '</div>';
        grid.appendChild(card);
        setTimeout(function() { drawProjectChart(i, p); }, 600 + i * 100);
    });

    var total = projects.length;
    if (total <= VISIBLE_DEFAULT) return;

    var btn = document.createElement('button');
    btn.id = 'view-toggle-btn';
    btn.textContent = 'View All Projects →';
    btn.style.cssText = 'display:flex;align-items:center;gap:8px;margin:40px auto 0;padding:12px 28px;border:1.5px solid var(--border);border-radius:10px;background:var(--surface);color:var(--text);font-family:Outfit,sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:border-color .25s, color .25s, box-shadow .25s;';
    btn.addEventListener('mouseenter', function() {
        btn.style.borderColor = 'var(--accent)';
        btn.style.color = 'var(--accent)';
        btn.style.boxShadow = '0 0 0 3px rgba(79,70,229,.12)';
    });
    btn.addEventListener('mouseleave', function() {
        btn.style.borderColor = 'var(--border)';
        btn.style.color = 'var(--text)';
        btn.style.boxShadow = 'none';
    });

    var expanded = false;
    function applyVisibility() {
        var cols = grid.querySelectorAll('.project-col');
        cols.forEach(function(col, i) {
            col.style.display = expanded || i < VISIBLE_DEFAULT ? '' : 'none';
        });
    }

    applyVisibility();
    grid.parentElement.appendChild(btn);

    btn.addEventListener('click', function() {
        expanded = !expanded;
        applyVisibility();
        btn.textContent = expanded ? 'Show Less ↑' : 'View All Projects →';
        if (!expanded) {
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

function drawProjectChart(i, p) {
    var ctx = document.getElementById('proj-chart-' + i);
    if (!ctx) return;
    var d = document.body.classList.contains('dark');
    var gc = d ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
    var data = Array.from({ length: 8 }, function() { return Math.floor(Math.random() * 60 + 30); });
    new Chart(ctx, {
        type: p.ct === 'line' ? 'line' : 'bar',
        data: {
            labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A'],
            datasets: [{ data: data, borderColor: p.color, backgroundColor: p.ct === 'line' ? p.color + '15' : p.color + '80', borderWidth: 2, fill: true, tension: .4, borderRadius: 3, pointRadius: 2 }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: gc }, ticks: { color: '#94A3B8', font: { size: 8 } } },
                y: { grid: { color: gc }, ticks: { color: '#94A3B8', font: { size: 8 } } }
            },
            animation: { duration: 1200 }
        }
    });
}
