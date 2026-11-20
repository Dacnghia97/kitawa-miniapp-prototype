# KITAWA Mini App – Prototype

> **Bản thiết kế mẫu**: giao diện Mini App đề xuất cho thương hiệu KITAWA, dùng để xem và góp ý.
> Đây **không phải ứng dụng chính thức** của KITAWA. Trang không có đơn hàng, thanh toán hay dữ liệu thật.
>
> Xem trực tiếp: https://dacnghia97.github.io/kitawa-miniapp-prototype/

## Mở prototype
Bấm đúp vào `index.html`. Prototype chạy thẳng trong Chrome hoặc Edge, không cần cài đặt hay server.

- **Trên máy tính:** điện thoại nằm ở giữa màn hình. Cột bên trái dùng để nhảy nhanh tới 15 màn.
- **Trên điện thoại:** app chiếm toàn màn hình. Có thể gửi cả thư mục cho người khác mở.
- **Xem toàn bộ chiều dài trang** (để chụp ảnh hoặc review): mở `index.html?full`.
- **Mở thẳng một màn:** thêm `#tên-màn` vào cuối đường dẫn, ví dụ `index.html#cart` hoặc `index.html#product/bc10600`.
- **Làm lại từ đầu:** bấm "Đặt lại dữ liệu" ở cột trái.

## Các màn hình
| Nhóm | Màn (route) |
|---|---|
| Mua sắm | Trang chủ `home`, Danh sách sản phẩm `products`, Chi tiết `product`, Flash Sale `flash`, Giỏ hàng `cart`, Thanh toán `checkout`, Đặt hàng thành công `ordered` |
| Bảo hành điện tử | Trung tâm bảo hành `warranty`, Quét QR `scan`, Form kích hoạt `wform`, Thẻ bảo hành `wdone` |
| Thành viên | Tích điểm và hạng `member`, Cộng tác viên `ctv`, Ví voucher `voucher`, Tài khoản `profile`, Báo giá dự án `quote` |

## Những gì bấm thử được
- **Mua hàng:** lọc theo danh mục, công suất, nhu cầu, giá, IP. Tìm kiếm không cần gõ dấu. Thêm vào giỏ, đổi số lượng, xóa sản phẩm.
- **Giỏ hàng và thanh toán:** chọn voucher (tự tính mức giảm), bật/tắt dùng điểm, đặt hàng.
- **Flash sale:** chuyển khung giờ, đặt nhắc. Đồng hồ đếm ngược chạy thật.
- **Bảo hành:** quét QR mô phỏng (tự nhận diện sau khoảng 3 giây), nhập serial tay, điền form, nhận thẻ bảo hành điện tử, được cộng 50 điểm.
- **Thành viên:** điểm danh, đổi điểm lấy voucher, xem lịch sử điểm.
- **Cộng tác viên:** rút hoa hồng, sao chép link, xem mã QR giới thiệu.
- **Voucher:** nhập mã (thử `KITAWA50`), lưu voucher Black Friday, xem điều kiện, dùng ngay.

## Dữ liệu
- **Lấy từ kitawa.vn (20/11/2026):** tên và giá sản phẩm chính, ảnh, danh mục, hotline, showroom, chính sách bảo hành, màu và font.
- **Đề xuất, cần KITAWA xác nhận:** tên hạng thành viên, tỷ lệ tích điểm, % hoa hồng CTV, danh sách voucher, flash sale theo khung giờ, quà tặng kèm, giá các mẫu phụ.

## Cấu trúc
```
index.html            khung trang và cột chọn màn
css/app.css           design token và giao diện
js/data.js            dữ liệu mẫu (sửa giá, sản phẩm, voucher ở đây)
js/app.js             điều hướng, trạng thái, sheet, toast, đồng hồ đếm ngược
js/screens-shop.js    các màn mua sắm
js/screens-member.js  các màn bảo hành, thành viên, CTV, voucher, tài khoản, báo giá
img/                  ảnh sản phẩm và logo tải từ kitawa.vn
```
Font Inter được tải từ Google Fonts. Khi không có mạng, prototype tự dùng font Segoe UI.
