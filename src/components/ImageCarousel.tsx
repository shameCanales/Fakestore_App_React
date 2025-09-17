import { useState } from "react";

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const handleSelectImage = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <div className="">
      <div>
        <img className="rounded-2xl" src={images[selectedImage]} alt="" />
      </div>
      <div className="flex justify-center gap-2 mx-4 bottom-4 mt-4">
        {images.map((img, index) => {
          return (
            <img
              className={`w-[60px] rounded-xl ${
                selectedImage === index ? "brightness-50" : ""
              }`}
              key={index}
              src={img}
              onClick={() => handleSelectImage(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
