(function () {
  // ===== 34 TA GULDASTA =====
  const products = [
    // ----- ATIRGUL (8) -----
    { id: 1,  cat: 'atirgul', name: "Shaftoli rangli bog' atirgullari", desc: "Yumshoq shaftoli tusdagi bog' atirgullari, kurtaklari bilan", price: 320000, rating: 5, badge: 'Yangi', img: 'images/atirgul1.jpg' },
    { id: 2,  cat: 'atirgul', name: "Qizil atirgullar qutida", desc: "To'q qizil atirgullar dumaloq qizil qutida, atlas lenta bilan", price: 690000, rating: 5, badge: 'Mashhur', img: 'images/atirgul2.jpg' },
    { id: 3,  cat: 'atirgul', name: "Oq-pushti atirgullar qutida", desc: "Oq va nozik pushti atirgullar pushti qutida, krem lenta bilan", price: 750000, rating: 5, badge: 'Sevimli', img: 'images/atirgul3.jpg' },
    { id: 4,  cat: 'atirgul', name: "Oq atirgullar pushti qutida", desc: "Oppoq atirgullar yumshoq pushti dumaloq qutida", price: 560000, rating: 5, badge: 'Nafis', img: 'images/atirgul4.jpg' },
    { id: 5,  cat: 'atirgul', name: "Pushti atirgullar oq qutida", desc: "Mayin pushti atirgullar oq qutida, oltin hoshiyali", price: 640000, rating: 5, badge: 'Premium', img: 'images/atirgul5.jpg' },
    { id: 6,  cat: 'atirgul', name: "Ko'k atirgullar", desc: "Noyob ko'k atirgullar evkalipt novdalari bilan, qo'lda bog'langan", price: 590000, rating: 4, badge: 'Noyob', img: 'images/atirgul6.jpg' },
    { id: 7,  cat: 'atirgul', name: "Sariq atirgullar vazada", desc: "Quyoshdek sariq atirgullar shisha vazada, yashil barglar bilan", price: 480000, rating: 4, badge: 'Quyoshli', img: 'images/atirgul7.jpg' },
    { id: 8,  cat: 'atirgul', name: "Aralash atirgullar", desc: "Sariq, to'q sariq va pushti atirgullar, gipsofila bilan, yurakli qutida", price: 450000, rating: 5, badge: 'Yangi', img: 'images/atirgul8.jpg' },

    // ----- LOLA (5) -----
    { id: 9,  cat: 'lola', name: "Pushti lolalar chelakda", desc: "To'q pushti lolalar pushti chelakda, yashil barglar bilan", price: 330000, rating: 4, badge: 'Bahor', img: 'images/lola1.jpg' },
    { id: 10, cat: 'lola', name: "Pushti-oq lolalar", desc: "Pushti va oq lolalar pushti qog'ozga o'ralgan, lentali", price: 340000, rating: 5, badge: 'Mashhur', img: 'images/lola2.jpg' },
    { id: 11, cat: 'lola', name: "Sariq-qizil lolalar", desc: "Yo'l-yo'l sariq-qizil lolalar, yorqin va quvnoq kayfiyat uchun", price: 360000, rating: 4, badge: 'Yangi', img: 'images/lola3.jpg' },
    { id: 12, cat: 'lola', name: "Oq lolalar", desc: "Sof oq lolalar oq lenta bilan, kelin guldastasiga ham mos", price: 350000, rating: 5, badge: 'Sevimli', img: 'images/lola4.jpg' },
    { id: 13, cat: 'lola', name: "Qizil lolalar", desc: "Yirik qizil lolalar shaftoli rangli qog'ozda", price: 520000, rating: 5, badge: 'Ehtiros', img: 'images/lola5.jpg' },

    // ----- PION (7) -----
    { id: 14, cat: 'pion', name: "Oq pionlar vazada", desc: "Oppoq, to'la ochilgan pionlar oq vazada, nafis va hashamatli", price: 640000, rating: 5, badge: 'Mashhur', img: 'images/pion1.jpg' },
    { id: 15, cat: 'pion', name: "Pushti pionlar va evkalipt", desc: "Nozik pushti pionlar evkalipt shoxlari bilan, tabiiy uslubda", price: 620000, rating: 5, badge: 'Tabiiy', img: 'images/pion2.jpg' },
    { id: 16, cat: 'pion', name: "Sariq pionlar", desc: "Noyob sariq pionlar, markazi qizg'ish, yorqin guldasta", price: 780000, rating: 4, badge: 'Noyob', img: 'images/pion3.jpg' },
    { id: 17, cat: 'pion', name: "To'q pushti pionlar vazada", desc: "To'q pushti pionlar shisha vazada, to'kis guldasta", price: 690000, rating: 5, badge: 'Sevimli', img: 'images/pion4.jpg' },
    { id: 18, cat: 'pion', name: "Qizil pionlar", desc: "Chuqur qizil pionlar shisha silindrda", price: 660000, rating: 4, badge: 'Ehtiros', img: 'images/pion5.jpg' },
    { id: 19, cat: 'pion', name: "Marjon rangli pionlar", desc: "Iliq marjon tusdagi pionlar, yorqin va quvnoq", price: 660000, rating: 4, badge: 'Yangi', img: 'images/pion6.jpg' },
    { id: 20, cat: 'pion', name: "Pion va atirgul aralashmasi", desc: "Pushti pionlar va atirgullar bir guldastada", price: 710000, rating: 5, badge: 'Premium', img: 'images/pion7.jpg' },

    // ----- LILIYA (5) -----
    { id: 21, cat: 'liliya', name: "Oq va pushti liliyalar", desc: "Oq va pushti liliyalar yashil barglar bilan, xushbo'y", price: 420000, rating: 5, badge: 'Mashhur', img: 'images/liliya1.jpg' },
    { id: 22, cat: 'liliya', name: "Oq liliyalar", desc: "Toza oq liliyalar, nozik va xushbo'y", price: 400000, rating: 4, badge: 'Nafis', img: 'images/liliya2.jpg' },
    { id: 23, cat: 'liliya', name: "Pushti liliyalar", desc: "To'q pushti liliyalar guldastasi, yorqin va ko'zni quvontiradi", price: 410000, rating: 4, badge: 'Yangi', img: 'images/liliya3.jpg' },
    { id: 24, cat: 'liliya', name: "Sariq liliyalar", desc: "Iliq sariq liliyalar, quvonch va bahor kayfiyati", price: 390000, rating: 4, badge: 'Quyoshli', img: 'images/liliya4.jpg' },
    { id: 25, cat: 'liliya', name: "Liliya va atirgul aralashmasi", desc: "Liliyalar va atirgullar uyg'unlashgan guldasta", price: 480000, rating: 5, badge: 'Sevimli', img: 'images/liliya5.jpg' },

    // ----- KUNGABOQAR (2) -----
    { id: 26, cat: 'kungaboqar', name: "Kungaboqar va evkalipt", desc: "Yorqin kungaboqarlar evkalipt bilan, jigarrang qog'ozga o'ralgan", price: 290000, rating: 5, badge: 'Yangi', img: 'images/kungaboqar1.jpg' },
    { id: 27, cat: 'kungaboqar', name: "Katta kungaboqarlar", desc: "Yirik kungaboqarlardan yig'ilgan quyoshli guldasta", price: 380000, rating: 4, badge: 'Quyoshli', img: 'images/kungaboqar2.jpg' },

    // ----- ORXIDEYA (3) -----
    { id: 28, cat: 'orxideya', name: "Binafsha va oq orxideyalar", desc: "Oq va binafsha orxideyalar binafsha lenta va to'rli o'ramda", price: 780000, rating: 5, badge: 'Premium', img: 'images/orxideya1.jpg' },
    { id: 29, cat: 'orxideya', name: "Oq orxideyalar", desc: "Nafis oq orxideyalar, hashamatli sovg'a", price: 720000, rating: 5, badge: 'Nafis', img: 'images/orxideya2.jpg' },
    { id: 30, cat: 'orxideya', name: "Pushti orxideyalar", desc: "Mayin pushti orxideyalar kompozitsiyasi", price: 700000, rating: 4, badge: 'Yangi', img: 'images/orxideya3.jpg' },

    // ----- XRIZANTEMA (4) -----
    { id: 31, cat: 'xrizantema', name: "Pushti-oq xrizantemalar", desc: "Pushti va oq xrizantemalar oq qog'ozga o'ralgan, quvnoq guldasta", price: 270000, rating: 5, badge: 'Mashhur', img: 'images/xrizantema1.jpg' },
    { id: 32, cat: 'xrizantema', name: "Oq xrizantemalar", desc: "Oq xrizantemalar, sodda va oqko'ngil guldasta", price: 240000, rating: 4, badge: 'Nafis', img: 'images/xrizantema2.jpg' },
    { id: 33, cat: 'xrizantema', name: "Pushti xrizantemalar", desc: "To'q pushti xrizantemalar, yorqin va uzoq saqlanadi", price: 250000, rating: 4, badge: 'Yangi', img: 'images/xrizantema3.jpg' },
    { id: 34, cat: 'xrizantema', name: "Sariq xrizantemalar", desc: "Quyoshli sariq xrizantemalar guldastasi", price: 240000, rating: 4, badge: 'Quyoshli', img: 'images/xrizantema4.jpg' }
  ];

  const categories = [
    { key: 'all',        label: 'Hammasi' },
    { key: 'atirgul',    label: 'Atirgul' },
    { key: 'lola',       label: 'Lola' },
    { key: 'pion',       label: 'Pion' },
    { key: 'liliya',     label: 'Liliya' },
    { key: 'kungaboqar', label: 'Kungaboqar' },
    { key: 'orxideya',   label: 'Orxideya' },
    { key: 'xrizantema', label: 'Xrizantema' }
  ];

  // Rasm topilmasa shu rasm chiqadi
  const fallback = {
    atirgul: 'images/atirgul.jpg', lola: 'images/lola.jpg', pion: 'images/pion.jpg',
    liliya: 'images/liliya.jpg', kungaboqar: 'images/kungaboqar.jpg',
    orxideya: 'images/orxideya.jpg', xrizantema: 'images/xrizantema.jpg'
  };

  const catNames = {};
  categories.forEach(c => { catNames[c.key] = c.label; });

  // ===== Elementlar =====
  const grid = document.getElementById('gl-grid');
  if (!grid) return;
  const chipsBox = document.getElementById('gl-chips');
  const sortSel = document.getElementById('gl-sort');
  const countEl = document.getElementById('gl-count');
  const modal = document.getElementById('gl-modal');

  // ===== Xotira (sevimlilar) =====
  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  let favs = load('bloom-favs');
  let activeCat = 'all';
  let quickId = null;

  // ===== Yordamchi =====
  function formatPrice(n) { return n.toLocaleString('ru-RU') + " so'm"; }

  function stars(n) {
    let s = '';
    for (let i = 1; i <= 5; i++) s += '<i class="' + (i <= n ? 'on' : '') + '">★</i>';
    return s;
  }

  // Buyurtma formasini ochadi
  function orderNow(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    if (window.BloomOrder) {
      BloomOrder.open({ name: p.name, price: p.price, img: p.img, fallback: fallback[p.cat] });
    } else {
      alert("Buyurtma formasi topilmadi. catalog.html da order.js ulanganini tekshiring.");
    }
  }

  // ===== Filtr tugmalari =====
  function renderChips() {
    chipsBox.innerHTML = categories.map(c =>
      '<button class="gl-chip ' + (c.key === activeCat ? 'active' : '') + '" data-cat="' + c.key + '">' + c.label + '</button>'
    ).join('');
  }

  // ===== Kartalar =====
  function renderProducts() {
    const list = products.filter(p => activeCat === 'all' || p.cat === activeCat);

    if (sortSel.value === 'cheap') list.sort((a, b) => a.price - b.price);
    if (sortSel.value === 'expensive') list.sort((a, b) => b.price - a.price);
    if (sortSel.value === 'rating') list.sort((a, b) => b.rating - a.rating);

    countEl.textContent = list.length + ' ta guldasta';

    grid.innerHTML = list.map(p => `
      <article class="gl-card">
        <div class="gl-img">
          <img src="${p.img}" alt="${p.name}" data-cat="${p.cat}" loading="lazy">
          ${p.badge ? '<span class="gl-tag"><b>✦</b> ' + p.badge + '</span>' : ''}
          <button class="gl-fav ${favs.includes(p.id) ? 'active' : ''}" data-fav="${p.id}" aria-label="Sevimlilarga qo'shish">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.500-9-9.200C1.800 7.500 4 4.500 7 4.500c2 0 3.500 1.200 5 3 1.500-1.800 3-3 5-3 3 0 5.200 3 4 6.300C19 15.500 12 20 12 20z"/></svg>
          </button>
          <button class="gl-quick" data-quick="${p.id}">🌿 Tez ko'rish</button>
        </div>
        <div class="gl-info">
          <span class="gl-cat">${catNames[p.cat]}</span>
          <h3>${p.name}</h3>
          <p class="gl-desc">${p.desc}</p>
          <div class="gl-bottom">
            <span class="gl-stars">${stars(p.rating)}</span>
            <span class="gl-price">${formatPrice(p.price)}</span>
          </div>
          <button class="gl-add" data-order="${p.id}">Buyurtma berish</button>
        </div>
      </article>
    `).join('');
  }

  // Rasm topilmasa, gul turining umumiy rasmini qo'yadi
  grid.addEventListener('error', e => {
    const img = e.target;
    if (img.tagName !== 'IMG' || img.dataset.failed) return;
    img.dataset.failed = '1';
    img.src = fallback[img.dataset.cat];
  }, true);

  // ===== Tez ko'rish oynasi =====
  function openQuick(id) {
    const p = products.find(x => x.id === id);
    if (!p || !modal) return;
    quickId = id;
    const img = document.getElementById('gl-qv-img');
    img.removeAttribute('data-failed');
    img.onerror = function () {
      if (!img.dataset.failed) { img.dataset.failed = '1'; img.src = fallback[p.cat]; }
    };
    img.src = p.img;
    img.alt = p.name;
    document.getElementById('gl-qv-cat').textContent = catNames[p.cat];
    document.getElementById('gl-qv-name').textContent = p.name;
    document.getElementById('gl-qv-stars').innerHTML = stars(p.rating);
    document.getElementById('gl-qv-desc').textContent = p.desc;
    document.getElementById('gl-qv-price').textContent = formatPrice(p.price);
    modal.classList.add('open');
  }
  function closeQuick() { if (modal) modal.classList.remove('open'); }

  if (modal) {
    document.getElementById('gl-close').addEventListener('click', closeQuick);
    modal.addEventListener('click', e => { if (e.target === modal) closeQuick(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQuick(); });

    // Tez ko'rishdagi "Buyurtma berish" -> forma ochiladi
    document.getElementById('gl-qv-add').addEventListener('click', () => {
      const id = quickId;
      closeQuick();
      if (id) orderNow(id);
    });
  }

  // ===== Bosishlar =====
  chipsBox.addEventListener('click', e => {
    const chip = e.target.closest('.gl-chip');
    if (!chip) return;
    activeCat = chip.dataset.cat;
    history.replaceState(null, '', activeCat === 'all' ? location.pathname : '#' + activeCat);
    renderChips();
    renderProducts();
  });

  sortSel.addEventListener('change', renderProducts);

  grid.addEventListener('click', e => {
    const favBtn = e.target.closest('[data-fav]');
    const quickBtn = e.target.closest('[data-quick]');
    const orderBtn = e.target.closest('[data-order]');

    if (orderBtn) orderNow(Number(orderBtn.dataset.order));
    if (quickBtn) openQuick(Number(quickBtn.dataset.quick));

    if (favBtn) {
      const id = Number(favBtn.dataset.fav);
      if (favs.includes(id)) favs = favs.filter(f => f !== id);
      else favs.push(id);
      save('bloom-favs', favs);
      favBtn.classList.toggle('active');
    }
  });

  // ===== Bosh sahifadan kelgan havola: catalog.html#atirgul =====
  function readHash() {
    const h = location.hash.replace('#', '');
    activeCat = catNames[h] && h !== 'all' ? h : 'all';
  }
  window.addEventListener('hashchange', () => {
    readHash();
    renderChips();
    renderProducts();
  });

  // ===== Boshlash =====
  readHash();
  renderChips();
  renderProducts();
})();