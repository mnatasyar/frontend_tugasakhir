import React, { useState } from "react";
import Slider from "react-slick";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BASE_URL, OUTPUT_VIDEO_URL } from "../utils/constants";

const AnalysisResult = ({ data }) => {
  const isVideo = Array.isArray(data);

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxSlides, setLightboxSlides] = useState([]);

  if (isVideo) {
    const totalFaces = data.reduce((acc, frame) => acc + frame.total_faces, 0);
    const summary = {};

    const slides = data.map((frame) => ({
      src: `${OUTPUT_VIDEO_URL}/${frame.output_image}`,
      description: `Frame ke-${frame.frame_index + 1} (detik ${
        frame.frame_time_sec
      }s)`,
    }));

    data.forEach((frame) => {
      frame.faces.forEach((face) => {
        const label = face.interest_label;
        summary[label] = (summary[label] || 0) + 1;
      });
    });

    return (
      <div className="mt-6 p-4 border rounded-md bg-white shadow">
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
          <h3 className="font-medium mb-2">
            Frame Analisis (klik gambar untuk perbesar):
          </h3>
          <Slider dots infinite speed={500} slidesToShow={1} slidesToScroll={1}>
            {data.map((frame, idx) => (
              <div key={idx} className="p-2">
                <p className="mb-1 text-sm">
                  Frame ke-{idx + 1} (detik: {frame.frame_time_sec}s)
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

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={currentIndex}
          slides={lightboxSlides}
          plugins={[Fullscreen, Zoom, Thumbnails]}
        />
      </div>
    );
  }

  // --- Image Analysis ---
  const { total_faces, faces, analyzed_url } = data;
  const summary = faces.reduce((acc, face) => {
    const label = face.interest_label;
    acc[label] = acc[label] ? acc[label] + 1 : 1;
    return acc;
  }, {});

  const imageUrl = `${BASE_URL}${analyzed_url}`;

  return (
    <div className="mt-6 p-4 border rounded-md bg-white shadow">
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
          <h3 className="font-medium mb-1">Hasil Deteksi:</h3>
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

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={lightboxSlides}
        plugins={[Fullscreen, Zoom]}
      />
    </div>
  );
};

export default AnalysisResult;
