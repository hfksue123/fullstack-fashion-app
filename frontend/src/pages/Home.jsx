import React, { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrivalsSection from "../components/Products/NewArrivalsSection";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import ParallaxSection from "../components/Products/ParallaxSection";
import InfiniteTextMarquee from "../components/Products/InfiniteTextMarquee";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "./../redux/slices/productsSlice";
import axios from "axios";

const Home = () => {
  // Redux
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  console.log("Redux Products:", products);
  console.log("Redux Loading:", loading);
  console.log("Redux Error:", error);

  const [bestSellerProducts, setBestSellerProducts] = useState(null);
  useEffect(() => {
    //Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );
    //Fetch best seller products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <InfiniteTextMarquee/>
      <GenderCollection />
      <NewArrivalsSection />
      {/* Best seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProducts ? (
        <ProductDetails productId={bestSellerProducts._id} />
      ) : (
        <p className="text-center">Loading best seller products...</p>
      )}

      <div className="container mx-auto mb-6">
        <h2 className="text-3xl text-center font-bold mb-4">
          Bottom Wears For Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <ParallaxSection />
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
