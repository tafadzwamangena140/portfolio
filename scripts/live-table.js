var tblProducts = ['Analytics Pro', 'DataSync API', 'Insight Suite', 'Report Builder', 'Console', 'Enterprise Plan'];
var tblStatuses = [{ l: 'Paid', c: '#22c55e' }, { l: 'Processing', c: '#f59e0b' }, { l: 'Refunded', c: '#ef4444' }, { l: 'Pending', c: '#94A3B8' }];
var tableInterval;

function initLiveTable() {
    clearInterval(tableInterval);
    var el = document.getElementById('live-table');
    el.innerHTML = '';

    function addRow() {
        var id = '#' + Math.floor(Math.random() * 9000 + 1000);
        var prod = tblProducts[Math.floor(Math.random() * tblProducts.length)];
        var amt = '$' + (Math.floor(Math.random() * 900 + 100));
        var st = tblStatuses[Math.floor(Math.random() * tblStatuses.length)];
        if (el.children.length >= 8) el.removeChild(el.firstChild);
        var row = document.createElement('div');
        row.className = 'table-row';
        row.style.cssText = 'display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;padding:5px 4px;font-size:10px;font-family:IBM Plex Mono,monospace;border-bottom:1px solid var(--border);';
        row.innerHTML = '<span style="color:var(--muted)">' + id + '</span><span style="color:var(--text)">' + prod.split(' ')[0] + '</span><span style="color:var(--text)">' + amt + '</span><span style="color:' + st.c + '">' + st.l + '</span>';
        el.appendChild(row);
        setTimeout(function() { row.classList.add('loaded'); }, 50);
    }
    for (var i = 0; i < 6; i++) setTimeout(addRow, i * 150);
    tableInterval = setInterval(addRow, 2200);
}
