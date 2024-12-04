import api from './api';
import { toast } from 'react-toastify';

const ResumeService = {

    uploadResume: async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await api.post("/resume/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Resume Uploaded Successfully")
            return response.data;
        } catch (error) {
            toast.error("Error uploading resume:", error.response ? error.response.data : error);
            throw error;
        }
    },

    downloadResume: async (jobSeekerId, resumeId) => {
        try {
            const response = await api.get(`/resume/download/${jobSeekerId}/${resumeId}`, {
                responseType: "blob",
            });
            return response.data;
        } catch (error) {
            toast.error("Error downloading resume:", error.response ? error.response.data : error);
            throw error;
        }
    },

    deleteResume: async (resumeId) => {
        try {
            const response = await api.delete(`/resume/delete/${resumeId}`);
            return response.data;
        } catch (error) {
            toast.error("Error deleting resume:", error.response ? error.response.data : error);
            throw error;
        }
    },

    updateResume: async (resumeId, newFile) => {
        try {
            const formData = new FormData();
            formData.append("newFile", newFile);
            const response = await api.put(`/resume/update/${resumeId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Updated Resume Successfully");
            return response.data;
        } catch (error) {
            toast.error("Error updating resume:", error.response ? error.response.data : error);
            throw error;
        }
    },
};

export default ResumeService;

