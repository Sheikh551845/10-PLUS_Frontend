import React from "react";
import { useLoaderData } from "react-router-dom";

const OrdersPage = () => {
  const orders = useLoaderData(); // array of orders


  return (
    <div className="p-6 md:p-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">My Orders</h1>

      {orders?.length === 0 ? (
        <p className="text-center text-gray-500">You have not placed any orders yet after login.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border rounded-md shadow-sm"
            >
              <p
                className={`font-bold mb-4 ${order.status.toLowerCase() === "delivered"
                    ? "text-green-600"
                    : order.status.toLowerCase() === "pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
              >
                Status: {order.status}
              </p>

              <div className="flex flex-col gap-4">
                {order.products.map((product) => (
                  <div
                    key={product.orderId}
                    className="flex items-center gap-4 p-2 border rounded-md text-black"
                  >
                    <img
                      src={product.img}
                      alt={product.product_name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-semibold">{product.product_name}</p>
                      <p className="text-gray-500 text-sm">Color: {product.product_color}</p>
                      <p className="text-gray-500 text-sm">Size: {product.product_size}</p>
                      <p className="text-gray-500 text-sm">Quantity: {product.quantity}</p>
                      <p className="text-gray-500 text-sm">Order ID: {product.orderId}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
