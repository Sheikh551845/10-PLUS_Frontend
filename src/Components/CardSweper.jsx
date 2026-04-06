import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

import Narrival_card from "../Components/Narrival_card"
import SlideCard from './SlideCard';

const CardSweper = ({ products }) => {
    if (!products || products.length === 0) return null;

    return (
        <Swiper
            spaceBetween={20}
            loop={true}
            breakpoints={{
                0: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
                reverseDirection: true,
            }}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwipe  w-full bg-transparent"
        >
            {products.map((data) => (
                <SwiperSlide
                    key={data.id}
                    className="flex items-center justify-center h-[45vh] md:h-[50vh]"
                >
                    <SlideCard product={data} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};


export default CardSweper;
