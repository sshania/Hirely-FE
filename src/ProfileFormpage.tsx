import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ProfileFormData {
  fullName: string;
  major: string;
  skill: string;
}

const ProfileFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "",
    major: "",
    skill: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Adjust payload keys if needed by your API
      await axios.post("https://25d5-103-80-236-175.ngrok-free.app", {
        name: formData.fullName,
        major: formData.major,
        skill: formData.skill,
      });
      setLoading(false);
      navigate("/profile");
    } catch (err: any) {
      setError(err.message || "Failed to submit form");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 font-sans">
      <div className="w-[500px] bg-green-700 rounded-3xl p-8 shadow-lg text-white flex flex-col items-center">
        <img src="/HirelyLogo.png" alt="Hirely Logo" className="h-20 mb-6" />

        <h1 className="text-2xl font-semibold mb-6 text-center">Profile Form</h1>

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div>
            <label htmlFor="fullName" className="block mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full rounded-lg px-4 py-2 text-black bg-white"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="major" className="block mb-1 font-medium">
              Major
            </label>
            <input
              type="text"
              id="major"
              name="major"
              value={formData.major}
              onChange={handleChange}
              required
              className="w-full rounded-lg px-4 py-2 text-black bg-white"
              placeholder="Your major"
            />
          </div>

          <div>
            <label htmlFor="skill" className="block mb-1 font-medium">
              Skill
            </label>
            <input
              type="text"
              id="skill"
              name="skill"
              value={formData.skill}
              onChange={handleChange}
              required
              className="w-full rounded-lg px-4 py-2 text-black bg-white"
              placeholder="Your skill"
            />
          </div>

          {error && (
            <div className="text-red-400 text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-green-700 font-semibold rounded-xl py-3 hover:bg-gray-100 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileFormPage;
