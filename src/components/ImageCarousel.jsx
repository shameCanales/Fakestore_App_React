import "keen-slider/keen-slider.min.css";
import { useState } from "react";

export default function ImageCarousel({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleSelectImage = (index) => {
    setSelectedImage(index);
  };

  return (
    <div className="relative">
      <div className="border-2 border-red-600">
        <img src={images[selectedImage]} alt="" />
      </div>
      <div className="flex gap-2 mx-4 absolute bottom-4">
        {images.map((img, index) => (
          <img
            className="w-[150px] border-2 border-stone-50"
            key={img}
            src={img}
            onClick={() => handleSelectImage(index)}
          />
        ))}
      </div>
    </div>
  );
}
