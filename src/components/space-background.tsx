"use client";

import { motion } from "framer-motion";

const SpaceBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Yıldızlar */}
      <div className="absolute w-full h-full opacity-60">
        <div className="stars absolute inset-0">
          {[...Array(150)].map((_, i) => (
            <motion.div
              key={i}
              className="star absolute rounded-full"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                background: `rgb(${255}, ${Math.random() * 100 + 155}, ${Math.random() * 50})`,
                boxShadow: '0 0 4px rgba(255, 200, 50, 0.8)',
                filter: 'blur(0.2px)',
              }}
            />
          ))}
        </div>

        {/* Bulutlar */}
        <div className="clouds absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="cloud absolute bg-white/30 rounded-full filter blur-xl"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: Math.random() * 20 + 30,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * -20,
              }}
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Parıltılar */}
        <div className="sparkles absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="sparkle absolute w-2 h-2 bg-purple-400/30 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpaceBackground; 