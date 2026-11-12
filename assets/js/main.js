/* Livio's English Portfolio – interactions */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Navigation ---------- */
  const nav = $('.nav');
  const toggle = $('.nav-toggle');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  $$('.nav-links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  /* ---------- Scroll: progress bar, nav, parallax, glass ---------- */
  const progress = $('.progress');
  const parallax = $$('[data-parallax]');
  const glass = $('[data-glass]');
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty('--p', h > 0 ? scrollY / h : 0);
    nav.classList.toggle('scrolled', scrollY > 10);
    if (reduce) return;
    parallax.forEach(el => {
      const r = el.getBoundingClientRect();
      const t = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      el.style.setProperty('--py', `${t * -40}px`);
    });
    if (glass) {
      const sec = glass.closest('section').getBoundingClientRect();
      const w = Math.min(1, Math.max(0.1, (innerHeight - sec.top) / (sec.height + innerHeight * 0.3)));
      glass.style.setProperty('--w', w.toFixed(3));
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---------- Hero: spotlight follows the mouse ---------- */
  const hero = $('[data-spotlight]');
  hero?.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', `${e.clientX - r.left}px`);
    hero.style.setProperty('--my', `${e.clientY - r.top}px`);
  });

  /* ---------- Hero: rotating words ---------- */
  const rot = $('[data-rotator]');
  if (rot && !reduce) {
    const words = $$('span', rot);
    let i = 0;
    setInterval(() => {
      const cur = words[i];
      i = (i + 1) % words.length;
      cur.classList.remove('on'); cur.classList.add('off');
      words[i].classList.remove('off'); words[i].classList.add('on');
      setTimeout(() => cur.classList.remove('off'), 500);
    }, 2600);
  }

  /* ---------- Hero: terminal typing effect ---------- */
  const typer = $('[data-typer]');
  if (typer && !reduce) {
    const html = typer.innerHTML;
    typer.innerHTML = '';
    let pos = 0;
    const caret = '<span class="caret"></span>';
    const step = () => {
      if (pos >= html.length) { typer.innerHTML = html + caret; return; }
      if (html[pos] === '<') pos = html.indexOf('>', pos) + 1;      // skip tags in one go
      else if (html[pos] === '&') pos = html.indexOf(';', pos) + 1; // skip entities
      else pos++;
      typer.innerHTML = html.slice(0, pos) + caret;
      const ch = html[pos - 1];
      setTimeout(step, ch === '\n' ? 220 : 18 + Math.random() * 30);
    };
    setTimeout(step, 700);
  }

  /* ---------- Count-up numbers ---------- */
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = +el.dataset.count, suffix = el.dataset.suffix || '';
      const t0 = performance.now(), dur = reduce ? 1 : 1200;
      const tick = now => {
        const k = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suffix;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  });
  $$('[data-count]').forEach(el => countIO.observe(el));

  /* ---------- 3D tilt cards ---------- */
  if (!reduce && matchMedia('(hover: hover)').matches) {
    $$('[data-tilt]').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg) translateY(-4px)`;
        card.style.setProperty('--gx', `${x * 100}%`);
        card.style.setProperty('--gy', `${y * 100}%`);
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------- Toggle groups (shared helper) ---------- */
  const group = (container, onChange) => {
    const btns = $$('button', container);
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(x => x.setAttribute('aria-pressed', x === b));
      onChange(b);
    }));
  };

  /* Entry 2: "what if I forget" chips */
  $$('[data-chips]').forEach(c => {
    const panel = $(c.dataset.chips);
    group(c, b => { panel.innerHTML = `<p>${b.dataset.text}</p>`; });
  });

  /* Entry 2: flashcards */
  $$('.flash').forEach(f => f.addEventListener('click', () => f.classList.toggle('flipped')));
  $$('[data-search]').forEach(input => input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    $$(input.dataset.search).forEach(card => { card.hidden = q && !card.dataset.words.toLowerCase().includes(q); });
  }));
  $$('[data-shuffle]').forEach(btn => btn.addEventListener('click', () => {
    const box = $(btn.dataset.shuffle);
    const cards = $$('.flash', box);
    const swap = () => {
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      cards.forEach(c => box.appendChild(c));
    };
    document.startViewTransition && !reduce ? document.startViewTransition(swap) : swap();
  }));
  $$('[data-flipall]').forEach(btn => btn.addEventListener('click', () => {
    const cards = $$(btn.dataset.flipall);
    const anyFront = cards.some(c => !c.classList.contains('flipped'));
    cards.forEach((c, i) => setTimeout(() => c.classList.toggle('flipped', anyFront), i * 40));
  }));
  // give every flashcard its own view-transition name, so shuffling animates
  $$('.flash').forEach((f, i) => { f.style.viewTransitionName = `flash-${i}`; });

  /* Entry 3: grammar highlighter */
  $$('[data-hl-target]').forEach(c => {
    const target = $(c.dataset.hlTarget);
    group(c, b => { target.dataset.hl = b.dataset.mode; });
  });

  /* Entry 4: quiz */
  $$('[data-quiz-toggle]').forEach(c => {
    const box = $(c.dataset.quizToggle);
    const scoreEl = $('[data-score]', box);
    const resetBtn = $('[data-quiz-reset]', box);
    const cards = $$('.qcard', box);
    let score = 0, answered = 0;
    const reset = () => {
      score = 0; answered = 0;
      cards.forEach(q => q.classList.remove('done', 'right', 'wrong'));
      scoreEl.querySelector('b').textContent = 0;
      resetBtn.hidden = true;
    };
    group(c, b => {
      const quiz = b.dataset.mode === 'quiz';
      box.classList.toggle('quiz-mode', quiz);
      scoreEl.hidden = !quiz;
      reset();
    });
    cards.forEach(q => $$('[data-guess]', q).forEach(btn => btn.addEventListener('click', () => {
      if (q.classList.contains('done')) return;
      const ok = btn.dataset.guess === q.dataset.answer;
      q.classList.add('done', ok ? 'right' : 'wrong');
      if (ok) score++;
      answered++;
      scoreEl.querySelector('b').textContent = score;
      if (answered === cards.length) resetBtn.hidden = false;
    })));
    resetBtn.addEventListener('click', reset);
  });
})();
