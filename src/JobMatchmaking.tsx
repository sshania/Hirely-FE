import React, { useEffect, useState } from "react";
import axios from "axios";
import Select, { SingleValue, MultiValue } from "react-select";
import { useNavigate } from "react-router-dom";
import logo from "../src/assets/Hirely.png";

type OptionType = {
  label: string;
  value: number;
};

const JobMatchPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    fullName: string;
    major: OptionType | null;
    skills: OptionType[];
  }>({
    fullName: "",
    major: null,
    skills: [],
  });

  const [majors, setMajors] = useState<OptionType[]>([]);
  const [skills, setSkills] = useState<OptionType[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [majorRes, skillRes, userRes] = await Promise.all([
          axios.get(
            // "https://api.hirely.my.id/user/majors"
            "https://api-hirely.localto.net/user/majors"
          ),
          axios.get(
            // "https://api.hirely.my.id/skill/list"
            "https://api-hirely.localto.net/skill/list"

          ),
          axios.get(
            // "https://api.hirely.my.id/user/data",
            "https://api-hirely.localto.net/user/data",
             {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const majorOptions = majorRes.data.map((m: any) => ({
          label: m.Major_Name,
          value: m.Major_Id,
        }));

        const skillOptions = skillRes.data.map((s: any) => ({
          label: s.Skill_Name,
          value: s.Skill_Id,
        }));

        setMajors(majorOptions);
        setSkills(skillOptions);
        setUserData(userRes.data);

        setFormData((prev) => ({
          ...prev,
          fullName: userRes.data.User_Name,
        }));
      } catch (err) {
        console.error("Error fetching data", err);
        setError("Failed to load options");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.put(
        // "https://api.hirely.my.id/user/update"
        "https://api-hirely.localto.net/user/update",
        {
          User_Name: userData.User_Name,
          User_Email: userData.User_Email,
          User_Phone_Number: userData.User_Phone_Number,
          User_Gender: userData.User_Gender,
          User_Description: userData.User_Description,
          User_Work_Experience: userData.User_Work_Experience,
          User_Final_Academic: userData.User_Final_Academic,
          User_Picture: userData.User_Picture,
          User_Major: formData.major?.value,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await axios.post(
        // "https://api.hirely.my.id/skill/add-user",
        "https://api-hirely.localto.net/skill/add-user",
        {
          Skill_ids: formData.skills.map((s) => s.value),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await axios.post(
      // "https://api.hirely.my.id/result/match-result",
      "https://api-hirely.localto.net/result/match-result",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

      setLoading(false);
      navigate("/result");
    } catch (err: any) {
      console.error(err);
      setError("Submission failed");
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 font-sans">
      <div className="bg-green-600 px-4 py-3 relative">
        <img
          src={logo}
          alt="Hirely Logo"
          className="w-12 h-12 absolute left-1/2 top-1 transform -translate-x-1/2"
        />
        <button
          className="text-white font-semibold bg-black px-4 py-1 rounded"
          onClick={() => navigate(-1)}
        >
          ← Go back
        </button>
      </div>

      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-green-700 mb-2">
          Find Your Perfect Job Match
        </h1>
        <p className="text-gray-700 mb-6">
          Fill out the form below to get matched with suitable job opportunities.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6 space-y-5"
        >
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              readOnly
              className="w-full border border-gray-300 p-3 rounded text-gray-800"
            />
          </div>

          {/* Major */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Major
            </label>
            <Select
                options={majors}
                value={formData.major}
                onChange={(selected: SingleValue<OptionType>) =>
                  setFormData({ ...formData, major: selected || null })
                }
                placeholder="Select your major"
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    color: "#1f2937", // Tailwind gray-800
                    backgroundColor: state.isFocused ? "#e5e7eb" : "white", // focus: gray-200
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "#1f2937",
                  }),
                }}
              />

          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills
            </label>
            <Select
                isMulti
                options={skills}
                value={formData.skills}
                onChange={(selected: MultiValue<OptionType>) =>
                  setFormData({ ...formData, skills: [...selected] })
                }
                placeholder="Select your skills"
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    color: "#1f2937",
                    backgroundColor: state.isFocused ? "#e5e7eb" : "white",
                  }),
                  multiValueLabel: (provided) => ({
                    ...provided,
                    color: "#1f2937",
                  }),
                  multiValue: (provided) => ({
                    ...provided,
                    backgroundColor: "#d1fae5", 
                  }),
                }}
              />

          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white font-semibold py-3 rounded hover:bg-green-800 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Find my match"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobMatchPage;
