export default function FormInput({ type, value, onChange }) {
  return (
    <input
      className="mt-2 border-1 border-stone-400 p-3 rounded-lg focus:outline-none montserrat-medium"
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}
