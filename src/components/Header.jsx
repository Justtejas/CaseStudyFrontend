import React from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
    const navigate = useNavigate();
    const { authUser } = useAuth();
    const { logout } = useLogout();

    return (
        <header className="bg-slate-900 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <h1
                    className="text-2xl font-bold cursor-pointer hover:text-purple-400"
                    onClick={() => navigate("/Home")}
                >
                    CareerCrafter
                </h1>

                {/* Navigation Links */}
                <nav className="flex gap-6">
                    <button
                        onClick={() => navigate("/Home")}
                        className="hover:text-purple-400 transition"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigate("/BrowseJobs")}
                        className="hover:text-purple-400 transition"
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => navigate("/About")}
                        className="hover:text-purple-400 transition"
                    >
                        About
                    </button>
                </nav>

                {/* Auth Actions */}
                <div className="flex gap-4">
                    {authUser?.userId ? (
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition"
                        >
                            Log Out
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate("/Profile")}
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition"
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => navigate("/registerJobSeeker")}
                                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

