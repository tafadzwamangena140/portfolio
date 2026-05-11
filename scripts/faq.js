var faqs = [
    { q: 'What tools do you use for data analysis?', a: "My primary stack includes SQL (PostgreSQL, BigQuery, Snowflake), Python with Pandas/NumPy/Matplotlib, Power BI and Tableau for visualisation, and Excel/VBA for quick analysis." },
    { q: "What industries have you worked with?", a: "I've delivered projects across e-commerce, SaaS, financial services, healthcare, and retail. Each sector brings unique data challenges and I adapt my approach accordingly." },
    { q: 'Can you handle large datasets?', a: 'Absolutely. I work with datasets ranging from thousands to hundreds of millions of rows, using distributed processing tools like Spark, BigQuery, and optimised SQL.' },
    { q: 'Do you offer freelance or full-time services?', a: "Both! I take on freelance projects (hourly or fixed-price), ongoing retainer contracts, and I'm open to full-time opportunities with the right company." },
    { q: 'How do you approach data cleaning?', a: 'My data cleaning process: (1) Audit — profiling nulls, duplicates, outliers; (2) Standardise — consistent formatting; (3) Validate — business rule checks; (4) Document — every transformation logged for reproducibility.' },
    { q: 'Can I see real project results?', a: 'Yes — my portfolio includes case studies with quantified outcomes. One project identified $2.4M in revenue leakage; another reduced stockout incidents by 28%.' }
];

function initFaq() {
    var c = document.getElementById('faq-container');
    faqs.forEach(function(f, i) {
        var item = document.createElement('div');
        item.className = 'card faq-item';
        item.style.overflow = 'hidden';
        item.innerHTML = '<div style="padding:18px 20px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;" onclick="toggleFaq(' + i + ')"><span style="font-family:Syne,sans-serif;font-weight:600;font-size:15px;flex:1;padding-right:16px;">' + f.q + '</span><span class="faq-icon" style="font-size:20px;flex-shrink:0;color:var(--accent);font-weight:300;">+</span></div><div class="faq-answer"><p style="padding:0 20px 18px;font-size:14px;color:var(--muted);line-height:1.7;font-weight:300;">' + f.a + '</p></div>';
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

function submitContact() {
    var name = document.getElementById('cf-name').value.trim(),
        email = document.getElementById('cf-email').value.trim(),
        msg = document.getElementById('cf-message').value.trim();
    if (!name || !email || !msg) { alert('Please fill in all fields.'); return; }
    var leads = JSON.parse(localStorage.getItem('portfolio_leads') || '[]');
    leads.push({ name: name, email: email, message: msg, time: new Date().toISOString() });
    localStorage.setItem('portfolio_leads', JSON.stringify(leads));
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('contact-success').style.display = 'block';
}

function showDemoModal() { document.getElementById('demo-modal').style.display = 'flex'; }
function closeDemoModal() { document.getElementById('demo-modal').style.display = 'none'; }
