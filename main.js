document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Nav scroll state ---------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
}));

/* ---------- Cursor glow (desktop only) ---------- */
const cursor = document.getElementById('sunCursor');
if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.classList.add('active');
  });
  document.addEventListener('mouseleave', () => cursor.classList.remove('active'));
}

/* ---------- Animated stat counters ---------- */
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statNumbers.forEach(el => statObserver.observe(el));

function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = value.toLocaleString('es-SV') + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------- Scroll reveal (sparingly: testimonials/projects) ---------- */
document.querySelectorAll('.project-card').forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Savings calculator ---------- */
const bill = document.getElementById('bill');
const billRange = document.getElementById('billRange');
const rateButtons = document.querySelectorAll('.rate-btn');
const resMonthly = document.getElementById('resMonthly');
const resYearly = document.getElementById('resYearly');
const resPayback = document.getElementById('resPayback');

let currentRate = 0.9;
const SYSTEM_COST_PER_SAVED_DOLLAR_MONTHLY = 55; // supuesto referencial para estimar retorno

function syncInputs(source) {
  if (source === 'number') billRange.value = bill.value;
  else bill.value = billRange.value;
}

function calculate() {
  const monthlyBill = Math.max(parseFloat(bill.value) || 0, 0);
  const monthlySavings = monthlyBill * currentRate;
  const yearlySavings = monthlySavings * 12;
  const estimatedSystemCost = monthlySavings * SYSTEM_COST_PER_SAVED_DOLLAR_MONTHLY;
  const paybackYears = yearlySavings > 0 ? (estimatedSystemCost / yearlySavings) : 0;

  resMonthly.textContent = '$' + Math.round(monthlySavings).toLocaleString('es-SV');
  resYearly.textContent = '$' + Math.round(yearlySavings).toLocaleString('es-SV');
  resPayback.textContent = (paybackYears > 0 ? paybackYears.toFixed(1) : '0') + ' años';
}

bill.addEventListener('input', () => { syncInputs('number'); calculate(); });
billRange.addEventListener('input', () => { syncInputs('range'); calculate(); });

rateButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    rateButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentRate = parseFloat(btn.dataset.rate);
    calculate();
  });
});

calculate();

/* ---------- Contact form (placeholder submit) ---------- */
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Aquí se conecta un endpoint real (Formspree, backend propio, etc.)
  formNote.textContent = '¡Gracias! Un asesor de ENOVA te contactará pronto.';
  form.reset();
});
