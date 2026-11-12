(function () {
  const KEYS = {
    cart: 'bloom-basket',        // savat
    favIds: 'bloom-favs',        // sevimlilar (id lar)
    favItems: 'bloom-fav-items', // sevimlilar (nom, narx, rasm)
    orders: 'bloom-orders'       // buyurtmalar
  };
  const CARDS = '.gl-card, .gc-card, .ot-card';

  // Eski savat kaliti (endi ishlatilmaydi)
  try { localStorage.removeItem('bloom-cart'); } catch (e) {}

  // ===== Xotira =====
  function read(key, fallback) {
    try {
      const v = JSON.parse(localStorage.getItem(key));
      return v == null ? fallback : v;
    } catch (e) { return fallback; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
  function getCart() { return read(KEYS.cart, []); }
  function getFavIds() { return read(KEYS.favIds, []); }
  function getFavItems() { return read(KEYS.favItems, {}); }
  function favList() {
    const items = getFavItems();
    return getFavIds().filter(function (id) { return items[id]; }).map(function (id) { return items[id]; });
  }

  // ===== Yordamchi =====
  function money(n) { return Number(n).toLocaleString('ru-RU') + " so'm"; }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  let toastTimer;
  function toast(text) {
    let t = document.querySelector('.cp-toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'cp-toast';
      document.body.appendChild(t);
    }
    t.textContent = text;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }

  // Kartadan mahsulot ma'lumotini o'qiydi
  function pageOf(card) {
    if (card.classList.contains('gc-card')) return 'crafts.html';
    if (card.classList.contains('ot-card')) return 'others.html';
    return 'catalog.html';
  }
  function readCard(card, id) {
    const h = card.querySelector('h3');
    const p = card.querySelector('.gl-price, .gc-price, .ot-price');
    const im = card.querySelector('img');
    return {
      id: id,
      name: h ? h.textContent.trim() : '',
      price: p ? Number(p.textContent.replace(/\D/g, '')) : 0,
      img: im ? im.getAttribute('src') : '',
      page: pageOf(card)
    };
  }

  // ===== Header raqamlari =====
  function updateBadges() {
    const cartBadge = document.getElementById('cart-count');
    const qty = getCart().reduce(function (n, i) { return n + i.qty; }, 0);
    if (cartBadge) {
      cartBadge.textContent = qty;
      cartBadge.style.display = qty ? 'grid' : 'none';
    }

    const heart = document.querySelector('.icon-btn.heart');
    if (heart) {
      let fb = heart.querySelector('.badge');
      if (!fb) {
        fb = document.createElement('span');
        fb.className = 'badge';
        fb.id = 'fav-count';
        heart.appendChild(fb);
      }
      const n = favList().length;
      fb.textContent = n;
      fb.style.display = n ? 'grid' : 'none';
    }
  }

  // ===== Savat amallari =====
  function addToCart(item) {
    const cart = getCart();
    const found = cart.find(function (x) { return x.id === item.id; });
    if (found) found.qty += 1;
    else cart.push({ id: item.id, name: item.name, price: item.price, img: item.img, page: item.page, qty: 1 });
    write(KEYS.cart, cart);
    updateBadges();
  }

  // ===== Sevimlilar amallari =====
  function toggleFav(id, card) {
    let ids = getFavIds();
    const items = getFavItems();
    const on = ids.indexOf(id) !== -1;
    if (on) {
      ids = ids.filter(function (x) { return x !== id; });
      delete items[id];
    } else {
      ids.push(id);
      items[id] = readCard(card, id);
    }
    write(KEYS.favIds, ids);
    write(KEYS.favItems, items);
    return !on;
  }

  // ===== Kartalarni sozlash: savat tugmasi va yurakcha holati =====
  function decorate() {
    const ids = getFavIds();
    const items = getFavItems();
    let changed = false;

    document.querySelectorAll(CARDS).forEach(function (card) {
      const fav = card.querySelector('[data-fav]');
      if (!fav) return;
      const id = Number(fav.dataset.fav);
      const on = ids.indexOf(id) !== -1;
      fav.classList.toggle('active', on);

      if (on && !items[id]) { items[id] = readCard(card, id); changed = true; }

      const info = card.querySelector('.gl-info, .gc-info, .ot-info');
      if (info && !info.querySelector('.cp-add')) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cp-add';
        btn.dataset.cpAdd = id;
        btn.textContent = "🛒 Savatga qo'shish";
        const order = info.querySelector('[data-order]');
        if (order) order.after(btn); else info.appendChild(btn);
      }
    });

    if (changed) { write(KEYS.favItems, items); updateBadges(); }
  }

  // Sahifa kartalarni qayta chizganda (filtr, saralash) yana sozlaydi
  let scheduled = false;
  new MutationObserver(function () {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () { scheduled = false; decorate(); });
  }).observe(document.body, { childList: true, subtree: true });

  // ===== Kartadagi bosishlar =====
  // Yurakcha: sahifaning eski kodi o'rniga shu kod ishlaydi
  document.addEventListener('click', function (e) {
    const favBtn = e.target.closest('[data-fav]');
    const card = favBtn && favBtn.closest(CARDS);
    if (!card) return;
    e.stopPropagation();
    const id = Number(favBtn.dataset.fav);
    const nowOn = toggleFav(id, card);
    favBtn.classList.toggle('active', nowOn);
    updateBadges();
    toast(nowOn ? '♥ Sevimlilarga qo\'shildi' : 'Sevimlilardan olib tashlandi');
  }, true);

  // "Savatga qo'shish"
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.cp-add');
    if (!btn) return;
    const card = btn.closest(CARDS);
    if (!card) return;
    addToCart(readCard(card, Number(btn.dataset.cpAdd)));
    toast("✓ Savatga qo'shildi");
  });

  // ===== Yon panel =====
  let overlay, body, foot, title;
  let view = 'cart';

  const rules = {
    name:    function (v) { return v.trim().length >= 2 ? '' : 'Ismingizni kiriting'; },
    phone:   function (v) { return /^\+?[\d\s()-]{9,}$/.test(v.trim()) ? '' : "To'g'ri telefon raqam kiriting"; },
    address: function (v) { return v.trim().length >= 5 ? '' : 'Yetkazish manzilini yozing'; }
  };

  function validateField(input) {
    const rule = rules[input.name];
    if (!rule) return true;
    const f = input.closest('.field');
    const msg = rule(input.value);
    f.classList.toggle('invalid', msg !== '');
    f.querySelector('.error').textContent = msg;
    return msg === '';
  }

  function build() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'cp-overlay';
    overlay.innerHTML =
      '<aside class="cp-panel" role="dialog">' +
        '<div class="cp-head"><h3 id="cp-title"></h3>' +
        '<button type="button" class="cp-x" aria-label="Yopish">✕</button></div>' +
        '<div class="cp-body" id="cp-body"></div>' +
        '<div class="cp-foot" id="cp-foot"></div>' +
      '</aside>';
    document.body.appendChild(overlay);

    body = overlay.querySelector('#cp-body');
    foot = overlay.querySelector('#cp-foot');
    title = overlay.querySelector('#cp-title');

    overlay.addEventListener('click', onPanelClick);
    overlay.addEventListener('input', function (e) {
      const input = e.target.closest('input, textarea');
      if (input && input.closest('.field') && input.closest('.field').classList.contains('invalid')) validateField(input);
    });
    overlay.addEventListener('submit', function (e) {
      e.preventDefault();
      submitOrder(e.target);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  function open(v) {
    build();
    view = v;
    render();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function render() {
    if (view === 'favs') return renderFavs();
    if (view === 'checkout') return renderCheckout();
    if (view === 'done') return renderDone();
    renderCart();
  }

  function renderCart() {
    title.textContent = 'Savat';
    const cart = getCart();
    if (!cart.length) {
      body.innerHTML =
        '<div class="cp-empty"><span>🛒</span><p>Savatingiz hozircha bo\'sh</p>' +
        '<a class="btn btn-green" href="catalog.html">Katalogga o\'tish</a></div>';
      foot.innerHTML = '';
      return;
    }
    body.innerHTML = cart.map(function (it) {
      return '<div class="cp-item">' +
        '<img src="' + esc(it.img) + '" alt="">' +
        '<div class="cp-info"><strong>' + esc(it.name) + '</strong>' +
          '<span class="cp-price">' + money(it.price) + '</span>' +
          '<div class="cp-qty">' +
            '<button type="button" data-dec="' + it.id + '" aria-label="Kamaytirish">−</button>' +
            '<b>' + it.qty + '</b>' +
            '<button type="button" data-inc="' + it.id + '" aria-label="Ko\'paytirish">+</button>' +
          '</div></div>' +
        '<button type="button" class="cp-del" data-del="' + it.id + '" aria-label="O\'chirish">✕</button>' +
      '</div>';
    }).join('');
    const total = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    foot.innerHTML =
      '<div class="cp-total">Jami: <b>' + money(total) + '</b></div>' +
      '<button type="button" class="btn btn-green cp-main" data-checkout>Buyurtma berish</button>';
  }

  function renderFavs() {
    title.textContent = 'Sevimlilar';
    foot.innerHTML = '';
    const list = favList();
    if (!list.length) {
      body.innerHTML =
        '<div class="cp-empty"><span>♡</span><p>Sevimlilar ro\'yxati bo\'sh.<br>Yoqqan mahsulotdagi yurakchani bosing.</p>' +
        '<a class="btn btn-green" href="catalog.html">Katalogga o\'tish</a></div>';
      return;
    }
    body.innerHTML = list.map(function (it) {
      return '<div class="cp-item">' +
        '<img src="' + esc(it.img) + '" alt="">' +
        '<div class="cp-info">' +
          '<button type="button" class="cp-name" data-go="' + it.id + '">' + esc(it.name) + '</button>' +
          '<span class="cp-price">' + money(it.price) + '</span>' +
          '<button type="button" class="cp-tocart" data-fav-cart="' + it.id + '">🛒 Savatga</button>' +
        '</div>' +
        '<button type="button" class="cp-del" data-rm-fav="' + it.id + '" aria-label="Olib tashlash">✕</button>' +
      '</div>';
    }).join('');
  }

  function field(label, name, type, ph) {
    return '<div class="field"><label>' + label + '</label>' +
      '<input type="' + type + '" name="' + name + '" placeholder="' + ph + '"><small class="error"></small></div>';
  }

  function renderCheckout() {
    title.textContent = 'Buyurtma berish';
    const cart = getCart();
    const total = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    body.innerHTML =
      '<button type="button" class="cp-back" data-back>← Savatga qaytish</button>' +
      '<div class="cp-sum">' +
        cart.map(function (i) {
          return '<div><span>' + esc(i.name) + ' × ' + i.qty + '</span><b>' + money(i.price * i.qty) + '</b></div>';
        }).join('') +
        '<div class="cp-sum-total"><span>Jami</span><b>' + money(total) + '</b></div>' +
      '</div>' +
      '<form id="cp-form" novalidate>' +
        field('Ismingiz', 'name', 'text', 'Ismingizni kiriting') +
        field('Telefon raqam', 'phone', 'tel', '+998 90 123 45 67') +
        field('Yetkazish manzili', 'address', 'text', "Shahar, ko'cha, uy") +
        '<div class="field"><label>Izoh (ixtiyoriy)</label>' +
          '<textarea name="note" rows="2" placeholder="Masalan: soat 18:00 da yetkazing"></textarea></div>' +
      '</form>';
    foot.innerHTML = '<button type="submit" form="cp-form" class="btn btn-green cp-main">Buyurtmani tasdiqlash</button>';
  }

  function renderDone() {
    title.textContent = 'Buyurtma';
    foot.innerHTML = '';
    body.innerHTML =
      '<div class="cp-done"><div class="cp-check">✓</div><h3>Rahmat!</h3>' +
      '<p>Buyurtmangiz qabul qilindi.<br>Tez orada siz bilan bog\'lanamiz.</p>' +
      '<button type="button" class="btn btn-green" data-close>Yopish</button></div>';
  }

  function submitOrder(form) {
    let ok = true;
    ['name', 'phone', 'address'].forEach(function (n) {
      if (!validateField(form.elements[n])) ok = false;
    });
    if (!ok) return;

    const cart = getCart();
    if (!cart.length) return;
    const order = {
      date: new Date().toISOString(),
      items: cart.map(function (i) { return { name: i.name, price: i.price, qty: i.qty }; }),
      total: cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0),
      name: form.elements.name.value.trim(),
      phone: form.elements.phone.value.trim(),
      address: form.elements.address.value.trim(),
      note: form.elements.note.value.trim()
    };
    // Buyurtma hozircha shu brauzerda saqlanadi. Keyin serverga/Telegramga ulaymiz.
    const orders = read(KEYS.orders, []);
    orders.push(order);
    write(KEYS.orders, orders);

    write(KEYS.cart, []);
    updateBadges();
    view = 'done';
    render();
  }

  function changeQty(id, delta) {
    const cart = getCart();
    const it = cart.find(function (x) { return x.id === id; });
    if (!it) return;
    it.qty = Math.min(99, Math.max(1, it.qty + delta));
    write(KEYS.cart, cart);
    updateBadges();
    render();
  }

  function onPanelClick(e) {
    const t = e.target;
    let el;

    if (t === overlay || t.closest('.cp-x') || t.closest('[data-close]')) return close();

    if ((el = t.closest('[data-inc]'))) return changeQty(Number(el.dataset.inc), 1);
    if ((el = t.closest('[data-dec]'))) return changeQty(Number(el.dataset.dec), -1);

    if ((el = t.closest('[data-del]'))) {
      const id = Number(el.dataset.del);
      write(KEYS.cart, getCart().filter(function (x) { return x.id !== id; }));
      updateBadges();
      return render();
    }

    if (t.closest('[data-checkout]')) { view = 'checkout'; return render(); }
    if (t.closest('[data-back]')) { view = 'cart'; return render(); }

    if ((el = t.closest('[data-rm-fav]'))) {
      const id = Number(el.dataset.rmFav);
      write(KEYS.favIds, getFavIds().filter(function (x) { return x !== id; }));
      const items = getFavItems();
      delete items[id];
      write(KEYS.favItems, items);
      updateBadges();
      decorate();
      return render();
    }

    if ((el = t.closest('[data-fav-cart]'))) {
      const it = getFavItems()[Number(el.dataset.favCart)];
      if (it) { addToCart(it); toast("✓ Savatga qo'shildi"); }
      return;
    }

    if ((el = t.closest('[data-go]'))) {
      const it = getFavItems()[Number(el.dataset.go)];
      if (!it) return;
      try { sessionStorage.setItem('bloom-find', it.name); } catch (err) {}
      location.href = it.page;
    }
  }

  // ===== Header tugmalari =====
  document.querySelectorAll('.icon-btn.heart').forEach(function (b) {
    b.addEventListener('click', function () { open('favs'); });
  });
  document.querySelectorAll('.icon-btn.cart').forEach(function (b) {
    b.addEventListener('click', function () { open('cart'); });
  });

  // Boshqa oynada o'zgarsa, shu yerda ham yangilanadi
  window.addEventListener('storage', function () { updateBadges(); decorate(); });

  // ===== Boshlash =====
  decorate();
  updateBadges();
})();