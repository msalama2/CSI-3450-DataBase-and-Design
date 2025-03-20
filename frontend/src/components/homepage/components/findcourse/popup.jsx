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
        Find Course
        <img src={searchIcon} className="search" alt="can't display image" />
      </button>

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <span className="close" onClick={togglePopup}>
              &times;
            </span>

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

              {activeTab === "Browse" && (
                <div>
                  <h2>Browse</h2>
                  <p>Browse functionality goes here.</p>
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
