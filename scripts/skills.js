var skills = [
    { name: 'SQL', level: 95, icon: '🗃️' },
    { name: 'Excel / VBA', level: 92, icon: '📊' },
    { name: 'Power BI', level: 90, icon: '📈' },
    { name: 'Python (Pandas)', level: 82, icon: '🐍' },
    { name: 'Tableau', level: 78, icon: '🎨' },
    { name: 'R / Statistics', level: 72, icon: '📉' }
];

function initSkillBars() {
    var container = document.getElementById('skills-bars');
    skills.forEach(function(s) {
        var row = document.createElement('div');
        row.className = 'skill-row';
        row.innerHTML = '<span style="font-size:16px;flex-shrink:0;">' + s.icon + '</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;margin-bottom:5px;"><span style="font-size:13px;font-weight:500;">' + s.name + '</span><span style="font-size:11px;font-family:IBM Plex Mono,monospace;color:var(--muted);">' + s.level + '%</span></div><div class="progress-bar"><div class="progress-fill" data-width="' + s.level + '%"></div></div></div>';
        container.appendChild(row);
    });
}
