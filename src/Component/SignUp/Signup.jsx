import React, { useState } from "react";
import "./Signup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email format";
        if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Phone must be 10 digits";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert("Signup successful!");
        }
    };

    return (
        <div className="body-container">
            <div className="signup-container">
                <h2 className="signup-title">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                   
                        <div className="input-group">
                            <input type="text" name="firstName" placeholder="First Name" className="signup-input"
                                value={formData.firstName} onChange={handleChange} />
                            {errors.firstName && <span className="error">{errors.firstName}</span>}
                        </div>
                        <div className="input-group">
                            <input type="text" name="lastName" placeholder="Last Name" className="signup-input"
                                value={formData.lastName} onChange={handleChange} />
                            {errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>
                

                    <input type="email" name="email" placeholder="Email" className="signup-input"
                        value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}

                    <input type="text" name="phone" placeholder="Phone Number" className="signup-input"
                        value={formData.phone} onChange={handleChange} />
                    {errors.phone && <span className="error">{errors.phone}</span>}

                    {/* Password Field with Eye Icon */}
                    <div className="password-container">
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="signup-input"
                            value={formData.password} onChange={handleChange} />
                        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.password && <span className="error">{errors.password}</span>}

                    {/* Confirm Password Field with Eye Icon */}
                    <div className="password-container">
                        <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" className="signup-input"
                            value={formData.confirmPassword} onChange={handleChange} />
                        <span className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
            </div>

            <div className="wave-container">
                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
            </div>
        </div>
    );
};

export default Signup;
