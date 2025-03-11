#Query the moodle database from postgresql

import psycopg2
from dotenv import load_dotenv
import os

#Load Enviornment variables
load_dotenv()

#Get the DATABASE_URL from the .env file
DATABASE_URL = os.getenv("DATABASE_URL")

# Debugging: Print the database URL to check if it's loading correctly
print(f"✅ Loaded DATABASE_URL: {DATABASE_URL}")

if not DATABASE_URL:
    print("❌ ERROR: DATABASE_URL is not found. Make sure .env is in the correct location!")
else:
    try:
        conn = psycopg2.connect(DATABASE_URL)
        print("✅ Successfully connected to Railway PostgreSQL!")
    except Exception as e:
        print(f"❌ Connection failed: {e}")