import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../src/assets/Hirely.png";

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post("https://api.hirely.my.id/auth/reset-password", {
        email,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      setSuccess(true);
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 font-sans">
      <div className="w-[400px] rounded-xl shadow-xl bg-white overflow-hidden">
        {/* Header */}
        <div className="bg-green-700 text-white px-5 py-3 relative flex items-center justify-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 text-white text-sm font-medium"
          >
            ← Go back
          </button>
          <img src={logo} alt="Hirely Logo" className="h-8" />
        </div>

        {/* Content */}
        <div className="p-6 text-sm text-black space-y-4">
          <h2 className="text-xl font-semibold text-center text-green-700">
            Change Password
          </h2>

          {error && (
            <p className="text-red-500 bg-red-100 px-3 py-2 rounded">{error}</p>
          )}
          {success && (
            <p className="text-green-600 bg-green-100 px-3 py-2 rounded">
              Password changed successfully!
            </p>
          )}

          <div className="flex flex-col">
            <label className="font-medium mb-1">Email</label>
            <input
              type="email"
              className="border rounded px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">New Password</label>
            <input
              type="password"
              className="border rounded px-3 py-2 text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              className="border rounded px-3 py-2 text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-green-700 text-white py-2 rounded hover:bg-green-800 font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
