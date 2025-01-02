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
        <div className="h-full w-screen text-white flex flex-col overflow-x-hidden">
            <Header />
            <div className="flex flex-grow">
                {authUser && <SideNav />}

                <main className="flex-grow p-8">
                    <div className="mx-auto bg-gradient-to-br from-slate-800 via-indigo-900 to-gray-900 text-gray-800 p-8 rounded-lg shadow-lg text-center">
                        <h1 className="text-4xl font-bold text-white">
                            Welcome to Career Crafter
                        </h1>
                        <p className="text-xl mt-4 text-white">
                            Empowering your career journey with the tools and connections you need to succeed.
                        </p>
                        <p className="text-xl mt-2 text-white">
                            Whether you're a job seeker looking for your dream role or an employer searching for the perfect candidate, Career Crafter bridges the gap with cutting-edge tools and personalized experiences.
                        </p>

                        {!authUser ? (
                            <div className="mt-6 space-x-4">
                                <Link
                                    to={"/registerJobSeeker"}
                                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    to={"/login"}
                                    className="px-6 py-2 bg-gray-300 font-bold rounded hover:bg-gray-400 transition"
                                >
                                    Log In
                                </Link>
                            </div>
                        ) : (
                            <div className=" mt-12 text-xl text-white">
                                <p className="font-bold text-3xl leading-9 pb-4">
                                    Welcome back, {authUser.employerName || authUser.jobSeekerName}!
                                </p>
                                <p>
                                    Let’s continue crafting your career journey with exciting new opportunities and tools tailored for you.
                                </p>
                                <div className="mt-12 space-x-4">
                                    <Link
                                        to={authUser?.role === "Employer" ? "/employerJobListings" : "/joblistings"}
                                        className="px-6 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition"
                                    >
                                        Check out Job Listings
                                    </Link>
                                    <Link
                                        to={authUser?.role === "Employer" ? "/employerProfile" : "/jobSeekerProfile"}
                                        className="px-6 py-2 bg-blue-800 font-bold rounded hover:bg-blue-900 transition"
                                    >
                                        Update Profile
                                    </Link>
                                </div>
                            </div>
                        )}

                        <div className="my-8 py-6 text-white">
                            <h2 className="text-2xl font-bold">Why Choose Career Crafter?</h2>
                            <ul className="mt-4 mx-auto text-gray-200 max-w-2xl text-xl text-justify">
                                <li className="py-2 leading-8">
                                    <span className="font-semibold">For Job Seekers:</span> Discover job opportunities that match your skills and aspirations, connect with top employers, and manage your career journey.
                                </li>
                                <li className="py-2 leading-8">
                                    <span className="font-semibold">For Employers:</span> Find the right candidates faster with our advanced search and screening tools, ensuring the perfect match for your team.
                                </li>
                                <li className="py-2 leading-8">
                                    <span className="font-semibold">User-Friendly Interface:</span> Navigate through our intuitive platform with ease and focus on what matters most—your career goals.
                                </li>
                                <li className="py-2 leading-8">
                                    <span className="font-semibold">Personalized Recommendations:</span> Get tailored job or candidate suggestions based on your profile and preferences.
                                </li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default Home;

