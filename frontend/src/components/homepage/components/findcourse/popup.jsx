import React, { useState } from "react";
import "./popup.css";
import searchIcon from "../../../../assets/search_icon.png";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Term Summary");
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  
  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await fetch("http://localhost:5001/search_course", {
          method: "POST",  // Use POST to send JSON
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: searchQuery }), 
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log(data);

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
  

  return (
    <div>
      <button onClick={togglePopup} className="find-course">
        <p>Find Course</p>
        <i class="bx bx-search-alt-2 search"></i>
      </button>

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            {/* Tabs */}
            <div className="tabs">
              <button
                className={activeTab === "Term Summary" ? "active" : ""}
                onClick={() => handleTabClick("Term Summary")}
              >
                Term Summary
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
              <button
                className={activeTab === "Bookmarks" ? "active" : ""}
                onClick={() => handleTabClick("Bookmarks")}
              >
                Bookmarks
              </button>
              <div className="close" onClick={togglePopup}>
                <i className="bx bx-x"></i>
              </div>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === "Term Summary" && (
                <div>
                  <h2>Term Summary</h2>
                  <p>Details about the term summary.</p>
                </div>
              )}

              {activeTab === 'Search' && (
                <div className="search-content">
                  <div className="search-bar-container">
                    <input
                      type="text"
                      placeholder="Search by subject, course #, or title"
                      className="search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button className="search-button" onClick={handleSearch}>
                      Search
                    </button>
                </div>

                  {showResults && (
                    <div className="search-results">
                      <div className="results-header">
                        <span className="header-item">Subject</span>
                        <span className="header-item">Course #</span>
                        <span className="header-item">Title</span>
                        <span className="header-item">Details</span>
                        <span className="header-item">hours</span>
                        <span className="header-item">CRN</span>
                        <span className="header-item">Schedule Type</span>
                        <span className="header-item">Status</span>
                      </div>

                      {filteredCourses.length > 0 ? (
                        filteredCourses.map((course, index) => (
                          <div className="result-row" key={index}>
                            <span className="result-item">{course.area_of_study}</span>
                            <span className="result-item">{course.course_code}</span>
                            <span className="result-item">{course.course_name}</span>
                            <span className="result-item">{course.description}</span>
                            <span className="result-item">{course.hours}</span>
                            <span className="result-item">{course.crn}</span>
                            <span className="result-item">{course.scheduleType}</span>
                            <span className="result-item">{course.status}</span>
                            <button className="add-button">Add</button>
                          </div>
                        ))
                      ) : (
                        <div className="no-results">No courses found matching "{searchQuery}"</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'Browse' && (
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

              {activeTab === "Bookmarks" && (
                <div>
                  <h2>Bookmarks</h2>
                  <p>Bookmarks functionality goes here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
