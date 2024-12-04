import api from './api';

const EmployerService = {
    getAllEmployers: async () => {
        try {
            const response = await api.get('/Employer/GetAllEmployers');
            return response.data;
        } catch (error) {
            console.error('Error fetching all Employers:', error.response ? error.response.data : error);
            throw error;
        }
    },

    getEmployerByUserName: async (userName) => {
        try {
            const response = await api.get(`/Employer/GetEmployerByUserName/${userName}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching Employer with username ${userName}:`, error.response ? error.response.data : error);
            throw error;
        }
    },

    getEmployerByEmployerId: async (employerId) => {
        try {
            const response = await api.get(`/Employer/GetEmployerByEmployerId/${employerId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching Employer with employer ID ${employerId}:`, error.response ? error.response.data : error);
            throw error;
        }
    },

    updateEmployer: async (employerId, employerData) => {
        try {
            const response = await api.put(`/Employer/UpdateEmployer/${employerId}`, employerData);
            console.log(response)
            return response.data;
        } catch (error) {
            console.error(`Error updating Employer with ID ${employerId}:`, error.response ? error.response.data : error);
            console.log(error)
            throw error;
        }
    },

    deleteEmployer: async (employerId) => {
        try {
            const response = await api.delete(`/Employer/DeleteEmployer/${employerId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting Employer with ID ${employerId}:`, error.response ? error.response.data : error);
            throw error;
        }
    },
};

export default EmployerService;

