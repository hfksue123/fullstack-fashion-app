import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiPaperArrow } from "react-icons/gi";
import { GiPointySword } from "react-icons/gi";
import mensCollectionImage from "../../assets/mens-collection.webp";
import mens2CollectionImage from "../../assets/mens2-collection.webp";
import mens3CollectionImage from "../../assets/mens3-collection.jpg";
import womensCollectionImage from "../../assets/womens-collection.webp";
import womens2CollectionImage from "../../assets/womens2-collection.webp";
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
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Women's Collection */}
        <div className="relative flex-1 overflow-hidden rounded-xl shadow-md">
          <img
            src={womensImages[currentIndex]}
            alt="womens collection"
            className={`w-full h-[600px] object-cover transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Womens Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="group inline-flex items-center gap-2 text-gray-900 underline hover:text-blue-600 transition"
            >
              Shop Now
              <GiPaperArrow className="text-xl transform transition-transform duration-500 group-hover:rotate-[675deg]" />
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative flex-1 overflow-hidden rounded-xl shadow-md">
          <img
            src={mensImages[currentIndex]}
            alt="mens collection"
            className={`w-full h-[600px] object-cover transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Men Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="group inline-flex items-center gap-2 text-gray-900 underline hover:text-blue-600 transition"
            >
              Shop Now
              <GiPointySword className="text-xl transform transition-transform duration-500 group-hover:rotate-[675deg]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollection;
