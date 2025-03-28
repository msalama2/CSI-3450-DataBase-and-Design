import React from "react";
import "./calendar.css";
import Day from "./components/day";
import TimeLegend from "./components/TimeLegend";

function Calendar() {
  return (
    <>
      <div className="calendar-main">
        <div className="calendar-topbar">
          <h1>Summer 2025 Calendar</h1>
          <button>fullscreen</button>
        </div>
        <div className="calendar-content">
          <TimeLegend />
          <Day />
          <Day />
          <Day />
          <Day />
          <Day />
          <Day />
          <Day />
        </div>
      </div>
    </>
  );
}

export default Calendar;
