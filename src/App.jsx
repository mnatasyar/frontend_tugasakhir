import FileUploadForm from "./components/FileUploadForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4 text-center">
        {
          "Deteksi Wajah dan Pengenalan Ekspresi Siswa SD menggunakan Model YOLOv8 dan ResNet50"
        }
        <br />
        {"untuk Mengukur Ketertarikan terhadap Mata Pelajaran"}
      </h1>
      <FileUploadForm />
    </div>
  );
}

export default App;
