import api from './api';

const ApplicationService = {

    getAllApplications: async () => {
        try {
            const response = await api.get('/application/GetAllApplications');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getApplicationById: async (applicationId) => {
        try {
            const response = await api.get(`/application/GetApplicationById/${applicationId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getApplicationByJSId: async (jobSeekerId) => {
        try {
            const response = await api.get(`/application/GetApplicationByJSId/${jobSeekerId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getApplicationByEmployerId: async (employerId) => {
        try {
            const response = await api.get(`/application/GetApplicationByEmployerId/${employerId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getApplicationByJobListingId: async (jobListingId) => {
        try {
            const response = await api.get(`/application/GetApplicationByListingId/${jobListingId}`);
            return response.data;
        } catch (error) {
            console.error(error)
            throw error;
        }
    },

    createApplication: async (applicationData) => {
        try {
            const response = await api.post('/application/CreateApplication', applicationData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateApplication: async (applicationId, applicationStatus) => {
        try {
            const response = await api.put(
                `/application/UpdateApplication/${applicationId}/${applicationStatus}`,
            );
            return response.data;
        } catch (error) {
            console.error(`Error updating application with ID ${applicationId}:`, error.response ? error.response.data : error);
            throw error;
        }
    },

    deleteApplication: async (applicationId) => {
        try {
            const response = await api.delete(`/application/DeleteApplication/${applicationId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting application with ID ${applicationId}:`, error.response ? error.response.data : error);
            throw error;
        }
    },
};

export default ApplicationService;

