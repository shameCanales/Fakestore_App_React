export default function Button({ label, handleClick }) {
  return (
    <button
      className="px-4 py-2 bg-stone-800 text-stone-50 rounded-full text-lg"
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
