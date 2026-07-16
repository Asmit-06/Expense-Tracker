# 💰 Expense Tracker

A full-stack Expense Tracker built with the MERN Stack that helps users manage their personal finances through an intuitive dashboard, secure authentication, transaction management, and insightful visualizations.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Public Routes
- Refresh Token Authentication
- Forgot Password via Email
- Password Reset using Secure Reset Link
- Logout

---

## 📊 Dashboard

- Total Balance
- Total Income
- Total Expenses
- Total Transactions
- Monthly Income Comparison
- Monthly Expense Comparison
- Monthly Balance Comparison
- Monthly Transaction Comparison
- Interactive Charts & Analytics

---

## 💳 Transaction Management

- Add Transaction
- Edit Transaction
- Delete Transaction
- Search Transactions
- View Recent Transactions
- Dedicated Transaction History Page

---

## 📂 Categories

### Expense Categories

- Food
- Transport
- Entertainment
- Shopping
- Rent
- Bills & Utilities
- Healthcare
- Education
- Travel
- Technology
- Gifts
- Other

### Income Categories

- Salary
- Freelance
- Investments
- Bonus
- Refund
- Gifts
- Other

---

## 🎨 UI Features

- Dark Mode
- Toast Notifications
- Responsive Dashboard
- Modern UI
- Sidebar Navigation
- Avatar Dropdown
- Authentication Pages
- Charts & Analytics

---

# 🛠 Tech Stack

## Frontend

- React
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide React
- Recharts

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer

---

# 📁 Project Structure

```text
Expense-Tracker
│
├── backend
│   ├── src
│   │   ├── config
│   │   │   ├── db.js
│   │   │   ├── generateToken.js
│   │   │   └── mail.js
│   │   │
│   │   ├── controllers
│   │   │   ├── authController.js
│   │   │   └── TransactionController.js
│   │   │
│   │   ├── middleware
│   │   │   └── protect.js
│   │   │
│   │   ├── models
│   │   │   ├── Transaction.js
│   │   │   └── User.js
│   │   │
│   │   ├── routes
│   │   │   ├── authRoutes.js
│   │   │   └── transactionRoutes.js
│   │   │
│   │   └── index.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend
│   ├── public
│   │
│   ├── src
│   │   ├── components
│   │   │   ├── charts
│   │   │   │   └── Charts.jsx
│   │   │   ├── AddTransactionModal.jsx
│   │   │   ├── Avatar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── PublicRoute.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── Summary.jsx
│   │   │   ├── TransactionRow.jsx
│   │   │   └── TransactionTable.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── DashBoard.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── TransactionPage.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---
# 📋 Prerequisites

Before running the project, make sure you have installed:

- Node.js (v18 or above)
- npm
- MongoDB Atlas (or a local MongoDB instance)
- Git
- A Gmail account with an App Password (for password reset emails)

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Asmit-06/Expense-Tracker.git
cd Expense-Tracker
```

---

## 2. Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

---

## 3. Configure Environment Variables

### Backend (.env)

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_RESET_SECRET=your_reset_secret

EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_google_app_password

CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

---

## 4. Start the Backend Server

```bash
cd backend
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## 5. Start the Frontend

Open another terminal.

```bash
cd frontend
npm run dev
```

Application runs at:

```
http://localhost:5173
```

---

## 6. Open the Application

Visit

```
http://localhost:5173
```

Register a new account and start tracking your expenses.

---

# 🚀 Usage

- Register a new account
- Login securely
- Add income and expense transactions
- Categorize transactions
- Search transactions
- Edit or delete transactions
- Track monthly financial summaries
- Visualize spending using charts
- Toggle between Dark and Light mode
- Reset forgotten password via email

---

# 🔒 Authentication Flow

- Register User
- Login
- Generate Access Token
- Generate Refresh Token
- Protected API Routes
- Automatic Token Refresh
- Forgot Password Email
- Secure Password Reset
- Logout

---

# 📌 Future Improvements

- Budget Planning
- Expense Breakdown by Category
- Export Reports (CSV/PDF)
- Email Notifications
- User Profile Management
- Multi-Currency Support
- Recurring Transactions
- Mobile Responsive Improvements

---

# 👨‍💻 Author

Developed as a Full Stack MERN project to strengthen frontend, backend, authentication, and API development skills.