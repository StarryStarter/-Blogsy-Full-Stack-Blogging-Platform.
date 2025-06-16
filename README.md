# 📝 Blogsy – A Role-Based MERN Blog Platform

Blogsy is a full-stack blog application built with the MERN (MongoDB, Express, React, Node.js) stack that supports:
- 🔐 JWT authentication
- AI blog generation
- 🧑‍💼 Role-based access (Super Admin & Users)
- ✍️ Blog creation, editing, deletion
- 💬 Comment approve/reject option
- 📸 Image uploads using ImageKit

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based secure login/signup
- Super Admin (defined via `.env`) can:
  - Manage **all blogs**
  - Moderate **comments**
- Registered Users can:
  - Create/edit/delete **only their blogs**
  - Manage comments on their blogs

### 📝 Blogging
- Create & edit blog posts using a rich text editor
- Upload cover images (via ImageKit)
- Draft or publish posts
- Categorized blog browsing

### 💬 Comments
- Users can comment on any blog
- Admin can approve/reject their own blog comments
- super admin has all controll over all the blogs

---

## 🛠️ Tech Stack

| Tech           | Description                           |
|----------------|---------------------------------------|
| MongoDB        | NoSQL database for storing users & blogs |
| Express.js     | Backend API framework (Node.js)       |
| React.js       | Frontend UI (with Tailwind CSS)       |
| Node.js        | JavaScript runtime environment        |
| JWT            | Authentication via JSON Web Tokens    |
| ImageKit       | Cloud image upload and CDN support    |
| bcryptjs       | Password hashing                      |

---

## 🔧 Installation

### 1. Clone the repository
git clone https://github.com/your-username/blogsphere.git

### 2. create .env
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=your_admin_email@example.com

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

### 3. install the packages
cd backend
npm install
cd ../frontend
npm install

### 4. run the project
cd backend
npm run server
cd client
npm run dev





