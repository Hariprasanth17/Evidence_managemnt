import React from "react";

const Input = ({ type = "text", value, onChange, placeholder = "", className = "" }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
    );
};

export { Input };
