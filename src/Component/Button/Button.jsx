import React from "react";

const Button = ({ children, variant = "primary", onClick, className = "" }) => {
    const baseStyles = "px-4 py-2 rounded-md font-medium transition";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
    };

    return ( 
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export { Button };
