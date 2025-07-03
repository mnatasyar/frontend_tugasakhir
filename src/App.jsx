import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import FileUploadForm from "./components/FileUploadForm";
import LandingPage from "./components/LandingPage";
import React from "react";

function AnalyzePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <FileUploadForm />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
      </Routes>
    </Router>
  );
}

export default App;
