import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Check, Mail, Lock, MessageCircle, ArrowRight } from 'lucide-react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setFormData((prevData) => ({ ...prevData, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      console.log("Please fill all the fields");
      return;
    }
    
    setIsLoading(true);
    dispatch(loginUser({ email: formData.email, password: formData.password }))
      .then((response) => {
        if (response.payload.success) {
          if (rememberMe)
            localStorage.setItem("userEmail", formData.email);
          navigate("/u/");
        }
      })
      .catch((error) => {
        console.error("An error occurred during login:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const features = [
    "Real-time messaging with friends and groups",
    "Share images, files, and voice notes instantly", 
    "Customizable chat themes and emojis",
    "End-to-end encrypted conversations"
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-100 min-h-screen overflow-x-hidden relative">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 z-0"
        style={{
          clipPath: 'polygon(0 0, 100% 0%, 100% 60%, 20% 100%, 0 85%)',
          animation: 'waveFloat 6s ease-in-out infinite'
        }}
      />
      
      <style jsx>{`
        @keyframes waveFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(0.5deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .floating-animation {
          animation: float 4s ease-in-out infinite;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #4ecdc4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          <div className="text-white space-y-6">
            <div className="text-3xl font-bold text-teal-300 mb-12 flex items-center gap-3">
              <div className="bg-white rounded-lg p-2 hover:scale-110 delay-100 duration-300 ease-in-out">
                <MessageCircle color="#008479" fill="#008479"/>
              </div>
              Chatify
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight gradient-text">
              Welcome Back to Chatify
            </h1>
            
            <p className="text-xl text-teal-100 leading-relaxed max-w-lg">
              Continue your conversations where you left off. Sign in to reconnect with friends and access all your chats instantly.
            </p>
            
            <ul className="space-y-4 text-lg">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3 group">
                  <div className="w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center group-hover:bg-teal-300 transition-colors">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-teal-50 group-hover:text-white transition-colors">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            
            <div className="pt-6">
              <button 
                onClick={() => navigate("/register")}
                className="inline-flex items-center text-teal-300 hover:text-teal-200 font-semibold text-lg border-b-2 border-transparent hover:border-teal-300 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                New to Chatify? Create an account
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          
          <div className="floating-animation">
            <div className="bg-white rounded-2xl p-8 shadow-2xl backdrop-blur-sm border border-white/20">

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-teal-700 mb-2">Sign In</h2>
                <p className="text-gray-600">Access your account and continue chatting</p>
              </div>
              
              <div className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    required
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type={showPassword?"text":"password"}
                    name="password"
                    placeholder="Password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={()=>setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                  <button 
                    type="button" 
                    className="text-sm text-teal-600 hover:text-teal-500 font-semibold"
                  >
                    Forgot password?
                  </button>
                </div>

                <button 
                  type="button" 
                  onClick={handleSubmit}
                  disabled={!formData.email || !formData.password || isLoading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors transform hover:scale-105 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button 
                      type="button" 
                      onClick={() => navigate("/register")}
                      className="text-teal-600 hover:text-teal-500 font-semibold"
                    >
                      Sign up here
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;