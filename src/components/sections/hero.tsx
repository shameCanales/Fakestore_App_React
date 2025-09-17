import heroImg from "../../assets/heroimage.svg";
import { NavLink } from "react-router";

export default function HeroSection() {
  return (
    <div className="pt-14 flex flex-col items-center text-center">
      <img
        className="w-44 sm:w-60 mx-auto transition-transform duration-300 hover:scale-105"
        src={heroImg}
        alt="Hero illustration"
      />

      <h1 className="mt-7 font-extrabold text-3xl sm:text-4xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
        FakeStore App
      </h1>
      <p className="mt-2 text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
        An Ecommerce Frontend Site
      </p>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-600">
        A modern React project showcasing core e-commerce functionality with
        Redux Toolkit, TanStack Query, and TypeScript. It highlights frontend
        engineering skills through authentication, role-based access, and cart
        persistence.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto">
        <NavLink
          to="/products"
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 transition-all transform hover:scale-105 text-white px-6 py-3 rounded-xl text-sm sm:text-base font-medium shadow-md"
        >
          Start Shopping
        </NavLink>
        <NavLink
          to="/products"
          className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 transition-all transform hover:scale-105 text-gray-700 px-6 py-3 rounded-xl text-sm sm:text-base font-medium shadow-sm"
        >
          Learn More
        </NavLink>
      </div>
    </div>
  );
}
