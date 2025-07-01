import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import FileUploadForm from "./components/FileUploadForm";
import LandingPage from "./components/LandingPage";
import React from "react";

function AnalyzePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4 text-center">
        {"Deteksi Wajah dan Pengenalan Ekspresi Siswa SD menggunakan Model YOLOv8 dan ResNet50"}
        <br />
        {"untuk Mengukur Ketertarikan terhadap Mata Pelajaran"}
      </h1>
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
