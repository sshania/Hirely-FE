import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import logo from "../src/assets/Hirely.png";



const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.hirely.my.id/auth/login",
        {
          email,
          User_Password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.access_token;
      localStorage.setItem("token", token);

      const profileRes = await axios.get("https://api.hirely.my.id/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("hirelyUsername", profileRes.data.username); 

      alert("Login berhasil!");
      // window.location.href = "/home";
      navigate("/Homepage")
    } catch (error: any) {
      console.error(error);
      alert("Login gagal: " + (error.response?.data?.detail || "Unknown error"));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="flex w-[900px] shadow-lg rounded-lg overflow-hidden">
        <div 
          className="w-1/2 flex flex-col justify-center items-center p-10 text-white"
          style={{ 
            backgroundImage: "url('/Hirelybg.jpg')", 
            backgroundSize: "cover", 
            backgroundPosition: "center" 
          }}
        >
          <img src={logo} alt="Hirely Logo" className="w-24 h-30 mb-4" />
          <h1 className="text-3xl font-bold text-black">Hirely</h1>
          <p className="mt-2 text-black">Connecting others</p>
        </div>

        <div className="w-1/2 bg-white p-10">
          <h2 className="text-2xl font-bold text-center text-black">Welcome!</h2>
          <p className="text-center text-gray-600">
            Don't have an account? <a href="#" className="text-blue-500">Sign Up Here!</a>
          </p>

          <form className="mt-6" onSubmit={handleLogin}>
            <input
              className="border border-gray-400 p-2 w-full rounded mt-3 placeholder-gray-500 text-black"
              placeholder="E-mail Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border border-gray-400 p-2 w-full rounded mt-3 placeholder-gray-500 text-black"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-600 text-sm">Remember me</span>
              </div>
              <a href="#" className="text-blue-500 text-sm">Forgot Password?</a>
            </div>

            <button className="w-full mt-5 bg-black text-white py-2 rounded" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;