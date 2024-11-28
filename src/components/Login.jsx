import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin.js";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <div className="flex flex-col lg:w-1/4 items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-16 rounded-lg shadow-lg bg-gray-800 bg-opacity-90">
                <h1 className="text-4xl font-semibold text-center text-white">
                    Login to <span className="text-blue-400">Career Crafter</span>
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
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

                    <div className="mb-6">
                        <label className="block text-lg font-medium text-white mb-2">Password</label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            className="w-full input input-bordered h-12 rounded-md px-4 text-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            placeholder="Enter Password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full btn btn-primary py-2 rounded-md bg-zinc-50"
                        disabled={loading}
                    >
                        {!loading ? (
                            <span className="text-lg">Login</span>
                        ) : (
                            <span className="loading loading-spinner"></span>
                        )}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <Link
                        to="/signup"
                        className="text-lg text-blue-400 hover:text-blue-600 hover:underline"
                    >
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;

