import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img1 from '../../assets/Demo images/T-shirt-1.jpg'
import img2 from '../../assets/Demo images/T-shirt-2.jpg'
import img3 from '../../assets/Demo images/T-shirt-3.jpg'
import img4 from '../../assets/Demo images/Jursey-1.jpg'
import img5 from '../../assets/Demo images/jursey-2.jpg'
import img6 from '../../assets/Demo images/jursey-3.jpg'



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
    return (
        <div className="">
   <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 1500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}

            modules={[Autoplay, Pagination]}
            className="mySwiper"
        >
            <SwiperSlide className="flex items-center justify-center h-[80vh] w-[100%] bg-white">
                <div className=" flex items-center justify-center">
                    <img src={img1} alt="" className="h-[70vh] w-[100%] object-contain" />
                </div>
            </SwiperSlide>

            <SwiperSlide className="flex items-center justify-center h-[80vh] w-[100%] bg-white">
                <div className=" flex items-center justify-center">
                    <img src={img2} alt="" className="h-[70vh] w-[100%] object-contain" />
                </div>
            </SwiperSlide>

            <SwiperSlide className="flex items-center justify-center h-[80vh] w-[100%] bg-white">
                <div className=" flex items-center justify-center">
                    <img src={img3} alt="" className="h-[70vh] w-[100%] object-contain" />
                </div>
            </SwiperSlide>

            <SwiperSlide className="flex items-center justify-center h-[80vh] w-[100%] bg-white">
                <div className=" flex items-center justify-center">
                    <img src={img4} alt="" className="h-[70vh] w-[100%] object-contain" />
                </div>
            </SwiperSlide>

            <SwiperSlide className="flex items-center justify-center h-[80vh] w-[100%] bg-white">
                <div className=" flex items-center justify-center">
                    <img src={img5} alt="" className="h-[70vh] w-[100%] object-contain" />
                </div>
            </SwiperSlide>

            <SwiperSlide className="flex items-center justify-center h-[80vh] w-[100%] bg-white">
                <div className=" flex items-center justify-center">
                    <img src={img6} alt="" className="h-[70vh] w-[100%] object-contain" />
                </div>
            </SwiperSlide>


        </Swiper>
        </div>
     
    );
};

export default Banner;