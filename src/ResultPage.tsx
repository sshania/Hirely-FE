import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../src/assets/Hirely.png";

const ResultPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://25d5-103-80-236-175.ngrok-free.app/api/user")
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gray-100">
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
          ←{" "}
          <span className="hover:underline hover:decoration-black">
            Go back
          </span>
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1
          style={{ fontSize: "60px" }}
          className="font-bold text-green-800 mb-2 text-center"
        >
          Job Result
        </h1>
      </div>

      <div className="flex space-x-6">
        <div className="bg-green-700 text-white p-10 rounded-lg w-1/6 h-119 items-center ml-10">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-white mx-auto mb-4 flex items-center justify-center">
            {user?.profilePicUrl ? (
              <img
                src={user.profilePicUrl}
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
            <p
              style={{ fontSize: "30px" }}
              className="mb-10 self-center text font-bold ml-6"
            >
              {user?.username || "USERNAME"}
            </p>
            <p style={{ fontSize: "30px" }} className="mb-12">
              Name : {user?.name || ""}
            </p>
            <p style={{ fontSize: "30px" }}>
              Job Title : {user?.jobTitle || ""}
            </p>
          </div>
        </div>

        <div className="w-3/4 space-y-6">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 space-y-2"
            >
              <h2 className="text-black text-xl font-bold">Company Name</h2>
              <p className="text-black">Job Title</p>
              <div className="flex justify-end">
                <button className="!bg-black !text-white font-semibold py-2 px-4 rounded hover:!bg-gray-800">
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
