import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin.js";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("employer");
    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password, role);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-sky-700 bg-opacity-50">
            <div className="w-1/3 bg-slate-800 bg-opacity-90 rounded-lg shadow-lg p-8 border border-gray-700">
                <h1 className="text-4xl font-semibold text-center text-white mb-6">
                    Login to <span className="text-blue-400">Career Crafter</span>
                </h1>
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        className={`w-1/2 py-2 rounded-md transition-transform transform hover:scale-95 ${role === "employer" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-300"}`}
                        onClick={() => setRole("employer")}
                        title="Login as Employer"
                    >
                        Employer
                    </button>
                    <button
                        className={`w-1/2 py-2 rounded-md transition-transform transform hover:scale-95 ${role === "jobseeker" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-300"}`}
                        onClick={() => setRole("jobseeker")}
                        title="Login as Job Seeker"
                    >
                        Job Seeker
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-white mb-2">Username</label>
                        <input
                            type="text"
                            autoComplete="current-username"
                            className="w-full h-14 px-4 rounded-md text-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter Username"
                            name="username"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-white mb-2">Password</label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            className="w-full h-14 px-4 rounded-md text-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            placeholder="Enter Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-transform transform active:scale-95"
                        disabled={loading}
                    >
                        {!loading ? (
                            <span className="text-lg">Login</span>
                        ) : (
                            <span className="loading-spinner"></span>
                        )}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <Link
                        to="/registerEmployer"
                        className="text-lg text-blue-400 hover:underline"
                    >
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;

