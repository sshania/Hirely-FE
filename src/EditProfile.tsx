import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../src/assets/Hirely.png";
import { baseURL } from "./environment";

interface UserData {
  User_Name: string;
  User_Email: string;
  User_Phone_Number: string;
  User_Gender?: string;
  User_Description?: string;
  User_Work_Experience?: number;
  User_Final_Academic?: string;
  User_Picture?: string;
  major?: {
    Major_Id: number;
    Major_Name: string;
  };
}

const EditProfile: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserData>({
    User_Name: "",
    User_Email: "",
    User_Phone_Number: "",
    User_Gender: "",
    User_Description: "",
    User_Work_Experience: 0,
    User_Final_Academic: "",
    User_Picture: "",
    major: { Major_Id: 0, Major_Name: "" },
  });

  const [previewPic, setPreviewPic] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get<UserData>(
        // "https://api.hirely.my.id/user/data"
        // "https://b98e-103-80-236-171.ngrok-free.app/user/data"
          `${baseURL}/user/data`
        , {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setPreviewPic(response.data.User_Picture || "");
      })
      .catch(() => {});
  }, []);

  const handleChange = (field: keyof UserData, value: string | number) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewPic(result);
        setUser((prev) => ({ ...prev, User_Picture: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");

    axios
      .put(
        // "https://api.hirely.my.id/user/update"
        // "https://b98e-103-80-236-171.ngrok-free.app/user/update"
        `${baseURL}/user/update`
        ,
        {
          User_Name: user.User_Name,
          User_Email: user.User_Email,
          User_Phone_Number: user.User_Phone_Number,
          User_Gender: user.User_Gender,
          User_Description: user.User_Description,
          User_Work_Experience: user.User_Work_Experience,
          User_Final_Academic: user.User_Final_Academic,
          User_Picture: user.User_Picture,
          User_Major: user.major?.Major_Id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => navigate("/profile"))
      .catch(() => {});
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 font-sans">
      <div className="w-[900px] min-h-[600px] rounded-lg shadow-lg overflow-hidden bg-white flex flex-col">
        {/* Header */}
        <header className="bg-green-700 text-white flex items-center px-5 py-3 relative">
          <span
            onClick={() => navigate(-1)}
            className="cursor-pointer text-white font-medium hover:underline flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Go back</span>
          </span>
          <img src={logo} alt="Hirely Logo" className="h-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </header>

        {/* Content */}
        <main className="flex-grow flex justify-center items-center p-6">
          <div className="bg-green-700 text-white w-full max-w-sm rounded-3xl shadow-xl px-6 py-4">
            <h1 className="text-xl font-semibold mb-5 text-center">Edit Profile</h1>

            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-5">
              <div className="rounded-full overflow-hidden border-4 border-white bg-white" style={{ width: 72, height: 72 }}>
                {previewPic ? (
                  <img src={previewPic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <label htmlFor="profilePicInput" className="mt-2 cursor-pointer text-green-300 hover:text-green-100 font-semibold text-sm">
                Change Profile Picture
              </label>
              <input type="file" id="profilePicInput" accept="image/*" onChange={handleProfilePicChange} className="hidden" />
            </div>

            {/* Form  */}
            <div className="flex flex-col space-y-4 text-sm">
              <div>
                <label className="text-white font-medium">Name</label>
                <input type="text" value={user.User_Name} onChange={(e) => handleChange("User_Name", e.target.value)} className="mt-1 w-full px-3 py-2 text-black bg-white rounded-md border border-gray-300" />
              </div>

              <div>
                <label className="text-white font-medium">Email</label>
                <input type="email" value={user.User_Email} onChange={(e) => handleChange("User_Email", e.target.value)} className="mt-1 w-full px-3 py-2 text-black bg-white rounded-md border border-gray-300" />
              </div>

              <div>
                <label className="text-white font-medium">Phone</label>
                <input type="tel" value={user.User_Phone_Number} onChange={(e) => handleChange("User_Phone_Number", e.target.value)} className="mt-1 w-full px-3 py-2 text-black bg-white rounded-md border border-gray-300" />
              </div>

              <div>
                <label className="text-white font-medium">Gender</label>
                <div className="mt-1 flex space-x-4">
                  <label className="flex items-center space-x-1">
                    <input type="radio" name="gender" value="Male" checked={user.User_Gender === "Male"} onChange={(e) => handleChange("User_Gender", e.target.value)} className="accent-white" />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input type="radio" name="gender" value="Female" checked={user.User_Gender === "Female"} onChange={(e) => handleChange("User_Gender", e.target.value)} className="accent-white" />
                    <span>Female</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-white font-medium">Description</label>
                <textarea value={user.User_Description || ""} onChange={(e) => handleChange("User_Description", e.target.value)} className="mt-1 w-full px-3 py-2 text-black bg-white rounded-md border border-gray-300 resize-none" />
              </div>

              <div>
                <label className="text-white font-medium">Work Experience (years)</label>
                <input type="number" value={user.User_Work_Experience ?? 0} onChange={(e) => handleChange("User_Work_Experience", Number(e.target.value))} className="mt-1 w-full px-3 py-2 text-black bg-white rounded-md border border-gray-300" />
              </div>

              <div>
                <label className="text-white font-medium">Final Academic Level</label>
                <select value={user.User_Final_Academic || ""} onChange={(e) => handleChange("User_Final_Academic", e.target.value)} className="mt-1 w-full px-3 py-2 text-black bg-white rounded-md border border-gray-300">
                  <option value="">Select...</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="D3">D3</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                </select>
              </div>

              <div>
                <label className="text-white font-medium">Major</label>
                <input type="text" value={user.major?.Major_Name || ""} disabled className="mt-1 w-full px-3 py-2 text-black bg-gray-200 rounded-md border" />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => navigate(-1)} className="px-5 py-1.5 rounded border border-red-500 text-red-500 hover:bg-red-600 hover:text-white text-sm">
                Cancel
              </button>
              <button onClick={handleSave} className="px-5 py-1.5 rounded bg-white text-green-700 font-semibold hover:bg-gray-100 text-sm">
                Save
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;
