import "./homepage.css";
import FindCoursePopup from "./components/findcourse/popup.jsx";
import logo from "../../assets/Oakland_Golden_Grizzlies_logo.png";
import settingsIcon from "../../assets/settings icon.png";
import profileIcon from "../../assets/profile_icon.png";

import "boxicons";

const Homepage = () => {
  const studentName = "Ben Braniff";

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
              <img src={logo} alt="can't display image" />
            </div>
            <h1 className="title">Student Registration</h1>
          </div>
          <div className="right">
            <h1 className="name">Hello {studentName}!</h1>
            <i class="bx bxs-cog settings"></i>
            <i class="bx bxs-face profile"></i>
          </div>
        </div>
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

        <div className="body">
          <div className="sidebar">
            <select name="cars" id="cars">
              <option value="option1">Summer 2025</option>
              <option value="option2">Fall 2025</option>
              <option value="option3">Winter 2026</option>
              <option value="option4">Fall 2026</option>
            </select>
            <FindCoursePopup />
            <div className="term-summary">Term Summary</div>
          </div>
          <div className="calendar"></div>
        </div>
      </div>
    </>
  );
};

export default Homepage;

// homepage
// top bar (within homepage)
// calendar (within homepage)
// calendar fullscreen page
// search page
// term-summary page
// browse page
// bookmarks page
