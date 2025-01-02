import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import JobSeekerService from '../services/JobSeekerServices';
import { Footer } from './Footer';
import Header from './Header';

let debounceTimeout;
const JobSeekersList = () => {
    const [jobSeekers, setJobSeekers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [filteredJobSeeker, setFilteredJobSeeker] = useState([]);
    document.title = "Career Crafter | Job Seekers";

    useEffect(() => {
        fetchJobSeekers();
    }, []);

    const fetchJobSeekers = async () => {
        setLoading(true);
        try {
            const response = await JobSeekerService.getAllJobSeekers();
            const jobSeekersData = response.data.$values.map((jobSeeker) => {
                const { role, jobSeekerId, $id, ...filteredJobSeeker } = jobSeeker;
                return filteredJobSeeker;
            });
            setJobSeekers(jobSeekersData);
            setFilteredJobSeeker(jobSeekersData)
        } catch (error) {
            toast.error('Error fetching job seekers.');
            console.error('Error fetching job seekers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchQuery(term);
        debouncedSearch(term);
    };


    const debouncedSearch = (term) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const query = term.trim().toLowerCase();
            if (!query) {
                setFilteredJobSeeker(jobSeekers);
            } else {
                const filtered = jobSeekers.filter(jobSeeker =>
                    jobSeeker.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    jobSeeker.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    jobSeeker.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    jobSeeker.qualification.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    jobSeeker.position.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setFilteredJobSeeker(filtered);
            }
        }, 200);
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-black">
            <Header />
            <div className="flex-grow mx-auto max-w-screen-xl px-4">
                <h1 className="text-4xl font-bold text-center mt-8 mb-6 text-white">Job Seekers List</h1>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search Job Seekers by Name, Specialization, Qualification, Place or Address"
                        className="w-full p-4 border border-gray-300 rounded-md"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="spinner-border text-light" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobSeeker.length === 0 ? (
                            <p className="text-center text-red-500 col-span-full">No job seekers found.</p>
                        ) : (
                            filteredJobSeeker.map((jobSeeker) => (
                                <div key={jobSeeker.userName} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                                    <h2 className="text-xl font-semibold">{jobSeeker.userName}</h2>
                                    <p className="text-gray-600 mt-2"><strong>Email:</strong> {jobSeeker.email}</p>
                                    <p className="text-gray-600"><strong>Phone:</strong> {jobSeeker.contactPhone}</p>
                                    <p className="text-gray-600"><strong>Address:</strong> {jobSeeker.address}</p>
                                    <p className="text-gray-600"><strong>Description:</strong> {jobSeeker.description}</p>
                                    <p className="text-gray-600"><strong>Date of Birth:</strong> {new Date(jobSeeker.dateOfBirth).toLocaleDateString()}</p>
                                    <p className="text-gray-600"><strong>Qualification:</strong> {jobSeeker.qualification}</p>
                                    <p className="text-gray-600"><strong>Specialization:</strong> {jobSeeker.specialization}</p>
                                    <p className="text-gray-600"><strong>Institute:</strong> {jobSeeker.institute}</p>
                                    <p className="text-gray-600"><strong>Year:</strong> {jobSeeker.year}</p>
                                    <p className="text-gray-600"><strong>CGPA:</strong> {jobSeeker.cgpa}</p>
                                    <p className="text-gray-600"><strong>Company Name:</strong> {jobSeeker.companyName}</p>
                                    <p className="text-gray-600"><strong>Position:</strong> {jobSeeker.position}</p>
                                    <p className="text-gray-600"><strong>Start Date:</strong> {new Date(jobSeeker.startDate).toLocaleDateString()}</p>
                                    <p className="text-gray-600"><strong>End Date:</strong> {new Date(jobSeeker.endDate).toLocaleDateString()}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default JobSeekersList;

