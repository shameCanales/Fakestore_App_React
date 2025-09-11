import Heading from "../../UI/Heading.jsx";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.js";
import heroImg from "../../assets/heroimage.svg";
import { NavLink } from "react-router";

export default function HomePage(): React.JSX.Element {
  const isAdmin =
    useSelector((state: RootState) => state.auth.profileData.role) === "admin";
  console.log(isAdmin);

  return (
    <div className="pt-10">
      <img
        className="w-[250px] mx-auto"
        src={heroImg}
        alt="a figure of Printing Invoices"
      />

      <div className="mt-10 text-center">
        <h1 className="poppins-bold text-2xl">FakeStore App</h1>
        <p className="poppins-regular text-xs mt-1 text-stone-400">
          An Ecommerce Frontend Site
        </p>
        <p className="mt-4 montserrat-regular text-xs leading-normal">
          Built with React, React Router v7, Vite, Tailwindcss, Tanstack Query,
          Redux Toolkit, and the Platzi FakeStore API.
        </p>
        <p className="mt-2 montserrat-regular text-xs leading-normal">
          Built by Mark Aron Shame B. Canales - Aspiring Fullstack Developer
          specializing in frontend.
        </p>

        <NavLink to="/products">
          <p className="bg-purple-700 p-2 rounded-sm mt-5">Start Shopping</p>
        </NavLink>
      </div>
    </div>
  );
}
