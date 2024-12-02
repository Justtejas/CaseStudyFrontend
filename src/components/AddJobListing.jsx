import React, { useState } from "react";

const AddJobListing = () => {
    const [formData, setFormData] = useState({
        jobTitle: "",
        jobDescription: "",
        companyName: "",
        hiringWorkflow: "",
        eligibilityCriteria: "",
        requiredSkills: "",
        aboutCompany: "",
        location: "",
        salary: "",
        deadline: "",
        vacancyOfJob: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
    };

    return (
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">
                Job Posting Form
            </h2>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Job Title */}
                <div>
                    <label
                        htmlFor="jobTitle"
                        className="block text-sm font-medium mb-2 text-gray-600"
                    >
                        Job Title
                    </label>
                    <input
                        type="text"
                        name="jobTitle"
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        minLength="3"
                        maxLength="100"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Job Description */}
                <div>
                    <label
                        htmlFor="jobDescription"
                        className="block text-sm font-medium mb-2 text-gray-600"
                    >
                        Job Description
                    </label>
                    <textarea
                        name="jobDescription"
                        id="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleChange}
                        minLength="10"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Company Name */}
                <div>
                    <label
                        htmlFor="companyName"
                        className="block text-sm font-medium mb-2 text-gray-600"
                    >
                        Company Name
                    </label>
                    <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        minLength="3"
                        maxLength="100"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Hiring Workflow */}
                <div>
                    <label
                        htmlFor="hiringWorkflow"
                        className="block text-sm font-medium mb-2 text-gray-600"
                    >
                        Hiring Workflow
                    </label>
                    <textarea
                        name="hiringWorkflow"
                        id="hiringWorkflow"
                        value={formData.hiringWorkflow}
                        onChange={handleChange}
                        minLength="5"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Eligibility Criteria */}
                <div>
                    <label
                        htmlFor="eligibilityCriteria"
                        className="block text-sm font-medium mb-2 text-gray-600"
                    >
                        Eligibility Criteria
                    </label>
                    <textarea
                        name="eligibilityCriteria"
                        id="eligibilityCriteria"
                        value={formData.eligibilityCriteria}
                        onChange={handleChange}
                        minLength="5"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Required Skills */}
                <div>
                    <label
                        htmlFor="requiredSkills"
                        className="block text-sm font-medium mb-2 text-gray-600"
                    >
                        Required Skills
                    </label>
                    <textarea
                        name="requiredSkills"
                        id="requiredSkills"
                        value={formData.requiredSkills}
                        onChange={handleChange}
                        minLength="3"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* About Company */}
                <div>
                    <label
                        htmlFor="aboutCompany"
                        className="block text-sm font-medium mb-2 text-gray-600"
                    >
                        About the Company
                    </label>
                    <textarea
                        name="aboutCompany"
                        id="aboutCompany"
                        value={formData.aboutCompany}
                        onChange={handleChange}
                        minLength="10"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Location */}
                <div>
                    <label
                        htmlFor="location"
                        className="block text-sm font-medium mb-2 text-gray-600"
                    >
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        minLength="3"
                        maxLength="100"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Salary */}
                <div>
                    <label
                        htmlFor="salary"
                        className="block text-sm font-medium mb-2 text-gray-600"
                    >
                        Salary
                    </label>
                    <input
                        type="number"
                        name="salary"
                        id="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Deadline */}
                <div>
                    <label
                        htmlFor="deadline"
                        className="block text-sm font-medium mb-2 text-gray-600"
                    >
                        Deadline
                    </label>
                    <input
                        type="date"
                        name="deadline"
                        id="deadline"
                        value={formData.deadline}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Vacancy of Job */}
                <div className="col-span-2">
                    <label
                        htmlFor="vacancyOfJob"
                        className="flex items-center text-sm font-medium text-gray-600"
                    >
                        <input
                            type="checkbox"
                            name="vacancyOfJob"
                            id="vacancyOfJob"
                            checked={formData.vacancyOfJob}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Vacancy Open
                    </label>
                </div>

                {/* Submit Button */}
                <div className="col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                    >
                        Post Job
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddJobListing;

