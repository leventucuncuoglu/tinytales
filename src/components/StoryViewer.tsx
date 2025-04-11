"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

interface StoryViewerProps {
  storyId: string;
}

interface Story {
  title: string;
  pages: {
    content: string;
    image?: string;
  }[];
}

export default function StoryViewer({ storyId }: StoryViewerProps) {
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/stories/${storyId}`);
        
        if (!response.ok) {
          throw new Error("Hikaye yüklenirken bir hata oluştu");
        }
        
        const data = await response.json();
        setStory(data);
      } catch (error) {
        console.error("Hikaye yüklenirken hata oluştu:", error);
        setError(error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu");
      } finally {
        setIsLoading(false);
      }
    };

    if (storyId) {
      fetchStory();
    }
  }, [storyId]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextPage = () => {
    if (story && currentPage < story.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleSpeech = () => {
    if (!story) return;

    if (!isSpeaking) {
      const utterance = new SpeechSynthesisUtterance(story.pages[currentPage]?.content);
      utterance.lang = "tr-TR";
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    } else {
      speechSynthesis.cancel();
    }
    setIsSpeaking(!isSpeaking);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-800 mb-4">Ups! Bir Hata Oluştu</h1>
          <p className="text-purple-600 mb-6">{error}</p>
          <Button asChild>
            <Link href="/create">Yeni Hikaye Oluştur</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-800 mb-4">Hikaye Bulunamadı</h1>
          <p className="text-purple-600 mb-6">Üzgünüz, aradığınız hikaye bulunamadı.</p>
          <Button asChild>
            <Link href="/create">Yeni Hikaye Oluştur</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${theme === "dark" ? "from-purple-900 via-gray-900 to-purple-900" : "from-purple-50 via-white to-purple-50"}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Üst Bar */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/create"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Yeni Hikaye Oluştur
          </Link>

          <div className="flex items-center gap-4">
            {/* Font Boyutu */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                className="p-2 rounded-full hover:bg-purple-100 transition-colors"
              >
                <span className="text-sm">A-</span>
              </button>
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                className="p-2 rounded-full hover:bg-purple-100 transition-colors"
              >
                <span className="text-lg">A+</span>
              </button>
            </div>

            {/* Tema Değiştirici */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-purple-100 transition-colors"
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>
          </div>
        </div>

        {/* Ana İçerik */}
        <div className="max-w-4xl mx-auto">
          {/* Başlık */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-8 font-story text-purple-800 dark:text-purple-300"
          >
            {story.title}
          </motion.h1>

          {/* Hikaye Kartı */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Resim */}
                {story.pages[currentPage]?.image && (
                  <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden">
                    <Image
                      src={story.pages[currentPage].image}
                      alt="Hikaye Görseli"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Metin */}
                <p
                  className="text-purple-900 dark:text-purple-100 leading-relaxed font-story"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {story.pages[currentPage]?.content}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Kontroller */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between gap-4">
              {/* Sayfa Kontrolü */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={previousPage}
                  disabled={currentPage === 0}
                  className="rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </Button>

                <span className="text-sm text-purple-600 dark:text-purple-300">
                  {currentPage + 1} / {story.pages.length}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextPage}
                  disabled={currentPage === story.pages.length - 1}
                  className="rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>

              {/* Oynatma Kontrolü */}
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={togglePlayPause}
                  className="rounded-full"
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSpeech}
                  className="rounded-full"
                >
                  {isSpeaking ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 