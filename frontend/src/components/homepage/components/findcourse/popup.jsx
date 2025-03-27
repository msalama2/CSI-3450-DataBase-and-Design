import React, { useState } from "react";
import "./popup.css";
import searchIcon from "../../../../assets/search_icon.png";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Term Summary"); // Default active tab

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowResults(true);
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

                      <div className="result-row">
                        <span className="result-item">MATH</span>
                        <span className="result-item">101</span>
                        <span className="result-item">Calculus I</span>
                        <span className="result-item">Intro to Calculus</span>
                        <span className="result-item">3</span>
                        <span className="result-item">12345</span>
                        <span className="result-item">Lecture</span>
                        <span className="result-item">Open</span>
                      </div>
        
                      {/* Add more result rows as needed */}
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
