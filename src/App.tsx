import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Landingpage";
import RegisterPage from "./Registerpage";
import HomePage from "./Homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
