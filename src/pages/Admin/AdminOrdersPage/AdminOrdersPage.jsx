import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const AdminOrdersPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("sl");
    const [sortOrder, setSortOrder] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 20; // You can adjust


    // Fetch all orders
    const fetchOrders = async () => {
        const res = await axios.get("https://one0-plus-server.onrender.com/AllOrder");
        return res.data;
    };

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ["orders"],
        queryFn: fetchOrders,
    });

    console.log(orders)


    // Search suggestions
    const suggestions = useMemo(() => {
        if (!searchTerm) return [];
        const lower = searchTerm.toLowerCase();
        const uniqueSuggestions = new Set();

        orders.forEach((order) => {
            if (order.username?.toLowerCase().includes(lower)) uniqueSuggestions.add(order.username);
            if (order.usermail?.toLowerCase().includes(lower)) uniqueSuggestions.add(order.usermail);
            order.products.forEach((p) => {
                if (p.orderId?.toLowerCase().includes(lower)) uniqueSuggestions.add(p.orderId);
            });
        });

        return Array.from(uniqueSuggestions).slice(0, 5);
    }, [searchTerm, orders]);

    // Filter & sort
    const filteredOrders = useMemo(() => {
        let filtered = orders.filter(
            (order) =>
                order.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.usermail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.products.some((p) => p.orderId?.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        filtered.sort((a, b) => {
            if (sortField === "order_on") {
                return sortOrder === "asc"
                    ? new Date(a.order_on) - new Date(b.order_on)
                    : new Date(b.order_on) - new Date(a.order_on);
            }
            if (sortField === "status") {
                return sortOrder === "asc"
                    ? a.status.localeCompare(b.status)
                    : b.status.localeCompare(a.status);
            }
            if (sortField === "sl") {
                return sortOrder === "asc"
                    ? (a.sl || 0) - (b.sl || 0)
                    : (b.sl || 0) - (a.sl || 0);
            }
            return 0;
        });

        return filtered;
    }, [orders, searchTerm, sortField, sortOrder]);

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const handleSetDelivered = async (id) => {
        try {
            const res = await fetch(`https://one0-plus-server.onrender.com/orders/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "delivered" }),
            });

            if (res.ok) {
                // ✅ SweetAlert2 success message
                Swal.fire({
                    icon: "success",
                    title: "Order Delivered!",
                    text: "The order status has been updated successfully.",
                    timer: 2000,
                    showConfirmButton: false,
                });

                // Refetch orders to update UI
                refetch();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: "Could not update order status.",
                });
            }
        } catch (error) {
            console.error("Error updating order:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong while updating order.",
            });
        }
    };
    // Count pending & delivered
    const pendingCount = orders.filter((o) => o.status === "pending").length;
    const deliveredCount = orders.filter((o) => o.status === "delivered").length;

    if (isLoading) return <p>Loading orders...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>

            {/* Summary */}
            <div className="flex gap-6 mb-6">
                <p className="font-semibold text-yellow-600">Pending: {pendingCount}</p>
                <p className="font-semibold text-green-600">Delivered: {deliveredCount}</p>
            </div>

            {/* Search + Suggestions */}
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search by username, email, or orderId"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                {suggestions.length > 0 && (
                    <ul className="absolute bg-white border rounded w-full mt-1 max-h-40 overflow-auto z-10">
                        {suggestions.map((s, i) => (
                            <li
                                key={i}
                                onClick={() => setSearchTerm(s)}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {s}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Sort */}
            <div className="flex gap-2 mb-6">
                <select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="sl">SL (Serial)</option>
                    <option value="order_on">Order Date</option>
                    <option value="status">Status</option>
                </select>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>

            {/* Orders */}
            {currentOrders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {currentOrders.map((order) => (
                        <div key={order._id} className="p-4 border rounded-md shadow-sm bg-white">
                            <div className="flex justify-between items-center px-4 mb-2">
                                <p className="text-xs text-gray-500 font-semibold">SL: {order.sl}</p>
                                <p className="text-xs text-black italic">Order ID: {order.orderId}</p>
                            </div>
                            <div className="mb-2">
                                <p className="">
                                    Order by: {order.username} ({order.usermail})
                                </p>
                                <p className="text-sm text-black">
                                    {order.user_contact_number} - {order.user_address}
                                </p>
                                <p className="text-sm text-black">Order Date: {order.order_on}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {order.products.map((p) => (
                                    <div key={p.orderId} className="flex gap-3 items-center">
                                        <img
                                            src={p.img}
                                            alt={p.product_name}
                                            className="w-16 h-16 rounded object-cover"
                                        />
                                        <div>
                                            <p className="font-medium">{p.product_name}</p>
                                            <p className="text-sm text-black">
                                                Qty: {p.quantity} | Size: {p.product_size}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-3 flex justify-between items-center">
                                <p
                                    className={`font-bold ${order.status === "delivered" ? "text-green-600" : "text-yellow-600"
                                        }`}
                                >
                                    {order.status}
                                </p>
                                {order.status !== "delivered" && (
                                    <button
                                        onClick={() => handleSetDelivered(order._id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                    >
                                        Set as Delivered
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AdminOrdersPage;
