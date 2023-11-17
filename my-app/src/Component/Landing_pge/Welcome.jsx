import React from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";
function Welcome() {
  return (
    <div className="welcome_p">
      <div className="wel_note">
        <h1>Welcome to CRM</h1>
      </div>
      <div>
        <Link to='/list'><button className="wel_btn">View List</button></Link>
      </div>
    </div>
  );
}

export default Welcome;
