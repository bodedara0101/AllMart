import { useEffect, useState } from "react";

const preloadImage = (url) => {
  const img = new Image();
  img.src = url;
};

const CloudinaryImages = ({ imageUrls }) => {
  useEffect(() => {
    imageUrls.forEach((url) => preloadImage(url));
  }, [imageUrls]);

  return (
    <div>
      {imageUrls.map((url, index) => (
        <img key={index} src={url} alt={`Image ${index}`} loading="lazy" />
      ))}
    </div>
  );
};

export default CloudinaryImages;
