import React, { useState, useRef } from "react";
import { analyzeFile } from "../utils/api";
import AnalysisResult from "./AnalysisResult";
import { Button } from "@/components/ui/button";

const FileUploadForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const formatBytes = (bytes) => {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Byte";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeFile(file);
      setResult(data);
    } catch (error) {
      console.error("Error analyzing file:", error);
      alert("Terjadi kesalahan saat memproses file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto text-black">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          onClick={() => fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-400 rounded-md p-6 text-center cursor-pointer hover:bg-gray-100 transition bg-white"
        >
          <p className="font-semibold mb-2">Klik atau tarik file ke sini</p>
          <p className="text-sm text-gray-500">
            Hanya gambar (.jpg/.png) dan video (.mp4/.avi)
          </p>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            disabled={loading}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        {file && (
          <div className="bg-white border rounded-md p-4 shadow mt-2">
            <p className="text-sm font-medium">File Terpilih:</p>
            <p className="text-sm text-gray-700 truncate">📄 {file.name}</p>
            <p className="text-xs text-gray-500">
              Ukuran: {formatBytes(file.size)}
            </p>
            {file.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="mt-2 rounded-md max-h-48 object-contain border"
              />
            )}
            {file.type.startsWith("video/") && (
              <video
                src={URL.createObjectURL(file)}
                controls
                className="mt-2 rounded-md max-h-48 object-contain border"
              />
            )}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading || !file}
          className="w-full bg-black text-white hover:bg-gray-800 transition"
        >
          {loading ? "Memproses..." : "Unggah & Analisis"}
        </Button>
      </form>

      {loading && (
        <div className="flex flex-col items-center justify-center mt-6 gap-2">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">
            Sedang menganalisis, mohon tunggu...
          </p>
        </div>
      )}

      {result && <AnalysisResult data={result} />}
    </div>
  );
};

export default FileUploadForm;
