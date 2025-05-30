import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/register", { state: { email } });
  };

  return (
    <div className="bg-white flex flex-col w-full overflow-x-hidden scroll-smooth">
      <header className="bg-green-700 text-white flex justify-between items-center px-6 py-4 w-full">
        <div className="flex items-center gap-2">
          <img src="/HirelyLogo.png" alt="Hirely Logo" className="h-16" />
          <span className="text-3xl font-bold">Hirely</span>
        </div>
        <button
          className="bg-white text-black font-semibold px-6 py-3 rounded"
          onClick={handleRedirect}
        >
          Sign In
        </button>
      </header>

      <section className="flex flex-col justify-between py-16 lg:py-24 w-full max-w-[100vw] gap-12 flex-1">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-12 w-full">
          <div className="w-full lg:w-auto px-4 lg:px-0 lg:pl-8 xl:pl-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-green-700 mb-6">Welcome</h1>
            <p className="text-xl text-gray-800 mb-6">
              Get personalized job recommendations that suit you!
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Finding the perfect job shouldn't feel like searching for a needle in a haystack. Hirely leverages cutting-edge AI to analyze your skills, experience, and career aspirations—then matches you with the best-fitting job opportunities.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <input
                type="email"
                placeholder="Enter e-mail address"
                className="px-6 py-3 border rounded w-full sm:w-72"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="bg-[#6EE7B7] hover:bg-[#4ADE80] px-8 py-3 rounded font-semibold w-full sm:w-auto text-lg"
                onClick={handleRedirect}
              >
                Get Started &gt;
              </button>
            </div>
          </div>

          <div className="w-full lg:w-auto px-4 lg:px-0 lg:pr-8 xl:pr-16">
            <img
              src="/woman-working-laptop-with-plant.png"
              alt="Woman using laptop illustration"
              className="w-full max-w-[800px] sm:max-w-[700px] mx-auto lg:mx-0"
            />
          </div>
        </div>

        <div className="text-center pb-4 mt-4">
          <a href="#learn-more" className="text-black text-2xl font-medium hover:text-black inline-block">
            Learn More
          </a>
          <div className="text-center mt-2 animate-bounce">
            <span className="text-3xl text-black">&darr;</span>
          </div>
        </div>
      </section>

      <section id="learn-more" className="bg-white px-6 py-20 text-center mt-16">
        <h2 className="text-3xl font-semibold text-green-700 mb-6">How Hirely Helps You Find Your Dream Job</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12">
          <div className="max-w-xs">
            <img src="/Analyze.png" alt="Analyze" className="mx-auto mb-4 h-16" />
            <h3 className="text-xl font-semibold mb-2">Analyze</h3>
            <p className="text-gray-600">Fill out your information, and we will analyze your skills and goals</p>
          </div>
          <div className="max-w-xs">
            <img src="/Match.png" alt="Match" className="mx-auto mb-4 h-16" />
            <h3 className="text-xl font-semibold mb-2">Match</h3>
            <p className="text-gray-600">Our AI matches you with personalized job listings based on your profile</p>
          </div>
          <div className="max-w-xs">
            <img src="/Apply.png" alt="Apply" className="mx-auto mb-4 h-16" />
            <h3 className="text-xl font-semibold mb-2">Apply</h3>
            <p className="text-gray-600">Instantly apply to curated jobs with one click and track your applications</p>
          </div>
        </div>
        <p className="mt-10 text-gray-700 font-medium">AI powered. Human-Focused. Your career assistant, 24/7.</p>
      </section>

      <footer className="border-t py-12 text-center text-lg text-gray-600 w-full">
        &copy; 2025 Hirely. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
