import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const cartItems = useSelector((state) => state.cart.cart?.products ?? []);

  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const isOutOfStock = selectedProduct?.countInStock === 0;
  const currentItemInCart = cartItems.find(
    (item) => item.productId === productFetchId
  );
  const currentCartQuantity = currentItemInCart
    ? currentItemInCart.quantity
    : 0;

  const handleQuantityChange = (action) => {
    if (isOutOfStock) return;
    setQuantity((prev) => {
      if (action === "plus")
        return prev < selectedProduct.countInStock ? prev + 1 : prev;
      if (action === "minus") return prev > 1 ? prev - 1 : 1;
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to cart.", {
        duration: 1500,
      });
      return;
    }

    if (isOutOfStock) {
      toast.error("Product is out of stock...", {
        duration: 1500,
      });
      return;
    }

    const totalQuantityAfterAdd = currentCartQuantity + quantity;

    if (totalQuantityAfterAdd > selectedProduct.countInStock) {
      toast.error(`You have the maximum quantity of this product in cart.`, {
        duration: 1500,
      });
      return;
    }

    setIsButtonDisabled(true);
    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        userId: user?._id,
        guestId,
      })
    )
      .then(() => {
        toast.success("Product added to cart successfully 🎉", {
          duration: 1500,
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-15 h-15 object-cover cursor-pointer border hoverEffect ${
                    mainImage === image.url ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="md:w-1/2">
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full lg:h-[700px] object-cover mb-2"
              />
            </div>
            {/* Mobile Thumbnails */}
            <div className="md:hidden flex overflow-x-auto space-x-2 mb-2">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover cursor-pointer border hoverEffect ${
                    mainImage === image.url ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Info */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-xl md:text-3xl font-semibold mb-2">
                {selectedProduct.name}
              </h1>
              <p className="text-lg text-gray-600 mb-1 line-through">
                {selectedProduct.originalPrice &&
                  `$${selectedProduct.originalPrice}`}
              </p>
              <p className="text-lg lg:text-2xl text-gray-500 mb-2 flex items-center gap-2">
                ${selectedProduct.price}
                {selectedProduct.discountPrice > selectedProduct.price && (
                  <span className="text-sm lg:text-lg text-gray-400 line-through">
                    ${selectedProduct.discountPrice}
                  </span>
                )}
              </p>
              <p className="text-sm lg:text-lg tracking-tight text-gray-700 mb-4">
                {selectedProduct.description}
              </p>

              {/* Color */}
              <div className="mb-4">
                <p className="text-gray-700">Color:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 border-2 ${
                        selectedColor === color
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-4">
                <p className="text-gray-700">Size:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border ${
                        selectedSize === size
                          ? "bg-darkColor text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-gray-700">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    className={`px-2 py-1 bg-gray-200 rounded text-lg ${
                      isOutOfStock || quantity === 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    -
                  </button>
                  <span className="text-lg">{isOutOfStock ? 0 : quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    disabled={
                      isOutOfStock || quantity === selectedProduct.countInStock
                    }
                    className={`px-2 py-1 bg-gray-200 rounded text-lg ${
                      isOutOfStock || quantity === selectedProduct.countInStock
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`bg-darkColor text-white py-2 w-full ${
                  isButtonDisabled || isOutOfStock
                    ? "bg-gray-900 opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-900"
                }`}
              >
                {isButtonDisabled ? "Adding..." : "Add to Cart"}
              </button>

              {/* Characteristics */}
              <div className="mt-10 text-gray-700">
                <h3 className="text-xl font-bold mb-2">Characteristics:</h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand</td>
                      <td className="py-1">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Collection</td>
                      <td className="py-1">{selectedProduct.collections}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material</td>
                      <td className="py-1">{selectedProduct.material}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Quantity</td>
                      <td className="py-1">
                        {isOutOfStock
                          ? "Out of Stock"
                          : `${selectedProduct.countInStock}`}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          <div className="mt-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">
              YOU MAY ALSO LIKE
            </h2>
            <div className="h-[2px] w-20 bg-darkColor mx-auto mb-6" />
            <ProductGrid
              products={similarProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
