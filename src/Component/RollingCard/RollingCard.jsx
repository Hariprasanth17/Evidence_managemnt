import React from "react";
import "./RollingCard.css";

// Correct imports from assets folder
import img1 from "../../assets/images.jpeg";
import img2 from "../../assets/images1.jpeg";
import img3 from "../../assets/images3.jpeg";
import img4 from "../../assets/images4.jpeg";
import img5 from "../../assets/images5.jpeg";
import img6 from "../../assets/Untitled.jpeg";
import img7 from "../../assets/Untitled1.jpeg";


const images = [img1, img2, img3, img4, img5, img6, img7];

const RollingCard = () => {
    return (
        <div className="banner">
            <div className="slider" style={{ "--numitem": images.length }}>
                {images.map((img, index) => (
                    <div className="item" style={{ "--position": index + 1 }} key={index}>
                        <img src={img} alt={`image_${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RollingCard;
