"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Volume2, Pause, Play } from "lucide-react";

export default function StoryPage() {
  const searchParams = useSearchParams();
  const heroName = searchParams.get("hero") || "Kahraman";
  const [isPlaying, setIsPlaying] = useState(false);

  // Örnek hikaye metni - bu kısım daha sonra API'den gelecek
  const storyText = `Bir varmış bir yokmuş, ${heroName} adında cesur bir kahraman varmış...`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-orange-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Hikaye Başlığı */}
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            {heroName}&apos;nın Büyülü Macerası
          </h1>

          {/* Hikaye Kartı */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
            {/* Ses Kontrolleri */}
            <div className="flex justify-center mb-6">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-4 shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
            </div>

            {/* Hikaye Metni */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {storyText}
              </p>
            </div>

            {/* Hikaye Görseli */}
            <div className="mt-8 relative h-64 rounded-2xl overflow-hidden">
              <Image
                src="/images/story-illustration.jpg"
                alt="Hikaye İllüstrasyonu"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 