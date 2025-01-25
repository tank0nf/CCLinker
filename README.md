# 🔗 **CCLinker: Privacy-Focused URL Shortener**

**CCLinker** is a secure and privacy-focused **URL shortener** built with **Supabase** for backend and **Vanilla JavaScript + TailwindCSS** for frontend. It allows users to create, manage, and share short URLs with advanced access controls, analytics, and notifications.

---

## 📚 **Table of Contents**

- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🧠 User Flow](#-user-flow)
- [🖥️ Screenshots](#-screenshots)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Environment Variables](#-environment-variables)
- [📊 Database Schema](#-database-schema)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## ✨ **Features**

### 🏠 **Dedicated Homepage**
- Clear instructions on how to use the app.
- Prominent **Login** and **Sign-Up** options.
- Mobile-friendly and responsive design.

### 🔑 **Authentication**
- Email-based **Magic Link Login** powered by **Supabase Auth**.
- Secure session management.

### 📊 **Dashboard**
- URL creation and management.
- Set expiration/start dates.
- Password-protected URLs.
- Email whitelisting and access requests.
- Real-time analytics.

### 🔒 **Intermediate Access Page**
- Users are prompted for **passwords** or **email validation**.
- Unauthorized users can request access via email notifications.

### 📈 **Analytics Dashboard**
- Total clicks, unique visitors, and top-performing URLs.
- Real-time data visualizations.

### 📲 **Notifications**
- Email alerts for URL access and access requests.
- In-app notifications.

---

## 🛠️ **Tech Stack**

- **Frontend:** Vanilla JavaScript, TailwindCSS
- **Backend:** Supabase (Auth, PostgreSQL Database, Edge Functions)
- **Deployment:** Vercel (Frontend), Supabase Cloud (Backend)

---

## 🧠 **User Flow**

1. **Homepage:** Users land on the homepage, learn about the app, and sign up or log in.
2. **Dashboard:** Users can create new URLs, set access controls, and view analytics.
3. **Short URL Access:** When someone clicks a short URL:
   - They're redirected to an **Intermediate Page**.
   - They must provide a **password** or **email verification**.
4. **Access Approval:** If unauthorized, users can request access.
5. **Analytics:** The creator can monitor URL activity via the dashboard.

---

## 🖥️ **Screenshots**

### 📸 Homepage
![Homepage](https://github.com/tank0nf/CCLinker/blob/main/assets/homepage.png?raw=true) <!-- Add screenshot of the homepage -->

### 📸 Login Page
![Login Page](https://github.com/tank0nf/CCLinker/blob/main/assets/login_page.png?raw=true) <!-- Add screenshot of the login page -->

### 📸 Dashboard
![Dashboard](https://github.com/tank0nf/CCLinker/blob/main/assets/dashboard.png?raw=true) <!-- Add screenshot of the dashboard -->

### 📸 Intermediate Access Page
![Access Page](https://github.com/tank0nf/CCLinker/blob/main/assets/intermidiate.png?raw=true) <!-- Add screenshot of intermediate page -->

### 📸 Analytics Page
![Analytics Page](https://github.com/tank0nf/CCLinker/blob/main/assets/analytics.png?raw=true) <!-- Add screenshot of analytics page -->

---

## 🚀 **Getting Started**

### Prerequisites
- Node.js installed (Optional for local development)
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/tank0nf/CCLinker.git

# Navigate to the project folder
cd CCLinker

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Deployment
- Deploy the frontend on **Netlify** or **Vercel**.
- Connect the backend to **Supabase Cloud**.

---

## ⚙️ **Environment Variables**

Create a `.env` file in the root directory and add:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_API_KEY=your_supabase_api_key
```

---

## 📊 **Database Schema**

### 1. **Users Table**
- `id`: Unique User ID
- `email`: User Email
- `created_at`: Account Creation Timestamp

### 2. **URLs Table**
- `id`: Unique URL ID
- `short_url`: Shortened URL
- `original_url`: Original URL
- `expiration_date`: Expiry Date
- `password`: Optional Password

### 3. **Access Logs Table**
- `id`: Log ID
- `url_id`: Associated Short URL
- `accessed_by`: Email/Name
- `accessed_at`: Timestamp

---

## 🤝 **Contributing**

Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes.
4. Submit a pull request.

---

## ✅ **TODO**

1. Make a Logo.
2. Make Homepage more interactive and more informative.
3. Add additional features
---

### 🌟 **Star this repo if you found it useful!**

For any questions or support, feel free to reach out. 🚀😊

**Happy Coding!** 🎉
