type PaginationBtnProps = {
  children: React.ReactNode;
  handleClick: () => void;
  isDisabled?: boolean;
};

export default function PaginationBtn({ children, handleClick, isDisabled }: PaginationBtnProps) {
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
