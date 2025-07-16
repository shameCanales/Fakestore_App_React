import { useState } from "react";

export default function ImageCarousel({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleSelectImage = (index) => {
    setSelectedImage(index);
  };

  return (
    <div className="relative">
      <div>
        <img src={images[selectedImage]} alt="" />
      </div>
      <div className="flex gap-2 mx-4 absolute bottom-4">
        {images.map((img, index) => {
          let imageStyle = "w-[100px]  ";

          if (selectedImage === index) {
            imageStyle += " border-3 border-stone-50";
          }

          return (
            <img
              className={imageStyle}
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
