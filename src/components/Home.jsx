import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";

const Home = () => {
    const { authUser } = useAuth();
    const navigate = useNavigate();
    const { loading, logout } = useLogout();

    const toNavigate = () => {
        navigate("/joblisting");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-sky-300">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-blue-600">
                        Welcome, {authUser?.employerName || authUser?.jobSeekerName}!
                    </h2>
                    <p className="text-lg text-gray-600 mt-2">
                        This is the home page of the app. You're logged in successfully.
                    </p>
                </div>
                <div className="text-center mt-8">
                    <button
                        className="w-full py-2 px-4 bg-zinc-500 text-white rounded-lg shadow-lg transition-transform transform active:scale-95 hover:bg-blue-600"
                        onClick={toNavigate}
                    >
                        Job Listings
                    </button>
                </div>

                {!loading ? (
                    <div className="text-center mt-8">
                        <button
                            className="w-full py-2 px-4 bg-zinc-500 text-white rounded-lg shadow-lg transition-transform transform active:scale-95 hover:bg-blue-600"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-center items-center mt-8">
                        <div className="spinner-border animate-spin text-blue-600" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

