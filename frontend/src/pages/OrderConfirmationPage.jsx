import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from '../redux/slices/cartSlice';

const OrderConfirmationPage = () => {
  //Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {checkout} = useSelector(state => state.checkout);
//Clear cart when the order is confirmed
useEffect(() => {
  if (checkout&&checkout._id){
    dispatch(clearCart());
    localStorage.removeItem("cart");
  } else {
    navigate("/my-orders")
  }
},[checkout,dispatch,navigate]);
const calculateEstimatedDelivery = (createAt) => {
    const orderDate = new Date(createAt);
    orderDate.setDate(orderDate.getDate()+10); // 10days
    return orderDate.toLocaleDateString();
}

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-600 mb-6">
        Thank you for your order!
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            {/* Order ID and Date */}
            <div>
              <h2 className="text-xl font-semibold">
                Order ID: {checkout._id}
              </h2>
              <p className="text-gray-500">
                Order date: {new Date(checkout.createAt).toLocaleDateString()}
              </p>
            </div>
            {/* Estimated Delivery Date */}
            <div>
              <p className="text-emerald-600 text-sm">
                Estimated Delivery:{" "}
                {calculateEstimatedDelivery(checkout.createAt)}
              </p>
            </div>
          </div>
          {/* Ordered Items */}
          <div className="mb-20">
            {checkout.checkoutItems.map((item) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt=""
                  className="w-20 h-20 object-cover mr-4 rounded-md"
                />
                <div>
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md">${item.price}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Payment & Shipping Information */}
          <div className="grid grid-cols-2 gap-8">
            {/* Payment Information */}
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Payment Information
              </h4>
              <p className="text-gray-600">PayPal</p>
            </div>

            {/* Delivery Information */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city},{" "}
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderConfirmationPage