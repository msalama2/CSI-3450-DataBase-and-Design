import "./homepage.css";
import logo from "../../assets/Oakland_Golden_Grizzlies_logo.png";

const Homepage = () => {
  const studentName = "Ben Braniff";

  return (
    <>
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
            <h1 className="name">Hello {studentName}</h1>
            <div className="settings"></div>
            <div className="profile"></div>
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
