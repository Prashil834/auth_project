import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({ name: "", email: "", password: "", general: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ name: "", email: "", password: "" });
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData);
            navigate("/signin");
        } catch (e) {
            if (e.response?.data?.errors) {
                const fieldErrors = { name: "", email: "", password: "", general: "" };
                e.response.data.errors.forEach(({ field, message }) => {
                    fieldErrors[field] = message;
                });
                setErrors(fieldErrors);
            } else {
                setErrors({
                    name: "",
                    email: "",
                    password: "",
                    general: e.response?.data?.message || "Error signing up",
                });
            }
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign Up</h2>
            {errors.general && <p className="text-red-400 mb-4 text-center">{errors.general}</p>}

            <div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-300 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <p className="text-red-400 mt-1 text-sm">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-400 mt-1 text-sm">{errors.email}</p>}
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-300 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-400 mt-1 text-sm">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
