(function () {
  // ===== 5 TA GULCHAMBAR =====
  // Rasmlar: images/gulchambar1.jpg ... gulchambar5.jpg
  const products = [
    {
      id: 101,
      name: "Nozik pushti gulchambar",
      desc: "Shaftoli va pushti bog' atirgullari, oq atirgul va mayda pushti gullar, kulrang-ko'k barglar bilan. Yumshoq, romantik kayfiyat.",
      price: 250000, rating: 5, badge: 'Mashhur', img: 'images/gulchambar1.jpg'
    },
    {
      id: 102,
      name: "Yorqin rangli gulchambar",
      desc: "Pushti va to'q sariq atirgullar, binafsha gullar va qizil rezavorlar. Quvnoq, rang-barang va bayramona.",
      price: 220000, rating: 5, badge: 'Yorqin', img: 'images/gulchambar2.jpg'
    },
    {
      id: 103,
      name: "Oq-yashil gulchambar",
      desc: "Oq atirgullar, yashil xrizantemalar, oq moychechak va gipsofila. Toza, sokin va nafis ko'rinish.",
      price: 280000, rating: 4, badge: 'Nafis', img: 'images/gulchambar3.jpg'
    },
    {
      id: 104,
      name: "Oq va qora antúrium gulchambari",
      desc: "Oq atirgullar, oq orxideyalar va qora antúriumlar. Tagligi (mol-bert) bilan, viqorli va rasmiy tadbirlar uchun mos.",
      price: 235000, rating: 5, badge: 'Premium', img: 'images/gulchambar4.jpg'
    },
    {
      id: 105,
      name: "Bahorgi lolali gulchambar",
      desc: "Pushti va krem rangli lolalar, mayda atirgullar va yashil novdalar. Eshik yoki devorga osish uchun.",
      price: 250000, rating: 4, badge: 'Bahor', img: 'images/gulchambar5.jpg'
    }
  ];

  const fallback = 'images/gulchambar.jpg';

  // ===== Elementlar =====
  const grid = document.getElementById('gc-grid');
  if (!grid) return;
  const sortSel = document.getElementById('gc-sort');
  const countEl = document.getElementById('gc-count');
  const modal = document.getElementById('gc-modal');

  // ===== Xotira (sevimlilar) =====
  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  let favs = load('bloom-favs');
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
      BloomOrder.open({ name: p.name, price: p.price, img: p.img, fallback: fallback });
    } else {
      alert("Buyurtma formasi topilmadi. crafts.html da order.js ulanganini tekshiring.");
    }
  }

  // ===== Kartalar =====
  function render() {
    const list = products.slice();

    if (sortSel.value === 'cheap') list.sort((a, b) => a.price - b.price);
    if (sortSel.value === 'expensive') list.sort((a, b) => b.price - a.price);
    if (sortSel.value === 'rating') list.sort((a, b) => b.rating - a.rating);

    countEl.textContent = list.length + ' ta gulchambar';

    grid.innerHTML = list.map(p => `
      <article class="gc-card">
        <div class="gc-img">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          ${p.badge ? '<span class="gc-tag"><b>✦</b> ' + p.badge + '</span>' : ''}
          <button class="gc-fav ${favs.includes(p.id) ? 'active' : ''}" data-fav="${p.id}" aria-label="Sevimlilarga qo'shish">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.500-9-9.200C1.800 7.500 4 4.500 7 4.500c2 0 3.500 1.200 5 3 1.500-1.800 3-3 5-3 3 0 5.200 3 4 6.300C19 15.500 12 20 12 20z"/></svg>
          </button>
          <button class="gc-quick" data-quick="${p.id}">🌿 Tez ko'rish</button>
        </div>
        <div class="gc-info">
          <span class="gc-cat">Gulchambar</span>
          <h3>${p.name}</h3>
          <p class="gc-desc">${p.desc}</p>
          <div class="gc-bottom">
            <span class="gc-stars">${stars(p.rating)}</span>
            <span class="gc-price">${formatPrice(p.price)}</span>
          </div>
          <button class="gc-add" data-order="${p.id}">Buyurtma berish</button>
        </div>
      </article>
    `).join('');
  }

  // Rasm topilmasa, umumiy gulchambar rasmini qo'yadi
  grid.addEventListener('error', e => {
    const img = e.target;
    if (img.tagName !== 'IMG' || img.dataset.failed) return;
    img.dataset.failed = '1';
    img.src = fallback;
  }, true);

  // ===== Tez ko'rish oynasi =====
  function openQuick(id) {
    const p = products.find(x => x.id === id);
    if (!p || !modal) return;
    quickId = id;
    const img = document.getElementById('gc-qv-img');
    img.removeAttribute('data-failed');
    img.onerror = function () {
      if (!img.dataset.failed) { img.dataset.failed = '1'; img.src = fallback; }
    };
    img.src = p.img;
    img.alt = p.name;
    document.getElementById('gc-qv-name').textContent = p.name;
    document.getElementById('gc-qv-stars').innerHTML = stars(p.rating);
    document.getElementById('gc-qv-desc').textContent = p.desc;
    document.getElementById('gc-qv-price').textContent = formatPrice(p.price);
    modal.classList.add('open');
  }
  function closeQuick() { if (modal) modal.classList.remove('open'); }

  if (modal) {
    document.getElementById('gc-close').addEventListener('click', closeQuick);
    modal.addEventListener('click', e => { if (e.target === modal) closeQuick(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQuick(); });

    // Tez ko'rishdagi "Buyurtma berish" -> forma ochiladi
    document.getElementById('gc-qv-add').addEventListener('click', () => {
      const id = quickId;
      closeQuick();
      if (id) orderNow(id);
    });
  }

  // ===== Bosishlar =====
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

  // ===== Boshlash =====
  render();
})();