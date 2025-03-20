import "./homepage.css";
import FindCoursePopup from "./components/findcourse/popup.jsx";
import logo from "../../assets/Oakland_Golden_Grizzlies_logo.png";
import settingsIcon from "../../assets/settings icon.png";
import profileIcon from "../../assets/profile_icon.png";

const Homepage = () => {
  const studentName = "Ben Braniff";

  return (
    <>
      {/* topbar */}
      <div className="homepage">
        <div className="topbar">
          <div className="left">
            <div className="icon">
              <img src={logo} alt="can't display image" />
            </div>
            <h1 className="title">Student Registration</h1>
          </div>
          <div className="right">
            <h1 className="name">Hello {studentName}!</h1>
            <div className="icon settings">
              <img src={settingsIcon} alt="can't display image" />
            </div>
            <div className="icon profile">
              <img src={profileIcon} alt="can't display image" />
            </div>
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
