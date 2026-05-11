(function () {

  async function loadComponent(el) {
    const src = el.getAttribute('data-component');
    if (!src) return;

    try {
      const res = await fetch(src);

      if (!res.ok) {
        el.innerHTML = `<p style="color:red;font-size:12px;">
          Could not load component: <strong>${src}</strong> (${res.status})
        </p>`;
        return;
      }

      el.innerHTML = await res.text();

      el.dispatchEvent(new CustomEvent('component:loaded', {
        bubbles: true,
        detail: { src }
      }));

    } catch (err) {
      el.innerHTML = `<p style="color:orange;font-size:12px;padding:8px;">
        Component loader requires a local server.<br>
        Run: <code>npx serve .</code> or <code>python -m http.server</code>
      </p>`;
      console.warn('Component load error:', src, err);
    }
  }

  async function loadAll() {
    const placeholders = document.querySelectorAll('[data-component]');
    await Promise.all([...placeholders].map(loadComponent));
    document.dispatchEvent(new CustomEvent('components:ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAll);
  } else {
    loadAll();
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.dispatchEvent(new CustomEvent('components:ready'));
  });

})();
