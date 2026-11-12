// ===== Burger menyu =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav) {
  burger.addEventListener('click', () => nav.classList.toggle('open'));
}

// ===== Aloqa oynasini ochish / yopish =====
const modal = document.getElementById('contact-modal');
const openBtn = document.getElementById('open-contact');
const closeBtn = document.getElementById('close-contact');

function openModal(e) {
  e.preventDefault();
  modal.classList.add('open');
  nav.classList.remove('open'); // telefonda menyuni yopadi
}
function closeModal() {
  modal.classList.remove('open');
}

if (modal && openBtn && closeBtn) {
  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  // qora joyga bosilganda yopiladi
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  // Esc tugmasi bilan yopiladi
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

// ===== Forma tekshiruvi =====
const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');

if (form) {
  const rules = {
    name:    v => v.trim().length >= 2 ? '' : 'Ismingizni kiriting',
    phone:   v => /^\+?[\d\s()-]{9,}$/.test(v.trim()) ? '' : "To'g'ri telefon raqam kiriting",
    message: v => v.trim().length >= 5 ? '' : 'Xabaringizni yozing'
  };

  function validate(input) {
    const field = input.closest('.field');
    const msg = rules[input.name](input.value);
    field.classList.toggle('invalid', msg !== '');
    field.querySelector('.error').textContent = msg;
    return msg === '';
  }

  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      if (input.closest('.field').classList.contains('invalid')) validate(input);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const inputs = [...form.querySelectorAll('input, textarea')];
    const allValid = inputs.map(validate).every(Boolean);

    if (allValid) {
      success.classList.add('show');
      form.reset();
      setTimeout(() => {
        success.classList.remove('show');
        closeModal();
      }, 2500);
    }
  });
}










// ===== Skroll qilganda yumshoq paydo bo'lish =====
const revealItems = document.querySelectorAll('.story-inner p, .story-quote, .assort-card, .about-cta');

if (revealItems.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}














(function () {
  // ===== 34 TA GULDASTA =====
  // 1-18: sizning rasmingizga mos. 19-34: rasm hali yo'q (tur va nomga qarab yozilgan).
  // Rasm qo'ygach faqat img: ni va kerak bo'lsa nom/tavsifni o'zgartiring.
  const products = [
    // ----- ATIRGUL (8) -----
    { id: 1,  cat: 'atirgul', name: "Aralash atirgullar qutida", desc: "Har bir atirgul qalbdan chiqqan tuyg‘ularni ifodalaydi.", price: 320000, rating: 5, badge: 'Yangi', img: 'images/atirgul1.jpg' },
    { id: 2,  cat: 'atirgul', name: "Qizil atirgullar qutida", desc: "Qizil atirgullar qalblarni yaqinlashtiradigan go‘zal sovg‘adir.", price: 490000, rating: 5, badge: 'Mashhur', img: 'images/atirgul2.jpg' },
    { id: 3,  cat: 'atirgul', name: "Oq-pushti atirgullar qutida", desc: "Oq va nozik pushti atirgullar pushti qutida, krem lenta bilan", price: 550000, rating: 5, badge: 'Sevimli', img: 'images/atirgul3.jpg' },
    { id: 4,  cat: 'atirgul', name: "Oq atirgullar", desc: "Oppoq atirgullar yumshoq pushti dumaloq qutida", price: 360000, rating: 5, badge: 'Nafis', img: 'images/atirgul4.jpg' },
    { id: 5,  cat: 'atirgul', name: "Pushti atirgullar oq qutida", desc: "Mayin pushti atirgullar oq qutida, oltin hoshiyali", price: 440000, rating: 5, badge: 'Premium', img: 'images/atirgul5.jpg' },
    { id: 6,  cat: 'atirgul', name: "To'q pushti atirgullar", desc: "Har bir atirgul mehr va e'tibor ramzidir.", price: 510000, rating: 4, badge: 'Noyob', img: 'images/atirgul6.jpg' },
    { id: 7,  cat: 'atirgul', name: "Sariq atirgullar", desc: "Quyoshdek sariq atirgullar shisha vazada, yashil barglar bilan", price: 480000, rating: 4, badge: 'Quyoshli', img: 'images/atirgul7.jpg' },
    { id: 8,  cat: 'atirgul', name: "Ko'k atirgullar", desc: "Eng go‘zal rang ushbu guldastada mujassam.", price: 450000, rating: 5, badge: 'Yangi', img: 'images/atirgul8.jpg' },

    // ----- LOLA (5) -----
    { id: 9,  cat: 'lola', name: "Pushti lolalar", desc: "To'q pushti lolalar pushti chelakda, yashil barglar bilan", price: 330000, rating: 4, badge: 'Bahor', img: 'images/lola1.jpg' },
    { id: 10, cat: 'lola', name: "Sariq-qizil lolalar", desc: "Oddiy lahzalarni ham unutilmas xotiralarga aylantiring.", price: 340000, rating: 5, badge: 'Mashhur', img: 'images/lola2.jpg' },
    { id: 11, cat: 'lola', name: "Qizil lolalar", desc: "Lolalar bilan eng samimiy tilaklaringizni ifoda eting.", price: 360000, rating: 4, badge: 'Yangi', img: 'images/lola3.jpg' },
    { id: 12, cat: 'lola', name: "Oq va pushti lolalar", desc: "Rang-barang lolalar har bir kuningizni yanada yorqinlashtiradi.", price: 350000, rating: 5, badge: 'Sevimli', img: 'images/lola4.jpg' },
    { id: 13, cat: 'lola', name: "Oq lolalar", desc: "Nozik lolalar samimiy tuyg‘ularingizni so‘zsiz ifodalaydi.", price: 320000, rating: 5, badge: 'Ehtiros', img: 'images/lola5.jpg' },

    // ----- PION (7) -----
    { id: 14, cat: 'pion', name: "Oq pionlar", desc: "Oppoq, to'la ochilgan pionlar oq vazada, nafis va hashamatli", price: 540000, rating: 5, badge: 'Mashhur', img: 'images/pion1.jpg' },
    { id: 15, cat: 'pion', name: "Pushti pionlar va evkalipt", desc: "Nozik pushti pionlar evkalipt shoxlari bilan, tabiiy uslubda", price: 620000, rating: 5, badge: 'Tabiiy', img: 'images/pion2.jpg' },
    { id: 16, cat: 'pion', name: "Sariq pionlar", desc: "Noyob sariq pionlar, markazi qizg'ish, yorqin guldasta", price: 480000, rating: 4, badge: 'Noyob', img: 'images/pion3.jpg' },
    { id: 17, cat: 'pion', name: "To'q pushti pionlar ", desc: "To'q pushti pionlar shisha vazada, to'kis guldasta", price: 590000, rating: 5, badge: 'Sevimli', img: 'images/pion4.jpg' },
    { id: 18, cat: 'pion', name: "Qizil pionlar", desc: "Chuqur qizil pionlar shisha silindrda", price: 560000, rating: 4, badge: 'Ehtiros', img: 'images/pion5.jpg' },
    { id: 19, cat: 'pion', name: "Marjon rangli pionlar", desc: "Iliq marjon tusdagi pionlar, yorqin va quvnoq", price: 570000, rating: 4, badge: 'Yangi', img: 'images/pion6.jpg' },
    { id: 20, cat: 'pion', name: "Pion va atirgul aralashmasi", desc: "Pushti pionlar va atirgullar bir guldastada", price: 710000, rating: 5, badge: 'Premium', img: 'images/pion7.jpg' },

    // ----- LILIYA (5) -----
    { id: 21, cat: 'liliya', name: "Oq liliyalar", desc: "Oq liliyalar yashil barglar bilan, xushbo'y", price: 420000, rating: 5, badge: 'Mashhur', img: 'images/liliya1.jpg' },
    { id: 22, cat: 'liliya', name: "Qizil liliyalar", desc: "Liliyalar, nozik va xushbo'y", price: 300000, rating: 4, badge: 'Nafis', img: 'images/liliya2.jpg' },
    { id: 23, cat: 'liliya', name: "Pushti liliyalar", desc: "To'q pushti liliyalar guldastasi, yorqin va ko'zni quvontiradi", price: 370000, rating: 4, badge: 'Yangi', img: 'images/liliya3.jpg' },
    { id: 24, cat: 'liliya', name: "Aralash liliyalar", desc: "Iliq gullar va liliyalar, quvonch va bahor kayfiyati", price: 390000, rating: 4, badge: 'Quyoshli', img: 'images/liliya4.jpg' },
    { id: 25, cat: 'liliya', name: "Sariq liliyalar", desc: "Har bir gulbargida poklik va go‘zallik mujassam.", price: 480000, rating: 5, badge: 'Sevimli', img: 'images/liliya5.jpg' },

    // ----- KUNGABOQAR (2) -----
    { id: 26, cat: 'kungaboqar', name: "Kungaboqar va evkalipt", desc: "Yorqin kungaboqarlar evkalipt bilan, jigarrang qog'ozga o'ralgan", price: 290000, rating: 5, badge: 'Yangi', img: 'images/kungaboqar1.jpg' },
    { id: 27, cat: 'kungaboqar', name: "Katta kungaboqarlar", desc: "Yirik kungaboqarlardan yig'ilgan quyoshli guldasta", price: 380000, rating: 4, badge: 'Quyoshli', img: 'images/kungaboqar2.jpg' },

    // ----- ORXIDEYA (3) -----
    { id: 28, cat: 'orxideya', name: "Binafsha va oq orxideyalar", desc: "Oq va binafsha orxideyalar binafsha lenta va to'rli o'ramda", price: 680000, rating: 5, badge: 'Premium', img: 'images/orxideya1.jpg' },
    { id: 29, cat: 'orxideya', name: "Oq orxideyalar", desc: "Nafis oq orxideyalar, hashamatli sovg'a", price: 720000, rating: 5, badge: 'Nafis', img: 'images/orxideya2.jpg' },
    { id: 30, cat: 'orxideya', name: "Pushti orxideyalar", desc: "Mayin pushti orxideyalar kompozitsiyasi", price: 600000, rating: 4, badge: 'Yangi', img: 'images/orxideya3.jpg' },

    // ----- XRIZANTEMA (4) -----
    { id: 31, cat: 'xrizantema', name: "Qizil xrizantemalar", desc: "Xrizantemalar bilan oddiy kunlarni ham bayramga aylantiring.", price: 270000, rating: 5, badge: 'Mashhur', img: 'images/xrizantema1.jpg' },
    { id: 32, cat: 'xrizantema', name: "Alvon xrizantemalar", desc: "Alvon xrizantemalar, sodda va oqko'ngil guldasta", price: 240000, rating: 4, badge: 'Nafis', img: 'images/xrizantema2.jpg' },
    { id: 33, cat: 'xrizantema', name: "Oq xrizantemalar", desc: "Oq xrizantemalar, yorqin va uzoq saqlanadi", price: 250000, rating: 4, badge: 'Yangi', img: 'images/xrizantema3.jpg' },
    { id: 34, cat: 'xrizantema', name: "To'q olcha xrizantemalar", desc: "Yaqinlaringizga chin qalbdan quvonch sovg‘a qiling.", price: 240000, rating: 4, badge: 'Quyoshli', img: 'images/xrizantema4.jpg' }
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
  const cartBadge = document.getElementById('cart-count');

  // ===== Xotira =====
  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  let cart = load('bloom-cart');
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

  function updateBadge() {
    if (!cartBadge) return;
    cartBadge.textContent = cart.length;
    cartBadge.style.display = cart.length ? 'grid' : 'none';
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
    document.getElementById('gl-qv-add').addEventListener('click', () => {
      if (quickId) {
        cart.push(quickId);
        save('bloom-cart', cart);
        updateBadge();
      }
      closeQuick();
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
  updateBadge();
})();











// ===== Footer =====
// Yil avtomatik yangilanadi
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Footerdagi "Aloqa" havolasi aloqa oynasini ochadi
document.querySelectorAll('[data-open-contact]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const menuLink = document.getElementById('open-contact');
    if (menuLink) menuLink.click();
  });
});

// Tepaga qaytish tugmasi
const topBtn = document.createElement('button');
topBtn.className = 'ft-top';
topBtn.type = 'button';
topBtn.setAttribute('aria-label', 'Tepaga qaytish');
topBtn.textContent = '↑';
document.body.appendChild(topBtn);

window.addEventListener('scroll', () => {
  topBtn.classList.toggle('show', window.scrollY > 600);
});
topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});