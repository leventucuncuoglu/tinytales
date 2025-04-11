"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MascotProps {
  message?: string;
}

const Mascot = ({ message }: MascotProps) => {
  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [-2, 2, -2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <div className="w-[300px] h-[300px] relative">
            <Image
              src="/images/mascot.jpg"
              alt="Maskot"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>
        
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-[280px] left-[50%] -translate-x-1/2 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl max-w-[250px] z-10"
          >
            <p className="text-purple-800 dark:text-purple-200 text-sm">{message}</p>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Mascot;
