import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../src/assets/Hirely.png";
import { baseURL } from "./environment";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [tokenValid, setTokenValid] = useState(false);
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);

  // Resend token to email
  const handleResendToken = async () => {
    setStatus(null);
    setResending(true);
    try {
      await axios.post(
        `${baseURL}/auth/forgot-password`,
        { email }
      );
      setStatus({ type: "success", message: "Kode token telah dikirim ulang ke email Anda." });
    } catch (err: any) {
      setStatus({ type: "error", message: err.response?.data?.detail || "Gagal mengirim ulang kode. Coba lagi." });
    } finally {
      setResending(false);
    }
  };

  const handleCheckToken = async () => {
    setStatus(null);
    setChecking(true);
    try {
      await axios.post(
        // "https://api-hirely.localto.net/auth/verify-token"
        `${baseURL}/auth/verify-token`
        ,
        { email, token }
      );
      setStatus({ type: "success", message: "Token valid. Silakan lanjut ubah password." });
      setTokenValid(true);
    } catch (err: any) {
      setStatus({ type: "error", message: err.response?.data?.detail || "Token salah atau sudah kadaluarsa." });
      setTokenValid(false);
    } finally {
      setChecking(false);
    }
  };

  // Go to change password page
  const handleGoToChangePassword = () => {
    navigate("/changePassword", { state: { email, token } });
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
            Forgot Password
          </h2>

          {status && (
            <p className={`px-3 py-2 rounded text-center font-medium ${status.type === "success" ? "text-green-600 bg-green-100" : "text-red-500 bg-red-100"}`}>{status.message}</p>
          )}

          {/* Email */}
          <input
            type="email"
            className="border rounded px-3 py-2 text-sm w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            type="text"
            className="border rounded px-3 py-2 text-sm w-full"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Token"
          />

          {!tokenValid ? (
            <button
              onClick={handleCheckToken}
              className="w-full mt-2 bg-green-700 text-white py-2 rounded hover:bg-green-800 font-semibold"
              disabled={checking || !token || !email}
              type="button"
            >
              {checking ? "Checking..." : "Check Token"}
            </button>
          ) : (
            <button
              onClick={handleGoToChangePassword}
              className="w-full mt-2 bg-green-700 text-white py-2 rounded hover:bg-green-800 font-semibold"
            >
              Change Password
            </button>
          )}

          {/* Resend Token */}
          <button
            onClick={handleResendToken}
            className="w-full mt-2 bg-green-100 text-green-700 py-2 rounded hover:bg-green-200 font-semibold border border-green-300"
            disabled={resending || !email}
            type="button"
          >
            {resending ? "Mengirim..." : "Resend Token"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
