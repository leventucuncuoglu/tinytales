"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
}

export default function FeatureCard({ title, description, image }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
    >
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-fredoka text-purple-800 dark:text-purple-200 mb-2">
          {title}
        </h3>
        <p className="text-purple-600 dark:text-purple-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
} 