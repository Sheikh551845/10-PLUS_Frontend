import React, { useState, useEffect } from "react";
import Narrival_card from "../../Components/Narrival_card";
import { motion } from "framer-motion";

const AllProducts = ({ data }) => {
    const [products, setProducts] = useState(data);
    const [sortOption, setSortOption] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    

    // Sorting logic
    useEffect(() => {
        let sortedProducts = [...data];

        if (sortOption === "priceLowHigh") {
            sortedProducts.sort((a, b) => Number(a.Price) - Number(b.Price));
        } else if (sortOption === "priceHighLow") {
            sortedProducts.sort((a, b) => Number(b.Price) - Number(a.Price));
        } else if (sortOption === "newArrival") {
            sortedProducts.sort(
                (a, b) => new Date(b.Upload_on) - new Date(a.Upload_on)
            );
        } else if (sortOption === "offer") {
            sortedProducts.sort((a, b) => (b.Offer === "true") - (a.Offer === "true"));
        }

        setProducts(sortedProducts);
        setCurrentPage(1);
    }, [sortOption, data]);

    // Pagination logic
    const totalPages = Math.ceil(products?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products?.slice(startIndex, startIndex + itemsPerPage);

    // Framer Motion variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.1 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    };

    return (
        <div className="w-[98%] md:w-[95%] mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">All {products[0]?.Category}</h1>

            {/* Sorting & Items per page */}
            <div className="flex flex-row-reverse justify-between items-center mb-6 gap-4">
                <div className="w-[50%] mt-[7%] md:mt-0 flex justify-end">
                    <select
                        className="select select-bordered md:w-[50%]"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="">Sort By</option>
                        <option value="priceLowHigh">Price: Low to High</option>
                        <option value="priceHighLow">Price: High to Low</option>
                        <option value="newArrival">New Arrivals</option>
                        <option value="offer">On Offer</option>
                    </select>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-2 w-[30%]">
                    <span className="text-xs md:text-base"> Items per page:</span>
                    <select
                        className="select select-bordered w-24"
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    >
                        <option value={3}>3</option>
                        <option value={6}>6</option>
                        <option value={9}>9</option>
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            <motion.div
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-[98%] md:w-[95%] mx-auto justify-items-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {currentProducts?.map((item) => (
                    <motion.div
                        key={item._id}
                        variants={cardVariants}
                        className="w-full max-w-[320px] h-[50vh] " // Make sure it matches your card size
                    >
                        <Narrival_card product={item} />
                    </motion.div>

                ))}
            </motion.div>

            {/* Pagination */}
            <div className="flex justify-center mt-10">
                <div className="btn-group">
                    <button
                        className="btn btn-outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        «
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={`btn ${currentPage === i + 1 ? "btn-active" : ""}`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        className="btn btn-outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        »
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
