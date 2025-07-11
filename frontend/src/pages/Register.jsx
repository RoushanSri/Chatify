import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Check, Mail, Lock, User, MessageCircle  } from 'lucide-react';
import {FaEyeSlash, FaEye} from 'react-icons/fa'

const Register = () => {

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [ agreeToTerms, setAgreeToTerms ] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      if( !formData.email || !formData.password ){
        console.log("fill all the fields");
        return;
      }
      dispatch(loginUser({email:formData.email, password:formData.password}))
      .then((response) => {
        if (response.payload.success) {
          navigate("/u/");
        }
      })
      .catch((error) => {
        console.error("An error occurred during login:", error);
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
        className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 z-0 animate-pulse"
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
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ">
          <div className="text-white space-y-6">
            <div className="text-3xl font-bold text-teal-300 mb-12 flex items-center gap-3">
               <div className="bg-white rounded-lg p-2 hover:scale-110 delay-100 duration-300 ease-in-out"><MessageCircle color="#008479" fill="#008479"/></div>Chatify
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight gradient-text">
              Start connecting with your Freinds.
            </h1>
            <p className="text-xl text-teal-100 leading-relaxed max-w-lg">
              Chatify is a modern chat application that allows you to connect with friends. Whether you're chatting one-on-one or in groups, Chatify makes it easy to stay in touch and share moments.
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
          </div>
          <div className="floating-animation">
            <div className="bg-white rounded-2xl p-8 shadow-2xl backdrop-blur-sm border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-teal-700 mb-2">Join the Conversation</h2>
                <p className="text-gray-600">Sign up to chat with friends and groups instantly.</p>
                <div className="text-sm text-gray-500 mt-2">
                  Already have an account? 
                  <button onClick={()=>navigate("/login")} className="text-teal-600 hover:text-teal-500 font-semibold ml-1">
                    Sign in →
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    name="username"
                    placeholder="Username" 
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    required
                  />
                </div>
                
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
                    type={showPassword ? "text" : "password"} 
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
                
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    name="agreeToTerms"
                    checked={agreeToTerms || false}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    I hereby agree to the 
                    <button type="button" className="text-teal-600 hover:text-teal-500 ml-1">
                      Privacy Policy
                    </button>
                  </label>
                </div>
                
                <button 
                  type="button" 
                  onClick={handleSubmit}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors transform hover:scale-105 duration-200 disabled:opacity-50"
                  disabled={!agreeToTerms}
                >
                  Start Free Trial
                </button>
                
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  By signing up, you agree to our 
                  <button type="button" className="text-teal-600 hover:text-teal-500 mx-1">
                    Terms and Conditions
                  </button> 
                  and 
                  <button type="button" className="text-teal-600 hover:text-teal-500 mx-1">
                    Privacy Policy
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
