import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { data } from 'react-router-dom';

const Banner = ({ product }) => {
    let Banner_data = [];
    let Banner_photo = []



    if (product.length > 0) {
        Banner_data = product
    }
    else {
        Banner_photo = product.Details_photo
    }

  
    return (
        <div className="">

            {Banner_data?.length > 0 ? <Swiper
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
                className="mySwipe h-[60vh] "
            >


                {Banner_data.map((data) => (
                    <SwiperSlide className="flex items-center justify-center  w-full  ">
                        <div className="flex items-center justify-center h-full w-full ">
                            <img src={`${data.Show_photo}`} alt="" className="h-[100%] w-[100%] object-fill " />
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

                    <div>{Banner_photo.map((data) => (
                        <SwiperSlide className="flex items-center justify-center  w-full  ">
                            <div className="flex items-center justify-center h-full w-full ">
                                <img src={`${data}`} alt="" className="h-[100%] w-[100%] object-fill " />
                            </div>
                        </SwiperSlide>

                    ))}</div>





                </Swiper>}

        </div>

    );
};

export default Banner;