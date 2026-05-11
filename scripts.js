
        // ── LOADER ──────────────────────────────────────────────────────────────────
        window.addEventListener('load', () => {
            setTimeout(() => {
                var l = document.getElementById('loader');
                l.style.opacity = '0';
                l.style.transition = 'opacity .5s';
                setTimeout(() => {
                    l.style.display = 'none';
                }, 500);
                initAll();
            }, 1800);
        });

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

        // ── DARK MODE ────────────────────────────────────────────────────────────────
        function initDarkMode() {
            var t = document.getElementById('darkToggle'),
                b = document.getElementById('body');
            if (localStorage.getItem('darkMode') === 'true') {
                b.classList.remove('light');
                b.classList.add('dark');
                t.checked = true;
            }
            t.addEventListener('change', function() {
                if (t.checked) {
                    b.classList.remove('light');
                    b.classList.add('dark');
                    localStorage.setItem('darkMode', 'true');
                } else {
                    b.classList.remove('dark');
                    b.classList.add('light');
                    localStorage.setItem('darkMode', 'false');
                }
                setTimeout(updateChartsColors, 100);
            });
        }

        // ── NAVBAR ───────────────────────────────────────────────────────────────────
        function initNav() {
            var links = document.querySelectorAll('.nav-link');
            window.addEventListener('scroll', function() {
                var secs = document.querySelectorAll('section'),
                    cur = '';
                secs.forEach(function(s) {
                    if (window.scrollY >= s.offsetTop - 100) cur = s.id;
                });
                links.forEach(function(l) {
                    l.classList.remove('active');
                    if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
                });
            });
            document.getElementById('hamburger').addEventListener('click', function() {
                document.getElementById('mobile-menu').classList.toggle('open');
            });
        }

        function closeMobile() {
            document.getElementById('mobile-menu').classList.remove('open');
        }

        // ── CURSOR GLOW ──────────────────────────────────────────────────────────────
        function initCursorGlow() {
            var el = document.getElementById('cursor-glow');
            document.addEventListener('mousemove', function(e) {
                el.style.left = e.clientX + 'px';
                el.style.top = e.clientY + 'px';
            });
        }

        // ── HERO CANVAS ──────────────────────────────────────────────────────────────
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
                requestAnimationFrame(draw);
            }
            draw();
        }

        // ── PARTICLES ────────────────────────────────────────────────────────────────
        function initParticles() {
            var c = document.getElementById('particles-container');
            for (var i = 0; i < 15; i++) {
                var p = document.createElement('div');
                p.className = 'particle';
                var sz = Math.random() * 6 + 2;
                p.style.cssText = 'width:' + sz + 'px;height:' + sz + 'px;left:' + Math.random() * 100 + '%;top:' + Math
                    .random() * 100 + '%;animation-duration:' + (Math.random() * 15 + 10) + 's;animation-delay:' + (Math
                        .random() * 10) + 's;background:' + (Math.random() > .5 ? 'rgba(79,70,229,0.3)' :
                        'rgba(0,212,255,0.2)') + ';';
                c.appendChild(p);
            }
        }

        // ── HERO TABLE ───────────────────────────────────────────────────────────────
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
                div.style.cssText =
                    'display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;padding:5px 4px;font-size:11px;font-family:IBM Plex Mono,monospace;border-bottom:1px solid var(--border);';
                div.innerHTML = '<span style="color:var(--text)">' + row[0] +
                    '</span><span style="color:var(--text)">' + row[1] + '</span><span style="color:' + (row[2]
                        .includes('▲') ? '#22c55e' : '#ef4444') + '">' + row[2] + '</span>';
                el.appendChild(div);
                setTimeout(function() {
                    div.classList.add('loaded');
                }, 500 + i * 200);
            });
        }

        // ── CHARTS ───────────────────────────────────────────────────────────────────
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
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            display: false
                        },
                        y: {
                            display: false
                        }
                    },
                    animation: {
                        duration: 1500
                    }
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
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        r: {
                            min: 0,
                            max: 100,
                            ticks: {
                                display: false
                            },
                            grid: {
                                color: 'rgba(79,70,229,0.15)'
                            },
                            pointLabels: {
                                font: {
                                    family: 'IBM Plex Mono',
                                    size: 10
                                },
                                color: '#94A3B8'
                            }
                        }
                    },
                    animation: {
                        duration: 1800
                    }
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
                        backgroundColor: currentChartType === 'line' ? 'rgba(79,70,229,0.12)' :
                            'rgba(79,70,229,0.7)',
                        borderWidth: 2,
                        fill: currentChartType === 'line',
                        tension: .4,
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: c.gc
                            },
                            ticks: {
                                color: c.tc,
                                font: {
                                    family: 'IBM Plex Mono',
                                    size: 10
                                }
                            }
                        },
                        y: {
                            grid: {
                                color: c.gc
                            },
                            ticks: {
                                color: c.tc,
                                font: {
                                    family: 'IBM Plex Mono',
                                    size: 10
                                },
                                callback: function(v) {
                                    return '$' + v + 'K';
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 1200
                    }
                }
            });
            var chCtx = document.getElementById('channelChart').getContext('2d');
            if (channelChart) channelChart.destroy();
            channelChart = new Chart(chCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Organic', 'Paid Ads', 'Referral', 'Email'],
                    datasets: [{
                        data: [38, 28, 20, 14],
                        backgroundColor: ['#4F46E5', '#818CF8', '#00D4FF', '#0ea5e9'],
                        borderWidth: 0,
                        hoverOffset: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '68%',
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    animation: {
                        duration: 1500
                    }
                }
            });
            var lg = document.getElementById('channel-legend');
            var cols = ['#4F46E5', '#818CF8', '#00D4FF', '#0ea5e9'];
            var ns = ['Organic', 'Paid Ads', 'Referral', 'Email'];
            var vs = [38, 28, 20, 14];
            lg.innerHTML = ns.map(function(n, i) {
                return '<div style="display:flex;align-items:center;gap:6px;font-size:10px;font-family:IBM Plex Mono,monospace;color:var(--muted);margin-bottom:3px;"><span style="width:8px;height:8px;border-radius:2px;background:' +
                    cols[i] + ';display:inline-block;"></span>' + n +
                    ' <span style="margin-left:auto;color:var(--text)">' + vs[i] + '%</span></div>';
            }).join('');
            var pCtx = document.getElementById('productChart').getContext('2d');
            if (productChart) productChart.destroy();
            productChart = new Chart(pCtx, {
                type: 'bar',
                data: {
                    labels: ['Analytics Pro', 'DataSync', 'Insight Suite', 'Report Builder', 'Console'],
                    datasets: [{
                        data: [284, 192, 156, 98, 74],
                        backgroundColor: ['#4F46E5', '#818CF8', '#00D4FF', '#0ea5e9', '#7c3aed'],
                        borderRadius: 4,
                        borderWidth: 0
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: c.gc
                            },
                            ticks: {
                                color: c.tc,
                                font: {
                                    family: 'IBM Plex Mono',
                                    size: 9
                                },
                                callback: function(v) {
                                    return '$' + v + 'K';
                                }
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: c.tc,
                                font: {
                                    family: 'IBM Plex Mono',
                                    size: 9
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 1400
                    }
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

        // ── SKILL BARS ────────────────────────────────────────────────────────────────
        var skills = [{
            name: 'SQL',
            level: 95,
            icon: '🗃️'
        }, {
            name: 'Excel / VBA',
            level: 92,
            icon: '📊'
        }, {
            name: 'Power BI',
            level: 90,
            icon: '📈'
        }, {
            name: 'Python (Pandas)',
            level: 82,
            icon: '🐍'
        }, {
            name: 'Tableau',
            level: 78,
            icon: '🎨'
        }, {
            name: 'R / Statistics',
            level: 72,
            icon: '📉'
        }];

        function initSkillBars() {
            var container = document.getElementById('skills-bars');
            skills.forEach(function(s) {
                var row = document.createElement('div');
                row.className = 'skill-row';
                row.innerHTML = '<span style="font-size:16px;flex-shrink:0;">' + s.icon +
                    '</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;margin-bottom:5px;"><span style="font-size:13px;font-weight:500;">' +
                    s.name +
                    '</span><span style="font-size:11px;font-family:IBM Plex Mono,monospace;color:var(--muted);">' +
                    s.level + '%</span></div><div class="progress-bar"><div class="progress-fill" data-width="' + s
                    .level + '%"></div></div></div>';
                container.appendChild(row);
            });
        }

        // ── EDUCATION + CAROUSEL ─────────────────────────────────────────────────────
        var certData = [{
                name: 'Google Data Analytics Certificate',
                issuer: 'Google · Coursera',
                year: '2023',
                icon: '📊',
                image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg',
                lbl: 'G'
            },
            {
                name: 'Microsoft Excel Expert (MOS)',
                issuer: 'Microsoft Office Specialist',
                year: '2022',
                icon: '📗',
               image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg',
                lbl: 'XL'
            },
            {
                name: 'Data Analysis with Python',
                issuer: 'IBM · Coursera',
                year: '2022',
                icon: '🐍',
               image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg',
                lbl: 'PY'
            },
            {
                name: 'Power BI Data Analyst Associate',
                issuer: 'Microsoft Certified',
                year: '2023',
                icon: '📈',
               image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg',
                lbl: 'BI'
            },
            {
                name: 'SQL for Data Science',
                issuer: 'UC Davis · Coursera',
                year: '2021',
                icon: '🗃️',
                image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg',
                lbl: 'SQL'
            },
            {
                name: 'Tableau Desktop Specialist',
                issuer: 'Tableau / Salesforce',
                year: '2023',
                icon: '🎨',
               image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg',
                lbl: 'TB'
            },
            {
                name: 'IT Essentials (ITE)',
                issuer: 'Cisco Networking Academy',
                year: '2020',
                icon: '💻',
                image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg',
                lbl: 'IT'
            },
            {
                name: 'Business Intelligence Foundations',
                issuer: 'LinkedIn Learning',
                year: '2022',
                icon: '🏢',
                image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg',
                lbl: 'BI'
            },
            {
                name: 'Statistics for Data Science',
                issuer: 'Great Learning',
                year: '2023',
                icon: '📉',
               image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg',
                lbl: 'ST'
            },
            {
                name: 'Excel: Advanced Formulas',
                issuer: 'LinkedIn Learning',
                year: '2021',
                icon: '🔢',
               image: 'https://i.pinimg.com/originals/c6/cb/bc/c6cbbc81e889005c200b118944f1e2a8.jpg',
                lbl: 'EX'
            },
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
                div.innerHTML = '<div class="cert-icon-wrap" style="background:' + url("c.image")  +
                    '"><span style="font-size:18px;">' + c.icon +
                    '</span></div><div style="flex:1;min-width:0;"><div style="font-family:Syne,sans-serif;font-weight:700;font-size:13px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' +
                    c.name +
                    '</div><div style="font-size:10px;font-family:IBM Plex Mono,monospace;color:var(--muted);margin-top:2px;">' +
                    c.issuer + '</div></div><div class="cert-year">' + c.year + '</div>';
                container.appendChild(div);
            });
        }

        function buildSlide(c) {
            var div = document.createElement('div');
            div.className = 'cert-slide';
            div.innerHTML = '<div class="cert-slide-inner" style="background:' + c.color +
                '"><div style="font-size:38px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.3));">' + c.icon +
                '</div><div style="margin-top:8px;font-family:Syne,sans-serif;font-weight:800;font-size:20px;color:rgba(255,255,255,.2);letter-spacing:-.02em;">' +
                c.lbl +
                '</div><div class="verified-chip">✓ Verified</div><div class="cert-slide-overlay"><div class="cert-slide-label">' +
                c.name + '</div></div></div><div class="cert-slide-footer"><div class="cert-slide-footer-title">' + c.name +
                '</div><div class="cert-slide-footer-sub">' + c.issuer + ' · ' + c.year + '</div></div>';
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

        // ── PROJECTS ─────────────────────────────────────────────────────────────────
        var projects = [{
                title: 'E-Commerce Revenue Analysis',
                desc: 'Identified $2.4M revenue leakage through customer segment churn analysis and basket size optimisation using SQL and Python.',
                tools: ['SQL', 'Python', 'Tableau'],
                icon: '🛒',
                color: '#4F46E5',
                ct: 'bar'
            },
            {
                title: 'Financial KPI Dashboard',
                desc: 'Built executive-level Power BI dashboard tracking 40+ KPIs across 12 business units, adopted by C-suite for weekly reviews.',
                tools: ['Power BI', 'DAX', 'Excel'],
                icon: '💰',
                color: '#00D4FF',
                ct: 'line'
            },
            {
                title: 'Customer Lifetime Value Model',
                desc: 'Developed ML-based CLV prediction model increasing targeted campaign ROI by 34% through precise segmentation.',
                tools: ['Python', 'Scikit-learn', 'SQL'],
                icon: '🧬',
                color: '#818CF8',
                ct: 'bar'
            },
            {
                title: 'Supply Chain Optimisation',
                desc: 'Reduced stockout incidents by 28% via predictive inventory analysis pipeline processing 500K+ daily transactions.',
                tools: ['SQL', 'Python', 'Airflow'],
                icon: '⛓️',
                color: '#0ea5e9',
                ct: 'bar'
            },
            {
                title: 'Social Media Analytics',
                desc: 'Created unified analytics platform consolidating data from 6 platforms, uncovering 45% content efficiency gap.',
                tools: ['Python', 'Looker', 'BigQuery'],
                icon: '📱',
                color: '#7c3aed',
                ct: 'line'
            },
            {
                title: 'HR Attrition Predictor',
                desc: 'Built predictive model identifying flight-risk employees with 84% accuracy, enabling proactive retention strategies.',
                tools: ['R', 'Excel', 'Tableau'],
                icon: '👥',
                color: '#059669',
                ct: 'bar'
            },
        ];

        function initProjects() {
            var grid = document.getElementById('projects-grid');
            projects.forEach(function(p, i) {
                var card = document.createElement('div');
                card.className = 'card p-5 fade-up';
                card.style.transitionDelay = (i % 3 * 0.1) + 's';
                card.innerHTML =
                    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;"><div style="width:44px;height:44px;border-radius:12px;background:' +
                    p.color + '20;display:flex;align-items:center;justify-content:center;font-size:20px;">' + p
                    .icon +
                    '</div><h3 style="font-family:Syne,sans-serif;font-weight:700;font-size:14px;line-height:1.3;">' +
                    p.title +
                    '</h3></div><p style="font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:14px;font-weight:300;">' +
                    p.desc + '</p><div style="height:100px;margin-bottom:14px;"><canvas id="proj-chart-' + i +
                    '"></canvas></div><div style="display:flex;flex-wrap:wrap;gap:6px;">' + p.tools.map(function(
                    t) {
                        return '<span class="tag">' + t + '</span>';
                    }).join('') + '</div>';
                grid.appendChild(card);
                setTimeout(function() {
                    drawProjectChart(i, p);
                }, 600 + i * 100);
            });
        }

        function drawProjectChart(i, p) {
            var ctx = document.getElementById('proj-chart-' + i);
            if (!ctx) return;
            var d = document.body.classList.contains('dark');
            var gc = d ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
            var data = Array.from({
                length: 8
            }, function() {
                return Math.floor(Math.random() * 60 + 30);
            });
            new Chart(ctx, {
                type: p.ct === 'line' ? 'line' : 'bar',
                data: {
                    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A'],
                    datasets: [{
                        data: data,
                        borderColor: p.color,
                        backgroundColor: p.ct === 'line' ? p.color + '15' : p.color + '80',
                        borderWidth: 2,
                        fill: true,
                        tension: .4,
                        borderRadius: 3,
                        pointRadius: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: gc
                            },
                            ticks: {
                                color: '#94A3B8',
                                font: {
                                    size: 8
                                }
                            }
                        },
                        y: {
                            grid: {
                                color: gc
                            },
                            ticks: {
                                color: '#94A3B8',
                                font: {
                                    size: 8
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 1200
                    }
                }
            });
        }

        // ── LIVE TABLE ────────────────────────────────────────────────────────────────
        var tblProducts = ['Analytics Pro', 'DataSync API', 'Insight Suite', 'Report Builder', 'Console',
        'Enterprise Plan'];
        var tblStatuses = [{
            l: 'Paid',
            c: '#22c55e'
        }, {
            l: 'Processing',
            c: '#f59e0b'
        }, {
            l: 'Refunded',
            c: '#ef4444'
        }, {
            l: 'Pending',
            c: '#94A3B8'
        }];
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
                row.style.cssText =
                    'display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;padding:5px 4px;font-size:10px;font-family:IBM Plex Mono,monospace;border-bottom:1px solid var(--border);';
                row.innerHTML = '<span style="color:var(--muted)">' + id + '</span><span style="color:var(--text)">' + prod
                    .split(' ')[0] + '</span><span style="color:var(--text)">' + amt + '</span><span style="color:' + st.c +
                    '">' + st.l + '</span>';
                el.appendChild(row);
                setTimeout(function() {
                    row.classList.add('loaded');
                }, 50);
            }
            for (var i = 0; i < 6; i++) setTimeout(addRow, i * 150);
            tableInterval = setInterval(addRow, 2200);
        }

        // ── SCROLL ANIMATIONS ─────────────────────────────────────────────────────────
        function initScrollAnimations() {
            var obs = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                    if (e.isIntersecting) {
                        e.target.classList.add('visible');
                        e.target.querySelectorAll('.progress-fill').forEach(function(b) {
                            b.style.width = b.dataset.width;
                        });
                    }
                });
            }, {
                threshold: 0.15
            });
            document.querySelectorAll('.fade-up').forEach(function(el) {
                obs.observe(el);
            });
            var aObs = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                    if (e.isIntersecting) {
                        document.querySelectorAll('.progress-fill').forEach(function(b) {
                            b.style.width = b.dataset.width;
                        });
                        aObs.disconnect();
                    }
                });
            }, {
                threshold: 0.3
            });
            var about = document.getElementById('about');
            if (about) aObs.observe(about);
        }

        // ── COUNTERS ──────────────────────────────────────────────────────────────────
        function initCounters() {
            var obs = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                    if (e.isIntersecting) {
                        var sec = e.target;
                        sec.querySelectorAll('.counter[data-target]').forEach(animateCounter);
                    }
                });
            }, {
                threshold: 0.5
            });
            document.querySelectorAll('section').forEach(function(s) {
                obs.observe(s);
            });
            setTimeout(function() {
                document.querySelectorAll('#hero .counter[data-target]').forEach(animateCounter);
            }, 2500);
        }

        function animateCounter(el) {
            if (el.dataset.animated) return;
            el.dataset.animated = '1';
            var target = +el.dataset.target,
                prefix = el.dataset.prefix || '',
                suffix = el.dataset.suffix || '',
                dur = 1800,
                start = Date.now();

            function tick() {
                var p = Math.min((Date.now() - start) / dur, 1);
                el.textContent = prefix + Math.floor(easeOut(p) * target).toLocaleString() + suffix;
                if (p < 1) requestAnimationFrame(tick);
            }
            tick();
        }

        function easeOut(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        // ── AI ANALYZER ───────────────────────────────────────────────────────────────
        var sampleDatasets = [{
                name: 'Sales Performance Q4 2024',
                icon: '📈',
                rows: '12,450',
                cols: 18,
                desc: 'Multi-channel sales with customer segments'
            },
            {
                name: 'Customer Behavior Insights',
                icon: '👥',
                rows: '8,230',
                cols: 24,
                desc: 'Session data, CLV, churn indicators'
            },
            {
                name: 'Financial Summary Report',
                icon: '💵',
                rows: '4,100',
                cols: 15,
                desc: 'P&L, balance sheet, cash flow metrics'
            },
        ];
        var aiResponses = {
            default: [
                "I've analyzed your dataset. Here's what I found:\n\n📊 Key Insights:\n• Revenue shows a strong upward trend (+18.3% MoM)\n• Top-performing segment: Enterprise (42% of revenue)\n• 3 anomalies detected in transaction data\n• Predicted Q1 growth: +12-15%\n\n💡 Recommendation: Focus retention efforts on SMB segment showing 8.2% churn spike.",
                "Great question! Looking at the data:\n\n🔍 Trend Analysis:\n• Seasonal peak detected in Q4\n• Organic channel outperforming paid by 2.4x ROI\n• Customer cohort Jan-Mar shows highest LTV ($847 avg)\n\nWant me to generate a dashboard for any of these?",
                "Analyzing anomalies...\n\n⚠️ 3 Anomalies Found:\n1. Revenue spike on Nov 14 (+340%) — enterprise deal close\n2. Zero transactions Nov 23-24 — possible pipeline issue\n3. Outlier: 2 accounts = 18% of total revenue\n\nAll flagged for review."
            ],
            greet: "Hi there! 👋 I'm your DataAI assistant. Upload a dataset or try a sample, and I'll provide instant insights, trend analysis, anomaly detection, and generate a custom dashboard. What would you like to analyze?",
            upload: "📁 Dataset uploaded successfully!\n\n✅ File validated:\n• Rows detected: ~8,400\n• Columns: 16\n• Data types: 8 numeric, 6 categorical, 2 datetime\n• Missing values: 2.3%\n\n🔄 Preprocessing complete. Ask me anything!",
            sample: "📦 Sample dataset loaded!\n\nI can see this is a rich dataset ready to analyze!\n\nTry asking:\n• 'Analyze this dataset'\n• 'Show me key trends'\n• 'What are the anomalies?'\n• 'Generate a dashboard summary'"
        };
        var aiSuggestions = ['📊 Analyze this dataset', '📈 Show me key trends', '⚠️ What are the anomalies?',
            '🎯 Generate a dashboard', '🏆 Top performing segment'
        ];
        var aiResponseIdx = 0,
            aiDataLoaded = false;

        function initAiAnalyzer() {
            var ds = document.getElementById('sample-datasets');
            sampleDatasets.forEach(function(d) {
                var btn = document.createElement('div');
                btn.className = 'card p-4';
                btn.style.cursor = 'pointer';
                btn.innerHTML =
                    '<div style="display:flex;align-items:center;gap:12px;"><span style="font-size:24px;">' + d
                    .icon +
                    '</span><div style="flex:1;"><div style="font-weight:600;font-size:13px;margin-bottom:2px;">' +
                    d.name +
                    '</div><div style="font-size:11px;color:var(--muted);font-family:IBM Plex Mono,monospace;">' + d
                    .rows + ' rows · ' + d.cols +
                    ' columns</div><div style="font-size:11px;color:var(--muted);margin-top:2px;">' + d.desc +
                    '</div></div><button style="padding:6px 14px;border-radius:8px;background:var(--accent);color:white;font-size:11px;font-family:IBM Plex Mono,monospace;border:none;flex-shrink:0;cursor:pointer;">Try →</button></div>';
                btn.onclick = function() {
                    loadSampleDataset(d);
                };
                ds.appendChild(btn);
            });
            addAiMessage(aiResponses.greet, 'bot');
            var sugEl = document.getElementById('ai-suggestions');
            aiSuggestions.forEach(function(s) {
                var b = document.createElement('button');
                b.textContent = s;
                b.style.cssText =
                    'padding:4px 10px;border-radius:99px;font-size:11px;font-family:IBM Plex Mono,monospace;border:1px solid var(--border);color:var(--muted);background:var(--bg);cursor:pointer;transition:all .2s;';
                b.onmouseenter = function() {
                    b.style.borderColor = 'var(--accent)';
                    b.style.color = 'var(--accent)';
                };
                b.onmouseleave = function() {
                    b.style.borderColor = 'var(--border)';
                    b.style.color = 'var(--muted)';
                };
                b.onclick = function() {
                    document.getElementById('ai-input').value = s.replace(/[📊📈⚠️🎯🏆] ?/, '');
                    sendAiMessage();
                };
                sugEl.appendChild(b);
            });
        }

        function loadSampleDataset(d) {
            aiDataLoaded = true;
            addAiMessage('Try "' + d.name + '"', 'user');
            showAiTyping();
            setTimeout(function() {
                removeAiTyping();
                addAiMessage(aiResponses.sample, 'bot');
                showAiDashboard();
            }, 1800);
        }

        function sendAiMessage() {
            var input = document.getElementById('ai-input'),
                msg = input.value.trim();
            if (!msg) return;
            input.value = '';
            addAiMessage(msg, 'user');
            showAiTyping();
            setTimeout(function() {
                removeAiTyping();
                var resp = aiDataLoaded ? aiResponses.default[aiResponseIdx % aiResponses.default.length] :
                    "Please upload a dataset or try a sample first! 🚀";
                addAiMessage(resp, 'bot');
                if (aiDataLoaded) {
                    aiResponseIdx++;
                    showAiDashboard();
                }
            }, 1500 + Math.random() * 1000);
        }

        function addAiMessage(text, role) {
            var msgs = document.getElementById('ai-messages'),
                div = document.createElement('div');
            div.style.cssText = 'display:flex;flex-direction:column;align-items:' + (role === 'user' ? 'flex-end' :
                'flex-start') + ';';
            var b = document.createElement('div');
            b.style.cssText = role === 'user' ?
                'background:linear-gradient(135deg,#4F46E5,#818CF8);color:white;border-radius:12px 12px 2px 12px;padding:10px 14px;max-width:80%;font-size:13px;white-space:pre-line;font-family:Outfit,sans-serif;' :
                'background:var(--surface);border:1px solid var(--border);color:var(--text);border-radius:12px 12px 12px 2px;padding:10px 14px;max-width:90%;font-size:13px;white-space:pre-line;font-family:Outfit,sans-serif;line-height:1.6;';
            b.textContent = text;
            div.appendChild(b);
            msgs.appendChild(div);
            msgs.scrollTop = msgs.scrollHeight;
        }

        function showAiTyping() {
            var msgs = document.getElementById('ai-messages'),
                div = document.createElement('div');
            div.id = 'ai-typing';
            div.style.cssText =
                'background:var(--surface);border:1px solid var(--border);color:var(--muted);border-radius:12px;padding:10px 14px;font-size:13px;display:inline-flex;gap:4px;align-items:center;';
            div.innerHTML =
                '<span style="animation:dotBlink 1s ease-in-out infinite">●</span><span style="animation:dotBlink 1s ease-in-out .2s infinite">●</span><span style="animation:dotBlink 1s ease-in-out .4s infinite">●</span>';
            msgs.appendChild(div);
            msgs.scrollTop = msgs.scrollHeight;
        }

        function removeAiTyping() {
            var t = document.getElementById('ai-typing');
            if (t) t.remove();
        }

        function showAiDashboard() {
            var dash = document.getElementById('ai-dashboard');
            dash.style.display = 'block';
            var kd = [{
                label: 'Total Records',
                value: '8,430',
                change: '+12%',
                color: '#22c55e'
            }, {
                label: 'Avg Revenue',
                value: '$284K',
                change: '+8%',
                color: '#22c55e'
            }, {
                label: 'Anomalies',
                value: '3',
                change: 'Found',
                color: '#f59e0b'
            }];
            document.getElementById('ai-kpis').innerHTML = kd.map(function(k) {
                return '<div class="kpi-card" style="padding:12px;"><div style="font-size:9px;font-family:IBM Plex Mono,monospace;color:var(--muted);margin-bottom:6px;">' +
                    k.label +
                    '</div><div style="font-size:16px;font-family:IBM Plex Mono,monospace;font-weight:700;">' + k
                    .value + '</div><div style="font-size:10px;color:' + k.color + ';margin-top:3px;">' + k.change +
                    '</div></div>';
            }).join('');
            if (aiChart) aiChart.destroy();
            var ctx = document.getElementById('aiChart').getContext('2d');
            aiChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                    datasets: [{
                        label: 'Actual',
                        data: [420, 510, 480, 620, 580, 740, 680, 820],
                        borderColor: '#4F46E5',
                        backgroundColor: 'rgba(79,70,229,0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: .4,
                        pointRadius: 3
                    }, {
                        label: 'Forecast',
                        data: [null, null, null, null, null, null, 680, 820],
                        borderColor: '#00D4FF',
                        backgroundColor: 'rgba(0,212,255,0.08)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        fill: true,
                        tension: .4,
                        pointRadius: 3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    family: 'IBM Plex Mono',
                                    size: 10
                                },
                                color: '#94A3B8'
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                font: {
                                    size: 9
                                },
                                color: '#94A3B8'
                            }
                        },
                        y: {
                            ticks: {
                                font: {
                                    size: 9
                                },
                                color: '#94A3B8'
                            }
                        }
                    },
                    animation: {
                        duration: 1500
                    }
                }
            });
        }

        function downloadReport() {
            alert('In a real deployment, this would generate and download a PDF report. (Mock feature)');
        }

        function handleDragOver(e) {
            e.preventDefault();
            document.getElementById('upload-zone').classList.add('dragover');
        }

        function handleDragLeave() {
            document.getElementById('upload-zone').classList.remove('dragover');
        }

        function handleDrop(e) {
            e.preventDefault();
            document.getElementById('upload-zone').classList.remove('dragover');
            var f = e.dataTransfer.files[0];
            if (f) processFile(f);
        }

        function handleFileSelect(e) {
            if (e.target.files[0]) processFile(e.target.files[0]);
        }

        function processFile(file) {
            aiDataLoaded = true;
            var st = document.getElementById('upload-status');
            st.style.display = 'block';
            st.innerHTML =
                '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:13px;"><span>📄</span><span style="font-weight:500;">' +
                file.name +
                '</span></div><div style="background:var(--border);height:4px;border-radius:4px;overflow:hidden;"><div id="upload-progress" style="height:100%;width:0;background:linear-gradient(90deg,#4F46E5,#00D4FF);border-radius:4px;transition:width .1s;"></div></div>';
            var w = 0,
                prog = document.getElementById('upload-progress');
            var iv = setInterval(function() {
                w = Math.min(w + Math.random() * 15 + 5, 100);
                prog.style.width = w + '%';
                if (w >= 100) {
                    clearInterval(iv);
                    st.innerHTML += '<p style="font-size:12px;color:#22c55e;margin-top:6px;">✅ File processed</p>';
                    addAiMessage('Uploaded: ' + file.name, 'user');
                    showAiTyping();
                    setTimeout(function() {
                        removeAiTyping();
                        addAiMessage(aiResponses.upload, 'bot');
                        showAiDashboard();
                    }, 2000);
                }
            }, 80);
        }

        // ── FAQ ───────────────────────────────────────────────────────────────────────
        var faqs = [{
                q: 'What tools do you use for data analysis?',
                a: "My primary stack includes SQL (PostgreSQL, BigQuery, Snowflake), Python with Pandas/NumPy/Matplotlib, Power BI and Tableau for visualisation, and Excel/VBA for quick analysis."
            },
            {
                q: "What industries have you worked with?",
                a: "I've delivered projects across e-commerce, SaaS, financial services, healthcare, and retail. Each sector brings unique data challenges and I adapt my approach accordingly."
            },
            {
                q: 'Can you handle large datasets?',
                a: 'Absolutely. I work with datasets ranging from thousands to hundreds of millions of rows, using distributed processing tools like Spark, BigQuery, and optimised SQL.'
            },
            {
                q: 'Do you offer freelance or full-time services?',
                a: "Both! I take on freelance projects (hourly or fixed-price), ongoing retainer contracts, and I'm open to full-time opportunities with the right company."
            },
            {
                q: 'How do you approach data cleaning?',
                a: 'My data cleaning process: (1) Audit — profiling nulls, duplicates, outliers; (2) Standardise — consistent formatting; (3) Validate — business rule checks; (4) Document — every transformation logged for reproducibility.'
            },
            {
                q: 'Can I see real project results?',
                a: 'Yes — my portfolio includes case studies with quantified outcomes. One project identified $2.4M in revenue leakage; another reduced stockout incidents by 28%.'
            },
        ];

        function initFaq() {
            var c = document.getElementById('faq-container');
            faqs.forEach(function(f, i) {
                var item = document.createElement('div');
                item.className = 'card faq-item';
                item.style.overflow = 'hidden';
                item.innerHTML =
                    '<div style="padding:18px 20px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;" onclick="toggleFaq(' +
                    i +
                    ')"><span style="font-family:Syne,sans-serif;font-weight:600;font-size:15px;flex:1;padding-right:16px;">' +
                    f.q +
                    '</span><span class="faq-icon" style="font-size:20px;flex-shrink:0;color:var(--accent);font-weight:300;">+</span></div><div class="faq-answer"><p style="padding:0 20px 18px;font-size:14px;color:var(--muted);line-height:1.7;font-weight:300;">' +
                    f.a + '</p></div>';
                item.dataset.index = i;
                c.appendChild(item);
            });
        }

        function toggleFaq(idx) {
            document.querySelectorAll('.faq-item').forEach(function(item, i) {
                if (i === idx) item.classList.toggle('open');
                else item.classList.remove('open');
            });
        }

        // ── CONTACT ───────────────────────────────────────────────────────────────────
        function submitContact() {
            var name = document.getElementById('cf-name').value.trim(),
                email = document.getElementById('cf-email').value.trim(),
                msg = document.getElementById('cf-message').value.trim();
            if (!name || !email || !msg) {
                alert('Please fill in all fields.');
                return;
            }
            var leads = JSON.parse(localStorage.getItem('portfolio_leads') || '[]');
            leads.push({
                name: name,
                email: email,
                message: msg,
                time: new Date().toISOString()
            });
            localStorage.setItem('portfolio_leads', JSON.stringify(leads));
            document.getElementById('contact-form').style.display = 'none';
            document.getElementById('contact-success').style.display = 'block';
        }

        // ── DEMO MODAL ────────────────────────────────────────────────────────────────
        function showDemoModal() {
            document.getElementById('demo-modal').style.display = 'flex';
        }

        function closeDemoModal() {
            document.getElementById('demo-modal').style.display = 'none';
        }

        // ── CHATBOT ───────────────────────────────────────────────────────────────────
        var chatOpen = false,
            chatStage = 'init',
            chatUserData = {};
        var chatSuggestions = [{
                label: '👋 Who are you?',
                reply: "Hi! I'm Tafadzwa Mangena, a Data Analyst with 5+ years of experience turning messy data into clean insights. I specialise in SQL, Python, Power BI, and building executive dashboards. Currently available for freelance projects and full-time roles."
            },
            {
                label: '📊 View Projects',
                reply: "My featured projects include:\n\n• 🛒 E-Commerce Revenue Analysis — Found $2.4M leakage\n• 💰 Financial KPI Dashboard — 40+ KPIs for C-suite\n• 🧬 Customer LTV Model — 34% ROI improvement\n\nScroll to the Projects section to see all 6 case studies!"
            },
            {
                label: '💼 My Skills',
                reply: "My core stack:\n\n🗃️ SQL — 95%\n📊 Excel/VBA — 92%\n📈 Power BI — 90%\n🐍 Python (Pandas) — 82%\n🎨 Tableau — 78%\n📉 R/Statistics — 72%"
            },
            {
                label: '📞 Contact Me',
                reply: "Reach me at:\n\n📧 tafadzwa.mangena@datavision.io\n📍 Zimbabwe (Remote-friendly)\n⏱️ Reply within 24 hours\n\nOr fill out the contact form above! 👆"
            },
            {
                label: '📥 Collect My Info',
                reply: "I'd love to stay in touch! What's your name?"
            },
        ];

        function initChatbot() {
            renderChatSuggestions();
            addChatMessage(
                "👋 Hey there! I'm Tafadzwa's portfolio assistant. Ask me anything or use the quick options below!",
                'bot');
        }

        function toggleChat() {
            chatOpen = !chatOpen;
            var w = document.getElementById('chat-window');
            w.style.display = chatOpen ? 'flex' : 'none';
        }

        function renderChatSuggestions() {
            var c = document.getElementById('chat-suggestions');
            c.innerHTML = '';
            chatSuggestions.forEach(function(s) {
                var b = document.createElement('button');
                b.textContent = s.label;
                b.style.cssText =
                    'padding:5px 11px;border-radius:99px;font-size:11px;font-family:IBM Plex Mono,monospace;border:1px solid var(--border);color:var(--muted);background:var(--bg);cursor:pointer;transition:all .2s;';
                b.onmouseenter = function() {
                    b.style.borderColor = 'var(--accent)';
                    b.style.color = 'var(--accent)';
                };
                b.onmouseleave = function() {
                    b.style.borderColor = 'var(--border)';
                    b.style.color = 'var(--muted)';
                };
                b.onclick = function() {
                    addChatMessage(s.label, 'user');
                    if (s.label.includes('Collect')) chatStage = 'collect_name';
                    setTimeout(function() {
                        addChatMessage(s.reply, 'bot');
                    }, 700);
                };
                c.appendChild(b);
            });
        }

        function sendChat() {
            var input = document.getElementById('chat-input'),
                msg = input.value.trim();
            if (!msg) return;
            input.value = '';
            addChatMessage(msg, 'user');
            if (chatStage === 'collect_name') {
                chatUserData.name = msg;
                chatStage = 'collect_email';
                setTimeout(function() {
                    addChatMessage('Nice to meet you, ' + msg + '! What is your email address?', 'bot');
                }, 700);
                return;
            }
            if (chatStage === 'collect_email') {
                chatUserData.email = msg;
                chatStage = 'collect_message';
                setTimeout(function() {
                    addChatMessage('Got it! What would you like to discuss with Tafadzwa?', 'bot');
                }, 700);
                return;
            }
            if (chatStage === 'collect_message') {
                chatUserData.message = msg;
                chatStage = 'done';
                var leads = JSON.parse(localStorage.getItem('portfolio_chat_leads') || '[]');
                leads.push(Object.assign({}, chatUserData, {
                    time: new Date().toISOString()
                }));
                localStorage.setItem('portfolio_chat_leads', JSON.stringify(leads));
                setTimeout(function() {
                    addChatMessage('Thank you! Info saved. Tafadzwa will follow up within 24 hours! 🎉', 'bot');
                }, 700);
                return;
            }
            var lc = msg.toLowerCase();
            var reply = "Interesting question! You can also reach Tafadzwa directly at tafadzwa.mangena@datavision.io 📧";
            if (lc.includes('sql') || lc.includes('skill')) reply =
                "Tafadzwa's core skills: SQL (95%), Power BI (90%), Excel (92%), Python (82%), Tableau (78%). Check the About section!";
            if (lc.includes('project')) reply =
                "Tafadzwa has 6 featured projects covering e-commerce, finance, HR, supply chain, and social media analytics.";
            if (lc.includes('hire') || lc.includes('available')) reply =
                "Great news — Tafadzwa is currently available for both freelance projects and full-time roles!";
            if (lc.includes('hello') || lc.includes('hi')) reply =
                "Hey! 👋 Great to see you here. I can tell you about Tafadzwa's skills, projects, or connect you two.";
            setTimeout(function() {
                addChatMessage(reply, 'bot');
            }, 700);
        }

        function addChatMessage(text, role) {
            var c = document.getElementById('chat-messages'),
                div = document.createElement('div');
            div.style.cssText = 'display:flex;flex-direction:column;align-items:' + (role === 'user' ? 'flex-end' :
                'flex-start') + ';';
            var b = document.createElement('div');
            b.style.cssText = role === 'user' ?
                'background:linear-gradient(135deg,#4F46E5,#818CF8);color:white;border-radius:12px 12px 2px 12px;padding:9px 13px;max-width:80%;font-size:13px;font-family:Outfit,sans-serif;white-space:pre-line;' :
                'background:var(--border);color:var(--text);border-radius:12px 12px 12px 2px;padding:9px 13px;max-width:85%;font-size:13px;font-family:Outfit,sans-serif;line-height:1.5;white-space:pre-line;';
            b.textContent = text;
            div.appendChild(b);
            c.appendChild(div);
            c.scrollTop = c.scrollHeight;
        }
 