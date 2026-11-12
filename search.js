(function () {
  // ===== SOZLAMA: sahifa fayl nomlari =====
  // Fayllaringiz nomi boshqacha bo'lsa, faqat shu yerni o'zgartiring.
  const PAGES = { catalog: 'catalog.html', crafts: 'crafts.html', others: 'others.html' };

  // ===== Bo'limlar =====
  // page: qaysi sahifada turadi. hash: bo'lim bosilganda filtr (#atirgul) qo'yiladimi.
  // extra: faqat mahsulot qidirishda ishlatiladigan qo'shimcha so'zlar.
  const CATS = {
    atirgul:    { label: 'Atirgul',    icon: '🌹', page: 'catalog', hash: true,  all: 'Barcha atirgul guldastalari',    extra: 'guldasta guldastalar', alias: 'atirgul atirgullar roza' },
    lola:       { label: 'Lola',       icon: '🌷', page: 'catalog', hash: true,  all: 'Barcha lola guldastalari',       extra: 'guldasta guldastalar', alias: 'lola lolalar' },
    pion:       { label: 'Pion',       icon: '🌸', page: 'catalog', hash: true,  all: 'Barcha pion guldastalari',       extra: 'guldasta guldastalar', alias: 'pion pionlar' },
    liliya:     { label: 'Liliya',     icon: '🪷', page: 'catalog', hash: true,  all: 'Barcha liliya guldastalari',     extra: 'guldasta guldastalar', alias: 'liliya liliyalar' },
    kungaboqar: { label: 'Kungaboqar', icon: '🌻', page: 'catalog', hash: true,  all: 'Barcha kungaboqar guldastalari', extra: 'guldasta guldastalar', alias: 'kungaboqar kungaboqarlar kungaboqor' },
    orxideya:   { label: 'Orxideya',   icon: '🪻', page: 'catalog', hash: true,  all: 'Barcha orxideya guldastalari',   extra: 'guldasta guldastalar', alias: 'orxideya orxideyalar orkideya orxidea' },
    xrizantema: { label: 'Xrizantema', icon: '🌼', page: 'catalog', hash: true,  all: 'Barcha xrizantema guldastalari', extra: 'guldasta guldastalar', alias: 'xrizantema xrizantemalar xrizentema krizantema' },
    gulchambar: { label: 'Gulchambar', icon: '🏵️', page: 'crafts',  hash: false, all: 'Barcha gulchambarlar',           extra: '',                     alias: 'gulchambar gulchambarlar gul chambar bezak bezaklar venok' },
    vaza:       { label: 'Vaza',       icon: '🏺', page: 'others',  hash: true,  all: 'Barcha vazalar',                 extra: 'boshqalar',            alias: 'vaza vazalar vazza' },
    idish:      { label: 'Idish',      icon: '🪴', page: 'others',  hash: true,  all: 'Barcha idishlar',                extra: 'boshqalar',            alias: 'idish idishlar keramik savat tuvak' },
    quti:       { label: 'Quti',       icon: '🎁', page: 'others',  hash: true,  all: 'Barcha gul qutilari',            extra: 'boshqalar',            alias: 'quti qutilar gul qutisi sovga sovga qutisi' }
  };

  // ===== Qidiriladigan ro'yxat: [bo'lim, nom, tavsif] =====
  // Nom catalog.js / crafts.js / others.js dagi bilan bir xil bo'lsin.
  const PRODUCTS = [
    ['atirgul', "Shaftoli rangli bog' atirgullari", "Yumshoq shaftoli tusdagi bog' atirgullari, kurtaklari bilan"],
    ['atirgul', "Qizil atirgullar qutida", "To'q qizil atirgullar dumaloq qizil qutida, atlas lenta bilan"],
    ['atirgul', "Oq-pushti atirgullar qutida", "Oq va nozik pushti atirgullar pushti qutida, krem lenta bilan"],
    ['atirgul', "Oq atirgullar pushti qutida", "Oppoq atirgullar yumshoq pushti dumaloq qutida"],
    ['atirgul', "Pushti atirgullar oq qutida", "Mayin pushti atirgullar oq qutida, oltin hoshiyali"],
    ['atirgul', "Ko'k atirgullar", "Noyob ko'k atirgullar evkalipt novdalari bilan, qo'lda bog'langan"],
    ['atirgul', "Sariq atirgullar vazada", "Quyoshdek sariq atirgullar shisha vazada, yashil barglar bilan"],
    ['atirgul', "Aralash atirgullar", "Sariq, to'q sariq va pushti atirgullar, gipsofila bilan, yurakli qutida"],

    ['lola', "Pushti lolalar chelakda", "To'q pushti lolalar pushti chelakda, yashil barglar bilan"],
    ['lola', "Pushti-oq lolalar", "Pushti va oq lolalar pushti qog'ozga o'ralgan, lentali"],
    ['lola', "Sariq-qizil lolalar", "Yo'l-yo'l sariq-qizil lolalar, yorqin va quvnoq kayfiyat uchun"],
    ['lola', "Oq lolalar", "Sof oq lolalar oq lenta bilan, kelin guldastasiga ham mos"],
    ['lola', "Qizil lolalar", "Yirik qizil lolalar shaftoli rangli qog'ozda"],

    ['pion', "Oq pionlar vazada", "Oppoq, to'la ochilgan pionlar oq vazada, nafis va hashamatli"],
    ['pion', "Pushti pionlar va evkalipt", "Nozik pushti pionlar evkalipt shoxlari bilan, tabiiy uslubda"],
    ['pion', "Sariq pionlar", "Noyob sariq pionlar, markazi qizg'ish, yorqin guldasta"],
    ['pion', "To'q pushti pionlar vazada", "To'q pushti pionlar shisha vazada, to'kis guldasta"],
    ['pion', "Qizil pionlar", "Chuqur qizil pionlar shisha silindrda"],
    ['pion', "Marjon rangli pionlar", "Iliq marjon tusdagi pionlar, yorqin va quvnoq"],
    ['pion', "Pion va atirgul aralashmasi", "Pushti pionlar va atirgullar bir guldastada"],

    ['liliya', "Oq va pushti liliyalar", "Oq va pushti liliyalar yashil barglar bilan, xushbo'y"],
    ['liliya', "Oq liliyalar", "Toza oq liliyalar, nozik va xushbo'y"],
    ['liliya', "Pushti liliyalar", "To'q pushti liliyalar guldastasi, yorqin va ko'zni quvontiradi"],
    ['liliya', "Sariq liliyalar", "Iliq sariq liliyalar, quvonch va bahor kayfiyati"],
    ['liliya', "Liliya va atirgul aralashmasi", "Liliyalar va atirgullar uyg'unlashgan guldasta"],

    ['kungaboqar', "Kungaboqar va evkalipt", "Yorqin kungaboqarlar evkalipt bilan, jigarrang qog'ozga o'ralgan"],
    ['kungaboqar', "Katta kungaboqarlar", "Yirik kungaboqarlardan yig'ilgan quyoshli guldasta"],

    ['orxideya', "Binafsha va oq orxideyalar", "Oq va binafsha orxideyalar binafsha lenta va to'rli o'ramda"],
    ['orxideya', "Oq orxideyalar", "Nafis oq orxideyalar, hashamatli sovg'a"],
    ['orxideya', "Pushti orxideyalar", "Mayin pushti orxideyalar kompozitsiyasi"],

    ['xrizantema', "Pushti-oq xrizantemalar", "Pushti va oq xrizantemalar oq qog'ozga o'ralgan, quvnoq guldasta"],
    ['xrizantema', "Oq xrizantemalar", "Oq xrizantemalar, sodda va oqko'ngil guldasta"],
    ['xrizantema', "Pushti xrizantemalar", "To'q pushti xrizantemalar, yorqin va uzoq saqlanadi"],
    ['xrizantema', "Sariq xrizantemalar", "Quyoshli sariq xrizantemalar guldastasi"],

    ['gulchambar', "Nozik pushti gulchambar", "Shaftoli va pushti bog' atirgullari, oq atirgul va mayda pushti gullar, kulrang-ko'k barglar bilan. Yumshoq, romantik kayfiyat."],
    ['gulchambar', "Yorqin rangli gulchambar", "Pushti va to'q sariq atirgullar, binafsha gullar va qizil rezavorlar. Quvnoq, rang-barang va bayramona."],
    ['gulchambar', "Oq-yashil gulchambar", "Oq atirgullar, yashil xrizantemalar, oq moychechak va gipsofila. Toza, sokin va nafis ko'rinish."],
    ['gulchambar', "Oq va qora antúrium gulchambari", "Oq atirgullar, oq orxideyalar va qora antúriumlar. Tagligi (mol-bert) bilan, viqorli va rasmiy tadbirlar uchun mos."],
    ['gulchambar', "Bahorgi lolali gulchambar", "Pushti va krem rangli lolalar, mayda atirgullar va yashil novdalar. Eshik yoki devorga osish uchun."],

    // ----- BOSHQALAR (others.html) -----
    ['vaza',  "Oq mat vaza", "Oq rangli mat keramik vaza, shisha shaklida, sodda va zamonaviy"],
    ['vaza',  "Shisha vaza", "Shaffof shisha vaza, o'rtasi ingichka, guldasta uchun"],
    ['idish', "Bej keramik idish", "Bej rangli keramik idish, tomchi shaklida, mat sirtli"],
    ['vaza',  "Qovurg'ali vaza", "Qovurg'ali keramik vaza, kulrang-bej tusda, yaltiroq sirtli"],
    ['vaza',  "Dizaynerli vaza", "Halqa shaklidagi dizaynerli keramik vaza, noyob ko'rinishda"],
    ['vaza',  "Silindr shisha vaza", "Baland shaffof silindr shaklidagi shisha vaza"],
    ['vaza',  "Oltinrang metall vaza", "Naqshli oltinrang metall vaza, kubok shaklida, oyoqli"],
    ['idish', "Oltinrang idish", "Qovurg'ali oltinrang keramik idish, yaltiroq"],
    ['idish', "To'qilgan savat-idish", "Tabiiy materialdan to'qilgan savat shaklidagi idish, tuvak va gullar uchun"],
    ['quti',  "Gul qutisi", "Oq dumaloq gul qutisi, ichida oq atirgullar, sovg'a uchun"]
  ];

  // ===== Yordamchi =====
  // Kichik harf, tutuq belgilari va urg'ularni olib tashlaydi (o' -> o, antúrium -> anturium)
  function norm(s) {
    return String(s).toLowerCase()
      .replace(/[ʻʼ’‘`´']/g, '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  const ITEMS = PRODUCTS.map(function (p) {
    const cat = p[0];
    return {
      cat: cat, name: p[1], desc: p[2],
      hay: {
        name: norm(p[1]),
        alias: norm(CATS[cat].alias + ' ' + CATS[cat].label + ' ' + CATS[cat].extra),
        desc: norm(p[2])
      }
    };
  });

  // ===== Qidiruv =====
  function search(q) {
    const tokens = norm(q).split(/\s+/).filter(Boolean);
    if (!tokens.length) return { cats: [], items: [] };

    const cats = Object.keys(CATS).filter(function (k) {
      const a = norm(CATS[k].alias + ' ' + CATS[k].label);
      return tokens.every(function (t) { return a.indexOf(t) !== -1; });
    });

    const found = [];
    ITEMS.forEach(function (it, idx) {
      let score = 0;
      for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        let s = 0;
        if (it.hay.name.indexOf(t) !== -1) s += 3;
        if (it.hay.alias.indexOf(t) !== -1) s += 2;
        if (it.hay.desc.indexOf(t) !== -1) s += 1;
        if (!s) return;
        score += s;
      }
      found.push({ it: it, score: score, idx: idx });
    });
    found.sort(function (a, b) { return b.score - a.score || a.idx - b.idx; });

    return { cats: cats, items: found.map(function (f) { return f.it; }) };
  }

  // ===== Oyna yaratish =====
  const overlay = document.createElement('div');
  overlay.className = 'sr-overlay';
  overlay.innerHTML =
    '<div class="sr-box" role="dialog" aria-label="Qidirish">' +
      '<div class="sr-field">' +
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.500-3.500"/></svg>' +
        '<input type="search" id="sr-input" placeholder="Gul, vaza yoki idish nomini yozing..." autocomplete="off">' +
        '<button class="sr-close" type="button" aria-label="Yopish">✕</button>' +
      '</div>' +
      '<div class="sr-results" id="sr-results"></div>' +
    '</div>';
  document.body.appendChild(overlay);

  const input = overlay.querySelector('#sr-input');
  const results = overlay.querySelector('#sr-results');
  let actions = [];
  let activeIdx = 0;

  function catAction(k) {
    const c = CATS[k];
    return { page: PAGES[c.page], hash: c.hash ? '#' + k : '', find: '' };
  }
  function itemAction(it) {
    const a = catAction(it.cat);
    a.find = it.name;
    return a;
  }

  function row(icon, title, desc, tag, idx) {
    return '<button class="sr-item" type="button" data-a="' + idx + '">' +
      '<span class="sr-ico">' + icon + '</span>' +
      '<span class="sr-text"><span class="sr-name">' + esc(title) + '</span>' +
      '<span class="sr-desc">' + esc(desc) + '</span></span>' +
      (tag ? '<span class="sr-tag">' + esc(tag) + '</span>' : '') +
      '</button>';
  }

  function setActive(i) {
    const list = results.querySelectorAll('.sr-item');
    if (!list.length) return;
    activeIdx = (i + list.length) % list.length;
    list.forEach(function (el, n) { el.classList.toggle('active', n === activeIdx); });
    list[activeIdx].scrollIntoView({ block: 'nearest' });
  }

  function render(q) {
    actions = [];
    let html = '';

    if (!q.trim()) {
      html += '<div class="sr-label">Tez qidiruv</div><div class="sr-chips">';
      Object.keys(CATS).forEach(function (k) {
        actions.push(catAction(k));
        html += '<button class="sr-chip" type="button" data-a="' + (actions.length - 1) + '">' + CATS[k].icon + ' ' + CATS[k].label + '</button>';
      });
      html += '</div>';
      results.innerHTML = html;
      return;
    }

    const r = search(q);
    if (!r.cats.length && !r.items.length) {
      results.innerHTML = '<div class="sr-empty">Hech narsa topilmadi.<br>Masalan: atirgul, lola, gulchambar, vaza, idish yoki quti</div>';
      return;
    }

    if (r.cats.length) {
      html += '<div class="sr-label">Bo\'limlar</div>';
      r.cats.forEach(function (k) {
        const n = ITEMS.filter(function (i) { return i.cat === k; }).length;
        actions.push(catAction(k));
        html += row(CATS[k].icon, CATS[k].label, CATS[k].all, n + ' xil', actions.length - 1);
      });
    }

    if (r.items.length) {
      html += '<div class="sr-label">Mahsulotlar</div>';
      r.items.slice(0, 10).forEach(function (it) {
        actions.push(itemAction(it));
        html += row(CATS[it.cat].icon, it.name, it.desc, CATS[it.cat].label, actions.length - 1);
      });
      if (r.items.length > 10) {
        html += '<div class="sr-more">Yana ' + (r.items.length - 10) + ' ta natija bor. Aniqroq yozing.</div>';
      }
    }

    results.innerHTML = html;
    setActive(0);
  }

  // ===== Ochish / yopish =====
  function openSearch(e) {
    if (e) e.preventDefault();
    const nav = document.getElementById('nav');
    if (nav) nav.classList.remove('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    input.value = '';
    render('');
    setTimeout(function () { input.focus(); }, 50);
  }
  function closeSearch() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.icon-btn[aria-label="Qidirish"]').forEach(function (b) {
    b.addEventListener('click', openSearch);
  });
  overlay.querySelector('.sr-close').addEventListener('click', closeSearch);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeSearch(); });

  // ===== Sahifaga o'tish =====
  function go(a) {
    try {
      if (a.find) sessionStorage.setItem('bloom-find', a.find);
      else sessionStorage.removeItem('bloom-find');
    } catch (e) {}

    closeSearch();
    const here = location.pathname.split('/').pop() || 'index.html';

    if (here === a.page) {
      // Shu sahifaning o'zida: filtrni almashtirib, kartani topamiz
      if (a.hash) location.hash = a.hash;
      setTimeout(highlight, 150);
    } else {
      location.href = a.page + a.hash;
    }
  }

  results.addEventListener('click', function (e) {
    const el = e.target.closest('[data-a]');
    if (el && actions[Number(el.dataset.a)]) go(actions[Number(el.dataset.a)]);
  });

  input.addEventListener('input', function () { render(input.value); });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeSearch();
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIdx + 1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIdx - 1); }
    if (e.key === 'Enter') {
      e.preventDefault();
      const list = results.querySelectorAll('.sr-item');
      if (list[activeIdx]) list[activeIdx].click();
    }
  });

  // ===== Topilgan kartani yoritish =====
  function highlight() {
    let name = null;
    try {
      name = sessionStorage.getItem('bloom-find');
      sessionStorage.removeItem('bloom-find');
    } catch (e) {}
    if (!name) return;

    const cards = document.querySelectorAll('.gl-card, .gc-card, .ot-card');
    for (let i = 0; i < cards.length; i++) {
      const h = cards[i].querySelector('h3');
      if (h && h.textContent.trim() === name) {
        cards[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
        cards[i].classList.add('sr-found');
        setTimeout(function (c) { c.classList.remove('sr-found'); }.bind(null, cards[i]), 3500);
        return;
      }
    }
  }

  // Sahifa ochilganda (boshqa sahifadan kelganda)
  setTimeout(highlight, 250);
})();