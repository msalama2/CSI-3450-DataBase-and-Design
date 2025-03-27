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

              {activeTab === "Search" && (
                <div>
                  <h2>Search</h2>
                  <p>Search functionality goes here.</p>
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
