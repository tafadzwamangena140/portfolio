var chatOpen = false, chatStage = 'init', chatUserData = {};
var chatSuggestions = [
    { label: '👋 Who are you?', reply: "Hi! I'm Tafadzwa Mangena, a Data Analyst with 5+ years of experience turning messy data into clean insights. I specialise in SQL, Python, Power BI, and building executive dashboards. Currently available for freelance projects and full-time roles." },
    { label: '📊 View Projects', reply: "My featured projects include:\n\n• 🛒 E-Commerce Revenue Analysis — Found $2.4M leakage\n• 💰 Financial KPI Dashboard — 40+ KPIs for C-suite\n• 🧬 Customer LTV Model — 34% ROI improvement\n\nScroll to the Projects section to see all 6 case studies!" },
    { label: '💼 My Skills', reply: "My core stack:\n\n🗃️ SQL — 95%\n📊 Excel/VBA — 92%\n📈 Power BI — 90%\n🐍 Python (Pandas) — 82%\n🎨 Tableau — 78%\n📉 R/Statistics — 72%" },
    { label: '📞 Contact Me', reply: "Reach me at:\n\n📧 tafadzwa.mangena@datavision.io\n📍 Zimbabwe (Remote-friendly)\n⏱️ Reply within 24 hours\n\nOr fill out the contact form above!" },
    { label: '📥 Collect My Info', reply: "I'd love to stay in touch! What's your name?" }
];

function initChatbot() {
    renderChatSuggestions();
    addChatMessage("👋 Hey there! I'm Tafadzwa's portfolio assistant. Ask me anything or use the quick options below!", 'bot');
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
        b.style.cssText = 'padding:5px 11px;border-radius:99px;font-size:11px;font-family:IBM Plex Mono,monospace;border:1px solid var(--border);color:var(--muted);background:var(--bg);cursor:pointer;transition:all .2s;';
        b.onmouseenter = function() { b.style.borderColor = 'var(--accent)'; b.style.color = 'var(--accent)'; };
        b.onmouseleave = function() { b.style.borderColor = 'var(--border)'; b.style.color = 'var(--muted)'; };
        b.onclick = function() {
            addChatMessage(s.label, 'user');
            if (s.label.includes('Collect')) chatStage = 'collect_name';
            setTimeout(function() { addChatMessage(s.reply, 'bot'); }, 700);
        };
        c.appendChild(b);
    });
}

function sendChat() {
    var input = document.getElementById('chat-input'), msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    addChatMessage(msg, 'user');
    if (chatStage === 'collect_name') {
        chatUserData.name = msg;
        chatStage = 'collect_email';
        setTimeout(function() { addChatMessage('Nice to meet you, ' + msg + '! What is your email address?', 'bot'); }, 700);
        return;
    }
    if (chatStage === 'collect_email') {
        chatUserData.email = msg;
        chatStage = 'collect_message';
        setTimeout(function() { addChatMessage('Got it! What would you like to discuss with Tafadzwa?', 'bot'); }, 700);
        return;
    }
    if (chatStage === 'collect_message') {
        chatUserData.message = msg;
        chatStage = 'done';
        var leads = JSON.parse(localStorage.getItem('portfolio_chat_leads') || '[]');
        leads.push(Object.assign({}, chatUserData, { time: new Date().toISOString() }));
        localStorage.setItem('portfolio_chat_leads', JSON.stringify(leads));
        setTimeout(function() { addChatMessage('Thank you! Info saved. Tafadzwa will follow up within 24 hours!', 'bot'); }, 700);
        return;
    }
    var lc = msg.toLowerCase();
    var reply = "Interesting question! You can also reach Tafadzwa directly at tafadzwa.mangena@datavision.io";
    if (lc.includes('sql') || lc.includes('skill')) reply = "Tafadzwa's core skills: SQL (95%), Power BI (90%), Excel (92%), Python (82%), Tableau (78%). Check the About section!";
    if (lc.includes('project')) reply = "Tafadzwa has 6 featured projects covering e-commerce, finance, HR, supply chain, and social media analytics.";
    if (lc.includes('hire') || lc.includes('available')) reply = "Great news — Tafadzwa is currently available for both freelance projects and full-time roles!";
    if (lc.includes('hello') || lc.includes('hi')) reply = "Hey! Great to see you here. I can tell you about Tafadzwa's skills, projects, or connect you two.";
    setTimeout(function() { addChatMessage(reply, 'bot'); }, 700);
}

function addChatMessage(text, role) {
    var c = document.getElementById('chat-messages'), div = document.createElement('div');
    div.style.cssText = 'display:flex;flex-direction:column;align-items:' + (role === 'user' ? 'flex-end' : 'flex-start') + ';';
    var b = document.createElement('div');
    b.style.cssText = role === 'user' ? 'background:linear-gradient(135deg,#4F46E5,#818CF8);color:white;border-radius:12px 12px 2px 12px;padding:9px 13px;max-width:80%;font-size:13px;font-family:Outfit,sans-serif;white-space:pre-line;' : 'background:var(--border);color:var(--text);border-radius:12px 12px 12px 2px;padding:9px 13px;max-width:85%;font-size:13px;font-family:Outfit,sans-serif;line-height:1.5;white-space:pre-line;';
    b.textContent = text;
    div.appendChild(b);
    c.appendChild(div);
    c.scrollTop = c.scrollHeight;
}
