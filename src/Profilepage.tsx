import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserData {
  name: string;
  email: string;
  phone: string;
  dob: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<UserData>("https://25d5-103-80-236-175.ngrok-free.app/")
      .then((response) => {
        const data = response.data;

        // Redirect if no data or required fields missing
        if (
          !data ||
          !data.name ||
          !data.email ||
          !data.phone ||
          !data.dob
        ) {
          navigate("/profileform");
          return;
        }

        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        // Redirect on error as well
        navigate("/profileform");
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-100 font-sans">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 font-sans">
      <div className="w-[1120px] min-h-[700px] rounded-lg shadow-lg overflow-hidden bg-white flex flex-col">
        {/* ... your UI rendering with user data ... */}
      </div>
    </div>
  );
};

export default ProfilePage;
