import React, { useEffect, useState } from 'react';
import JobListingService from '../services/JobListingServices';
import { useAuth } from '../context/AuthContext';

const JobListing = () => {
    const [jobListings, setJobListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authUser } = useAuth();

    useEffect(() => {
        const fetchJobListings = async () => {
            try {
                const response = await JobListingService.fetchAllJobListings();
                setJobListings(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobListings();
    }, []);

    const handleDelete = async (jobListingId) => {
        if (!window.confirm('Are you sure you want to delete this job listing?')) return;

        try {
            await JobListingService.deleteJobListing(jobListingId);
            setJobListings((prev) => prev.filter((job) => job.id !== jobListingId));
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading job listings...</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Job Listings
            </h2>
            {jobListings.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                    <p className="text-lg">No job listings available.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-lg rounded-lg border-collapse">
                        <thead className="bg-indigo-600 text-white text-sm uppercase tracking-wide">
                            <tr>
                                <th className="py-3 px-6 text-left">#</th>
                                <th className="py-3 px-6 text-left">Job Title</th>
                                <th className="py-3 px-6 text-left">Company</th>
                                <th className="py-3 px-6 text-left">Location</th>
                                <th className="py-3 px-6 text-center">Vacancy</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobListings.map((job, index) => (
                                <tr
                                    key={job.jobListingId}
                                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } border-b hover:bg-indigo-50`}
                                >
                                    <td className="py-4 px-6 text-sm font-medium text-gray-700">
                                        {index + 1}
                                    </td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                        {job.jobTitle}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-700">
                                        {job.companyName}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-700">
                                        {job.location}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${job.vacancyOfJob
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {job.vacancyOfJob ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm"
                                            onClick={() => handleDelete(job.jobListingId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    );
};

export default JobListing;

