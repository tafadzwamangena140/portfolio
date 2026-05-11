var heroTableData = [
    ['Analytics Pro', '$284K', '▲ 14%'],
    ['DataSync API', '$192K', '▲ 8%'],
    ['Insight Suite', '$156K', '▼ 3%'],
    ['Report Builder', '$98K', '▲ 22%']
];

function initHeroTable() {
    var el = document.getElementById('hero-table');
    heroTableData.forEach(function(row, i) {
        var div = document.createElement('div');
        div.className = 'table-row';
        div.style.cssText = 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;padding:5px 4px;font-size:11px;font-family:IBM Plex Mono,monospace;border-bottom:1px solid var(--border);';
        div.innerHTML = '<span style="color:var(--text)">' + row[0] + '</span><span style="color:var(--text)">' + row[1] + '</span><span style="color:' + (row[2].includes('▲') ? '#22c55e' : '#ef4444') + '">' + row[2] + '</span>';
        el.appendChild(div);
        setTimeout(function() {
            div.classList.add('loaded');
        }, 500 + i * 200);
    });
}
