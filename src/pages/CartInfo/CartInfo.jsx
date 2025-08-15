import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import broken from "../../assets/Demo images/icons8-image-96.png";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure"; // make sure this hook exists

const CartInfo = () => {
  const [cartItems, setCartItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "edit" or "order"
  const [userInfo, setUserInfo] = useState({ name: "", mobile: "", address: "" });
  const [colorSize, setColorSize] = useState([]);
  const [loading, setLoading] = useState(false); // spinner state

  const axiosSecure = UseAxiosSecure(); // axios instance

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  // Open Edit Modal
  const openEditModal = (item) => {
    setColorSize(item?.available_color_size);
    setEditItem({ ...item, quantity: Number(item.quantity) });
    setModalType("edit");
    setModalOpen(true);
  };

  // Open Order Modal
  const openOrderModal = (item) => {
    setEditItem({ ...item, quantity: Number(item.quantity) });
    setModalType("order");
    setUserInfo({ name: "", mobile: "", address: "" });
    setOrderModalOpen(true);
  };

  // Handle user info change in Order modal
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Confirm Order Now
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
        toast.success("Order has been Placed");
        setCartItems((prevCartItems) => {
          const filtered = prevCartItems.filter((item) => item.id !== id);
          localStorage.setItem("cartItems", JSON.stringify(filtered));
          return filtered;
        });
        setOrderModalOpen(false);
      } else {
        toast.error("Failed to Place the order!");
        console.error(response.data.error);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle changes in edit modal inputs
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  // Update cart item (from Edit modal)
  const updateItem = () => {
    if (!editItem) return;
    const updatedItem = { ...editItem, quantity: Number(editItem.quantity) };

    const updatedCart = cartItems.map((i) =>
      i.id === updatedItem.id ? updatedItem : i
    );

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setModalOpen(false);
    toast.success("Cart item updated!");
  };

  // Delete confirmation with SweetAlert2
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
        setCartItems((prevCartItems) => {
          const filtered = prevCartItems.filter((item) => item.id !== id);
          localStorage.setItem("cartItems", JSON.stringify(filtered));
          toast.success("Item deleted from cart.");
          return filtered;
        });
      }
    });
  };

  return (
    <div className="w-[95%] mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="flex justify-center items-center h-[80vh]">
          <p className="text-xl font-bold text-red-500">No items in cart.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="hidden md:block">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th className="text-xs md:text-base w-[8%]">Photo</th>
                  <th className="text-xs md:text-base w-[17%]">Name</th>
                  <th className="text-xs md:text-base w-[5%]" align="center">
                    Color
                  </th>
                  <th className="text-xs md:text-base w-[5%]" align="center">
                    Size
                  </th>
                  <th className="text-xs md:text-base w-[5%]" align="center">
                    Quantity
                  </th>
                  <th className="text-xs md:text-base w-[5%]" align="center">
                    Price
                  </th>
                  <th className="text-xs md:text-base w-[45%]" align="center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr key={`${item.id}-${item.color}-${item.size}-${idx}`}>
                    <td className="w-24">
                      <img
                        src={item.img || broken}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="text-xs md:text-base">{item.name}</td>
                    <td className="text-xs md:text-base">{item.color}</td>
                    <td className="text-xs md:text-base">{item.size}</td>
                    <td className="text-xs md:text-base">{item.quantity}</td>
                    <td className="text-xs md:text-base">{item.price}৳</td>
                    <td className="flex gap-2 w-fit mx-auto" align="middle">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => openEditModal(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => confirmDelete(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-sm btn-success flex items-center gap-2"
                        onClick={() => openOrderModal(item)}
                        disabled={loading}
                      >
                        {loading && <span className="loading loading-spinner loading-sm"></span>}
                        Order Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="block md:hidden">
            {cartItems.map((item, idx) => (
              <div
                className="card card-side bg-base-100 shadow-sm max-h-48 w-full mb-4"
                key={idx}
              >
                <figure className="w-[40%] h-48">
                  <img
                    className="w-full h-48 object-cover"
                    src={item.img || broken}
                    alt="Photo"
                  />
                </figure>
                <div className="card-body max-h-fit">
                  <h2>{item.name}</h2>
                  <div className="text-left">
                    <p>
                      <span className="font-bold">Quantity: </span>
                      {item.quantity}
                    </p>
                    <p>
                      <span className="font-bold">Color: </span>
                      {item.color}
                    </p>
                    <p>
                      <span className="font-bold">Price: </span>
                      {item.price}৳
                    </p>
                  </div>
                  <div className="flex gap-1 w-full flex-wrap mx-auto">
                    <button
                      className="text-xs btn btn-xs btn-info"
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xs btn btn-xs btn-error"
                      onClick={() => confirmDelete(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-xs btn btn-xs btn-success flex items-center gap-1"
                      onClick={() => openOrderModal(item)}
                      disabled={loading}
                    >
                      {loading && <span className="loading loading-spinner loading-xs"></span>}
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {modalOpen && editItem && modalType === "edit" && (
        <dialog id="edit_modal" className="modal modal-open">
          <form
            method="dialog"
            className="modal-box max-w-md"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="font-bold text-lg mb-4">Edit Item</h3>

            <img
              src={editItem.img || broken}
              alt={editItem.name}
              className="w-32 h-32 object-cover mx-auto rounded mb-4"
            />

            <div className="space-y-3">
              {/* Name */}
              <div>
                <label className="block font-semibold">Name</label>
                <input
                  type="text"
                  value={editItem.name}
                  className="input input-bordered w-full"
                  disabled
                />
              </div>

              {/* Color */}
              <div>
                <label className="block font-semibold">Color</label>
                <select
                  name="color"
                  onChange={handleEditChange}
                  className="select select-bordered w-full"
                  value={editItem.color}
                >
                  {colorSize?.map((p, idx) => (
                    <option key={idx} value={p.color}>
                      {p.color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div>
                <label className="block font-semibold">Size</label>
                <select
                  name="size"
                  onChange={handleEditChange}
                  className="select select-bordered w-full"
                  value={editItem.size}
                >
                  {colorSize
                    ?.find((c) => c.color === editItem.color)
                    ?.size?.map((s, idx) => (
                      <option key={idx} value={s}>
                        {s}
                      </option>
                    ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block font-semibold">Quantity</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-xs"
                    onClick={() =>
                      setEditItem((prev) => ({
                        ...prev,
                        quantity: prev.quantity > 1 ? prev.quantity - 1 : 1,
                      }))
                    }
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    name="quantity"
                    value={editItem.quantity}
                    onChange={handleEditChange}
                    className="border-1 rounded-lg w-10 text-center"
                  />
                  <button
                    type="button"
                    className="btn btn-xs"
                    onClick={() =>
                      setEditItem((prev) => ({
                        ...prev,
                        quantity: prev.quantity + 1,
                      }))
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block font-semibold">Price</label>
                <input
                  type="text"
                  name="price"
                  value={editItem.price}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                  disabled
                />
              </div>
            </div>

            <div className="modal-action">
              <button type="button" className="btn btn-primary" onClick={updateItem}>
                Update
              </button>
              <button type="button" className="btn" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      )}

      {/* Order Modal */}
      {orderModalOpen && editItem && modalType === "order" && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-4">Confirm Buy Now</h3>

            <p>
              <strong>Product:</strong> {editItem.name}
            </p>
            <p>
              <strong>Color:</strong> {editItem.color}
            </p>
            <p>
              <strong>Size:</strong> {editItem.size}
            </p>
            <p>
              <strong>Price:</strong> {editItem.price}
              <span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>৳</span>
            </p>

            {/* User Info */}
            <div className="mt-4 space-y-2">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={userInfo.name}
                onChange={handleUserInfoChange}
                className="input input-bordered w-full"
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={userInfo.mobile}
                onChange={handleUserInfoChange}
                className="input input-bordered w-full"
              />
              <textarea
                name="address"
                placeholder="Address"
                value={userInfo.address}
                onChange={handleUserInfoChange}
                className="textarea textarea-bordered w-full"
              />
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setOrderModalOpen(false)} disabled={loading}>
                Cancel
              </button>
              <button
                className="btn btn-primary flex items-center gap-2"
                onClick={() => confirmOrder(editItem.id)}
                disabled={loading}
              >
                {loading && <span className="loading loading-spinner loading-sm"></span>}
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartInfo;
