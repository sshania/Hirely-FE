import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../src/assets/Hirely.png";

type JobResult = {
  Job_Title: string;
  Company: string;
  Category: string;
  Snippet: string;
  Apply_Now: string;
};

const ResultPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [jobResults, setJobResults] = useState<JobResult[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get("https://api.hirely.my.id/user/data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    const fetchJobResults = async () => {
      try {
        const res = await axios.get("https://api.hirely.my.id/result/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobResults(res.data);
      } catch (err) {
        console.error("Error fetching job results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchJobResults();
  }, [token]);

  return (
    <div className="w-screen min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-green-700 px-4 py-5 relative">
        <img
          src={logo}
          alt="Hirely Logo"
          className="w-12 h-15 absolute left-1/2 top-[0.2%] transform -translate-x-1/2"
        />
        <span
          className="text-white text-xl font-semibold cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          ← <span className="hover:underline hover:decoration-black">Go back</span>
        </span>
      </div>

      {/* Title */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1
          style={{ fontSize: "60px" }}
          className="font-bold text-green-800 mb-2 text-center"
        >
          Job Result
        </h1>
      </div>

      <div className="flex space-x-6">
        {/* Sidebar - User Info */}
        <div className="bg-green-700 text-white p-10 rounded-lg w-1/6 h-119 items-center ml-10">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-white mx-auto mb-4 flex items-center justify-center">
            {user?.User_Picture ? (
              <img
                src={user.User_Picture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-16 h-16 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="w-full flex flex-col items-start text-left -ml-4">
            <p className="mb-10 self-center text font-bold ml-6 text-2xl">
              {user?.User_Name || "USERNAME"}
            </p>
            <p className="mb-4 text-xl">Name: {user?.User_Name || ""}</p>
            <p className="text-xl">Major: {user?.major?.Major_Name || ""}</p>
          </div>
        </div>

        {/* Job Results */}
        <div className="w-3/4 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center w-full mt-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
              <p className="mt-4 text-lg text-gray-600">Loading job matches...</p>
            </div>
          ) : jobResults.length === 0 ? (
            <p className="text-xl text-red-600">No job matches found.</p>
          ) : (
            jobResults.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-6 space-y-2"
              >
                <h2 className="text-black text-xl font-bold">
                  {job.Job_Title}
                </h2>
                <p className="text-black">{job.Company}</p>
                <div className="flex justify-end">
                  <a
                    href={job.Apply_Now}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="!bg-black !text-white font-semibold py-2 px-4 rounded hover:!bg-gray-800">
                      APPLY
                    </button>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
