import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Landingpage";
import RegisterPage from "./Registerpage";
import HomePage from "./Homepage";
import LoginPage from "./Loginpage"; 
import JobMatchPage from "./JobMatchmaking"; 
import ResultPage from "./ResultPage";
import ProfilePage from "./Profilepage";
import EditProfile from "./EditProfile";
import ProfileFormPage from "./ProfileFormpage"; 
import ChangePassowrd from "./changePass"; 
import ForgotPassword from "./forgotPass"; 

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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/changePassword" element={<ChangePassowrd />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/profileform" element={<ProfileFormPage />} />  {/* <-- new route */}
      </Routes>
    </Router>
  );
}

export default App;
