import React from "react";
import logo from "../src/assets/Hirely.png";

const JobMatchPage: React.FC = () => {
  return (
    <div className="w-screen min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-green-600 px-4 py-3">
      <img src={logo} alt="Hirely Logo" className="w-12 h-15 absolute left-1/2 top-[0.2%] transform -translate-x-1/2" />  
        <button
          className="text-white font-semibold bg-black px-4 py-1 rounded"
        >
          ← Go back
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-green-700 mb-2">
          Find Your Perfect Job Match
        </h1>
        <p className="text-gray-700 mb-6">
          Fill out the form below to get matched with suitable job opportunities.
        </p>

        <form className="bg-white rounded-lg shadow p-6 space-y-4">
          {/* Preferred Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Job Type
          </label>
          <select className="w-full border border-gray-300 p-3 rounded text-gray-800">
            <option value="">Preferred Job Type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="freelance">Freelance</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
        </div>

          {/* Years of Experience */}
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
             </label>
          <input
            type="text"
            placeholder="Years"
            className="w-full border border-gray-300 p-3 rounded text-gray-800"
          />
          </div>

          {/* Top Skills */}
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
                Top Skills
             </label>
          <input
            type="text"
            placeholder="Skills"
            className="w-full border border-gray-300 p-3 rounded text-gray-800"
          />
          </div>

          {/* Additional Notes */}
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
             </label>
          <textarea
            placeholder="Notes"
            className="w-full border border-gray-300 p-3 rounded text-gray-800 min-h-[100px]"
          />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white font-semibold py-3 rounded hover:bg-green-700"
          >
            Find my match
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobMatchPage;
