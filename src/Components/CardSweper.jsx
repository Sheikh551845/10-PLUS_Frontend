import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

import Narrival_card from "../Components/Narrival_card"
import SlideCard from './SlideCard';

const CardSweper = ({ products }) => {
    if (!products || products.length === 0) return null;

    if (products.length === 1) {
        return <Narrival_card key={products[0].id} product={products[0]} />;
    }

    return (
        <Swiper
            spaceBetween={20}
            loop={true}
            breakpoints={{
                0: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
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
                    className="flex items-center justify-center h-[45vh] md:h-[45vh]"
                >
                    <SlideCard product={data} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};


export default CardSweper;
