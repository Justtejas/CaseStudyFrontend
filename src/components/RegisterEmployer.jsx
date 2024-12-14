import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerEmployer } from "../services/RegisterService"; // Import the registerEmployer service
import { useNavigate } from "react-router-dom"; // To navigate to login page after successful registration

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
    const navigate = useNavigate(); // Initialize useHistory hook for navigation

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

        try {
            const response = await registerEmployer(formData);
            console.log(response)
            if (response.success) {
                toast.success("Employer registered successfully!");
                navigate("/login");
            }
        } catch (error) {
            console.error("Registration error", error);
            toast.error("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-xl mx-auto">
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

                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        minLength="8"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        required
                    />
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
                    <a href="/registerJobSeeker" className="text-blue-500 hover:underline">
                        Register as Job Seeker?
                    </a>
                </p>
            </div>
            <div className="mt-6 text-center">
                <p>
                    <a href="/login" className="text-blue-500 hover:underline">
                        Already have an account?
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterEmployer;
