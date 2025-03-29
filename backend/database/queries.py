from moodle_db import get_db_connection
from psycopg2.extras import RealDictCursor
from flask import jsonify, request


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

def fetch_course(query):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query=query.lower()
        # Check if query can be converted to an integer 
        if query.isdigit():  
            course_number = int(query)
            sql_query = """
            SELECT * FROM courses 
            WHERE course_code = %s
            OR course_name = %s
            OR course_number = %s;
            """
            cursor.execute(sql_query, (query, query, course_number))
        else:
            # If the query is not a number, exclude the course_number check
            sql_query = """
            SELECT * FROM courses 
            WHERE area_of_study = %s
            OR course_name Like %s;
            """
            cursor.execute(sql_query, (query, query))

        course = cursor.fetchone()
        cursor.close()
        conn.close()

        return course
    except Exception as e:
        print(f"Error fetching course: {e}")
        return None
