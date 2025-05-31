import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  // const [username, setUsername] = useState<string>('Guest');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // const storedUsername = localStorage.getItem("hirelyUsername");

    if (!token) {
      navigate("/login");
      return;
    }

    // if (storedUsername) {
    //   setUsername(storedUsername);
    // }
  }, [navigate]);

  const startMatching = () => {
    navigate('/jobmatchmaking'); 
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem("hirelyUsername");
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 font-sans flex flex-col">
      <header className="bg-[#008431] text-white flex justify-between items-center px-6 py-4 shadow-md">
        <div className="flex items-center space-x-3">
          <img src="HirelyLogo.png" alt="Hirely Logo" className="h-16" />
          <h1 className="text-2xl font-bold">Hirely</h1>
        </div>
        <div className="flex items-center space-x-3">
          <p className="text-white">Welcome </p>
          <button onClick={goToProfile} className="bg-white rounded-full p-2 hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A8.967 8.967 0 0112 15c2.21 0 4.218.805 5.879 2.137M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button onClick={handleLogout} className="ml-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded">
            Logout
          </button>
        </div>
      </header>

      <main className="flex-grow flex justify-center items-center w-full px-4 bg-[url('/assets/green-bg.svg')] bg-cover bg-center">
        <div className="bg-green-800 bg-opacity-80 p-16 rounded-xl shadow-xl text-center text-white max-w-4xl w-full">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Find Your Dream Job Effortlessly</h2>
          <p className="mb-8 text-lg">Let AI match you with the perfect job based on your skills and experience.</p>
          <button onClick={startMatching} className="bg-white text-green-700 px-8 py-3 rounded-full font-medium hover:bg-gray-200">
            Start Matching!
          </button>
        </div>
      </main>

      <footer className="text-center text-sm text-gray-600 border-t border-gray-300 p-4 w-full">
        © 2025 Hirely. All rights reserved.
      </footer>
    </div>
  );
};


export default HomePage;