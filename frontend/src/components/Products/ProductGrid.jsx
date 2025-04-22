import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) return <p>Loading..............</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product, index) => {
        const { discountPrice, price } = product;
        const hasDiscount = discountPrice && discountPrice > price;
        const discountPercent = hasDiscount
          ? Math.floor(((discountPrice - price) / discountPrice) * 100)
          : 0;

        return (
          <Link key={index} to={`/product/${product._id}`} className="block">
            <div className="relative bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            
              {/* Badge giảm giá */}
              {hasDiscount && (
                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                  -{discountPercent}%
                </div>
              )}

              {/* Hình ảnh */}
              <div className="w-full h-100 mb-4 relative">
                {/* Default image */}
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.altText || product.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />

                {/* Hover effect */}
                {product.images[1]?.url && (
                  <img
                    src={product.images[1].url}
                    alt={product.images[1].altText || product.name}
                    className="w-full h-full object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  />
                )}
              </div>

              {/* Tên sản phẩm */}
              <h3 className="text-sm line-clamp-2">{product.name}</h3>

              {/* Giá */}
              <div className="flex items-center gap-2">
                <p className="text-gray-800 font-semibold text-sm">${price}</p>
                {hasDiscount && (
                  <p className="text-gray-400 text-sm line-through">
                    ${discountPrice}
                  </p>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;
