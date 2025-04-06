import React, { useState } from "react";
import "./popup.css";
import searchIcon from "../../../../assets/search_icon.png";


const Popup = ({ togglePopup, selectedTerm, registeredCourses, refreshCourses }) => {
  const [activeTab, setActiveTab] = useState("Term Summary");
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
 
  const filteredTermCourses = registeredCourses.filter(
    (course) => course.semester_offered === selectedTerm
  );
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === "Term Summary") {
      refreshCourses(); // refresh courses when switching to Term Summary
    }
  };
  
  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await fetch("http://localhost:5001/search_course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            id: searchQuery,
            term: selectedTerm,}),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.course) {
          setFilteredCourses([data.course]);
        } else {
          setFilteredCourses([]);
        }

        setShowResults(true);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setFilteredCourses([]);
        setShowResults(true);
      }
    }
  };
  
  const registerForCourse = async (course) => {
    try {
      const token = localStorage.getItem("token"); // make sure the user is logged in
  
      if (!token) {
        alert("You must be logged in to register.");
        return;
      }
      
      const response = await fetch("http://localhost:5001/register_for_class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // JWT for backend to identify the user
        },
        body: JSON.stringify({
          course_id: course.id, // course.id must exist
        }),
      });
  
      const result = await response.json();
      
      if (response.ok) {
        alert("Successfully registered for course!");
        refreshCourses(); // Refresh the registered courses list
      } else if (response.status === 403) {
        alert("This course is full.");
      } else if (response.status === 409) {
        alert(`${result.error}`); // handles duplicate or time conflict
      } else {
        alert(`Registration failed: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during course registration:", error);
      alert("Something went wrong while trying to register.");
    }
  };
  
  
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* Tabs */}
        <div className="tabs">
          <button
            className={activeTab === "Term Summary" ? "active" : ""}
            onClick={() => handleTabClick("Term Summary")}
          >
            Detailed Term Summary
          </button>
          <button
            className={activeTab === "Search" ? "active" : ""}
            onClick={() => handleTabClick("Search")}
          >
            Search
          </button>
          <button
            className={activeTab === "Browse" ? "active" : ""}
            onClick={() => handleTabClick("Browse")}
          >
            Browse
          </button>
          <div className="close" onClick={togglePopup}>
            <i className="bx bx-x"></i>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "Term Summary" && (
            <div className="term-summary-tab">
              <h2>Detailed Term Summary</h2>
              
              {filteredTermCourses.length > 0 ? (
                <ul className="registered-course-list">
                  {filteredTermCourses.map((course, index) => (
                    <li key={index} className="registered-course-item">
                      <strong>{course.course_code}</strong> – {course.course_name}
                      <br />
                      <small>
                        {course.start_time} to {course.end_time} —{" "}
                        {course.building} {course.room_num}
                      </small>
                      <br />
                    `  <small>Term: {course.semester_offered}</small>
                      <br />
                      <small>Enrolled: {course.enrolled_count} / {course.capacity}</small>'
                    </li>
                  ))}
                </ul>
              ) : (
                <p>You are not registered for any courses this term.</p>
              )}
            </div>
          )}


          {activeTab === "Search" && (
            <div className="search-content">
              <div className="search-bar-container">
                <input
                  type="text"
                  placeholder="Search by subject, course #, or title"
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <button className="search-button" onClick={handleSearch}>
                  Search
                </button>
              </div>

              {showResults && (
                <div className="search-results">
                  <div className="results-header">
                    <span className="header-item">Course #</span>
                    <span className="header-item">Title</span>
                    <span className="header-item">Hours</span>
                    <span className="header-item">CRN</span>
                    <span className="header-item">Schedule Type</span>
                    <span className="header-item">Status</span>
                  </div>
                  
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course, index) => (
                      <div className="result-row" key={index}>
                        <span className="result-item">{course.course_code}</span>
                        <span className="result-item">{course.course_name}</span>
                        <span className="result-item">{course.hours}</span>
                        <span className="result-item">{course.crn}</span>
                        <span className="result-item">{course.scheduleType}</span>
                        <span className="result-item">{course.status}</span>
                        <button
                          onClick={() => registerForCourse(course)}
                          className="save-button"
                        >
                          Register
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="no-results">
                      No courses found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "Browse" && (
            <div className="browse-content">
              <div className="schools-container">
                <div className="schools-column">
                  <button className="school-button">School of Engineering and CS</button>
                  <button className="school-button">School of Nursing</button>
                  <button className="school-button">College of Arts</button>
                </div>
                <div className="schools-column">
                  <button className="school-button">School of Health and Science</button>
                  <button className="school-button">School of Business</button>
                  <button className="school-button">School of Education</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
