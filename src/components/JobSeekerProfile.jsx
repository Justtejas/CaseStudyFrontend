import React, { useState, useEffect } from "react";
import JobSeekerService from "../services/JobSeekerServices";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import { Footer } from "./Footer";

const JobSeekerProfile = () => {
    const { authUser } = useAuth(); // Assume the user's job seeker id is stored here

    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    // Fetch profile data from the API
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await JobSeekerService.getJobSeekerByJobSeekerId(authUser.jobSeekerId);
                console.log(data)
                console.log(data.data)
                // Exclude unwanted fields like $id, jobSeekerId, password, and role
                const { $id, jobSeekerId, password, role, ...filteredData } = data.data;
                console.log(filteredData)
                setProfileData(filteredData);
                setFormData(filteredData); // Populate the form with the fetched data
            } catch (error) {
                toast.error("Failed to load profile data");
            }
        };

        if (authUser?.jobSeekerId) {
            fetchProfile();
        }
    }, [authUser?.jobSeekerId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            await JobSeekerService.updateJobSeeker(authUser.jobSeekerId, formData);
            setProfileData(formData); // Update the profileData with the changes
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message);
        }
    };

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col h-screen overflow-x-hidden w-full bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-white">
            {/* Header */}
            <Header />

            {/* Profile Content */}
            <div className="flex-grow mx-auto my-28 bg-white text-gray-800 shadow-md rounded-lg px-6 pt-6">
                <h1 className="text-center text-2xl font-bold mb-4 text-blue-900">Profile</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(profileData).map(([key, value]) => {
                        if (key === "startDate" || key === "endDate") {
                            // Special case for date fields (startDate and endDate)
                            return (
                                <div key={key} className="flex flex-col">
                                    <label className="font-semibold text-sm mb-2 capitalize">
                                        {key.replace(/([A-Z])/g, " $1")}
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            name={key}
                                            value={formData[key] || value}
                                            onChange={handleInputChange}
                                            className="border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                            min={key === "startDate" ? "1900-01-01" : formData.startDate} // Start date validation
                                            max={key === "startDate" ? new Date().toISOString().split("T")[0] : ""} // Ensure startDate is not in the future
                                        />
                                    ) : (
                                        <p className="bg-gray-100 p-2 rounded-md">{new Date(value).toLocaleDateString()}</p>
                                    )}
                                </div>
                            );
                        }

                        // Special case for dateOfBirth to display in a readable format
                        if (key === "dateOfBirth") {
                            return (
                                <div key={key} className="flex flex-col">
                                    <label className="font-semibold text-sm mb-2 capitalize">
                                        {key.replace(/([A-Z])/g, " $1")}
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            name={key}
                                            value={formData[key] || value}
                                            onChange={handleInputChange}
                                            className="border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="bg-gray-100 p-2 rounded-md">
                                            {new Date(value).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <div key={key} className="flex flex-col">
                                {isEditing ? (
                                    <div className="mx-20">
                                        <label className="block font-semibold text-sm mb-2 capitalize">
                                            {key.replace(/([A-Z])/g, " $1")}
                                        </label>
                                        <input
                                            type={key.includes("Date") ? "date" : "text"}
                                            name={key}
                                            value={formData[key] ?? value}
                                            onChange={handleInputChange}
                                            className="border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <label className="font-semibold text-sm mb-2 capitalize">
                                            {key.replace(/([A-Z])/g, " $1")}
                                        </label>
                                        <p className="bg-gray-100 p-2 rounded-md">{value}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="mt-24 flex justify-center space-x-4">
                    {isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default JobSeekerProfile;

