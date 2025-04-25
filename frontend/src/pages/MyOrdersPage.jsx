import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "./../redux/slices/orderSlice";
import dayjs from "dayjs";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-8">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      {/* ✅ Table for medium screens and up */}
      <div className="hidden sm:block relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Shipping Address</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-4 px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="py-4 px-4">
                    {dayjs(order.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </td>
                  <td className="py-4 px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "Not provided"}
                  </td>
                  <td className="py-4 px-4">{order.orderItems.length}</td>
                  <td className="py-4 px-4">$ {order.totalPrice}</td>
                  <td
                    className={`${
                      order.isPaid ? "text-green-500" : "text-red-500"
                    } font-semibold`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Cards for mobile */}
      <div className="sm:hidden space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              onClick={() => handleRowClick(order._id)}
              className="bg-white rounded-xl p-4 shadow-md border cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={order.orderItems[0].image}
                  alt={order.orderItems[0].name}
                  className="w-10 h-10 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm">#{order._id}</h3>
                  <p className="text-xs text-gray-500">
                    {dayjs(order.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-700">
                <p>
                  <span className="font-medium">Shipping:</span>{" "}
                  {order.shippingAddress
                    ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                    : "Not provided"}
                </p>
                <p>
                  <span className="font-medium">Items:</span>{" "}
                  {order.orderItems.length}
                </p>
                <p>
                  <span className="font-medium">Total:</span> ${order.totalPrice}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`${
                      order.isPaid ? "text-green-600" : "text-red-500"
                    } font-semibold`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">You have no orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
