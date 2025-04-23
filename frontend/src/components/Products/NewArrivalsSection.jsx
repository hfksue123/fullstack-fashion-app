import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivalsSection = () => {
  const scrollRef = useRef(null);
  const [newArrivals, setNewArrivals] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);
  const [dragMoved, setDragMoved] = useState(false);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Failed to fetch new arrivals:", error);
      }
    };
    fetchNewArrivals();
  }, []);

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 5
    );
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
    };
  }, [newArrivals]);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container || !container.firstChild) return;

    const childWidth = container.firstChild.offsetWidth + 20; // 20px = space-x-5

    if (direction === "right") {
      container.scrollBy({ left: childWidth, behavior: "smooth" });
    } else {
      container.scrollBy({ left: -childWidth, behavior: "smooth" });
    }
  };

  // === Drag to scroll ===
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeftStart(scrollRef.current.scrollLeft);
    setDragMoved(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const walk = e.clientX - startX;
    if (Math.abs(walk) > 3) setDragMoved(true);
    scrollRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="new-arrivals" className="py-8 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-6">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-2">
          Discover the latest fashion trends and styles in our collection.
        </p>

        {/* Scroll buttons */}
        <div className="sm:flex justify-center mt-2 space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full shadow transition ${
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
            className={`p-2 rounded-full shadow transition ${
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
        className={`container mx-auto flex space-x-5 pb-4 overflow-x-auto scrollbar-hide ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {newArrivals.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            onClick={(e) => {
              if (dragMoved) e.preventDefault();
            }}
            className="min-w-[200px] sm:min-w-[280px] lg:min-w-[300px] shrink-0 relative rounded-lg overflow-hidden shadow block"
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[300px] sm:h-[400px] object-cover"
              draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-3xl text-white p-4">
              <h4 className="font-semibold text-sm lg:text-lg">
                {product.name}
              </h4>
              <p className="text-xs lg:text-sm mt-1">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSection;
