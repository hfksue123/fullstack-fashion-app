import { useState, useRef, useEffect } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsByFilters, setFilters } from "../../redux/slices/productsSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  //Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSearchToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
  };

  return (
    <div
      className={`flex items-center justify-center transition-all duration-300 
      ${
        isOpen
          ? "fixed top-0 left-0 w-full h-30 bg-white z-50 px-4 shadow-md"
          : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full max-w-3xl"
        >
          <div className="relative w-full">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-200 px-4 py-2 pl-4 pr-12 rounded-lg focus:outline-none 
              placeholder:text-gray-500 text-gray-900"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="w-5 h-5" />
            </button>
          </div>

          {/* Nút đóng */}
          <button
            type="button"
            className="ml-4 text-gray-600 hover:text-red-500"
            onClick={handleSearchToggle}
          >
            <HiMiniXMark className="w-6 h-6" />
          </button>
        </form>
      ) : (
        <button
          onClick={handleSearchToggle}
          className="text-gray-700 hover:text-blue-500"
        >
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};
export default SearchBar;
