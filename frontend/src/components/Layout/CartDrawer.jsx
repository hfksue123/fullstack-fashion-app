import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  //Redux
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg
    transform transition-transform duration-300 ease-in-out flex flex-col z-50
    ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Close button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      {/* Cart contents with scrollable area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cart && cart?.products?.length > 0 ? (
          <CartContent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your cart is empty.</p>
        )}
        {/* Cart items */}
      </div>

      {/* Check Out button fixed at bottom*/}
      <div className="p-4 bg-white sticky bottom-0">
      {cart && cart?.products?.length > 0&&(
        <>
        <button
          onClick={handleCheckout}
          className="w-full bg-grayColor text-white py-3 rounded-lg font-semibold
        hover:bg-gray-800 hoverEffect"
        >
          Checkout
        </button>
        <p className="text-xs tracking-tighter text-gray-500 mt-2 text-center">
          Shipping, taxes, and discount codes will be calculated at checkout.
        </p>
        </>
      )}
      </div>
    </div>
  );
};

export default CartDrawer;
