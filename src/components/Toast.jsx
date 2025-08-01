import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Toast() {
  const title = useSelector((state) => state.ui.toast.title);
  const message = useSelector((state) => state.ui.toast.message);
  const type = useSelector((state) => state.ui.toast.type);

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    return () => setShow(false);
  }, [title, message]);

  const backgroundMapper = {
    error: "bg-red-700",
    info: "bg-blue-700",
    success: "bg-green-500",
  };

  const background = backgroundMapper[type] || backgroundMapper.info;

  return (
    <div
      className={`fixed bottom-5 left-[50%] translate-[-50%] ${background} rounded-xl px-8 py-4 w-[400px] mx-auto transition-all duration-500 ease-in-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <p className="text-stone-50 poppins-medium text-lg">{title}</p>
      <p className="text-stone-50 mt-0">{message}</p>
    </div>
  );
}
