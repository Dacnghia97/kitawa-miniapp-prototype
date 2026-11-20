/* =========================================================
   Màn hình mua sắm: Trang chủ, Danh sách, Chi tiết, Flash Sale,
   Giỏ hàng, Thanh toán, Đặt hàng thành công
   ========================================================= */

/* ======================= TRANG CHỦ ======================= */
SCREENS.home = () => {
  const flash = FLASH.items[1];
  const tier = TIERS[2], next = TIERS[3];
  const homeCats = ['den-duong', 'den-pha', 'chong-choi', 'cong-trinh', 'san-vuon', 'tru-cong', 'quat'].map(getCat);
  const feat = {
    hot: PRODUCTS.filter(p => p.kl >= 100).sort((a, b) => b.sold - a.sold),
    duong: PRODUCTS.filter(p => p.cat === 'den-duong'),
    pha: PRODUCTS.filter(p => ['den-pha', 'chong-choi'].includes(p.cat)),
    ct: PRODUCTS.filter(p => ['cong-trinh'].includes(p.cat)).concat(PRODUCTS.filter(p => p.kl >= 800 && p.cat !== 'cong-trinh')),
  }[S.homeTab].slice(0, 4);
  const qa = [
    ['flash', 'zap', 'Flash Sale', 'red', 'HOT'], ['voucher', 'ticket', 'Voucher', 'gold'], ['member', 'coin', 'Tích điểm', 'gold'], ['scan', 'qr', 'Kích hoạt BH', 'green'],
    ['ctv', 'users', 'Cộng tác viên', 'blue'], ['quote', 'file', 'Báo giá dự án', 'navy'], ['warranty', 'shield', 'Tra cứu BH', 'green'], ['@stores', 'store', 'Cửa hàng', 'navy'],
  ];
  const pctTier = Math.round((S.spend / next.min) * 100);
  return {
    theme: 'dark', tab: 'home', fab: true,
    headLeft: `<img src="${IMG}logo.png" class="hd-logo" alt="KITAWA Solar Light">`,
    body: `
    <section class="hero">
      <div class="hello">
        <div><div class="hi">Chào Minh Anh 👋</div><div class="hi-sub">Hôm nay bạn muốn thắp sáng ở đâu?</div></div>
        <button class="tierpill" data-go="member">${ic('sun', 14, 2.2)} ${tier.name} · ${fnum(S.points)} điểm</button>
      </div>
      <button class="search" data-go="products" data-focus="1">${ic('search', 18)}<span>Tìm đèn đường, đèn pha, 600W…</span><i class="qr" data-act="soon" data-t="Quét mã sản phẩm">${ic('scan', 18)}</i></button>
      <div class="hs">${[60, 100, 150, 200, 300, 400, 500, 600, 1000].map(w => `<button class="pwchip" data-go="products" data-kl="${w}">${w}W</button>`).join('')}</div>
    </section>

    <div class="ban-wrap">
      <div class="carousel" id="car">
        <div class="slide bf" data-go="flash">
          <div class="bf-l">
            <div class="bf-k">BLACK FRIDAY</div>
            <div class="bf-t">Chốt Deal Liền Tay<br>Rinh Ngay Quà Khủng</div>
            <div class="bf-d">20/11 – 30/11 · Giảm đến 64%</div>
            <div class="cdb glass" data-cd="bf"></div>
            <span class="btn btn-gold btn-xs" style="align-self:flex-start;margin-top:2px">Săn deal ngay ${ic('right', 14, 2.4)}</span>
          </div>
          <div class="bf-r"><img src="${IMG}p-bc10600.png" alt=""></div>
        </div>
        <div class="slide" data-go="product" data-id="bcdt61000"><img src="${IMG}launch.jpg" alt="Ra mắt siêu phẩm đèn đường LED 1000W"></div>
        <div class="slide" data-act="dealer"><img src="${IMG}dealer.jpg" alt="Tuyển đại lý toàn quốc"></div>
      </div>
      <div class="dots" id="dots"><i class="on"></i><i></i><i></i></div>
    </div>

    <div class="trust">
      <div>${ic('truck', 20)}<span>Freeship<br>từ 500K</span></div>
      <div>${ic('shield', 20)}<span>Bảo hành<br>36 tháng</span></div>
      <div>${ic('refresh', 20)}<span>Đổi trả<br>7 ngày</span></div>
    </div>

    <div class="sec"><div class="qa">${qa.map(([r, i, l, c, b]) => `<button ${r[0] === '@' ? `data-act="${r.slice(1)}"` : `data-go="${r}"`}><span class="qi ico ${c}">${ic(i, 23)}${b ? `<span class="chip red">${b}</span>` : ''}</span>${l}</button>`).join('')}</div></div>

    <div class="mcard" data-go="member">
      <span class="wm">${ic('sun', 150, 1.2)}</span>
      <div class="mc-top">
        <div><div class="mc-k">HẠNG THÀNH VIÊN</div><div class="mc-t">${ic('sun', 20, 2.2)} ${tier.name}</div></div>
        <div class="mc-pts"><b>${fnum(S.points)}</b>điểm ≈ ${fmt(S.points * 100)}</div>
      </div>
      <div class="bar dark"><i style="width:${pctTier}%"></i></div>
      <div class="mc-f"><span>Còn ${fmt(next.min - S.spend)} để lên ${next.name}</span><span>Quyền lợi ›</span></div>
    </div>

    <div class="sec">
      <div class="sh"><div class="fs-h"><span class="fs-logo">${icFill('zap', 17)}FLASH SALE</span><span class="cdb red" data-cd="flash"></span></div><button class="lk" data-go="flash">Xem tất cả ›</button></div>
      <div class="hs">${flash.map(f => { const p = getP(f.id); const pc = Math.round(f.sold / f.total * 100); return `
        <div class="fcard" data-go="product" data-id="${p.id}">
          <div class="im"><img src="${IMG + p.img}" alt="">${p.old ? `<span class="off">-${Math.round((1 - f.price / p.old) * 100)}%</span>` : ''}${f.sold >= f.total ? '<div class="soldout"><span>ĐÃ HẾT</span></div>' : ''}</div>
          <span class="pr">${fmt(f.price)}</span><span class="old">${p.old ? fmt(p.old) : ''}</span>
          <div class="bar red"><i style="width:${pc}%"></i></div>
          <div class="sold">${f.sold >= f.total ? 'Đã bán hết' : pc >= 85 ? '🔥 Sắp cháy hàng' : 'Đã bán ' + f.sold}</div>
        </div>`; }).join('')}</div>
    </div>

    <div class="sec">
      ${sh('Danh mục sản phẩm', 'Tất cả', 'data-go="products" data-cat="all"')}
      <div class="cats">${homeCats.map(c => `<button data-go="products" data-cat="${c.id}"><span class="ci"><img src="${IMG + c.img}" alt=""></span><span class="cn">${c.name}</span><span class="cc">${c.n} mẫu</span></button>`).join('')}
        <button data-go="products" data-cat="all"><span class="ci">${ic('grid', 24)}</span><span class="cn">Xem tất cả</span><span class="cc">300+ mẫu</span></button></div>
    </div>

    <div class="blk-t">Bạn mua cho ai?</div>
    <div class="who">
      <button class="w1" data-go="products" data-use="san-nha"><span class="wt">Mua cho gia đình</span><span class="ws">Sân, cổng, lối đi</span><img src="${IMG}c-8.png" alt=""></button>
      <button class="w2" data-go="quote"><span class="wt">Công trình, dự án</span><span class="ws">Báo giá & thiết kế miễn phí</span><img src="${IMG}prj-2.jpg" alt=""></button>
      <button class="w3" data-act="dealer"><span class="wt">Làm đại lý</span><span class="ws">Giá sỉ, chiết khấu tốt</span><img src="${IMG}c-3.png" alt=""></button>
    </div>

    <div class="blk-t">Sản phẩm nổi bật<button class="lk" data-go="products" data-cat="all">Xem thêm ›</button></div>
    <div class="utabs" style="margin:0 16px 12px">${[['hot', 'Bán chạy'], ['duong', 'Đèn đường'], ['pha', 'Đèn pha'], ['ct', 'Công trình']].map(([k, n]) => `<button class="${S.homeTab === k ? 'on' : ''}" data-act="homeTab" data-k="${k}">${n}</button>`).join('')}</div>
    <div class="grid2">${feat.map(pcard).join('')}</div>

    <div class="blk-t">Giải pháp chiếu sáng dự án<button class="lk" data-go="quote">Báo giá ›</button></div>
    <div class="hs">${['lb-1.jpg', 'lb-2.jpg', 'lb-3.jpg'].map(i => `<div class="lb" data-go="quote"><img src="${IMG + i}" alt=""></div>`).join('')}</div>

    <div class="blk-t">Dự án KITAWA vừa thực hiện<span class="chip gold lg">230+ dự án · 34 tỉnh</span></div>
    <div class="hs">${PROJECTS.map(p => `<div class="prj"><img src="${IMG + p.img}" alt=""><div>${p.t}</div></div>`).join('')}</div>

    <div class="sec">
      ${sh('Kiến thức năng lượng mặt trời', 'Xem thêm', 'data-act="soon" data-t="Thư viện bài viết"')}
      <div class="art" data-act="klInfo"><img src="${IMG}c-4.png" alt=""><div><div class="t">Cấp độ sáng KL là gì? Cách chọn đèn theo KL</div><div class="s">Kiến thức · 3 phút đọc</div></div></div>
      <div class="art" data-act="soon" data-t="Bài viết"><img src="${IMG}art-1.jpg" alt=""><div><div class="t">4 mẫu đèn năng lượng mặt trời KITAWA tại CellphoneS, chọn mẫu nào?</div><div class="s">Tin tức · 5 phút đọc</div></div></div>
      <div class="art" data-act="soon" data-t="Bài viết"><img src="${IMG}prj-3.jpg" alt=""><div><div class="t">Cách chọn công suất đèn đường phù hợp cho đường làng</div><div class="s">Hướng dẫn · 4 phút đọc</div></div></div>
    </div>
    <div class="brandfoot"><b>KITAWA · Kiến Tạo Ánh Sáng</b>Sạc bằng nắng, tự sáng khi trời tối, không tốn tiền điện.</div>`,
    after: () => {
      const c = $('#car'), d = $('#dots');
      if (c) c.addEventListener('scroll', () => { const i = Math.round(c.scrollLeft / c.clientWidth); d.querySelectorAll('i').forEach((x, j) => x.classList.toggle('on', i === j)); }, { passive: true });
    },
  };
};
ACT.homeTab = el => { S.homeTab = el.dataset.k; rerender(); };

/* ======================= DANH SÁCH SẢN PHẨM ======================= */
const PRICE_RANGES = { a: { n: 'Dưới 500K', r: [0, 500000] }, b: { n: '500K – 1 triệu', r: [500000, 1000000] }, c: { n: '1 – 2 triệu', r: [1000000, 2000000] }, d: { n: '2 – 3 triệu', r: [2000000, 3000000] }, e: { n: 'Trên 3 triệu', r: [3000000, 1e12] } };
const SORTS = { pop: 'Phổ biến', off: 'Giảm nhiều nhất', asc: 'Giá thấp → cao', desc: 'Giá cao → thấp', new: 'Mới nhất' };
const QUICK = { sale: 'Đang giảm giá', gift: 'Có quà tặng', ship: 'Freeship', ip67: 'IP67', hot: 'Bán chạy' };
const KLS = [60, 100, 120, 200, 300, 400, 500, 600, 800, 1000];

ENTER.products = p => {
  const f = S.pl;
  if (p.cat || p.kl || p.use || p.q !== undefined) { Object.assign(f, { cat: 'all', use: null, q: '', kl: [], price: null, ip: [], quick: [] }); }
  if (p.cat) f.cat = p.cat;
  if (p.kl) f.kl = [+p.kl];
  if (p.use) f.use = p.use;
};
function plFiltered() {
  const f = S.pl; let a = PRODUCTS.slice();
  if (f.cat !== 'all') a = a.filter(p => p.cat === f.cat);
  if (f.use) a = a.filter(p => USES[f.use].cats.includes(p.cat));
  if (f.q.trim()) { const q = norm(f.q.trim()); a = a.filter(p => norm(p.name + ' ' + p.short + ' ' + p.id).includes(q)); }
  if (f.kl.length) a = a.filter(p => f.kl.includes(p.kl));
  if (f.price) { const [lo, hi] = PRICE_RANGES[f.price].r; a = a.filter(p => p.price >= lo && p.price < hi); }
  if (f.ip.length) a = a.filter(p => f.ip.includes(p.ip));
  if (f.remote) a = a.filter(p => p.remote);
  const q = f.quick;
  if (q.includes('sale')) a = a.filter(p => p.old);
  if (q.includes('gift')) a = a.filter(p => p.gift);
  if (q.includes('ship')) a = a.filter(p => p.price >= 500000);
  if (q.includes('ip67')) a = a.filter(p => p.ip === 'IP67');
  if (q.includes('hot')) a = a.filter(p => p.sold >= 1000);
  const so = { pop: (x, y) => PRODUCTS.indexOf(x) - PRODUCTS.indexOf(y), asc: (x, y) => x.price - y.price, desc: (x, y) => y.price - x.price, off: (x, y) => off(y) - off(x), new: (x, y) => PRODUCTS.indexOf(y) - PRODUCTS.indexOf(x) };
  return a.sort(so[f.sort]);
}
function plFilterCount() { const f = S.pl; return f.kl.length + (f.price ? 1 : 0) + f.ip.length + (f.remote ? 1 : 0); }
function plResults() {
  const f = S.pl, a = plFiltered();
  const act = [];
  if (f.q) act.push(['q', '', `“${esc(f.q)}”`]);
  if (f.use) act.push(['use', '', USES[f.use].name]);
  f.kl.forEach(k => act.push(['kl', k, k + 'W']));
  if (f.price) act.push(['price', '', PRICE_RANGES[f.price].n]);
  f.ip.forEach(k => act.push(['ip', k, k]));
  f.quick.forEach(k => act.push(['quick', k, QUICK[k]]));
  const advice = `<div class="advice"><div class="grow"><div class="t">Chưa biết chọn đèn nào?</div><div class="s">Gọi 0915 405 339 hoặc chat để được tư vấn đúng công suất</div></div><button class="btn btn-gold btn-sm" data-act="zalo">Tư vấn Zalo</button></div>`;
  let list;
  if (!a.length) list = `<div class="empty"><div class="sun">${ic('sun', 40, 1.6)}</div><h4>Chưa có mẫu phù hợp</h4><p>Thử bỏ bớt bộ lọc hoặc chọn công suất khác.</p><button class="btn btn-navy btn-sm mt12" data-act="plClear">Xóa bộ lọc</button></div>`;
  else if (f.view === 'grid') { const cards = a.map(pcard); if (cards.length > 4) cards.splice(4, 0, advice); else cards.push(advice); list = `<div class="grid2">${cards.join('')}</div>`; }
  else { const rows = a.map(prow); rows.splice(Math.min(3, rows.length), 0, `<div style="margin:0 16px 10px">${advice}</div>`); list = `<div class="plist">${rows.join('')}</div>`; }
  return `<div class="resline"><span><b>${a.length}</b> sản phẩm</span><div class="actf">${act.map(([k, v, n]) => `<button data-act="plRm" data-k="${k}" data-v="${v}">${n} ${ic('x', 12, 2.4)}</button>`).join('')}</div></div>${list}<div class="spacer"></div>`;
}
SCREENS.products = () => {
  const f = S.pl;
  return {
    theme: 'light', tab: 'products', fab: true, title: 'Đèn năng lượng mặt trời',
    body: `
    <div class="pl-top">
      <div class="row" style="padding-right:10px">
        <label class="sbox grow" style="margin-right:0">${ic('search', 18)}<input id="plq" placeholder="Tìm trong 300+ mẫu đèn…" value="${esc(f.q)}" data-oninput="plSearch" autocomplete="off">${f.q ? `<button class="x" data-act="plRm" data-k="q">${ic('x', 16, 2.2)}</button>` : ''}</label>
        <button class="hbtn" data-go="cart" aria-label="Giỏ hàng" style="width:40px;height:40px;display:grid;place-items:center;position:relative">${ic('cart', 23)}${cartCount() ? `<span class="bdg" style="position:absolute;top:0;right:-2px">${cartCount()}</span>` : ''}</button>
      </div>
      <div class="ctabs">
        <button class="${f.cat === 'all' ? 'on' : ''}" data-act="plCat" data-c="all"><span class="ct">${ic('grid', 20)}</span>Tất cả</button>
        ${CATS.map(c => `<button class="${f.cat === c.id ? 'on' : ''}" data-act="plCat" data-c="${c.id}"><span class="ct"><img src="${IMG + c.img}" alt=""></span>${c.name}</button>`).join('')}
      </div>
      <div class="hs uses">${Object.entries(USES).map(([k, u]) => `<button class="pill ${f.use === k ? 'on-gold' : ''}" data-act="plUse" data-k="${k}">${ic(u.icon, 15)}${u.name}</button>`).join('')}</div>
    </div>
    <div class="fbar">
      <div class="fbar-1">
        <button class="on" data-act="plSort">${SORTS[f.sort]} ${ic('down', 14, 2.2)}</button>
        <button class="${f.kl.length ? 'on' : ''}" data-act="plFilter">Công suất ${ic('down', 14, 2.2)}</button>
        <button class="${f.price ? 'on' : ''}" data-act="plFilter">Giá ${ic('down', 14, 2.2)}</button>
        <button class="fc" data-act="plFilter">${ic('filter', 16)} Lọc${plFilterCount() ? ` (${plFilterCount()})` : ''}</button>
        <button class="vt" data-act="plView" aria-label="Đổi kiểu hiển thị">${ic(f.view === 'grid' ? 'list' : 'grid', 19)}</button>
      </div>
      <div class="hs">${Object.entries(QUICK).map(([k, n]) => `<button class="pill ${f.quick.includes(k) ? 'on' : ''}" data-act="plQuick" data-k="${k}">${f.quick.includes(k) ? ic('check', 13, 2.6) : ''}${n}</button>`).join('')}</div>
    </div>
    <div id="plres">${plResults()}</div>`,
    after: () => { if (S.params.focus) { const i = $('#plq'); if (i) { i.focus(); } S.params.focus = 0; } },
  };
};
function plUpdate() { const r = $('#plres'); if (r) r.innerHTML = plResults(); }
const toggleIn = (arr, v) => { const i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); else arr.push(v); };
Object.assign(ACT, {
  plSearch: el => { S.pl.q = el.value; plUpdate(); },
  plCat: el => { S.pl.cat = el.dataset.c; S.pl.use = null; rerender(); },
  plUse: el => { S.pl.use = S.pl.use === el.dataset.k ? null : el.dataset.k; if (S.pl.use) S.pl.cat = 'all'; rerender(); },
  plQuick: el => { toggleIn(S.pl.quick, el.dataset.k); rerender(); },
  plView: () => { S.pl.view = S.pl.view === 'grid' ? 'list' : 'grid'; rerender(); },
  plClear: () => { Object.assign(S.pl, { cat: 'all', use: null, q: '', kl: [], price: null, ip: [], quick: [], remote: false }); rerender(); },
  plRm: el => {
    const { k, v } = el.dataset, f = S.pl;
    if (k === 'q') f.q = ''; else if (k === 'use') f.use = null; else if (k === 'price') f.price = null;
    else if (k === 'kl') toggleIn(f.kl, +v); else if (k === 'ip') toggleIn(f.ip, v); else if (k === 'quick') toggleIn(f.quick, v);
    rerender();
  },
  plSort: () => openSheet(() => `<h3>Sắp xếp theo</h3><div class="mt8">${Object.entries(SORTS).map(([k, n]) => `<div class="pay" data-act="plSortPick" data-k="${k}"><span class="grow" style="font-weight:600">${n}</span><span class="rd ${S.pl.sort === k ? 'on' : ''}"></span></div>`).join('')}</div>`),
  plSortPick: el => { S.pl.sort = el.dataset.k; closeSheet(); rerender(); },
  plFilter: () => openSheet(sheetFilter),
  pfKl: el => { toggleIn(S.pl.kl, +el.dataset.v); drawSheet(); },
  pfPrice: el => { S.pl.price = S.pl.price === el.dataset.v ? null : el.dataset.v; drawSheet(); },
  pfIp: el => { toggleIn(S.pl.ip, el.dataset.v); drawSheet(); },
  pfRemote: () => { S.pl.remote = !S.pl.remote; drawSheet(); },
  pfReset: () => { Object.assign(S.pl, { kl: [], price: null, ip: [], remote: false }); drawSheet(); },
  pfApply: () => { closeSheet(); rerender(); },
});
function sheetFilter() {
  const f = S.pl, n = plFiltered().length;
  return `<div class="row between"><h3>Bộ lọc</h3><button class="lk" style="color:var(--navy2);font-weight:600" data-act="pfReset">Đặt lại</button></div>
  <div class="fld mt12"><label>Cấp độ sáng / công suất</label><div class="row" style="flex-wrap:wrap;gap:8px">${KLS.map(k => `<button class="pill ${f.kl.includes(k) ? 'on' : ''}" data-act="pfKl" data-v="${k}">${k}W</button>`).join('')}</div></div>
  <div class="fld"><label>Khoảng giá</label><div class="row" style="flex-wrap:wrap;gap:8px">${Object.entries(PRICE_RANGES).map(([k, r]) => `<button class="pill ${f.price === k ? 'on' : ''}" data-act="pfPrice" data-v="${k}">${r.n}</button>`).join('')}</div></div>
  <div class="fld"><label>Chuẩn chống nước</label><div class="row" style="gap:8px">${['IP65', 'IP66', 'IP67'].map(k => `<button class="pill ${f.ip.includes(k) ? 'on' : ''}" data-act="pfIp" data-v="${k}">${k}</button>`).join('')}</div></div>
  <div class="lrow" style="border:0;cursor:pointer" data-act="pfRemote"><div class="ico navy">${ic('cpu', 18)}</div><div class="grow"><div class="t">Có điều khiển từ xa</div><div class="s">Remote 10m, hẹn giờ, chỉnh độ sáng</div></div><span class="sw ${f.remote ? 'on' : ''}"></span></div>
  <div class="row mt12"><button class="btn btn-ghost" data-act="sheetClose">Đóng</button><button class="btn btn-gold grow" data-act="pfApply">Xem ${n} kết quả</button></div>`;
}

/* ======================= CHI TIẾT SẢN PHẨM ======================= */
function specsOf(p) {
  if (p.cat === 'quat') return [['Công suất quạt', '20W'], ['Tấm pin', 'Mono hiệu suất cao'], ['Pin lưu trữ', 'Lithium'], ['Chế độ', '3 tốc độ, hẹn giờ, remote'], ['Bảo hành', '12 tháng']];
  if (p.cat === 'tru-den') return [['Chất liệu', 'Thép mạ kẽm, sơn tĩnh điện'], ['Chiều cao', '4m'], ['Tương thích', 'Đèn đường KITAWA'], ['Màu sắc', 'Đen']];
  if (p.cat === 'phu-kien') return [['Chất liệu', 'Dây đồng bọc cao su'], ['Chiều dài', '5m'], ['Tương thích', 'Đèn tấm pin rời KITAWA']];
  const a = [];
  if (p.kl) a.push(['Cấp độ sáng', `KL-${p.kl}W`]);
  a.push(['Chip LED', 'SMD hiệu suất cao'], ['Tấm pin', 'Mono, hiệu suất đến 18%'], ['Pin lưu trữ', 'Lithium 3.2V'], ['Thời gian sạc', '4 – 6 giờ nắng tốt'], ['Thời gian sáng', '10 – 12 giờ'], ['Nhiệt độ màu', '6.500K'], ['Chống nước', p.ip || 'IP65'], ['Điều khiển', p.remote ? 'Remote 10m + cảm biến ánh sáng' : 'Cảm biến ánh sáng tự động']);
  if (p.id === 'bc10600') a.push(['Chống va đập', 'IK08'], ['Thân đèn', 'Nhôm đúc nguyên khối']);
  return a;
}
SCREENS.product = prm => {
  const p = getP(prm.id) || PRODUCTS[0];
  const o = off(p), f = flashLive(p.id);
  const street = ['den-duong', 'cong-trinh', 'lien-the'].includes(p.cat), flood = ['den-pha', 'chong-choi'].includes(p.cat);
  const gal = [p.img].concat(street ? ['prj-2.jpg', 'lb-1.jpg'] : flood ? ['lb-3.jpg', 'prj-3.jpg'] : []);
  const hl = (street || flood ? [['panel', 'Tấm pin rời All In Two – đã được cấp bằng sáng chế'], ['shield', 'Thân nhôm đúc nguyên khối, tản nhiệt tốt']] : [])
    .concat([['clock', 'Sáng liên tục 10 – 12 giờ, tự bật khi trời tối'], ['zap', 'Không tốn tiền điện – sạc hoàn toàn bằng nắng'], ['cpu', p.remote ? 'Điều khiển từ xa 10m + cảm biến ánh sáng' : 'Cảm biến ánh sáng tự động bật/tắt']]);
  const sim = PRODUCTS.filter(x => x.id !== p.id && (x.cat === p.cat || (street && x.kl >= 300) || (flood && ['den-pha', 'chong-choi'].includes(x.cat)))).slice(0, 6);
  const isFav = S.favs.includes(p.id);
  return {
    theme: 'light', title: 'Chi tiết sản phẩm',
    headRight: `<button class="hbtn" data-act="share" aria-label="Chia sẻ">${ic('share', 20)}</button><button class="hbtn" data-act="fav" data-id="${p.id}" aria-label="Yêu thích" style="color:${isFav ? 'var(--red)' : 'inherit'}">${isFav ? icFill('heart', 20) : ic('heart', 20)}</button>`,
    body: `
    <div class="gal"><div class="track" id="gal">${gal.map(i => `<img src="${IMG + i}" alt="">`).join('')}</div>
      ${p.video ? `<button class="vbtn" data-act="soon" data-t="Video sản phẩm"><i>${icFill('play', 10)}</i>Video</button>` : ''}
      <span class="cnt" id="galc">1/${gal.length}</span></div>
    ${f ? `<div class="fsbar"><div class="l"><span class="k">${icFill('zap', 15)}FLASH SALE</span><span style="font-size:11px;display:flex;gap:6px;align-items:center">Kết thúc sau <span class="cdb white" data-cd="flash"></span></span></div>
      <div class="r"><span>Đã bán ${f.sold}/${f.total}</span><div class="bar" style="width:96px;background:rgba(255,255,255,.3)"><i style="width:${Math.round(f.sold / f.total * 100)}%;background:#FFD9A0"></i></div></div></div>` : ''}
    <div class="pinfo">
      <div class="p1"><span class="pr">${fmt(p.price)}</span>${p.old ? `<span class="old">${fmt(p.old)}</span><span class="chip red lg">-${o}%</span>` : ''}</div>
      ${p.vat ? '<div class="faint" style="font-size:12px;margin-top:2px">Đã bao gồm VAT</div>' : ''}
      <h1>${p.name}</h1>
      <div class="rt">${stars(p.rating, 13)} <b style="color:var(--ink)">${p.rating.toFixed(1)}</b> (${p.reviews} đánh giá) · Đã bán ${soldK(p.sold)}</div>
      <div class="chips">${p.kl ? `<span class="chip kl" style="height:24px;font-size:12px">KL-${p.kl}W</span><button class="kli" data-act="klInfo" aria-label="KL là gì">${ic('info', 13, 2.2)}</button>` : ''}${bhChip(p)}${p.ip ? `<span class="chip gray">${p.ip}</span>` : ''}${p.price >= 500000 ? `<span class="chip ship">${ic('truck', 11, 2.2)}Freeship</span>` : ''}</div>
      ${p.gift ? `<div class="giftbox">${ic('gift', 18)}<div><b>Có quà tặng kèm</b><br>Tặng bộ giá đỡ + phụ kiện lắp đặt khi mua trong thời gian Black Friday</div></div>` : ''}
      <div class="prow mt12" data-go="voucher"><span class="k">Mã giảm giá</span><span class="v"><span class="chip redsoft">Giảm 10%</span> <span class="chip gift">Giảm 100K</span></span>${ic('right', 16)}</div>
      <div class="prow" data-go="member"><span class="k">Điểm thưởng</span><span class="v" style="color:var(--gold-deep)">+${pts(p.price)} điểm <span class="faint" style="font-weight:500">(x1.5 hạng Nắng Vàng)</span></span>${ic('right', 16)}</div>
    </div>
    <div class="sec"><div class="trust4">
      <div><span class="ico green">${ic('shield', 19)}</span>Bảo hành<br>${p.bh || 36} tháng</div>
      <div><span class="ico navy">${ic('truck', 19)}</span>Freeship<br>từ 500K</div>
      <div><span class="ico gold">${ic('refresh', 19)}</span>Đổi trả<br>7 ngày</div>
      <div><span class="ico navy">${ic('wallet', 19)}</span>Thanh toán<br>khi nhận</div>
    </div></div>
    <div class="ctvcard"><span class="ico green" style="width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:#fff">${ic('users', 20)}</span><div class="grow" style="font-size:13px;line-height:1.4">Chia sẻ sản phẩm – nhận hoa hồng <b>~${fmt(comm(p.price))}</b></div><button class="btn btn-green btn-xs" data-act="share">Chia sẻ</button></div>
    <div class="sec">${sh('Điểm nổi bật')}${hl.map(([i, t]) => `<div class="hl"><span class="ico gold">${ic(i, 17)}</span><span style="padding-top:5px">${t}</span></div>`).join('')}</div>
    <div class="sec np"><div style="padding:14px 14px 4px">${sh('Thông số kỹ thuật')}</div><table class="spec">${specsOf(p).map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</table></div>
    <div class="sec">${sh(`Đánh giá (${p.reviews})`, 'Xem tất cả', 'data-act="soon" data-t="Tất cả đánh giá"')}
      <div class="row" style="gap:10px;margin-bottom:6px"><b style="font-size:28px">${p.rating.toFixed(1)}</b><div>${stars(p.rating, 15)}<div class="faint" style="font-size:12px;margin-top:2px">100% khách hài lòng</div></div></div>
      <div class="rv"><div class="who2"><span class="av" style="background:#3B6FD1">T</span>Anh Tuấn · Long An<span style="margin-left:auto">${stars(5, 11)}</span></div><p>Đèn sáng mạnh, lắp cho đường vào nhà rất ổn. Có điều khiển tiện, giao hàng nhanh.</p><div class="ph"><img src="${IMG}prj-2.jpg" alt=""><img src="${IMG + p.img}" alt=""></div></div>
      <div class="rv"><div class="who2"><span class="av" style="background:#0F6E4A">H</span>Chị Hạnh · Đồng Nai<span style="margin-left:auto">${stars(5, 11)}</span></div><p>Shop tư vấn nhiệt tình, chọn đúng công suất cho sân nhà. Kích hoạt bảo hành điện tử nhanh gọn.</p></div>
    </div>
    ${sim.length ? `<div class="blk-t">Sản phẩm tương tự</div><div class="hs">${sim.map(x => `<div style="width:160px">${pcard(x)}</div>`).join('')}</div>` : ''}
    <div class="spacer"></div>`,
    foot: `<button class="ib" data-act="zalo"><span style="background:var(--zalo);color:#fff;font-size:9px;font-weight:800;border-radius:6px;padding:4px 4px">Zalo</span>Chat</button>
      <button class="ib" data-go="cart">${ic('cart', 22)}Giỏ hàng${cartCount() ? `<span class="bdg">${cartCount()}</span>` : ''}</button>
      <button class="btn btn-line grow" style="padding:0 8px;font-size:14px" data-act="addCart" data-id="${p.id}">Thêm vào giỏ</button>
      <button class="btn btn-gold grow" style="padding:0 8px;font-size:14px" data-act="buyNow" data-id="${p.id}">Mua ngay</button>`,
    after: () => { const g = $('#gal'), c = $('#galc'); if (g) g.addEventListener('scroll', () => { c.textContent = (Math.round(g.scrollLeft / g.clientWidth) + 1) + '/' + gal.length; }, { passive: true }); },
  };
};

/* ======================= FLASH SALE ======================= */
const FCATS = { all: ['Tất cả'], duong: ['Đèn đường', ['den-duong', 'lien-the']], pha: ['Đèn pha', ['den-pha', 'chong-choi']], ct: ['Công trình', ['cong-trinh']], quat: ['Quạt', ['quat']], vuon: ['Sân vườn', ['san-vuon', 'tru-cong', 'ufo', 'mini']] };
function maskPrice(n) {
  const s = fmt(n).split(''); const idx = s.map((c, i) => (/\d/.test(c) ? i : -1)).filter(i => i >= 0);
  const k = n >= 1000000 ? [2, 3] : [1, 2]; k.forEach(j => { s[idx[j]] = 'x'; }); return s.join('');
}
SCREENS.flash = () => {
  const slot = FLASH.slots[S.flashSlot];
  const items = FLASH.items[S.flashSlot].filter(f => S.flashCat === 'all' || FCATS[S.flashCat][1].includes(getP(f.id).cat));
  const cdKey = S.flashSlot === 1 ? 'flash' : S.flashSlot === 2 ? 'next' : 'tmr';
  const row = f => {
    const p = getP(f.id), d = p.old ? Math.round((1 - f.price / p.old) * 100) : 0;
    if (slot.state === 'soon') {
      const on = S.reminders.includes(f.id);
      return `<div class="fr" data-go="product" data-id="${p.id}"><div class="fr-im"><img src="${IMG + p.img}" alt="">${d ? `<span class="off">-${d}%</span>` : ''}</div>
      <div class="fr-b"><div class="nm">${p.short}</div><div class="row" style="gap:4px">${klChip(p)}${bhChip(p)}</div>
        <div class="fr-pr"><span class="pr">${maskPrice(f.price)}</span>${p.old ? `<span class="old">${fmt(p.old)}</span>` : ''}</div>
        <div class="fr-bot"><div class="fr-prog"><span>Số lượng: ${f.total} sản phẩm</span></div><button class="btn btn-xs ${on ? 'btn-ghost' : 'btn-line'}" style="${on ? 'color:var(--green)' : 'border-color:var(--red);color:var(--red)'}" data-act="remind" data-id="${p.id}">${ic(on ? 'check' : 'bell', 14, 2.2)} ${on ? 'Đã đặt nhắc' : 'Nhắc tôi'}</button></div></div></div>`;
    }
    const pc = Math.round(f.sold / f.total * 100), out = f.sold >= f.total, past = slot.state === 'past';
    return `<div class="fr ${past ? 'past' : ''}" data-go="product" data-id="${p.id}"><div class="fr-im"><img src="${IMG + p.img}" alt="">${d ? `<span class="off">-${d}%</span>` : ''}${out ? '<div class="soldout"><span>ĐÃ HẾT</span></div>' : ''}</div>
      <div class="fr-b"><div class="nm">${p.short}</div><div class="row" style="gap:4px">${klChip(p)}${bhChip(p)}</div>
        <div class="fr-pr"><span class="pr">${fmt(f.price)}</span>${p.old ? `<span class="old">${fmt(p.old)}</span>` : ''}</div>
        <div class="fr-bot"><div class="fr-prog"><div class="bar red"><i style="width:${pc}%"></i></div><span class="${pc >= 85 && !out ? 'hot' : ''}">${out ? 'Đã bán hết' : pc >= 85 ? '🔥 Sắp hết · ' + f.sold + '/' + f.total : 'Đã bán ' + f.sold + '/' + f.total}</span></div>
        ${past ? '<span class="chip gray">Đã kết thúc</span>' : out ? '<button class="btn btn-xs btn-ghost" disabled>Hết hàng</button>' : `<button class="btn btn-red btn-xs" data-act="buyNow" data-id="${p.id}">Mua ngay</button>`}</div></div></div>`;
  };
  return {
    theme: 'flash', title: `${icFill('zap', 16)} FLASH SALE`.replace('<svg', '<svg style="display:inline;vertical-align:-2px"'),
    body: `
    <div class="fhero"><span class="bolt">${icFill('zap', 74)}</span>
      <div class="k">BLACK FRIDAY · 20/11 – 30/11</div>
      <div class="t">Giảm đến 64%<br>Số lượng có hạn</div>
      <div class="s">Mỗi khách tối đa 2 sản phẩm/khung giờ. Giá flash chỉ áp dụng trong khung giờ đang diễn ra.</div></div>
    <div class="slots">
      <div class="sl">${FLASH.slots.map((s, i) => `<button class="${S.flashSlot === i ? 'on' : ''}" data-act="flashSlot" data-i="${i}"><b>${s.time}</b><span>${s.label}</span></button>`).join('')}</div>
      <div class="cdrow">${slot.state === 'past' ? `${ic('clock', 15, 2)} Khung giờ đã kết thúc` : `${slot.state === 'live' ? 'Kết thúc sau' : 'Bắt đầu sau'} <span class="cdb red" data-cd="${cdKey}"></span>`}</div>
    </div>
    <div class="hs fchips">${Object.entries(FCATS).map(([k, v]) => `<button class="pill ${S.flashCat === k ? 'on' : ''}" data-act="flashCat" data-k="${k}">${v[0]}</button>`).join('')}</div>
    ${items.length ? items.map(row).join('') : `<div class="empty"><div class="sun">${ic('zap', 36)}</div><h4>Chưa có deal trong nhóm này</h4><p>Thử chọn nhóm khác hoặc khung giờ khác.</p></div>`}
    <p class="rule">• Giá flash sale đã bao gồm VAT, không áp dụng cùng voucher giảm giá theo %.<br>• Đơn chưa thanh toán sau 15 phút sẽ được hoàn suất cho khách khác.</p>
    <div class="spacer"></div>`,
    fab: true,
  };
};
Object.assign(ACT, {
  flashSlot: el => { S.flashSlot = +el.dataset.i; rerender(); },
  flashCat: el => { S.flashCat = el.dataset.k; rerender(); },
  remind: el => { const id = el.dataset.id; toggleIn(S.reminders, id); rerender(); toast(S.reminders.includes(id) ? 'Sẽ nhắc bạn qua Zalo trước 5 phút' : 'Đã tắt nhắc'); },
});

/* ======================= GIỎ HÀNG ======================= */
function vDisc(v, c) {
  const { sub, sel, qty } = c;
  const amt = (min, a) => (sub >= min ? { ok: 1, amt: a } : { ok: 0, msg: `Mua thêm ${fmt(min - sub)} để dùng` });
  const sumCat = cats => sel.filter(x => cats.includes(x.p.cat)).reduce((a, x) => a + x.p.price * x.qty, 0);
  switch (v.id) {
    case 'BF10': return sub >= 1500000 ? { ok: 1, amt: Math.min(300000, Math.round(sub * 0.1 / 1000) * 1000) } : amt(1500000, 0);
    case 'V100': return amt(2000000, 100000);
    case 'BF200': return amt(3000000, 200000);
    case 'K50': return amt(500000, 50000);
    case 'R50': return { ok: sub > 0 ? 1 : 0, amt: 50000 };
    case 'BDAY': return amt(1000000, 300000);
    case 'TIER': { const s = sumCat(['cong-trinh']); return s ? { ok: 1, amt: Math.min(500000, Math.round(s * 0.05 / 1000) * 1000) } : { ok: 0, msg: 'Chỉ áp dụng cho đèn công trình' }; }
    case 'BFPHA': { const s = sumCat(['den-pha', 'chong-choi']); return s ? { ok: 1, amt: Math.min(250000, Math.round(s * 0.15 / 1000) * 1000) } : { ok: 0, msg: 'Chỉ áp dụng cho đèn pha' }; }
    case 'PRJ': return qty >= 10 ? { ok: 1, amt: Math.round(sub * 0.03 / 1000) * 1000 } : { ok: 0, msg: `Cần thêm ${10 - qty} bộ đèn` };
    case 'FS': return sub >= 300000 ? { ok: 1, ship: 1, amt: 0 } : { ok: 0, msg: `Mua thêm ${fmt(300000 - sub)} để dùng` };
    case 'RFS': return { ok: sub > 0 ? 1 : 0, ship: 1, amt: 0 };
  }
  return { ok: 0 };
}
function cartCalc() {
  const sel = S.cart.filter(c => c.checked).map(c => ({ ...c, p: getP(c.id) }));
  const qty = sel.reduce((a, c) => a + c.qty, 0);
  const sub = sel.reduce((a, c) => a + c.p.price * c.qty, 0);
  const orig = sel.reduce((a, c) => a + (c.p.old || c.p.price) * c.qty, 0);
  let ship = sub === 0 || sub >= 500000 ? 0 : 30000;
  const v = S.voucher && S.owned.includes(S.voucher) ? VOUCHERS[S.voucher] : null;
  let vd = 0, vr = null;
  if (v) { vr = vDisc(v, { sub, sel, qty }); if (vr.ok) { if (vr.ship) ship = 0; else vd = vr.amt; } }
  const pd = S.usePoints ? Math.min(S.points * 100, Math.max(0, sub - vd)) : 0;
  const total = Math.max(0, sub - vd - pd + ship);
  return { sel, qty, sub, orig, ship, v, vr, vd, pd, total, earn: pts(total), save: Math.max(0, orig - total) };
}
SCREENS.cart = () => {
  const c = cartCalc();
  const all = S.cart.length && S.cart.every(x => x.checked);
  if (!S.cart.length) return {
    theme: 'light', tab: 'cart', title: 'Giỏ hàng',
    body: `<div class="empty" style="padding-top:80px"><div class="sun">${ic('cart', 38, 1.6)}</div><h4>Giỏ hàng đang trống</h4><p>Hàng trăm mẫu đèn đang giảm đến 64% dịp Black Friday.</p><button class="btn btn-gold mt16" data-tab="products">Mua sắm ngay</button></div>`,
  };
  const need = 500000 - c.sub;
  const vLabel = !c.v ? 'Chọn hoặc nhập mã' : c.vr && c.vr.ok ? (c.vr.ship ? 'Freeship' : 'Giảm ' + fmt(c.vd)) : 'Chưa đủ điều kiện';
  return {
    theme: 'light', tab: 'cart', title: `Giỏ hàng (${cartCount()})`,
    headRight: `<button class="htxt" data-act="cartEdit">${S.cartEdit ? 'Xong' : 'Sửa'}</button>`,
    body: `
    ${c.sub >= 500000 ? `<div class="shipban ok">${ic('truck', 22)}<div class="grow">Bạn đã được Freeship toàn quốc ✓<div class="bar green"><i style="width:100%"></i></div></div></div>`
      : `<div class="shipban no">${ic('truck', 22)}<div class="grow">Mua thêm ${fmt(Math.max(0, need))} để được Freeship<div class="bar"><i style="width:${Math.round(c.sub / 5000)}%"></i></div></div></div>`}
    <div class="sec" style="padding-bottom:0">
      <div class="row" style="padding-bottom:12px;cursor:pointer" data-act="ciAll"><span class="cb ${all ? 'on' : ''}">${ic('check', 14, 3)}</span><b style="font-size:14px">Chọn tất cả (${S.cart.length})</b><span class="grow"></span><span class="chip gold">${ic('store', 11, 2.2)} KITAWA Official</span></div>
      ${S.cart.map(x => { const p = getP(x.id), fl = flashLive(p.id); return `
      <div class="ci">
        <button class="cb ${x.checked ? 'on' : ''}" data-act="ciToggle" data-id="${p.id}" style="margin-top:31px" aria-label="Chọn">${ic('check', 14, 3)}</button>
        <img src="${IMG + p.img}" alt="" data-go="product" data-id="${p.id}">
        <div class="ci-b">
          <div class="ci-n">${p.short}</div>
          <div class="ci-v">${p.bh === null ? 'Phụ kiện' : `Bảo hành ${p.bh || 36} tháng`} · Giao từ kho TP.HCM</div>
          ${fl ? `<span class="chip redsoft" style="margin-top:5px">${icFill('zap', 10)} Flash Sale 12:00</span>` : ''}
          <div class="ci-p"><div><span class="pr">${fmt(p.price)}</span>${p.old ? `<span class="old">${fmt(p.old)}</span>` : ''}</div>
            <div class="qty"><button data-act="qty" data-id="${p.id}" data-d="-1" ${x.qty <= 1 ? 'disabled' : ''} aria-label="Giảm">${ic('minus', 14, 2.4)}</button><span>${x.qty}</span><button data-act="qty" data-id="${p.id}" data-d="1" aria-label="Tăng">${ic('plus', 14, 2.4)}</button></div></div>
          ${p.gift ? `<div class="ci-gift">🎁 Tặng kèm: bộ giá đỡ + phụ kiện lắp đặt</div>` : ''}
          ${S.cartEdit ? `<button class="ci-del" data-act="ciDel" data-id="${p.id}">${ic('trash', 14)} Xóa khỏi giỏ</button>` : ''}
        </div>
      </div>`; }).join('')}
    </div>
    <div class="sec">
      <div class="row" style="cursor:pointer" data-act="vSheet"><span class="ico gold" style="width:34px;height:34px;border-radius:10px;display:grid;place-items:center">${ic('ticket', 18)}</span><div class="grow"><b style="font-size:14px">KITAWA Voucher</b><div class="faint" style="font-size:12px">Bạn có ${S.owned.length} voucher</div></div><span style="font-weight:700;font-size:13px;color:${c.vr && c.vr.ok ? 'var(--red)' : 'var(--muted)'}">${vLabel}</span>${ic('right', 16)}</div>
      <div class="divider"></div>
      <div class="row" style="cursor:pointer" data-act="usePoints"><span class="ico gold" style="width:34px;height:34px;border-radius:10px;display:grid;place-items:center">${ic('coin', 18)}</span><div class="grow"><b style="font-size:14px">Dùng ${fnum(S.points)} điểm</b><div class="faint" style="font-size:12px">${S.usePoints ? '−' + fmt(c.pd) : 'Đổi tối đa ' + fmt(S.points * 100)}</div></div><span class="sw ${S.usePoints ? 'on' : ''}"></span></div>
    </div>
    <div class="sec">
      ${sh('Chi tiết thanh toán')}
      <div class="sumrow"><span class="k">Tạm tính (${c.qty} sản phẩm)</span><span>${fmt(c.sub)}</span></div>
      ${c.vd ? `<div class="sumrow"><span class="k">Giảm giá voucher</span><span class="pr">−${fmt(c.vd)}</span></div>` : ''}
      ${c.pd ? `<div class="sumrow"><span class="k">Dùng điểm</span><span class="pr">−${fmt(c.pd)}</span></div>` : ''}
      <div class="sumrow"><span class="k">Phí vận chuyển</span><span>${c.ship ? fmt(c.ship) : '0₫ <span class="chip bh">Freeship</span>'}</span></div>
      <div class="sumrow total"><span>Tổng thanh toán</span><span class="v">${fmt(c.total)}</span></div>
      ${c.total ? `<div class="earn">${ic('sun', 16, 2.2)} Nhận +${fnum(c.earn)} điểm (x1.5 hạng Nắng Vàng)</div>` : ''}
    </div>
    <div class="blk-t">Thường được mua kèm</div>
    <div class="hs">${['tru4m', 'day5m', 'mini3', 'tc01'].map(getP).map(p => `<div class="mini" data-go="product" data-id="${p.id}"><img src="${IMG + p.img}" alt=""><div>${p.short}<span class="pr">${fmt(p.price)}</span></div><button class="add" data-act="addCartRe" data-id="${p.id}">${ic('plus', 14, 2.6)}</button></div>`).join('')}</div>
    <div class="spacer"></div>`,
    footCls: 'cart-foot',
    foot: `<div class="tot"><div class="a">Tổng: <b>${fmt(c.total)}</b></div>${c.save ? `<div class="b">Tiết kiệm ${fmt(c.save)}</div>` : ''}</div><button class="btn btn-gold" style="min-width:150px" data-act="toCheckout" ${c.qty ? '' : 'disabled'}>Đặt hàng (${c.qty})</button>`,
  };
};
function sheetVoucherPick() {
  const c = cartCalc(); const base = { sub: c.sub, sel: c.sel, qty: c.qty };
  const list = S.owned.map(id => ({ v: VOUCHERS[id], r: vDisc(VOUCHERS[id], base) }));
  const best = list.filter(x => x.r.ok && !x.r.ship).sort((a, b) => b.r.amt - a.r.amt)[0];
  return `<h3>Chọn voucher</h3><p class="sub">Tạm tính ${fmt(c.sub)} · chọn 1 voucher cho đơn này</p>
  <div class="inp-wrap" style="margin-bottom:14px"><input class="inp" id="vcode2" placeholder="Nhập mã voucher" style="text-transform:uppercase"><button class="btn btn-navy btn-sm inbtn" data-act="vCode2">Áp dụng</button></div>
  ${list.map(({ v, r }) => `<div class="vsel ${S.voucher === v.id ? 'on' : ''} ${r.ok ? '' : 'na'}" data-act="${r.ok ? 'vPick' : 'noop'}" data-id="${v.id}">
    <span class="si stub ${v.type}">${ic(v.icon, 20)}</span>
    <div class="grow"><div style="font-weight:700;font-size:14px">${v.title}${best && best.v.id === v.id ? ' <span class="chip red">Tốt nhất</span>' : ''}</div><div class="faint" style="font-size:12px;margin-top:2px">${r.ok ? (r.ship ? 'Miễn phí vận chuyển' : 'Giảm ' + fmt(r.amt) + ' cho đơn này') : r.msg || v.cond}</div></div>
    <span class="rd ${S.voucher === v.id ? 'on' : ''}"></span></div>`).join('')}
  <div class="row mt12"><button class="btn btn-ghost" data-act="vNone">Không dùng</button><button class="btn btn-gold grow" data-act="sheetClose">Xong</button></div>`;
}
Object.assign(ACT, {
  noop: () => toast('Voucher chưa đủ điều kiện cho đơn này'),
  cartEdit: () => { S.cartEdit = !S.cartEdit; rerender(); },
  ciToggle: el => { const x = S.cart.find(c => c.id === el.dataset.id); x.checked = !x.checked; rerender(); },
  ciAll: () => { const all = S.cart.every(x => x.checked); S.cart.forEach(x => x.checked = !all); rerender(); },
  ciDel: el => { S.cart = S.cart.filter(c => c.id !== el.dataset.id); if (!S.cart.length) S.cartEdit = false; rerender(); toast('Đã xóa sản phẩm khỏi giỏ'); },
  qty: el => { const x = S.cart.find(c => c.id === el.dataset.id); x.qty = Math.max(1, x.qty + +el.dataset.d); rerender(); },
  usePoints: () => { S.usePoints = !S.usePoints; rerender(); },
  addCartRe: el => { ACT.addCart(el); rerender(); },
  vSheet: () => openSheet(sheetVoucherPick),
  vPick: el => { S.voucher = el.dataset.id; drawSheet(); rerenderUnderSheet(); },
  vNone: () => { S.voucher = null; closeSheet(); rerender(); },
  vCode2: () => { const v = ($('#vcode2').value || '').trim().toUpperCase(); if (addCode(v)) { S.voucher = 'K50'; drawSheet(); rerenderUnderSheet(); } },
  toCheckout: () => go('checkout'),
});
function rerenderUnderSheet() { const fn = sheetFn; render(true); if (fn) openSheet(fn); }
function addCode(v) {
  if (v === 'KITAWA50') { if (!S.owned.includes('K50')) S.owned.push('K50'); toast('Đã thêm voucher Giảm 50.000₫ vào ví'); return true; }
  if (v === 'BLACKFRIDAY') { toast('Voucher BLACKFRIDAY đã có trong ví của bạn'); return false; }
  toast(v ? 'Mã không hợp lệ hoặc đã hết hạn' : 'Vui lòng nhập mã voucher'); return false;
}

/* ======================= THANH TOÁN ======================= */
ENTER.checkout = () => { if (!S.cart.some(c => c.checked)) { if (!S.cart.length) S.cart = initState().cart; S.cart.forEach(c => c.checked = true); } };
SCREENS.checkout = () => {
  const c = cartCalc();
  const pays = [['cod', 'Thanh toán khi nhận hàng (COD)', 'Kiểm tra hàng trước khi thanh toán', `<span class="pi ico gold">${ic('wallet', 19)}</span>`], ['bank', 'Chuyển khoản ngân hàng', 'Quét mã VietQR, xác nhận tự động', `<span class="pi ico navy">${ic('bank', 19)}</span>`], ['zalopay', 'Ví ZaloPay', 'Thanh toán nhanh trong Zalo', `<span class="pi" style="background:#E8F0FF;color:var(--zalo)">Pay</span>`]];
  return {
    theme: 'light', title: 'Xác nhận đơn hàng',
    body: `
    <div class="sec"><div class="addr"><span class="ico red" style="display:grid;place-items:center">${ic('pin', 19)}</span><div class="grow">
      <div class="row between" style="align-items:flex-start"><b>Nguyễn Minh Anh<span class="faint" style="font-weight:500"> · 0987 *** 214</span></b><button class="lk" style="color:var(--navy2);font-weight:600;font-size:13px;white-space:nowrap" data-act="soon" data-t="Sổ địa chỉ">Thay đổi</button></div>
      <div class="muted" style="font-size:13px;margin-top:4px;line-height:1.45">25 Nguyễn Văn Đậu, P. Bình Thạnh, TP. Hồ Chí Minh</div>
      <button class="chip ship mt8" style="height:24px;border:0" data-act="soon" data-t="Lấy địa chỉ từ Zalo">${ic('pin', 11, 2.2)} Lấy địa chỉ từ Zalo</button></div></div></div>
    <div class="sec">
      ${sh(`Sản phẩm (${c.qty})`)}
      ${c.sel.map(x => `<div class="row" style="padding:6px 0"><img src="${IMG + x.p.img}" style="width:52px;height:52px;border-radius:8px;object-fit:cover" alt=""><div class="grow"><div style="font-size:13px;font-weight:600">${x.p.short}</div><div class="faint" style="font-size:12px">x${x.qty}</div></div><b style="font-size:13.5px">${fmt(x.p.price * x.qty)}</b></div>`).join('')}
    </div>
    <div class="sec"><div class="row"><span class="ico green" style="width:36px;height:36px;border-radius:10px;display:grid;place-items:center">${ic('truck', 19)}</span><div class="grow"><b style="font-size:14px">Giao tiêu chuẩn · ${c.ship ? fmt(c.ship) : 'Freeship'}</b><div class="muted" style="font-size:12.5px;margin-top:2px">Dự kiến nhận 21/11 – 22/11 (TP.HCM 24h – 2 ngày)</div><div class="faint" style="font-size:12px">Tỉnh khác 4 – 7 ngày làm việc</div></div></div></div>
    <div class="sec">${sh('Phương thức thanh toán')}
      ${pays.map(([k, t, s, i]) => `<div class="pay" data-act="pay" data-k="${k}">${i}<div class="grow"><div style="font-weight:600;font-size:14px">${t}</div><div class="faint" style="font-size:12px">${s}</div></div><span class="rd ${S.pay === k ? 'on' : ''}"></span></div>`).join('')}
    </div>
    <div class="sec">
      <div class="row" style="cursor:pointer" data-act="vat"><div class="grow"><b style="font-size:14px">Xuất hóa đơn VAT công ty</b><div class="faint" style="font-size:12px">Dành cho khách dự án, doanh nghiệp</div></div><span class="sw ${S.vat ? 'on' : ''}"></span></div>
      ${S.vat ? `<div class="mt12"><div class="fld"><label>Tên công ty</label><input class="inp" placeholder="Công ty TNHH…"></div><div class="fld"><label>Mã số thuế</label><input class="inp" placeholder="0312xxxxxx" inputmode="numeric"></div><div class="fld" style="margin-bottom:0"><label>Email nhận hóa đơn</label><input class="inp" placeholder="ketoan@congty.vn"></div></div>` : ''}
    </div>
    <div class="sec"><div class="fld" style="margin:0"><label>Ghi chú cho KITAWA</label><textarea class="inp" placeholder="Ví dụ: gọi trước khi giao, giao giờ hành chính…"></textarea></div></div>
    <div class="sec">
      <div class="sumrow"><span class="k">Tạm tính</span><span>${fmt(c.sub)}</span></div>
      ${c.vd ? `<div class="sumrow"><span class="k">Voucher ${c.v ? c.v.title.toLowerCase() : ''}</span><span class="pr">−${fmt(c.vd)}</span></div>` : ''}
      ${c.pd ? `<div class="sumrow"><span class="k">Dùng ${fnum(Math.ceil(c.pd / 100))} điểm</span><span class="pr">−${fmt(c.pd)}</span></div>` : ''}
      <div class="sumrow"><span class="k">Phí vận chuyển</span><span>${c.ship ? fmt(c.ship) : '0₫'}</span></div>
      <div class="sumrow total"><span>Tổng thanh toán</span><span class="v">${fmt(c.total)}</span></div>
      <div class="note green mt12">${ic('shield', 18)}<div>Đơn hàng được <b>bảo hành điện tử</b> – quét mã QR trên tem để kích hoạt ngay khi nhận hàng.</div></div>
    </div>
    <div class="spacer"></div>`,
    foot: `<div class="grow"><div class="faint" style="font-size:12px">Tổng thanh toán</div><b class="pr" style="font-size:19px">${fmt(c.total)}</b></div><button class="btn btn-gold" style="min-width:160px" data-act="placeOrder" ${c.qty ? '' : 'disabled'}>Đặt hàng</button>`,
  };
};
Object.assign(ACT, {
  pay: el => { S.pay = el.dataset.k; rerender(); },
  vat: () => { S.vat = !S.vat; rerender(); },
  placeOrder: el => {
    el.disabled = true; el.innerHTML = 'Đang xử lý…';
    setTimeout(() => {
      const c = cartCalc(); const code = 'KW2611-' + String(800 + Math.floor(Math.random() * 199)).padStart(4, '0');
      const used = Math.ceil(c.pd / 100);
      if (used) { S.points -= used; S.history.unshift({ t: 'Dùng điểm cho đơn #' + code, d: '20/11/2026', v: -used, icon: 'cart' }); }
      if (c.v && c.vr && c.vr.ok) { S.owned = S.owned.filter(x => x !== c.v.id); }
      S.voucher = null;
      S.lastOrder = { code, total: c.total, earn: c.earn, qty: c.qty, pay: S.pay, items: c.sel.map(x => x.p) };
      S.cart = S.cart.filter(x => !x.checked);
      S.stack = []; S.route = 'ordered'; S.params = {}; render(false);
    }, 700);
  },
});

/* ======================= ĐẶT HÀNG THÀNH CÔNG ======================= */
SCREENS.ordered = () => {
  const o = S.lastOrder || { code: 'KW2611-0842', total: 3321000, earn: 498, qty: 3, pay: 'cod', items: [getP('bc10600'), getP('dp15100')] };
  const payN = { cod: 'Thanh toán khi nhận hàng', bank: 'Chuyển khoản ngân hàng', zalopay: 'Ví ZaloPay' }[o.pay];
  return {
    theme: 'light', title: 'Đặt hàng thành công', back: false,
    body: `<div style="position:relative">${confetti()}
    <div class="okhero"><div class="okc">${ic('check', 44, 3)}</div><h2>Đặt hàng thành công!</h2><p>Cảm ơn bạn đã tin chọn KITAWA.<br>Mã đơn hàng <b style="color:var(--navy)">#${o.code}</b></p></div>
    <div class="sec">
      <div class="sumrow"><span class="k">Số sản phẩm</span><span>${o.qty}</span></div>
      <div class="sumrow"><span class="k">Thanh toán</span><span>${payN}</span></div>
      <div class="sumrow"><span class="k">Dự kiến giao</span><span>21/11 – 22/11</span></div>
      <div class="sumrow total"><span>Tổng thanh toán</span><span class="v">${fmt(o.total)}</span></div>
      <div class="earn">${ic('sun', 16, 2.2)} +${fnum(o.earn)} điểm sẽ được cộng khi giao hàng thành công</div>
    </div>
    <div class="sec" style="background:var(--navy);color:#fff">
      <div class="row" style="align-items:flex-start;gap:12px"><span style="width:40px;height:40px;border-radius:12px;background:rgba(232,174,18,.2);color:var(--gold);display:grid;place-items:center;flex:none">${ic('qr', 22)}</span>
      <div class="grow"><b style="font-size:14.5px">Nhớ kích hoạt bảo hành điện tử</b><div style="font-size:12.5px;color:#C7D0E6;margin-top:4px;line-height:1.5">Khi nhận hàng, quét mã QR trên tem bảo hành để bắt đầu thời hạn bảo hành và nhận thêm +50 điểm.</div>
      <button class="btn btn-gold btn-sm mt12" data-act="goTab" data-r="warranty">Xem hướng dẫn</button></div></div>
    </div>
    <div class="row" style="margin:16px 16px 0"><button class="btn btn-ghost grow" data-act="goTab" data-r="profile">Xem đơn hàng</button><button class="btn btn-navy grow" data-act="goTab" data-r="home">Về trang chủ</button></div>
    <div class="spacer"></div></div>`,
  };
};
ACT.goTab = el => tabGo(el.dataset.r);
function confetti() {
  const cols = ['#E8AE12', '#0A1E4A', '#D3261C', '#0F6E4A', '#F6C838', '#173777'];
  return `<div class="confetti">${Array.from({ length: 28 }, (_, i) => `<i style="left:${(i * 37) % 100}%;background:${cols[i % 6]};animation-delay:${(i % 7) * 0.12}s;transform:rotate(${i * 23}deg)"></i>`).join('')}</div>`;
}
