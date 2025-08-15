import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import SlideCard from './slidecard';
import Narrival_card from "../Components/Narrival_card"

const CardSweper = ({ products }) => {


    return (
        [
            products?.length==1 ? <Narrival_card product={products[0]} />:<Swiper
            spaceBetween={20}
            loop={true}
            breakpoints={{
                0: { slidesPerView: 2 },     // Mobile (2 cards)
                1024: { slidesPerView: 3 }, // Desktop (3 cards)
                reverseDirection: true,
            }}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}

            modules={[Autoplay, Pagination]}
            className="mySwipe h-[50vh] md:h-[60vh] w-full bg-white"
        >
            {products.map((data) => (
                <SwiperSlide
                    key={data.id}
                    className="flex items-center  justify-center h-[50vh] md:h-[60vh] "
                >
                    <SlideCard product={data} />
                </SwiperSlide>
            ))}
        </Swiper>
        ]
        
    );
};

export default CardSweper;
