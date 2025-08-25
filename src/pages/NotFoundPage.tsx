import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="w-[620px] bg-stone-900 mx-auto mt-25 p-5 text-stone-50 text-center rounded-2xl">
      <h1 className="poppins-bold text-5xl mt-15 text-red-500">Page Not found!</h1>

      <Link to={"/"}>
        <button className="underline underline-offset-5 montserrat-regular mt-10 mb-15">Go Back to Home Page</button>
      </Link>
    </div>
  );
}
