import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 border ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div className="text-gray-700">{children}</div>;
};

export { Card, CardContent };
