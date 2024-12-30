import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import JobListingService from '../services/JobListingServices';
import { useAuth } from '../context/AuthContext';
import { Footer } from './Footer';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const EmployerJobListings = () => {
    const { authUser } = useAuth();
    const [jobListings, setJobListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentJobListing, setCurrentJobListing] = useState(null);
    const [isViewingApplications, setIsViewingApplications] = useState(false);
    const [currentJobApplications, setCurrentJobApplications] = useState([]);
    const [showNoJobsModal, setShowNoJobsModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (authUser?.role !== 'Employer') {
            toast.error('You must be an Employer to manage job listings.');
            return;
        }

        fetchEmployerJobListings();
    }, [authUser.employerId]);

    const fetchEmployerJobListings = async () => {
        setLoading(true);
        try {
            const response = await JobListingService.fetchJobListingByEmployerId(authUser.employerId);
            const filteredJobListings = response.map((job) => ({
                jobListingId: job.jobListingId,
                jobTitle: job.jobTitle,
                jobDescription: job.jobDescription,
                companyName: job.companyName,
                location: job.location,
                salary: job.salary,
                applications: job.applications,
            }));
            setJobListings(filteredJobListings);

            if (filteredJobListings.length === 0) {
                setShowNoJobsModal(true);
            }
        } catch (error) {
            if (error) {
                setShowNoJobsModal(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (jobListingId) => {
        try {
            const data = await JobListingService.deleteJobListing(jobListingId);
            toast.success(data);
            fetchEmployerJobListings();
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Error deleting job listing.');
        }
    };

    const handleEdit = (job) => {
        setCurrentJobListing(job);
        setIsEditing(true);
    };

    const handleUpdate = async (updatedJob) => {
        try {
            await JobListingService.updateJobListing(updatedJob.jobListingId, updatedJob);
            toast.success('Job listing updated successfully');
            setIsEditing(false);
            fetchEmployerJobListings();
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Error updating job listing.');
        }
    };

    const closeEditModal = () => {
        setIsEditing(false);
        setCurrentJobListing(null);
    };

    const handleViewApplications = async (jobListingId) => {
        try {
            const job = jobListings.find((job) => job.jobListingId === jobListingId);
            setCurrentJobApplications(job?.applications || []);
            setIsViewingApplications(true);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Error fetching applications.');
        }
    };

    const closeApplicationsModal = () => {
        setIsViewingApplications(false);
        setCurrentJobApplications([]);
    };

    const closeNoJobsModal = () => {
        setShowNoJobsModal(false);
        navigate("/")
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-black">
            <Header />
            <div className="flex-grow mx-auto max-w-screen-xl px-4">
                <h1 className="text-4xl font-bold text-center mt-8 mb-6 text-white">Your Job Listings</h1>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="spinner-border text-light" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobListings.map((job) => (
                            <div key={job.jobListingId} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                                <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
                                <p className="text-gray-600 mt-2">{job.companyName}</p>
                                <p className="text-gray-600">{job.location}</p>
                                <p className="text-gray-600 mt-2">Salary: ${job.salary}</p>

                                <div className="mt-4 space-x-4">
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                        onClick={() => handleEdit(job)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-4 py-2 rounded-md"
                                        onClick={() => handleDelete(job.jobListingId)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="bg-green-600 text-white px-4 py-2 rounded-md"
                                        onClick={() => handleViewApplications(job.jobListingId)}
                                    >
                                        View Applications
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showNoJobsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full space-y-6">
                        <h2 className="text-3xl font-bold text-center text-red-600">No Job Listings</h2>
                        <p className="text-center text-gray-700">
                            You have not created any job listings yet. Start creating job listings to manage them here.
                        </p>
                        <div className="mt-6">
                            <button
                                className="bg-blue-600 text-white p-3 rounded w-full"
                                onClick={closeNoJobsModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isEditing && currentJobListing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full space-y-6">
                        <h2 className="text-3xl font-bold text-center text-blue-800">Edit Job Listing</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={currentJobListing.jobTitle}
                                onChange={(e) =>
                                    setCurrentJobListing({ ...currentJobListing, jobTitle: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={currentJobListing.companyName}
                                onChange={(e) =>
                                    setCurrentJobListing({ ...currentJobListing, companyName: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={currentJobListing.location}
                                onChange={(e) =>
                                    setCurrentJobListing({ ...currentJobListing, location: e.target.value })
                                }
                            />
                            <input
                                type="number"
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={currentJobListing.salary}
                                onChange={(e) =>
                                    setCurrentJobListing({ ...currentJobListing, salary: e.target.value })
                                }
                            />
                        </div>
                        <div className="mt-6 flex justify-between gap-4">
                            <button
                                className="bg-blue-600 text-white p-3 rounded w-full"
                                onClick={() => handleUpdate(currentJobListing)}
                            >
                                Save Changes
                            </button>
                            <button
                                className="text-red-600 p-3 w-full"
                                onClick={closeEditModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isViewingApplications && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full space-y-6">
                        <h2 className="text-3xl font-bold text-center text-blue-800">Applications</h2>
                        <div className="space-y-4">
                            {console.log(currentJobApplications)}
                            {currentJobApplications.$values.length === 0 ? (
                                <p className="text-center text-red-500">
                                    No applications found for this job listing.
                                </p>
                            ) : (
                                <ul className="space-y-4">
                                    {currentJobApplications.$values.map((application, index) => (
                                        <li key={index} className="p-4 border-b">
                                            <p><strong>Applicant:</strong> {application.applicantName}</p>
                                            <p><strong>Email:</strong> {application.applicantEmail}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="mt-6">
                            <button
                                className="bg-red-600 text-white p-3 rounded w-full"
                                onClick={closeApplicationsModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default EmployerJobListings;

