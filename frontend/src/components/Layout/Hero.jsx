import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";
import { GrNext, GrPrevious } from "react-icons/gr";

import logo from "../../assets/logo.png";
import hero1 from "../../assets/banner-1.jpg";
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

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-[400px] md:h-[600px] lg:h-screen -mt-20">
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
        className="h-full"
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

      {/* Nút điều hướng custom + logo cuộn xuống */}
      <div className="absolute bottom-2 right-2 z-20 flex gap-1 lg:gap-2 items-center">
        <button
          ref={prevRef}
          className="text-darkColor p-3 lg:p-5 shadow-xs shadow-darkColor"
        >
          <GrPrevious className="w-3 lg:w-4 h-3 lg:h-4" />
        </button>

        {/* Nút logo cuộn xuống */}
        <button
          onClick={handleScrollDown}
          className=""
        >
          <img src={logo} alt="Scroll Logo" className="w-6 h-6 lg:w-8 lg:h-8" />
        </button>

        <button
          ref={nextRef}
          className="text-darkColor p-3 lg:p-5 shadow-xs shadow-darkColor"
        >
          <GrNext className="w-3 lg:w-4 h-3 lg:h-4" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
