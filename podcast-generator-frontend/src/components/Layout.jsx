// src/components/Layout.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Make sure your CSS is imported here

const Layout = ({ children }) => {
  return (
    <div>
      {/* Header */}
      <header className="header">
        <h1>
          <span className="podcast">P</span>
          <span className="odcast">odcast</span>
          <span className="gen">Gen</span>
        </h1>
      </header>

      {/* Main content */}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
