import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passedEmail = (location.state as { email?: string })?.email || "";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(passedEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔐 Redirect ke Homepage jika sudah login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined" && token !== "") {
      navigate("/Homepage");
    }
  }, []); // hanya jalan sekali saat mount

  useEffect(() => {
    if (passedEmail) {
      setEmail(passedEmail);
    }
  }, [passedEmail]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agree) {
      alert("Please agree to the terms and policies.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and confirmation do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("https://api.hirely.my.id/auth/register", {
        User_Name: username,
        User_Password: password,
        confirm_password: confirmPassword,
        User_Email: email,
        User_Phone_Number: phone,
        terms_accepted: agree,
      });

      alert("Registration successful!");
      navigate("/login");
    } catch (err: any) {
      console.log("❌ Registration error:", err.response?.data);
      setError(err.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="flex w-[900px] shadow-lg rounded-lg overflow-hidden">
        <div
          className="w-1/2 flex flex-col justify-center items-center p-10 text-white"
          style={{
            backgroundImage: "url('/Hirelybg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img src="/HirelyLogo.png" alt="Hirely Logo" className="h-24 w-auto mb-4" />
          <h1 className="text-3xl font-bold text-black">Hirely</h1>
          <p className="mt-2 text-black">Connecting others</p>
        </div>

        <div className="w-1/2 bg-white p-10">
          <h2 className="text-2xl font-bold text-center">Sign Up Now!</h2>
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <a href="#" className="text-blue-500" onClick={handleLoginRedirect}>
              Login Here!
            </a>
          </p>

          <form className="mt-6" onSubmit={handleRegister}>
            <input
              className="border p-2 w-full rounded text-black"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              className="border p-2 w-full rounded mt-3 text-black"
              placeholder="E-mail Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border p-2 w-full rounded mt-3 text-black"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="border p-2 w-full rounded mt-3 text-black"
              placeholder="Password"
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="border p-2 w-full rounded mt-3 text-black"
              placeholder="Confirm Password"
              type="password"
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="flex items-center mt-3">
              <input
                type="checkbox"
                className="mr-2"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span className="text-black text-sm">
                I have read and agree to the terms and policies
              </span>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              className="w-full mt-5 bg-black text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? "Registering..." : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
