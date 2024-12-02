import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SideNav } from "./SideNav";

export const About = () => {
    // Set document title
    document.title = "CareerCrafter | About";

    return (
        <div className="w-full h-full flex flex-col bg-slate-900">

            {/* Main Content */}
            <div className="w-full h-full flex">
                {/* Side Navigation */}
                <SideNav />

                {/* About Us Section */}
                <div
                    id="scrollbar"
                    className="w-[80%] h-[98%] flex flex-col items-center p-6 mt-2 overflow-auto gap-6 text-white"
                >
                    <div className="text-center bg-gradient-to-br from-slate-800 to-purple-900 p-8 rounded-lg shadow-lg w-full max-w-4xl">
                        <h1 className="text-4xl font-bold mb-6">About Us</h1>
                        <p className="text-lg leading-7">
                            Welcome to our website! We are dedicated to providing valuable information and services.
                            Our mission is to empower individuals on their journey to a successful and fulfilling
                            career.
                        </p>
                        <p className="mt-4 text-sm text-gray-300">
                            Join us and shape your future today!
                        </p>
                        <div className="flex justify-center mt-6 gap-4">
                            {/* Social Media Icons */}
                            <a
                                href="#"
                                className="text-2xl hover:text-purple-500 transition-colors"
                                aria-label="Facebook"
                            >
                                <i className="ri-facebook-box-line"></i>
                            </a>
                            <a
                                href="#"
                                className="text-2xl hover:text-pink-500 transition-colors"
                                aria-label="Instagram"
                            >
                                <i className="ri-instagram-line"></i>
                            </a>
                            <a
                                href="#"
                                className="text-2xl hover:text-blue-400 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <i className="ri-linkedin-box-line"></i>
                            </a>
                            <a
                                href="#"
                                className="text-2xl hover:text-sky-400 transition-colors"
                                aria-label="Twitter"
                            >
                                <i className="ri-twitter-x-fill"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;

