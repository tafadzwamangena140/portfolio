var sampleDatasets = [
    { name: 'Sales Performance Q4 2024', icon: '📈', rows: '12,450', cols: 18, desc: 'Multi-channel sales with customer segments' },
    { name: 'Customer Behavior Insights', icon: '👥', rows: '8,230', cols: 24, desc: 'Session data, CLV, churn indicators' },
    { name: 'Financial Summary Report', icon: '💵', rows: '4,100', cols: 15, desc: 'P&L, balance sheet, cash flow metrics' }
];
var aiResponses = {
    default: [
        "I've analyzed your dataset. Here's what I found:\n\n📊 Key Insights:\n• Revenue shows a strong upward trend (+18.3% MoM)\n• Top-performing segment: Enterprise (42% of revenue)\n• 3 anomalies detected in transaction data\n• Predicted Q1 growth: +12-15%\n\n💡 Recommendation: Focus retention efforts on SMB segment showing 8.2% churn spike.",
        "Great question! Looking at the data:\n\n🔍 Trend Analysis:\n• Seasonal peak detected in Q4\n• Organic channel outperforming paid by 2.4x ROI\n• Customer cohort Jan-Mar shows highest LTV ($847 avg)\n\nWant me to generate a dashboard for any of these?",
        "Analyzing anomalies...\n\n⚠️ 3 Anomalies Found:\n1. Revenue spike on Nov 14 (+340%) — enterprise deal close\n2. Zero transactions Nov 23-24 — possible pipeline issue\n3. Outlier: 2 accounts = 18% of total revenue\n\nAll flagged for review."
    ],
    greet: "Hi there! I'm your DataAI assistant. Upload a dataset or try a sample, and I'll provide instant insights, trend analysis, anomaly detection, and generate a custom dashboard. What would you like to analyze?",
    upload: "📁 Dataset uploaded successfully!\n\n✅ File validated:\n• Rows detected: ~8,400\n• Columns: 16\n• Data types: 8 numeric, 6 categorical, 2 datetime\n• Missing values: 2.3%\n\n🔄 Preprocessing complete. Ask me anything!",
    sample: "📦 Sample dataset loaded!\n\nI can see this is a rich dataset ready to analyze!\n\nTry asking:\n• 'Analyze this dataset'\n• 'Show me key trends'\n• 'What are the anomalies?'\n• 'Generate a dashboard summary'"
};
var aiSuggestions = ['📊 Analyze this dataset', '📈 Show me key trends', '⚠️ What are the anomalies?', '🎯 Generate a dashboard', '🏆 Top performing segment'];
var aiResponseIdx = 0, aiDataLoaded = false, aiChart;

function initAiAnalyzer() {
    var ds = document.getElementById('sample-datasets');
    sampleDatasets.forEach(function(d) {
        var btn = document.createElement('div');
        btn.className = 'card p-4';
        btn.style.cursor = 'pointer';
        btn.innerHTML = '<div style="display:flex;align-items:center;gap:12px;"><span style="font-size:24px;">' + d.icon + '</span><div style="flex:1;"><div style="font-weight:600;font-size:13px;margin-bottom:2px;">' + d.name + '</div><div style="font-size:11px;color:var(--muted);font-family:IBM Plex Mono,monospace;">' + d.rows + ' rows · ' + d.cols + ' columns</div><div style="font-size:11px;color:var(--muted);margin-top:2px;">' + d.desc + '</div></div><button style="padding:6px 14px;border-radius:8px;background:var(--accent);color:white;font-size:11px;font-family:IBM Plex Mono,monospace;border:none;flex-shrink:0;cursor:pointer;">Try →</button></div>';
        btn.onclick = function() { loadSampleDataset(d); };
        ds.appendChild(btn);
    });
    addAiMessage(aiResponses.greet, 'bot');
    var sugEl = document.getElementById('ai-suggestions');
    aiSuggestions.forEach(function(s) {
        var b = document.createElement('button');
        b.textContent = s;
        b.style.cssText = 'padding:4px 10px;border-radius:99px;font-size:11px;font-family:IBM Plex Mono,monospace;border:1px solid var(--border);color:var(--muted);background:var(--bg);cursor:pointer;transition:all .2s;';
        b.onmouseenter = function() { b.style.borderColor = 'var(--accent)'; b.style.color = 'var(--accent)'; };
        b.onmouseleave = function() { b.style.borderColor = 'var(--border)'; b.style.color = 'var(--muted)'; };
        b.onclick = function() { document.getElementById('ai-input').value = s.replace(/[📊📈⚠️🎯🏆] ?/, ''); sendAiMessage(); };
        sugEl.appendChild(b);
    });
}

function loadSampleDataset(d) {
    aiDataLoaded = true;
    addAiMessage('Try "' + d.name + '"', 'user');
    showAiTyping();
    setTimeout(function() { removeAiTyping(); addAiMessage(aiResponses.sample, 'bot'); showAiDashboard(); }, 1800);
}

function sendAiMessage() {
    var input = document.getElementById('ai-input'), msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    addAiMessage(msg, 'user');
    showAiTyping();
    setTimeout(function() {
        removeAiTyping();
        var resp = aiDataLoaded ? aiResponses.default[aiResponseIdx % aiResponses.default.length] : "Please upload a dataset or try a sample first!";
        addAiMessage(resp, 'bot');
        if (aiDataLoaded) { aiResponseIdx++; showAiDashboard(); }
    }, 1500 + Math.random() * 1000);
}

function addAiMessage(text, role) {
    var msgs = document.getElementById('ai-messages'), div = document.createElement('div');
    div.style.cssText = 'display:flex;flex-direction:column;align-items:' + (role === 'user' ? 'flex-end' : 'flex-start') + ';';
    var b = document.createElement('div');
    b.style.cssText = role === 'user' ? 'background:linear-gradient(135deg,#4F46E5,#818CF8);color:white;border-radius:12px 12px 2px 12px;padding:10px 14px;max-width:80%;font-size:13px;white-space:pre-line;font-family:Outfit,sans-serif;' : 'background:var(--surface);border:1px solid var(--border);color:var(--text);border-radius:12px 12px 12px 2px;padding:10px 14px;max-width:90%;font-size:13px;white-space:pre-line;font-family:Outfit,sans-serif;line-height:1.6;';
    b.textContent = text;
    div.appendChild(b);
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
}

function showAiTyping() {
    var msgs = document.getElementById('ai-messages'), div = document.createElement('div');
    div.id = 'ai-typing';
    div.style.cssText = 'background:var(--surface);border:1px solid var(--border);color:var(--muted);border-radius:12px;padding:10px 14px;font-size:13px;display:inline-flex;gap:4px;align-items:center;';
    div.innerHTML = '<span style="animation:dotBlink 1s ease-in-out infinite">●</span><span style="animation:dotBlink 1s ease-in-out .2s infinite">●</span><span style="animation:dotBlink 1s ease-in-out .4s infinite">●</span>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
}

function removeAiTyping() { var t = document.getElementById('ai-typing'); if (t) t.remove(); }

function showAiDashboard() {
    var dash = document.getElementById('ai-dashboard');
    dash.style.display = 'block';
    var kd = [{ label: 'Total Records', value: '8,430', change: '+12%', color: '#22c55e' }, { label: 'Avg Revenue', value: '$284K', change: '+8%', color: '#22c55e' }, { label: 'Anomalies', value: '3', change: 'Found', color: '#f59e0b' }];
    document.getElementById('ai-kpis').innerHTML = kd.map(function(k) { return '<div class="kpi-card" style="padding:12px;"><div style="font-size:9px;font-family:IBM Plex Mono,monospace;color:var(--muted);margin-bottom:6px;">' + k.label + '</div><div style="font-size:16px;font-family:IBM Plex Mono,monospace;font-weight:700;">' + k.value + '</div><div style="font-size:10px;color:' + k.color + ';margin-top:3px;">' + k.change + '</div></div>'; }).join('');
    if (aiChart) aiChart.destroy();
    var ctx = document.getElementById('aiChart').getContext('2d');
    aiChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            datasets: [
                { label: 'Actual', data: [420, 510, 480, 620, 580, 740, 680, 820], borderColor: '#4F46E5', backgroundColor: 'rgba(79,70,229,0.1)', borderWidth: 2, fill: true, tension: .4, pointRadius: 3 },
                { label: 'Forecast', data: [null, null, null, null, null, null, 680, 820], borderColor: '#00D4FF', backgroundColor: 'rgba(0,212,255,0.08)', borderWidth: 2, borderDash: [5, 5], fill: true, tension: .4, pointRadius: 3 }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { font: { family: 'IBM Plex Mono', size: 10 }, color: '#94A3B8' } } }, scales: { x: { ticks: { font: { size: 9 }, color: '#94A3B8' } }, y: { ticks: { font: { size: 9 }, color: '#94A3B8' } } }, animation: { duration: 1500 } }
    });
}

function downloadReport() { alert('In a real deployment, this would generate and download a PDF report. (Mock feature)'); }
function handleDragOver(e) { e.preventDefault(); document.getElementById('upload-zone').classList.add('dragover'); }
function handleDragLeave() { document.getElementById('upload-zone').classList.remove('dragover'); }
function handleDrop(e) { e.preventDefault(); document.getElementById('upload-zone').classList.remove('dragover'); var f = e.dataTransfer.files[0]; if (f) processFile(f); }
function handleFileSelect(e) { if (e.target.files[0]) processFile(e.target.files[0]); }

function processFile(file) {
    aiDataLoaded = true;
    var st = document.getElementById('upload-status');
    st.style.display = 'block';
    st.innerHTML = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:13px;"><span>📄</span><span style="font-weight:500;">' + file.name + '</span></div><div style="background:var(--border);height:4px;border-radius:4px;overflow:hidden;"><div id="upload-progress" style="height:100%;width:0;background:linear-gradient(90deg,#4F46E5,#00D4FF);border-radius:4px;transition:width .1s;"></div></div>';
    var w = 0, prog = document.getElementById('upload-progress');
    var iv = setInterval(function() {
        w = Math.min(w + Math.random() * 15 + 5, 100);
        prog.style.width = w + '%';
        if (w >= 100) {
            clearInterval(iv);
            st.innerHTML += '<p style="font-size:12px;color:#22c55e;margin-top:6px;">✅ File processed</p>';
            addAiMessage('Uploaded: ' + file.name, 'user');
            showAiTyping();
            setTimeout(function() { removeAiTyping(); addAiMessage(aiResponses.upload, 'bot'); showAiDashboard(); }, 2000);
        }
    }, 80);
}
