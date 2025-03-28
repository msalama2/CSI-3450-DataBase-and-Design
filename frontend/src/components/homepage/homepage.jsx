import React, { useState, useEffect } from "react";
import "./homepage.css";
import FindCoursePopup from "./components/findcourse/popup.jsx";
import logo from "../../assets/Oakland_Golden_Grizzlies_logo.png";
import settingsIcon from "../../assets/settings icon.png";
import profileIcon from "../../assets/profile_icon.png";

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

  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />

      {/* topbar */}
      <div className="homepage">
        <div className="topbar">
          <div className="left">
            <div className="logo">
              <img src={logo} alt="Oakland Golden Grizzlies logo" />
            </div>
            <h1 className="title">Student Registration</h1>
          </div>
          <div className="right">
            <h1 className="name">Hello {studentName}!</h1>
            <i className="bx bxs-cog settings"></i>
            <i className="bx bxs-face profile"></i>
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
          <div className="calendar"></div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
