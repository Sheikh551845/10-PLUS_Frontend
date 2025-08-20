import React from "react";
import { useLoaderData } from "react-router-dom";

const OrdersPage = () => {
  // Example loader structure
  // Each order: { id, email, phone, product_img, product_name, quantity, size, price, status }
  const orders = useLoaderData();

  return (
    <div className="p-6 md:p-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have not placed any orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border rounded-md shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={order.product_img}
                  alt={order.product_name}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div>
                  <p className="font-semibold">{order.product_name}</p>
                  <p className="text-gray-500 text-sm">Quantity: {order.quantity}</p>
                  <p className="text-gray-500 text-sm">Size: {order.size}</p>
                  <p className="text-gray-500 text-sm">Price: {order.price}৳</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-gray-500 text-sm">Email: {order.email}</p>
                <p className="text-gray-500 text-sm">Phone: {order.phone}</p>
                <p
                  className={`mt-2 font-bold ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
