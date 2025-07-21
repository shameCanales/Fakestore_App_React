export default function PaginationBtn({ children, handleClick, isDisabled }) {
  return (
    <button
      className="bg-purple-900 text-stone-50 p-4 inter-medium"
      onClick={handleClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
