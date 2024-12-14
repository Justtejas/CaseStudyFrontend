import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import ApplicationService from "../services/ApplicationService";
import JobListingService from "../services/JobListingServices";
import { toast } from "react-toastify";
import Header from "./Header";
import { Footer } from "./Footer";

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);
    const [jobListings, setJobListings] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authUser } = useAuth();

    // Fetch job listing details
    const fetchJobListingDetails = async (applications) => {
        const jobListingData = {};
        await Promise.all(
            applications.map(async (app) => {
                try {
                    const jobListing = await JobListingService.fetchJobListingByJobListingId(app.jobListingId);
                    jobListingData[app.jobListingId] = jobListing.data;
                } catch (error) {
                    console.error(`Failed to fetch details for job listing ID ${app.jobListingId}`);
                }
            })
        );
        setJobListings(jobListingData);
    };

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                const response = await ApplicationService.getApplicationByJSId(authUser.jobSeekerId);
                const applicationsData = response?.data?.$values || [];
                setApplications(applicationsData);
                await fetchJobListingDetails(applicationsData);
            } catch (err) {
                setError(err.response ? err.response.data.message : "An error occurred while fetching applications.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [authUser.jobSeekerId]);

    const handleCancel = async (applicationId) => {
        try {
            const status = "Cancelled";  // Ensure this is one of 'Confirmed', 'Pending', or 'Cancelled'
            await ApplicationService.updateApplication(applicationId, status);
            console.log(applications)
            toast.success("Application cancelled successfully!");
            setApplications((prevApplications) =>
                prevApplications.map((app) =>
                    app.applicationId === applicationId ? { ...app, applicationStatus: "Cancelled" } : app
                )
            );
            console.log(applications)
        } catch (error) {
            toast.error("Failed to cancel the application.");
            console.error(error);
        }
    };

    if (loading) return <div className="text-center text-white">Loading...</div>;

    if (error) {
        return (
            <div className="text-center text-red-500 bg-red-100 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
                <p className="font-bold text-xl sm:text-2xl">
                    You've not applied to any jobs
                </p>
                <Link
                    to="/" // Navigate to home page
                    className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all inline-block"
                >
                    Go Back to Home
                </Link>
            </div>
        );
    }
    return (
        <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600">
            <Header />
            <div className="flex-grow container mx-auto max-w-screen-xl">
                <h1 className="text-white text-2xl font-bold mb-6">My Applications</h1>
                {applications.length > 0 ? (
                    <ul className="space-y-6">
                        {applications.map((app, index) => (
                            <li key={app.applicationId} className="bg-white rounded-lg shadow p-4">
                                <h2 className="text-lg font-bold text-gray-700">
                                    Application {index + 1}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Application Date:</span>{" "}
                                    {new Date(app.applicationDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Status:</span> {app.applicationStatus}
                                </p>
                                {jobListings[app.jobListingId] ? (
                                    <div className="mt-4 bg-gray-100 rounded p-3">
                                        <h3 className="font-semibold text-gray-800">Job Details:</h3>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold">Title:</span>{" "}
                                            {jobListings[app.jobListingId]?.jobTitle || "N/A"}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold">Company:</span>{" "}
                                            {jobListings[app.jobListingId]?.companyName || "N/A"}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-red-500 mt-4">
                                        Failed to load job listing details.
                                    </p>
                                )}
                                {app.applicationStatus !== "Cancelled" && (
                                    <button
                                        onClick={() => handleCancel(app.applicationId)}
                                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Cancel Application
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-white">No applications found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ApplicationList;
