import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import broken from "../../../assets/Demo images/icons8-image-96.png";
import { triggerCartUpdate } from "../../../Utils/cartHelper";
import { Helmet } from "react-helmet-async";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: "", mobile: "", address: "" });
  const [colorSize, setColorSize] = useState([]);
  const [loading, setLoading] = useState(false);

  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(cart);
  }, []);

  const openEditModal = (item) => {
    setColorSize(item?.available_color_size || []);
    setEditItem({ ...item, quantity: Number(item.quantity) });
    setModalType("edit");
    setModalOpen(true);
  };

  const openOrderModal = (item) => {
    setEditItem({ ...item, quantity: Number(item.quantity) });
    setModalType("order");
    setUserInfo({ name: "", mobile: "", address: "" });
    setOrderModalOpen(true);
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

  const removeItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        toast.success("Item removed from cart");
        triggerCartUpdate();
      }
    });
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const confirmOrder = async (id) => {
    const { name, mobile, address } = userInfo;
    if (!name || !mobile || !address) {
      toast.error("Please fill all your information.");
      return;
    }

    const orderData = {
      username: name,
      user_contact_number: mobile,
      user_address: address,
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

    try {
      setLoading(true);
      const response = await axiosSecure.post("/send-order-email", orderData);

      if (response.data.success) {
        Swal.fire("Success", "Order placed successfully!", "success");
        const filtered = cartItems.filter((item) => item.id !== id);
        setCartItems(filtered);
        localStorage.setItem("cartItems", JSON.stringify(filtered));
        triggerCartUpdate();
        setOrderModalOpen(false);
      } else {
        Swal.fire("Error", response.data.error || "Failed to place order", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <div className="p-6 md:p-12">
      <Helmet>
        <title>10 PLUS | Cart</title>
      </Helmet>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">My Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row justify-between items-center p-4 border rounded-md shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img src={item.img || broken} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500 text-sm">
                    Color: {item.color}, Size: {item.size}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <p className="font-bold text-lg">{item.price}৳</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => openEditModal(item)}>Edit</button>
                  <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => removeItem(item.id)}>Remove</button>
                  <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => openOrderModal(item)}>
                    {loading && <span className="loading loading-spinner loading-sm"></span>} Order
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 text-right font-bold text-xl">
            Total: {totalPrice}৳
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {modalOpen && editItem && modalType === "edit" && (
        <dialog className="modal modal-open">
          <form className="modal-box max-w-md" onSubmit={(e) => e.preventDefault()}>
            <h3 className="font-bold text-lg mb-4">Edit Item</h3>
            <img src={editItem.img || broken} alt={editItem.name} className="w-32 h-32 object-cover mx-auto rounded mb-4"/>
            <label className="block mb-1">Color</label>
            <select className="select select-bordered w-full mb-2" name="color" value={editItem.color} onChange={handleEditChange}>
              {colorSize?.map((c, idx) => <option key={idx} value={c.color}>{c.color}</option>)}
            </select>
            <label className="block mb-1">Size</label>
            <select className="select select-bordered w-full mb-2" name="size" value={editItem.size} onChange={handleEditChange}>
              {colorSize.find(c => c.color === editItem.color)?.size?.map((s, idx) => <option key={idx} value={s}>{s}</option>)}
            </select>
            <label className="block mb-1">Quantity</label>
            <div className="flex items-center gap-2 mb-4">
              <button type="button" className="btn btn-xs" onClick={() => setEditItem(prev => ({ ...prev, quantity: Math.max(prev.quantity - 1, 1) }))}>−</button>
              <input type="number" min="1" name="quantity" value={editItem.quantity} onChange={handleEditChange} className="border rounded w-12 text-center"/>
              <button type="button" className="btn btn-xs" onClick={() => setEditItem(prev => ({ ...prev, quantity: prev.quantity + 1 }))}>+</button>
            </div>
            <div className="modal-action">
              <button type="button" className="btn btn-primary" onClick={updateItem}>Update</button>
              <button type="button" className="btn" onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </form>
        </dialog>
      )}

      {/* Order Modal */}
      {orderModalOpen && editItem && modalType === "order" && (
        <dialog className="modal modal-open">
          <form className="modal-box max-w-lg" onSubmit={(e) => e.preventDefault()}>
            <h3 className="font-bold text-lg mb-4">Confirm Order</h3>
            <p><strong>Product:</strong> {editItem.name}</p>
            <p><strong>Color:</strong> {editItem.color}</p>
            <p><strong>Size:</strong> {editItem.size}</p>
            <p><strong>Price:</strong> {editItem.price}৳</p>
            <input type="text" name="name" placeholder="Your Name" value={userInfo.name} onChange={handleUserInfoChange} className="input input-bordered w-full my-2"/>
            <input type="tel" name="mobile" placeholder="Mobile Number" value={userInfo.mobile} onChange={handleUserInfoChange} className="input input-bordered w-full my-2"/>
            <textarea name="address" placeholder="Address" value={userInfo.address} onChange={handleUserInfoChange} className="textarea textarea-bordered w-full my-2"/>
            <div className="modal-action">
              <button type="button" className="btn" onClick={() => setOrderModalOpen(false)} disabled={loading}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={() => confirmOrder(editItem.id)} disabled={loading}>
                {loading && <span className="loading loading-spinner loading-sm"></span>} Confirm Order
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default CartPage;
