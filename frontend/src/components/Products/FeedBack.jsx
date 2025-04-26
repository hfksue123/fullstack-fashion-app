import { Link } from "react-router-dom";

import feedback1 from "../../assets/feedback1.jpg";
import feedback2 from "../../assets/feedback2.jpg";
import feedback3 from "../../assets/feedback3.jpg";
import feedback4 from "../../assets/feedback4.jpg";
import feedback5 from "../../assets/feedback5.jpg";
import feedback6 from "../../assets/feedback6.jpg";
import feedback7 from "../../assets/feedback7.jpg";

const HoverImage = ({ src, alt, className = "", link = "#" }) => {
  return (
    <Link to={link} className={`relative group overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
};

const Feedback = () => {
  return (
    <section className="py-12 px-1 lg:px-1 bg-white">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
        FEEDBACKs
      </h2>
      <div className="h-[2px] w-12 bg-darkColor mx-auto mb-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 max-w-screen mx-auto">
        {/* Cột trái */}
        <div className="flex flex-col gap-1">
          <HoverImage
            src={feedback1}
            alt="Feedback 1"
            link="/product/680b0adc1822ca0d7665a1e1"
          />
          <HoverImage
            src={feedback2}
            alt="Feedback 2"
            link="/product/680b8f0fe616d65571938ca3"
          />
        </div>

        {/* Cột phải */}
        <div className="flex flex-col gap-1">
          {/* Ảnh lớn */}
          <HoverImage
            src={feedback3}
            alt="Feedback 3"
            link="/product/680c7d5941e23f504d644dbd"
          />

          {/* Hai ảnh nhỏ nằm ngang */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <HoverImage
                src={feedback4}
                alt="Feedback 4"
                link="/product/6809c8fc15ef5dac20783c84"
                className="w-1/2"
              />
              <HoverImage
                src={feedback5}
                alt="Feedback 5"
                link="/product/680c7e2b41e23f504d6456b5"
                className="w-1/2"
              />
            </div>
            <div className="flex gap-1">
              <HoverImage
                src={feedback6}
                alt="Feedback 6"
                link=""
                className="w-1/2"
              />
              <HoverImage
                src={feedback7}
                alt="Feedback 7"
                link=""
                className="w-1/2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
