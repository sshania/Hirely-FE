import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="flex w-[900px] shadow-lg rounded-lg overflow-hidden">
        {/* Left side (Hirely Section with Background Image) */}
        <div 
          className="w-1/2 flex flex-col justify-center items-center p-10 text-white"
          style={{ 
            backgroundImage: "url('/Hirelybg.jpg')", 
            backgroundSize: "cover", 
            backgroundPosition: "center" 
        }}
        >
          <h1 className="text-3xl font-bold text-black">Hirely</h1>
          <p className="mt-2 text-black">Connecting others</p>
        </div>

        {/* Right side (Login Form) */}
        <div className="w-1/2 bg-white p-10">
          <h2 className="text-2xl font-bold text-center text-black">Welcome!</h2>
          <p className="text-center text-gray-600">
            Don't have an account? <a href="#" className="text-blue-500">Sign Up Here!</a>
          </p>
          {/* Form */}
          <form className="mt-6">
            <input className="border border-gray-400 p-2 w-full rounded mt-3 placeholder-gray-500 text-black" placeholder="E-mail Address" />
            <input className="border border-gray-400 p-2 w-full rounded mt-3 placeholder-gray-500 text-black" placeholder="Password" type="password" />
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-600 text-sm">Remember me</span>
              </div>
              <a href="#" className="text-blue-500 text-sm">Forgot Password?</a>
            </div>
            <button className="w-full mt-5 bg-black text-white py-2 rounded">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;