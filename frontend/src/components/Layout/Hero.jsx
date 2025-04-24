import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";
import { GrNext, GrPrevious } from "react-icons/gr";

import hero1 from "../../assets/rabbit-hero.jpg";
import hero2 from "../../assets/banner-2.jpg";
import hero3 from "../../assets/banner-3.jpg";

const heroImages = [
  { url: hero1, alt: "Rabbit Hero", link: "/collections/all" },
  { url: hero2, alt: "New Collection", link: "/collections/all" },
  { url: hero3, alt: "Spring Sale", link: "/products/sale" },
];

const Hero = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="relative h-[400px] md:h-[600px] lg:h-[700px] -mt-20">
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{ delay: 3000 }}
        speed={800}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="h-full custom-easing"
      >
        {heroImages.map((img, index) => (
          <SwiperSlide key={index}>
            <Link to={img.link}>
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Nút điều hướng custom */}
      <div className="absolute bottom-2 right-2 z-20 flex gap-2">
        <button
          ref={prevRef}
          className="bg-white bg-opacity-70 hover:bg-opacity-90 text-black p-5 shadow-xs shadow-darkColor"
        >
          <GrPrevious className="h-4 w-4" />
        </button>
        <button
          ref={nextRef}
          className="bg-white bg-opacity-70 hover:bg-opacity-90 text-black p-5 shadow-xs shadow-darkColor"
        >
          <GrNext className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
