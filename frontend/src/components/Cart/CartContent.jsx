import { RiDeleteBin3Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateCartitemQuantity,
} from './../../redux/slices/cartSlice';

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
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
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, size, color, userId, guestId }));
  };

  return (
    <div>
      {cart.products.map((product, index) => {
        const outOfStock = product.countInStock !== undefined && product.quantity >= product.countInStock;
        const exceedsStock = product.countInStock !== undefined && product.quantity > product.countInStock;

        return (
          <div
            key={index}
            className="flex items-start justify-between py-4 border-b"
          >
            <div className="flex items-start">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-12 object-cover mr-4 rounded"
              />
              <div>
                <h3>{product.name}</h3>
                <p className="text-sm text-gray-500">
                  Size: {product.size} | Color: {product.color}
                </p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        -1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                    disabled={product.quantity <= 1}
                    className="border rounded px-2 py-1 text-xl font-medium disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="mx-4">{product.quantity}</span>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                    disabled={outOfStock}
                    className="border rounded px-2 py-1 text-xl font-medium disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                {exceedsStock && (
                  <p className="text-sm text-red-600 mt-1">
                    Only {product.countInStock} in stock.
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p>${product.price.toLocaleString()}</p>
              <button
                onClick={() =>
                  handleRemoveFromCart(
                    product.productId,
                    product.size,
                    product.color
                  )
                }
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
