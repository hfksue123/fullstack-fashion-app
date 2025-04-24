// Checkout.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaypalButton from './PaypalButton';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../redux/slices/checkoutSlide';
import axios from 'axios';
import { clearCart } from '../../redux/slices/cartSlice';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [checkoutId, setCheckoutId] = useState(null);
  const [isFinalizing, setIsFinalizing] = useState(false);


  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  useEffect(() => {
    if (!cart?.products?.length && !isFinalizing) {
      navigate('/order-confirmation');
    }
  }, [cart, isFinalizing, navigate]);
  

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      createCheckout({
        checkoutItems: cart.products,
        shippingAddress,
        paymentMethod: 'Paypal',
        totalPrice: cart.totalPrice,
      })
    );
    if (res.payload?._id) {
      setCheckoutId(res.payload._id);
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: 'paid',
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      setIsFinalizing(true);

      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      // ⬇️ Send request to update stock of products
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/update-stock`,
        {
          items: cart.products.map((item) => ({
            productId: item.productId || item._id,
            quantity: item.quantity,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      dispatch(clearCart());
      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    } finally {
      setIsFinalizing(false);
    }
  };
  
  

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart?.products?.length) return <p>Cart is empty</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section: Form */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              className="w-full border rounded p-2"
              disabled
            />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            {['firstName', 'lastName'].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={shippingAddress[field]}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, [field]: e.target.value })
                  }
                  required
                />
              </div>
            ))}
          </div>

          {['address', 'country', 'phone'].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-gray-700 capitalize">{field}</label>
              <input
                type="text"
                value={shippingAddress[field]}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, [field]: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          ))}

          <div className="mb-4 grid grid-cols-2 gap-4">
            {['city', 'postalCode'].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 capitalize">{field}</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={shippingAddress[field]}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, [field]: e.target.value })
                  }
                  required
                />
              </div>
            ))}
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button type="submit" className="w-full bg-black text-white py-3 rounded">
                Continue to Payment
              </button>
            ) : (
              <PaypalButton
                amount={cart.totalPrice}
                onSuccess={handlePaymentSuccess}
                onError={(err) => {
                  console.error('Payment error:', err);
                  alert('Payment failed. Please try again.');
                }}
              />
            )}
          </div>
        </form>
      </div>

      {/* Right Section: Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div key={index} className="flex justify-between items-start py-2 border-b">
              <div className="flex">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                  <p className="text-gray-500">Quantity: {product.quantity}</p>
                </div>
              </div>
              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between text-lg mb-4">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between text-lg border-t pt-4 mt-4 font-semibold">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
