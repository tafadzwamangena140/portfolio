var revenueChart, channelChart, productChart, heroChart, skillsRadar, aiChart, currentChartType = 'line';

function getCC() {
    var d = document.body.classList.contains('dark');
    return {
        gc: d ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        tc: d ? '#64748B' : '#94A3B8'
    };
}

function initCharts() {
    var hCtx = document.getElementById('heroChart').getContext('2d');
    heroChart = new Chart(hCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                data: [420, 580, 510, 720, 680, 840],
                borderColor: '#4F46E5',
                backgroundColor: 'rgba(79,70,229,0.1)',
                borderWidth: 2,
                fill: true,
                tension: .4,
                pointBackgroundColor: '#4F46E5',
                pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } },
            animation: { duration: 1500 }
        }
    });
    var sCtx = document.getElementById('skillsRadar').getContext('2d');
    skillsRadar = new Chart(sCtx, {
        type: 'radar',
        data: {
            labels: ['SQL', 'Python', 'Power BI', 'Excel', 'Statistics', 'Communication'],
            datasets: [{
                data: [95, 82, 90, 92, 80, 88],
                borderColor: '#4F46E5',
                backgroundColor: 'rgba(79,70,229,0.15)',
                borderWidth: 2,
                pointBackgroundColor: '#818CF8',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: { display: false },
                    grid: { color: 'rgba(79,70,229,0.15)' },
                    pointLabels: { font: { family: 'IBM Plex Mono', size: 10 }, color: '#94A3B8' }
                }
            },
            animation: { duration: 1800 }
        }
    });
    buildDashboardCharts();
}

function buildDashboardCharts() {
    var c = getCC();
    var labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var data = [820, 940, 780, 1050, 980, 1200, 1100, 1350, 1280, 1420, 1380, 1520];
    var rCtx = document.getElementById('revenueChart').getContext('2d');
    if (revenueChart) revenueChart.destroy();
    revenueChart = new Chart(rCtx, {
        type: currentChartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'Revenue ($K)',
                data: data,
                borderColor: '#4F46E5',
                backgroundColor: currentChartType === 'line' ? 'rgba(79,70,229,0.12)' : 'rgba(79,70,229,0.7)',
                borderWidth: 2,
                fill: currentChartType === 'line',
                tension: .4,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: c.gc }, ticks: { color: c.tc, font: { family: 'IBM Plex Mono', size: 10 } } },
                y: { grid: { color: c.gc }, ticks: { color: c.tc, font: { family: 'IBM Plex Mono', size: 10 }, callback: function(v) { return '$' + v + 'K'; } } }
            },
            animation: { duration: 1200 }
        }
    });
    var chCtx = document.getElementById('channelChart').getContext('2d');
    if (channelChart) channelChart.destroy();
    channelChart = new Chart(chCtx, {
        type: 'doughnut',
        data: {
            labels: ['Organic', 'Paid Ads', 'Referral', 'Email'],
            datasets: [{ data: [38, 28, 20, 14], backgroundColor: ['#4F46E5', '#818CF8', '#00D4FF', '#0ea5e9'], borderWidth: 0, hoverOffset: 8 }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '68%', plugins: { legend: { display: false } }, animation: { duration: 1500 } }
    });
    var lg = document.getElementById('channel-legend');
    var cols = ['#4F46E5', '#818CF8', '#00D4FF', '#0ea5e9'];
    var ns = ['Organic', 'Paid Ads', 'Referral', 'Email'];
    var vs = [38, 28, 20, 14];
    lg.innerHTML = ns.map(function(n, i) {
        return '<div style="display:flex;align-items:center;gap:6px;font-size:10px;font-family:IBM Plex Mono,monospace;color:var(--muted);margin-bottom:3px;"><span style="width:8px;height:8px;border-radius:2px;background:' + cols[i] + ';display:inline-block;"></span>' + n + ' <span style="margin-left:auto;color:var(--text)">' + vs[i] + '%</span></div>';
    }).join('');
    var pCtx = document.getElementById('productChart').getContext('2d');
    if (productChart) productChart.destroy();
    productChart = new Chart(pCtx, {
        type: 'bar',
        data: {
            labels: ['Analytics Pro', 'DataSync', 'Insight Suite', 'Report Builder', 'Console'],
            datasets: [{ data: [284, 192, 156, 98, 74], backgroundColor: ['#4F46E5', '#818CF8', '#00D4FF', '#0ea5e9', '#7c3aed'], borderRadius: 4, borderWidth: 0 }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: c.gc }, ticks: { color: c.tc, font: { family: 'IBM Plex Mono', size: 9 }, callback: function(v) { return '$' + v + 'K'; } } },
                y: { grid: { display: false }, ticks: { color: c.tc, font: { family: 'IBM Plex Mono', size: 9 } } }
            },
            animation: { duration: 1400 }
        }
    });
}

function setChartType(t) {
    currentChartType = t;
    buildDashboardCharts();
}

function refreshDashboard() {
    buildDashboardCharts();
    initLiveTable();
}

function updateChartsColors() {
    buildDashboardCharts();
}
