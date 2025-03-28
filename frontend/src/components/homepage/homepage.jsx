import React, { useState, useEffect } from "react";
import "./homepage.css";
import FindCoursePopup from "./components/findcourse/popup.jsx";
import logo from "../../assets/Oakland_Golden_Grizzlies_logo.png";
import settingsIcon from "../../assets/settings icon.png";
import profileIcon from "../../assets/profile_icon.png";
import Calendar from "./components/calendar/calendar.jsx";

import "boxicons";

const Homepage = () => {
  const [studentName, setStudentName] = useState("");  // Default name, will be updated

  // Function to fetch student name from the backend
  const getStudentName = async () => {
    try {
      const token = localStorage.getItem("token");  // Get the token from localStorage (or wherever you store it)
      const response = await fetch("http://localhost:5000/fetch_user_by_id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
        },
        body: JSON.stringify({
          user_id: "someUserId",  // Pass the user ID or other necessary parameters
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User fetched successfully:", data);
        setStudentName(data.first_name);  
      } else {
        console.error("Failed to fetch user:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getStudentName();  // Fetch the student name when the component mounts
  }, []);
  const [isFullScreen, setIsFullScreen] = useState(false); // added

  const defaultTerm = "Summer 2025"; // Default term
  // Load term from localStorage or fallback to the default
  const storedTerm = localStorage.getItem("selectedTerm");
  const [selectedTerm, setSelectedTerm] = useState(storedTerm || defaultTerm);

  // Function to toggle the full-screen mode
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Function to update selected term and store it in localStorage
  const handleTermChange = (e) => {
    const newTerm = e.target.value;
    setSelectedTerm(newTerm);
    localStorage.setItem("selectedTerm", newTerm); // Save to localStorage
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
              <img src={logo} alt="Oakland Golden Grizzlies logo" />
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
            <select
              name="term-selection"
              id="term-selection"
              value={selectedTerm}
              onChange={handleTermChange}
            >
              <option value="Summer 2025">Summer 2025</option>
              <option value="Fall 2025">Fall 2025</option>
              <option value="Winter 2026">Winter 2026</option>
              <option value="Fall 2026">Fall 2026</option>
            </select>
            <FindCoursePopup />
            <div className="term-summary">
              <h2>Term Summary</h2>
              <div className="term-summary-content"></div>
            </div>
          </div>
          <div className={`calendar ${isFullScreen ? "full-screen" : ""}`}>
            <Calendar
              toggleFullScreen={toggleFullScreen}
              selectedTerm={selectedTerm}
            />
          </div>
        </div>

        {/* Full screen overlay */}
        {isFullScreen && (
          <div className="overlay">
            <div className="calendar-container-full">
              <Calendar
                toggleFullScreen={toggleFullScreen}
                selectedTerm={selectedTerm}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
