import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import { StrictMode } from "react";
import "./index.css" 
import '@fortawesome/fontawesome-free/css/all.min.css';


import App from "./App"; // Import the main App component

  
createRoot(document.getElementById("info")).render(
    <StrictMode>
      <App />
     </StrictMode>
  );
  