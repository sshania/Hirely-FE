import React, { useState } from "react";
import axios from "axios";
import logo from "../src/assets/Hirely.png";
import { useNavigate } from "react-router-dom";

const API_URL = "https://api-hirely.localto.net/auth/reset-password"; // Ganti dengan endpoint kamu

const ChangePassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<{type: "success" | "error"; message: string} | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        email,
        token,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      setStatus({type: "success", message: response.data.message});
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      setStatus({type: "error", message: error.response?.data?.detail || "Terjadi kesalahan."});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="flex w-[900px] shadow-lg rounded-lg overflow-hidden">
        {/* Left Panel */}
        <div
          className="w-1/2 flex flex-col justify-center items-center p-10 text-white hidden md:flex"
          style={{
            backgroundImage: "url('/Hirelybg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img src={logo} alt="Hirely Logo" className="w-24 h-30 mb-4" />
          <h1 className="text-3xl font-bold text-black">Hirely</h1>
          <p className="mt-2 text-black">Connecting others</p>
        </div>
        {/* Right Panel */}
        <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center text-black mb-2">Reset Password</h2>
          <p className="text-center text-gray-600 mb-6">Masukkan email, token, dan password baru Anda.</p>
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 p-2 w-full rounded mt-1 placeholder-gray-500 text-black"
            />
            <input
              type="text"
              placeholder="Kode Token"
              value={token}
              required
              maxLength={5}
              onChange={(e) => setToken(e.target.value)}
              className="border border-gray-400 p-2 w-full rounded mt-1 placeholder-gray-500 text-black"
            />
            <input
              type="password"
              placeholder="Password Baru"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-400 p-2 w-full rounded mt-1 placeholder-gray-500 text-black"
            />
            <input
              type="password"
              placeholder="Konfirmasi Password Baru"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-400 p-2 w-full rounded mt-1 placeholder-gray-500 text-black"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded font-bold transition disabled:bg-green-200 disabled:cursor-not-allowed"
            >
              {loading ? "Memproses..." : "Reset Password"}
            </button>
          </form>
          {status && (
            <div
              className={`mt-4 px-4 py-3 rounded w-full text-center text-base font-semibold shadow-sm border transition
              ${status.type === "success"
                ? "bg-green-50 border-green-300 text-green-700"
                : "bg-red-50 border-red-300 text-red-700"}`}
            >
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
