import { Link } from "react-router-dom";
import heroImg from "../../assets/rabbit-hero.jpg";

const Hero = () => {
  return (
    <section className="relative">
      {/* IMG wrapped in Link */}
      <Link to="/collections/all">
        <img
          src={heroImg}
          alt="Rabbit"
          className="w-full h-[400px] md:h-[600px] lg:h-[700px] object-cover cursor-pointer"
        />
      </Link>
    </section>
  );
};

export default Hero;
