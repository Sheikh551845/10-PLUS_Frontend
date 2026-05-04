import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import broken from "../../assets/Demo images/icons8-image-96.png";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { triggerCartUpdate } from "../../Utils/cartHelper";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../AuthPorvider";

const CartInfo = () => {
  const [cartItems, setCartItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "edit" or "order"
  const [userInfo, setUserInfo] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("orderUserInfo")) || {};
    return { name: saved.name || "", mobile: saved.mobile || "", address: saved.address || "" };
  });
  const [colorSize, setColorSize] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loading: load, user } = useContext(AuthContext);

  const deliveryOptions = [
    { label: "ঢাকা মেট্রো সিটি", charge: 60 },
    { label: "ঢাকা জেলা", charge: 80 },
    { label: "ঢাকা জেলার বাইরে", charge: 110 },
  ];
  const [selectedLocation, setSelectedLocation] = useState(deliveryOptions[0]);

  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const openEditModal = (item) => {
    setColorSize(item?.available_color_size);
    setEditItem({ ...item, quantity: Number(item.quantity) });
    setModalType("edit");
    setModalOpen(true);
  };

  const openOrderModal = (item) => {
    setEditItem({ ...item, quantity: Number(item.quantity) });
    setModalType("order");
    const saved = JSON.parse(localStorage.getItem("orderUserInfo")) || {};
    setUserInfo({ name: saved.name || "", mobile: saved.mobile || "", address: saved.address || "" });
    setSelectedLocation(deliveryOptions[0]);
    setOrderModalOpen(true);
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const val = value.replace(/[^0-9+]/g, "");
      const maxLength = val.startsWith("+") ? 14 : 11;
      setUserInfo((prev) => ({ ...prev, [name]: val.slice(0, maxLength) }));
    } else {
      setUserInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const generateOrderId = () => {
    const timestamp = Date.now(); // current time in milliseconds
    const randomNum = Math.floor(Math.random() * 1000); // random number 0-999
    return `ORD-${timestamp}-${randomNum}`;
  }

  // Checkout single item
  const confirmOrder = async (id) => {
    const { name, mobile, address } = userInfo;
    if (!name || !mobile || !address) {
      toast.error("Please fill all your information.");
      return;
    }

    const bdPhoneRegex = /^(?:\+88)?01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(mobile)) {
      toast.error("Please enter a valid Bangladeshi mobile number.");
      return;
    }

    try {
      setLoading(true);

      // Fetch current SL
      const slRes = await axiosSecure.get("/OrderSL");
      const currentSl = slRes.data;

      const subtotal = Number(editItem.price) * editItem.quantity;
      const total = subtotal + selectedLocation.charge;

      const orderData = {
        sl: currentSl || "",
        orderId: generateOrderId(),
        username: name,
        usermail: user?.email || '',
        status: "pending",
        user_contact_number: mobile,
        user_address: address,
        order_on: new Date().toISOString().split("T")[0],
        location: selectedLocation.label,
        delivery_charge: selectedLocation.charge,
        subtotal,
        total,
        products: [
          {
            product_name: editItem.name,
            product_color: editItem.color,
            product_size: editItem.size,
            quantity: editItem.quantity,
            img: editItem.img,
            pid: editItem.pid,
          },
        ],
      };

      const response = await axiosSecure.post("/send-order-email", orderData);

      if (response.data.success) {
        await axiosSecure.post("/SubmittedOrder", orderData);
        // Update SL (increment)
        await axiosSecure.patch("/OrderSL");
        // Save user info for next time
        localStorage.setItem("orderUserInfo", JSON.stringify({ name, mobile, address }));
        toast.success("Order placed successfully!");
        setCartItems((prev) => {
          const filtered = prev.filter((item) => item.id !== id);
          localStorage.setItem("cartItems", JSON.stringify(filtered));
          triggerCartUpdate();
          return filtered;
        });
        setOrderModalOpen(false);
      } else {
        toast.error(response.data.error || "Failed to place the order!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Checkout all items
  const checkoutAll = async () => {
    const { name, mobile, address } = userInfo;
    if (!name || !mobile || !address) {
      toast.error("Please fill your information to checkout all items.");
      return;
    }

    const bdPhoneRegex = /^(?:\+88)?01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(mobile)) {
      toast.error("Please enter a valid Bangladeshi mobile number.");
      return;
    }

    try {
      setLoading(true);

      // Fetch current SL
      const slRes = await axiosSecure.get("/OrderSL");
      const currentSl = slRes.data;

      const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
      const total = subtotal + selectedLocation.charge;

      const orderData = {
        sl: currentSl || "",
        orderId: generateOrderId(),
        username: name,
        usermail: user?.email || '',
        status: "pending",
        user_contact_number: mobile,
        user_address: address,
        order_on: new Date().toISOString().split("T")[0],
        location: selectedLocation.label,
        delivery_charge: selectedLocation.charge,
        subtotal,
        total,
        products: cartItems.map((item) => ({
          product_name: item.name,
          product_color: item.color,
          product_size: item.size,
          quantity: item.quantity,
          img: item.img,
          pid: item.pid,
        })),
      };

      const response = await axiosSecure.post("/send-order-email", orderData);
      if (response.data.success) {
        await axiosSecure.post("/SubmittedOrder", orderData);
        // Update SL (increment)
        await axiosSecure.patch("/OrderSL");
        // Save user info for next time
        localStorage.setItem("orderUserInfo", JSON.stringify({ name, mobile, address }));
        toast.success("All items ordered successfully!");
        setCartItems([]);
        localStorage.removeItem("cartItems");
        triggerCartUpdate();
        setOrderModalOpen(false);
      } else {
        toast.error(response.data.error || "Failed to place orders!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const updateItem = () => {
    if (!editItem) return;
    const updatedCart = cartItems.map((i) => (i.id === editItem.id ? editItem : i));
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setModalOpen(false);
    toast.success("Cart item updated!");
    triggerCartUpdate();
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems((prev) => {
          const filtered = prev.filter((item) => item.id !== id);
          localStorage.setItem("cartItems", JSON.stringify(filtered));
          triggerCartUpdate();
          toast.success("Item deleted from cart.");
          return filtered;
        });
      }
    });
  };

  return (
    <div className="w-[95%] mx-auto my-6">
      <Helmet>
        <title>10 PLUS | Cart</title>
      </Helmet>
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="flex justify-center items-center h-[80vh]">
          <p className="text-xl font-bold text-red-500">No items in cart.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr key={`${item.id}-${idx}`}>
                    <td><img src={item.img || broken} alt={item.name} className="w-16 h-16 object-cover rounded" /></td>
                    <td>{item.name}</td>
                    <td>{item.color}</td>
                    <td>{item.size}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}৳</td>
                    <td className="flex gap-2">
                      <button className="btn btn-sm btn-info" onClick={() => openEditModal(item)}>Edit</button>
                      <button className="btn btn-sm btn-error" onClick={() => confirmDelete(item.id)}>Delete</button>
                      <button className="btn btn-sm btn-success" onClick={() => openOrderModal(item)}>Order Now</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total and Checkout All */}
            <div className="flex justify-between mt-4 items-center">
              <span className="font-bold text-lg">Total: {totalPrice}৳</span>
              <button className="btn btn-primary" onClick={() => setOrderModalOpen(true)}>Checkout All</button>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="block md:hidden space-y-4">
            {cartItems.map((item, idx) => (
              <div key={idx} className="card card-side bg-gray-50 shadow-sm w-full">
                <figure className="w-1/3"><img src={item.img || broken} className="w-full h-full object-cover" /></figure>
                <div className="card-body">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Color: {item.color}</p>
                  <p>Size: {item.size}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: {item.price}৳</p>
                  <div className="flex gap-2 mt-2">
                    <button className="btn btn-xs btn-info" onClick={() => openEditModal(item)}>Edit</button>
                    <button className="btn btn-xs btn-error" onClick={() => confirmDelete(item.id)}>Delete</button>
                    <button className="btn btn-xs btn-success" onClick={() => openOrderModal(item)}>Order</button>
                  </div>
                </div>
              </div>
            ))}

            {/* Mobile Total & Checkout */}
            <div className="flex justify-between mt-4 items-center">
              <span className="font-bold text-lg">Total: {totalPrice}৳</span>
              <button className="btn btn-primary" onClick={() => setOrderModalOpen(true)}>Checkout All</button>
            </div>
          </div>
        </>
      )}

      {/* Edit Modal */}
      {modalOpen && editItem && modalType === "edit" && (
        <dialog className="modal modal-open">
          <form className="modal-box max-w-md" onSubmit={(e) => e.preventDefault()}>
            <h3 className="font-bold text-lg mb-4">Edit Item</h3>
            <img src={editItem.img || broken} alt={editItem.name} className="w-32 h-32 object-cover mx-auto rounded mb-4" />
            <div className="space-y-3">
              <label className="block">Color</label>
              <select className="select select-bordered w-full" name="color" value={editItem.color} onChange={handleEditChange}>
                {colorSize?.map((c, idx) => <option key={idx} value={c.color}>{c.color}</option>)}
              </select>
              <label className="block">Size</label>
              <select className="select select-bordered w-full" name="size" value={editItem.size} onChange={handleEditChange}>
                {colorSize.find(c => c.color === editItem.color)?.size?.map((s, idx) => <option key={idx} value={s}>{s}</option>)}
              </select>
              <label className="block">Quantity</label>
              <div className="flex items-center gap-2">
                <button type="button" className="btn btn-xs" onClick={() => setEditItem(prev => ({ ...prev, quantity: Math.max(prev.quantity - 1, 1) }))}>−</button>
                <input type="number" min="1" name="quantity" value={editItem.quantity} onChange={handleEditChange} className="border rounded w-12 text-center" />
                <button type="button" className="btn btn-xs" onClick={() => setEditItem(prev => ({ ...prev, quantity: prev.quantity + 1 }))}>+</button>
              </div>
            </div>
            <div className="modal-action">
              <button type="button" className="btn btn-primary" onClick={updateItem}>Update</button>
              <button type="button" className="btn" onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </form>
        </dialog>
      )}

      {/* Order Modal */}
      {orderModalOpen && (
        <dialog className="modal modal-open">
          <form className="modal-box max-w-lg" onSubmit={(e) => e.preventDefault()}>
            <h3 className="font-bold text-lg mb-4">Confirm Order</h3>
            {modalType === "order" && editItem && (
              <>
                <p><strong>Product:</strong> {editItem.name}</p>
                <p><strong>Color:</strong> {editItem.color}</p>
                <p><strong>Size:</strong> {editItem.size}</p>
                <p><strong>Price:</strong> {editItem.price}৳</p>
              </>
            )}
            <input type="text" name="name" autoComplete="name" placeholder="Your Name" value={userInfo.name} onChange={handleUserInfoChange} className="input input-bordered w-full my-2" />
            <input type="tel" name="mobile" autoComplete="tel" placeholder="Mobile Number" value={userInfo.mobile} onChange={handleUserInfoChange} className="input input-bordered w-full my-2" />
            <textarea name="address" autoComplete="street-address" placeholder="Address" value={userInfo.address} onChange={handleUserInfoChange} className="textarea textarea-bordered w-full my-2" />

            {/* Delivery Location */}
            <div className="my-3">
              <span className="font-semibold block mb-2" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>ডেলিভারি লোকেশন:</span>
              <div className="space-y-2">
                {deliveryOptions.map((opt) => (
                  <label key={opt.label} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      className="radio radio-error"
                      checked={selectedLocation.label === opt.label}
                      onChange={() => setSelectedLocation(opt)}
                    />
                    <span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                      {opt.label} - {opt.charge}৳
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-base-200 rounded-lg p-3 text-sm space-y-1 mb-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>
                  {modalType === "order" && editItem
                    ? Number(editItem.price) * editItem.quantity
                    : totalPrice}৳
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>ডেলিভারি চার্জ:</span>
                <span>{selectedLocation.charge}৳</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-1">
                <span>Total:</span>
                <span className="text-red-600">
                  {(modalType === "order" && editItem
                    ? Number(editItem.price) * editItem.quantity
                    : totalPrice) + selectedLocation.charge}৳
                </span>
              </div>
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={() => setOrderModalOpen(false)} disabled={loading}>Cancel</button>
              {modalType === "order" ? (
                <button type="button" className="btn btn-primary" onClick={() => confirmOrder(editItem.id)} disabled={loading}>
                  {loading && <span className="loading loading-spinner loading-sm"></span>} Confirm Order
                </button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={checkoutAll} disabled={loading}>
                  {loading && <span className="loading loading-spinner loading-sm"></span>} Checkout All
                </button>
              )}
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default CartInfo;
