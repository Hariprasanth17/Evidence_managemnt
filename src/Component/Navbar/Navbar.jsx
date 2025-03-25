import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Evidence Portal</h1>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/evidence/list">View Evidence</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
