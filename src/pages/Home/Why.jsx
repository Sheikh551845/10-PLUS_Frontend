import React from "react";
import { FaStarOfLife, FaShippingFast } from "react-icons/fa";
import { FaHandshake, FaThumbsUp } from "react-icons/fa";


const Why = () => {
    const primaryColor = "rgba(185,28,28,0.7)";

    return (
        <div>
            
            <div className="max-w-7xl mx-auto px-4 py-12 bg-white">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>
                        10 PLUS?
                    </h2>
                    <p className="text-gray-700">
                        We provide the best in class service to our nationwide customers.
                    </p>
                </div>

                {/* Icon Boxes */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Column 1 */}
                    <div className="space-y-8">
                        <div className="flex items-center space-x-4 p-4 rounded shadow hover:shadow-lg transition">
                            <div style={{ color: primaryColor }} className="text-4xl">
                                <FaStarOfLife />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                100% Quality Assurance
                            </h3>
                        </div>

                        <div className="flex items-center space-x-4 p-4 rounded shadow hover:shadow-lg transition">
                            <div style={{ color: primaryColor }} className="text-4xl">
                                <FaHandshake />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Easy Exchange Policy
                            </h3>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-8">
                        <div className="flex items-center space-x-4 p-4 rounded shadow hover:shadow-lg transition">
                            <div style={{ color: primaryColor }} className="text-4xl">
                                <FaShippingFast />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                2-3 Days Delivery
                            </h3>
                        </div>

                        <div className="flex items-center space-x-4 p-4 rounded shadow hover:shadow-lg transition">
                            <div style={{ color: primaryColor }} className="text-4xl">
                                <FaThumbsUp />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Satisfaction Guaranteed
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};


export default Why;