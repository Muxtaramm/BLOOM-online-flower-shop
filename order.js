(function () {
  const CART_KEY = 'bloom-cart';
  const ORDERS_KEY = 'bloom-orders';

  // ===== Yordamchi =====
  function formatPrice(n) { return Number(n).toLocaleString('ru-RU') + " so'm"; }

  function loadCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
  }

  // Savat raqamini hamma sahifada to'g'ri ko'rsatadi
  function updateBadge() {
    const b = document.getElementById('cart-count');
    if (!b) return;
    const n = loadCart().length;
    b.textContent = n;
    b.style.display = n ? 'grid' : 'none';
  }

  let toastTimer;
  function toast(text) {
    let t = document.querySelector('.od-toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'od-toast';
      document.body.appendChild(t);
    }
    t.textContent = text;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }

  // ===== Buyurtma oynasi (birinchi ochilganda yaratiladi) =====
  let modal = null;
  let product = null;
  let qty = 1;
  let closeTimer;

  const rules = {
    name:    function (v) { return v.trim().length >= 2 ? '' : 'Ismingizni kiriting'; },
    phone:   function (v) { return /^\+?[\d\s()-]{9,}$/.test(v.trim()) ? '' : "To'g'ri telefon raqam kiriting"; },
    address: function (v) { return v.trim().length >= 5 ? '' : 'Yetkazish manzilini yozing'; }
  };

  function build() {
    if (modal) return;
    modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'od-modal';
    modal.innerHTML =
      '<div class="modal-box od-box">' +
        '<button class="modal-close" id="od-close" type="button" aria-label="Yopish">✕</button>' +

        '<div id="od-form-view">' +
          '<h3>Buyurtma berish</h3>' +
          '<p class="modal-sub">Ma\'lumotlaringizni qoldiring, biz siz bilan bog\'lanamiz.</p>' +

          '<div class="od-product">' +
            '<img id="od-img" src="" alt="">' +
            '<div><strong id="od-name"></strong><span id="od-price"></span></div>' +
          '</div>' +

          '<div class="od-qty-row"><span>Soni</span>' +
            '<div class="od-qty">' +
              '<button type="button" id="od-minus" aria-label="Kamaytirish">−</button>' +
              '<b id="od-qty">1</b>' +
              '<button type="button" id="od-plus" aria-label="Ko\'paytirish">+</button>' +
            '</div>' +
          '</div>' +
          '<div class="od-total">Jami: <b id="od-total"></b></div>' +

          '<form id="od-form" novalidate>' +
            '<div class="field"><label for="od-fname">Ismingiz</label>' +
              '<input type="text" id="od-fname" name="name" placeholder="Ismingizni kiriting"><small class="error"></small></div>' +
            '<div class="field"><label for="od-fphone">Telefon raqam</label>' +
              '<input type="tel" id="od-fphone" name="phone" placeholder="+998 90 123 45 67"><small class="error"></small></div>' +
            '<div class="field"><label for="od-faddress">Yetkazish manzili</label>' +
              '<input type="text" id="od-faddress" name="address" placeholder="Shahar, ko\'cha, uy"><small class="error"></small></div>' +
            '<div class="field"><label for="od-fnote">Izoh (ixtiyoriy)</label>' +
              '<textarea id="od-fnote" name="note" rows="2" placeholder="Masalan: soat 18:00 da yetkazing"></textarea></div>' +
            '<button type="submit" class="btn btn-green od-submit">Buyurtmani tasdiqlash</button>' +
          '</form>' +
        '</div>' +

        '<div class="od-success" id="od-success">' +
          '<div class="od-check">✓</div>' +
          '<h3>Rahmat!</h3>' +
          '<p>Buyurtmangiz qabul qilindi.<br>Tez orada siz bilan bog\'lanamiz.</p>' +
          '<button type="button" class="btn btn-green" id="od-done">Yopish</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    const form = modal.querySelector('#od-form');

    modal.querySelector('#od-close').addEventListener('click', close);
    modal.querySelector('#od-done').addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    modal.querySelector('#od-minus').addEventListener('click', function () { if (qty > 1) { qty--; refresh(); } });
    modal.querySelector('#od-plus').addEventListener('click', function () { if (qty < 99) { qty++; refresh(); } });

    function validate(input) {
      const rule = rules[input.name];
      if (!rule) return true;
      const field = input.closest('.field');
      const msg = rule(input.value);
      field.classList.toggle('invalid', msg !== '');
      field.querySelector('.error').textContent = msg;
      return msg === '';
    }

    form.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('input', function () {
        if (input.closest('.field').classList.contains('invalid')) validate(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const inputs = Array.prototype.slice.call(form.querySelectorAll('input'));
      const ok = inputs.map(validate).every(Boolean);
      if (!ok) return;

      // Buyurtma hozircha shu brauzerda saqlanadi. Keyin serverga/Telegramga ulaymiz.
      const order = {
        date: new Date().toISOString(),
        product: product.name,
        price: product.price,
        qty: qty,
        total: product.price * qty,
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        address: form.address.value.trim(),
        note: form.note.value.trim()
      };
      try {
        const list = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
        list.push(order);
        localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
      } catch (err) {}

      modal.querySelector('#od-form-view').style.display = 'none';
      modal.querySelector('#od-success').classList.add('show');
      form.reset();
    });
  }

  function refresh() {
    modal.querySelector('#od-qty').textContent = qty;
    modal.querySelector('#od-total').textContent = formatPrice(product.price * qty);
  }

  function open(p) {
    build();
    clearTimeout(closeTimer);
    product = p;
    qty = 1;

    const img = modal.querySelector('#od-img');
    img.removeAttribute('data-failed');
    img.onerror = function () {
      if (!img.dataset.failed && p.fallback) { img.dataset.failed = '1'; img.src = p.fallback; }
    };
    img.src = p.img || p.fallback || '';
    img.alt = p.name;

    modal.querySelector('#od-name').textContent = p.name;
    modal.querySelector('#od-price').textContent = formatPrice(p.price);

    // Formani tozalab, birinchi holatga qaytaramiz
    modal.querySelector('#od-form').reset();
    modal.querySelectorAll('.field').forEach(function (f) { f.classList.remove('invalid'); });
    modal.querySelector('#od-form-view').style.display = '';
    modal.querySelector('#od-success').classList.remove('show');

    refresh();
    modal.classList.add('open');
  }

  function close() {
    if (modal) modal.classList.remove('open');
  }

  window.BloomOrder = { open: open, close: close, toast: toast };

  updateBadge();
})();