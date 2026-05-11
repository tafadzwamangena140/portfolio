function initAll() {
    initDarkMode();
    initNav();
    initHeroCanvas();
    initParticles();
    initHeroTable();
    initCharts();
    initSkillBars();
    initEducation();
    initProjects();
    initLiveTable();
    initAiAnalyzer();
    initFaq();
    initChatbot();
    initScrollAnimations();
    initCounters();
    initCursorGlow();
}

document.addEventListener('components:ready', function() {
    setTimeout(function() {
        var l = document.getElementById('loader');
        l.style.opacity = '0';
        l.style.transition = 'opacity .5s';
        setTimeout(function() {
            l.style.display = 'none';
        }, 500);
    }, 500);
    initAll();
});
