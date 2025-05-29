import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Loginpage"; 
import JobMatchPage from "./JobMatchmakingPage"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobmatchmaking" element={<JobMatchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
