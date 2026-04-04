import React, { useState, useEffect, useRef } from "react";
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
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsLargeScreen(mediaQuery.matches);
    const handler = (e) => setIsLargeScreen(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

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
    <div className="product-gallery w-[100%]  mx-auto relative ">
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
        className="main-swiper overflow-hidden relative h-[55vh] md:h-[70vh] w-[100%]"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div
              className="zoom-container h-[55vh] md:h-[70vh] w-[100%] overflow-hidden relative"
              onMouseMove={(e) => {
                if (!isLargeScreen) return;
                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - left) / width) * 100;
                const y = ((e.clientY - top) / height) * 100;
                e.currentTarget.querySelector("img").style.transformOrigin = `${x}% ${y}%`;
                e.currentTarget.querySelector("img").style.transform = "scale(2)";
              }}
              onMouseLeave={(e) => {
                if (!isLargeScreen) return;
                e.currentTarget.querySelector("img").style.transform = "scale(1)";
                e.currentTarget.querySelector("img").style.transformOrigin = "center center";
              }}
            >
              <img
                src={img.large}
                alt={`product-${i}`}
                className="h-[55vh] md:h-[70vh] w-[100%] object-contain transition-transform duration-300 ease-in-out"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


      {/* Thumbnails Swiper */}
      <div className="w-[98%] mx-auto  mt-4">
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
              className={` mx-auto cursor-pointer rounded-md overflow-hidden max-w-[140px] max-h-[150px] ${activeIndex === i ? "border-2 border-blue-500" : ""
                }`}
            >
              <img
                src={img.thumb}
                alt={`thumb-${i}`}
                className="object-fill h-[120px] w-[110px] md:w-[140px] md:h-[150px]"

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
