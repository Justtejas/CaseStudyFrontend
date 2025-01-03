import api from './api';


const JobListingService = {
    async fetchAllJobListings() {
        try {
            const response = await api.get("JobListing/GetAllJobListings");
            if (!response.data || !response.data.data || !Array.isArray(response.data.data.$values)) {
                throw new Error("Invalid response format or no job listings available");
            }
            return response.data.data.$values;
        } catch (error) {
            throw error;
        }
    },

    async fetchJobListingByJobListingId(jobListingId) {
        try {
            const response = await api.get(`JobListing/GetJobListingsById/${jobListingId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async fetchJobListingByEmployerId(employerId) {
        try {
            const response = await api.get(`/JobListing/GetJobListingsByEmployerId/${employerId}`);
            if (!response.data || !response.data.data || !Array.isArray(response.data.data.$values)) {
                throw new Error('No job listings found');
            }
            return response.data.data.$values;
        } catch (error) {
            throw error;
        }
    },
    async deleteJobListing(jobListingId) {
        try {
            const response = await api.delete(`JobListing/DeleteJobListing/${jobListingId}`);
            return response.data?.message;
        } catch (error) {
            throw error;
        }
    },
    async createJobListing(jobListingData) {
        try {
            const response = await api.post('JobListing/CreateJobListing', jobListingData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async updateJobListing(jobListingId, jobListingData) {
        try {
            const response = await api.put(`JobListing/UpdateJobListing/${jobListingId}`, jobListingData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

};

export default JobListingService;

