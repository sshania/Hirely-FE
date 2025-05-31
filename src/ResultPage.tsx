import React from "react";
import logo from "../src/assets/Hirely.png";

const ResultPage: React.FC = () => {
  return (
    <div className="w-screen min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-green-600 px-4 py-3 relative">
        <img 
          src={logo} 
          alt="Hirely Logo" 
          className="w-12 h-15 absolute left-1/2 top-[0.2%] transform -translate-x-1/2" 
        />  
        <button className="text-white font-semibold bg-black px-4 py-1 rounded">
          ← Go back
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 style={{ fontSize: "60px" }} className="font-bold text-green-800 mb-2 text-center">
          Job Result
        </h1>
     </div>

        <div className="flex space-x-6">
          {/* User Profile Section */}
          <div className="bg-green-700 text-white p-10 rounded-lg w-1/6 h-119 items-center ml-10">
            <div className="w-32 h-32 bg-black mx-auto mb-4"></div>
                <div className="w-full flex flex-col items-start text-left -ml-4">
                <p style={{ fontSize: "30px" }} className="mb-10 self-center text font-bold ml-6">USERNAME</p>
                <p style={{ fontSize: "30px" }} className="mb-12">Name : </p>
                <p style={{ fontSize: "30px" }}>Job Title : </p>
                </div>
          </div>

          {/* Job Listings Section */}
          <div className="w-3/4 space-y-6">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6 space-y-2">
                <h2 className="text-black text-xl font-bold">Company Name</h2>
                <p className="text-black">Job Title</p>
                <p className="text-black">Requirement</p>
                <p className="text-black">Salary</p>
                <div className="flex justify-end space-x-4">
                  <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700">
                    INFO
                  </button>
                  <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700">
                    APPLY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default ResultPage;
