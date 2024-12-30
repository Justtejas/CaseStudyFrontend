import api from './api';

const JobSeekerService = {
    getAllJobSeekers: async () => {
        try {
            const response = await api.get('/JobSeeker/GetAllJobSeekers');
            return response.data;
        } catch (error) {
            console.error('Error fetching all JobSeekers:', error.response ? error.response.data : error);
            throw error;
        }
    },

    updateJobSeeker: async (jobSeekerId, jobSeekerData) => {
        try {
            const response = await api.put(`/JobSeeker/UpdateJobSeeker/${jobSeekerId}`, jobSeekerData);
            return response.data;
        } catch (error) {
            console.error(`Error updating JobSeeker with ID ${jobSeekerId}:`, error.response ? error.response.data : error);
            throw error;
        }
    },

    getJobSeekerByUserName: async (userName) => {
        try {
            const response = await api.get(`/JobSeeker/GetJobSeekerByUserName/${userName}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching JobSeeker with username ${userName}:`, error.response ? error.response.data : error);
            throw error;
        }
    },

    getJobSeekerByJobSeekerId: async (jobSeekerId) => {
        try {
            const response = await api.get(`/JobSeeker/GetJobSeekerByJobSeekerId/${jobSeekerId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching JobSeeker with jobSeekerId ${jobSeekerId}:`, error.response ? error.response.data : error);
            throw error;
        }
    },

    deleteJobSeeker: async (jobSeekerId) => {
        try {
            const response = await api.delete(`/JobSeeker/DeleteJobSeeker/${jobSeekerId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting JobSeeker with ID ${jobSeekerId}:`, error.response ? error.response.data : error);
            throw error;
        }
    },
};

export default JobSeekerService;

