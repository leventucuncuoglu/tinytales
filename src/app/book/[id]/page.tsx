"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { bookStories } from "@/app/data/stories";
import Link from "next/link";

interface PageParams {
  [key: string]: string;
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
    if (book.pages && currentPage < book.pages.length - 1) {
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
      <div className="relative w-[1024px] h-[768px] bg-white rounded-lg shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          {currentPage >= 0 && book.pages && book.pages[currentPage] && (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={book.pages[currentPage].image}
                alt={`Sayfa ${currentPage + 1}`}
                width={1024}
                height={768}
                className="object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sayfa Kontrolleri */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={prevPage}
            disabled={currentPage <= -1}
            className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={toggleAudio}
            className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>

          <button
            onClick={nextPage}
            disabled={book.pages && currentPage >= book.pages.length - 1}
            className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      <style jsx global>{`