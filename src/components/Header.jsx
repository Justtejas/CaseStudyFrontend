import React from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
    const navigate = useNavigate();
    const { authUser } = useAuth();
    const { loading, logout } = useLogout();

    return (
        <header className="bg-gradient-to-r from-slate-800 to-purple-900 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-8">
                <h1
                    className="text-4xl font-bold cursor-pointer hover:text-purple-300 transition"
                    onClick={() => navigate("/")}
                >
                    CareerCrafter
                </h1>

                <nav className="flex gap-8">
                    <button
                        onClick={() => navigate("/")}
                        className="text-3xl font-medium hover:text-purple-300 transition"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigate("/about")}
                        className="text-3xl font-medium hover:text-purple-300 transition"
                    >
                        About
                    </button>
                </nav>

                <div className="flex gap-4">
                    {authUser?.userName ? (
                        !loading ? (
                            <div className="mt-2">
                                <button
                                    className="px-6 py-4 text-2xl -mr-32 bg-zinc-500 text-white rounded-lg shadow-lg transition-transform transform active:scale-95 hover:bg-blue-600"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center mt-2">
                                <div className="spinner-border animate-spin text-blue-600" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )
                    ) : (
                        <>
                            <button
                                onClick={() => navigate("/login")}
                                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition"
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => navigate("/registerJobSeeker")}
                                className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
                            >
                                Register for Job Searching
                            </button>
                            <button
                                onClick={() => navigate("/registerEmployer")}
                                className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
                            >
                                Register as Employer
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

