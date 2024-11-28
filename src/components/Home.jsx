import React from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const { authUser } = useAuth();
    console.log(authUser);

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-blue-600">
                        Welcome, {authUser?.employerName || "Employer"}!
                    </h2>
                    <p className="text-lg text-gray-600 mt-2">
                        This is the home page of the app. You're logged in successfully.
                    </p>
                </div>

                <div className="text-center mt-8">
                    <button className="btn btn-primary py-2 px-4 rounded-lg shadow-lg transition-all hover:bg-blue-700">
                        Explore Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;

