/* =========================================================
   DỮ LIỆU MẪU
   - Tên, mã, giá các sản phẩm BC10600, BC10800, BCDT61000, BC1200,
     DP15.100, BDP27.300 lấy từ kitawa.vn ngày 20/11/2026 (giá Black Friday).
   - Các giá còn lại, điểm thưởng, hạng, CTV, voucher, flash sale: DỮ LIỆU ĐỀ XUẤT.
   ========================================================= */
const IMG = 'img/';

const CATS = [
  { id: 'den-duong',  name: 'Đèn đường',        n: 47, img: 'c-1.png' },
  { id: 'lien-the',   name: 'Đèn liền thể',     n: 45, img: 'c-2.png' },
  { id: 'den-pha',    name: 'Đèn pha',          n: 55, img: 'c-3.png' },
  { id: 'chong-choi', name: 'Pha chống chói',   n: 23, img: 'c-4.png' },
  { id: 'ufo',        name: 'UFO đĩa bay',      n: 16, img: 'c-5.png' },
  { id: 'cong-trinh', name: 'Đèn công trình',   n: 39, img: 'c-6.png' },
  { id: 'san-vuon',   name: 'Đèn sân vườn',     n: 23, img: 'c-7.png' },
  { id: 'tru-cong',   name: 'Đèn trụ cổng',     n: 16, img: 'c-8.png' },
  { id: 'trong-nha',  name: 'Đèn trong nhà',    n: 15, img: 'c-9.png' },
  { id: 'cam-tay',    name: 'Đèn cầm tay',      n: 6,  img: 'c-10.png' },
  { id: 'tru-den',    name: 'Trụ đèn',          n: 7,  img: 'c-11.png' },
  { id: 'mini',       name: 'Đèn mini',         n: 7,  img: 'c-12.png' },
  { id: 'quat',       name: 'Quạt năng lượng',  n: 16, img: 'c-13.png' },
  { id: 'led-ac',     name: 'LED điện AC 220V', n: 61, img: 'c-14.png' },
  { id: 'phu-kien',   name: 'Phụ kiện, giá đỡ', n: 13, img: 'c-15.png' },
];
const getCat = id => CATS.find(c => c.id === id);

const USES = {
  'duong':   { name: 'Đường làng, ngõ hẻm', icon: 'road',    cats: ['den-duong', 'lien-the', 'cong-trinh'] },
  'san-nha': { name: 'Sân nhà, cổng',       icon: 'home2',   cats: ['tru-cong', 'san-vuon', 'lien-the', 'mini', 'den-pha'] },
  'xuong':   { name: 'Nhà xưởng',           icon: 'factory', cats: ['den-pha', 'chong-choi', 'cong-trinh'] },
  'vuon':    { name: 'Sân vườn',            icon: 'tree',    cats: ['san-vuon', 'ufo', 'mini'] },
  'trong':   { name: 'Trong nhà',           icon: 'bulb',    cats: ['trong-nha', 'quat', 'led-ac', 'cam-tay'] },
};

const PRODUCTS = [
  { id: 'bc10600', short: 'Đèn Đường 600W BC10600', name: 'Đèn Đường Năng Lượng Mặt Trời 600W Siêu Sáng BC10600', cat: 'den-duong', kl: 600, price: 1403000, old: 3860000, img: 'p-bc10600.png', rating: 5.0, reviews: 10, sold: 1200, gift: true, video: true, ip: 'IP67', remote: true },
  { id: 'bc10800', short: 'Đèn Đường 800W BC10800', name: 'Đèn Đường Năng Lượng Mặt Trời 800W Siêu Sáng BC10800', cat: 'den-duong', kl: 800, price: 1776000, old: 4880000, img: 'p-bc10800.jpg', rating: 5.0, reviews: 8, sold: 860, gift: true, ip: 'IP67', remote: true },
  { id: 'bcdt61000', short: 'Đèn Đường Công Trình 1000W BCDT61000', name: 'Đèn Đường Công Trình Năng Lượng Mặt Trời 1000W Cao Cấp BCDT61000', cat: 'cong-trinh', kl: 1000, price: 2798000, old: 4630000, img: 'p-bcdt61000.png', rating: 4.9, reviews: 15, sold: 540, video: true, ip: 'IP66', remote: true },
  { id: 'bc1200', short: 'Đèn Bàn Chải 200W BC1200', name: 'Đèn Bàn Chải Năng Lượng Mặt Trời 200W KITAWA BC1200', cat: 'den-duong', kl: 200, price: 1439000, old: 2390000, img: 'p-bc1200.png', rating: 4.9, reviews: 22, sold: 2100, ip: 'IP66', remote: true },
  { id: 'dp15100', short: 'Đèn Pha Chống Chói 100W DP15.100', name: 'Đèn Pha Chống Chói Năng Lượng Mặt Trời 100W KITAWA DP15.100', cat: 'chong-choi', kl: 100, price: 860000, old: 1580000, img: 'p-dp15100.png', rating: 5.0, reviews: 12, sold: 1500, gift: true, vat: true, ip: 'IP67', remote: true },
  { id: 'dp15200', short: 'Đèn Pha Chống Chói 200W DP15.200', name: 'Đèn Pha Chống Chói Năng Lượng Mặt Trời 200W KITAWA DP15.200', cat: 'chong-choi', kl: 200, price: 1190000, old: 2150000, img: 'p-dp15200.png', rating: 4.8, reviews: 9, sold: 780, vat: true, ip: 'IP67', remote: true },
  { id: 'bdp27300', short: 'Đèn Pha 300W BDP27.300', name: 'Đèn Pha Năng Lượng Mặt Trời 300W Chip 5050 Chống Nước IP66 BDP27.300', cat: 'den-pha', kl: 300, price: 1590000, old: 2650000, img: 'p-bdp27300.png', rating: 4.9, reviews: 18, sold: 1300, ip: 'IP66', remote: true },
  { id: 'bdp27600', short: 'Đèn Pha 600W BDP27.600', name: 'Đèn Pha Năng Lượng Mặt Trời 600W Chống Nước IP67 BDP27.600', cat: 'den-pha', kl: 600, price: 2350000, old: 3900000, img: 'p-bdp27600.png', rating: 4.9, reviews: 11, sold: 620, video: true, ip: 'IP67', remote: true },
  { id: 'wpn01500', short: 'Đèn Pha 500W WPN01.500', name: 'Đèn Pha Năng Lượng Mặt Trời 500W KITAWA WPN01.500', cat: 'den-pha', kl: 500, price: 1890000, old: 3150000, img: 'p-wpn01500.jpg', rating: 4.8, reviews: 7, sold: 410, gift: true, ip: 'IP66', remote: true },
  { id: 'bd300', short: 'Đèn Đường KL-300W', name: 'Đèn Đường Năng Lượng Mặt Trời KL-300W Tấm Pin Rời', cat: 'den-duong', kl: 300, price: 1150000, old: 1980000, img: 'c-1.png', rating: 4.8, reviews: 14, sold: 980, ip: 'IP65', remote: true },
  { id: 'lt120', short: 'Đèn Liền Thể KL-120W', name: 'Đèn Liền Thể Năng Lượng Mặt Trời KL-120W', cat: 'lien-the', kl: 120, price: 450000, old: 890000, img: 'c-2.png', rating: 4.8, reviews: 40, sold: 3200, ip: 'IP65', remote: true },
  { id: 'ufo50', short: 'Đèn UFO Đĩa Bay 50W', name: 'Đèn UFO Đĩa Bay Năng Lượng Mặt Trời 50W', cat: 'ufo', kl: 50, price: 1250000, old: 2100000, img: 'c-5.png', rating: 4.7, reviews: 6, sold: 210, ip: 'IP65' },
  { id: 'ct80', short: 'Đèn Công Trình KL-80W', name: 'Đèn Công Trình Năng Lượng Mặt Trời KL-80W', cat: 'cong-trinh', kl: 80, price: 990000, old: 1690000, img: 'c-6.png', rating: 4.8, reviews: 9, sold: 330, ip: 'IP66' },
  { id: 'sv01', short: 'Đèn Sân Vườn Cao Cấp', name: 'Đèn Sân Vườn Năng Lượng Mặt Trời Cao Cấp', cat: 'san-vuon', price: 690000, old: 1150000, img: 'c-7.png', rating: 4.9, reviews: 25, sold: 1100, ip: 'IP65' },
  { id: 'tc01', short: 'Đèn Trụ Cổng Cổ Điển', name: 'Đèn Trụ Cổng Năng Lượng Mặt Trời Cổ Điển', cat: 'tru-cong', price: 590000, old: 990000, img: 'c-8.png', rating: 4.8, reviews: 19, sold: 870, gift: true, ip: 'IP65' },
  { id: 'tn01', short: 'Bóng Đèn Trong Nhà Năng Lượng', name: 'Bóng Đèn Trong Nhà Năng Lượng Mặt Trời Kèm Tấm Pin', cat: 'trong-nha', price: 350000, old: 590000, img: 'c-9.png', rating: 4.7, reviews: 31, sold: 1900 },
  { id: 'cam50', short: 'Đèn Cầm Tay Đa Năng 50W', name: 'Đèn Cầm Tay Đa Năng Năng Lượng Mặt Trời 50W', cat: 'cam-tay', kl: 50, price: 490000, old: 790000, img: 'c-10.png', rating: 4.8, reviews: 12, sold: 640 },
  { id: 'tru4m', short: 'Trụ Đèn 4m – Màu Đen', name: 'Trụ Đèn Thép 4m Sơn Tĩnh Điện – Màu Đen', cat: 'tru-den', price: 1890000, img: 'c-11.png', rating: 4.9, reviews: 5, sold: 260, bh: null },
  { id: 'mini3', short: 'Đèn Mini Cắm Đất 3W', name: 'Đèn Mini Cắm Đất Năng Lượng Mặt Trời 3W', cat: 'mini', kl: 3, price: 290000, old: 450000, img: 'c-12.png', rating: 4.7, reviews: 28, sold: 2400 },
  { id: 'quat20', short: 'Quạt Năng Lượng Mặt Trời 20W', name: 'Quạt Treo Tường Năng Lượng Mặt Trời 20W Kèm Tấm Pin', cat: 'quat', price: 1650000, old: 2490000, img: 'c-13.png', rating: 4.8, reviews: 16, sold: 520, bh: 12 },
  { id: 'ac50', short: 'Đèn Pha LED AC 220V 50W', name: 'Đèn Pha LED Điện AC 220V 50W KITAWA', cat: 'led-ac', price: 320000, old: 520000, img: 'c-14.png', rating: 4.8, reviews: 21, sold: 1700, ip: 'IP66' },
  { id: 'day5m', short: 'Dây Nối Dài Tấm Pin 5m', name: 'Dây Nối Dài Tấm Pin Năng Lượng 5m', cat: 'phu-kien', price: 120000, img: 'c-15.png', rating: 4.9, reviews: 44, sold: 3100, bh: null },
];
const getP = id => PRODUCTS.find(p => p.id === id);

/* Flash sale theo khung giờ (đề xuất) */
const FLASH = {
  slots: [
    { time: '09:00', label: 'Đã kết thúc', state: 'past' },
    { time: '12:00', label: 'Đang diễn ra', state: 'live' },
    { time: '20:00', label: 'Sắp diễn ra', state: 'soon' },
    { time: '09:00', label: 'Ngày mai', state: 'soon' },
  ],
  items: [
    [{ id: 'bc1200', price: 1290000, sold: 40, total: 40 }, { id: 'lt120', price: 399000, sold: 100, total: 100 }, { id: 'bdp27300', price: 1450000, sold: 28, total: 30 }],
    [{ id: 'bc10600', price: 1403000, sold: 32, total: 50 }, { id: 'bc10800', price: 1776000, sold: 45, total: 50 }, { id: 'dp15100', price: 860000, sold: 50, total: 50 }, { id: 'bcdt61000', price: 2798000, sold: 12, total: 30 }, { id: 'bdp27300', price: 1590000, sold: 20, total: 40 }],
    [{ id: 'bdp27600', price: 2150000, total: 30 }, { id: 'wpn01500', price: 1690000, total: 30 }, { id: 'dp15200', price: 1090000, total: 40 }, { id: 'quat20', price: 1490000, total: 20 }],
    [{ id: 'sv01', price: 590000, total: 50 }, { id: 'tc01', price: 490000, total: 50 }, { id: 'ufo50', price: 1090000, total: 20 }],
  ],
};
const flashLive = id => FLASH.items[1].find(f => f.id === id);

/* Hạng thành viên (đề xuất) */
const TIERS = [
  { id: 'tia-nang',  name: 'Tia Nắng',  min: 0,        icon: 'sparkle', label: '0₫',      mult: 1 },
  { id: 'binh-minh', name: 'Bình Minh', min: 5000000,  icon: 'sunrise', label: '5 triệu', mult: 1.2 },
  { id: 'nang-vang', name: 'Nắng Vàng', min: 20000000, icon: 'sun',     label: '20 triệu', mult: 1.5 },
  { id: 'mat-troi',  name: 'Mặt Trời',  min: 50000000, icon: 'crown',   label: '50 triệu', mult: 2 },
];
const BENEFITS = [
  { icon: 'coin',     t: 'Tích điểm x1.5 mọi đơn hàng',            s: 'Mỗi 10.000₫ = 1,5 điểm' },
  { icon: 'truck',    t: 'Freeship mọi đơn, không cần tối thiểu', s: 'Áp dụng toàn quốc' },
  { icon: 'gift',     t: 'Voucher sinh nhật 300.000₫',             s: 'Tự động gửi vào ví trong tháng sinh nhật' },
  { icon: 'shield',   t: 'Ưu tiên xử lý bảo hành trong 48h',       s: 'Tiếp nhận trước, gửi linh kiện trước' },
  { icon: 'ruler',    t: 'Tư vấn thiết kế chiếu sáng miễn phí',    s: 'Kỹ sư KITAWA khảo sát và đề xuất' },
];
const BENEFITS_LOCKED = [
  { icon: 'coin',  t: 'Tích điểm x2 mọi đơn hàng' },
  { icon: 'award', t: 'Quà tặng tri ân cuối năm' },
  { icon: 'headset', t: 'Chuyên viên chăm sóc riêng' },
];
const TASKS = [
  { id: 'bh',   icon: 'shield', t: 'Kích hoạt bảo hành',      p: 50,  go: 'scan' },
  { id: 'rv',   icon: 'star',   t: 'Đánh giá sản phẩm',        p: 20 },
  { id: 'ref',  icon: 'users',  t: 'Giới thiệu bạn bè',        p: 100, go: 'ctv' },
  { id: 'oa',   icon: 'chat',   t: 'Quan tâm Zalo OA KITAWA',  p: 30 },
  { id: 'ck',   icon: 'calcheck', t: 'Điểm danh hôm nay',      p: 5 },
];
const REWARDS = [
  { id: 'R50',  t: 'Voucher 50.000₫',     p: 500,  type: 'gold',  icon: 'ticket' },
  { id: 'RFS',  t: 'Voucher Freeship',    p: 300,  type: 'green', icon: 'truck' },
  { id: 'giado', t: 'Bộ giá đỡ đèn',      p: 800,  img: 'c-15.png' },
  { id: 'mini', t: 'Đèn mini năng lượng', p: 2000, img: 'c-12.png' },
];

/* Voucher (đề xuất) */
const VOUCHERS = {
  BF10:  { id: 'BF10', type: 'red',   icon: 'zap',      stub: 'BLACK FRIDAY', title: 'Giảm 10% tối đa 300.000₫', cond: 'Đơn từ 1.500.000₫', code: 'BLACKFRIDAY', exp: '30/11/2026', used: 78, soon: true, tag: 'disc' },
  FS:    { id: 'FS',   type: 'green', icon: 'truck',    stub: 'FREESHIP',     title: 'Freeship toàn quốc',      cond: 'Đơn từ 300.000₫', exp: '31/12/2026', used: 41, tag: 'ship' },
  V100:  { id: 'V100', type: 'gold',  icon: 'sun',      stub: 'KITAWA',       title: 'Giảm 100.000₫',           cond: 'Đơn từ 2.000.000₫', exp: '31/12/2026', used: 35, tag: 'disc' },
  TIER:  { id: 'TIER', type: 'navy',  icon: 'crown',    stub: 'NẮNG VÀNG',    title: 'Ưu đãi hạng Nắng Vàng',   cond: 'Giảm 5% đèn công trình, tối đa 500.000₫', exp: '31/12/2026', tag: 'tier' },
  BDAY:  { id: 'BDAY', type: 'gold',  icon: 'gift',     stub: 'SINH NHẬT',    title: 'Quà sinh nhật 300.000₫',  cond: 'Áp dụng trong tháng sinh nhật · Đơn từ 1.000.000₫', exp: '30/11/2026', tag: 'tier' },
  PRJ:   { id: 'PRJ',  type: 'navy',  icon: 'building', stub: 'DỰ ÁN',        title: 'Dự án – Giảm 3%',          cond: 'Cho đơn từ 10 bộ đèn', exp: '31/03/2027', tag: 'prj' },
  K50:   { id: 'K50',  type: 'gold',  icon: 'ticket',   stub: 'KITAWA',       title: 'Giảm 50.000₫',             cond: 'Đơn từ 500.000₫', code: 'KITAWA50', exp: '31/12/2026', tag: 'disc' },
  R50:   { id: 'R50',  type: 'gold',  icon: 'ticket',   stub: 'ĐỔI ĐIỂM',     title: 'Giảm 50.000₫',             cond: 'Không yêu cầu đơn tối thiểu', exp: '20/02/2027', tag: 'disc' },
  RFS:   { id: 'RFS',  type: 'green', icon: 'truck',    stub: 'ĐỔI ĐIỂM',     title: 'Freeship toàn quốc',      cond: 'Không yêu cầu đơn tối thiểu', exp: '20/02/2027', tag: 'ship' },
  BF200: { id: 'BF200', type: 'red',  icon: 'zap',      stub: 'BLACK FRIDAY', title: 'Giảm 200.000₫',            cond: 'Đơn từ 3.000.000₫', exp: '30/11/2026', tag: 'disc' },
  BFPHA: { id: 'BFPHA', type: 'red',  icon: 'zap',      stub: 'BLACK FRIDAY', title: 'Giảm 15% đèn pha, tối đa 250.000₫', cond: 'Áp dụng đèn pha, pha chống chói', exp: '30/11/2026', tag: 'disc' },
};
const VOUCHER_USED = [
  { type: 'gold', icon: 'ticket', stub: 'ĐỔI ĐIỂM', title: 'Giảm 50.000₫', cond: 'Đã dùng cho đơn #KW2611-0215', exp: 'Đã dùng 02/11/2026' },
  { type: 'green', icon: 'truck', stub: 'FREESHIP', title: 'Freeship toàn quốc', cond: 'Đã dùng cho đơn #KW2610-1932', exp: 'Đã dùng 15/10/2026' },
];
const VOUCHER_EXPIRED = [
  { type: 'red', icon: 'zap', stub: 'SALE 10/10', title: 'Giảm 8% tối đa 200.000₫', cond: 'Đơn từ 1.000.000₫', exp: 'Hết hạn 10/10/2026' },
  { type: 'gold', icon: 'sun', stub: 'KITAWA', title: 'Giảm 150.000₫', cond: 'Đơn từ 2.500.000₫', exp: 'Hết hạn 30/09/2026' },
];

/* Cửa hàng – theo kitawa.vn */
const STORES = [
  { n: 'Showroom TP.HCM', a: 'Tòa nhà KITAWA, 330 Bình Lợi, P. Bình Lợi Trung', h: '9:00 – 17:00, Thứ 2 – Thứ 7' },
  { n: 'VPĐD Hà Nội', a: 'Tầng 5, Cplus Office, tổ 28, phố Thành Thái, P. Cầu Giấy', h: 'Giờ hành chính' },
  { n: 'VPĐD Cần Thơ', a: '124 Võ Văn Kiệt, KV Bình Trung, P. Long Tuyền', h: 'Giờ hành chính' },
];
const HOTLINES = [
  { k: 'Mua lẻ, tư vấn', v: '0915 405 339', s: '8:00 – 22:00 hằng ngày', icon: 'phone', c: 'gold' },
  { k: 'Đại lý, mua sỉ', v: '0943 899 539', s: 'Chính sách giá sỉ, chiết khấu', icon: 'briefcase', c: 'navy' },
  { k: 'Dự án, công trình', v: '0947 397 983', s: 'Khảo sát, thiết kế chiếu sáng', icon: 'building', c: 'navy' },
  { k: 'Bảo hành, khiếu nại', v: '1900 0026', s: 'Nhánh 2 · 1.000đ/phút', icon: 'shield', c: 'green' },
];

/* Chính sách bảo hành – theo kitawa.vn/chinh-sach-bao-hanh */
const WPOLICY = [
  ['Đèn đường liền thể', 'Tấm pin 5 năm · LED, pin, bộ điều khiển 3 năm'],
  ['Đèn đường / đèn pha tấm pin rời', 'Tấm pin 5 năm · LED, pin, bộ điều khiển 3 năm'],
  ['Đèn trụ cổng, sân vườn, cầm tay', 'LED, tấm pin, pin 3 năm'],
  ['Quạt năng lượng mặt trời', '1 năm'],
  ['Bộ hòa lưới (inverter)', '5 năm'],
  ['Máy bơm năng lượng mặt trời', '3 năm'],
];

/* Dự án – theo kitawa.vn */
const PROJECTS = [
  { img: 'prj-1.jpg', t: 'Cung cấp đèn năng lượng mặt trời cho HKT tại Tân Đông Hiệp' },
  { img: 'prj-2.jpg', t: 'Cung cấp 214 đèn BC1300 cho Gia Nguyễn Nguyễn' },
  { img: 'prj-3.jpg', t: 'Cung cấp 40 đèn PT3600 cho Công ty Hương Liệu Thực Phẩm Việt Nam' },
];

/* CTV (đề xuất) */
const CTV_ORDERS = [
  { id: '#KW2611-205', who: 'Nguyễn V. H***', v: 2806000, c: 224480, st: 'wait', d: '20/11/2026' },
  { id: '#KW2611-188', who: 'Trần T. M***',   v: 1776000, c: 142080, st: 'ok',   d: '18/11/2026' },
  { id: '#KW2611-152', who: 'Lê Q. B***',     v: 5596000, c: 447680, st: 'ok',   d: '15/11/2026' },
  { id: '#KW2611-097', who: 'Phạm Đ. K***',   v: 860000,  c: 68800,  st: 'cancel', d: '09/11/2026' },
];
const CTV_CHART = [
  { d: 'T7', v: 320 }, { d: 'CN', v: 180 }, { d: 'T2', v: 0 }, { d: 'T3', v: 448 }, { d: 'T4', v: 142 }, { d: 'T5', v: 610 }, { d: 'H.nay', v: 224 },
];
