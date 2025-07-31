import React, { useState } from "react";
import Slider from "react-slick";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { OUTPUT_VIDEO_URL } from "../lib/constants";
import DetailedAnalysisModal from "./DetailedAnalysisModal";

export default function VideoResultCarouse({ data }) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxSlides, setLightboxSlides] = useState([]);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [detailedFrame, setDetailedFrame] = useState(null);

  const totalFaces = data.reduce((acc, frame) => acc + frame.total_faces, 0);
  const summary = {};

//membuat array slidenya dari tiap frame video
  const slides = data.map((frame) => ({
    src: `${OUTPUT_VIDEO_URL}/${frame.output_image}`,
    description: `Frame ke-${frame.frame_index + 1} (detik ${
      frame.frame_time_sec
    })`,
  }));

//menghitung total jumlah dari ketiga kelas dengan cara menghitung setiap value yang munculnya +1
  data.forEach((frame) => {
    frame.faces.forEach((face) => {
      const label = face.interest_label;
      summary[label] = (summary[label] || 0) + 1;
    });
  });

  return (
    <div className="mt-6 p-4 border rounded-md bg-white text-black shadow">
      <h2 className="text-lg font-semibold mb-2">Ringkasan Analisis Video</h2>
      <p>Total wajah dari seluruh frame: {totalFaces}</p>
      <div className="mt-2 space-y-1">
        {Object.entries(summary).map(([label, count]) => {
          const percentage = ((count / totalFaces) * 100).toFixed(1);
          return (
            <p key={label}>
              - {label.charAt(0).toUpperCase() + label.slice(1)}: {count}{" "}
              wajah ({percentage}%)
            </p>
          );
        })}
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-2">Frame Analisis:</h3>
        <Slider
          dots
          infinite={false}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          beforeChange={(oldIdx, newIdx) => setCurrentIndex(newIdx)}
        >
          {data.map((frame, idx) => (
            <div key={idx} className="p-2">
              <p className="mb-1 text-sm">
                Frame ke-{idx + 1} (detik: {frame.frame_time_sec})
              </p>
              <img
                src={`${OUTPUT_VIDEO_URL}/${frame.output_image}`}
                alt={`Frame ${idx + 1}`}
                onClick={() => {
                  setLightboxSlides(slides);
                  setCurrentIndex(idx);
                  setOpen(true);
                }}
                className="w-full border rounded shadow cursor-pointer hover:opacity-90 transition"
              />
              <div className="mt-2 text-sm">
                <p className="font-semibold">
                  Ringkasan Analisis Frame-{idx + 1}:
                </p>
                <p>Total wajah terdeteksi: {frame.total_faces}</p>
                <div className="ml-2">
                  {(() => {
                    const labelCounts = {};
                    frame.faces.forEach((face) => {
                      const label = face.interest_label;
                      labelCounts[label] = (labelCounts[label] || 0) + 1;
                    });
                    return Object.entries(labelCounts).map(
                      ([label, count]) => {
                        const percentage = (
                          (count / frame.total_faces) *
                          100
                        ).toFixed(1);
                        return (
                          <p key={label}>
                            - {label.charAt(0).toUpperCase() + label.slice(1)}
                            : {count} wajah ({percentage}%)
                          </p>
                        );
                      }
                    );
                  })()}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="mt-6 flex justify-center">
        <div
          onClick={() => {
            setShowDetailedAnalysis(true);
            setDetailedFrame(data[currentIndex]);
          }}
          className="cursor-pointer mt-6 p-4 border border-black rounded-xl bg-white text-black hover:bg-black hover:text-white transition-all duration-300 shadow-md text-center font-semibold"
        >
          📊 Klik di sini untuk Analisis Mendalam Frame Ini
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={lightboxSlides}
        plugins={[Fullscreen, Zoom, Thumbnails]}
      />

      <DetailedAnalysisModal
        isOpen={showDetailedAnalysis}
        onClose={() => setShowDetailedAnalysis(false)}
        data={detailedFrame}
        frameNumber={currentIndex + 1}
      />
    </div>
  );
}
