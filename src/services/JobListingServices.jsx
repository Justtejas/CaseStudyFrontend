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
            console.error(error.response?.data?.Error || 'Error fetching job listings');
            throw error;
        }
    },

    async fetchJobListingByJobListingId(jobListingId) {
        try {
            const response = await api.get(`JobListing/GetJobListingsById/${jobListingId}`);
            return response.data;
        } catch (error) {
            console.error(error.response?.data?.Error || 'Error fetching job listing details');
            throw error;
        }
    },

    async fetchJobListingByEmployerId(employerId) {
        try {
            const response = await api.get(`/JobListing/GetJobListingsByEmployerId/${employerId}`);
            if (!response.data || !response.data.data || !Array.isArray(response.data.data.$values)) {
                throw new Error('Invalid response format or no job listings found');
            }
            return response.data.data.$values;
        } catch (error) {
            console.error(error.response?.data?.Error || 'Error fetching job listing details');
            throw error;
        }
    },
    async deleteJobListing(jobListingId) {
        console.log(jobListingId);
        try {
            const response = await api.delete(`JobListing/DeleteJobListing/${jobListingId}`);
            console.log(response);
            console.success(response.data?.Message || 'Job listing deleted successfully');
            return response.data;
        } catch (error) {
            console.error(error.response?.data?.Error || 'Error deleting job listing');
            throw error;
        }
    },
    async createJobListing(jobListingData) {
        try {
            const response = await api.post('JobListing/CreateJobListing', jobListingData);
            return response.data;
        } catch (error) {
            console.error(error.response?.data?.Error || 'Error creating job listing');
            throw error;
        }
    },

    async updateJobListing(jobListingId, jobListingData) {
        try {
            const response = await api.put(`JobListing/UpdateJobListing/${jobListingId}`, jobListingData);
            return response.data;
        } catch (error) {
            console.error(error.response?.data?.Error || 'Error updating job listing');
            throw error;
        }
    },

};

export default JobListingService;

