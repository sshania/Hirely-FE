import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passedEmail = (location.state as { email?: string })?.email || "";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(passedEmail);
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://your-api.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed.");
      alert("Registration successful!");
    } catch (err: any) {
      setError(err.message);
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
              className="border p-2 w-full rounded"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="border p-2 w-full rounded mt-3"
              placeholder="E-mail Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border p-2 w-full rounded mt-3"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center mt-3">
              <input
                type="checkbox"
                className="mr-2"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span className="text-gray-600 text-sm">
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
