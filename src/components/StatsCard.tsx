"use client";

import { motion } from "framer-motion";

interface StatsCardProps {
  number: string;
  title: string;
  description: string;
}

export default function StatsCard({ number, title, description }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <h3 className="text-3xl font-fredoka text-purple-600 dark:text-purple-300 mb-2">
        {number}
      </h3>
      <h4 className="text-xl font-fredoka text-purple-800 dark:text-purple-200 mb-2">
        {title}
      </h4>
      <p className="text-purple-600 dark:text-purple-400 text-sm">
        {description}
      </p>
    </motion.div>
  );
} 