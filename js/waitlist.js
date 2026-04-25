const form = document.querySelector('[data-waitlist-form]');
if (form) {
  const email = form.querySelector('input[type="email"]');
  const button = form.querySelector('button[type="submit"]');
  const status = document.querySelector('[data-form-status]');
  const lang = (document.documentElement.lang || 'en').toLowerCase().startsWith('de') ? 'de' : 'en';
  const copy = {
    en: {
      invalid: 'Please enter a valid email address.',
      loading: 'Sending...',
      success: '<p style="font-size:1.1rem;color:#fff"><strong>Thank you!</strong> You are now on the NetzVolt waitlist.</p>',
      error: 'Submission failed. Please email <a href="mailto:kontakt@netzvolt.de">kontakt@netzvolt.de</a>.',
      reset: 'Request access'
    },
    de: {
      invalid: 'Bitte geben Sie eine gueltige E-Mail-Adresse ein.',
      loading: 'Wird gesendet...',
      success: '<p style="font-size:1.1rem;color:#fff"><strong>Danke!</strong> Sie stehen jetzt auf der NetzVolt-Warteliste.</p>',
      error: 'Senden fehlgeschlagen. Bitte an <a href="mailto:kontakt@netzvolt.de">kontakt@netzvolt.de</a> schreiben.',
      reset: 'Zugang anfragen'
    }
  };
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const confetti = () => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:80';
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      s: 3 + Math.random() * 6,
      v: 2 + Math.random() * 3,
      c: ['#2E86C1', '#10B981', '#F59E0B', '#D6EAF8'][Math.floor(Math.random() * 4)]
    }));
    let frame = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.y += p.v;
        ctx.fillStyle = p.c;
        ctx.fillRect(p.x, p.y, p.s, p.s * 0.7);
      });
      if (++frame < 140) requestAnimationFrame(loop);
      else canvas.remove();
    };
    loop();
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!regex.test(email.value.trim())) {
      status.textContent = copy[lang].invalid;
      status.style.color = '#fca5a5';
      return;
    }
    button.disabled = true;
    button.textContent = copy[lang].loading;
    status.textContent = '';

    try {
      const data = new FormData(form);
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error();
      form.innerHTML = copy[lang].success;
      confetti();
    } catch {
      status.innerHTML = copy[lang].error;
      status.style.color = '#fca5a5';
      button.disabled = false;
      button.textContent = copy[lang].reset;
    }
  });
}