import React from 'react';
import UploadForm from '../components/Upload/UploadForm';

function UploadPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Upload Video</h1>
                    <UploadForm />
                </div>
            </div>
        </div>
    );
}

export default UploadPage; 