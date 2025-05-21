import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../components/SignUp";

const Home = () => {
    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Welcome to Auth App</h1>
            <div className="mb-6">
                <SignUp />
            </div>
            <p className="text-gray-300 text-center">
                Already have an account?{" "}
                <Link to="/signin" className="text-blue-400 hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default Home;
