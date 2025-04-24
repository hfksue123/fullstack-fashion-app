import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSaleProducts } from "../../redux/slices/productsSlice";
import ProductGrid from "./ProductGrid";

const SaleProduct = () => {
  const dispatch = useDispatch();
  const { saleProducts, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchSaleProducts());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-semibold mb-6 text-center text-darkColor tracking-tight">
          Hot Deals – Up to <span className="text-red-500">80%</span> OFF!
        </h2>

        <ProductGrid products={saleProducts} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default SaleProduct;
