import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../src/assets/Hirely.png";

interface Major {
  Major_Id: number;
  Major_Name: string;
}

interface UserData {
  User_Name: string;
  User_Email: string;
  User_Phone_Number: string;
  User_Gender?: string | null;
  User_Description?: string | null;
  User_Work_Experience?: number | null;
  User_Final_Academic?: string | null;
  User_Picture?: string | null;
  major?: Major | null;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get<UserData>(
        // "https://api.hirely.my.id/user/data"
        "https://api-hirely.localto.net/user/data"
        , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
        setLoading(false);
      });
  }, []);

  const getValue = (val: any) => (val || val === 0 ? val : "(no data)");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-gray-100 font-sans">
      {/* Navbar */}
      <div className="bg-green-700 px-4 py-3 flex items-center justify-between relative">
        <button
          onClick={() => navigate("/Homepage")}
          className="text-white text-sm font-medium"
        >
          ← Go back
        </button>
        <img
          src={logo}
          alt="Hirely Logo"
          className="h-8 absolute left-1/2 transform -translate-x-1/2"
        />
      </div>

      {/* Profile Card */}
      <div className="flex justify-center pt-10">
        <div className="bg-green-700 text-white rounded-3xl w-[400px] p-6 text-sm font-medium shadow-lg">
          <div className="flex flex-col items-center mb-4">
            <img
              src={
                user?.User_Picture ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="w-20 h-20 rounded-full mb-2"
            />
            <h2 className="text-lg font-bold">{getValue(user?.User_Name)}</h2>
          </div>

          {/* Info List */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Name</span>
              <span>: {getValue(user?.User_Name)}</span>
            </div>
            <div className="flex justify-between">
              <span>E-mail</span>
              <span>: {getValue(user?.User_Email)}</span>
            </div>
            <div className="flex justify-between">
              <span>Phone</span>
              <span>: {getValue(user?.User_Phone_Number)}</span>
            </div>
            <div className="flex justify-between">
              <span>Gender</span>
              <span>: {getValue(user?.User_Gender)}</span>
            </div>
            <div className="flex justify-between">
              <span>Description</span>
              <span className="text-right max-w-[200px] truncate">
                : {getValue(user?.User_Description)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Experience</span>
              <span>: {getValue(user?.User_Work_Experience)} year(s)</span>
            </div>
            <div className="flex justify-between">
              <span>Academic</span>
              <span>: {getValue(user?.User_Final_Academic)}</span>
            </div>
            <div className="flex justify-between">
              <span>Major</span>
              <span>: {getValue(user?.major?.Major_Name)}</span>
            </div>
          </div>

          {/* Div 1: Edit + Change Password */}
          <div className="space-y-2">
            <button
              onClick={() => navigate("/editprofile")}
              className="w-full bg-white text-green-700 font-semibold py-2 rounded-lg hover:bg-gray-200"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate("/changePassword")}
              className="w-full bg-white text-green-700 font-semibold py-2 rounded-lg hover:bg-gray-200"
            >
              Change Password
            </button>
          </div>

          {/* Div 2: Check Result */}
          <div className="mt-4">
            <button
              onClick={() => navigate("/result")}
              className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800"
            >
              Check Result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
