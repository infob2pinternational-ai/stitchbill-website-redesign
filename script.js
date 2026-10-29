// Static HTML is the fallback. Motion is decorative and never sends messages.
(() => {
  const scene = document.querySelector('[data-living-interface]');
  if (!scene || !window.matchMedia) return;
  const toggle = scene.querySelector('.motion-toggle');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let pausedByUser = false;
  function updateMotion() {
    const animate = !preference.matches && !pausedByUser;
    scene.classList.toggle('is-animated', animate);
    toggle.hidden = preference.matches;
    toggle.textContent = pausedByUser ? 'Play animation' : 'Pause animation';
    toggle.setAttribute('aria-pressed', String(pausedByUser));
  }
  toggle.addEventListener('click', () => {
    pausedByUser = !pausedByUser;
    updateMotion();
  });
  if (preference.addEventListener) preference.addEventListener('change', updateMotion);
  else if (preference.addListener) preference.addListener(updateMotion);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      scene.classList.toggle('is-offscreen', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(scene);
  }
  document.addEventListener('visibilitychange', () => {
    scene.classList.toggle('is-offscreen', document.hidden || scene.getBoundingClientRect().bottom < 0 || scene.getBoundingClientRect().top > innerHeight);
  });
  updateMotion();
})();

// Free, session-local diagnostics. No cookies, IDs, payload text or network transport.
(() => {
  const key = 'stitchbill.enquiry-counts.v1';
  const allowed = ['header','hero','remarketing','availability','faq','final','footer'];
  function read() {
    try { const raw = JSON.parse(sessionStorage.getItem(key) || '{}');
      return Object.fromEntries(allowed.map(k => [k, Number.isSafeInteger(raw?.[k]) && raw[k] >= 0 ? raw[k] : 0]));
    } catch { return Object.fromEntries(allowed.map(k => [k, 0])); }
  }
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[data-enquiry]');
    if (!link || !allowed.includes(link.dataset.enquiry)) return;
    try { const counts = read(); counts[link.dataset.enquiry] += 1; sessionStorage.setItem(key, JSON.stringify(counts)); } catch { /* Contact remains usable if storage is blocked. */ }
  });
  const output = document.querySelector('[data-measurement]');
  if (output) {
    const status = document.querySelector('[data-measurement-status]');
    const reset = document.querySelector('[data-reset-counts]');
    function render(message = '') {
      try { sessionStorage.getItem(key); }
      catch {
        output.replaceChildren();
        reset.hidden = true;
        status.textContent = 'Measurement unavailable: browser session storage is blocked. WhatsApp links still work.';
        return;
      }
      reset.hidden = false;
      status.textContent = message || 'Counts for this tab session only. These are link activations, not completed enquiries.';
      output.replaceChildren(...Object.entries(read()).map(([label, count]) => {
        const row = document.createElement('li'); row.textContent = `${label}: ${count}`; return row;
      }));
    }
    reset.addEventListener('click', () => {
      try { sessionStorage.removeItem(key); render('This tab’s counts have been cleared.'); }
      catch { status.textContent = 'Could not clear counts: browser session storage is unavailable.'; }
    });
    window.addEventListener('pageshow', () => render());
    render();
  }
})();
