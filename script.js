// ═══════════════════════════════════════════════════════════
//  NAVBAR: efeito de scroll + hambúrguer
// ═══════════════════════════════════════════════════════════
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

// Fecha menu ao clicar em link
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ═══════════════════════════════════════════════════════════
//  ANIMAÇÕES DE ENTRADA (IntersectionObserver)
// ═══════════════════════════════════════════════════════════
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Adiciona classe fade-in a todos os elementos observáveis
const animTargets = [
  '#hero-content', '#hero-image',
  '#sobre-text', '#sobre-values',
  '#value-1', '#value-2', '#value-3',
  '#trat-header', '#tratamentos-grid .trat-card',
  '#dep-header',  '#dep-1', '#dep-2', '#dep-3',
  '#contato-info', '#contato-form',
  '#footer'
];

animTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(el);
  });
});

// ═══════════════════════════════════════════════════════════
//  FORMULÁRIO
// ═══════════════════════════════════════════════════════════
function handleFormSubmit(event) {
  event.preventDefault();
  const btn     = document.getElementById('btn-enviar');
  const success = document.getElementById('form-success');
  const form    = event.target;

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando…';

  // Simula envio (substitua por fetch real ao backend)
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar mensagem';
    btn.disabled  = false;
    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1800);
}

// ═══════════════════════════════════════════════════════════
//  MÁSCARA DE TELEFONE
// ═══════════════════════════════════════════════════════════
const telInput = document.getElementById('telefone');
if (telInput) {
  telInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10)
      v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    else if (v.length > 6)
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    else if (v.length > 2)
      v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    else if (v.length > 0)
      v = v.replace(/^(\d*)/, '($1');
    e.target.value = v;
  });
}

// ═══════════════════════════════════════════════════════════
//  SCROLL SUAVE PARA ÂNCORAS
// ═══════════════════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ═══════════════════════════════════════════════════════════
//  DESTAQUE DO LINK ATIVO NA NAV
// ═══════════════════════════════════════════════════════════
const sections    = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('#nav-menu a:not(.btn-nav)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.classList.toggle('active-link', a.getAttribute('href') === `#${current}`);
  });
});
