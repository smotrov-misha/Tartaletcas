import "./NavigationBar.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function NavigationBar() {
  const location = useLocation();

  return (
    <div className="navigation">
      <div className="nav-bar">
        <Link to={`menus`}>
          <button
            className={location.pathname === "/menus" ? "active-button" : ""}
          >
            Menus
          </button>
        </Link>
        <Link to={`dishes`}>
          <button
            className={location.pathname === "/dishes" ? "active-button" : ""}
          >
            Dishes
          </button>
        </Link>
        <Link to={`history`}>
          <button
            className={location.pathname === "/history" ? "active-button" : ""}
          >
            History
          </button>
        </Link>
      </div>
      <hr className="nav-line" />
    </div>
  );
}

export default NavigationBar;
