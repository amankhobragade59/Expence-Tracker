# 💸 Expense Tracker Application

A full-stack **MERN** (MongoDB, Express, React, Node.js) based expense tracker that allows users to:

- Register and log in securely
- Add, edit, and delete transactions
- View total income and expenses
- Filter transactions by date, type, and category
- View summary and analytics

---

## 🚀 Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS
- Zustand (for state management)
- Axios
- React Router DOM

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication (with cookies)
- CORS, bcrypt, dotenv

---

## 🛠️ Project Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```
⚙️ Backend Setup
2️⃣ Navigate to backend folder
```bash
cd back
```

3️⃣ Install dependencies
```bash
npm install
```
4️⃣ Create .env file in /backend directory
```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5️⃣ Start the backend server
```bash
npm run dev
```

Server will start at http://localhost:3000

💻 Frontend Setup
6️⃣ Navigate to frontend folder
```bash
cd ../front
```

7️⃣ Install dependencies
```bash
npm install
```

8️⃣ Start the frontend development server
```bash
npm run dev
```

App runs at http://localhost:5173
