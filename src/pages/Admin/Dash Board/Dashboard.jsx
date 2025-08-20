import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import img from "../../../assets/Logo/logo.png";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
      <Helmet>
        <title>10 PLUS | Dashboard</title>
      </Helmet>

      {/* Full-screen card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white w-full h-screen flex flex-col items-center justify-center "
      >
        {/* Logo animation */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          className="mb-6"
        >
          <img src={img} alt="Logo" className="w-28 h-28 md:w-32 md:h-32" />
        </motion.div>

        {/* Text animation */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.4 }}
          className="text-center"
        >
          <h1 className="text-xl md:text-3xl font-bold text-[rgba(185,28,28,0.7)] mb-3">
            Welcome to 10 PLUS Dashboard
          </h1>
          <p className="text-gray-600 text-xs md:text-sm">Powered By Sheikh</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
