import React, { useEffect, useState } from "react";
import EmployerService from "../services/EmployerService";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import { Footer } from "./Footer";

const EmployerProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    const { authUser } = useAuth();

    document.title = "Career Crafter | Profile";
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await EmployerService.getEmployerByEmployerId(authUser.employerId);
                setProfileData(data.data);
                setFormData(data.data);
            } catch (error) {
                toast.error("Failed to load profile data");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const filteredProfileData = profileData
        ? Object.entries(profileData).filter(
            ([key]) => key !== "$id" && key !== "password"
        )
        : [];

    const handleSave = async () => {
        const { $id, password, ...updatedData } = formData;

        try {
            if (authUser?.employerId) {
                const data = await EmployerService.updateEmployer(authUser.employerId, updatedData);
                setProfileData(data.data);
                setIsEditing(false);
                toast.success("Profile updated successfully!");
            } else {
                toast.error("Profile ID is missing");
            }
        } catch (error) {
            if (error?.response?.data?.errors) {
                Object.entries(error.response.data.errors).forEach(([field, messages]) => {
                    messages.forEach((message) => {
                        toast.error(`${field}: ${message}`);
                    });
                });
            } else if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-white">
                <p>Loading...</p>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="w-full flex items-center justify-center h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-white">
                <p>No profile data available</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header />

            <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-white">
                <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 w-2/4">
                    <h1 className="text-center text-2xl font-bold mb-4 text-blue-900">Employer Profile</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredProfileData.map(([key, value]) => {
                            if (key === "gender" && isEditing) {
                                return (
                                    <div key={key} className="flex flex-col">
                                        <label className="font-semibold text-sm mb-2 capitalize">Gender</label>
                                        <select
                                            name="gender"
                                            value={formData.gender || ""}
                                            onChange={handleInputChange}
                                            className="border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                );
                            }

                            return (
                                <div key={key} className="flex flex-col">
                                    <label className="font-semibold text-sm mb-2 capitalize">
                                        {key.replace(/([A-Z])/g, " $1")}
                                    </label>
                                    {isEditing && key !== "gender" ? (
                                        <input
                                            type={key === "email" ? "email" : "text"}
                                            name={key}
                                            value={formData[key] || ""}
                                            onChange={handleInputChange}
                                            className="border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="bg-gray-100 p-2 rounded-md">{value}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
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
            </div>

            <Footer />
        </div>
    );
}

export default EmployerProfile;
