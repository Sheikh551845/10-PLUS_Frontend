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
  let images = [];

  // Add Show_photo first if it exists
  if (product && product.Show_photo) {
    images.push({
      large: product.Show_photo,
      thumb: product.Show_photo,
    });
  }

  // Add Details_photo from details if available
  if (product && product.details && Array.isArray(product.details.Details_photo)) {
    product.details.Details_photo.forEach((url) => {
      images.push({
        large: url,
        thumb: url,
      });
    });
  }


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
        className="main-swiper overflow-hidden relative h-[65vh] w-[99.99%]"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div
              className="zoom-container h-[65vh] w-[99.99%]"
              style={{
                overflow: "hidden",
                position: "relative",
                cursor: "default", // changed from zoom-in to default
              }}
            >
              <img
                src={img.large}
                alt={`product-${i}`}
                className="h-[65vh] w-[99.99%] object-fill transition-transform duration-300 ease-in-out  "
                
              // Removed onMouseMove and onMouseLeave handlers to disable zoom on hover
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails Swiper */}
      <div className="max-w-[70vw] md:max-w-[50vw] mx-auto  mt-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={4}
          slidesPerView={5}
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
                className="object-fill w-full h-full"
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
            className="bg-[rgba(247,156,156,0.7)] backdrop-blur-sm bg-opacity-30 rounded-lg w-screen relative"
            style={{
              height: "90vh", // Adjusted height
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
                    className="w-full h-full object-fill"
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
