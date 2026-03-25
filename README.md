# SwiftGuard Kinetic

Demo frontend cho hệ thống thanh toán/chuyển tiền đa vai trò, xây bằng Next.js App Router.

Project hiện tập trung vào trải nghiệm UI/UX và flow nghiệp vụ mock cho 3 vai trò chính:

- `user`: người dùng tạo order, theo dõi giao dịch, xem ví, settings
- `admin`: người duyệt đơn và yêu cầu nạp tiền
- `supporter`: CSKH trả lời tin nhắn và quản lý hội thoại hỗ trợ

Lưu ý: đây là demo frontend, chưa có backend/database thật. Phần đăng nhập và phân quyền hiện dùng `localStorage`.

## 1. Tech Stack

- Next.js
- React
- TypeScript
- App Router (`app/`)
- Tailwind qua CDN config trong [app/layout.tsx](/Users/nguyenson/Documents/Payment/app/layout.tsx)

## 2. Cách chạy project

```bash
pnpm install
pnpm dev
```

Các lệnh hữu ích:

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

Project mặc định chạy ở:

```bash
http://localhost:3000
```

## 3. Mock Accounts

Trang đăng nhập: [app/(auth)/login/page.tsx](/Users/nguyenson/Documents/Payment/app/(auth)/login/page.tsx)

Các tài khoản demo:

- `demo@kinetic.com` / `password123`
  Vai trò `user`
  Điều hướng đến `/counter-market`

- `admin@kinetic.com` / `admin123`
  Vai trò `admin`
  Điều hướng đến `/admin/orders`

- `support@kinetic.com` / `support123`
  Vai trò `supporter`
  Điều hướng đến `/supporter/messages`

Phân quyền route:

- admin guard ở [app/(admin)/admin/layout.tsx](/Users/nguyenson/Documents/Payment/app/(admin)/admin/layout.tsx)
- supporter guard ở [app/(supporter)/supporter/layout.tsx](/Users/nguyenson/Documents/Payment/app/(supporter)/supporter/layout.tsx)

## 4. Cấu trúc chính

```text
app/
  (auth)/         auth pages
  (main)/         user-facing app
  (admin)/        admin workspace
  (supporter)/    supporter workspace
  api/health/     health check

components/
  Navbar.tsx
  Footer.tsx
  ChatWidget.tsx
  admin/AdminScaffold.tsx
  supporter/SupporterScaffold.tsx

data/
  orders.ts       mock order list + order status styles
```

## 5. Route Map

### Public + Auth

- `/`
  Landing page
- `/login`
  Đăng nhập mock theo role
- `/register`
  Đăng ký tài khoản
- `/forgot-password`
  Quên mật khẩu

### User App

- `/counter-market`
  Danh sách counter
- `/counter-market/[id]`
  Chi tiết counter + loại giao dịch
- `/create-order`
  Tạo order mới
- `/review`
  Review giao dịch trước khi confirm
- `/payment/success`
  Kết quả submit thành công
- `/payment/error`
  Kết quả lỗi
- `/orders`
  Danh sách order
- `/order-status/[id]`
  Chi tiết trạng thái order
- `/wallet`
  Ví và transaction history
- `/portfolio`
  Portfolio overview
- `/settings`
  Cài đặt tài khoản
- `/support`
  Support center

### Admin App

- `/admin/orders`
  Queue duyệt đơn
- `/admin/deposits`
  Queue duyệt yêu cầu nạp tiền

### Supporter App

- `/supporter/messages`
  Inbox CSKH
- `/supporter/dashboard`
- `/supporter/analytics`
- `/supporter/reports`
- `/supporter/order-management`
- `/supporter/deposit-requests`
- `/supporter/support`

Các route supporter ngoài `messages` hiện là placeholder để giữ flow navigation đầy đủ.

## 6. Flow Nghiệp Vụ Theo Vai Trò

### 6.1. User Flow

#### A. Luồng vào hệ thống

1. User mở `/login`
2. Đăng nhập bằng account demo user
3. App set `isLoggedIn=true`, `userRole=user`, `userName=John Doe`
4. User được điều hướng đến `/counter-market`

#### B. Luồng tạo order

1. User vào `/counter-market`
2. Chọn một counter ở danh sách marketplace
3. Mở `/counter-market/[id]` để xem loại giao dịch đang hỗ trợ
4. Bấm `Create Order`
5. Vào `/create-order`
6. Chọn counter, order type, nhập amount
7. Bấm `Create Order`
8. Vào `/review`
9. Kiểm tra thông tin thanh toán
10. Bấm `Confirm & Pay`
11. App giả lập xử lý rồi chuyển sang `/payment/success`

File liên quan:

- [app/(main)/counter-market/page.tsx](/Users/nguyenson/Documents/Payment/app/(main)/counter-market/page.tsx)
- [app/(main)/counter-market/[id]/page.tsx](/Users/nguyenson/Documents/Payment/app/(main)/counter-market/[id]/page.tsx)
- [app/(main)/create-order/page.tsx](/Users/nguyenson/Documents/Payment/app/(main)/create-order/page.tsx)
- [app/(main)/review/page.tsx](/Users/nguyenson/Documents/Payment/app/(main)/review/page.tsx)
- [app/(main)/payment/success/page.tsx](/Users/nguyenson/Documents/Payment/app/(main)/payment/success/page.tsx)

#### C. Luồng lỗi thanh toán

1. Khi giao dịch lỗi, user có thể vào `/payment/error`
2. Tại đây có 3 hướng đi:
   - `Retry Payment` quay lại `/create-order`
   - `Check Balance` mở `/wallet`
   - `Contact Support` mở `/support`

File liên quan:

- [app/(main)/payment/error/page.tsx](/Users/nguyenson/Documents/Payment/app/(main)/payment/error/page.tsx)

#### D. Luồng theo dõi order

1. User mở `/orders`
2. Tìm order theo ID, recipient, counter
3. Bấm `View Details`
4. Đi tới `/order-status/[id]`
5. Theo dõi:
   - progress bar
   - timeline update
   - trạng thái `Pending / Processing / Completed / Cancelled`

Nguồn mock order hiện nằm ở:

- [data/orders.ts](/Users/nguyenson/Documents/Payment/data/orders.ts)

File liên quan:

- [app/(main)/orders/page.tsx](/Users/nguyenson/Documents/Payment/app/(main)/orders/page.tsx)
- [app/(main)/order-status/[id]/page.tsx](/Users/nguyenson/Documents/Payment/app/(main)/order-status/[id]/page.tsx)

#### E. Luồng ví và hồ sơ

- `/wallet`
  Hiển thị số dư, thống kê tổng quan và lịch sử transaction mock
- `/portfolio`
  Hiển thị asset overview, recent activity
- `/settings`
  Cho phép cập nhật email, phone, address ở mức UI mock

File liên quan:

- [app/(main)/wallet/page.tsx](/Users/nguyenson/Documents/Payment/app/(main)/wallet/page.tsx)
- [app/(main)/portfolio/page.tsx](/Users/nguyenson/Documents/Payment/app/(main)/portfolio/page.tsx)
- [app/(main)/settings/page.tsx](/Users/nguyenson/Documents/Payment/app/(main)/settings/page.tsx)

### 6.2. Admin Flow

Admin shell dùng chung:

- [components/admin/AdminScaffold.tsx](/Users/nguyenson/Documents/Payment/components/admin/AdminScaffold.tsx)

#### A. Luồng vào admin

1. Đăng nhập bằng account admin
2. App set `userRole=admin`
3. Điều hướng đến `/admin/orders`
4. Nếu truy cập admin route mà không phải admin, layout sẽ redirect về `/login`

#### B. Luồng duyệt order

1. Admin vào `/admin/orders`
2. Xem danh sách order cần duyệt
3. Có thể:
   - search
   - chọn từng order
   - bulk approve
   - bulk reject
4. Trạng thái order đổi trong state cục bộ của page

File:

- [app/(admin)/admin/orders/page.tsx](/Users/nguyenson/Documents/Payment/app/(admin)/admin/orders/page.tsx)

#### C. Luồng duyệt deposit request

1. Admin vào `/admin/deposits`
2. Xem các deposit request đang chờ
3. Có thể search theo ID, user, proof
4. Bấm `Confirm Deposit`
5. Request đổi trạng thái từ `Pending` sang `Processed`

Hiện tại flow admin trong repo là mock cục bộ ở từng page, chưa nối backend hay shared state toàn app.

File:

- [app/(admin)/admin/deposits/page.tsx](/Users/nguyenson/Documents/Payment/app/(admin)/admin/deposits/page.tsx)

### 6.3. Supporter Flow

Supporter shell dùng chung:

- [components/supporter/SupporterScaffold.tsx](/Users/nguyenson/Documents/Payment/components/supporter/SupporterScaffold.tsx)

#### A. Luồng vào supporter workspace

1. Đăng nhập bằng account supporter
2. App set `userRole=supporter`
3. Điều hướng đến `/supporter/messages`
4. Nếu không đúng role, supporter layout sẽ redirect về `/login`

#### B. Luồng xử lý tin nhắn CSKH

1. Supporter mở `/supporter/messages`
2. Chọn conversation từ cột trái
3. Lọc conversation theo:
   - `All`
   - `Unread`
   - `Resolved`
4. Xem:
   - nội dung chat ở panel giữa
   - user info ở panel phải
   - recent orders
   - recent deposits
   - private support notes
5. Supporter có thể:
   - gửi reply mới
   - thêm private note
   - mark `Resolve Conversation`

Hiện trạng:

- dữ liệu conversation là mock state trong page
- chưa đồng bộ ngược lại sang `ChatWidget` phía user

File:

- [app/(supporter)/supporter/messages/page.tsx](/Users/nguyenson/Documents/Payment/app/(supporter)/supporter/messages/page.tsx)

## 7. Shared UI Components

### Navbar

- File: [components/Navbar.tsx](/Users/nguyenson/Documents/Payment/components/Navbar.tsx)
- Dùng cho `(main)` routes
- Có:
  - desktop nav
  - mobile nav
  - auth-aware state
  - profile dropdown

### Footer

- File: [components/Footer.tsx](/Users/nguyenson/Documents/Payment/components/Footer.tsx)

### Chat Widget

- File: [components/ChatWidget.tsx](/Users/nguyenson/Documents/Payment/components/ChatWidget.tsx)
- Gắn trong main layout:
  [app/(main)/layout.tsx](/Users/nguyenson/Documents/Payment/app/(main)/layout.tsx)
- Là widget chat nổi cho user
- Có auto reply theo keyword
- Là mock cục bộ, chưa nối thật với supporter inbox

### InfoPage

- File: [components/InfoPage.tsx](/Users/nguyenson/Documents/Payment/components/InfoPage.tsx)
- Dùng cho các route nội dung tĩnh như:
  - `/about`
  - `/contact`
  - `/documentation`
  - `/security`
  - `/terms`
  - `/privacy`
  - `/commission-table`

## 8. API

Hiện có health endpoint:

- `/api/health`

File:

- [app/api/health/route.ts](/Users/nguyenson/Documents/Payment/app/api/health/route.ts)

## 9. Giới hạn hiện tại

- Chưa có backend thật
- Chưa có database
- Đăng nhập chỉ là mock qua `localStorage`
- Admin pages và supporter messages đang dùng state cục bộ trong page
- User `ChatWidget` chưa đồng bộ conversation với supporter workspace
- Nhiều màn là demo UI/UX, chưa nối nghiệp vụ hoàn chỉnh end-to-end

## 10. Hướng mở rộng đề xuất

1. Thêm global store hoặc backend API cho:
   - auth
   - wallet
   - orders
   - notifications
   - support conversations

2. Đồng bộ `ChatWidget` của user với `/supporter/messages`

3. Nối flow thật giữa:
   - user nạp tiền
   - admin duyệt nạp tiền
   - supporter theo dõi và phản hồi ticket

4. Thêm test cho:
   - route guards
   - login redirects
   - order flow
   - supporter conversation actions

## 11. Gợi ý đọc code

Nếu muốn nắm project nhanh, nên đọc theo thứ tự:

1. [app/layout.tsx](/Users/nguyenson/Documents/Payment/app/layout.tsx)
2. [app/(main)/layout.tsx](/Users/nguyenson/Documents/Payment/app/(main)/layout.tsx)
3. [components/Navbar.tsx](/Users/nguyenson/Documents/Payment/components/Navbar.tsx)
4. [app/(auth)/login/page.tsx](/Users/nguyenson/Documents/Payment/app/(auth)/login/page.tsx)
5. [app/(main)/counter-market/page.tsx](/Users/nguyenson/Documents/Payment/app/(main)/counter-market/page.tsx)
6. [app/(main)/create-order/page.tsx](/Users/nguyenson/Documents/Payment/app/(main)/create-order/page.tsx)
7. [app/(main)/review/page.tsx](/Users/nguyenson/Documents/Payment/app/(main)/review/page.tsx)
8. [app/(main)/orders/page.tsx](/Users/nguyenson/Documents/Payment/app/(main)/orders/page.tsx)
9. [app/(admin)/admin/orders/page.tsx](/Users/nguyenson/Documents/Payment/app/(admin)/admin/orders/page.tsx)
10. [app/(supporter)/supporter/messages/page.tsx](/Users/nguyenson/Documents/Payment/app/(supporter)/supporter/messages/page.tsx)
