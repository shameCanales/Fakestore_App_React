import shopping from "../../assets/shopping.svg";
import mobile from "../../assets/mobile.svg";
import realtime from "../../assets/realtime.svg";
import { useState } from "react";

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

export default function CarouselFeature() {
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<number>(0);

  const handleSelectActivecarousel = (index: number) => {
    setActiveCarouselIndex(index);
  };

  return (
    <div className="mt-16 text-center">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
        Explore Solutions
      </h2>
      <p className="mt-3 text-gray-500 max-w-sm sm:max-w-lg mx-auto text-sm sm:text-base">
        Discover modern ecommerce solutions designed to make your shopping
        experience seamless, efficient, and enjoyable.
      </p>

      {/* Carousel Options */}
      <div className="mt-8 grid grid-cols-1 gap-4">
        {carouselItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSelectActivecarousel(index)}
            className={`rounded-2xl border p-5 text-left transition-all transform hover:-translate-y-1 ${
              activeCarouselIndex === index
                ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300 shadow-sm"
            }`}
          >
            <p className="font-semibold text-gray-900">{item.title}</p>
            <p className="text-sm text-gray-500 mt-2">{item.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <img
          src={carouselItems[activeCarouselIndex]?.image}
          alt={carouselItems[activeCarouselIndex]?.title}
          className="w-32 sm:w-44 object-contain transition-all duration-500 ease-in-out transform hover:scale-105"
        />
      </div>
    </div>
  );
}
