import React from "react";
import { useState, useEffect, useRef } from "react";
import "./calendar.css";
import Day from "./components/day";
import TimeLegend from "./components/TimeLegend";

function Calendar() {
  const divRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [cellHeight, setCellHeight] = useState(21); // New state for the cell height

  useEffect(() => {
    // Function to update width
    const updateSize = () => {
      if (divRef.current) {
        const newWidth = divRef.current.offsetWidth;
        const newHeight = divRef.current.offsetHeight;
        setWidth(newWidth);
        setHeight(newHeight);
        document.documentElement.style.setProperty(
          "--custom-width",
          `${newWidth}px`
        );
        document.documentElement.style.setProperty(
          "--custom-height",
          `${newHeight}px`
        );
        document.documentElement.style.setProperty(
          "--custom-cell-height",
          `${cellHeight}px` // Update the CSS variable for cell height
        );
        // console.log("Updated CSS Variable --custom-width:", newWidth);
      }
    };
    // Get width on mount
    updateSize();
    // Update width on window resize
    window.addEventListener("resize", updateSize);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [cellHeight]); // Re-run the effect when the cellHeight changes

  return (
    <div className="calendar-main">
      <div className="calendar-topbar">
        <h1>Summer 2025 Calendar</h1>
        <button>
          <i class="bx bx-expand-alt"></i>
        </button>
      </div>
      <div className="calendar-content-outer">
        <div className="day-labels">
          <div className="legend-hour empty-grid day-label"></div>
          <div className="empty-grid day-label">
            <h2 className="day-label">Sun</h2>
          </div>
          <div className="empty-grid day-label">
            <h2 className="day-label">Mon</h2>
          </div>
          <div className="empty-grid day-label">
            <h2 className="day-label">Tue</h2>
          </div>
          <div className="empty-grid day-label">
            <h2 className="day-label">Wed</h2>
          </div>
          <div className="empty-grid day-label">
            <h2 className="day-label">Thu</h2>
          </div>
          <div className="empty-grid day-label">
            <h2 className="day-label">Fri</h2>
          </div>
          <div className="empty-grid day-label">
            <h2 className="day-label">Sat</h2>
          </div>
        </div>
        <div ref={divRef} className="calendar-content">
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
      
      {/* Slider to adjust cell height */}
      <div className="slider-container">
        {/* <label htmlFor="height-slider">Adjust Cell Height:</label> */}
        <input
          type="range"
          id="height-slider"
          min="21"
          max="100"
          value={cellHeight}
          onChange={(e) => setCellHeight(Number(e.target.value))}
        />
        <span>{cellHeight}px</span>
      </div>
    </div>
  );
}

export default Calendar;
