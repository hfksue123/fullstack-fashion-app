## <a name="table">Demo Link</a>
[Demo](https://fullstack-fashion-app.vercel.app/)

## 📋 <a name="table">Table of Contents</a>
1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

A full-stack modern fashion e-commerce platform featuring a beautiful and responsive UI, high-quality product images, and a seamless shopping experience. It includes secure user authentication with role-based access control, a robust admin dashboard to manage everything from users, products, to orders. The platform supports smooth checkout with integrated payment, mobile-first design, and optimized performance across devices.


## <a name="tech-stack">⚙️ Tech Stack</a>

#### 🖥 Frontend
- **Vite + React**
- **Tailwind CSS**
- **Redux Toolkit**
- React Router DOM, Axios, Swiper
- Toastify, Sonner (UI feedback)
- Cloudinary (image uploads)
- PayPal SDK (payment)

#### 🔧 Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- JWT Authentication
- Multer (image uploads)
- Cloudinary Integration
- PayPal Integration
- RESTful APIs

#### 🧪 Dev Tools
- Postman (API Testing)
- Vercel (Deployment)
- VS Code (IDE)
- Git (Version Control)

## <a name="features">🔋 Features</a>

👉 👤 User Features: Register/Login, Profile, View Products, Filter/Search, Add to Cart, Checkout via PayPal, View Orders.

👉 🛒 Cart: Guest cart, merge on login, full CRUD.

👉 📦 Product: Filtering, similar items, new arrivals, hot sale, ...

👉 🧾 Order: Checkout flow with status updates (paid/finalized), My Orders page, order details, payment status, etc.

👉 🧑‍💼 Admin Panel:

        - Manage Users, Products, Orders.
        - Edit/Delete/Create entities.
        - View user list & order list.

👉 ☁️ Cloudinary Upload: Upload product images via forms and upload via API.

👉 ✉️ Email Subscribe: Store emails to database

👉 🌐 Deployment: Backend via Vercel CLI, Frontend via GitHub & Vercel Dashboard

## <a name="quick-start">🤸 Quick Start</a>

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/hfksue123/fullstack-fashion-app.git
cd fullstack-fashion-app
```

**Create a .env file in `/frontend` directory**
```env
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
VITE_BACKEND_URL=http://localhost:9000
```
[PayPal](https://developer.paypal.com): Go to this link → Dashboard → Apps & Credentials → Create App → Copy link at `Client ID` column and paste it in VITE_PAYPAL_CLIENT_ID.

**Create a .env file in `/backend` directory**
```env
PORT=9000
MONGODB_URI=your_mongo_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret
```

[PORT] is the port number where the server will run.


[MongoDB Atlas](https://cloud.mongodb.com/) → Login → Build a Database → Create a new cluster → Network Access link → Add ID Address → Allow access from anywhere. Clusters → Connect → Connect your application. Copy the URI string and paste it in MONGODB_URI. (etc: `mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
`)

[Cloudinary](https://cloudinary.com) → Login → Dashboard → copy and paste it in CLOUDINARY_CLOUD_NAME, API KEY, API SECRET.

[JWT_SECRET] is a secret random string, you can generate it by type `openssl rand -base64 32`in terminal and paste it in JWT_SECRET.

**Set Up Frontend**

```bash
cd frontend
npm install
npm run dev
```
**Set Up Backend**
```bash
cd backend
npm install
npm run dev
```

**Seed the Database**
```bash
npm run seed         # Add sample data
npm run seed reset   # Reset all data & create admin
```
Run `seed` to seed the database with sample data (no reset, just seed data with new data you input in the next times). Run `seed reset` to reset the whole database and create an admin account.

**Deployment**
###### Frontend: push to Github and then deploy to Vercel, while deploying to Vercel, you need to paste the backend link to `VITE_BACKEND_URL` because you should use .gitignore to disable the .env file.

```bash
cd frontend
git init
git add .
git remote add origin https://github.com/..../your-repo.
git commit -m "first commit"
git branch -M main
git push -u origin main
```
- ⚠️ Note: with VITE_BACKEND_URL in .env, you need to deploy `/backend` first to `Vercel`, then get the `backend app link` to put in environment variable when deploying `/frontend` onto Vercel instead of VITE_BACKEND_URL=9000 as on the local machine. Another small note is to remove the "/" at the end of the link to avoid double "//" errors.

###### Backend: push to Vercel
```bash
cd backend
npm install -g vercel
vercel --prod
```
Congratulations! You have successfully completed the project!
Made with 💖 by [hfksue123](https://github.com/hfksue123). And thanks to [HADES](https://hades.vn/#l=vi) for the inspiration and data.