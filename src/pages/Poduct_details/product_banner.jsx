import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { MdOutlineZoomOutMap } from "react-icons/md";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductBanner = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Images from props
  const images =
    product?.Details_photo?.map((url) => ({
      large: url,
      thumb: url,
    })) || [];

  return (
    <div className="product-gallery w-[99.99%]  mx-auto relative ">
      {/* Zoom Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-2 right-10 z-5 bg-[rgba(185,28,28,0.7)] text-white px-3 py-1 rounded hover:bg-gray-700 text-xl"
      >
      <MdOutlineZoomOutMap />
      </button>

      {/* Main Swiper */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="main-swiper overflow-hidden relative h-[55vh] md:h-[60vh]"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div
              className="zoom-container h-[55vh] md:h-[60vh]"
              style={{
                overflow: "hidden",
                position: "relative",
                cursor: "default", // changed from zoom-in to default
              }}
            >
              <img
                src={img.large}
                alt={`product-${i}`}
                className="w-full object-fill transition-transform duration-300 ease-in-out h-[55vh] md:h-[60vh]"
                style={{ maxHeight: "600px" }}
              // Removed onMouseMove and onMouseLeave handlers to disable zoom on hover
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails Swiper */}
      <div className="max-w-[40vw] mx-auto  mt-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={4}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress
          modules={[Navigation, Thumbs]}
          className="thumbs-swiper "
        >
          {images.map((img, i) => (
            <SwiperSlide
              key={i}
              className={` mx-auto cursor-pointer rounded-md overflow-hidden max-w-fit max-h-[10vh] ${activeIndex === i ? "border-2 border-blue-500" : ""
                }`}
            >
              <img
                src={img.thumb}
                alt={`thumb-${i}`}
                className="object-cover w-full h-full"
                style={{ height: "80px", width: "80px" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


      {/* Zoom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg w-screen relative"
            style={{
              height: "40vh", // Adjusted height
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-2xl font-bold text-gray-700 hover:text-red-600 z-10"
            >
              ✕
            </button>

            {/* Modal Swiper */}
            <Swiper navigation modules={[Navigation]} className="h-full w-full">
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img.large}
                    alt={`modal-${i}`}
                    className="w-full h-full object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductBanner;
