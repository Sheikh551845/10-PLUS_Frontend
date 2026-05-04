import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductBanner from "./product_banner";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import UseAxiosSecure, { axiosSecure } from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Section_Title from "../../Components/Section_Title";
import CardSweper from "../../Components/CardSweper";
import { AuthContext } from "../../AuthPorvider";
import { FadeLoader } from "react-spinners";

const BASE_URL = axiosSecure.defaults.baseURL;

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
  const [orderLoading, setOderLoading] = useState(false); // spinner state

  const deliveryOptions = [
    { label: "ঢাকা মেট্রো সিটি", charge: 60 },
    { label: "ঢাকা জেলা", charge: 80 },
    { label: "ঢাকা জেলার বাইরে", charge: 110 },
  ];
  const [selectedLocation, setSelectedLocation] = useState(deliveryOptions[0]);

  const { loading: load, user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);


  useEffect(() => {
    if (single) {
      setData(single);
      setIsFetching(false);
    } else {
      // Server down or safeFetch returned null
      setData([]);
      setIsFetching(false);
    }
  }, [single]);

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



  const savedUserInfo = JSON.parse(localStorage.getItem("orderUserInfo")) || {};
  const [userInfo, setUserInfo] = useState({
    name: savedUserInfo.name || "",
    mobile: savedUserInfo.mobile || "",
    address: savedUserInfo.address || "",
  });

  const handleQuantity = (type) => {
    if (type === "minus" && quantity > 1) setQuantity(quantity - 1);
    if (type === "plus") setQuantity(quantity + 1);
  };

  const handleColorSelect = (selectedColor) => setColor(selectedColor);
  const handleSizeSelect = (selectedSize) => setSize(selectedSize);

  const openModal = (type) => {
    if (!size) {
      toast.error("Please select size.");
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
        id: single._id,
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
    const { name, value } = e.target;
    if (name === "mobile") {
      const val = value.replace(/[^0-9+]/g, "");
      const maxLength = val.startsWith("+") ? 14 : 11;
      setUserInfo({ ...userInfo, [name]: val.slice(0, maxLength) });
    } else {
      setUserInfo({ ...userInfo, [name]: value });
    }
  };

  const generateOrderId = () => {
    const timestamp = Date.now(); // current time in milliseconds
    const randomNum = Math.floor(Math.random() * 1000); // random number 0-999
    return `ORD-${timestamp}-${randomNum}`;
  }

  const buyNowConfirm = async () => {
    if (!userInfo.name || !userInfo.mobile || !userInfo.address) {
      toast.error("Please fill all your information.");
      return;
    }

    const bdPhoneRegex = /^(?:\+88)?01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(userInfo.mobile)) {
      toast.error("Please enter a valid Bangladeshi mobile number.");
      return;
    }

    try {
      setOderLoading(true);

      // Fetch current SL
      const slRes = await axiosSecure.get("/OrderSL");
      const currentSl = slRes.data;
      console.log(currentSl)

      const unitPrice = single.Offer === "true" ? Number(details.Offer_price) : Number(single.Price);
      const subtotal = unitPrice * quantity;
      const total = subtotal + selectedLocation.charge;

      const orderData = {
        sl: currentSl || "",
        orderId: generateOrderId(),
        username: userInfo.name,
        usermail: user?.email || '',
        status: "pending",
        user_contact_number: userInfo.mobile,
        user_address: userInfo.address,
        order_on: new Date().toISOString().split("T")[0],
        location: selectedLocation.label,
        delivery_charge: selectedLocation.charge,
        subtotal,
        total,
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

      const response = await axiosSecure.post("/send-order-email", orderData);
      if (response.data.success) {
        await axiosSecure.post("/SubmittedOrder", orderData);
        // Update SL (increment)
        await axiosSecure.patch("/OrderSL");
        // Save user info for next time
        localStorage.setItem("orderUserInfo", JSON.stringify(userInfo));
        toast.success("Order has been Placed");
      } else {
        toast.error("Failed to Place the order!");
        console.error(response.data.error);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setOderLoading(false);
      setIsModalOpen(false)
    }
  };

  if (loading || isFetching) {
    return <div className="flex justify-center items-center h-[80vh]">
      <FadeLoader color="rgba(185,28,28,0.7)" size={15} />
    </div>
  }

  return (
    <div>
      <Helmet>
        <title>10 PLUS | Product Details</title>
      </Helmet>

      <div className=" grid grid-cols-1 md:grid-cols-2 min-h-[95vh] md:ml-5">
        <div>
          <ProductBanner product={single} />
        </div>

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
                  <span className="text-base md:text-xl">{single.Price}<span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>৳</span></span>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-col-reverse gap-3 mt-5">
            {/* Left */}
            <div className="order-2 md:order-1">
              <p className="text-base md:text-xl font-bold mb-2">
                {color_size[0].color ? "Available color & size:" : "Available size:"}
              </p>

              {color_size.map(({ color: c, size: sizes }) => (
                <div key={c} className="mt-2">
                  <p className="text-sm md:text-base font-bold">{c}</p>
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
                  className="btn btn-xs  md:btn-md"
                  onClick={() => handleQuantity("minus")}
                >
                  -
                </button>
                <input
                  type="number"
                  className="border-1 rounded-lg w-10 md:w-16 md:h-9 text-center"
                  value={quantity}
                  readOnly
                />
                <button
                  className="btn btn-xs md:btn-md"
                  onClick={() => handleQuantity("plus")}
                >
                  +
                </button>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex gap-3">
                <button
                  className="btn btn-neutral btn-md md:btn-xl"
                  onClick={() => openModal("cart")}
                >
                  Add To Cart
                </button>
                <button
                  className="btn btn-success btn-md md:btn-xl"
                  onClick={() => openModal("buy")}
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Right */}

            {
              single?.Category == "Trouser" ? <div className="order-1 md:order-2">
                <img src={`${BASE_URL}/images/touser_size.webp`} alt="" className="w-full h-auto" />
              </div> :

                single?.Category == "Polo" ? <div className="order-1 md:order-2">
                  <img src={`${BASE_URL}/images/old_money_size.webp`} alt="" className="w-full h-auto" />
                </div> :

                  single?.Category == "Shirt" ? <div className="order-1 md:order-2">
                    <img src={`${BASE_URL}/images/old_money_size.webp`} alt="" className="w-full h-auto" />
                  </div> :

                    single?.Category == "T-Shirt" ? <div className="order-1 md:order-2">
                      <img src={`${BASE_URL}/images/t-shirt_size.jpg`} alt="" className="w-full h-auto" />
                    </div> :

                      single?.Category == "Panjabi" ? <div className="order-1 md:order-2">
                        <img src={`${BASE_URL}/images/panjabi_size.webp`} alt="" className="w-full h-auto" />
                      </div> :

                        single?.Category == "Jersey" ? <div className="order-1 md:order-2">
                          <img src={`${BASE_URL}/images/t-shirt_size.jpg`} alt="" className="w-full h-auto" />
                        </div> : <div className="order-1 md:order-2">
                          <img src={`${BASE_URL}/images/t-shirt_size.jpg`} alt="" className="w-full h-auto" />
                        </div>


            }

          </div>


        </div>
      </div>




      {/* Description */}
      <div className="mt-5 w-[90%] mx-auto md:ml-5">
        <p className="text-lg font-bold mb-2">Description:</p>
        <div className="bg-[rgba(255,208,208,0.7)] p-4 rounded-lg text-sm md:text-base whitespace-pre-line">
          {details?.description ? (
            <p>{details.description}</p>
          ) : (
            <p className="text-gray-500">No description available.</p>
          )}
        </div>
      </div>


      {/* similer Products */}

      <div className='w-[94%] mx-auto  min-h-fit'>
        {similier.length > 0 ? <div><Section_Title Title={"New Arrival"} />
          <CardSweper key={similier[0]._id} products={similier}></CardSweper>
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
              {color_size[0].color && (
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
              )}

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
                      autoComplete="name"
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
                      autoComplete="tel"
                      value={userInfo.mobile}
                      onChange={handleUserInfoChange}
                      className="input input-bordered w-full"
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="font-semibold">Address:</span>
                    <textarea
                      name="address"
                      autoComplete="street-address"
                      value={userInfo.address}
                      onChange={handleUserInfoChange}
                      className="textarea textarea-bordered w-full"
                      rows={3}
                    />
                  </label>

                  {/* Delivery Location */}
                  <div>
                    <span className="font-semibold block mb-1" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>ডেলিভারি লোকেশন:</span>
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
                  <div className="bg-base-200 rounded-lg p-3 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal ({quantity} item{quantity > 1 ? 's' : ''}):</span>
                      <span>{(single.Offer === "true" ? Number(details.Offer_price) : Number(single.Price)) * quantity}৳</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>ডেলিভারি চার্জ:</span>
                      <span>{selectedLocation.charge}৳</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-1">
                      <span>Total:</span>
                      <span className="text-red-600">
                        {(single.Offer === "true" ? Number(details.Offer_price) : Number(single.Price)) * quantity + selectedLocation.charge}৳
                      </span>
                    </div>
                  </div>
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
                disabled={orderLoading}
              >
                {orderLoading && (
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
