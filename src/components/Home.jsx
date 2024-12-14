import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Footer } from "./Footer";
import Header from "./Header";
import SideNav from "./SideNav";

const Home = () => {
    window.document.title = "Career Crafter";
    const { authUser } = useAuth();
    console.log(authUser)

    return (
        <div className="h-full w-full flex flex-col bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-white">
            <Header />

            <div className="flex flex-grow">
                {authUser && <SideNav />}

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
                                <Link
                                    to={"/registerEmployer"}
                                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    to={"/login"}
                                    className="px-6 py-2 bg-gray-300 text-gray-800 font-bold rounded hover:bg-gray-400 transition"
                                >
                                    Log In
                                </Link>
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
            <Footer />
        </div>
    );
};

export default Home;

