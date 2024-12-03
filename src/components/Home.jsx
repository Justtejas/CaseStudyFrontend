import React from "react";
import { useAuth } from "../context/AuthContext";
import { Footer } from "./Footer";
import Header from "./Header";
import SideNav from "./SideNav";

const Home = () => {
    window.document.title = "Career Crafter";
    const { authUser } = useAuth();

    return (
        <div className="h-full w-full flex flex-col bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-white">
            {/* Header */}
            <Header />

            {/* Layout Container */}
            <div className="flex flex-grow">
                {/* SideNav for logged-in users */}
                {authUser && <SideNav />}

                {/* Main Content */}
                <main className="flex-grow p-8">
                    <div className="max-w-4xl mx-auto bg-white text-gray-800 p-8 rounded-lg shadow-lg text-center">
                        <h1 className="text-4xl font-bold text-blue-600">
                            Welcome to Career Crafter
                        </h1>
                        <p className="text-lg mt-4">
                            Your ultimate platform for job seekers and employers to connect.
                        </p>
                        {!authUser ? (
                            <div className="mt-6 space-x-4">
                                <a
                                    href="/register"
                                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
                                >
                                    Get Started
                                </a>
                                <a
                                    href="/login"
                                    className="px-6 py-2 bg-gray-300 text-gray-800 font-bold rounded hover:bg-gray-400 transition"
                                >
                                    Log In
                                </a>
                            </div>
                        ) : (
                            <div className="mt-6 text-lg">
                                <p className="text-blue-600 font-semibold">
                                    Welcome back, {authUser.employerName || authUser.jobSeekerName}!
                                </p>
                                <p>Let’s continue crafting your career journey.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;

