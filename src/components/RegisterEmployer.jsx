import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerEmployer } from "../services/RegisterService";
import { Link, useNavigate } from "react-router-dom";

const RegisterEmployer = () => {
    const [formData, setFormData] = useState({
        employerName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        companyName: "",
        contactPhone: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    document.title = "Career Crafter |   Employer Sign Up";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const response = await registerEmployer(formData);
        if (response.success) {
            toast.success("Employer registered successfully!");
            navigate("/login");
        }
        if (response.errors) {
            Object.entries(response.errors).forEach(([field, messages]) => {
                messages.forEach((message) => {
                    toast.error(`${field}: ${message}`);
                });
            });
        }
    }
    return (
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-xl mx-auto h-4/5">
            <h2 className="text-3xl font-semibold mb-8 text-center">Register as Employer</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="employerName" className="block text-sm font-medium mb-2">
                        Employer Name
                    </label>
                    <input
                        type="text"
                        name="employerName"
                        id="employerName"
                        value={formData.employerName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="userName" className="block text-sm font-medium mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        minLength="3"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        required
                    />
                </div>

                <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        minLength="8"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 mt-8 right-3 flex items-center text-gray-500"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <div className="relative">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                        Confirm Password
                    </label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 mt-8 right-3 flex items-center text-gray-500"
                    >
                        {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <div>
                    <label htmlFor="gender" className="block text-sm font-medium mb-2">
                        Gender
                    </label>
                    <select
                        name="gender"
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        required
                    >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                        Company Name
                    </label>
                    <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        minLength="2"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium mb-2">
                        Contact Phone
                    </label>
                    <input
                        type="text"
                        name="contactPhone"
                        id="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        pattern="^\+?[1-9]\d{1,12}$"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition"
                >
                    Register
                </button>
            </form>

            <div className="mt-6 text-center">
                <p>
                    <Link to="/registerJobSeeker" className="text-blue-500 hover:underline">
                        Register as Job Seeker?
                    </Link>
                </p>
                <p>
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Already have an account?
                    </Link>
                </p>
                <p>
                    <Link to="/" className="text-blue-500 hover:underline">
                        Go Back To Home
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterEmployer;

