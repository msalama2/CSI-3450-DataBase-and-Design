import React, { useState, useEffect } from "react";
import "./homepage.css";
import FindCoursePopup from "./components/findcourse/popup.jsx";
import logo from "../../assets/Oakland_Golden_Grizzlies_logo.png";
import settingsIcon from "../../assets/settings icon.png";
import profileIcon from "../../assets/profile_icon.png";
import Calendar from "./components/calendar/calendar.jsx";
import "boxicons";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [studentName, setStudentName] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const getStudentName = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/fetch_user_by_id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: "someUserId",
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
    getStudentName();
  }, []);

  const defaultTerm = "Summer 2025";
  const storedTerm = localStorage.getItem("selectedTerm");
  const [selectedTerm, setSelectedTerm] = useState(storedTerm || defaultTerm);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleTermChange = (e) => {
    const newTerm = e.target.value;
    setSelectedTerm(newTerm);
    localStorage.setItem("selectedTerm", newTerm);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />

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
            <i className="bx bxs-cog settings"></i>
            <button onClick={() => setShowPopup(true)} className="icon-button">
              <i className="bx bxs-user profile"></i>
            </button>
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

        {/* Logout Confirmation Popup */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <p>Do you want to logout?</p>
              <div style={{ marginTop: "10px" }}>
                <button onClick={handleLogout}>Yes</button>
                <button onClick={() => setShowPopup(false)}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
