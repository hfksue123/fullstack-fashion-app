import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiPaperArrow } from "react-icons/gi";
import { GiPointySword } from "react-icons/gi";
import mensCollectionImage from "../../assets/mens-collection.jpg";
import mens2CollectionImage from "../../assets/mens2-collection.jpg";
import mens3CollectionImage from "../../assets/mens3-collection.jpg";
import womensCollectionImage from "../../assets/womens-collection.jpg";
import womens2CollectionImage from "../../assets/womens2-collection.jpg";
import womens3CollectionImage from "../../assets/womens3-collection.jpg";

const GenderCollection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const womensImages = [womensCollectionImage, womens2CollectionImage, womens3CollectionImage];
  const mensImages = [mensCollectionImage, mens2CollectionImage,mens3CollectionImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % womensImages.length);
        setFade(true);
      }, 200); // thời gian khớp với animation
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pb-10 px-4 lg:px-0">
      <div className="container mx-auto flex flex-row gap-4 lg:gap-8">
        {/* Women's Collection */}
        <div className="relative flex-1 overflow-hidden rounded-xl shadow-md">
          <img
            src={womensImages[currentIndex]}
            alt="womens collection"
            className={`w-full h-[300px] lg:h-[600px] object-cover transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Overlay */}
          <div className="absolute bottom-2 lg:bottom-8 left-2 lg:left-8 bg-white/80 backdrop-blur-2xl p-2 lg:p-4 rounded-md shadow-lg">
            <h2 className="text-[10px] lg:text-2xl font-bold text-gray-800 mb-0 lg:mb-3">
              Women Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="group inline-flex items-center gap-2 text-[8px] lg:text-lg text-gray-900 underline hover:text-blue-600 transition"
            >
              Shop Now
              <GiPaperArrow className="text-sm lg:text-xl transform transition-transform duration-500 group-hover:rotate-[675deg]" />
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative flex-1 overflow-hidden rounded-xl shadow-md">
          <img
            src={mensImages[currentIndex]}
            alt="mens collection"
            className={`w-full h-[300px] lg:h-[600px] object-cover transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Overlay */}
          <div className="absolute bottom-2 lg:bottom-8 left-2 lg:left-8 bg-white/80 backdrop-blur-2xl p-2 lg:p-4 rounded-md shadow-lg">
          <h2 className="text-[10px] lg:text-2xl font-bold text-gray-800 mb-0 lg:mb-3">
              Men Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="group inline-flex items-center gap-2 text-[8px] lg:text-lg text-gray-900 underline hover:text-blue-600 transition"
            >
              Shop Now
              <GiPointySword className="text-sm lg:text-xl transform transition-transform duration-500 group-hover:rotate-[675deg]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollection;
