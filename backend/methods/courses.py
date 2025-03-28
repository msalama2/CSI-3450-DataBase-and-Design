import traceback
from flask import jsonify, request
from database.queries import fetch_course_id

def search_course(request):
    try:
        data = request.get_json()
        course_id = data.get('id')
        if not course_id:
            return jsonify({"message": "No course ID provided!"}), 400

        course = fetch_course_id(course_id)
       
        if not course:
            return jsonify({"message": "Course not found!"}), 404

        return jsonify({
        "message": "Course found!",
        "course": {
            "id": course["id"],
            "course_name": course["course_name"],
            "course_code": course["course_code"],
            "area_of_study": course["area_of_study"],
            "description": course["description"],
            "start_time": str(course["start_time"]),  
            "end_time": str(course["end_time"]),
            "semester_offered": course["semester_offered"],
            "capacity": course["capacity"],
            "building": course["building"],
            "room_num": course["room_num"],
            "instructor_id": course["instructor_id"]
        }
    }), 200


    except Exception as e:
        print(f"Error searching course: {e}")
        print(traceback.format_exc())
        return jsonify({"message": "Internal server error", "error": str(e)}), 500
