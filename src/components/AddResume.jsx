import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddResume = () => {
    const [formData, setFormData] = useState({
        file: null,
        fileName: '',
        fileType: '',
        fileSize: 0,
        uploadDate: '',
        modifiedDate: '',
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const currentDate = new Date().toISOString();
            setFormData({
                ...formData,
                file: file,
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size,
                uploadDate: currentDate,
                modifiedDate: currentDate,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData)
        if (!formData.file) {
            toast.error('Please select a file to upload.');
            return;
        }
        if (formData.fileType !== "application/pdf") {
            toast.error('Please select a PDF file to upload.');
            return;
        }
        alert("file uploaded successfully")
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Upload Resume</h2>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    {/* File input only */}
                    <div>
                        <label
                            htmlFor="file"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Resume File (PDF files only)
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Submit button */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Upload Resume
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddResume;

