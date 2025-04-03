import React from "react";
import { useState, useEffect, useRef } from "react";
import "./calendar.css";
import Day from "./components/day";
import TimeLegend from "./components/TimeLegend";

function Calendar({ toggleCalendarFullScreen, selectedTerm }) {
  const divRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [cellHeight, setCellHeight] = useState(23);
  const [cellWidth, setCellWidth] = useState(100);
  const [initialized, setInitialized] = useState(false); // Track if initial values have been set

  useEffect(() => {
    // Function to update width
    const updateSize = () => {
      if (divRef.current) {
        const newWidth = divRef.current.offsetWidth;
        const newHeight = divRef.current.offsetHeight;

        setWidth(newWidth);
        setHeight(newHeight);

        if (!initialized) {
          // Only set these values once on mount
          setCellWidth(newWidth / 8);
          setCellHeight(newHeight / 24);
          setInitialized(true); // Prevent further overrides
        }

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
        document.documentElement.style.setProperty(
          "--custom-cell-width",
          `${cellWidth}px`
        ); // Update column width
      }
    };

    updateSize();
    // Update width on window resize
    window.addEventListener("resize", updateSize);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [cellHeight, cellWidth]); // Re-run the effect when the cellHeight changes

  return (
    <div className="calendar-main">
      <div className="calendar-topbar">
        <h1>{selectedTerm} Calendar</h1>
        <button onClick={toggleCalendarFullScreen}>
          <i className="bx bx-expand-alt"></i>
        </button>
      </div>
      <div className="calendar-content-outer">
        <div className="day-labels">
          <div className="empty"></div>

          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="day-label">
              <h2 className="day-label">{day}</h2>
            </div>
          ))}
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

      {/* Slider to adjust cell height and width */}
      <div className="slider-container">
        <label htmlFor="height-slider">Height</label>
        <input
          type="range"
          id="height-slider"
          min="23"
          max="100"
          value={cellHeight}
          onChange={(e) => setCellHeight(Number(e.target.value))}
        />
      </div>

      <div className="slider-container">
        <label htmlFor="width-slider">Width</label>
        <input
          type="range"
          id="width-slider"
          min="55"
          max="200"
          value={cellWidth}
          onChange={(e) => setCellWidth(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default Calendar;
