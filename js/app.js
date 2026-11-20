/* =========================================================
   KITAWA Mini App – lõi prototype: state, router, shell, tiện ích
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const fnum = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const fmt = n => fnum(n) + '₫';
const off = p => (p.old ? Math.round((1 - p.price / p.old) * 100) : 0);
const soldK = n => (n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '').replace('.', ',') + 'k' : n);
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pts = p => Math.floor(Math.floor(p / 10000) * 1.5);
const comm = p => Math.round(p * 0.08 / 1000) * 1000;

const TAB_ROUTES = ['home', 'products', 'warranty', 'cart', 'profile'];
const SCREENS = {};
const ENTER = {};
const ACT = {};

function initState() {
  const now = Date.now();
  let bf = new Date(2026, 10, 30, 23, 59, 59).getTime();
  if (bf < now) bf = now + 3 * 864e5 + 8 * 36e5;
  return {
    route: 'home', params: {}, stack: [], timer: null,
    flashEnd: now + (2 * 3600 + 14 * 60 + 37) * 1000, bfEnd: bf,
    cart: [{ id: 'bc10600', qty: 2, checked: true }, { id: 'dp15100', qty: 1, checked: true }, { id: 'bc1200', qty: 1, checked: false }],
    cartEdit: false, usePoints: true, voucher: 'V100',
    points: 2450, spend: 24500000,
    owned: ['BF10', 'FS', 'V100', 'TIER', 'BDAY', 'PRJ'],
    reminders: [], favs: [],
    warranties: [
      { id: 'w1', pid: 'bc10600', serial: 'KTW-BC10600-2610-01127', st: 'active', left: 'Còn 35 tháng', pct: 97 },
      { id: 'w2', pid: 'bdp27300', serial: 'KTW-BDP27300-2312-00419', st: 'soon', left: 'Còn 28 ngày', pct: 3 },
      { id: 'w3', pid: 'sv01', serial: 'KTW-SV01-2611-00318', st: 'none' },
    ],
    pl: { cat: 'all', use: null, q: '', kl: [], price: null, ip: [], quick: [], sort: 'pop', view: 'grid', remote: false },
    homeTab: 'hot', flashSlot: 1, flashCat: 'all',
    memberTab: 'ben', vTab: 'ok', vFilter: 'all', tasksDone: ['oa'],
    pay: 'cod', vat: false,
    quoteType: 'duong', quoteQty: 20, quoteW: [600],
    wf: { name: 'Nguyễn Minh Anh', phone: '', where: 'Mini App KITAWA', order: 'KW2611-0842', date: '2026-11-20', prov: 'TP. Hồ Chí Minh', addr: '', agree: false, photos: 2 },
    lastW: { pid: 'bc10600', serial: 'KTW-BC10600-2611-08452' },
    scanOk: false, torch: false,
    history: [
      { t: 'Đổi Voucher 50.000₫', d: '02/11/2026', v: -500, icon: 'ticket' },
      { t: 'Đánh giá sản phẩm BC10600', d: '16/10/2026', v: 20, icon: 'star' },
      { t: 'Kích hoạt bảo hành BC10600', d: '15/10/2026', v: 50, icon: 'shield' },
      { t: 'Đơn hàng #KW2610-1932', d: '15/10/2026', v: 210, icon: 'package' },
      { t: 'Quan tâm Zalo OA KITAWA', d: '01/10/2026', v: 30, icon: 'chat' },
    ],
    ctv: { avail: 3284000, wait: 1120000, out: 12600000 },
    lastOrder: null,
  };
}
let S = initState();

/* ---------------- Router ---------------- */
function enter(route, params) { if (ENTER[route]) ENTER[route](params || {}); }
function go(route, params = {}, opts = {}) {
  if (!opts.replace) S.stack.push({ route: S.route, params: S.params });
  clearTimeout(S.timer);
  S.route = route; S.params = params;
  enter(route, params);
  render(false);
}
function back() {
  clearTimeout(S.timer);
  const p = S.stack.pop();
  if (p) { S.route = p.route; S.params = p.params; } else { S.route = 'home'; S.params = {}; }
  render(false);
}
function tabGo(route) {
  clearTimeout(S.timer);
  S.stack = []; S.route = route; S.params = {};
  enter(route, {});
  render(false);
}
function navJump(route, params = {}) {
  clearTimeout(S.timer);
  S.stack = TAB_ROUTES.includes(route) ? [] : [{ route: 'home', params: {} }];
  S.route = route; S.params = params;
  enter(route, params);
  render(false);
}

/* ---------------- Shell ---------------- */
function cartCount() { return S.cart.reduce((a, c) => a + c.qty, 0); }
function tabbar(active) {
  const t = (id, icon, label) => `<button class="tab ${active === id ? 'on' : ''}" data-tab="${id}">${ic(icon, 23, active === id ? 2.1 : 1.75)}<span>${label}</span>${id === 'cart' && cartCount() ? `<span class="bdg">${cartCount()}</span>` : ''}</button>`;
  return `<nav class="tabbar">${t('home', 'home', 'Trang chủ')}${t('products', 'grid', 'Sản phẩm')}
    <button class="tab tab-c ${active === 'warranty' ? 'on' : ''}" data-tab="warranty"><span class="fabc">${ic('qr', 24, 2)}</span><span>Bảo hành</span></button>
    ${t('cart', 'cart', 'Giỏ hàng')}${t('profile', 'user', 'Tài khoản')}</nav>`;
}
function render(keepScroll) {
  closeSheet();
  const fn = SCREENS[S.route] || SCREENS.home;
  const scr = fn(S.params || {});
  const app = $('#app');
  const oldScroll = app.querySelector('.scroll');
  const st = keepScroll && oldScroll ? oldScroll.scrollTop : 0;
  const showBack = scr.back !== undefined ? scr.back : (!TAB_ROUTES.includes(S.route) || S.stack.length > 0);
  const fabBottom = 14 + (scr.tab ? 86 : 0) + (scr.foot ? (scr.tab ? 68 : 84) : 0);
  app.className = 'app t-' + scr.theme;
  app.innerHTML = `<div class="island"></div>
    <div class="top ${scr.theme}">
      <div class="sb"><span>9:41</span><span class="r">${SB_ICONS}</span></div>
      <div class="hd">
        ${showBack ? `<button class="back" data-act="back" aria-label="Quay lại">${ic('left', 24, 2.1)}</button>` : ''}
        ${scr.headLeft || ''}<div class="ttl">${scr.title || ''}</div>${scr.headRight || ''}
        <div class="capsule"><button data-act="capMenu" aria-label="Menu">${DOTS}</button><i></i><button data-act="capClose" aria-label="Đóng">${ic('x', 16, 2.2)}</button></div>
      </div>
    </div>
    <div class="scroll" id="scroll">${scr.body}</div>
    ${scr.foot ? `<div class="foot ${scr.tab ? '' : 'safe'} ${scr.footCls || ''}">${scr.foot}</div>` : ''}
    ${scr.tab ? tabbar(scr.tab) : ''}
    ${scr.fab ? `<button class="zfab" style="bottom:${fabBottom}px" data-act="zalo">Zalo</button>` : ''}
    <div class="homebar"></div>`;
  $('#scroll').scrollTop = st;
  const h = S.route + (S.params && S.params.id ? '/' + S.params.id : '');
  try { history.replaceState(null, '', '#' + h); } catch (e) {}
  drawNav();
  tick();
  if (scr.after) scr.after();
}
function rerender() { render(true); }

/* ---------------- Sheet / toast ---------------- */
let sheetFn = null;
function openSheet(fn) { sheetFn = fn; drawSheet(); }
function drawSheet() {
  if (!sheetFn) return;
  let ov = $('#app .ov');
  if (!ov) {
    ov = document.createElement('div'); ov.className = 'ov';
    ov.innerHTML = '<div class="sheet"></div>';
    ov.addEventListener('click', e => { if (e.target === ov) closeSheet(); });
    $('#app').appendChild(ov);
  }
  const sh = ov.querySelector('.sheet'); const st = sh.scrollTop;
  sh.innerHTML = '<div class="grab"></div>' + sheetFn();
  sh.scrollTop = st;
}
function closeSheet() { sheetFn = null; const ov = $('#app .ov'); if (ov) ov.remove(); }
function toast(msg) {
  const old = $('#app .toast'); if (old) old.remove();
  const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = msg;
  $('#app').appendChild(t);
  clearTimeout(toast._t); toast._t = setTimeout(() => t.remove(), 2300);
}

/* ---------------- Countdown ---------------- */
const CD = {
  flash: () => S.flashEnd,
  next: () => S.flashEnd + 6 * 36e5,
  tmr: () => S.flashEnd + 19 * 36e5,
  bf: () => S.bfEnd,
};
function tick() {
  const now = Date.now();
  if (S.flashEnd < now) S.flashEnd = now + 2 * 36e5;
  document.querySelectorAll('[data-cd]').forEach(el => {
    let ms = Math.max(0, CD[el.dataset.cd]() - now);
    const d = Math.floor(ms / 864e5); ms %= 864e5;
    const h = Math.floor(ms / 36e5); ms %= 36e5;
    const m = Math.floor(ms / 6e4); const s = Math.floor((ms % 6e4) / 1e3);
    const p = n => String(n).padStart(2, '0');
    if (el.dataset.fmt === 'text') el.textContent = (d ? d + ' ngày ' : '') + p(h) + ':' + p(m) + ':' + p(s);
    else el.innerHTML = (d ? `<b>${d}</b><em>ngày</em>` : '') + `<b>${p(h)}</b><em>:</em><b>${p(m)}</b><em>:</em><b>${p(s)}</b>`;
  });
}
setInterval(tick, 1000);
setInterval(() => {
  const c = $('#car'); if (!c || c.matches(':hover')) return;
  const n = c.children.length, w = c.clientWidth, i = Math.round(c.scrollLeft / w);
  c.scrollTo({ left: ((i + 1) % n) * w, behavior: 'smooth' });
}, 4500);

/* ---------------- Events ---------------- */
document.addEventListener('click', e => {
  const nav = e.target.closest('[data-nav]');
  if (nav) { const [r, id] = nav.dataset.nav.split('/'); navJump(r, NAV_PARAMS[r] || (id ? { id } : {})); return; }
  const el = e.target.closest('[data-go],[data-act],[data-tab]');
  if (!el || !el.closest('#app')) return;
  if (el.dataset.tab) { tabGo(el.dataset.tab); return; }
  if (el.dataset.act) { const a = ACT[el.dataset.act]; if (a) { e.preventDefault(); a(el, e); } return; }
  if (el.dataset.go) { const p = { ...el.dataset }; delete p.go; go(el.dataset.go, p); }
});
document.addEventListener('input', e => {
  const el = e.target;
  if (el.dataset.bind) { const [o, k] = el.dataset.bind.split('.'); S[o][k] = el.type === 'checkbox' ? el.checked : el.value; }
  if (el.dataset.oninput && ACT[el.dataset.oninput]) ACT[el.dataset.oninput](el, e);
});
document.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset.bind) { const [o, k] = el.dataset.bind.split('.'); S[o][k] = el.value; }
});

/* ---------------- Common actions ---------------- */
Object.assign(ACT, {
  back: () => back(),
  capMenu: () => toast('Menu của Zalo Mini App<br><span style="opacity:.7">Chia sẻ · Thêm vào màn hình chính · Báo cáo</span>'),
  capClose: () => toast('Đóng Mini App (mô phỏng)'),
  zalo: () => toast('Mở chat Zalo OA KITAWA (mô phỏng)'),
  call: el => toast(`Đang gọi ${el.dataset.n} (mô phỏng)`),
  sheetClose: () => closeSheet(),
  soon: el => toast((el.dataset.t || 'Tính năng') + ' – chưa có trong prototype'),
  addCart: el => {
    const id = el.dataset.id; const c = S.cart.find(x => x.id === id);
    if (c) { c.qty++; c.checked = true; } else S.cart.push({ id, qty: 1, checked: true });
    const tb = $('.tab[data-tab="cart"]');
    if (tb) { let b = tb.querySelector('.bdg'); if (!b) { b = document.createElement('span'); b.className = 'bdg'; tb.appendChild(b); } b.textContent = cartCount(); }
    const fb = $('.foot [data-go="cart"] .bdg'); if (fb) fb.textContent = cartCount();
    toast(`${ic('checkc', 16, 2, 'style="display:inline;vertical-align:-3px;margin-right:4px;color:#7CE3B4"')}Đã thêm vào giỏ hàng`);
  },
  buyNow: el => {
    const id = el.dataset.id;
    S.cart.forEach(c => c.checked = false);
    const c = S.cart.find(x => x.id === id);
    if (c) c.checked = true; else S.cart.push({ id, qty: 1, checked: true });
    go('checkout');
  },
  fav: el => {
    const id = el.dataset.id; const i = S.favs.indexOf(id);
    if (i >= 0) S.favs.splice(i, 1); else S.favs.push(id);
    rerender(); toast(i >= 0 ? 'Đã bỏ khỏi Yêu thích' : 'Đã thêm vào Yêu thích');
  },
  share: () => toast('Đã tạo link chia sẻ kèm mã giới thiệu MINHANH'),
  klInfo: () => openSheet(sheetKL),
  dealer: () => openSheet(sheetDealer),
  stores: () => openSheet(sheetStores),
  policy: () => openSheet(sheetPolicy),
});

/* ---------------- Shared sheets ---------------- */
function sheetKL() {
  return `<h3>Cấp độ sáng KL là gì?</h3>
  <p class="sub" style="line-height:1.55">KL-xxxW là <b>cấp độ sáng</b> KITAWA dùng để so sánh độ sáng giữa các mẫu đèn, <b>không phải công suất điện tiêu thụ</b>. Đèn sạc hoàn toàn bằng nắng nên không tốn tiền điện.</p>
  <div class="sec" style="margin:0;box-shadow:none;background:var(--tint)">
    <div class="sh" style="margin-bottom:6px"><h3 style="font-size:14px">Gợi ý chọn nhanh</h3><span class="chip gray">Tham khảo</span></div>
    <div class="lrow"><div class="ico gold">${ic('home2', 18)}</div><div class="grow"><div class="t">Lối đi, sân nhà, cổng</div><div class="s">KL-100W – KL-200W</div></div></div>
    <div class="lrow"><div class="ico gold">${ic('road', 18)}</div><div class="grow"><div class="t">Đường làng, ngõ hẻm</div><div class="s">KL-300W – KL-600W</div></div></div>
    <div class="lrow"><div class="ico gold">${ic('factory', 18)}</div><div class="grow"><div class="t">Đường lớn, nhà xưởng, công trình</div><div class="s">KL-800W – KL-1000W</div></div></div>
  </div>
  <button class="btn btn-gold btn-block mt16" data-act="zalo">Vẫn chưa chắc? Tư vấn qua Zalo</button>`;
}
function sheetDealer() {
  return `<h3>Cùng KITAWA kinh doanh đèn năng lượng mặt trời</h3>
  <p class="sub">Tuyển đại lý, nhà phân phối toàn quốc</p>
  <img src="${IMG}dealer.jpg" style="border-radius:12px;margin-bottom:12px" alt="">
  <div class="lrow"><div class="ico gold">${ic('percent', 18)}</div><div class="grow"><div class="t">Giá sỉ tốt, chiết khấu hấp dẫn</div></div></div>
  <div class="lrow"><div class="ico gold">${ic('image', 18)}</div><div class="grow"><div class="t">Hỗ trợ ấn phẩm quảng cáo</div></div></div>
  <div class="lrow"><div class="ico gold">${ic('trend', 18)}</div><div class="grow"><div class="t">Hỗ trợ marketing online</div></div></div>
  <div class="row mt16"><button class="btn btn-ghost grow" data-act="call" data-n="0943 899 539">${ic('phone', 18)} 0943 899 539</button><button class="btn btn-zalo grow" data-act="zalo">Chat Zalo đại lý</button></div>`;
}
function sheetStores() {
  return `<h3>Hệ thống cửa hàng</h3><p class="sub">Showroom và văn phòng đại diện KITAWA</p>
  ${STORES.map(s => `<div class="lrow"><div class="ico navy">${ic('store', 18)}</div><div class="grow"><div class="t">${s.n}</div><div class="s">${s.a}</div><div class="s">${ic('clock', 12, 2, 'style="display:inline;vertical-align:-2px"')} ${s.h}</div></div><button class="btn btn-ghost btn-xs" data-act="soon" data-t="Chỉ đường">${ic('nav', 13)} Chỉ đường</button></div>`).join('')}`;
}
function sheetPolicy() {
  return `<h3>Chính sách bảo hành</h3><p class="sub">Theo kitawa.vn/chinh-sach-bao-hanh</p>
  <table class="spec">${WPOLICY.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</table>
  <div class="note mt12">${ic('info', 18)}<div>Bảo hành điện tử tính từ <b>ngày kích hoạt</b>. Tem, niêm phong và phiếu bảo hành phải còn nguyên vẹn; thông tin khách hàng và đơn hàng khớp với hệ thống. Thời gian xử lý bảo hành 10 – 15 ngày.</div></div>
  <button class="btn btn-ghost btn-block mt12" data-act="call" data-n="1900 0026">${ic('phone', 18)} Bảo hành, khiếu nại: 1900 0026 (nhánh 2)</button>`;
}

/* ---------------- Shared components ---------------- */
const klChip = p => (p.kl ? `<span class="chip kl">KL-${p.kl}W</span>` : '');
const bhChip = p => (p.bh === null ? '' : `<span class="chip bh">${ic('shield', 11, 2.2)}BH ${p.bh || 36} tháng</span>`);
const stars = (n = 5, s = 12) => `<span class="stars">${Array.from({ length: 5 }, (_, i) => `<span style="opacity:${i < Math.round(n) ? 1 : .25}">${icFill('star', s)}</span>`).join('')}</span>`;
function pcard(p) {
  const o = off(p);
  return `<div class="pc" data-go="product" data-id="${p.id}">
    <div class="im"><img src="${IMG + p.img}" alt="" loading="lazy">${o ? `<span class="off">-${o}%</span>` : ''}${p.video ? `<span class="vid">${icFill('play', 9)} Video</span>` : ''}${p.gift ? `<span class="giftline">${ic('gift', 12, 2.2)} Có quà tặng</span>` : ''}</div>
    <div class="bd"><div class="nm">${p.short}</div>
      <div class="chips">${klChip(p)}${bhChip(p)}</div>
      <div style="min-height:33px"><span class="pr">${fmt(p.price)}</span>${p.old ? `<div class="old">${fmt(p.old)}</div>` : ''}</div>
      <div class="meta">${icFill('star', 11)} ${p.rating.toFixed(1)} · Đã bán ${soldK(p.sold)}</div>
    </div>
    <button class="add" data-act="addCart" data-id="${p.id}" aria-label="Thêm vào giỏ">${ic('plus', 16, 2.6)}</button>
  </div>`;
}
function prow(p) {
  const o = off(p);
  return `<div class="pr-row" data-go="product" data-id="${p.id}">
    <div style="position:relative;flex:none"><img src="${IMG + p.img}" alt="" loading="lazy">${o ? `<span class="off">-${o}%</span>` : ''}</div>
    <div class="grow" style="display:flex;flex-direction:column;gap:5px">
      <div style="font-size:13.5px;font-weight:600;line-height:1.35">${p.short}</div>
      <div class="row" style="gap:4px;flex-wrap:wrap">${klChip(p)}${bhChip(p)}${p.gift ? `<span class="chip gift">${ic('gift', 11, 2.2)}Quà tặng</span>` : ''}</div>
      <div class="row" style="align-items:baseline;gap:6px"><span class="pr" style="font-size:16px">${fmt(p.price)}</span>${p.old ? `<span class="old" style="font-size:11.5px">${fmt(p.old)}</span>` : ''}</div>
      <div class="faint" style="font-size:11px">${icFill('star', 10)} ${p.rating.toFixed(1)} · Đã bán ${soldK(p.sold)}</div>
    </div>
    <button class="add" data-act="addCart" data-id="${p.id}" style="position:absolute;right:10px;bottom:10px;width:30px;height:30px;border-radius:50%;background:var(--gold);display:grid;place-items:center;color:var(--navy-ink)">${ic('plus', 16, 2.6)}</button>
  </div>`;
}
const sh = (t, link, attrs = '') => `<div class="sh"><h3>${t}</h3>${link ? `<button class="lk" ${attrs}>${link} ›</button>` : ''}</div>`;

/* ---------------- Desktop side nav ---------------- */
const NAV = [
  ['Mua sắm', [['home', 'Trang chủ'], ['products', 'Danh sách sản phẩm'], ['product', 'Chi tiết sản phẩm'], ['flash', 'Flash Sale'], ['cart', 'Giỏ hàng'], ['checkout', 'Thanh toán']]],
  ['Bảo hành điện tử', [['warranty', 'Trung tâm bảo hành'], ['scan', 'Quét mã QR trên tem'], ['wform', 'Form kích hoạt bảo hành'], ['wdone', 'Thẻ bảo hành điện tử']]],
  ['Thành viên & ưu đãi', [['member', 'Tích điểm & hạng thành viên'], ['ctv', 'Cộng tác viên'], ['voucher', 'Ví voucher'], ['profile', 'Trang cá nhân'], ['quote', 'Báo giá dự án']]],
];
const NAV_PARAMS = { product: { id: 'bc10600' }, wform: { pid: 'bc10600', serial: 'KTW-BC10600-2611-08452' } };
function drawNav() {
  const el = $('#nav'); if (!el) return;
  let i = 0;
  el.innerHTML = NAV.map(([g, items]) => `<div class="nav-g">${g}</div>` + items.map(([r, n]) => `<button data-nav="${r}" class="${S.route === r ? 'on' : ''}"><span class="n">${++i}</span>${n}</button>`).join('')).join('');
}

/* ---------------- Boot ---------------- */
function init() {
  if (/[?&]full/.test(location.search)) document.body.classList.add('full');
  const h = (location.hash || '').replace('#', '');
  const [r, id] = h.split('/');
  if (r && SCREENS[r]) {
    S.stack = TAB_ROUTES.includes(r) ? [] : [{ route: 'home', params: {} }];
    S.route = r; S.params = NAV_PARAMS[r] && !id ? NAV_PARAMS[r] : (id ? { id } : {});
    enter(r, S.params);
  }
  render(false);
  const rs = $('#reset');
  if (rs) rs.onclick = () => { S = initState(); render(false); toast('Đã đặt lại dữ liệu mẫu'); };
  /* Trên điện thoại cột ghi chú bị ẩn → báo rõ đây là bản thiết kế mẫu */
  let seen = false;
  try { seen = sessionStorage.getItem('kw-proto-note') === '1'; } catch (e) {}
  if (window.matchMedia('(max-width:860px)').matches && !seen) openSheet(sheetProtoNote);
}
function sheetProtoNote() {
  return `<div style="text-align:center;padding:6px 4px 0">
    <div style="display:inline-grid;place-items:center;width:64px;height:64px;border-radius:18px;background:var(--navy);color:var(--gold);margin-bottom:12px">${ic('sun', 32, 2)}</div>
    <h3>Bản thiết kế mẫu (prototype)</h3>
    <p class="sub" style="line-height:1.55;margin-top:6px">Đây là bản thiết kế giao diện Mini App <b>đề xuất</b> cho KITAWA, dùng để xem và góp ý. <b>Không phải ứng dụng chính thức</b> – không có đơn hàng, thanh toán hay dữ liệu thật.</p>
    <button class="btn btn-gold btn-block" data-act="protoOk">Xem prototype</button></div>`;
}
ACT.protoOk = () => { try { sessionStorage.setItem('kw-proto-note', '1'); } catch (e) {} closeSheet(); };
