import React from "react";
import ImageResult from "./ImageResult";
import VideoResultCarouse from "./VideoResultCarouse";

export default function AnalysisResult({ data }) {
  const isVideo = Array.isArray(data);

  if (isVideo) {
    return <VideoResultCarouse data={data} />;
  }

  return <ImageResult data={data} />;
}
