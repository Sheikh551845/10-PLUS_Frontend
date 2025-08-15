import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import img from "../../assets/Demo images/Size suggestion.jpg";
import ProductBanner from "./product_banner";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const Product_details = () => {

  const single = useLoaderData()
  console.log(single)
  const details = single ? single.details : null;
  const color_size = details?.available_color_size || [];

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'cart' or 'buy'

  const [userInfo, setUserInfo] = useState({
    name: "",
    mobile: "",
    address: "",
  });

  // Quantity handler
  const handleQuantity = (type) => {
    if (type === "minus" && quantity > 1) {
      setQuantity(quantity - 1);
    }
    if (type === "plus") {
      setQuantity(quantity + 1);
    }
  };

  const handleColorSelect = (selectedColor) => setColor(selectedColor);
  const handleSizeSelect = (selectedSize) => setSize(selectedSize);

  const openModal = (type) => {
    if (!color || !size) {
      toast.error("Please select color and size.");
      return;
    }
    setModalType(type);
    setIsModalOpen(true);
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const newQuantity = Number(quantity);
    
    // Check if same product with same color and size exists
    const existingIndex = cart.findIndex(
      (item) =>
        item.id === single.id &&
        item.color === color &&
        item.size === size
    );

    if (existingIndex > -1) {
      // Update existing quantity (ensure Number)
      cart[existingIndex].quantity =
        Number(cart[existingIndex].quantity) + newQuantity;
    } else {
      // Add new item
      cart.push({
        id: single.id,
        name: single.Name,
        color,
        size,
        quantity: newQuantity,
        price: single.Offer === "true" ? details.Offer_price : single.Price,
        img: single.Show_photo,
        available_color_size:color_size
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    toast.success("Added to cart!");
    setIsModalOpen(false);

    // Dispatch event to update cart count in Navbar
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleUserInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const buyNowConfirm = () => {
    if (!userInfo.name || !userInfo.mobile || !userInfo.address) {
      toast.error("Please fill all your information.");
      return;
    }

    const emailBody = `
      Order Details:
      Product: ${single.Name}
      Color: ${color}
      Size: ${size}
      Quantity: ${quantity}
      Price: ${single.Offer === "true" ? details.Offer_price : single.Price}
      
      Customer Info:
      Name: ${userInfo.name}
      Mobile: ${userInfo.mobile}
      Address: ${userInfo.address}
    `;

    console.log(
      "Sending order email to sheikh551845@gmail.com with content:\n",
      emailBody
    );

    toast.success("Order confirmed! Check your email.");
    setIsModalOpen(false);
    setUserInfo({ name: "", mobile: "", address: "" });
  };

  return (
    <div>
      <Helmet>
        <title>10 PLUS | Product Details</title>
      </Helmet>

      {/* Toast container */}
      {/* Add this in your root component or here if you want */}
      {/* <Toaster position="top-right" /> */}

      <ProductBanner product={details} />

      <div className="w-[90%] mx-auto mt-5">
        <div className="bg-[rgba(185,28,28,0.7)] backdrop-blur-sm bg-opacity-30 text-white p-3 md:p-5 rounded-xl md:rounded-2xl">
          <p className="text-base md:text-xl font-bold">{single.Name}</p>
          <div className="flex gap-2 mt-1 md:mt-5">
            <p className="text-base md:text-xl font-bold ">Price:</p>
            <p>
              {single.Offer === "true" ? (
                <>
                  <span className="line-through">{single.Price}৳</span>{" "}
                  <span className="ml-2 text-green-400 text-lg md:text-2xl">
                    {details.Offer_price}৳
                  </span>
                </>
              ) : (
                <span>{single.Price}৳</span>
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
          <div className="order-2 md:order-1 pt-5 ">
            <p className="text-base md:text-xl font-bold">Available color & size:-</p>

            {color_size.map(({ color: c, size: sizes }) => (
              <div key={c} className="mt-3">
                <p className="text-sm md:text-base font-bold">{c} :</p>
                {sizes.map((s) => (
                  <button
                    key={s}
                    className={`btn w-10 h-8 md:w-12 md:h-10 text-sm md:text-base mr-2 mb-2 ${
                      color === c && size === s ? "bg-red-600 text-white" : ""
                    }`}
                    onClick={() => {
                      handleColorSelect(c);
                      handleSizeSelect(s);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            ))}

            <div className="mt-3 text-base md:text-xl font-bold flex justify-between items-center">
              <div>
                <p>Quantity:</p>
                <button
                  className="btn btn-sm btn-outline w-6 h-6 mr-2"
                  onClick={() => handleQuantity("minus")}
                >
                  -
                </button>
                <input
                  className="w-12 h-6 text-center border rounded"
                  value={quantity}
                  readOnly
                />
                <button
                  className="btn btn-sm btn-outline w-6 h-6 ml-2"
                  onClick={() => handleQuantity("plus")}
                >
                  +
                </button>
              </div>

              <div className="mr-2 md:mr-10">
                <button
                  className="btn btn-neutral btn-sm md:btn-md"
                  onClick={() => openModal("cart")}
                >
                  Add To Cart
                </button>
                <button
                  className="btn btn-success animate-btn ml-2 md:ml-4 btn-sm md:btn-md"
                  onClick={() => openModal("buy")}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 ">
            <img src={img} alt="" className="w-[100%] h-[100%] mx-auto" />
          </div>
        </div>

        {/* description */}
        <div className="mt-5">
          <p className="text-base md:text-xl font-bold mb-2 md:mb-5">Description:</p>

          <div className="grid grid-cols-2 w-60">
            <div>
              <p className="text-sm md:text-base font-bold ">Material:</p>
              <p className="text-sm md:text-base font-bold pt-2">GSM: </p>
              <p className="text-sm md:text-base font-bold pt-2">Fit: </p>
              <p className="text-sm md:text-base font-bold pt-2">Instruction: </p>
            </div>
            <div>
              <p className="text-sm md:text-base ">{details?.description.Material}</p>
              <p className="text-sm md:text-base pt-2 ">{details?.description.GSM}</p>
              <p className="text-sm md:text-base pt-2 ">{details?.description.Fit}</p>
              <p className="text-sm md:text-base pt-2 ">
                {details?.description.Care_instructions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog
          id="product_modal"
          className="modal modal-open" // "modal-open" makes it visible
          onCancel={() => setIsModalOpen(false)} // closes on ESC or outside click
        >
          <form
            method="dialog"
            className="modal-box max-w-lg relative"
            onSubmit={(e) => e.preventDefault()} // prevent form submit refresh
          >
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>

            <h3 className="font-bold text-lg mb-4">
              {modalType === "cart" ? "Confirm Add To Cart" : "Confirm Buy Now"}
            </h3>

            <div className="space-y-3 mb-4">
              <p>
                <strong>Product:</strong> {single.Name}
              </p>
              <p className="flex items-center gap-2">
                <strong>Color:</strong>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="select select-bordered w-full ml-2"
                >
                  {color_size.map(({ color: c }) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </p>
              <p className="flex items-center gap-2">
                <strong>Size:</strong>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="select select-bordered ml-2"
                >
                  {color_size
                    .find(({ color: c }) => c === color)
                    ?.size.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                </select>
              </p>
              <p className="flex items-center gap-2">
                <strong>Quantity:</strong>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="input input-bordered w-20 ml-2"
                />
              </p>
            </div>

            {modalType === "buy" && (
              <>
                <hr className="mb-4" />
                <div className="space-y-4">
                  <p className="font-bold mb-2">Your Information</p>
                  <label className="block">
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={userInfo.name}
                      onChange={handleUserInfoChange}
                      className="input input-bordered w-full mt-1"
                    />
                  </label>
                  <label className="block">
                    Mobile Number:
                    <input
                      type="tel"
                      name="mobile"
                      value={userInfo.mobile}
                      onChange={handleUserInfoChange}
                      className="input input-bordered w-full mt-1"
                    />
                  </label>
                  <label className="block">
                    Address:
                    <textarea
                      name="address"
                      value={userInfo.address}
                      onChange={handleUserInfoChange}
                      className="textarea textarea-bordered w-full mt-1"
                      rows={3}
                    />
                  </label>
                </div>
              </>
            )}

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-neutral"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={modalType === "cart" ? addToCart : buyNowConfirm}
              >
                Confirm
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default Product_details;
