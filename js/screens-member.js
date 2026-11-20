/* =========================================================
   Màn hình: Bảo hành điện tử (hub, quét QR, form, thẻ),
   Thành viên, Cộng tác viên, Voucher, Tài khoản, Báo giá dự án
   ========================================================= */

/* ======================= BẢO HÀNH – HUB ======================= */
const WARRANTY_ILL = () => `<svg class="ill" viewBox="0 0 190 150" fill="none">
  <defs><linearGradient id="beam" x1="0" x2="1"><stop offset="0" stop-color="#E8AE12" stop-opacity=".05"/><stop offset="1" stop-color="#E8AE12" stop-opacity=".6"/></linearGradient></defs>
  <circle cx="95" cy="76" r="62" fill="#173777" opacity=".6"/>
  <g stroke="#E8AE12" stroke-width="2.5" stroke-linecap="round" opacity=".8"><path d="M30 18v8M14 34h8M19 23l5 5M41 23l-5 5"/></g>
  <circle cx="30" cy="34" r="6" fill="#E8AE12" opacity=".9"/>
  <polygon points="72,64 110,48 110,104 72,94" fill="url(#beam)"/>
  <g transform="rotate(-8 42 80)"><rect x="12" y="56" width="62" height="48" rx="6" fill="#fff"/>
    ${fakeQR(26, 5).replace('<svg ', '<svg x="18" y="62" ')}
    <rect x="49" y="64" width="19" height="4" rx="2" fill="#0A1E4A"/><rect x="49" y="72" width="15" height="3" rx="1.5" fill="#C7D0E6"/><rect x="49" y="79" width="17" height="3" rx="1.5" fill="#C7D0E6"/>
    <rect x="18" y="93" width="50" height="5" rx="2.5" fill="#E8AE12"/></g>
  <rect x="110" y="20" width="62" height="112" rx="13" fill="#0D1B3A" stroke="#E8AE12" stroke-width="3"/>
  <rect x="117" y="32" width="48" height="74" rx="5" fill="#173777"/>
  <g stroke="#E8AE12" stroke-width="2.5" stroke-linecap="round"><path d="M124 46v-6h6M158 46v-6h-6M124 92v6h6M158 92v6h-6"/></g>
  <rect x="124" y="68" width="34" height="2.5" rx="1.25" fill="#E8AE12"/>
  <rect x="131" y="116" width="20" height="5" rx="2.5" fill="#E8AE12" opacity=".7"/>
</svg>`;
SCREENS.warranty = () => {
  const st = { active: ['Đang bảo hành', 'bh', 'green'], soon: ['Sắp hết hạn', 'gift', ''], none: ['Chưa kích hoạt', 'redsoft', ''] };
  return {
    theme: 'dark', tab: 'warranty', title: 'Bảo hành điện tử',
    body: `
    <section class="whero">${WARRANTY_ILL()}
      <h2>Kích hoạt bảo hành điện tử</h2>
      <p>Thời hạn bảo hành được tính từ ngày kích hoạt – kích hoạt ngay để được bảo vệ đầy đủ.</p>
      <div class="acts"><button class="btn btn-gold btn-block" data-go="scan">${ic('qr', 20, 2)} Quét mã QR trên tem bảo hành</button>
        <button class="btn btn-glass btn-block" data-act="serialSheet">${ic('edit', 18)} Nhập số serial thủ công</button></div>
      <div class="bonus">${ic('sun', 16, 2.2)} +50 điểm khi kích hoạt thành công</div>
    </section>
    <div class="sec"><div class="steps3"><div><b>1</b>Quét tem<br>bảo hành</div><div><b>2</b>Điền<br>thông tin</div><div><b>3</b>Nhận thẻ<br>bảo hành</div></div></div>
    <div class="sec">${sh(`Sản phẩm của tôi (${S.warranties.length})`)}
      ${S.warranties.map(w => { const p = getP(w.pid), s = st[w.st]; return `<div class="wc">
        <img src="${IMG + p.img}" alt="">
        <div class="grow"><div class="n">${p.short}</div><div class="s">${w.serial}</div>
          <div class="st"><span class="chip ${s[1]}" ${w.st === 'soon' ? 'style="background:var(--gold-soft);color:var(--gold-text)"' : ''}>${s[0]}</span>
          ${w.st === 'none' ? `<span class="grow"></span><button class="btn btn-gold btn-xs" data-go="wform" data-pid="${p.id}" data-serial="${w.serial}">Kích hoạt</button>`
            : `<div class="bar ${w.st === 'active' ? 'green' : ''}"><i style="width:${Math.max(4, w.pct)}%"></i></div><span style="color:${w.st === 'active' ? 'var(--green)' : 'var(--gold-deep)'}">${w.left}</span>`}</div></div></div>`; }).join('')}
    </div>
    <div class="sec"><div class="ql">
      <button data-act="lookupSheet"><span class="ico green" style="display:grid;place-items:center">${ic('search', 17)}</span>Tra cứu bảo hành</button>
      <button data-act="claimSheet"><span class="ico red" style="display:grid;place-items:center">${ic('wrench', 17)}</span>Gửi yêu cầu bảo hành</button>
      <button data-act="policy"><span class="ico navy" style="display:grid;place-items:center">${ic('doc', 17)}</span>Chính sách bảo hành</button>
      <button data-act="soon" data-t="Hướng dẫn lắp đặt"><span class="ico gold" style="display:grid;place-items:center">${ic('book', 17)}</span>Hướng dẫn lắp đặt</button>
    </div></div>
    <div class="sec"><div class="row"><span class="ico green" style="width:40px;height:40px;border-radius:12px;display:grid;place-items:center">${ic('headset', 20)}</span><div class="grow"><b style="font-size:14px">Bảo hành, khiếu nại</b><div class="muted" style="font-size:12.5px">1900 0026 (nhánh 2) · 1.000đ/phút</div></div><button class="btn btn-green btn-xs" data-act="call" data-n="1900 0026">Gọi</button><button class="btn btn-zalo btn-xs" data-act="zalo">Chat</button></div></div>
    <div class="spacer"></div>`,
  };
};
function sheetSerial() {
  return `<h3>Nhập số serial</h3><p class="sub">Số serial in trên tem bảo hành, dán ở thân đèn hoặc vỏ hộp</p>
  <div class="fld"><input class="inp" id="serialIn" placeholder="VD: KTW-BC10600-2611-08452" style="text-transform:uppercase;font-family:ui-monospace,Consolas,monospace"></div>
  <div class="note blue">${ic('info', 18)}<div>Không thấy tem? Gọi 1900 0026 (nhánh 2) để được hỗ trợ tra cứu theo số điện thoại mua hàng.</div></div>
  <button class="btn btn-gold btn-block mt16" data-act="serialGo">Tiếp tục</button>`;
}
function sheetLookup() {
  return `<h3>Tra cứu bảo hành</h3><p class="sub">Tra cứu theo số serial hoặc số điện thoại mua hàng</p>
  <div class="fld"><input class="inp" placeholder="Số serial hoặc số điện thoại" value="KTW-BC10600-2610-01127"></div>
  <div class="sec" style="margin:0;box-shadow:none;background:var(--green-soft)"><div class="row"><span class="dot"></span><b style="color:var(--green);font-size:14px">Còn hiệu lực bảo hành</b></div>
  <div class="sumrow mt8"><span class="k">Sản phẩm</span><span>Đèn Đường 600W BC10600</span></div><div class="sumrow"><span class="k">Kích hoạt</span><span>15/10/2026</span></div><div class="sumrow"><span class="k">Tấm pin</span><span>đến 15/10/2031</span></div><div class="sumrow"><span class="k">LED, pin, bộ điều khiển</span><span>đến 15/10/2029</span></div></div>
  <button class="btn btn-gold btn-block mt16" data-act="sheetClose">Đóng</button>`;
}
function sheetClaim() {
  return `<h3>Gửi yêu cầu bảo hành</h3><p class="sub">KITAWA sẽ liên hệ xác nhận trong giờ làm việc</p>
  <div class="fld"><label>Sản phẩm</label><select class="inp">${S.warranties.filter(w => w.st !== 'none').map(w => `<option>${getP(w.pid).short} · ${w.serial}</option>`).join('')}</select></div>
  <div class="fld"><label>Tình trạng lỗi</label><div class="row" style="flex-wrap:wrap;gap:8px">${['Đèn không sáng', 'Sáng yếu, nhanh tắt', 'Remote không nhận', 'Tấm pin hư hỏng', 'Khác'].map((t, i) => `<button class="pill ${i === 1 ? 'on' : ''}">${t}</button>`).join('')}</div></div>
  <div class="fld"><label>Mô tả thêm</label><textarea class="inp" placeholder="Mô tả lỗi, thời điểm bắt đầu…"></textarea></div>
  <div class="upl">${ic('camera', 22)} Thêm ảnh / video lỗi (tối đa 5)</div>
  <button class="btn btn-gold btn-block mt16" data-act="claimSend">Gửi yêu cầu</button>`;
}
Object.assign(ACT, {
  serialSheet: () => openSheet(sheetSerial),
  serialGo: () => { const v = ($('#serialIn').value || '').trim().toUpperCase() || 'KTW-BC10600-2611-08452'; const fromScan = S.route === 'scan'; closeSheet(); go('wform', { pid: 'bc10600', serial: v }, { replace: fromScan }); },
  lookupSheet: () => openSheet(sheetLookup),
  claimSheet: () => openSheet(sheetClaim),
  claimSend: () => { closeSheet(); toast('Đã gửi yêu cầu bảo hành #BH2611-031<br><span style="opacity:.7">Thời gian xử lý 10 – 15 ngày</span>'); },
});

/* ======================= QUÉT MÃ QR ======================= */
SCREENS.scan = () => ({
  theme: 'camera', title: 'Quét mã bảo hành',
  body: `<div class="cam">
    <div class="vf"><div class="sticker"><span class="h">KITAWA · TEM BẢO HÀNH</span>${fakeQR(100, 11)}<span class="sn">S/N: KTW-BC10600-2611-08452</span></div>
      <i class="c c1"></i><i class="c c2"></i><i class="c c3"></i><i class="c c4"></i><div class="line"></div></div>
    <div class="msg" id="scanmsg">Đưa mã QR trên tem bảo hành vào khung hình</div>
    <div class="tools">
      <button class="${S.torch ? 'on' : ''}" data-act="torch"><i>${ic('flash', 22)}</i>Đèn flash</button>
      <button data-act="serialSheet"><i>${ic('edit', 22)}</i>Nhập serial</button>
      <button data-act="soon" data-t="Chọn ảnh từ thư viện"><i>${ic('image', 22)}</i>Thư viện</button>
    </div></div>`,
  after: () => {
    clearTimeout(S.timer);
    S.timer = setTimeout(() => {
      const m = $('#scanmsg'); const l = $('.vf .line');
      if (m) { m.className = 'msg ok'; m.innerHTML = `${ic('checkc', 18, 2.2, 'style="display:inline;vertical-align:-4px;margin-right:4px"')}Đã nhận diện: Đèn Đường 600W BC10600`; }
      if (l) l.remove();
      S.timer = setTimeout(() => go('wform', { pid: 'bc10600', serial: 'KTW-BC10600-2611-08452' }, { replace: true }), 1100);
    }, 2600);
  },
});
ACT.torch = () => { S.torch = !S.torch; rerender(); };

/* ======================= FORM KÍCH HOẠT ======================= */
ENTER.wform = () => { Object.assign(S.wf, { agree: false, photos: 2, phone: '', addr: '' }); };
SCREENS.wform = prm => {
  const p = getP(prm.pid) || getP('bc10600'), serial = prm.serial || 'KTW-BC10600-2611-08452', w = S.wf;
  const photos = [p.img, 'prj-2.jpg', 'prj-3.jpg', 'lb-1.jpg'].slice(0, w.photos);
  return {
    theme: 'light', title: 'Kích hoạt bảo hành',
    body: `
    <div class="stepper"><div class="s done"><b>${ic('check', 13, 3)}</b>Quét mã</div><div class="ln done"></div><div class="s cur"><b>2</b>Thông tin</div><div class="ln"></div><div class="s"><b>3</b>Hoàn tất</div></div>
    <div class="sec"><div class="detect"><img src="${IMG + p.img}" alt=""><div class="grow"><div class="k">${ic('checkc', 14, 2.4)} Đã nhận diện sản phẩm</div><div class="n">${p.short}</div><div class="s">Serial: ${esc(serial)}</div><span class="chip bh mt4">${ic('shield', 11, 2.2)}Chính hãng KITAWA</span></div></div></div>
    <div class="sec">
      <div class="fld"><label>Họ và tên</label><input class="inp" data-bind="wf.name" value="${esc(w.name)}"></div>
      <div class="fld"><label>Số điện thoại mua hàng <span class="faint" style="font-weight:500">Bắt buộc</span></label><div class="inp-wrap"><input class="inp" id="wphone" data-bind="wf.phone" value="${esc(w.phone)}" placeholder="Số điện thoại đã mua hàng" inputmode="tel"><button class="btn btn-zalo btn-sm inbtn" data-act="zaloPhone">Lấy từ Zalo</button></div></div>
      <div class="fld"><label>Nơi mua</label><select class="inp" data-bind="wf.where">${['Mini App KITAWA', 'Website kitawa.vn', 'Đại lý KITAWA', 'Sàn thương mại điện tử', 'Showroom KITAWA'].map(o => `<option ${w.where === o ? 'selected' : ''}>${o}</option>`).join('')}</select></div>
      <div class="row" style="gap:10px"><div class="fld grow"><label>Mã đơn hàng</label><input class="inp" data-bind="wf.order" value="${esc(w.order)}" placeholder="Nếu có"></div><div class="fld grow"><label>Ngày mua</label><input class="inp" type="date" data-bind="wf.date" value="${w.date}"></div></div>
      <div class="fld"><label>Tỉnh / Thành phố lắp đặt</label><select class="inp" data-bind="wf.prov">${['TP. Hồ Chí Minh', 'Hà Nội', 'Cần Thơ', 'Đồng Nai', 'Bình Dương', 'Long An', 'Tây Ninh', 'Khác'].map(o => `<option ${w.prov === o ? 'selected' : ''}>${o}</option>`).join('')}</select></div>
      <div class="fld" style="margin-bottom:0"><label>Địa chỉ lắp đặt</label><input class="inp" data-bind="wf.addr" value="${esc(w.addr)}" placeholder="Số nhà, đường, phường/xã"></div>
    </div>
    <div class="sec">
      <div class="fld"><label>Ảnh sản phẩm đã lắp đặt và tem bảo hành <span class="faint" style="font-weight:500">${w.photos}/3</span></label>
        <div class="ups">${photos.map((i, k) => `<div class="u"><img src="${IMG + i}" alt=""><button class="x" data-act="wPhotoRm" aria-label="Xóa ảnh">${ic('x', 12, 2.6)}</button></div>`).join('')}${w.photos < 3 ? `<button class="u add" data-act="wPhoto">${ic('camera', 22)}Thêm ảnh</button>` : ''}</div></div>
      <div class="agree" data-act="wAgree"><span class="cb ${w.agree ? 'on' : ''}">${ic('check', 14, 3)}</span><span>Tôi đồng ý với <a data-act="policy">Chính sách bảo hành KITAWA</a> và cho phép lưu thông tin để phục vụ bảo hành.</span></div>
      <div class="note mt12">${ic('info', 18)}<div>Tem và niêm phong bảo hành cần còn nguyên vẹn. Số điện thoại phải trùng với thông tin đơn hàng trên hệ thống.</div></div>
    </div>
    <div class="spacer"></div>`,
    foot: `<button class="btn btn-gold btn-block" data-act="wSubmit" data-pid="${p.id}" data-serial="${esc(serial)}" ${w.agree ? '' : 'disabled'}>${ic('shield', 19, 2)} Kích hoạt bảo hành</button>`,
  };
};
Object.assign(ACT, {
  zaloPhone: () => { S.wf.phone = '0987 654 214'; const i = $('#wphone'); if (i) i.value = S.wf.phone; toast('Đã lấy số điện thoại từ tài khoản Zalo'); },
  wPhoto: () => { S.wf.photos = Math.min(3, S.wf.photos + 1); rerender(); },
  wPhotoRm: () => { S.wf.photos = Math.max(0, S.wf.photos - 1); rerender(); },
  wAgree: (el, e) => { if (e.target.closest('a')) return; S.wf.agree = !S.wf.agree; rerender(); },
  wSubmit: el => {
    if (!S.wf.phone.trim()) { toast('Vui lòng nhập số điện thoại mua hàng'); const i = $('#wphone'); if (i) i.focus(); return; }
    el.disabled = true; el.innerHTML = 'Đang kích hoạt…';
    setTimeout(() => {
      const pid = el.dataset.pid, serial = el.dataset.serial;
      const ex = S.warranties.find(w => w.serial === serial);
      if (ex) Object.assign(ex, { st: 'active', left: 'Còn 36 tháng', pct: 100 });
      else S.warranties.unshift({ id: 'w' + Date.now(), pid, serial, st: 'active', left: 'Còn 36 tháng', pct: 100 });
      S.points += 50; S.history.unshift({ t: 'Kích hoạt bảo hành ' + getP(pid).short.split(' ').pop(), d: '20/11/2026', v: 50, icon: 'shield' });
      if (!S.tasksDone.includes('bh')) S.tasksDone.push('bh');
      S.lastW = { pid, serial };
      go('wdone', {}, { replace: true });
    }, 800);
  },
});

/* ======================= THẺ BẢO HÀNH ĐIỆN TỬ ======================= */
function compsOf(p) {
  if (p.cat === 'quat') return [['fan', 'Quạt và tấm pin', 'Toàn bộ sản phẩm', 1]];
  if (['den-duong', 'cong-trinh', 'lien-the', 'den-pha', 'chong-choi'].includes(p.cat))
    return [['panel', 'Tấm pin năng lượng', 'Mono, hiệu suất cao', 5], ['bulb', 'Đèn LED', 'Chip SMD', 3], ['battery', 'Pin lưu trữ', 'Lithium 3.2V', 3], ['cpu', 'Bộ điều khiển', 'Cảm biến + remote', 3]];
  return [['bulb', 'Đèn LED', 'Chip SMD', 3], ['panel', 'Tấm pin', 'Mono', 3], ['battery', 'Pin lưu trữ', 'Lithium', 3]];
}
SCREENS.wdone = () => {
  const { pid, serial } = S.lastW, p = getP(pid);
  return {
    theme: 'light', title: 'Kích hoạt thành công',
    body: `<div style="position:relative">${confetti()}
    <div class="okhero" style="padding-bottom:18px"><div class="okc">${ic('check', 44, 3)}</div><h2>Kích hoạt thành công!</h2><p>Sản phẩm của bạn đã được bảo hành điện tử</p><span class="chip gold lg mt8">${ic('sun', 13, 2.4)} +50 điểm</span></div>
    <div class="ecard"><span class="wm">${ic('sun', 200, 1)}</span>
      <img src="${IMG}logo.png" class="lg" alt="KITAWA">
      <div class="tt">THẺ BẢO HÀNH ĐIỆN TỬ</div>
      <div class="pn">${p.short}</div>
      <div class="sn">S/N ${esc(serial)}</div>
      <div class="meta"><div>Chủ sở hữu<b>${esc(S.wf.name || 'Nguyễn Minh Anh')}</b></div><div>Ngày kích hoạt<b>20/11/2026</b></div></div>
      <div class="qr">${fakeQR(54, 23)}</div>
    </div>
    <div class="sec">${sh('Thời hạn theo bộ phận')}
      ${compsOf(p).map(([i, n, d, y]) => `<div class="comp"><span class="ico navy" style="display:grid;place-items:center">${ic(i, 18)}</span><div class="grow"><div class="n">${n}</div><div class="d"><span class="dot"></span>&nbsp; Còn hiệu lực đến 20/11/${2026 + y}</div></div><span class="y">${y} năm</span></div>`).join('')}
    </div>
    <div style="margin:16px 16px 0;display:flex;flex-direction:column;gap:10px">
      <button class="btn btn-gold btn-block" data-act="wSave">${ic('download', 19)} Lưu thẻ vào Sản phẩm của tôi</button>
      <div class="row"><button class="btn btn-ghost grow" data-act="policy">Chính sách bảo hành</button><button class="btn btn-ghost grow" data-act="claimSheet">Yêu cầu bảo hành</button></div>
    </div>
    <p class="rule" style="text-align:center">Bảo hành, khiếu nại: <b>1900 0026</b> (nhánh 2)</p>
    <div class="spacer"></div></div>`,
  };
};
ACT.wSave = () => { tabGo('warranty'); toast('Đã lưu thẻ bảo hành điện tử'); };

/* ======================= THÀNH VIÊN ======================= */
SCREENS.member = () => {
  const cur = 2, next = TIERS[3], pct = Math.round(S.spend / next.min * 100);
  let tab = '';
  if (S.memberTab === 'ben') tab = `<div class="sec">${sh('Quyền lợi hạng Nắng Vàng')}
      ${BENEFITS.map(b => `<div class="ben"><span class="ico gold" style="display:grid;place-items:center">${ic(b.icon, 18)}</span><div class="grow"><div class="t">${b.t}</div><div class="faint" style="font-size:12px;margin-top:2px">${b.s}</div></div>${ic('check', 18, 2.4, 'style="color:var(--green)"')}</div>`).join('')}
      <div class="divider"></div><div class="faint" style="font-size:12px;font-weight:700;letter-spacing:.06em;margin-bottom:4px">MỞ KHÓA Ở HẠNG MẶT TRỜI</div>
      ${BENEFITS_LOCKED.map(b => `<div class="ben lock"><span class="ico navy" style="display:grid;place-items:center">${ic(b.icon, 18)}</span><div class="grow t">${b.t}</div>${ic('lock', 16)}</div>`).join('')}</div>`;
  else if (S.memberTab === 'gift') tab = `<div class="sec">${sh('Đổi điểm lấy quà', `${fnum(S.points)} điểm`, 'style="color:var(--gold-deep)"')}<div class="gifts">${REWARDS.map(r => `<div class="gift">
      <div class="gi ${r.img ? '' : 'stub ' + r.type}" style="${r.img ? 'background:#fff' : ''}">${r.img ? `<img src="${IMG + r.img}" alt="">` : `<span style="color:#fff">${ic(r.icon, 30)}</span>`}</div>
      <div class="t">${r.t}</div><div class="p">${ic('sun', 13, 2.4)} ${fnum(r.p)} điểm</div>
      <button class="btn ${S.points >= r.p ? 'btn-gold' : 'btn-ghost'} btn-xs" data-act="redeem" data-id="${r.id}" ${S.points >= r.p ? '' : 'disabled'}>${S.points >= r.p ? 'Đổi ngay' : 'Chưa đủ điểm'}</button></div>`).join('')}</div></div>`;
  else tab = `<div class="sec">${sh('Lịch sử điểm')}${S.history.map(h => `<div class="hist"><span class="ico ${h.v > 0 ? 'green' : 'red'}" style="width:36px;height:36px;border-radius:10px;display:grid;place-items:center">${ic(h.icon || 'coin', 17)}</span><div class="grow"><div class="t">${h.t}</div><div class="d">${h.d}</div></div><span class="v ${h.v > 0 ? 'plus' : 'minus'}">${h.v > 0 ? '+' : ''}${fnum(h.v)}</span></div>`).join('')}</div>`;
  return {
    theme: 'dark', title: 'Thành viên KITAWA',
    body: `
    <div class="navyband"></div>
    <div class="tcard">
      <button class="qrb" data-act="memberQR" aria-label="Mã thành viên">${ic('qr', 20, 2)}</button>
      <div class="k">HẠNG THÀNH VIÊN</div>
      <div class="tn">${ic('sun', 26, 2.4)} NẮNG VÀNG</div>
      <div class="nm">Nguyễn Minh Anh</div><div class="id">Mã TV: KTW-0842-1125</div>
      <div class="exp">Hạng hiệu lực đến 31/12/2027</div>
      <div class="pts"><b>${fnum(S.points)}</b><span>điểm ≈ ${fmt(S.points * 100)}</span></div>
    </div>
    <div class="sec">
      <div class="row between" style="font-size:13px"><span class="muted">Chi tiêu 12 tháng</span><b>${fmt(S.spend)} <span class="faint" style="font-weight:500">/ ${fnum(next.min)}₫</span></b></div>
      <div class="bar mt8" style="height:8px"><i style="width:${pct}%"></i></div>
      <div style="font-size:12.5px;margin-top:8px">Còn <b style="color:var(--gold-deep)">${fmt(next.min - S.spend)}</b> để lên hạng <b>Mặt Trời</b></div>
      <div class="road mt16">${TIERS.map((t, i) => `<div class="${i === cur ? 'cur' : i > cur ? 'lock' : ''}"><i>${ic(t.icon, 19, 2.2)}</i><b>${t.name}</b><span>${t.label}</span></div>`).join('')}</div>
    </div>
    <div class="sec">${sh('Kiếm thêm điểm')}
      ${TASKS.map(t => { const done = S.tasksDone.includes(t.id); return `<div class="task"><span class="ico gold" style="display:grid;place-items:center">${ic(t.icon, 18)}</span><div class="grow"><div class="t">${t.t}</div><div class="p">+${t.p} điểm</div></div>
        ${done ? `<span class="done">${ic('checkc', 16, 2.2)} Đã xong</span>` : `<button class="btn btn-line btn-xs" data-act="task" data-id="${t.id}">${t.id === 'ck' ? 'Điểm danh' : 'Làm ngay'}</button>`}</div>`; }).join('')}
    </div>
    <div style="margin:14px 16px 0"><div class="seg">${[['ben', 'Quyền lợi'], ['gift', 'Đổi điểm'], ['his', 'Lịch sử']].map(([k, n]) => `<button class="${S.memberTab === k ? 'on' : ''}" data-act="memberTab" data-k="${k}">${n}</button>`).join('')}</div></div>
    ${tab}
    <p class="rule" style="text-align:center">Mỗi 10.000₫ chi tiêu = 1 điểm (nhân hệ số theo hạng)<br>1 điểm = 100₫ khi thanh toán</p>
    <div class="spacer"></div>`,
  };
};
Object.assign(ACT, {
  memberTab: el => { S.memberTab = el.dataset.k; rerender(); },
  memberQR: () => openSheet(() => `<div style="text-align:center"><h3>Mã thành viên</h3><p class="sub">Đưa mã cho nhân viên showroom / đại lý để tích điểm</p><div style="display:inline-block;padding:12px;border-radius:16px;border:1px solid var(--line)">${fakeQR(200, 31)}</div><div class="mt12" style="font-family:ui-monospace,Consolas,monospace;font-weight:700;letter-spacing:.06em">KTW-0842-1125</div><button class="btn btn-gold btn-block mt16" data-act="sheetClose">Đóng</button></div>`),
  task: el => {
    const t = TASKS.find(x => x.id === el.dataset.id);
    if (t.go) { go(t.go); return; }
    if (t.id === 'rv') { toast('Mở màn đánh giá sản phẩm (mô phỏng)'); return; }
    S.points += t.p; S.tasksDone.push(t.id);
    S.history.unshift({ t: t.t, d: '20/11/2026', v: t.p, icon: t.icon });
    rerender(); toast(`+${t.p} điểm · ${t.t}`);
  },
  redeem: el => {
    const r = REWARDS.find(x => x.id === el.dataset.id);
    openSheet(() => `<div style="text-align:center"><div class="okc" style="width:64px;height:64px;background:var(--gold);color:var(--navy-ink);box-shadow:0 0 0 8px var(--gold-soft);animation:none">${ic('gift', 30, 2)}</div><h3>Đổi ${fnum(r.p)} điểm?</h3><p class="sub">Nhận <b>${r.t}</b>. Số điểm còn lại: ${fnum(S.points - r.p)} điểm</p></div>
      <div class="row"><button class="btn btn-ghost grow" data-act="sheetClose">Hủy</button><button class="btn btn-gold grow" data-act="redeemOk" data-id="${r.id}">Xác nhận đổi</button></div>`);
  },
  redeemOk: el => {
    const r = REWARDS.find(x => x.id === el.dataset.id);
    S.points -= r.p; S.history.unshift({ t: 'Đổi ' + r.t, d: '20/11/2026', v: -r.p, icon: 'gift' });
    if (VOUCHERS[r.id] && !S.owned.includes(r.id)) S.owned.push(r.id);
    closeSheet(); rerender(); toast(VOUCHERS[r.id] ? 'Đã thêm voucher vào Ví voucher' : 'Đổi quà thành công – KITAWA sẽ gửi quà kèm đơn tiếp theo');
  },
});

/* ======================= CỘNG TÁC VIÊN ======================= */
SCREENS.ctv = () => {
  const max = Math.max(...CTV_CHART.map(x => x.v));
  const stl = { wait: ['Chờ duyệt', 'gift'], ok: ['Đã duyệt', 'bh'], cancel: ['Đã hủy', 'gray'] };
  return {
    theme: 'dark', title: 'Cộng tác viên',
    body: `
    <div class="navyband"></div>
    <div class="wallet">
      <div class="row between"><span class="k">Hoa hồng khả dụng</span><span class="chip gold">${ic('award', 11, 2.2)} CTV Bạc · 8%</span></div>
      <div class="row between" style="margin-top:2px"><span class="v">${fmt(S.ctv.avail)}</span><button class="btn btn-gold btn-sm" data-act="withdraw" ${S.ctv.avail ? '' : 'disabled'}>${ic('wallet', 16)} Rút tiền</button></div>
      <div class="rowb"><div>Chờ duyệt<b>${fmt(S.ctv.wait)}</b></div><div>Đã rút<b>${fmt(S.ctv.out)}</b></div></div>
    </div>
    <div class="sec">
      <div class="sh"><h3>Hiệu quả</h3><button class="pill" style="height:30px" data-act="soon" data-t="Chọn kỳ thống kê">Tháng 11/2026 ${ic('down', 14, 2.2)}</button></div>
      <div class="stats">
        <div class="stat"><div class="k">Lượt click</div><div class="v">1.248</div><div class="d">${ic('trend', 12, 2.4)} 18% so với T10</div></div>
        <div class="stat"><div class="k">Đơn thành công</div><div class="v">18</div><div class="d">${ic('trend', 12, 2.4)} 5 đơn</div></div>
        <div class="stat"><div class="k">Doanh số</div><div class="v">32.450.000₫</div><div class="d">${ic('trend', 12, 2.4)} 12%</div></div>
        <div class="stat"><div class="k">Tỷ lệ chuyển đổi</div><div class="v">1,4%</div><div class="d">${ic('trend', 12, 2.4)} 0,2 điểm</div></div>
      </div>
      <div class="divider"></div>
      <div style="font-size:13px;font-weight:700">Hoa hồng 7 ngày gần nhất <span class="faint" style="font-weight:500">(nghìn ₫)</span></div>
      <div class="chart">${CTV_CHART.map((x, i) => `<div class="${i === CTV_CHART.length - 1 ? 'on' : ''}"><i style="height:${Math.max(3, Math.round(x.v / max * 92))}%"><em>${x.v}</em></i><span>${x.d}</span></div>`).join('')}</div>
    </div>
    <div class="sec">${sh('Link giới thiệu của bạn')}
      <div class="reflink"><span>kitawa.vn/r/MINHANH</span><button class="btn btn-navy btn-xs" data-act="copyLink">${ic('copy', 14)} Sao chép</button></div>
      <div class="row mt12"><button class="btn btn-zalo grow" style="height:42px;font-size:14px" data-act="share">${ic('share', 17)} Chia sẻ qua Zalo</button><button class="btn btn-ghost grow" style="height:42px;font-size:14px" data-act="refQR">${ic('qr', 17)} Tải mã QR</button></div>
      <div class="faint mt8" style="font-size:12px;text-align:center">Mã giới thiệu: <b style="color:var(--navy)">MINHANH</b> · Cookie ghi nhận 30 ngày</div>
    </div>
    <div class="sec">${sh('Sản phẩm hoa hồng cao', 'Xem thêm', 'data-tab="products"')}
      ${['bcdt61000', 'bdp27600', 'bc10800', 'bc10600'].map(getP).map(p => `<div class="cprod"><img src="${IMG + p.img}" alt="" data-go="product" data-id="${p.id}"><div class="grow"><div class="n">${p.short}</div><div class="p">${fmt(p.price)} <span class="chip bh" style="margin-left:4px">Hoa hồng ~${fmt(comm(p.price))}</span></div></div><button class="btn btn-line btn-xs" data-act="share">${ic('share', 13)} Chia sẻ</button></div>`).join('')}
    </div>
    <div class="sec">${sh('Đơn hàng giới thiệu', 'Tất cả', 'data-act="soon" data-t="Danh sách đơn giới thiệu"')}
      ${CTV_ORDERS.map(o => `<div class="cord"><div class="grow"><div class="n">${o.id} · ${o.who}</div><div class="s">${o.d} · Giá trị ${fmt(o.v)}</div></div><div><div class="c" style="${o.st === 'cancel' ? 'color:var(--faint);text-decoration:line-through' : ''}">+${fmt(o.c)}</div><div style="text-align:right;margin-top:3px"><span class="chip ${stl[o.st][1]}">${stl[o.st][0]}</span></div></div></div>`).join('')}
    </div>
    <div class="sec">${sh('Cấp độ cộng tác viên')}
      <div class="ladder"><div><b>Đồng</b><span>5%</span><small>Mặc định</small></div><div class="cur"><b>Bạc</b><span>8%</span><small>Hiện tại</small></div><div><b>Vàng</b><span>10%</span><small>DS 50 triệu/tháng</small></div></div>
      <div class="bar mt12"><i style="width:65%"></i></div>
      <div style="font-size:12.5px;margin-top:6px">Còn <b style="color:var(--gold-deep)">17.550.000₫</b> doanh số để lên CTV Vàng</div>
    </div>
    <div class="dealer"><img src="${IMG}prj-1.jpg" alt=""><div><b style="font-size:15px">Muốn nhập sỉ số lượng lớn?</b><div style="font-size:12.5px;color:#C7D0E6;margin:3px 0 10px">Đăng ký làm Đại lý KITAWA – giá sỉ tốt, chiết khấu hấp dẫn</div><button class="btn btn-gold btn-sm" data-act="dealer">Đăng ký đại lý · 0943 899 539</button></div></div>
    <p class="rule">Mức hoa hồng, cấp độ CTV và điều kiện rút tiền trong prototype là đề xuất – cần KITAWA xác nhận.</p>
    <div class="spacer"></div>`,
  };
};
Object.assign(ACT, {
  copyLink: () => { try { navigator.clipboard.writeText('https://kitawa.vn/r/MINHANH'); } catch (e) {} toast('Đã sao chép link giới thiệu'); },
  refQR: () => openSheet(() => `<div style="text-align:center"><h3>Mã QR giới thiệu</h3><p class="sub">Khách quét mã để mua hàng – bạn nhận hoa hồng</p><div style="display:inline-block;padding:12px;border-radius:16px;background:linear-gradient(135deg,#173777,#0A1E4A)"><div style="background:#fff;padding:10px;border-radius:10px">${fakeQR(180, 41)}</div><div style="color:var(--gold);font-weight:800;margin-top:8px;letter-spacing:.1em">MINHANH</div></div><button class="btn btn-gold btn-block mt16" data-act="sheetClose">${ic('download', 18)} Lưu ảnh</button></div>`),
  withdraw: () => openSheet(() => `<h3>Rút hoa hồng</h3><p class="sub">Tiền về tài khoản trong 1 – 2 ngày làm việc</p>
    <div class="fld"><label>Số tiền rút</label><input class="inp" value="${fnum(S.ctv.avail)}" style="font-weight:800;font-size:18px"><div class="faint" style="font-size:12px;margin-top:4px">Khả dụng ${fmt(S.ctv.avail)} · Tối thiểu 200.000₫</div></div>
    <div class="fld"><label>Tài khoản nhận</label><div class="pay" style="border:1px solid var(--line);border-radius:10px;padding:10px 12px"><span class="pi ico navy">${ic('bank', 19)}</span><div class="grow"><b style="font-size:14px">Vietcombank •••• 6789</b><div class="faint" style="font-size:12px">NGUYEN MINH ANH</div></div>${ic('right', 16)}</div></div>
    <div class="note">${ic('info', 18)}<div>Hoa hồng được khấu trừ thuế TNCN theo quy định khi vượt ngưỡng.</div></div>
    <button class="btn btn-gold btn-block mt16" data-act="withdrawOk">Xác nhận rút ${fmt(S.ctv.avail)}</button>`),
  withdrawOk: () => { S.ctv.out += S.ctv.avail; S.ctv.avail = 0; closeSheet(); rerender(); toast('Đã gửi lệnh rút tiền – tiền về trong 1 – 2 ngày làm việc'); },
});

/* ======================= VÍ VOUCHER ======================= */
const VF = { all: 'Tất cả', ship: 'Freeship', disc: 'Giảm giá', tier: 'Hạng thành viên', prj: 'Dự án' };
function ticket(v, mode = 'ok') {
  const ok = mode === 'ok';
  return `<div class="tk ${ok ? '' : 'dim'}">
    <div class="stub ${ok ? v.type : 'gray'}"><span class="si">${ic(v.icon, 18, 2)}</span>${v.stub}</div>
    <div class="body"><div class="t">${v.title}</div><div class="c">${v.cond}</div>${v.code || (v.soon && ok) ? `<div class="row" style="gap:6px;margin-top:1px">${v.code ? `<span class="code">Mã: ${v.code}</span>` : ''}${v.soon && ok ? '<span class="chip redsoft" style="height:18px;font-size:10px">Sắp hết hạn</span>' : ''}</div>` : ''}
      ${v.used && ok ? `<div class="use"><div class="bar red"><i style="width:${v.used}%"></i></div>Đã dùng ${v.used}%</div>` : ''}
      <div class="ft"><span class="e">${ok ? 'HSD: ' + v.exp : v.exp}${ok ? `<a data-act="vCond" data-id="${v.id}">Điều kiện ›</a>` : ''}</span>${ok ? `<button class="btn btn-gold btn-xs" data-act="vUse" data-id="${v.id}">Dùng ngay</button>` : ''}</div>
    </div>
    ${mode === 'used' ? '<span class="stamp">ĐÃ DÙNG</span>' : mode === 'exp' ? '<span class="stamp">HẾT HẠN</span>' : ''}
  </div>`;
}
SCREENS.voucher = () => {
  const owned = S.owned.map(id => VOUCHERS[id]).filter(v => S.vFilter === 'all' || v.tag === S.vFilter);
  const promo = ['BF200', 'BFPHA'];
  let list;
  if (S.vTab === 'ok') list = owned.length ? owned.map(v => ticket(v)).join('') : `<div class="empty"><div class="sun">${ic('ticket', 36)}</div><h4>Chưa có voucher</h4><p>Lưu voucher từ kho Black Friday hoặc đổi điểm để nhận thêm.</p></div>`;
  else if (S.vTab === 'used') list = VOUCHER_USED.map(v => ticket(v, 'used')).join('');
  else list = VOUCHER_EXPIRED.map(v => ticket(v, 'exp')).join('');
  return {
    theme: 'light', title: 'Ví voucher',
    body: `
    <div style="background:#fff;padding:12px 16px 14px"><div class="inp-wrap"><input class="inp" id="vcode" placeholder="Nhập mã voucher" style="text-transform:uppercase"><button class="btn btn-navy btn-sm inbtn" data-act="vCode">Áp dụng</button></div><div class="faint" style="font-size:11.5px;margin-top:6px">Thử mã mẫu: <b style="color:var(--navy2);cursor:pointer" data-act="vTry">KITAWA50</b></div></div>
    <div class="vpromo"><div class="t">Kho voucher <em>Black Friday</em></div><div class="s">Lưu ngay kẻo hết · 20/11 – 30/11</div>
      <div class="hs">${promo.map(id => { const v = VOUCHERS[id], has = S.owned.includes(id); return `<div class="vmini"><span class="stub ${v.type}" style="width:38px;height:38px;border-radius:10px;display:grid;place-items:center;flex:none">${ic(v.icon, 18)}</span><div class="b"><b>${v.title}</b><span>${v.cond}</span></div><button class="btn ${has ? 'btn-ghost' : 'btn-red'} btn-xs" style="padding:0 10px" data-act="vSave" data-id="${id}" ${has ? 'disabled' : ''}>${has ? 'Đã lưu' : 'Lưu'}</button></div>`; }).join('')}</div></div>
    <div style="margin:14px 16px 0"><div class="seg">${[['ok', `Có thể dùng (${S.owned.length})`], ['used', 'Đã dùng'], ['exp', 'Hết hạn']].map(([k, n]) => `<button class="${S.vTab === k ? 'on' : ''}" data-act="vTab" data-k="${k}">${n}</button>`).join('')}</div></div>
    ${S.vTab === 'ok' ? `<div class="hs" style="padding:12px 16px 4px;gap:6px">${Object.entries(VF).map(([k, n]) => `<button class="pill ${S.vFilter === k ? 'on' : ''}" style="height:30px;font-size:12px" data-act="vFilter" data-k="${k}">${n}</button>`).join('')}</div>` : ''}
    <div style="padding-top:12px">${list}</div>
    <p class="rule" style="margin-top:0">Mỗi đơn hàng áp dụng 1 voucher giảm giá và có thể dùng kèm điểm thưởng. Voucher flash sale không áp dụng cùng voucher giảm theo %.</p>
    <div class="spacer"></div>`,
  };
};
Object.assign(ACT, {
  vTab: el => { S.vTab = el.dataset.k; rerender(); },
  vFilter: el => { S.vFilter = el.dataset.k; rerender(); },
  vSave: el => { const id = el.dataset.id; if (!S.owned.includes(id)) S.owned.push(id); S.vTab = 'ok'; rerender(); toast('Đã lưu voucher vào ví'); },
  vTry: () => { const i = $('#vcode'); if (i) i.value = 'KITAWA50'; },
  vCode: () => { const v = ($('#vcode').value || '').trim().toUpperCase(); if (addCode(v)) { S.vTab = 'ok'; S.vFilter = 'all'; rerender(); } },
  vUse: el => { S.voucher = el.dataset.id; if (!S.cart.length) S.cart = initState().cart; go('cart'); toast('Đã chọn voucher cho giỏ hàng'); },
  vCond: el => {
    const v = VOUCHERS[el.dataset.id];
    openSheet(() => `<div style="margin:-6px -16px 14px">${ticket(v).replace('class="tk ', 'class="tk " style="box-shadow:none;margin:0 16px" data-x="')}</div>
      <h3>Điều kiện sử dụng</h3>
      <div class="sumrow"><span class="k">Hạn sử dụng</span><span>${v.exp}</span></div>
      <div class="sumrow"><span class="k">Điều kiện đơn</span><span style="text-align:right;max-width:60%">${v.cond}</span></div>
      <div class="sumrow"><span class="k">Sản phẩm áp dụng</span><span>${v.id === 'TIER' ? 'Đèn công trình' : v.id === 'BFPHA' ? 'Đèn pha, pha chống chói' : 'Tất cả sản phẩm'}</span></div>
      <div class="sumrow"><span class="k">Số lần dùng</span><span>1 lần / khách</span></div>
      <div class="sumrow"><span class="k">Kênh áp dụng</span><span>Mini App KITAWA</span></div>
      <button class="btn btn-gold btn-block mt16" data-act="vUse" data-id="${v.id}">Dùng ngay</button>`);
  },
});

/* ======================= TÀI KHOẢN ======================= */
SCREENS.profile = () => {
  const orders = [['clock', 'Chờ xác nhận', S.lastOrder ? 1 : 0], ['package', 'Chờ lấy hàng', 0], ['truck', 'Đang giao', 1], ['checkc', 'Đã giao', 0], ['refresh', 'Đổi trả', 0]];
  const util = [['shield', 'Bảo hành của tôi', 'green', 'data-tab="warranty"'], ['search', 'Tra cứu bảo hành', 'green', 'data-act="lookupSheet"'], ['book', 'Hướng dẫn lắp đặt', 'gold', 'data-act="soon" data-t="Hướng dẫn lắp đặt"'], ['file', 'Báo giá dự án', 'navy', 'data-go="quote"'],
    ['eye', 'Đã xem gần đây', 'navy', 'data-act="soon" data-t="Sản phẩm đã xem"'], ['heart', 'Yêu thích', 'red', 'data-act="soon" data-t="Danh sách yêu thích"'], ['pin', 'Sổ địa chỉ', 'navy', 'data-act="soon" data-t="Sổ địa chỉ"'], ['star', 'Đánh giá của tôi', 'gold', 'data-act="soon" data-t="Đánh giá của tôi"']];
  return {
    theme: 'dark', tab: 'profile', title: '',
    headRight: `<button class="hbtn" data-act="soon" data-t="Cài đặt" aria-label="Cài đặt">${ic('settings', 21)}</button>`,
    body: `
    <section class="phero"><div class="prof"><span class="av">MA</span><div><div class="n">Nguyễn Minh Anh</div><div class="p">0987 *** 214 · Thành viên từ 03/2025</div><button class="tierpill" data-go="member">${ic('sun', 13, 2.4)} Nắng Vàng ${ic('right', 12, 2.6)}</button></div></div></section>
    <div class="pstats"><button data-go="member"><b>${fnum(S.points)}</b><span>Điểm</span></button><button data-go="voucher"><b>${S.owned.length}</b><span>Voucher</span></button><button data-tab="warranty"><b>${S.warranties.filter(w => w.st !== 'none').length}</b><span>Sản phẩm BH</span></button></div>
    <div class="sec">${sh('Đơn hàng của tôi', 'Xem tất cả', 'data-act="soon" data-t="Danh sách đơn hàng"')}
      <div class="ostat">${orders.map(([i, n, b]) => `<button data-act="soon" data-t="${n}">${ic(i, 24)}${n}${b ? `<span class="bdg">${b}</span>` : ''}</button>`).join('')}</div></div>
    <div class="ctvban" data-go="ctv"><span style="width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,.14);display:grid;place-items:center;flex:none">${ic('users', 22)}</span><div class="grow"><div class="t">Cộng tác viên KITAWA</div><div class="s">Giới thiệu bạn bè – nhận hoa hồng đến 10%</div></div>${ic('right', 18, 2.2)}</div>
    <div class="sec">${sh('Tiện ích')}<div class="util">${util.map(([i, n, c, a]) => `<button ${a}><span class="ico ${c}">${ic(i, 21)}</span>${n}</button>`).join('')}</div></div>
    <div class="sec">${sh('Hỗ trợ khách hàng')}
      ${HOTLINES.map(h => `<div class="lrow"><span class="ico ${h.c}">${ic(h.icon, 18)}</span><div class="grow"><div class="t">${h.k}</div><div class="s"><b style="color:var(--navy);font-size:13px">${h.v}</b> · ${h.s}</div></div><button class="btn btn-ghost btn-xs" data-act="call" data-n="${h.v}">${ic('phone', 13)} Gọi</button></div>`).join('')}
      <div class="lrow" style="cursor:pointer" data-act="zalo"><span class="ico blue">${ic('chat', 18)}</span><div class="grow"><div class="t">Chat với KITAWA qua Zalo OA</div><div class="s">Phản hồi trong giờ làm việc</div></div>${ic('right', 16)}</div>
    </div>
    <div class="sec">${sh('Hệ thống showroom')}
      ${STORES.map(s => `<div class="lrow"><span class="ico navy">${ic('store', 18)}</span><div class="grow"><div class="t">${s.n}</div><div class="s">${s.a}</div></div><button class="btn btn-ghost btn-xs" data-act="soon" data-t="Chỉ đường">${ic('nav', 13)}</button></div>`).join('')}
    </div>
    <div class="sec menu" style="padding-top:4px;padding-bottom:4px">
      ${[['shield', 'Chính sách bảo hành', 'data-act="policy"'], ['refresh', 'Chính sách đổi trả', 'data-act="soon" data-t="Chính sách đổi trả"'], ['truck', 'Chính sách vận chuyển', 'data-act="soon" data-t="Chính sách vận chuyển"'], ['doc', 'Điều khoản sử dụng', 'data-act="soon" data-t="Điều khoản sử dụng"']].map(([i, n, a]) => `<div class="lrow" ${a}><span style="color:var(--muted)">${ic(i, 19)}</span><div class="grow t" style="font-weight:500">${n}</div>${ic('right', 16)}</div>`).join('')}
    </div>
    <div class="ver">KITAWA Mini App · Phiên bản 1.0.0 (prototype)</div>
    <div class="spacer"></div>`,
  };
};

/* ======================= BÁO GIÁ DỰ ÁN ======================= */
SCREENS.quote = () => {
  const types = [['duong', 'Đường phố – Nông thôn mới', 'lb-1.jpg'], ['kcn', 'Khu đô thị – Khu công nghiệp', 'lb-2.jpg'], ['xuong', 'Nhà xưởng – Công trình', 'lb-3.jpg'], ['khac', 'Khác', null]];
  return {
    theme: 'dark', title: 'Báo giá dự án',
    body: `
    <section class="qhero"><img src="${IMG}prj-2.jpg" alt=""><span class="chip gold lg" style="align-self:flex-start;margin-bottom:8px">${ic('ruler', 13, 2.2)} Thiết kế chiếu sáng miễn phí</span><h2>Giải pháp chiếu sáng<br>công trình</h2><p>230+ dự án tại 34 tỉnh thành · Sản xuất trực tiếp</p></section>
    <div class="sec"><div class="proc">${[['search', 'Khảo sát'], ['file', 'Đề xuất & báo giá'], ['truck', 'Giao hàng, lắp đặt'], ['shield', 'Bảo hành 36 tháng']].map(([i, n]) => `<div><i>${ic(i, 19)}</i>${n}</div>`).join('')}</div></div>
    <div class="sec">${sh('Loại công trình')}<div class="ptype">${types.map(([k, n, img]) => `<button class="${S.quoteType === k ? 'on' : ''}" data-act="qType" data-k="${k}">${img ? `<img src="${IMG + img}" alt="">` : `<div class="other">${ic('building', 30)}</div>`}<span>${n}</span></button>`).join('')}</div></div>
    <div class="sec">
      <div class="fld"><label>Tên công trình</label><input class="inp" placeholder="VD: Đường liên xã An Phú – Tân Thạnh"></div>
      <div class="row" style="gap:10px"><div class="fld grow"><label>Tỉnh / Thành</label><select class="inp"><option>Long An</option><option>TP. Hồ Chí Minh</option><option>Đồng Nai</option><option>Bình Dương</option><option>Khác</option></select></div>
        <div class="fld" style="width:150px"><label>Số lượng đèn</label><div class="stepq"><button data-act="qQty" data-d="-5">${ic('minus', 16, 2.4)}</button><input value="${S.quoteQty}" readonly><button data-act="qQty" data-d="5">${ic('plus', 16, 2.4)}</button></div></div></div>
      <div class="fld"><label>Công suất mong muốn</label><div class="row" style="flex-wrap:wrap;gap:8px">${[200, 300, 400, 500, 600, 800, 1000].map(w => `<button class="pill ${S.quoteW.includes(w) ? 'on' : ''}" data-act="qW" data-w="${w}">${w}W</button>`).join('')}<button class="pill" data-act="klInfo">${ic('info', 14)} Chưa rõ</button></div></div>
      <div class="row" style="gap:10px"><div class="fld grow"><label>Ngân sách dự kiến</label><select class="inp"><option>Dưới 50 triệu</option><option selected>50 – 200 triệu</option><option>200 – 500 triệu</option><option>Trên 500 triệu</option></select></div>
        <div class="fld grow"><label>Thời gian triển khai</label><select class="inp"><option>Trong tháng này</option><option selected>1 – 3 tháng</option><option>Trên 3 tháng</option></select></div></div>
      <div class="fld"><label>Bản vẽ / hình ảnh hiện trạng</label><div class="upl" data-act="soon" data-t="Tải tệp lên">${ic('download', 22)}<div>Tải lên bản vẽ, ảnh hiện trạng<div class="faint" style="font-size:11.5px;font-weight:500">PDF, JPG, PNG · tối đa 20MB</div></div></div></div>
      <div class="row" style="gap:10px"><div class="fld grow"><label>Người liên hệ</label><input class="inp" value="Nguyễn Minh Anh"></div><div class="fld grow"><label>Số điện thoại</label><input class="inp" value="0987 654 214" inputmode="tel"></div></div>
    </div>
    <div class="sec"><div class="row"><span class="ico navy" style="width:40px;height:40px;border-radius:12px;display:grid;place-items:center">${ic('building', 20)}</span><div class="grow"><b style="font-size:14px">Hotline dự án, công trình</b><div class="muted" style="font-size:12.5px">0947 397 983</div></div><button class="btn btn-ghost btn-xs" data-act="call" data-n="0947 397 983">${ic('phone', 13)} Gọi ngay</button></div></div>
    <div class="spacer"></div>`,
    foot: `<button class="btn btn-gold btn-block" data-act="qSend">${ic('file', 19)} Gửi yêu cầu báo giá</button>`,
  };
};
Object.assign(ACT, {
  qType: el => { S.quoteType = el.dataset.k; rerender(); },
  qQty: el => { S.quoteQty = Math.max(5, S.quoteQty + +el.dataset.d); rerender(); },
  qW: el => { toggleIn(S.quoteW, +el.dataset.w); rerender(); },
  qSend: () => openSheet(() => `<div style="text-align:center;padding-top:6px"><div class="okc" style="width:68px;height:68px">${ic('check', 36, 3)}</div><h3>Đã gửi yêu cầu báo giá!</h3><p class="sub" style="line-height:1.5">Mã yêu cầu <b>#DA2611-017</b><br>Chuyên viên dự án KITAWA sẽ liên hệ lại với bạn qua số 0987 654 214 để khảo sát và báo giá.</p></div>
    <div class="row"><button class="btn btn-ghost grow" data-act="call" data-n="0947 397 983">Gọi hotline dự án</button><button class="btn btn-gold grow" data-act="goTab" data-r="home">Về trang chủ</button></div>`),
});
