import React from "react";
import {
  HiArrowPathRoundedSquare,
  HiOutlineCreditCard,
  HiShoppingBag,
} from "react-icons/hi2";

const features = [
  {
    icon: <HiShoppingBag className="text-3xl text-black" />,
    title: "FREE INTERNATIONAL SHIPPING",
    subtitle: "On all orders over $100",
  },
  {
    icon: <HiArrowPathRoundedSquare className="text-3xl text-black" />,
    title: "45 DAYS RETURN",
    subtitle: "Money back guarantee",
  },
  {
    icon: <HiOutlineCreditCard className="text-3xl text-black" />,
    title: "SECURE CHECKOUT",
    subtitle: "100% secured checkout process",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-6 rounded-xl"
          >
            <div className="p-4 bg-gray-100 mb-4">
              {feature.icon}
            </div>
            <h4 className="text-sm font-semibold text-gray-900 tracking-tight mb-1 uppercase">
              {feature.title}
            </h4>
            <p className="text-gray-600 text-xs">{feature.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
