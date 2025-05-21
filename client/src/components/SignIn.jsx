import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, formData);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Error signing in");
        }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>
            {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
            <div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-300 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg"
                    >
                        Sign In
                    </button>
                </div>
                <p className="text-gray-300 text-center">
                    Don't have an account?{" "}
                    <Link to="/" className="text-blue-400 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
