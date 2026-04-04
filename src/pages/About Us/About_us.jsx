
import { Helmet } from 'react-helmet-async';
import React from "react";
import { motion } from "framer-motion";

const About_us = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Banner Section */}
            <Helmet>
                <title>10 PLUS|Home</title>
            </Helmet>
            <div className="relative w-full h-72 md:h-96 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=1600&q=80"
                    alt="Fashion Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg"
                    >
                        About 10 Plus Fashion
                    </motion.h1>
                </div>
            </div>

            {/* Content Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto py-12 px-6 md:px-0 text-center space-y-6"
            >
                <h2 className="text-2xl md:text-3xl font-semibold text-red-700">
                    Who We Are
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                    Welcome to <span className="font-bold text-red-700">10 Plus Fashion</span>,
                    your trusted destination for premium and stylish outfits in Bangladesh.
                    We focus on offering the latest trends with comfort and elegance,
                    ensuring fashion that fits every occasion.
                </p>

                <p className="text-lg leading-relaxed text-gray-700">
                    Our mission is simple — bring fashionable, quality, and affordable
                    products closer to you. From casual T-shirts to premium wear,
                    we aim to redefine your wardrobe with a blend of classic and modern designs.
                </p>
            </motion.div>

            {/* Info Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white shadow-xl rounded-2xl max-w-3xl mx-auto p-8 space-y-4 mb-12"
            >
                <h3 className="text-xl font-semibold text-red-700 text-center">
                    Contact Information
                </h3>
                <div className="text-center space-y-2">
                    <p>
                        <span className="font-semibold">Phone:</span> 01745015844
                    </p>
                    <p>
                        <span className="font-semibold">Address:</span> House No 2629, Faidabad
                        Chapra Mosjid, Joynal Market, Uttara, Dhaka.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default About_us;
