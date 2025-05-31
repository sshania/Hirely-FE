import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface UserData {
  name: string;
  email: string;
  phone: string;
  dob: string;
  password: string;
  profilePicUrl?: string;
}

const EditProfile: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    profilePicUrl: "",
  });

  const [previewPic, setPreviewPic] = useState<string>("");

  useEffect(() => {
    axios
      .get<UserData>("https://25d5-103-80-236-175.ngrok-free.app")
      .then((response) => {
        setUser(response.data);
        if (response.data.profilePicUrl) setPreviewPic(response.data.profilePicUrl);
      })
      .catch(() => {});
  }, []);

  const handleChange = (field: keyof UserData, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPic(reader.result as string);
        setUser((prev) => ({ ...prev, profilePicUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    axios
      .put("https://25d5-103-80-236-175.ngrok-free.app", user)
      .then(() => navigate("/profile"))
      .catch(() => {});
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 font-sans">
      <div className="w-[900px] min-h-[600px] rounded-lg shadow-lg overflow-hidden bg-white flex flex-col">
        <header className="bg-green-700 text-white flex items-center px-5 py-3 relative">
          <span
            onClick={() => navigate(-1)}
            className="cursor-pointer text-white font-medium hover:underline flex items-center space-x-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Go back</span>
          </span>

          <img
            src="/HirelyLogo.png"
            alt="Hirely Logo"
            className="h-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />

          <div className="w-12" />
        </header>

        <main className="flex-grow flex justify-center items-center p-6">
          <div className="bg-green-700 text-white w-full max-w-sm min-h-[480px] rounded-3xl overflow-hidden shadow-xl flex flex-col px-6 py-4">
            <h1 className="text-xl font-semibold mb-5 text-center">Edit Profile</h1>

            <div className="flex flex-col items-center mb-5">
              <div
                className="relative rounded-full overflow-hidden border-4 border-white bg-white flex items-center justify-center"
                style={{ width: 72, height: 72 }}
              >
                {previewPic || user.profilePicUrl ? (
                  <img
                    src={previewPic || user.profilePicUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <label
                htmlFor="profilePicInput"
                className="mt-2 cursor-pointer text-green-300 hover:text-green-100 font-semibold text-sm"
              >
                Change Profile Picture
              </label>
              <input
                type="file"
                id="profilePicInput"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
            </div>

            <div className="flex flex-col space-y-4 flex-grow w-full">
              <label className="flex flex-col text-white text-xs font-medium">
                Name
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="mt-1 rounded-md px-3 py-1.5 text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-black bg-white text-sm"
                />
              </label>

              <label className="flex flex-col text-white text-xs font-medium">
                Email
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="mt-1 rounded-md px-3 py-1.5 text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-black bg-white text-sm"
                />
              </label>

              <label className="flex flex-col text-white text-xs font-medium">
                Phone
                <input
                  type="tel"
                  value={user.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="mt-1 rounded-md px-3 py-1.5 text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-black bg-white text-sm"
                />
              </label>

              <label className="flex flex-col text-white text-xs font-medium">
                Date of Birth
                <input
                  type="date"
                  value={user.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className="mt-1 rounded-md px-3 py-1.5 text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-black bg-white text-sm"
                />
              </label>

              <label className="flex flex-col text-white text-xs font-medium">
                Password
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={user.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="mt-1 rounded-md px-3 py-1.5 text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-black bg-white text-sm"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => navigate(-1)}
                className="px-5 py-1.5 rounded border border-red-500 text-red-500 hover:bg-red-600 hover:text-white text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-1.5 rounded bg-white text-green-700 font-semibold hover:bg-gray-100 text-sm"
              >
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
