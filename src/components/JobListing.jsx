import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import JobListingService from '../services/JobListingServices';
import ApplicationService from '../services/ApplicationService';
import Header from './Header';
import { Footer } from './Footer';
import { toast } from 'react-toastify';

let debounceTimeout;

const JobListing = () => {
    const { authUser } = useAuth();
    const [jobListings, setJobListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);
    const navigate = useNavigate();
    document.title = "Career Crafter | Job Listings";

    useEffect(() => {
        if (authUser?.role !== 'JobSeeker') {
            setShowUnauthorizedModal(true);
            return;
        }
        fetchJobListings();
    }, [authUser]);

    const fetchJobListings = async () => {
        setLoading(true);
        try {
            const data = await JobListingService.fetchAllJobListings();
            console.log(data)
            const today = new Date();
            const futureJobListings = data.filter(job => new Date(job.deadline) > today);
            setJobListings(futureJobListings);
            setFilteredListings(futureJobListings);
        } catch (error) {
            console.error('Error fetching job listings:', error);
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = (term) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const query = term.trim().toLowerCase();
            if (!query) {
                setFilteredListings(jobListings);
            } else {
                const filtered = jobListings.filter(
                    (job) =>
                        job.jobTitle.toLowerCase().includes(query) ||
                        job.companyName.toLowerCase().includes(query) ||
                        job.location.toLowerCase().includes(query)
                );
                setFilteredListings(filtered);
            }
        }, 200);
    };

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        debouncedSearch(term);
    };

    const applyForJob = async (jobListingId) => {
        try {
            const applicationData = { jobListingId, jobSeekerId: authUser.jobSeekerId };
            await ApplicationService.createApplication(applicationData);
            toast.success('Application submitted successfully');
        } catch (error) {
            console.log(error)
            toast.success(error?.response?.data?.message);
        }
    };

    const openJobModal = (job) => {
        setSelectedJob(job);
    };

    const closeModal = () => {
        setSelectedJob(null);
    };

    const closeUnauthorizedModal = () => {
        setShowUnauthorizedModal(false);
        navigate('/');
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-black">
            <Header />
            <div className="flex-grow mx-auto max-w-screen-xl">
                <h1 className="text-4xl font-bold text-center mt-8 mb-6 text-white">Job Listings</h1>

                <div className="flex justify-between items-center mb-6 px-6">
                    <div className="w-full flex">
                        <input
                            type="text"
                            className="p-3 w-full rounded-md text-black"
                            placeholder="Search by title, company, or location"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="spinner-border text-light" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 pb-8 text-black">
                        {filteredListings.map((job) => (
                            <div
                                key={job.jobListingId}
                                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
                                <p className="text-md text-gray-600">{job.companyName}</p>
                                <p className="text-sm my-2">{job.location}</p>
                                <p className="text-sm">Salary: ${job.salary}</p>
                                <button
                                    className="bg-blue-600 text-white p-2 rounded mt-4 w-full"
                                    onClick={() => openJobModal(job)}
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full space-y-6">
                        <h2 className="text-3xl font-bold text-center text-blue-800">{selectedJob.jobTitle}</h2>
                        <h2 className="text-2xl font-bold text-center text-blue-700">{selectedJob.companyName}</h2>

                        <div className="text-sm text-gray-700 space-y-3">
                            <p>
                                <strong className="text-blue-700">Job Description:</strong>{' '}
                                {selectedJob.jobDescription}
                            </p>
                            <p>
                                <strong className="text-blue-700">Eligibility:</strong>{' '}
                                {selectedJob.eligibilityCriteria}
                            </p>
                            <p>
                                <strong className="text-blue-700">Required Skills:</strong>{' '}
                                {selectedJob.requiredSkills}
                            </p>
                            <p>
                                <strong className="text-blue-700">Hiring Workflow:</strong>{' '}
                                {selectedJob.hiringWorkflow}
                            </p>
                            <p>
                                <strong className="text-blue-700">Location:</strong> {selectedJob.location}
                            </p>
                            <p>
                                <strong className="text-blue-700">Salary:</strong> ${selectedJob.salary}
                            </p>
                            <p>
                                <strong className="text-blue-700">Deadline:</strong> {new Date(selectedJob.deadline).toLocaleString()}
                            </p>
                            <p>
                                <strong className="text-blue-700">Salary:</strong> ${selectedJob.salary}
                            </p>
                        </div>

                        <div className="mt-6 flex justify-between">
                            <button
                                className="bg-blue-600 text-white p-3 rounded w-full"
                                onClick={() => applyForJob(selectedJob.jobListingId)}
                            >
                                Apply Now
                            </button>
                            <button
                                className="text-red-600 p-3 w-full"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showUnauthorizedModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full space-y-6 text-center">
                        <h2 className="text-3xl font-bold text-red-600">Unauthorized Access</h2>
                        <p className="text-gray-700">
                            You must be logged in as a Job Seeker to view job listings.
                        </p>
                        <button
                            className="bg-blue-600 text-white p-3 rounded w-full"
                            onClick={closeUnauthorizedModal}
                        >
                            Go to Home
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default JobListing;

