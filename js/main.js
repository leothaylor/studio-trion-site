/* Studio Trion — main.js */

(function () {
  'use strict';

  /* ---- Header: scroll shadow + active nav ---- */
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  function onScroll() {
    // shadow no scroll
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // active nav link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fechar ao clicar em link do menu
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Footer: ano dinâmico ---- */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Formulário de contato ---- */
  const form = document.getElementById('contato-form');
  const formSuccess = document.getElementById('form-success');

  if (form && formSuccess) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validação simples dos campos obrigatórios
      const nome = form.querySelector('#nome');
      const telefone = form.querySelector('#telefone');
      const modalidade = form.querySelector('#modalidade');
      let valid = true;

      [nome, telefone, modalidade].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#c0392b';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      /*
       * INTEGRAÇÃO PENDENTE:
       * Substituir este bloco por chamada real a backend/formulário (ex: Formspree, Make, n8n, etc.)
       * quando o endpoint de envio for definido pelo Studio Trion.
       *
       * Exemplo com Formspree:
       *   const data = new FormData(form);
       *   fetch('https://formspree.io/f/XXXXXXXX', { method: 'POST', body: data })
       *     .then(r => r.ok ? showSuccess() : alert('Erro ao enviar'))
       *     .catch(() => alert('Erro de rede'));
       */

      // Por enquanto: simula envio e mostra mensagem de sucesso
      form.hidden = true;
      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ---- Smooth scroll para âncoras (complementar ao CSS) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
