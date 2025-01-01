import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ResumeService from '../services/ResumeServices';
import { Footer } from './Footer';
import Header from './Header';

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

        if (!formData.file) {
            toast.error('Please select a file to upload.');
            return;
        }

        if (formData.fileType !== 'application/pdf') {
            toast.error('Please select a PDF file to upload.');
            return;
        }

        try {
            const data = await ResumeService.uploadResume(formData.file);
            console.log(data);
            toast.success('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('An error occurred during the upload.');
        }
    };

    return (
        <div className="h-full">
            <Header />
            <main className="flex flex-col h-5/6 items-center justify-center py-10 px-4">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl mx-auto">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
                        Upload Your Resume
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-500 text-white py-3 rounded-md font-medium text-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            >
                                Upload Resume
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AddResume;

