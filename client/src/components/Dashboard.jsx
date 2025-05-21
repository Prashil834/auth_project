import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/users`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(res.data);
            } catch (e) {
                setError(e.response?.data?.message || "Error fetching users");
            }
        };
        fetchUsers();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Logout
                </button>
            </div>
            {error && <p className="text-red-400 mb-4">{error}</p>}
            {users.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="p-3 text-gray-300">Name</th>
                                <th className="p-3 text-gray-300">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-t border-gray-600">
                                    <td className="p-3 text-white">{user.name}</td>
                                    <td className="p-3 text-white">{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-300 text-center">No User Found</p>
            )}
        </div>
    );
};

export default Dashboard;
