import React, { useState } from "react";

const Login = () => {
    const [userType, setUserType] = useState("public");

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-xl font-bold">Login</h2>
            <select onChange={(e) => setUserType(e.target.value)} className="mb-4">
                <option value="public">Public</option>
                <option value="judge">Judge</option>
                <option value="police">Police</option>
            </select>
            <input type="email" placeholder="Email" className="mb-2 p-2 border" />
            <input type="password" placeholder="Password" className="mb-2 p-2 border" />
            {userType !== "public" && (
                <>
                    <input type="text" placeholder="Public Key" className="mb-2 p-2 border" />
                    <input type="text" placeholder="Private Key" className="mb-2 p-2 border" />
                </>
            )}
            <button className="bg-blue-500 p-2 text-white">Login</button>
        </div>
    );
};

export default Login;