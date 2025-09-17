import HeroSection from "../../components/sections/hero.js";
import CarouselFeature from "../../components/sections/CarouselFeature.js";
import TechFeatures from "../../components/sections/TechFeatures.js";

export default function HomePage() {
  return (
    <div className="px-5 max-w-2xl mx-auto bg-white">
      <HeroSection />
      <CarouselFeature />
      <TechFeatures />
    </div>
  );
}
