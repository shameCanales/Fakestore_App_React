import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.js";
import heroImg from "../../assets/heroimage.svg";
import { NavLink } from "react-router";
import { useState } from "react";
import shopping from "../../assets/shopping.svg";
import mobile from "../../assets/mobile.svg";
import realtime from "../../assets/realtime.svg";

interface CarouselItems {
  id: number;
  title: string;
  description: string;
  image: string;
}

const carouselItems: CarouselItems[] = [
  {
    id: 0,
    title: "Simple Shopping Ecosystem",
    description:
      "Build and manage your shopping with ease using a clean and efficient system.",
    image: shopping,
  },
  {
    id: 1,
    title: "Great Shopping Experience",
    description:
      "Enjoy fast, seamless, and secure transactions for every product you need.",
    image: mobile,
  },
  {
    id: 2,
    title: "Real-time Updates",
    description:
      "Stay updated with live data and notifications for a smarter shopping experience.",
    image: realtime,
  },
];

export default function HomePage() {
  const isAdmin =
    useSelector((state: RootState) => state.auth.profileData.role) === "admin";
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<number>(0);

  const handleSelectActivecarousel = (index: number) => {
    setActiveCarouselIndex(index);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="pt-12 flex flex-col items-center text-center">
        <img
          className="w-48 sm:w-64 md:w-80 mx-auto transition-transform duration-300 hover:scale-105"
          src={heroImg}
          alt="Invoice illustration"
        />

        <h1 className="mt-8 font-bold text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          FakeStore App
        </h1>
        <p className="text-sm sm:text-base text-stone-400 mt-2">
          An Ecommerce Frontend Site
        </p>
        <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-stone-300">
          Built with React, React Router v7, Vite, TailwindCSS, TanStack Query,
          Redux Toolkit, and the Platzi FakeStore API. <br />
          Developed by{" "}
          <span className="font-semibold text-purple-400">
            Mark Aron Shame B. Canales
          </span>{" "}
          – Aspiring Fullstack Developer.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <NavLink
            to="/products"
            className="bg-purple-600 hover:bg-purple-700 transition-all transform hover:scale-105 text-white px-6 py-3 rounded-lg text-sm sm:text-base font-medium shadow-lg shadow-purple-500/30"
          >
            Start Shopping
          </NavLink>
          <NavLink
            to="/products"
            className="bg-stone-700 hover:bg-stone-600 transition-all transform hover:scale-105 text-white px-6 py-3 rounded-lg text-sm sm:text-base font-medium shadow-md"
          >
            Learn More
          </NavLink>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Explore Solutions
        </h2>
        <p className="mt-2 text-stone-400 max-w-xl mx-auto text-sm sm:text-base">
          Discover modern ecommerce solutions designed to make your shopping
          experience seamless, efficient, and enjoyable.
        </p>

        {/* Carousel Options */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {carouselItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSelectActivecarousel(index)}
              className={`rounded-lg border-2 p-5 text-left transition-all transform hover:-translate-y-1 ${
                activeCarouselIndex === index
                  ? "border-purple-600 bg-gradient-to-br from-stone-800 to-stone-900 shadow-lg shadow-purple-600/30"
                  : "border-stone-700 bg-stone-900 hover:border-stone-500"
              }`}
            >
              <p className="font-semibold text-white">{item.title}</p>
              <p className="text-sm text-stone-400 mt-2">{item.description}</p>
            </button>
          ))}
        </div>

        {/* Active Carousel Image */}
        <div className="mt-10 flex justify-center">
          <img
            src={carouselItems[activeCarouselIndex]?.image}
            alt={carouselItems[activeCarouselIndex]?.title}
            className="w-40 sm:w-56 md:w-72 object-contain transition-all duration-500 ease-in-out transform hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
