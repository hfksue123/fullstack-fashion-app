import React from "react";

const InfiniteTextMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden whitespace-nowrap border-y border-gray-200 py-4 bg-white">
      <div className="animate-marquee inline-block">
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={index}
            className="mx-8 text-[40px] lg:text-[70px] font-bold tracking-wider text-transparent stroke-text font-questrial"
          >
            NEW ARRIVALS
          </span>
        ))}
      </div>
    </div>
  );
};

export default InfiniteTextMarquee;
