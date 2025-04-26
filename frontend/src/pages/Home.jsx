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
import Feedback from "../components/Products/FeedBack";
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
        category: "Bottoms",
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
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">
        BEST SELLER
      </h2>
      <div className="h-[1px] w-12 bg-darkColor mx-auto lg:mb-4" />
      {bestSellerProducts ? (
        <ProductDetails productId={bestSellerProducts._id} />
      ) : (
        <p className="text-center">Loading best seller products...</p>
      )}

      <div className="container mx-auto mb-6">
      <h2 className="text-xl md:text-3xl font-semibold text-center mb-4 px-1">
        BOTTOM WEAR FOR WOMEN
      </h2>
      <div className="h-[1px] w-35 bg-darkColor mx-auto mb-6" />
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <ParallaxSection />
      <FeaturedCollection />
      <Feedback />
      <FeaturesSection />
    </div>
  );
};

export default Home;
