import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerJobSeeker } from "../services/RegisterService";
import { toast } from "react-toastify";

const RegisterJobSeeker = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        jobSeekerName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        contactPhone: "",
        address: "",
        description: "",
        dateOfBirth: "",
        qualification: "",
        specialization: "",
        institute: "",
        year: "",
        cgpa: "",
        companyName: "",
        position: "",
        startDate: "",
        endDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const response = await registerJobSeeker(formData);
            if (response.success) {
                toast.success("Job Seeker registered successfully!");
                navigate("/login");
            } else {
                if (response.errors) {
                    for (let field in response.errors) {
                        for (let error of response.errors[field]) {
                            toast.error(`${field}: ${error}`);
                        }
                    }
                } else {
                    toast.error("Registration failed.");
                }
            }
        } catch (error) {
            toast.error("An error occurred while registering.");
            console.error("Registration Error:", error);
        }
    };

    return (
        <div className="min-h-screen w-5/6 flex flex-col items-center justify-center">
            <div className="w-full h-5/6 max-w-6xl mx-auto mt-12 p-10 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">
                    Job Seeker Registration
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div>
                        <label
                            htmlFor="jobSeekerName"
                            className="block text-sm font-medium mb-2 text-gray-600"
                        >
                            Job Seeker Name
                        </label>
                        <input
                            type="text"
                            name="jobSeekerName"
                            id="jobSeekerName"
                            value={formData.jobSeekerName}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="userName"
                            className="block text-sm font-medium mb-2 text-gray-600"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            minLength="3"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2 text-gray-600"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-2 text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$"
                            minLength="8"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium mb-2 text-gray-600"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="gender"
                            className="block text-sm font-medium mb-2 text-gray-600"
                        >
                            Gender
                        </label>
                        <select
                            name="gender"
                            id="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    {[
                        { label: "Contact Phone", name: "contactPhone", type: "text" },
                        { label: "Address", name: "address", type: "textarea" },
                        { label: "Description", name: "description", type: "textarea" },
                        { label: "Date of Birth", name: "dateOfBirth", type: "date" },
                        { label: "Qualification", name: "qualification", type: "text" },
                        { label: "Specialization", name: "specialization", type: "text" },
                        { label: "Institute", name: "institute", type: "text" },
                        { label: "Year", name: "year", type: "number" },
                        { label: "CGPA", name: "cgpa", type: "number" },
                        { label: "Company Name", name: "companyName", type: "text" },
                        { label: "Position", name: "position", type: "text" },
                        { label: "Start Date", name: "startDate", type: "date" },
                        { label: "End Date", name: "endDate", type: "date" }
                    ].map(({ label, name, type }) => (
                        <div key={name}>
                            <label
                                htmlFor={name}
                                className="block text-sm font-medium mb-2 text-gray-600"
                            >
                                {label}
                            </label>
                            {type === "textarea" ? (
                                <textarea
                                    name={name}
                                    id={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            ) : (
                                <input
                                    type={type}
                                    name={name}
                                    id={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            )}
                        </div>
                    ))}
                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center space-y-4 mb-6">
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

        </div>
    );
};

export default RegisterJobSeeker;

