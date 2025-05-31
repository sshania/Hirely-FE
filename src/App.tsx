import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage"; 
import JobMatchPage from "./JobMatchmakingPage"; 
import ResultPage from "./ResultPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobmatchmaking" element={<JobMatchPage />} />
        <Route path="/result" element={<ResultPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
