import React from "react";
import { motion } from "framer-motion";

const Section_Title = ({ Title }) => {
  return (
    <div className="my-8 max-w-fit mx-auto">
      <div className="flex flex-col items-center">
        {/* Top Gradient Line */}
        <motion.div
          className="h-[2px] w-32 md:w-48 mx-auto bg-gradient-to-r from-transparent via-[rgba(185,28,28,0.7)] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        ></motion.div>

        {/* Title */}
        <motion.p
          className="text-lg md:text-2xl font-bold text-[rgba(185,28,28,0.7)] my-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        >
          ~~~{Title}~~~
        </motion.p>

        {/* Bottom Gradient Line */}
        <motion.div
          className="h-[2px] w-32 md:w-48 mx-auto bg-gradient-to-r from-transparent via-[rgba(185,28,28,0.7)] to-transparent mt-2 "
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        ></motion.div>
      </div>
    </div>
  );
};

export default Section_Title;
