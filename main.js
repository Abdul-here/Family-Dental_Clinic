/* ===========================
   FAMILY DENTAL CLINIC
   Main JavaScript
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ─── MOBILE MENU ─── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      }
    });
  }

  /* ─── AOS — Custom Scroll Reveal ─── */
  const aosElements = document.querySelectorAll('[data-aos]');
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, parseInt(delay));
        aosObserver.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  aosElements.forEach(el => aosObserver.observe(el));

  /* ─── FAQ ACCORDION ─── */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    if (q) {
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(i => i.classList.remove('open'));
        // Open clicked if it was closed
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  /* ─── BUTTON RIPPLE ─── */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute;
        border-radius:50%;
        background:rgba(255,255,255,0.3);
        width:10px;height:10px;
        top:${e.clientY - rect.top - 5}px;
        left:${e.clientX - rect.left - 5}px;
        transform:scale(0);
        animation:rippleAnim 0.6s ease-out;
        pointer-events:none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple keyframe if not present
  if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `@keyframes rippleAnim { to { transform:scale(30); opacity:0; } }`;
    document.head.appendChild(style);
  }

  /* ─── SMOOTH TRANSITION DURATION FOR AOS ─── */
  document.querySelectorAll('[data-aos]').forEach(el => {
    const dur = el.getAttribute('data-aos-duration') || 700;
    el.style.transitionDuration = dur + 'ms';
  });

});
