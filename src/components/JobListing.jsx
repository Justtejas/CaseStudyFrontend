import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import JobListingService from '../services/JobListingServices';
import ApplicationService from '../services/ApplicationService';
import { toast } from 'react-toastify';
import Header from './Header';
import { Footer } from './Footer';

const JobListing = () => {
    const { authUser } = useAuth();
    const [jobListings, setJobListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        if (authUser?.role !== 'JobSeeker') {
            toast.error('You must be a JobSeeker to view job listings.');
            return;
        }
        fetchJobListings();
    }, [authUser]);

    const fetchJobListings = async () => {
        setLoading(true);
        try {
            const data = await JobListingService.fetchAllJobListings();
            setJobListings(data);
            setFilteredListings(data)
        } catch (error) {
            toast.error('Error fetching job listings');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        const searchQuery = (searchTerm || '').trim();
        if (searchQuery === '') {
            setFilteredListings(jobListings);  
        } else {
            const filtered = jobListings.filter((job) =>
                job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredListings(filtered);
        }
    };


    const applyForJob = async (jobListingId) => {
        try {
            const applicationData = { jobListingId, jobSeekerId: authUser.id };
            await ApplicationService.createApplication(applicationData);
            toast.success('Application submitted successfully');
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const openJobModal = (job) => {
        setSelectedJob(job);
    };

    const closeModal = () => {
        setSelectedJob(null);
    };

    return (
        <div className="min-h-screen w-full flex flex-col g-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-black">
            <Header />
            <div className="flex-grow mx-auto max-w-screen-xl">
                <h1 className="text-4xl font-bold text-center mt-8 mb-6 text-white">Job Listings</h1>

                <div className="flex justify-between items-center mb-6 px-6">
                    <div className="w-full flex">
                        <input
                            type="text"
                            className="p-3 w-full rounded-md text-black"
                            placeholder="Search by title or company"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            className="bg-blue-700 text-white p-3 rounded ml-4"
                            onClick={handleSearch}
                            disabled={loading}
                        >
                            Search
                        </button>
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
                            <div key={job.jobListingId} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
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
                            <p><strong className="text-blue-700">Job Description:</strong> {selectedJob.jobDescription}</p>
                            <p><strong className="text-blue-700">Eligibility:</strong> {selectedJob.eligibilityCriteria}</p>
                            <p><strong className="text-blue-700">Required Skills:</strong> {selectedJob.requiredSkills}</p>
                            <p><strong className="text-blue-700">Hiring Workflow:</strong> {selectedJob.hiringWorkflow}</p>
                            <p><strong className="text-blue-700">Location:</strong> {selectedJob.location}</p>
                            <p><strong className="text-blue-700">Salary:</strong> ${selectedJob.salary}</p>
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

            <Footer />
        </div>
    );
};

export default JobListing;

