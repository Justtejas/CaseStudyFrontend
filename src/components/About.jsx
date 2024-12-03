import React from "react";
import { useAuth } from "../context/AuthContext";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SideNav } from "./SideNav";

const About = () => {
    document.title = "CareerCrafter | About";
    const { authUser } = useAuth();

    const aboutContent =
        authUser?.role === "JobSeeker" ? (
            <>
                <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                    Empowering Job Seekers
                </h1>
                <p className="text-lg leading-7">
                    At CareerCrafter, we believe in helping job seekers take charge of their career journey.
                    Whether you're looking for your first job, a career change, or a fresh start, our platform
                    connects you with opportunities that match your aspirations.
                </p>
                <p className="mt-4 text-gray-300">
                    Browse job listings, upload your resume, and take the next step towards your dream job!
                </p>
            </>
        ) : authUser?.role === "Employer" ? (
            <>
                <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">
                    Connecting Employers with Talent
                </h1>
                <p className="text-lg leading-7">
                    CareerCrafter simplifies hiring for employers. Post job listings, manage applications, and
                    find skilled professionals to meet your company's needs.
                </p>
                <p className="mt-4 text-gray-300">
                    Build your dream team and drive your business forward with ease and efficiency.
                </p>
            </>
        ) : (
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
                Welcome to CareerCrafter
            </h1>
        );

    return (
        <div className="w-full h-screen flex flex-col bg-gradient-to-b from-gray-900 via-slate-900 to-gray-800 text-white">
            <Header />
            <div className="flex flex-grow">
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
