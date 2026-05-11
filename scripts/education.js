var certData = [
    { name: 'Google Data Analytics Certificate', issuer: 'Google · Coursera', year: '2023', icon: '📊', image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg', lbl: 'G' },
    { name: 'Microsoft Excel Expert (MOS)', issuer: 'Microsoft Office Specialist', year: '2022', icon: '📗', image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg', lbl: 'XL' },
    { name: 'Data Analysis with Python', issuer: 'IBM · Coursera', year: '2022', icon: '🐍', image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg', lbl: 'PY' },
    { name: 'Power BI Data Analyst Associate', issuer: 'Microsoft Certified', year: '2023', icon: '📈', image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg', lbl: 'BI' },
    { name: 'SQL for Data Science', issuer: 'UC Davis · Coursera', year: '2021', icon: '🗃️', image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg', lbl: 'SQL' },
    { name: 'Tableau Desktop Specialist', issuer: 'Tableau / Salesforce', year: '2023', icon: '🎨', image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg', lbl: 'TB' },
    { name: 'IT Essentials (ITE)', issuer: 'Cisco Networking Academy', year: '2020', icon: '💻', image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg', lbl: 'IT' },
    { name: 'Business Intelligence Foundations', issuer: 'LinkedIn Learning', year: '2022', icon: '🏢', image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg', lbl: 'BI' },
    { name: 'Statistics for Data Science', issuer: 'Great Learning', year: '2023', icon: '📉', image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg', lbl: 'ST' },
    { name: 'Excel: Advanced Formulas', issuer: 'LinkedIn Learning', year: '2021', icon: '🔢', image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg', lbl: 'EX' }
];

function initEducation() {
    renderCertCards();
    renderCarousel();
}

function renderCertCards() {
    var container = document.getElementById('cert-cards');
    if (!container) return;
    certData.slice(0, 6).forEach(function(c) {
        var div = document.createElement('div');
        div.className = 'cert-card';
        div.innerHTML = '<div class="cert-icon-wrap" style="background-image:url(\'' + c.image + '\');background-size:cover;background-position:center;border-radius:10px;"></div>' +
            '<div style="flex:1;min-width:0;">' +
            '<div style="font-family:Syne,sans-serif;font-weight:700;font-size:13px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + c.name + '</div>' +
            '<div style="font-size:10px;font-family:IBM Plex Mono,monospace;color:var(--muted);margin-top:2px;">' + c.issuer + '</div>' +
            '</div>' +
            '<div class="cert-year">' + c.year + '</div>';
        container.appendChild(div);
    });
}

function buildSlide(c) {
    var div = document.createElement('div');
    div.className = 'cert-slide';
    div.innerHTML = '<div class="cert-slide-inner" style="background-image:url(\'' + c.image + '\');background-size:cover;background-position:center;">' +
        '<div style="font-size:38px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.3));">' + c.icon + '</div>' +
        '<div style="margin-top:8px;font-family:Syne,sans-serif;font-weight:800;font-size:20px;color:rgba(255,255,255,.2);letter-spacing:-.02em;">' + c.lbl + '</div>' +
        '<div class="verified-chip">✓ Verified</div>' +
        '<div class="cert-slide-overlay"><div class="cert-slide-label">' + c.name + '</div></div>' +
        '</div>' +
        '<div class="cert-slide-footer">' +
        '<div class="cert-slide-footer-title">' + c.name + '</div>' +
        '<div class="cert-slide-footer-sub">' + c.issuer + ' · ' + c.year + '</div>' +
        '</div>';
    return div;
}

function renderCarousel() {
    var top = document.getElementById('carousel-top'),
        bot = document.getElementById('carousel-bottom');
    if (!top || !bot) return;
    var topSet = certData.concat(certData);
    topSet.forEach(function(c) {
        top.appendChild(buildSlide(c));
    });
    var botSet = certData.slice().reverse().concat(certData.slice().reverse());
    botSet.forEach(function(c) {
        bot.appendChild(buildSlide(c));
    });
}
