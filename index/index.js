 // ── Custom cursor ──────────────────────────────────────────
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
    });
    function animateRing() {
      rx += (mx - rx - 18) * 0.15;
      ry += (my - ry - 18) * 0.15;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();
    document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });

    // ── Navbar scroll ──────────────────────────────────────────
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── Typing animation ───────────────────────────────────────
    const phrases = ['Frontend Developer', 'UI Engineer', 'JavaScript Learner', 'Building cool things'];
    let pi = 0, ci = 0, del = false;
    const typedEl = document.getElementById('typedText');
    function typeLoop() {
      const phrase = phrases[pi];
      if (!del) {
        typedEl.textContent = phrase.slice(0, ++ci);
        if (ci === phrase.length) { del = true; setTimeout(typeLoop, 1800); return; }
        setTimeout(typeLoop, 80);
      } else {
        typedEl.textContent = phrase.slice(0, --ci);
        if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(typeLoop, 400); return; }
        setTimeout(typeLoop, 40);
      }
    }
    setTimeout(typeLoop, 1200);

    // ── Scroll reveal ──────────────────────────────────────────
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          const bars = e.target.querySelectorAll ? e.target.querySelectorAll('.skill-bar-fill') : [];
          bars.forEach(b => b.closest('.skill-card').classList.add('visible'));
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));

    // ── Skill bar trigger ──────────────────────────────────────
    const skillCards = document.querySelectorAll('.skill-card');
    const sio = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.3 });
    skillCards.forEach(c => sio.observe(c));

    // ── Project card navigation ────────────────────────────────
    // Each card has a data-url attribute with the target page path.
    // Clicking anywhere on the card navigates to that page.
    // Inner Live/GitHub links use event.stopPropagation() so they
    // work independently without triggering card navigation.
    document.querySelectorAll('.project-card[data-url]').forEach(card => {
      card.addEventListener('click', function () {
        const url = this.getAttribute('data-url');
        if (url) window.location.href = url;
      });
    });