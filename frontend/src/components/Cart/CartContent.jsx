import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
  removeFromCart,
  updateCartitemQuantity,
} from "./../../redux/slices/cartSlice";

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (
    productId,
    delta,
    quantity,
    size,
    color,
    countInStock
  ) => {
    const newQuantity = quantity + delta;
    console.log(
      "==> current:",
      quantity,
      "delta:",
      delta,
      "newQuantity:",
      newQuantity,
      "countInStock:",
      countInStock
    );

    if (newQuantity > countInStock) {
      toast.error("You reached the max quantity of this product.");
      return;
    }

    if (newQuantity >= 1) {
      dispatch(
        updateCartitemQuantity({
          productId,
          quantity: newQuantity,
          size,
          color,
          userId,
          guestId,
        })
      );
      toast.success("Quantity Updated Successfully");
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, size, color, userId, guestId }));
    toast.info("Product removed from cart successfully");
  };

  return (
    <div>
      {cart.products.map((product, index) => {
        const {
          productId,
          quantity,
          countInStock = Infinity,
          size,
          color,
          image,
          name,
          price,
        } = product;

        const isAtMin = quantity <= 1;
        const isAtMax = quantity >= countInStock;
        const exceedsStock = quantity > countInStock;

        return (
          <div
            key={index}
            className="flex items-start justify-between py-4 border-b"
          >
            <div className="flex items-start">
              <img
                src={image}
                alt={name}
                className="w-20 h-12 object-cover mr-4 rounded"
              />
              <div>
                <h3>{name}</h3>
                <p className="text-sm text-gray-500">
                  Size: {size} | Color: {color}
                </p>

                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleAddToCart(productId, -1, quantity, size, color)
                    }
                    disabled={isAtMin}
                    className="border rounded px-2 py-1 text-xl font-medium disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="mx-4">{quantity}</span>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        productId,
                        1,
                        quantity,
                        size,
                        color,
                        countInStock
                      )
                    }
                    disabled={isAtMax}
                    className="border rounded px-2 py-1 text-xl font-medium disabled:opacity-50"
                  >
                    +
                  </button>
                </div>

                {exceedsStock && (
                  <p className="text-sm text-red-600 mt-1">
                    You have the maximum quantity of this product in stock.
                  </p>
                )}
              </div>
            </div>

            <div className="text-right">
              <p>${price.toLocaleString()}</p>
              <button
                onClick={() => handleRemoveFromCart(productId, size, color)}
              >
                <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-500" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartContent;
