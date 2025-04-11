"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { bookStories } from "@/app/data/stories";
import Link from "next/link";

interface PageParams {
  id: string;
}

export default function BookPage() {
  const params = useParams<PageParams>();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const book = bookStories.find((book) => book.id === Number(params.id));

  useEffect(() => {
    if (!book) {
      router.push("/stories");
      return;
    }

    if (currentPage >= 0 && book.pages && book.pages[currentPage]?.audio) {
      const newAudio = new Audio(book.pages[currentPage].audio);
      setAudio(newAudio);

      return () => {
        newAudio.pause();
        newAudio.currentTime = 0;
      };
    }
  }, [book, currentPage, router]);

  if (!book || !book.pages) {
    return null;
  }

  const toggleAudio = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextPage = () => {
    if (currentPage < book.pages.length - 1) {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setIsPlaying(false);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > -1) {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setIsPlaying(false);
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextPage();
      } else if (e.key === "ArrowLeft") {
        prevPage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d1b69] to-[#1a0f40] relative flex flex-col items-center pt-8">
      {/* Başlık ve Kütüphaneye Dön */}
      <div className="flex items-center justify-between w-[1024px] mb-6">
        <h1 className="text-4xl font-bold font-fredoka bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text animate-gradient">{book.title}</h1>
        <Link 
          href="/stories"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-gradient"
        >
          <Home className="w-5 h-5" />
          <span>Kütüphaneye Dön</span>
        </Link>
      </div>

      {/* Kitap Görüntüleyici */}
      <div className="relative w-[1024px] aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm p-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-2xl overflow-hidden"
          >
            {currentPage === -1 ? (
              <div className="relative w-full h-full">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-contain rounded-2xl"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 z-10">
                  <h2 className="text-white text-2xl font-bold mb-2">{book.title}</h2>
                  <p className="text-white/80 text-lg">{book.description}</p>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={book.pages[currentPage].image}
                  alt={`Sayfa ${currentPage + 1}`}
                  fill
                  className="object-contain rounded-2xl"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 z-10">
                  <p className="text-white text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                    {book.pages[currentPage].content}
                  </p>
                </div>
              </div>
            )}

            {/* Navigasyon Butonları */}
            <div className="absolute inset-x-4 inset-y-0 flex items-center justify-between">
              <button
                onClick={prevPage}
                disabled={currentPage === -1}
                className={`rounded-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all transform hover:scale-110 shadow-lg ${
                  currentPage === -1 ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl hover:from-purple-600 hover:to-pink-600"
                }`}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === book.pages.length - 1}
                className={`rounded-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all transform hover:scale-110 shadow-lg ${
                  currentPage === book.pages.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl hover:from-purple-600 hover:to-pink-600"
                }`}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            {/* Sayfa Numarası */}
            <div className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-md rounded-full px-3 py-1 text-white text-sm z-20">
              {currentPage === -1 ? 'Kapak' : `Sayfa ${currentPage + 1} / ${book.pages.length}`}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
} 