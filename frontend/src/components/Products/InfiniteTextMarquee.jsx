const InfiniteTextMarquee = () => {
  const handleClick = () => {
    const target = document.getElementById("new-arrivals");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mt-8 lg:mt-0 relative w-full overflow-hidden whitespace-nowrap py-4 bg-white cursor-pointer">
      <div className="animate-marquee inline-block" onClick={handleClick}>
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
