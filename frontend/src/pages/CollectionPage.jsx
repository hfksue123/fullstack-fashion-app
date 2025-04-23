import React, { useEffect, useState, useRef } from "react"; // <-- thêm useRef
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/Products/FilterSideBar";
import SortOption from "../components/Products/SortOption";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "./../redux/slices/productsSlice";

const CollectionPage = () => {
  //Redux
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const productCount = products.length;
  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        collection,
        ...queryParams,
      })
    );
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setSidebarOpen(false); // <-- sửa tên hàm
    }
  };

  // Thêm event listener khi mount và cleanup khi unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border-t border-b p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filter
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto hoverEffect lg:static lg:translate-x-0`}
      >
        <FilterSideBar />
      </div>

      <div className="flex-grow p-4">
        {/* Header with Search Result and Sort Option */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 max-sm:gap-5">
          {/* Title + Result count */}
          <div>
            <h2 className="text-2xl uppercase">All Collections</h2>
            {searchTerm && (
              <p className="text-sm text-gray-500">
                {productCount === 0 ? (
                  <>
                    No results for "<span className="italic">{searchTerm}</span>
                    "
                  </>
                ) : (
                  <>
                    Results for "<span className="italic">{searchTerm}</span>" |{" "}
                    {productCount} result{productCount !== 1 && "s"}
                  </>
                )}
              </p>
            )}
          </div>

          {/* Sort Option */}
          <SortOption />
        </div>

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
