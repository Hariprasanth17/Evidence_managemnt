import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for password toggle
import "./Login.css";

const Login = () => {
    const [userType, setUserType] = useState("public");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false); // State for Police pop-up
    const navigate = useNavigate();

    const handleLogin = () => {
        setErrorMessage(""); // Reset error message

        if (!email || !password) {
            setErrorMessage("Email and Password are required.");
            return;
        }

        if (userType === "public") {
            if (email === "public@gmail.com" && password === "password") {
                navigate("/evidence/list");
            } else {
                setErrorMessage("Invalid Public Login Credentials");
            }
        } else if (userType === "judge" || userType === "police") {
            if (!publicKey || !privateKey) {
                setErrorMessage("Public and Private Keys are required for authentication.");
                return;
            }

            if (
                (email === "judge@gmail.com" && password === "judgepass" && userType === "judge" &&
                    publicKey === "judgePublicKey123" && privateKey === "judgePrivateKey456")
            ) {
                navigate("/evidence/view");
            } else if (
                email === "police@gmail.com" && password === "policepass" && userType === "police" &&
                publicKey === "policePublicKey123" && privateKey === "policePrivateKey456"
            ) {
                setShowPopup(true); // Show modal for police login
            } else {
                setErrorMessage(`Invalid ${userType} Login Credentials or Keys`);
            }
        }
    };

    return (
        <div className="login-page">
            {/* Wave Background */}
            <div className="wave-container">
                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
            </div>

            {/* Navbar */}
            <div className="navbar">
                <h1 className="navbar-title">Login To Continue</h1>
            </div>

            {/* Login Container */}
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                <div className="login-form">
                    <div className="input-container">
                        <select onChange={(e) => setUserType(e.target.value)} className="login-select">
                            <option value="public">Public</option>
                            <option value="judge">Judge</option>
                            <option value="police">Police</option>
                        </select>
                    </div>

                    <div className="input-container">
                        <input
                            type="email"
                            required
                            className="login-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
                    </div>

                    <div className="input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Password</label>
                        <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {userType !== "public" && (
                        <>
                            <div className="input-container">
                                <input
                                    type="text"
                                    required
                                    className="login-input"
                                    value={publicKey}
                                    onChange={(e) => setPublicKey(e.target.value)}
                                />
                                <label>Public Key</label>
                            </div>

                            <div className="input-container">
                                <input
                                    type="text"
                                    required
                                    className="login-input"
                                    value={privateKey}
                                    onChange={(e) => setPrivateKey(e.target.value)}
                                />
                                <label>Private Key</label>
                            </div>
                        </>
                    )}

                    {errorMessage && <p className="error-text">{errorMessage}</p>}

                    <button className="login-button" onClick={handleLogin}>Login</button>
                </div>
            </div>

            {/* Popup for Police Login */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Choose an action</h3>
                        <button className="popup-button" onClick={() => navigate("/evidence/upload")}>
                            Upload Evidence
                        </button>
                        <button className="popup-button" onClick={() => navigate("/evidence/view")}>
                            View Evidence
                        </button>
                        <button className="popup-close" onClick={() => setShowPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
