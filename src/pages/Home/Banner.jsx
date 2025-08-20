import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FadeLoader } from "react-spinners";



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Banner = () => {

    const axiosSecure = UseAxiosSecure()

    const { data: BannerImg = [] } = useQuery({
        queryKey: ['BannerImg'],
        queryFn: async () => {
            const res = await axiosSecure.get('/Banner');
            return res.data.slice(0, 6);
        }
    })


    return (
        <div className="">

            {BannerImg?.length > 0 ? <Swiper
                spaceBetween={30}
                loop={true}
                centeredSlides={true}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}

                modules={[Autoplay, Pagination]}
                className="mySwipe h-[60vh] md:h-[65vh] "
            >


                {BannerImg.map((data) => (
                    <SwiperSlide className="flex items-center justify-center w-screen  ">
                        <div className="flex items-center justify-center h-[60vh] md:h-[65vh] w-screen ">
                            <img src={`${data.img}`} alt="" className="h-[60vh] md:h-[65vh] w-screen object-fill " />
                        </div>
                    </SwiperSlide>

                ))}
            </Swiper> :



                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}

                    modules={[Autoplay, Pagination]}
                    className="mySwipe h-[50vh] "
                >

                    
                        <SwiperSlide className="flex items-center justify-center  w-full  ">
                            <div className="flex items-center justify-center h-full w-full ">
                                <FadeLoader color="rgba(185,28,28,0.7)"  size={15} />
                               
                            </div>
                        </SwiperSlide>

               





                </Swiper>}

        </div>

    );
};

export default Banner;