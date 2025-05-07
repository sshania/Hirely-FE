import React from "react";

const RegisterPage: React.FC = () => {
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
          <img
            src="/HirelyLogo.png"
            alt="Hirely Logo"
            className="h-24 w-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-black">Hirely</h1>
          <p className="mt-2 text-black">Connecting others</p>
        </div>

        {/* Right side (Sign Up Form) */}
        <div className="w-1/2 bg-white p-10">
          <h2 className="text-2xl font-bold text-center">Sign Up Now!</h2>
          <p className="text-center text-gray-600">
            Already have an account? <a href="#" className="text-blue-500">Login Here!</a>
          </p>
          {/* Form */}
          <form className="mt-6">
            <input className="border p-2 w-full rounded" placeholder="Username" />
            <input className="border p-2 w-full rounded mt-3" placeholder="E-mail Address" />
            <input className="border p-2 w-full rounded mt-3" placeholder="Password" type="password" />
            <div className="flex items-center mt-3">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600 text-sm">I have read and agree to the terms and policies</span>
            </div>
            <button className="w-full mt-5 bg-black text-white py-2 rounded">Create account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
