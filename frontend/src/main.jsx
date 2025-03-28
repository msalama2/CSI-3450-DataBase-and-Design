import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Homepage from "./components/homepage/homepage.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Homepage />
  </StrictMode>
);
