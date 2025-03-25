import React from "react";
import Navbar from "../Navbar/Navbar";
import RollingCard from "../RollingCard/RollingCard";
import "./Home.css";

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="home-container">
                <div className="home-container-text">
                    <h1 className="home-title">Welcome to the Evidence Portal</h1>
                    <p className="home-description">A secure platform for managing legal evidence.</p>
                </div>
                {/* Rolling Card Effect */}
                <RollingCard />
            </div>
          
            {/* Wave Animation at the Bottom */}
            <div className="wave-container">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
        </div>
    );
};

export default Home;
