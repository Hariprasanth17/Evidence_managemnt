import React from "react";

const Signup = () => {
    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-xl font-bold">Sign Up</h2>
            <input type="email" placeholder="Email" className="mb-2 p-2 border" />
            <input type="password" placeholder="Password" className="mb-2 p-2 border" />
            <button className="bg-green-500 p-2 text-white">Sign Up</button>
        </div>
    );
};

export default Signup;