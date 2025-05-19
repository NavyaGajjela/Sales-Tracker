// src/components/Home.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"

class Home extends Component {
  render() {
    return (
      <div className="home-bg-container">
        <Navbar />
        <h1 className="home-main-heading">Welcome to AI Sales Tracker</h1>
        <p style={{ textAlign:"center", color:"greenyellow",fontWeight:"#f5be7a" }}>Track your deals and monitor performance easily.</p>
        <p >AI Sales Pipeline Tracker is a smart and intuitive platform designed to streamline your sales process from lead generation
        to deal closure. With built-in AI capabilities, it helps sales teams make data-driven decisions by automatically scoring
         opportunities, suggesting the next best actions, and prioritizing high-value leads. The system offers role-based access, 
         allowing administrators to manage users and system settings, while core users focus on tracking leads, managing opportunities,
          and logging sales activities. Whether you're scaling a startup or optimizing an enterprise sales funnel, our tool gives you 
          the clarity and automation needed to close more deals, faster.
        </p>
          <Link to="/dashboard">
            <button className="go-to-dashboard-button">Go to Dashboard</button>
          </Link>
      </div>
    );
  }
}

export default Home;
