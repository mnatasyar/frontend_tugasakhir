export default function SummaryResult({ total_faces, interest_distribution }) {
  return (
    <div className="mt-6 text-sm font-medium">
      <p>Total wajah terdeteksi: {total_faces}</p>
      <p>Distribusi tingkat ketertarikan:</p>
      <ul className="list-disc list-inside">
        {Object.entries(interest_distribution).map(([label, count]) => {
          const percentage = ((count / total_faces) * 100).toFixed(1);
          return (
            <li key={label}>
              {label.charAt(0).toUpperCase() + label.slice(1)}: {count} wajah (
              {percentage}%)
            </li>
          );
        })}
      </ul>
    </div>
  );
}
