import React from 'react';

function EmailVerify() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <svg
                    className="mx-auto mb-4 w-16 h-16 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                >
                    <rect x="6" y="12" width="36" height="24" rx="4" fill="#e0e7ff" />
                    <path
                        d="M6 12l18 15L42 12"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </svg>
                <h2 className="text-2xl font-semibold mb-2">Check your email</h2>
                <p className="text-gray-600 mb-4">
                    We have sent a verification link to your email address. Please check your inbox and follow the instructions to verify your account.
                </p>
            </div>
        </div>
    );
}

export default EmailVerify;
