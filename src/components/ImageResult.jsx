import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import { BASE_URL } from "../lib/constants";
import DetailedAnalysisModal from "./DetailedAnalysisModal";

export default function ImageResult({ data }) {
  const { total_faces, faces, analyzed_url } = data;
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxSlides, setLightboxSlides] = useState([]);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

  const summary = faces.reduce((acc, face) => {
    const label = face.interest_label;
    acc[label] = acc[label] ? acc[label] + 1 : 1;
    return acc;
  }, {});

  const imageUrl = `${BASE_URL}${analyzed_url}`;

  return (
    <div className="mt-6 p-4 border rounded-md bg-white text-black shadow">
      <h2 className="text-lg font-semibold mb-2">Ringkasan Analisis Gambar</h2>
      <p>Total wajah terdeteksi: {total_faces}</p>
      <div className="mt-2 space-y-1">
        {Object.entries(summary).map(([label, count]) => {
          const percentage = ((count / total_faces) * 100).toFixed(1);
          return (
            <p key={label}>
              - {label.charAt(0).toUpperCase() + label.slice(1)}: {count} wajah
              ({percentage}%)
            </p>
          );
        })}
      </div>

      {analyzed_url && (
        <div className="mt-4">
          <h3 className="font-medium mb-1">Hasil Analisis:</h3>
          <img
            src={imageUrl}
            alt="Hasil Deteksi"
            onClick={() => {
              setLightboxSlides([{ src: imageUrl }]);
              setCurrentIndex(0);
              setOpen(true);
            }}
            className="w-full border rounded shadow cursor-pointer hover:opacity-90 transition"
          />
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <div
          onClick={() => setShowDetailedAnalysis(true)}
          className="cursor-pointer mt-6 p-4 border border-black rounded-xl bg-white text-black hover:bg-black hover:text-white transition-all duration-300 shadow-md text-center font-semibold"
        >
          📊 Klik di sini untuk Analisis Mendalam Gambar Ini
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={lightboxSlides}
        plugins={[Fullscreen, Zoom]}
      />

      <DetailedAnalysisModal
        isOpen={showDetailedAnalysis}
        onClose={() => setShowDetailedAnalysis(false)}
        data={data}
      />
    </div>
  );
}
