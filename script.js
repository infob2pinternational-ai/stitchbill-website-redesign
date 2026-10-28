document.querySelectorAll('[data-dialog]').forEach(button => {
  button.addEventListener('click', () => document.getElementById(button.dataset.dialog).showModal());
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); }});
});

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
