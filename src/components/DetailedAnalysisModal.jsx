import React from "react";
import { X } from "lucide-react";

const labelColorClass = {
  netral: "text-blue-400",
  tertarik: "text-green-500",
  tidak_tertarik: "text-red-500",
};

const DetailedAnalysisModal = ({ isOpen, onClose, data, frameNumber }) => {
  if (!isOpen || !data) return null;

  const isVideo = data.frame_index !== undefined;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-black rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden transform transition-transform duration-300 scale-100 animate-fade-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
          <h2 className="text-xl font-bold">📊 Analisis Mendalam</h2>
          <button
            onClick={onClose}
            className="hover:text-red-500 transition"
            title="Tutup"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-scroll scrollbar-thin space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-base">
              <strong>Total Wajah Terdeteksi:</strong> {data.total_faces}
            </p>
            {isVideo && (
              <p className="text-sm text-gray-700">
                Frame ke-{frameNumber} (detik ke-{data.frame_time_sec})
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {data.faces.map((face) => (
              <div
                key={face.face_id}
                className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm"
              >
                <h4 className="font-semibold mb-2">Wajah {face.face_id}</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    • Posisi: ({face.bbox[0]}, {face.bbox[1]}) → ({face.bbox[2]}
                    ,{face.bbox[3]})
                  </li>
                  <li>• Tingkat Keyakinan Wajah: {face.face_confidence.toFixed(3)}</li>
                  <li>
                    • Label Ketertarikan:{" "}
                    <strong className={labelColorClass[face.interest_label]}>
                      {face.interest_label}
                    </strong>{" "}
                    ({face.interest_confidence.toFixed(3)})
                  </li>
                  <li>
                    <span>• Detail prediksi:</span>{" "}
                    <span className="ml-1">
                      Netral={face.all_predictions.netral.toFixed(3)}, Tertarik=
                      {face.all_predictions.tertarik.toFixed(3)}, Tidak
                      Tertarik={face.all_predictions.tidak_tertarik.toFixed(3)}
                    </span>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedAnalysisModal;
