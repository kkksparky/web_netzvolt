const header = document.querySelector('.site-header');
const toggle = document.querySelector('[data-menu-toggle]');
const panel = document.querySelector('[data-mobile-panel]');
const html = document.documentElement;

const setScrolled = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 50);
};

window.addEventListener('scroll', setScrolled, { passive: true });
setScrolled();

if (toggle && panel) {
  toggle.addEventListener('click', () => {
    const open = panel.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    html.style.overflow = open ? 'hidden' : '';
  });
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    panel?.classList.remove('open');
    html.style.overflow = '';
  });
});

const languagePairs = {
  'index.html': { en: './index.html', de: './index-de.html' },
  'index-en.html': { en: './index.html', de: './index-de.html' },
  'index-de.html': { en: './index.html', de: './index-de.html' },
  'product-en.html': { en: './product-en.html', de: './product.html' },
  'product.html': { en: './product-en.html', de: './product.html' },
  'how-it-works-en.html': { en: './how-it-works-en.html', de: './how-it-works.html' },
  'how-it-works.html': { en: './how-it-works-en.html', de: './how-it-works.html' },
  'for-installers-en.html': { en: './for-installers-en.html', de: './for-installers.html' },
  'for-installers.html': { en: './for-installers-en.html', de: './for-installers.html' },
  'pricing-en.html': { en: './pricing-en.html', de: './pricing.html' },
  'pricing.html': { en: './pricing-en.html', de: './pricing.html' },
  'faq-en.html': { en: './faq-en.html', de: './faq.html' },
  'faq.html': { en: './faq-en.html', de: './faq.html' },
  'imprint.html': { en: './imprint.html', de: './imprint.html' },
  'privacy.html': { en: './privacy.html', de: './privacy.html' },
  '404.html': { en: './index.html', de: './index-de.html' }
};

document.querySelectorAll('[data-lang-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const label = button.textContent?.trim().toUpperCase();
    const current = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const hash = window.location.hash || '';
    const pair = languagePairs[current] || { en: './index.html', de: './index-de.html' };
    const target = label === 'DE' ? pair.de : pair.en;
    window.location.href = `${target}${hash}`;
  });
});