import React from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const members = [
  { name: "Alwi Alpariji Jaswitan", nim: "211112093", photo: "/alwi.png" },
  { name: "Frendika Sembiring", nim: "211112142", photo: "/frendika.png" },
  { name: "M. Natasya Ramadana", nim: "211112080", photo: "/nasa.png" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4">
      <div className="max-w-3xl w-full flex flex-col items-center gap-8 p-8 shadow-xl animate-fade-in">
        <div className="text-center leading-tight font-bold text-lg md:text-xl mb-2">
          <p>DETEKSI WAJAH DAN PENGENALAN EKSPRESI SISWA SD</p>
          <p>MENGGUNAKAN MODEL YOLOV8 DAN RESNET50</p>
          <p>UNTUK MENGUKUR KETERTARIKAN</p>
          <p>TERHADAP MATA PELAJARAN</p>
        </div>
        <img
          src="/logo.png"
          alt="Logo Universitas"
          className="w-32 h-32 object-contain mb-4"
        />
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mb-4">
          {members.map((m, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <img
                src={m.photo}
                alt={m.name}
                className="w-24 h-24 object-cover mb-1"
              />
              <div className="font-semibold text-lg text-center">{m.name}</div>
              <div className="text-sm text-gray-600 text-center">{m.nim}</div>
            </div>
          ))}
        </div>
        <Button
          className="w-full bg-black text-white hover:bg-gray-900"
          onClick={() => navigate("/analyze")}
        >
          Mulai
        </Button>
      </div>
    </div>
  );
}
