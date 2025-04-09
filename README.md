# Coursely

*A student-friendly alternative to Oakland University's course registration system.*

---

## 📝 Overview

**Coursely** was built to modernize and simplify the student course registration process. Developed as a final project for CSI 3450 at Oakland University, this full-stack application offers a sleek frontend and a robust backend—replacing the outdated registration system with something smarter, faster, and easier to use.

---

## 🚀 Features

- 🔍 Powerful course search & filters  
- 🖥️ Clean, modern user interface  
- 🔐 Secure login and role-based access  
- 📋 Real-time course registration  
- 🧩 PostgreSQL database integration  
- ☁️ Railway cloud-hosted backend  
- 🌐 Frontend powered by Vite + JavaScript  

---

## 🛠 Tech Stack

| Layer     | Tech Used                     |
|-----------|-------------------------------|
| Frontend  | HTML, CSS, JavaScript, Vite   |
| Backend   | Python (Flask)                |
| Database  | PostgreSQL (hosted on Railway)|
| Hosting   | Railway.app                   |
| Tools     | Git, `.env` for environment variables |

---

## 🔧 Setup & Installation

### ✅ Prerequisites

- Python 3.x  
- Node.js + npm  
- PostgreSQL  
- Railway account (for cloud DB hosting)

---

### 🐍 Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env  # Then edit it with Railway DB credentials

# Run the Flask app
python app.py
```

---

### 💻 Frontend Setup

```bash
cd frontend

# Install frontend dependencies
npm install

# Start the Vite development server
npm run dev
```

---

## 🗃️ Database Schema

The application includes a fully relational schema with the following tables:

- `Users`: Stores student/admin details  
- `Courses`: Holds the full course catalog  
- `Instructors`: Linked to courses  
- `Student_Courses`: Tracks user enrollment  

---

## 👨‍💻 Team

### Frontend

- Ben Braniff  
- Vincent Griest  
- Ben Pentecost  

### Backend

- Alex Merlo  
- Mina Salama  
- Berta Sawa  

---

## 📄 License

This project is for **academic use only**.
