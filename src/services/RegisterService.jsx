import api from "./api";

export const registerEmployer = async (registrationData) => {
    try {
        const response = await api.post("/Auth/employer/register", registrationData);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            throw new Error("Something went wrong while registering employer.");
        }
    }
};

export const registerJobSeeker = async (registrationData) => {
    try {
        const response = await api.post("/Auth/jobseeker/register", registrationData);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            throw new Error("Something went wrong while registering job seeker.");
        }
    }
};

