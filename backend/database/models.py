from backend.moodle_db import get_db_connection, release_db_connection

def fetch_users():
  conn = get_db_connection()
  cursor = conn.cursor()
  cursor.execute("SELECT * FROM users;")
  users = cursor.fetchall()
  conn.close()
  return users

def fetch_instructors():
  conn = get_db_connection()
  cursor = conn.cursor()
  cursor.execute("SELECT * FROM instructors;")
  instructors = cursor.fetchall()
  conn.close()
  return instructors

def fetch_courses():
  conn = get_db_connection()
  cursor = conn.cursor()
  cursor.execute("SELECT * FROM courses;")
  courses = cursor.fetchall()
  conn.close()
  return courses

def fetch_student_courses():
  conn = get_db_connection()
  cursor = conn.cursor()
  cursor.execute("SELECT * FROM student_courses;")
  student_courses = cursor.fetchall()
  conn.close()
  return student_courses
