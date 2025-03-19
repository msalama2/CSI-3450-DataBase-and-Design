from moodle_db import get_db_connection
from psycopg2.extras import RealDictCursor

def fetch_user_by_email(email):
  try:
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    query = "SELECT * FROM users WHERE email = %s;"
    cursor.execute(query, (email,))
    
    user = cursor.fetchone()  
    cursor.close()
    conn.close()
    
    return user
  except Exception as e:
    print(f"Error fetching user: {e}")
    return None