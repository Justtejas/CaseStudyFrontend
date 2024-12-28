import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
    const navigate = useNavigate();
    const { authUser } = useAuth();
    const { loading, logout } = useLogout();

    return (
        <header className="bg-gradient-to-r from-slate-800 to-purple-900 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-8 px-8">
                <nav className="flex gap-12">
                    <h1
                        className="text-4xl -ml-36 font-bold cursor-pointer hover:text-purple-300 transition"
                        onClick={() => navigate("/")}
                    >
                        CareerCrafter
                    </h1>
                    <Link
                        to={"/"}
                        className="text-3xl font-medium hover:text-purple-300 transition"
                    >
                        Home
                    </Link>
                    <Link
                        to={"/about"}
                        className="text-3xl font-medium hover:text-purple-300 transition"
                    >
                        About
                    </Link>
                </nav>

                <div className="flex gap-4">
                    {authUser?.userName ? (
                        !loading ? (
                            <div className="mt-2">
                                <button
                                    className="px-6 py-6 text-2xl -mr-32 bg-zinc-500 text-white rounded-lg shadow-lg transition-transform transform active:scale-95 hover:bg-blue-600"
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
                            <Link
                                to={"/login"}
                                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition"
                            >
                                Log In
                            </Link>
                            <Link
                                to={"/registerJobSeeker"}
                                className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
                            >
                                Register for Job Searching
                            </Link>
                            <Link
                                to={"/registerEmployer"}
                                className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
                            >
                                Register as Employer
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

