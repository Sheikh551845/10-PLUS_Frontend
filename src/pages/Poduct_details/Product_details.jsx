import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import img from "../../assets/Demo images/Size suggestion.jpg";
import ProductBanner from "./product_banner";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Section_Title from "../../Components/Section_Title";
import CardSweper from "../../Components/CardSweper";

const Product_details = () => {
  const single = useLoaderData();
  const details = single ? single.details : null;
  const color_size = details?.available_color_size || [];

  const axiosSecure = UseAxiosSecure();

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'cart' or 'buy'
  const [loading, setLoading] = useState(false); // spinner state



  //similier product
  const { data: similier = [] } = useQuery({
    queryKey: ['similier'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/Category/${single.Category}`);
      const same = res.data;

      // Filter items with Price greater than single.Price
      const filtered = same?.filter(item => {
        const itemPrice = parseInt(item.Price);
        const singlePrice = parseInt(single.Price);
        return !isNaN(itemPrice) && !isNaN(singlePrice) && itemPrice > singlePrice;
      }) || [];

      // Return top 10 or fallback to original data
      if (filtered.length > 10) {
        return filtered.slice(0, 10);
      } else if (filtered.length === 0) {
        return same.slice(0, 10);
      } else {
        return filtered;
      }

    }
  });

console.log(similier)

  const [userInfo, setUserInfo] = useState({
    name: "",
    mobile: "",
    address: "",
  });

  const handleQuantity = (type) => {
    if (type === "minus" && quantity > 1) setQuantity(quantity - 1);
    if (type === "plus") setQuantity(quantity + 1);
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

    const existingIndex = cart.findIndex(
      (item) => item.id === single.id && item.color === color && item.size === size
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += newQuantity;
    } else {
      cart.push({
        pid: single.pid,
        name: single.Name,
        color,
        size,
        quantity: newQuantity,
        price: single.Offer === "true" ? details.Offer_price : single.Price,
        img: single.Show_photo,
        available_color_size: color_size,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    toast.success("Added to cart!");
    setIsModalOpen(false);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleUserInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const buyNowConfirm = async () => {
    if (!userInfo.name || !userInfo.mobile || !userInfo.address) {
      toast.error("Please fill all your information.");
      return;
    }

    const orderData = {
      username: userInfo.name,
      user_contact_number: userInfo.mobile,
      user_address: userInfo.address,
      products: [
        {
          product_name: single.Name,
          product_color: color,
          product_size: size,
          quantity,
          pid: single.pid,
          img: single.Show_photo,
        },
      ],
    };


  };

  return (
    <div>
      <Helmet>
        <title>10 PLUS | Product Details</title>
      </Helmet>

      <ProductBanner product={details} />

      <div className="w-[90%] mx-auto mt-5">
        {/* Product Info */}
        <div className="bg-[rgba(185,28,28,0.7)] backdrop-blur-sm text-white p-3 md:p-5 rounded-xl md:rounded-2xl">
          <p className="text-base md:text-xl font-bold">{single.Name}</p>
          <div className="flex gap-2 mt-1 md:mt-5">
            <p className="text-base md:text-xl font-bold">Price:</p>
            <p>
              {single.Offer === "true" ? (
                <>
                  <span className="line-through ">{single.Price}<span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>৳</span></span>{" "}
                  <span className="ml-2 text-green-400 text-lg md:text-2xl">
                    {details.Offer_price}<span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>৳</span>
                  </span>
                </>
              ) : (
                <span>{single.Price}<span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>৳</span></span>
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
          {/* Left */}
          <div className="order-2 md:order-1">
            <p className="text-base md:text-xl font-bold mb-2">
              Available color & size:
            </p>

            {color_size.map(({ color: c, size: sizes }) => (
              <div key={c} className="mt-2">
                <p className="text-sm md:text-base font-bold">{c}:</p>
                {sizes.map((s) => (
                  <button
                    key={s}
                    className={`btn w-10 h-8 md:w-12 md:h-10 text-sm md:text-base mr-2 mb-2 ${color === c && size === s ? "bg-red-600 text-white" : ""
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

            {/* Quantity */}
            <div className="mt-4 flex items-center gap-2">
              <p className="font-bold mr-2">Quantity:</p>
              <button
                className="btn btn-xs"
                onClick={() => handleQuantity("minus")}
              >
                -
              </button>
              <input
                type="number"
                className="border-1 rounded-lg w-10 text-center"
                value={quantity}
                readOnly
              />
              <button
                className="btn btn-xs"
                onClick={() => handleQuantity("plus")}
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-3">
              <button
                className="btn btn-neutral"
                onClick={() => openModal("cart")}
              >
                Add To Cart
              </button>
              <button
                className="btn btn-success"
                onClick={() => openModal("buy")}
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Right */}

          {
            single?.Category == "Trouser" ? <div className="order-1 md:order-2">
              <img src="https://sunnahsquarebd.com/wp-content/uploads/2024/09/trouser-2_1.avif" alt="" className="w-full h-auto" />
            </div> :

              single?.Category == "Polo Shirt" ? <div className="order-1 md:order-2">
                <img src="https://sunnahsquarebd.com/wp-content/uploads/2025/02/polo_1.jpg" alt="" className="w-full h-auto" />
              </div> :

                single?.Category == "Shirt" ? <div className="order-1 md:order-2">
                  <img src="https://sunnahsquarebd.com/wp-content/uploads/2025/05/cuban-shirt-size-guide.jpg" alt="" className="w-full h-auto" />
                </div> :

                  single?.Category == "T-Shirt" ? <div className="order-1 md:order-2">
                    <img src="https://sunnahsquarebd.com/wp-content/uploads/2025/04/T-shirt-Size-Chart-1.jpg" alt="" className="w-full h-auto" />
                  </div> :

                    single?.Category == "Panjabi" ? <div className="order-1 md:order-2">
                      <img src="https://sunnahsquarebd.com/wp-content/uploads/2025/04/T-shirt-Size-Chart-1.jpg" alt="" className="w-full h-auto" />
                    </div> : <div className="order-1 md:order-2">
                      <img src="https://sunnahsquarebd.com/wp-content/uploads/2025/04/T-shirt-Size-Chart-1.jpg" alt="" className="w-full h-auto" />
                    </div>

                                   
          }

        </div>

        {/* Description */}
        <div className="mt-6">
          <p className="text-lg font-bold mb-2">Description:</p>
          <table className="table-auto border-collapse border border-gray-300 w-[60vw] text-sm md:text-base ">
            <tbody>
              <tr>
                <th className="border px-2 py-1 text-left font-bold">Material:</th>
                <td className="border px-2 py-1">{details?.description.Material}</td>
              </tr>
              <tr>
                <th className="border px-2 py-1 text-left font-bold">GSM:</th>
                <td className="border px-2 py-1">{details?.description.GSM}</td>
              </tr>
              <tr>
                <th className="border px-2 py-1 text-left font-bold">Fit:</th>
                <td className="border px-2 py-1">{details?.description.Fit}</td>
              </tr>
              <tr>
                <th className="border px-2 py-1 text-left font-bold">Instruction:</th>
                <td className="border px-2 py-1">{details?.description.Care_instructions}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

      {/* similer Products */}
      <div className='w-[95%] mx-auto  min-h-fit'>
        {similier.length > 0 ? <div><Section_Title Title={"Similer Products"} />
          <CardSweper products={similier}></CardSweper>
        </div> : <></>}


      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog className="modal modal-open" onCancel={() => setIsModalOpen(false)}>
          <form
            method="dialog"
            className="modal-box max-w-lg relative space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg mb-2">
              {modalType === "cart" ? "Confirm Add To Cart" : "Confirm Buy Now"}
            </h3>

            <div className="space-y-3">
              {/* Color */}
              <label className="flex flex-col">
                <span className="font-semibold">Color:</span>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="select select-bordered w-full"
                >
                  {color_size.map(({ color: c }) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              {/* Size */}
              <label className="flex flex-col">
                <span className="font-semibold">Size:</span>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="select select-bordered w-full"
                >
                  {color_size
                    .find(({ color: c }) => c === color)
                    ?.size.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                </select>
              </label>

              {/* Quantity in modal */}
              <label className="flex flex-col">
                <span className="font-semibold mb-1">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-xs"
                    onClick={() => handleQuantity("minus")}
                  >
                    -
                  </button>
                  <input
                    className="border-1 rounded-lg w-10 text-center"
                    type="number"
                    min={1}
                    value={quantity}
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn-xs"
                    onClick={() => handleQuantity("plus")}
                  >
                    +
                  </button>
                </div>
              </label>
            </div>

            {modalType === "buy" && (
              <>
                <hr className="my-4" />
                <div className="space-y-3">
                  <label className="flex flex-col">
                    <span className="font-semibold">Name:</span>
                    <input
                      type="text"
                      name="name"
                      value={userInfo.name}
                      onChange={handleUserInfoChange}
                      className="input input-bordered w-full"
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="font-semibold">Mobile Number:</span>
                    <input
                      type="tel"
                      name="mobile"
                      value={userInfo.mobile}
                      onChange={handleUserInfoChange}
                      className="input input-bordered w-full"
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="font-semibold">Address:</span>
                    <textarea
                      name="address"
                      value={userInfo.address}
                      onChange={handleUserInfoChange}
                      className="textarea textarea-bordered w-full"
                      rows={3}
                    />
                  </label>
                </div>
              </>
            )}

            <div className="modal-action flex justify-end gap-2">
              <button
                type="button"
                className="btn btn-neutral"
                onClick={() => setIsModalOpen(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`btn btn-primary ${loading ? "btn-disabled" : ""}`}
                onClick={modalType === "cart" ? addToCart : buyNowConfirm}
                disabled={loading}
              >
                {loading && (
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                )}
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
