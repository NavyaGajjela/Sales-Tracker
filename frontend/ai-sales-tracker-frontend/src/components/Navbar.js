import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="nav-bg-container">
      <Link className="c-list" to="/">
        <h1 className="logo"><span>S</span>ales <span>T</span>racker</h1>
      </Link>
      <nav className="nav-container">
        <Link className="c-list" to="/add-customers" >Add New Customer</Link>
        <Link className="c-list" to="/customers-list" >Customers List</Link>
        <Link className="c-list" to="/deals-list">Deals List</Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default Navbar;
