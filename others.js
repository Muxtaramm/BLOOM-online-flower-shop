(function () {
  // ===== 10 TA MAHSULOT =====
  // Rasmlar: images/idish1.jpg ... idish10.jpg
  const products = [
    { id: 201, type: 'vaza',  name: "Oq mat vaza",            price: 120000, rating: 5, badge: 'Mashhur',  img: 'images/idish1.jpg' },
    { id: 202, type: 'vaza',  name: "Shisha vaza",            price: 90000, rating: 4, badge: 'Yangi',    img: 'images/idish2.jpg' },
    { id: 203, type: 'idish', name: "Bej keramik idish",      price: 110000, rating: 4, badge: 'Nafis',    img: 'images/idish3.jpg' },
    { id: 204, type: 'vaza',  name: "Qovurg'ali vaza",        price: 160000, rating: 5, badge: 'Sevimli',  img: 'images/idish4.jpg' },
    { id: 205, type: 'vaza',  name: "Dizaynerli vaza",        price: 220000, rating: 5, badge: 'Noyob',    img: 'images/idish5.jpg' },
    { id: 206, type: 'vaza',  name: "Silindr shisha vaza",    price: 120000, rating: 4, badge: 'Klassik',  img: 'images/idish6.jpg' },
    { id: 207, type: 'vaza',  name: "Oltinrang metall vaza",  price: 280000, rating: 5, badge: 'Premium',  img: 'images/idish7.jpg' },
    { id: 208, type: 'idish', name: "Oltinrang idish",        price: 240000, rating: 4, badge: 'Yorqin',   img: 'images/idish8.jpg' },
    { id: 209, type: 'idish', name: "To'qilgan savat-idish",  price: 120000, rating: 4, badge: 'Tabiiy',   img: 'images/idish9.jpg' },
    { id: 210, type: 'quti',  name: "Gul qutisi",             price: 180000, rating: 5, badge: 'Sovg\'a',  img: 'images/idish10.jpg' }
  ];

  const types = [
    { key: 'all',   label: 'Hammasi' },
    { key: 'vaza',  label: 'Vaza' },
    { key: 'idish', label: 'Idish' },
    { key: 'quti',  label: 'Quti' }
  ];
  const typeNames = {};
  types.forEach(t => { typeNames[t.key] = t.label; });

  // ===== Elementlar =====
  const grid = document.getElementById('ot-grid');
  if (!grid) return;
  const chipsBox = document.getElementById('ot-chips');
  const sortSel = document.getElementById('ot-sort');
  const countEl = document.getElementById('ot-count');
  const modal = document.getElementById('ot-modal');

  // ===== Xotira (sevimlilar) =====
  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  let favs = load('bloom-favs');
  let activeType = 'all';
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
      BloomOrder.open({ name: p.name, price: p.price, img: p.img });
    } else {
      alert("Buyurtma formasi topilmadi. others.html da order.js ulanganini tekshiring.");
    }
  }

  // ===== Filtr tugmalari =====
  function renderChips() {
    chipsBox.innerHTML = types.map(t =>
      '<button class="ot-chip ' + (t.key === activeType ? 'active' : '') + '" data-type="' + t.key + '">' + t.label + '</button>'
    ).join('');
  }

  // ===== Kartalar =====
  function render() {
    const list = products.filter(p => activeType === 'all' || p.type === activeType);

    if (sortSel.value === 'cheap') list.sort((a, b) => a.price - b.price);
    if (sortSel.value === 'expensive') list.sort((a, b) => b.price - a.price);
    if (sortSel.value === 'rating') list.sort((a, b) => b.rating - a.rating);

    countEl.textContent = list.length + ' ta mahsulot';

    grid.innerHTML = list.map(p => `
      <article class="ot-card">
        <div class="ot-img">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          ${p.badge ? '<span class="ot-tag"><b>✦</b> ' + p.badge + '</span>' : ''}
          <button class="ot-fav ${favs.includes(p.id) ? 'active' : ''}" data-fav="${p.id}" aria-label="Sevimlilarga qo'shish">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.500-9-9.200C1.800 7.500 4 4.500 7 4.500c2 0 3.500 1.200 5 3 1.500-1.800 3-3 5-3 3 0 5.200 3 4 6.300C19 15.500 12 20 12 20z"/></svg>
          </button>
          <button class="ot-quick" data-quick="${p.id}">🌿 Tez ko'rish</button>
        </div>
        <div class="ot-info">
          <span class="ot-cat">${typeNames[p.type]}</span>
          <h3>${p.name}</h3>
          <div class="ot-bottom">
            <span class="ot-stars">${stars(p.rating)}</span>
            <span class="ot-price">${formatPrice(p.price)}</span>
          </div>
          <button class="ot-add" data-order="${p.id}">Buyurtma berish</button>
        </div>
      </article>
    `).join('');
  }

  // ===== Tez ko'rish oynasi =====
  function openQuick(id) {
    const p = products.find(x => x.id === id);
    if (!p || !modal) return;
    quickId = id;
    const img = document.getElementById('ot-qv-img');
    img.src = p.img;
    img.alt = p.name;
    document.getElementById('ot-qv-cat').textContent = typeNames[p.type];
    document.getElementById('ot-qv-name').textContent = p.name;
    document.getElementById('ot-qv-stars').innerHTML = stars(p.rating);
    document.getElementById('ot-qv-price').textContent = formatPrice(p.price);
    modal.classList.add('open');
  }
  function closeQuick() { if (modal) modal.classList.remove('open'); }

  if (modal) {
    document.getElementById('ot-close').addEventListener('click', closeQuick);
    modal.addEventListener('click', e => { if (e.target === modal) closeQuick(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQuick(); });

    // Tez ko'rishdagi "Buyurtma berish" -> forma ochiladi
    document.getElementById('ot-qv-add').addEventListener('click', () => {
      const id = quickId;
      closeQuick();
      if (id) orderNow(id);
    });
  }

  // ===== Bosishlar =====
  chipsBox.addEventListener('click', e => {
    const chip = e.target.closest('.ot-chip');
    if (!chip) return;
    activeType = chip.dataset.type;
    renderChips();
    render();
  });

  sortSel.addEventListener('change', render);

  grid.addEventListener('click', e => {
    const orderBtn = e.target.closest('[data-order]');
    const favBtn = e.target.closest('[data-fav]');
    const quickBtn = e.target.closest('[data-quick]');

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

   // ===== Qidiruvdan kelgan havola: others.html#vaza =====
  function readHash() {
    const h = location.hash.replace('#', '');
    activeType = typeNames[h] && h !== 'all' ? h : 'all';
  }
  window.addEventListener('hashchange', () => {
    readHash();
    renderChips();
    render();
  });

  // ===== Boshlash =====
  readHash();
  renderChips();
  render();
})();