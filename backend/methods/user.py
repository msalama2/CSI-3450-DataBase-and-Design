import os
import jwt
import traceback
from datetime import datetime, timedelta
from dotenv import load_dotenv
from flask import jsonify, request
from database.queries import fetch_user_by_email
from moodle_db import get_db_connection
from psycopg2.extras import RealDictCursor
# Load environment variables from .env
load_dotenv()

# Fetch SECRET_KEY from environment variables


load_dotenv()
def login_user(request):
    
    """Handles user login and returns a JWT token."""
    try:
        data = request.get_json()
        secret_key = os.getenv('SECRET_KEY')
        if not secret_key:
            return jsonify({"message": "SECRET_KEY is missing!"}), 500
        if not data:
            return jsonify({"message": "No data provided!"}), 400
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({"message": "Email and password are required!"}), 400
        
        # Fetch user from the database
        user = fetch_user_by_email(email)
        if not user or user['password'] != password:
            return jsonify({"message": "Invalid email or password!"}), 401

        # Generate JWT token
        token = jwt.encode({
            'user_id': user['id'],
            'exp': datetime.utcnow() + timedelta(hours=2)  # Token expires in 2 hours
        }, secret_key, algorithm='HS256')

        return jsonify({
            'message': 'Login successful!',
            'token': token,
            'user_id': user['id'],
            'user': {
                'id': user['id'],
                'email': user['email'],
                'role': user['role'],
                'date_created': user['date_created']
            }
        }), 200
    except Exception as e:
        print(f"Error during login: {e}")
        print(traceback.format_exc()) 
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

def get_jwt_token(request):
    secret_key = os.getenv('SECRET_KEY')
    # Extract the JWT token from the Authorization header
    token = request.headers.get('Authorization')
    if not token or not token.startswith("Bearer "):
        #Raise a Python error instead of returning a response object
        raise ValueError("Token is missing or malformed")

    try:
        token = token.split(" ")[1]  # Get the token from 'Bearer <token>'
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
        user_id = decoded_token['user_id']
        print(user_id)
        return user_id
    except jwt.ExpiredSignatureError:
        #Raise an error that can be caught by the route
        raise ValueError("Token has expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")


def fetch_user_by_id(request):
    print(request)
    userid=get_jwt_token(request)
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        query = "SELECT * FROM users WHERE id = %s"  # Fetch the user by user_id
        cursor.execute(query, (userid,))
        
        user = cursor.fetchone()  
        cursor.close()
        conn.close()
        
        if user:
            print(user)
            return jsonify(user)
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        print(f"Error fetching user: {e}")
        return jsonify({"message": "Error fetching user"}), 500

