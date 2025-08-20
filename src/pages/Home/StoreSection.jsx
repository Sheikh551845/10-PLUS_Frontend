import React from "react";
import { FaStoreAlt, FaMapMarkerAlt, FaTshirt, FaShoppingBag } from "react-icons/fa";

const StoreSection = () => {
  const primaryColor = "rgba(185,28,28,0.7)";

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 bg-transparent">
      {/* Locate Our Store */}
      <div className="flex flex-col items-center text-center space-y-4 p-6 border rounded shadow hover:shadow-lg transition">
        <div style={{ color: primaryColor }} className="text-5xl">
          <FaStoreAlt />
        </div>
        <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
          Locate Our Store
        </h2>
        <p className="" style={{ color: primaryColor }}>Mozumdar villa, Signboard, Siddhirganj, Narayanganj 1430</p>
        <a
          href="https://www.facebook.com/10plus.live"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-white text-red-700 border border-red-700 rounded hover:bg-red-700 hover:text-white transition"
        >
          <FaMapMarkerAlt /> View on Google Map
        </a>
      </div>

      {/* Shop Online Now */}
      <div className="flex flex-col items-center text-center space-y-4 p-6 border rounded shadow hover:shadow-lg transition">
        <div style={{ color: primaryColor }} className="text-5xl">
          <FaTshirt />
        </div>
        <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
          Shop Online Now
        </h2>
        <p className="" style={{ color: primaryColor }}>Find your perfect fashion outfits.</p>
        <a
          href="https://www.facebook.com/10plus.live"
          className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-white text-red-700 border border-red-700 rounded hover:bg-red-700 hover:text-white transition"
        >
          <FaShoppingBag /> Visit Shop
        </a>
      </div>
    </section>
  );
};

export default StoreSection;
