export default function LinkSidebar({ children, active }) {
  return (
    <p
      className={`text-stone-50 montserrat-regular text-lg  my-2 pl-6 py-2 ${
        active &&
        "rounded-sm montserrat-bold  bg-gradient-to-r from-blue-700  via-purple-500 to-pink-500"
      }`}
    >
      {children}
    </p>
  );
}
