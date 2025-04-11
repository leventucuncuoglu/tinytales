"use client";

import { motion } from "framer-motion";

export default function SpaceBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Yıldızlar */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ opacity: 0.1 + Math.random() * 0.5 }}
          animate={{
            opacity: [0.1 + Math.random() * 0.5, 0.5 + Math.random() * 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Gezegenler */}
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-brand-purple-300 to-brand-purple-500 opacity-20"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          right: "10%",
          top: "20%",
        }}
      />

      <motion.div
        className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-brand-pink-300 to-brand-pink-500 opacity-20"
        animate={{
          y: [0, 10, 0],
          rotate: [0, -360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          left: "15%",
          top: "30%",
        }}
      />

      {/* Roketler */}
      <motion.div
        className="absolute w-8 h-16"
        animate={{
          x: [-100, window.innerWidth + 100],
          y: [-50, 50],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          top: "40%",
        }}
      >
        <svg viewBox="0 0 24 24" className="w-full h-full text-brand-orange-400 opacity-20">
          <path
            fill="currentColor"
            d="M12 2.5s-4 3.5-4 7.5c0 2.48 1.57 4.49 3.5 5.5L10 20h4l-1.5-4.5c1.93-1.01 3.5-3.02 3.5-5.5 0-4-4-7.5-4-7.5zm0 10c-1.38 0-2.5-1.12-2.5-2.5S10.62 7.5 12 7.5s2.5 1.12 2.5 2.5S13.38 12.5 12 12.5z"
          />
        </svg>
      </motion.div>

      {/* Bulutlar */}
      <motion.div
        className="absolute w-32 h-16 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-lg"
        animate={{
          x: [-100, window.innerWidth + 100],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          top: "60%",
        }}
      />
    </div>
  );
}
