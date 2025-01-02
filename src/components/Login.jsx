import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin.js";

const Login = () => {
    window.document.title = "CareerCrafter | Login";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState("employer");
    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password, role);
        await login(username, password, role);
    };

    return (
        <div className="flex flex-col lg:w-1/3 items-center justify-center min-w-96 mx-auto ">
            <div className="w-full p-16 rounded-lg shadow-lg bg-gray-700 bg-opacity-90">
                <h1 className="text-4xl font-semibold text-center text-white">
                    Login to <span className="text-blue-400">Career Crafter</span>
                </h1>
                <div className="mt-8 text-center text-white">
                    <button
                        className={`px-4 py-2 rounded-md transition transform active:scale-95 ${role === "employer" ? "bg-blue-400 " : "bg-gray-500"}`}
                        onClick={() => setRole("employer")}
                        title="Login as Employer"
                    >
                        Employer
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md transition transform active:scale-95 ${role === "jobseeker" ? "bg-blue-400" : "bg-gray-500"} ml-4`}
                        onClick={() => setRole("jobseeker")}
                        title="Login as Job Seeker"
                    >
                        Job Seeker
                    </button>
                </div>
                <form className="my-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-white mb-2">Username</label>
                        <input
                            type="text"
                            autoComplete="current-username"
                            className="w-full input input-bordered h-12 rounded-md px-4 text-lg"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter Username"
                            name="username"
                        />
                    </div>

                    <div className="my-6 relative">
                        <label className="block text-lg font-medium text-white mb-2">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            className="w-full input input-bordered h-12 rounded-md px-4 text-lg "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            placeholder="Enter Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 mt-8 right-3 flex items-center text-gray-500"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className={`my-14 w-full flex items-center justify-center py-2 rounded-md bg-zinc-50 hover:bg-blue-400 transition transform active:scale-95 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {!loading ? (
                            <span className="text-lg">Login</span>
                        ) : (
                            <div
                                className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent border-blue-500"
                                role="status"
                            ></div>
                        )}
                    </button></form>
                <div className="text-center mt-4">
                    <Link
                        to="/registerEmployer"
                        className="text-xl hover:underline hover:text-blue-300 ml-2 inline-block text-white"
                    >
                        Register as Employer
                    </Link>
                </div>
                <div className="text-center mt-4">
                    <Link
                        to="/registerJobSeeker"
                        className="text-xl hover:underline hover:text-blue-300 ml-2 inline-block text-white"
                    >
                        Register as Job Seeker
                    </Link>
                </div>
                <div className="text-center mt-4">
                    <Link
                        to="/"
                        className="text-xl hover:underline hover:text-blue-300 ml-2 inline-block text-white"
                    >
                        Go Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;

