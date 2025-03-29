create_tables_query = """
  CREATE TABLE IF NOT EXISTS Users (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR NOT NULL,
      last_name VARCHAR NOT NULL,
      email VARCHAR UNIQUE NOT NULL,
      password VARCHAR NOT NULL,
      role INTEGER DEFAULT 1,
      date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS Instructors (
      id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL,
      email VARCHAR UNIQUE NOT NULL,
      department VARCHAR
  );

  CREATE TABLE IF NOT EXISTS Courses (
      id SERIAL PRIMARY KEY,
      course_name VARCHAR NOT NULL,
      course_number int NOT NULL,
      course_code VARCHAR NOT NULL,
      area_of_study VARCHAR,
      description TEXT,
      start_time TIME,
      end_time TIME,
      currently_enrolled INT DEFAULT 0,
      semester_offered varchar not null,
      capacity INT,
      building VARCHAR,
      room_num INT,
      instructor_id INT,
      FOREIGN KEY (instructor_id) REFERENCES Instructors(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS Student_Courses (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      course_id INT NOT NULL,
      currently_enrolled BOOLEAN DEFAULT TRUE,
      FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES Courses(id) ON DELETE CASCADE
  );
  """