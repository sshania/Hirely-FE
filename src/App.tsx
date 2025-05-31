import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Landingpage";
import RegisterPage from "./Registerpage";
import HomePage from "./Homepage";
import LoginPage from "./Loginpage"; 
import JobMatchPage from "./JobMatchmakingPage"; 
import ResultPage from "./ResultPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobmatchmaking" element={<JobMatchPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
