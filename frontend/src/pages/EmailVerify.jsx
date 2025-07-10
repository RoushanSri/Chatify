import React from 'react';
import { Mail, CheckCircle, ArrowLeft, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function EmailVerify() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center p-4">
            <div 
        className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 z-0"
        style={{
          clipPath: 'polygon(0 0, 100% 0%, 100% 60%, 20% 100%, 0 85%)',
          animation: 'waveFloat 6s ease-in-out infinite'
        }}
      />
            
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-teal-500 rounded-lg p-3 mr-3">
                            <MessageCircle className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-teal-600">Chatify</h1>
                    </div>
                </div>

                <div className="flex justify-center mb-6">
                    <div className="bg-teal-100 rounded-full p-6">
                        <Mail className="w-12 h-12 text-teal-500" />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-teal-500 mb-4">Check your email</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
                    </p>
                    
                    <div className="flex items-center justify-center bg-green-50 rounded-lg p-4 mb-6">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-green-700 font-medium">Verification email sent successfully!</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition duration-200">
                        Resend Verification Email
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div onClick={()=>navigate("/login")} className="flex items-center justify-center text-gray-500 hover:text-teal-500 cursor-pointer transition duration-200">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        <span className="text-sm">Back to Sign In</span>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Didn't receive the email? Check your spam folder or{' '}
                        <span className="text-teal-500 hover:text-teal-600 cursor-pointer font-medium">
                            contact support
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default EmailVerify;