import React, { useState, useEffect, useRef } from "react";
import "./homepage.css";
import Popup from "./components/findcourse/popup.jsx";
import logo from "../../assets/Oakland_Golden_Grizzlies_logo.png";
import settingsIcon from "../../assets/settings icon.png";
import profileIcon from "../../assets/profile_icon.png";
import Calendar from "./components/calendar/calendar.jsx";
import "boxicons";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  // users data from fetch calls
  const [studentName, setStudentName] = useState("Student"); // Default name, will be updated
  // change later
  const [termSummary, setTermSummary] = useState(""); // idk what this is going to be

  // full screen
  const [isCalendarFullScreen, setIsCalendarFullScreen] = useState(false);
  const [isPopupFullScreen, setIsPopupFullScreen] = useState(false);

  // Mina's code
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // term selection
  const defaultTerm = "Summer 2025"; // Default term
  // Load term from localStorage or fallback to the default
  const storedTerm = localStorage.getItem("selectedTerm");
  const [selectedTerm, setSelectedTerm] = useState(storedTerm || defaultTerm);

  // resizer slider
  const [sidebarWidth, setSidebarWidth] = useState(30);
  // const [startX, setStartX] = useState(null);
  // const [startWidth, setStartWidth] = useState(null);
  const startX = useRef(null);
  const startWidth = useRef(null);

  const getStudentName = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage (or wherever you store it)
      const response = await fetch("http://localhost:5001/fetch_user_by_id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
        body: JSON.stringify({
          user_id: "someUserId", // Pass the user ID or other necessary parameters
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User fetched successfully:", data);
        setStudentName(data.first_name);
        setStudentName(data.first_name);
      } else {
        console.error("Failed to fetch user:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Function to fetch students term summary from the backend
  const getSummary = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage (or wherever you store it)
      const response = await fetch("http://localhost:5001/get_course_summary", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Summary Fetched Successfuly", data);
        // setTermSummary();
      } else {
        console.error("Failed to fetch summary:", data.message);
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  useEffect(() => {
    getStudentName(); // Fetch the student name when the component mounts
    getSummary(); // Fetch the term summary
  }, []);

  // for resizer
  const handleMouseDown = (event) => {
    event.preventDefault();
    startX.current = event.clientX;
    startWidth.current = sidebarWidth;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (event) => {
    if (startX.current === null || startWidth.current === null) return;
    const deltaX = event.clientX - startX.current; // Difference from the starting point
    const newWidth = startWidth.current + (deltaX / window.innerWidth) * 100; // Convert to percentage
    if (newWidth >= 20 && newWidth <= 50) {
      setSidebarWidth(newWidth);
    }
  };
  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    startX.current = null;
    startWidth.current = null;
  };

  // Function to toggle the full-screen mode for calendar
  const toggleCalendarFullScreen = () => {
    setIsCalendarFullScreen(!isCalendarFullScreen);
  };

  // Function to toggle the full-screen mode for popup
  const togglePopupFullScreen = () => {
    setIsPopupFullScreen(!isPopupFullScreen);
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
            <i
              onClick={() => setShowPopup(true)}
              class="bx bxs-user-rectangle profile"
            ></i>
          </div>
        </div>

        <div className="body">
          <div className="sidebar" style={{ flex: `0 0 ${sidebarWidth}%` }}>
            {/* term selection */}
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

            {/* find course button */}
            <button onClick={togglePopupFullScreen} className="find-course">
              <p>Find Course</p>
              <i class="bx bx-search-alt-2 search"></i>
            </button>

            {/* term summary */}
            <div className="term-summary">
              <div className="term-summary-bar">
                <h2>Term Summary</h2>
                <button onClick={togglePopupFullScreen}>
                  <i className="bx bx-expand-alt"></i>
                </button>
              </div>
              <div className="term-summary-content"></div>
            </div>
          </div>

          {/* Resizer */}
          <div className="resizer" onMouseDown={handleMouseDown}>
            <i class="bx bx-chevrons-left"></i>
            <i class="bx bx-chevrons-right"></i>
          </div>

          {/* calendar */}
          <div
            className={`calendar ${isCalendarFullScreen ? "full-screen" : ""}`}
          >
            <Calendar
              toggleCalendarFullScreen={toggleCalendarFullScreen}
              selectedTerm={selectedTerm}
            />
          </div>
        </div>

        {/* Full screen overlay */}
        {isCalendarFullScreen && (
          <div className="overlay">
            <div className="calendar-container-full">
              <Calendar
                toggleCalendarFullScreen={toggleCalendarFullScreen}
                selectedTerm={selectedTerm}
              />
            </div>
          </div>
        )}

        {/* popup overlay */}
        {isPopupFullScreen && (
          // <FindCoursePopup />
          <Popup
            selectedTerm={selectedTerm}
            togglePopup={togglePopupFullScreen}
          />
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
