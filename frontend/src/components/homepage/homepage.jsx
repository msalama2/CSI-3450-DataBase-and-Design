import "./homepage.css";
import { useState } from "react";
import FindCoursePopup from "./components/findcourse/popup.jsx";
import logo from "../../assets/Oakland_Golden_Grizzlies_logo.png";
import settingsIcon from "../../assets/settings icon.png";
import profileIcon from "../../assets/profile_icon.png";
import Calendar from "./components/calendar/calendar.jsx";

import "boxicons";

const Homepage = () => {
  const studentName = "Ben Braniff";
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false); // added

  // Function to toggle the full-screen mode
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />

      {/* 
        body
            left sidebar
                term dropdown
                find course button
                term summary
            right calendar
                (tiling, use stuff from life calendar)
                columns (days of week)
                    rows (times of day)
        */}
      <div className="homepage">
        <div className="topbar">
          <div className="left">
            <div className="logo">
              <img src={logo} alt="can't display image" />
            </div>
            <h1 className="title">Student Registration</h1>
          </div>
          <div className="right">
            <h1 className="name">👋 Hello {studentName}!</h1>
            <i class="bx bxs-cog settings"></i>
            <i class="bx bxs-user profile"></i>
          </div>
        </div>
        <div className="body">
          <div className="sidebar">
            <select name="term-selection" id="term-selection">
              <option value="option1">Summer 2025</option>
              <option value="option2">Fall 2025</option>
              <option value="option3">Winter 2026</option>
              <option value="option4">Fall 2026</option>
            </select>
            <FindCoursePopup />
            <div className="term-summary">
              <h2>Term Summary</h2>
              <div className="term-summary-content"></div>
            </div>
          </div>
          <div
            className={`calendar ${
              isFullScreen ? "full-screen" : ""
            }`}
          >
            <Calendar toggleFullScreen={toggleFullScreen} />
          </div>
        </div>
        
        {/* Full screen overlay */}
        {isFullScreen && (
          <div className="overlay">
            <div className="calendar-container-full">
              <Calendar toggleFullScreen={toggleFullScreen} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
