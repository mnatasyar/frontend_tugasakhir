import { BASE_URL } from "../utils/constants";

export default function ImageResult({ result }) {
  const { image_path, total_faces, faces } = result;

  const summary = faces.reduce((acc, face) => {
    acc[face.interest_label] = (acc[face.interest_label] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-4 mt-6">
      <img
        src={`${BASE_URL}/${image_path}`}
        alt="Hasil Deteksi"
        className="rounded shadow-md max-w-full"
      />
      <div className="text-sm font-medium">
        <p>Total wajah terdeteksi: {total_faces}</p>
        <p>Distribusi tingkat ketertarikan:</p>
        <ul className="list-disc list-inside">
          {Object.entries(summary).map(([label, count]) => {
            const percentage = ((count / total_faces) * 100).toFixed(1);
            return (
              <li key={label}>
                {label.charAt(0).toUpperCase() + label.slice(1)}: {count} wajah
                ({percentage}%)
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
