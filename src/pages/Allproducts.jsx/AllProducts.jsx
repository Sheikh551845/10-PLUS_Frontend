import React, { useState, useEffect } from "react";
import Narrival_card from "../../Components/Narrival_card";


const AllProducts = ({ data }) => {
    const [products, setProducts] = useState(data);
    const [sortOption, setSortOption] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    // Sorting logic
    useEffect(() => {
        let sortedProducts = [...data];

        if (sortOption === "priceLowHigh") {
            sortedProducts.sort(
                (a, b) => Number(a.Price) - Number(b.Price)
            );
        } else if (sortOption === "priceHighLow") {
            sortedProducts.sort(
                (a, b) => Number(b.Price) - Number(a.Price)
            );
        } else if (sortOption === "newArrival") {
            // Sort by Upload_on date (latest first)
            sortedProducts.sort(
                (a, b) => new Date(b.Upload_on) - new Date(a.Upload_on)
            );
        } else if (sortOption === "offer") {
            // Show products with Offer = true first
            sortedProducts.sort(
                (a, b) => (b.Offer === "true") - (a.Offer === "true")
            );
        }

        setProducts(sortedProducts);
        setCurrentPage(1);
    }, [sortOption, data]);

    // Pagination logic
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="w-[95%] mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">All Products</h1>

            {/* Sorting & Items per page */}
            <div className="flex flex-row-reverse justify-between items-center mb-6 gap-4 ">
                <div className="w-[50%] mt-[7%] md:mt-0 flex justify-end">
                    <select
                        className="select select-bordered md:w-[50%] "
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
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[95%] max-w-6xl md:ml-24 mx-auto">
                {currentProducts.map((item) => (
                    <Narrival_card key={item.id} product={item} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
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
                            className={`btn ${currentPage === i + 1 ? "btn-active" : ""
                                }`}
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
