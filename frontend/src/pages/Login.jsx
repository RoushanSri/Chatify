import React from 'react';
import img1 from "../assets/image1.webp";

const Login = ({formData, handleInputChange, setFocusedField, focusedField, handleSubmit, toggleAuthMode, rememberMe, setRememberMe}) => {

  return (
      <div className="relative z-10 h-screen flex items-center justify-center p-4 gap-12">
        <div className="w-full max-w-2xl h-full flex items-center">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 sm:p-10 relative overflow-hidden w-full h-full flex flex-col justify-center">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-purple-500/10 rounded-3xl"></div>
              
                          <img
                            src={img1}
                            alt="image"
                            className="w-full h-full object-cover rounded-3xl"
                          />
                        </div>
        </div>
        <div className="w-full max-w-2xl h-full flex items-center">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 sm:p-10 relative overflow-hidden w-full h-full flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-purple-500/10 rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="mb-8 text-center">
                <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4 shadow-lg animate-bounce">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent tracking-tight mb-2">
                  Sign In
                </h1>
                <p className="text-white/70 text-sm">
                  Welcome back to <span className="text-purple-300 font-semibold">Chatify</span>
                </p>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-white/90">Email address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      placeholder="you@chatify.com"
                      className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 ${
                        focusedField === 'email' ? 'bg-white/20 shadow-lg transform scale-105' : ''
                      }`}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-white/90">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField('')}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 ${
                        focusedField === 'password' ? 'bg-white/20 shadow-lg transform scale-105' : ''
                      }`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 border-2 border-white/30 rounded-md mr-3 flex items-center justify-center transition-all duration-300 ${rememberMe ? 'bg-purple-500 border-purple-500' : 'bg-white/10'}`}>
                      {rememberMe && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-white/70">Remember me</span>
                  </label>
                  
                  <a 
                    href="#" 
                    className="text-sm text-purple-300 hover:text-purple-200 transition-colors duration-300 relative group"
                  >
                    <span className="relative z-10">Forgot password?</span>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-purple-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In
                  </span>
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-white/60 text-sm">
                  Don't have an account?{' '}
                  <span
                    onClick={()=>toggleAuthMode()}
                    className="text-purple-300 font-medium hover:text-purple-200 transition-colors duration-300 relative group cursor-pointer"
                  >
                    <span className="relative z-10">Sign up</span>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-purple-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;