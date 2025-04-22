import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivalsSection = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [dragMoved, setDragMoved] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      updateScrollButtons();
    }
  }, [newArrivals]);

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container || !container.firstChild) return;

    const childWidth = container.firstChild.offsetWidth; // thêm khoảng cách giữa các item (space-x-6 = 1.5rem = 24px)

    if (direction === "right") {
      // Nếu đã gần cuối thì reset về đầu
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: childWidth, behavior: "smooth" });
      }
    } else {
      container.scrollBy({ left: -childWidth, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollStart(scrollRef.current.scrollLeft);
    setDragMoved(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const walk = e.pageX - startX;
    if (Math.abs(walk) > 5) setDragMoved(true); // nếu rê chuột thì chặn click
    scrollRef.current.scrollLeft = scrollStart - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
    };
  }, []);

  // === Auto scroll effect every 2s ===
  useEffect(() => {
    const interval = setInterval(() => {
      scroll("right");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest fashion trends and styles in our collection. Our
          team of experts curates the most stylish products for your wardrobe.
        </p>

        {/* Scroll buttons */}
        <div className="absolute right-4 top-0 transform translate-y-2 flex space-x-2 z-10">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full border shadow transition ${
              canScrollLeft
                ? "bg-white hover:bg-gray-100 text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border shadow transition ${
              canScrollRight
                ? "bg-white hover:bg-gray-100 text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className={`container mx-auto flex space-x-6 px-2 sm:px-4 pb-4 overflow-x-auto scrollbar-hide ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {newArrivals.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            onClick={(e) => {
              if (dragMoved) e.preventDefault();
            }}
            className="min-w-[250px] sm:min-w-[280px] lg:min-w-[320px] shrink-0 
            relative rounded-lg overflow-hidden shadow block"
          >
            <img
              src={product.images[0].url}
              alt={product.images[0].altText}
              className="w-full h-[300px] sm:h-[400px] object-cover"
              draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-3xl text-white p-4">
              <h4 className="font-semibold text-lg">{product.name}</h4>
              <p className="text-sm mt-1">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSection;
