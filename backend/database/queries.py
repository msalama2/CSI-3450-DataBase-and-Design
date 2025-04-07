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
    
def fetch_course(query, selected_term):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query=query.lower()
        # Check if query can be converted to an integer 
        if query.isdigit():  
            course_number = int(query)
            sql_query = """
              SELECT courses.*, instructors.first_name, instructors.last_name
                FROM courses
                JOIN instructors ON courses.instructor_id = instructors.id
                WHERE (
                    course_code = %s
                    OR course_name = %s
                    OR course_number = %s
                )
                AND semester_offered = %s;
            """
            cursor.execute(sql_query, (query, query, course_number, selected_term))
        else:
            # If the query is not a number, exclude the course_number check
            like_query = f"%{query}%"
            sql_query = """
               SELECT courses.*, instructors.first_name, instructors.last_name
                FROM courses
                JOIN instructors ON courses.instructor_id = instructors.id
                WHERE (
                    LOWER(area_of_study) = %s
                    OR LOWER(course_name) LIKE %s
                )
                AND semester_offered = %s;
            """
            like_query = f"%{query.lower()}%"
            cursor.execute(sql_query, (query, like_query, selected_term))

        courses = cursor.fetchall()
        cursor.close()
        conn.close()

        return courses
    except Exception as e:
        print(f"Error fetching course: {e}")
        return None
