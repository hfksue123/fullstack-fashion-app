> npm install tailwindcss @tailwindcss/vite
> npm create vite@latest
> npm install react-router-dom

1. Frontend

=> Nhập các đoạn ở trên bên trong folder frontend, sau đó set up dự án như sau:

- Xóa hết trong index.css và thêm dòng `@import "tailwindcss";`
- Xóa file App.css
- Setup route bên trong App.jsx

> npm install react-icons --save
> npm install sonner
> npm install react-redux @reduxjs/toolkit axios

- Cấu trúc file Checkout để thanh toán.

- Truy cập developer.paypal.com và đăng nhập
- Vào dashboard -> Apps&Credentials -> Create App (đặt tên và create)
  > npm install @paypal/react-paypal-js
- Cấu trúc file PaypalButton.jsx và bỏ dưới file Checkout.jsx

- Cấu trúc Admin Panel để quản lý sản phảm

- Tạo AdminLayout.jsx trong folder Admin và tạo UI cho Admin Panel.

2. Backend

> Tools: Express, mongoose, dotenv, jsonwebtoken, bcryptjs, cors, nodemon
> Apps: MongoDB
> cd backend
> npm init -y
> npm install express mongoose dotenv jsonwebtoken bcryptjs cors nodemon
> npm install multer cloudinary streamifier


- Tạo 1 file server.js để chạy server. Đổi đường dẫn file main.js trong package.json thành server.js, cấu trúc lại script.
- Tạo file .env
- Truy cập cloud.mongodb.com và tạo tài khoản, sau đó tạo 1 project mới (đặt tên và create). Tiếp tục tạo mới 1 cluster free -> 1 panel hiện ra và hãy copy password -> nhấn vào Network Access link -> Add ID Address -> Allow access from anywhere
- Quay lại panel -> Nhấn tạo database -> copy string và dán vào .env -> tìm trong string chỗ `2arasbt.mongodb.net/` và bỏ thêm tên project vừa tạo vào (vd:`2arasbt.mongodb.net/rabbit`) -> Tìm `<db_password>` và thay bằng mật khẩu database (password tìm ở Database Access và có thể auto generate hoặc tự đặt cho riêng mình).
- Tạo 1 folder config trong backend, trong đó tạo 1 file db.js để cấu hình database.
- Tạo 1 folder models trong backend, trong đó tạo 1 file user.js để tạo model user.
- Tạo 1 folder routes trong backend
- Test API với Postman, tạo 1 collection tên User -> Add a request -> Rename thành Register -> Đổi phương thức thành POST -> nhập vào input `http://localhost:9000/api/users/register` -> Click Save -> Chọn thẻ Body -> Raw -> nhập 1 mảng thông tin như name,email,password cụ thể và nhấn send, nếu như báo 200 OK thì thành công.
- Tiếp tục test với request mới với tên là Login, method POST, link `http://localhost:9000/api/users/login`, data chỉ để email+password đã post ở request register. Nếu nhấn Send và nó trả về thông tin người dùng đã tạo đúng thì thành công. Hãy thử với mật khẩu sai hoặc email sai và xem kết quả


<!-- 1. Product Backend -->
- Tạo 1 file Product.js trong models và cấu hình các models bên trong file đó.
- Tạo 1 file ProductRouter.js trong routes và cấu hình các routes bên trong file đó.
<!-- Create Product -->
- Tạo 1 collection Postman mới với tên Products với 1 POST request + link (`http://localhost:9000/api/products`) có tên là Create -> Tại Header search key Authorization, value nhập "Bearer <token>" (thay `<token>` bằng token của user ở POST Login) -> Tại Body -> Raw -> Nhập 1 mảng data và nhấn Send, nếu thành công thì lên Atlas check data trong rabbit.products tìm thẻ user sẽ thấy nó được gán vào product vừa create.
- Trong file authMiddleware.js có 1 dòng comment `//Middleware to check if user is an admin`, dòng này có ý nghĩa là khi người tạo không phải role admin thì sẽ không thể tạo sản phẩm (đã test với postman)
<!-- Update Product -->
- Tiếp tục thêm và test chức năng Update Product với 1 PUT request mới với tên là Update. Link là `http://localhost:9000/api/products/<product_ID>`, nhập user vào Header như các request khác, trong Body ghi bất kì mục nào cần sửa và bỏ vào mảng, sau khi nhấn Send và kiểm tra database thì sẽ thấy được sản phẩm đã được sửa.
<!-- Delete Product -->
- Thêm chức năng delete vào productRoutes.js và tạo 1 DELETE method trên Postman để test. Header tương tự, link tương tự với id là id của product cần xóa, sau khi nhấn Send thì sẽ thấy được 1 thông báo thành công và product đã được xóa khỏi database.
<!-- seed.js -->
- Tạo 1 file seed.js trong backend, có tác dụng xóa sạch tất cả user và product hiện có. Sau đs nó sẽ Tạo một user admin mới và gán user là admin vào mỗi sản phẩm. Insert danh sách sản phẩm mẫu vào DB (File trong /backend/data/products.js) và In ra log "Data seeded successfully!" và thoát. Bây giờ vào DB kiểm tra thì sẽ thấy 1 danh sách 20 sản phẩm mới và 1 user admin mới.
<!-- Filter Products -->
- Thêm chức năng filter vào productRoutes.js và tạo GET method với tên là All Products. Link là `http://localhost:9000/api/products/?category=Top Wear` sẽ cho ta thấy tất cả các sản phẩm thuộc danh mục Top Wear. Nếu muốn tìm kiếm nhiều thể loại thì thêm & và nhập tên thể loại khác hoặc thêm các key cũng như value tương ứng trong table để Postman auto generate cho mình.
<!-- Filter Single Product -->
- Làm tương tự với GET method và link là `http://localhost:9000/api/products/:id` để tìm kiếm sản phẩm theo id.
<!-- Similar Products -->
- Làm tương tự với GET method và link là `http://localhost:9000/api/products/similar/:id` để hiển thị các sản phẩm tương tự theo id.
<!-- New Arrival Products -->
- Làm tương tự với GET method và link là `http://localhost:9000/api/products/new-arrivals` để hiển thị các sản phẩm mới nhất theo ngày tạo.


<!-- 2. Cart Backend -->
- Tạo 1 Cart.js trong models -> thêm vào seed.js và server.js -> Tạo thêm 1 cartRoutes để xử lý các request.
<!-- CREATE api/cart -->
- tạo POST method trên postman và test với 1 mảng product rồi productId,size,color,quantity -> sau đó cập nhật lại nhưng thêm guestId và đổi size khác hoặc color,quantity. Kết quả trong DB là guestId sẽ được gắn với 1 object product.
<!-- UPDATE api/cart -->
- Tạo PUT method trên postman và test với mảng product bao gồm: userId, productId, size,color,quantity -> Khi set quantity về 0 thì sẽ xóa product khỏi cart.
<!-- DELETE api/cart -->
- Làm tương tự PUT method với Delete method. Nhưng nó sẽ xóa khi người dùng nhấn vào nút xóa trên product trong cart.
<!-- GET api/cart?userId=... -->
- Tạo GET method và tìm userId xem có in ra cart của người đó hay ko
<!-- MERGE api/cart/merge -->
- chạy `npm run seed` để tạo lại dữ liệu và thêm 1 cart mới với guestId trong request CREATE ở trên. Sau đó tạo POST method với tên là Merge. Giả lập đăng nhập với `key=Authorization` và `value=Bearer <token>` ở thẻ Header (token lấy từ Login ở User). Sau đó nhập guestId ở mục Body/Raw và nhấn Send thì sẽ thấy cart của guestId đó được chuyển thành của user đã đăng nhập.


<!-- 3.Checkout Backend -->
- Tạo 2 file Order.js và Checkout.js trong /models và checkoutRoutes.js trong /routes
- Tạo blank Collection named Checkout trên postman. tạo 1 POST request, giả lập đăng nhập và nhập data và raw với các trường dữ liệu sau đây: checkoutItems{productId,name,image,price}, shippingAddress{address,city,postalCode,country}, paymentMethod,totalPrice. Sau khi nhấn send thì nó sẽ tự tạo 1 hóa đơn.
- Tiếp tục tạo thêm 1 PUT request named Pay. Giả lập đăng nhập, link là `http://localhost:9000/api/checkout/:id/pay` thì sẽ có 1 table mới hiện lên ở tag Params, tìm ObjectId của hóa đơn vừa tạo ở trên trong Atlas và paste vào table đó ở cột Value. Nhập data vào RAW như sau: {paymentStatus:"paid","paymentDetails":{"transactionId":"...","paymentGateway":"PayPal","amount":19,"currency":"USD"}}. Và nhấn Send thì nó sẽ cập nhật trạng thái hóa đơn thành paid.
- Duplicate request vừa rồi và đổi link thành `http://localhost:9000/api/checkout/:id/finalize`, xóa data trong RAW và nhấn Send. 


<!-- 4.Order Backend -->
- Tạo file orderRoutes bên trong /routes. 
- Tạo 1 GET request trong 1 collection mới tên là Order, link là `http://localhost:9000/api/orders/my-orders`, giả lập đăng nhập để lấy ra tất cả order của user đã đăng nhập.
- Duplicate request vừa rồi và đổi link thành `http://localhost:9000/api/orders/:id`, bỏ _id của order bất kỳ vào Value và nhấn Send. Kết quả sẽ là thông tin 1 order của user đã đăng nhập.


<!-- 5. Cloudinary: xử lý upload ảnh -->
- Chạy lệnh cài cloudinary vào backend
- Thêm 3 dòng key vào .env
- Tạo 1 file uploadRoutes.js trong /routes
- Tạo 1 POST request bên trong Upload collection postman named Create với link là `http://localhost:9000/api/upload`, giả lập đăng nhập. Chọn thẻ Body->form-data, nhập Key=image và chọn định dạng File, value chọn 1 ảnh bất kì từ máy local và sau đó nhấ Send. Kết quả sẽ là 1 link ảnh được upload lên cloudinary.


<!-- 6. Subcriber email -->
- Tạo 1 file Subscriber.js trong models và subscriberRoutes.js trong routes
- Tạo 1 POST request trong Subscriber collection postman với tên là Create. Link là `http://localhost:9000/api/subscribe`, giả lập đăng nhập và nhập email vào Body/Raw. Kết quả là email được thêm vào database. Validation đã có xử lý nhẹ về correct email.


<!-- 7. Admin Backend -->
- Tạo 1 file adminRoutes.js trong /routes
<!-- GET /api/admin/users: lấy danh sách users -->
- 1 GET request trên postman với link là `http://localhost:9000/api/admin/users`, giả lập đăng nhập, kết quả là danh sách tất cả user trong DB.
<!-- POST /api/admin/users: tạo user mới -->
- 1 POST request trên postman với link là `http://localhost:9000/api/admin/users`, giả lập đăng nhập, nhập vào Body/Raw các trường dữ liệu: {name,email,password}. Kết quả là 1 user mới được tạo ra.
<!-- PUT /api/admin/users/:id: cập nhật user -->
- 1 PUT request trên postman với link là `http://localhost:9000/api/admin/users/:id` điền Value là ObjectId của user cần update, giả lập đăng nhập, nhập vào Body/Raw các trường dữ liệu: {name,email} mới. Kết quả là user được cập nhật dữ liệu mới.
<!-- DELETE /api/admin/users/:id: xóa user (admin only) -->
- 1 DELETE request trên postman với link là `http://localhost:9000/api/admin/users/:id` điền Value là ObjectId của user cần xóa, giả lập đăng nhập, kết quả là user được xóa khỏi DB.


<!-- 8. Product Admin Backend -->
- Tạo 1 file productAdminRoutes.js trong /routes
<!-- GET /api/admin/products: lấy danh sách products -->
- 1 GET request trên postman với link là `http://localhost:9000/api/admin/products`, giả lập đăng nhập, kết quả là danh sách tất cả product trong DB.

<!-- 9. Order Admin Backend -->
- Tạo 1 file adminOrderRoutes.js trong /routes
<!-- GET /api/admin/orders: lấy danh sách orders -->
- 1 GET request trên postman với link là `http://localhost:9000/api/admin/orders`, giả lập đăng nhập, kết quả là danh sách tất cả order trong DB.
<!-- DELETE /api/admin/orders/:id -->
- 1 DELETE request trên postman với link là `http://localhost:9000/api/admin/orders/:id` điền Value là ObjectId của order cần xóa, giả lập đăng nhập, kết quả là order được xóa khỏi DB.

3. Quay lại Frontend:
- Cài Redux và thêm 1 file `store.js` + 1 folder `slices` trong 1 folder `/redux` bên trong `/src`
- Bên trong `slices` tạo 1 file `authSlice.js`, cấu hình cho redux trong file này, Bọc thẻ Provider bên trong App.jsx để sử dụng redux trong toàn bộ project. Vào từng file cần cấu trúc redux như Login,Register,... và import `import { loginUser } from "../redux/slices/authSlice";` + `import { useDispatch } from "react-redux";`. và dùng dispatch() để gọi 1 hành động (action) trong Redux đặt hên trong hàm handle để xử lý nút submit khi người dùng click. Tạo thêm nhiều file khác để xử lý backend liên quan tới cart,product,user,... và sau đó import vào store.js để cấu hình redux.
- NewArrivals.jsx: thay thế bằng fetchNewArrivals
- Home.jsx -> ProductGrid.jsx -> ProductDetails.jsx: chỉnh sửa, thêm Redux vào
- CollectionPage.jsx: Redux cấu hình cho filter page.
- NavBar.jsx: chỉnh cấu hình nút cart, để số sản phảm hiển thị đúng khi add và remove
- CartDrawer.jsx + CartContent.jsx: xử lý thêm vào giỏ hàng
- SearchBar.jsx: cấu hình nút tìm kiếm product
- Login.jsx: để xử lý Login process
- Profile.jsx: xử lý hiển thị thông tin user và nút Logout trong Profile Page và modal confirm logout
- Register.jsx: xử lý register process và error
- Checkout.jsx: xử lý thanh toán
- OrderConfirmationPage.jsx: xử lý checkout order thành công
- MyOrdersPage.jsx: xử lý hiển thị danh sách các orders đã đặt của user.
- OrderDetailsPage.jsx:
- ProtectedRoute.jsx: xử lý chỉ hiển thị nút admin cho role:"admin", sau đó bỏ vào App.jsx
- AdminHomePage.jsx: xử lý giao diện trang Home của Admin Panel.
- AdminSideBar.jsx: xử lý giao diện của thanh sidebar trong AdminPanel
- UserManagement.jsx: giao diện Tab quản lý các User trong AdminPanel
- OrderManagement.jsx: giao diện Tab quản lý các Order trong AdminPanel (orderAdminRoutes.js + adminOrderSlice.js)
- ProductManagement.jsx: giao diện Tab quản lý các Product trong AdminPanel (productRoutes.js + productAdminSlice.js)
- EditProductPage.jsx: giao diện Tab Edit Product sẵn có trong Admin Panel (ProductManagement.jsx)

<!-- 10. Deploy Vercel -->
- Tạo 2 file vercel.json trong /backend và /frontend và 1 file .gitignore ở thư mục gốc
- Tại thư mục gốc gõ:
> git init
