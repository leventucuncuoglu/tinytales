"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  quote: string;
}

export default function TestimonialCard({ name, role, image, quote }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-fredoka text-lg text-purple-800 dark:text-purple-200">
            {name}
          </h3>
          <p className="text-sm text-purple-600 dark:text-purple-400">
            {role}
          </p>
        </div>
      </div>
      <blockquote className="text-purple-700 dark:text-purple-300 italic">
        "{quote}"
      </blockquote>
    </motion.div>
  );
} 