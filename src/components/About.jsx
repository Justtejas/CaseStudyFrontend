import React from "react";
import { useAuth } from "../context/AuthContext";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SideNav } from "./SideNav";

const About = () => {
    document.title = "CareerCrafter | About";
    const { authUser } = useAuth();

    if (authUser === undefined) {
        return (
            <div className="w-full h-screen flex flex-col text-white">
                <Header />
                <div className="flex flex-grow">
                    <main className="w-full md:w-4/5 flex flex-col items-center p-6 mt-4 overflow-auto gap-8">
                        <div className="text-center bg-gradient-to-br from-slate-800 via-indigo-900 to-gray-900 p-8 rounded-lg shadow-lg w-full max-w-4xl">
                            <div
                                className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent border-blue-500"
                                role="status"
                            ></div>
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        );
    }

    const aboutContent =
        authUser?.role === "JobSeeker" ? (
            <>
                <h1 className="text-4xl font-bold mb-4">Empowering Job Seekers</h1>
                <p className="text-lg leading-7">
                    At CareerCrafter, we empower job seekers to take control of their career paths. Whether you're just starting, switching fields, or aiming for the next big opportunity, we’re here to connect you with roles that match your skills and aspirations.
                </p>
                <ul className="list-disc list-inside mt-4 text-gray-300">
                    <li>Explore opportunities with comprehensive job listings tailored to your needs.</li>
                    <li>Showcase your talent by uploading your resume and letting employers discover your unique potential.</li>
                    <li>Achieve your goals with tools and resources to support every step of your career journey.</li>
                </ul>
            </>
        ) : authUser?.role === "Employer" ? (
            <>
                <h1 className="text-4xl font-bold mb-4">Connecting Employers with Talent</h1>
                <p className="text-lg leading-7">
                    CareerCrafter streamlines recruitment for employers, helping you find the right professionals to build your team. With our platform, hiring becomes faster, easier, and more effective.
                </p>
                <ul className="list-disc list-inside mt-4 text-gray-300">
                    <li>Post jobs effortlessly to attract top talent.</li>
                    <li>Find the perfect fit with advanced filters and tools for candidate discovery.</li>
                    <li>Manage applications seamlessly to keep your hiring process organized and efficient.</li>
                </ul>
            </>
        ) : (
            <>
                <h1 className="text-4xl font-bold mx-auto p-4">
                    Welcome to CareerCrafter
                </h1>
                <p className="text-2xl leading-9 text-justify py-4">
                    CareerCrafter is a dynamic platform designed to bridge the gap between ambitious job seekers and forward-thinking employers. Whether you’re pursuing a career change or expanding your team, CareerCrafter offers the tools and connections you need to thrive.
                </p>
                <ul className="mt-6 text-2xl py-6 text-justify leading-9">
                    <li className="py-2"><span className="font-bold">Your Career Partner</span>: Our user-friendly platform adapts to your professional needs.</li>
                    <li className="py-2"><span className="font-bold">Trusted Community</span>: Join thousands of users finding success every day.</li>
                    <li className="py-2"><span className="font-bold">Comprehensive Resources</span>: Access guidance, tools, and insights tailored to your goals.</li>
                </ul>
            </>
        );

    return (
        <div className="w-full h-screen flex flex-col text-white">
            <Header />
            <div className="flex flex-grow justify-center">
                <SideNav />
                <main className="w-full md:w-4/5 flex flex-col items-center p-6 mt-4 overflow-auto gap-8">
                    <div className="text-center bg-gradient-to-br from-slate-800 via-indigo-900 to-gray-900 p-8 rounded-lg shadow-lg w-full max-w-4xl">
                        {aboutContent}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default About;

