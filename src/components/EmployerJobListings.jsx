import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import JobListingService from '../services/JobListingServices';
import { useAuth } from '../context/AuthContext';
import { Footer } from './Footer';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import ApplicationService from '../services/ApplicationService';
import JobSeekerService from '../services/JobSeekerServices';
import ResumeService from '../services/ResumeServices';

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
    document.title = "Career Crafter | Job Listings";

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
                hiringWorkflow: job.hiringWorkflow,
                requiredSkills: job.requiredSkills,
                eligibilityCriteria: job.eligibilityCriteria,
                aboutCompany: job.aboutCompany,
                deadline: job.deadline,
                location: job.location,
                salary: job.salary,
                applications: job.applications,
                vacancyOfJob: job.vacancyOfJob,
            }));
            setJobListings(filteredJobListings);
            console.log(filteredJobListings)

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
            const data = await JobListingService.updateJobListing(updatedJob.jobListingId, updatedJob);
            console.log(data)
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
            const data = await ApplicationService.getApplicationByJobListingId(jobListingId);
            setCurrentJobApplications(data.data.$values || []);
            setIsViewingApplications(true);
        } catch (error) {
            if (error?.response?.status === 404) {
                setCurrentJobApplications([]);
                setIsViewingApplications(true);
            } else {
                toast.error(error?.response?.data?.message || 'Error fetching applications.');
            }
        }
    };
    const updateApplicationStatus = async (applicationId, status, jobListingId) => {
        const validStatuses = ['Confirmed', 'Pending', 'Cancelled'];

        if (!validStatuses.includes(status)) {
            toast.error("Invalid application status.");
            return;
        }
        const data = await ApplicationService.getApplicationByJobListingId(jobListingId);
        setCurrentJobApplications(data.data.$values || []);

        try {
            await ApplicationService.updateApplication(applicationId, status);
            toast.success(`Application ${status.toLowerCase()} successfully!`);

        } catch (error) {
            console.error(`Failed to update application status to ${status}:`, error);
            toast.error(`Failed to ${status.toLowerCase()} the application.`);
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
    const fetchJobSeekerDetails = async (jobSeekerId, applicationIndex) => {
        try {
            const jobSeeker = await JobSeekerService.getJobSeekerByJobSeekerId(jobSeekerId);
            const data = jobSeeker.data;
            const updatedApplications = [...currentJobApplications];
            updatedApplications[applicationIndex] = {
                ...updatedApplications[applicationIndex],
                data,
            };
            setCurrentJobApplications(updatedApplications);
        } catch (error) {
            console.error("Error fetching job seeker details:", error);
        }
    };

    const handleDownloadResume = async (jobSeekerId) => {
        try {
            const jobApplication = currentJobApplications.find(job => job?.data?.jobSeekerId === jobSeekerId);

            if (!jobApplication) {
                toast.error("Job application not found");
                return;
            }

            const resumeBlob = await ResumeService.downloadResume(jobSeekerId);
            const jobSeekerName = jobApplication?.data?.jobSeekerName || jobSeekerId;
            const url = window.URL.createObjectURL(new Blob([resumeBlob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `resume_${jobSeekerName}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            toast.error("Resume not found");
            console.error("Error downloading resume:", error);
        }
    };


    return (
        <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-black">
            <Header />
            <div className="flex-grow mx-auto max-w-screen-xl px-4">

                <div className="bg-white rounded-lg shadow p-4 m-4 w-full h-2/3">
                    <h1 className="text-2xl font-bold text-center text-blue-500">Your Job Listings</h1>
                </div>

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
                                <h2 className="text-xl font-semibold text-blue-800">{job.jobTitle}</h2>
                                <p className="text-gray-600"><strong>Company Name:</strong> {job.companyName}</p>
                                <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>
                                <p className="text-gray-600"><strong>Salary:</strong> ${job.salary}</p>
                                <p className="text-gray-600"><strong>Job Description:</strong> {job.jobDescription}</p>
                                <p className="text-gray-600"><strong>Hiring Workflow:</strong> {job.hiringWorkflow}</p>
                                <p className="text-gray-600"><strong>Eligibility Criteria:</strong> {job.eligibilityCriteria}</p>
                                <p className="text-gray-600"><strong>Required Skills:</strong> {job.requiredSkills}</p>
                                <p className="text-gray-600"><strong>About the Company:</strong> {job.aboutCompany}</p>
                                <p className="text-gray-600"><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
                                <p className={`text-gray-600 font-semibold ${job.vacancyOfJob ? 'text-green-600' : 'text-red-600'}`}>
                                    <strong>Status:</strong> {job.vacancyOfJob ? "Open" : "Closed"}
                                </p>
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
                            <label className="block text-sm font-medium text-gray-700">Job Title</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={currentJobListing.jobTitle}
                                onChange={(e) =>
                                    setCurrentJobListing({ ...currentJobListing, jobTitle: e.target.value })
                                }
                            />
                            <label className="block text-sm font-medium text-gray-700">Job Description</label>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={currentJobListing.jobDescription}
                                onChange={(e) =>
                                    setCurrentJobListing({ ...currentJobListing, jobDescription: e.target.value })
                                }
                            />
                            <label className="block text-sm font-medium text-gray-700">Company Name</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={currentJobListing.companyName}
                                onChange={(e) =>
                                    setCurrentJobListing({ ...currentJobListing, companyName: e.target.value })
                                }
                            />
                            <label className="block text-sm font-medium text-gray-700">Hiring Workflow</label>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={currentJobListing.hiringWorkflow}
                                onChange={(e) =>
                                    setCurrentJobListing({ ...currentJobListing, hiringWorkflow: e.target.value })
                                }
                            />
                            <label className="block text-sm font-medium text-gray-700">Eligibility Criteria</label>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={currentJobListing.eligibilityCriteria}
                                onChange={(e) =>
                                    setCurrentJobListing({ ...currentJobListing, eligibilityCriteria: e.target.value })
                                }
                            />
                            <label className="block text-sm font-medium text-gray-700">Required Skills</label>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={currentJobListing.requiredSkills}
                                onChange={(e) =>
                                    setCurrentJobListing({ ...currentJobListing, requiredSkills: e.target.value })
                                }
                            />
                            <label className="block text-sm font-medium text-gray-700">About Company</label>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={currentJobListing.aboutCompany}
                                onChange={(e) =>
                                    setCurrentJobListing({ ...currentJobListing, aboutCompany: e.target.value })
                                }
                            />
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={currentJobListing.location}
                                onChange={(e) =>
                                    setCurrentJobListing({ ...currentJobListing, location: e.target.value })
                                }
                            />
                            <label className="block text-sm font-medium text-gray-700">Salary</label>
                            <input
                                type="number"
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={currentJobListing.salary}
                                onChange={(e) =>
                                    setCurrentJobListing({ ...currentJobListing, salary: parseFloat(e.target.value) || 0 })
                                }
                            />
                            <label className="block text-sm font-medium text-gray-700">Deadline</label>
                            <input
                                type="date"
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={currentJobListing.deadline}
                                onChange={(e) =>
                                    setCurrentJobListing({ ...currentJobListing, deadline: e.target.value })
                                }
                            />
                            <label className="block text-sm font-medium text-gray-700">Vacancy Status</label>
                            <select
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={currentJobListing.vacancyOfJob}
                                onChange={(e) =>
                                    setCurrentJobListing({ ...currentJobListing, vacancyOfJob: e.target.value === "true" })
                                }
                            >
                                <option value="true">Open</option>
                                <option value="false">Closed</option>
                            </select>
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
                            {currentJobApplications.length === 0 ? (
                                <p className="text-center text-red-500">
                                    No applications found for this job listing.
                                </p>
                            ) : (
                                <ul className="space-y-4">
                                    {currentJobApplications.map((application, index) => (
                                        <li key={index} className="p-4 border-b">
                                            <p><strong>Application Date:</strong> {new Date(application.applicationDate).toLocaleDateString()}</p>
                                            <p>
                                                <span className="font-bold ">Status: </span>
                                                <span
                                                    className={`font-bold ${application.applicationStatus === "Cancelled"
                                                        ? "text-red-800"
                                                        : application.applicationStatus === "Confirmed"
                                                            ? "text-green-600"
                                                            : "text-yellow-600"
                                                        }`}
                                                >
                                                    {application.applicationStatus}
                                                </span>
                                            </p>
                                            {console.log(application)}
                                            {application.data ? (
                                                <div className="space-y-2">
                                                    <p><strong>Applicant Name:</strong> {application.data.userName}</p>
                                                    <p><strong>Email:</strong> {application.data.email}</p>
                                                    <p><strong>Phone:</strong> {application.data.contactPhone}</p>
                                                    <div className="flex space-x-4">
                                                        <button
                                                            className="bg-green-600 text-white px-4 py-2 rounded-md"
                                                            onClick={() => handleDownloadResume(application.data.jobSeekerId)}
                                                        >
                                                            Download Resume
                                                        </button>
                                                        {application.applicationStatus === "Pending" && (
                                                            <>
                                                                <button
                                                                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                                                    onClick={() =>
                                                                        updateApplicationStatus(
                                                                            application.applicationId,
                                                                            "Confirmed",
                                                                            application.jobListingId
                                                                        )
                                                                    }
                                                                >
                                                                    Confirm Application
                                                                </button>
                                                                <button
                                                                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                                                                    onClick={() =>
                                                                        updateApplicationStatus(
                                                                            application.applicationId,
                                                                            "Cancelled",
                                                                            application.jobListingId
                                                                        )
                                                                    }
                                                                >
                                                                    Cancel Application
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    className="bg-yellow-600 text-white px-4 py-2 rounded-md"
                                                    onClick={() => fetchJobSeekerDetails(application.jobSeekerId, index)}
                                                >
                                                    Check more information
                                                </button>
                                            )}
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
        </div >
    );
};

export default EmployerJobListings;

