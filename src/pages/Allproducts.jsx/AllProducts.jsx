import React, { useState, useEffect, useCallback } from "react";
import Narrival_card from "../../Components/Narrival_card";
import { motion } from "framer-motion";
import { axiosSecure } from "../../Hooks/UseAxiosSecure";
import { FadeLoader } from "react-spinners";

const AllProducts = ({ apiPath }) => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [isFetching, setIsFetching] = useState(true);
    const [sortOption, setSortOption] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(() => {
        const saved = sessionStorage.getItem("allProducts_currentPage");
        return saved ? Number(saved) : 1;
    });

    const totalPages = Math.ceil(total / itemsPerPage);

    // Fetch products from server whenever page / limit / sort changes
    const fetchProducts = useCallback(async () => {
        setIsFetching(true);
        try {
            const res = await axiosSecure.get(apiPath, {
                params: {
                    page: currentPage,
                    limit: itemsPerPage,
                    sort: sortOption || undefined,
                },
            });
            // API returns { products, total }
            setProducts(res.data.products ?? res.data);
            setTotal(res.data.total ?? res.data.length);
        } catch (err) {
            console.error(err);
            setProducts([]);
            setTotal(0);
        } finally {
            setIsFetching(false);
        }
    }, [apiPath, currentPage, itemsPerPage, sortOption]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Persist page & scroll to top on page change
    useEffect(() => {
        sessionStorage.setItem("allProducts_currentPage", currentPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    // Reset to page 1 when sort or limit changes
    const handleSortChange = (val) => {
        setSortOption(val);
        setCurrentPage(1);
        sessionStorage.setItem("allProducts_currentPage", 1);
    };

    const handleLimitChange = (val) => {
        setItemsPerPage(Number(val));
        setCurrentPage(1);
        sessionStorage.setItem("allProducts_currentPage", 1);
    };

    // Framer Motion variants
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } },
    };
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
    };

    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <FadeLoader color="rgba(185,28,28,0.7)" />
            </div>
        );
    }

    if (!isFetching && products.length === 0) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <p className="text-xl font-bold text-red-500">
                    The Product Will Available Soon!
                </p>
            </div>
        );
    }

    return (
        <div className="w-[98%] md:w-[95%] mx-auto py-8">
            {products[0]?.combo === "true"
                ? <h1 className="text-2xl font-bold mb-6">All Combo</h1>
                : <h1 className="text-2xl font-bold mb-6">All {products[0]?.Category}</h1>
            }

            {/* Sorting & Items per page */}
            <div className="flex flex-row-reverse justify-between items-center mb-6 gap-4">
                <div className="w-[50%] mt-[7%] md:mt-0 flex justify-end">
                    <select
                        className="select select-bordered md:w-[50%]"
                        value={sortOption}
                        onChange={(e) => handleSortChange(e.target.value)}
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
                        onChange={(e) => handleLimitChange(e.target.value)}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-1 gap-y-3 md:gap-5 lg:gap-6 w-[98%] md:w-[95%] mx-auto justify-items-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`${currentPage}-${sortOption}`}
            >
                {products.map((item) => (
                    <motion.div
                        key={item._id}
                        variants={cardVariants}
                        className="w-full max-w-[320px] h-[55vh] md:h-[60vh]"
                    >
                        <Narrival_card product={item} />
                    </motion.div>
                ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                    <div className="btn-group">
                        <button
                            className="btn btn-outline"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
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
                            onClick={() => setCurrentPage((p) => p + 1)}
                        >
                            »
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProducts;
