Coursely

A student-friendly alternative to Oakland University's course registration system.

📝 Overview

Coursely was built to modernize and simplify the student course registration process. Developed as a final project for CSI 3450 at Oakland University, this full-stack application provides a sleek frontend with a robust backend, replacing the outdated and cumbersome registration system with something smarter, faster, and easier to use.

🚀 Features

🔍 Powerful course search & filters
🖥️ Clean, modern user interface
🔐 Secure login and role-based access
📋 Real-time course registration
🧩 PostgreSQL database integration
☁️ Railway cloud-hosted backend
🌐 Frontend powered by Vite + JavaScript
🛠 Tech Stack

Layer	Tech Used
Frontend	HTML, CSS, JavaScript, Vite
Backend	Python (Flask)
Database	PostgreSQL (hosted on Railway)
Hosting	Railway.app
Tools	Git, .env for credentials

🔧 Setup & Installation

Prerequisites
Python 3.x
Node.js + npm
Railway account (optional for DB)
PostgreSQL
1. Backend Setup
# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env  # Edit with Railway DB credentials

# Run Flask backend
python app.py
2. Frontend Setup
cd frontend

# Install dependencies
npm install

# Run Vite dev server
npm run dev
🗃️ Database Schema

Includes tables for:

Users: Stores student/admin data
Courses: Course catalog
Instructors: Linked to courses
Student_Courses: User enrollment mapping

👨‍💻 Team

Frontend

Ben Braniff
Vincent Griest
Ben Pentecost
Backend

Alex Merlo
Mina Salama
Berta Sawa
📄 License

This project is for academic use only.