import api from './api';
import { toast } from 'react-toastify';


const JobListingService = {
    async fetchAllJobListings() {
        try {
            const response = await api.get("JobListing/GetAllJobListings");
            console.log(response.data.data.$values);
            if (!response.data || !response.data.data || !Array.isArray(response.data.data.$values)) {
                throw new Error("Invalid response format or no job listings available");
            }
            return response.data.data.$values;
        } catch (error) {
            toast.error(error.response?.data?.Error || 'Error fetching job listings');
            throw error;
        }
    },

    async fetchJobListingByJobListingId(jobListingId) {
        try {
            const response = await api.get(`JobListing/GetJobListingsById/${jobListingId}`);
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.Error || 'Error fetching job listing details');
            throw error;
        }
    },

    async fetchJobListingByEmployerId(employerId) {
        console.log(employerId)
        try {
            const response = await api.get(`/JobListing/GetJobListingsByEmployerId/${employerId}`);
            console.log(response)
            console.log(response.data)
            if (!response.data || !response.data.data || !Array.isArray(response.data.data.$values)) {
                throw new Error('Invalid response format or no job listings found');
            }
            return response.data.data.$values;
        } catch (error) {
            toast.error(error.response?.data?.Error || 'Error fetching job listing details');
            throw error;
        }
    },
    async deleteJobListing(jobListingId) {
        console.log(jobListingId);
        try {
            const response = await api.delete(`JobListing/DeleteJobListing/${jobListingId}`);
            console.log(response);
            toast.success(response.data?.Message || 'Job listing deleted successfully');
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.Error || 'Error deleting job listing');
            throw error;
        }
    }
};

export default JobListingService;

