import traceback
from flask import jsonify, request
from database.queries import fetch_course
from methods.user import get_jwt_token
from app import get_db_connection
from psycopg2.extras import RealDictCursor

def search_course(request):
    try:
        data = request.get_json()
        course_query = data.get('id')
        selected_term = data.get('term')

        if not course_query:
            return jsonify({"message": "No course data provided!"}), 400

        courses = fetch_course(course_query, selected_term)

        if not courses:
            return jsonify({"message": "Course not found!"}), 404

        # Format each course in the list
        formatted_courses = [
            {
                "id": course["id"],
                "course_name": course["course_name"],
                "course_code": course["course_code"],
                "area_of_study": course["area_of_study"],
                "description": course["description"],
                "start_time": str(course["start_time"]),
                "end_time": str(course["end_time"]),
                "dates_offered": course["dates_offered"],
                "semester_offered": course["semester_offered"],
                "capacity": course["capacity"],
                "building": course["building"],
                "room_num": course["room_num"],
                "instructor_id": course["instructor_id"],
                "instructor_name": f"{course['first_name']} {course['last_name']}"
            }
            for course in courses
        ]

        return jsonify({
            "message": "Courses found!",
            "courses": formatted_courses
        }), 200

    except Exception as e:
        print(f"Error searching course: {e}")
        print(traceback.format_exc())
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

def get_course_summary(request):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        userid = get_jwt_token(request)

        query = """
        SELECT sc.course_id, c.course_name, c.course_number, c.course_code, 
               c.area_of_study, c.description, c.start_time, c.end_time, 
               c.dates_offered, c.semester_offered, c.building, c.room_num, 
               c.instructor_id, c.capacity,
               (
                SELECT COUNT(*) 
                FROM student_courses 
                WHERE course_id = sc.course_id
                ) AS enrolled_count
        FROM student_courses sc
        JOIN courses c ON sc.course_id = c.id
        WHERE sc.user_id = %s;
        """
        
        cursor.execute(query, (userid,))
        courses = cursor.fetchall()

        # Convert time fields to string format
        for course in courses:
            course["start_time"] = course["start_time"].strftime("%H:%M:%S") if course["start_time"] else None
            course["end_time"] = course["end_time"].strftime("%H:%M:%S") if course["end_time"] else None
        
        return jsonify(courses), 200  

    except Exception as e:
        return jsonify({"error": str(e)}), 500  
    
    finally:
        cursor.close()
        conn.close()

def register_for_course(request):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        #Get user ID from JWT token with error handling
        try:
            userid = get_jwt_token(request)
        except ValueError as ve:
            return jsonify({"error": str(ve)}), 401

        data = request.get_json()

        if "course_id" not in data:
            return jsonify({"error": "Missing course_id"}), 400

        course_id = data["course_id"]

        #Check if user is already registered for the course
        cursor.execute(
            "SELECT 1 FROM student_courses WHERE user_id = %s AND course_id = %s;",
            (userid, course_id)
        )
        if cursor.fetchone():
            return jsonify({"error": "You are already registered for this course."}), 409

        #Gather course details
        cursor.execute(
            "SELECT start_time, end_time, semester_offered, capacity, dates_offered FROM courses WHERE id = %s;",
            (course_id,)
        )
        course = cursor.fetchone()

        if not course:
            return jsonify({"error": "Course not found"}), 404

        start_time, end_time, semester, capacity, dates_offered = course

        #Check if course is full
        cursor.execute(
            "SELECT COUNT(*) FROM student_courses WHERE course_id = %s;",
            (course_id,)
        )
        enrolled_count = cursor.fetchone()[0]

        if enrolled_count >= capacity:
            return jsonify({"error": "This course is full."}), 403

        #Check for schedule conflict
        cursor.execute("""
            SELECT c.course_name, c.start_time, c.end_time, c.dates_offered
            FROM student_courses sc
            JOIN courses c ON sc.course_id = c.id
            WHERE sc.user_id = %s AND c.semester_offered = %s;
        """, (userid, semester))

        registered_courses = cursor.fetchall()

        def parse_time(t):
            h, m, *_ = map(int, str(t).split(":"))
            return h * 60 + m

        def days_overlap(days1, days2):
            return bool(set(days1.split(",")) & set(days2.split(",")))

        new_start = parse_time(start_time)
        new_end = parse_time(end_time)

        for reg in registered_courses:
            reg_name, reg_start, reg_end, reg_days = reg

            #Only check time if days overlap
            if days_overlap(dates_offered, reg_days):
                reg_start_min = parse_time(reg_start)
                reg_end_min = parse_time(reg_end)

                if new_start < reg_end_min and new_end > reg_start_min:
                    return jsonify({
                        "error": f"Time conflict with {reg_name}"
                    }), 409

        #Register the user
        cursor.execute(
            "INSERT INTO student_courses (user_id, course_id, currently_enrolled) VALUES (%s, %s, %s);",
            (userid, course_id, True)
        )
        conn.commit()

        return jsonify({"message": "Successfully registered for course"}), 201

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()


def drop_class(request):
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        userid = 1 # get_jwt_token(request)  
        data = request.get_json()

        if "course_id" not in data:
            return jsonify({"error": "Missing course_id"}), 400

        course_id = data["course_id"]

        query = "DELETE FROM student_courses WHERE user_id = %s AND course_id = %s;"
        cursor.execute(query, (userid, course_id))
        
        if cursor.rowcount == 0:
            return jsonify({"error": "No enrollment found for the given course"}), 404
        
        conn.commit()  # Commit transaction
        return jsonify({"message": "Successfully dropped the course"}), 200

    except Exception as e:
        conn.rollback()  # Rollback transaction if there's an error
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()