import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartitemQuantity } from "./../../redux/slices/cartSlice";
const CartContent = ({ cart, userId, guestId }) => {
  //Redux
  const dispatch = useDispatch();

  //Handle adding or subtracting to cart
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
  const handleRemoveFromCart = (productId, size, color)=>{
    dispatch(removeFromCart({ productId, size, color, userId, guestId }));
  }
  return (
    <div>
      {cart.products.map((product, index) => (
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
                Size: {product.size} | color: {product.color}{" "}
              </p>
              <div className="flex items-center mt-2">
                {/* Button subtract and plus in cart */}
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
                  className="border rounded px-2 py-1 text-xl font-medium"
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
                className="border rounded px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>${product.price.toLocaleString()}</p>
            <button onClick={()=>handleRemoveFromCart(product.productId,product.size,product.color)}>
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
