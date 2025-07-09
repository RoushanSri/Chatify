import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";

const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [focusedField, setFocusedField] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    setFormData({
      email: "",
      username: "",
      password: "",
    });
    setFocusedField("");
    setRememberMe(false);
  }, [isLogin]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login submitted:", {
        email: formData.email,
        password: formData.password,
      });
    } else {
      console.log("Register submitted:", formData);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>

            <div
                className="absolute top-10 left-10 w-20 h-20 border-2 border-purple-300 rotate-45 animate-spin opacity-30"
                style={{ animationDuration: "20s" }}
            ></div>
            <div className="absolute top-1/2 right-16 w-16 h-16 border-2 border-blue-300 rotate-12 animate-bounce opacity-20"></div>
            <div className="absolute bottom-20 left-1/2 w-24 h-24 border-2 border-indigo-300 rotate-45 animate-pulse opacity-25"></div>

            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-ping"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                ></div>
            ))}
        </div>

        <div
            className="absolute w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-10 pointer-events-none transition-all duration-1000 ease-out"
            style={{
                left: mousePos.x - 192,
                top: mousePos.y - 192,
            }}
        ></div>
        <div className="relative z-10 h-screen flex items-center justify-center p-4 gap-12">
            {!isLogin ? (
                <Register
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    formData={formData}
                    toggleAuthMode={toggleAuthMode}
                />
            ) : (
                <Login
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    formData={formData}
                    toggleAuthMode={toggleAuthMode}
                    rememberMe={setRememberMe}
                />
            )}
        </div>
    </div>
);
};

export default AuthLayout;
