import React from "react";
import "./RollingCard.css";

import img1 from "../../assets/"
import img2 from "../../assets/images"
import img3 from "../../assets/images"
import img4 from "../../assets/images"
import img5 from "../../assets/images"
import img6 from "../../assets/images"
import img7 from "../../assets/images"
import img8 from "../../assets/images"

const images = [
    "",
    "/assets/dragon_2.jpg",
    "/assets/dragon_3.jpg",
    "/assets/dragon_4.jpg",
    "/assets/dragon_5.jpg",
    "/assets/dragon_6.jpg",
    "/assets/dragon_7.jpg",
    "/assets/dragon_8.jpg",
    "/assets/dragon_9.jpg",
    "/assets/dragon_10.jpg",
    "/assets/dragon_11.jpg" // New image added
];

const RollingCard = () => {
    return (
        <div className="banner">
            <div className="slider" style={{ "--numitem": images.length }}>
                {images.map((img, index) => (
                    <div className="item" style={{ "--position": index + 1 }} key={index}>
                        <img src={img1} alt={`dragon_${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RollingCard;
