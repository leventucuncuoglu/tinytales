"use client";

import { motion } from "framer-motion";
import { Star, Lock, Play, Wand2, Headphones, BookOpen, ArrowRight, Clock, Moon, Book } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { audioStories, videoStories, bookStories, sleepSounds } from "@/app/data/stories";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Story {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  rating: string;
  category: string;
  isPro: boolean;
  type: 'audio' | 'video' | 'book' | 'sleep';
  audio?: string;
  video?: string;
  pages?: {
    pageNumber: number;
    content: string;
    image: string;
    audio: string;
  }[];
}

// Kategoriye göre hikayeleri filtrele
const getStoriesByCategory = (stories: Story[], category: string) => {
  if (category.startsWith('En Çok')) {
    return stories
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      .slice(0, 4);
  }
  return stories.filter(story => story.category === category).slice(0, 4);
};

// Hikaye türüne göre kategorileri getir
const getCategoriesByType = (type: 'audio' | 'video' | 'book' | 'sleep') => {
  switch (type) {
    case 'audio':
      return ['En Çok Dinlenen', 'Macera', 'Fantastik', 'Uzay', 'Komedi'];
    case 'video':
      return ['En Çok İzlenen', 'Macera', 'Uzay', 'Komedi'];
    case 'book':
      return ['En Çok Okunan', 'Macera', 'Fantastik'];
    case 'sleep':
      return ['En Çok Dinlenen', 'Doğa Sesleri', 'Ninni', 'Beyaz Gürültü'];
    default:
      return [];
  }
};

// Kategori bölümü komponenti
const CategorySection = ({ title, stories, type }: { title: string, stories: Story[], type: 'audio' | 'video' | 'book' | 'sleep' }) => (
  <div className="mb-16">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      <Button 
        variant="outline"
        className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30"
      >
        Tümünü Görüntüle
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>

    {type === 'book' ? (
      // Kitap Rafı Görünümü
      <div className="relative">
        {/* Raf Gölgesi */}
        <div className="absolute -bottom-4 left-0 right-0 h-8 bg-gradient-to-b from-[#1a0f40] to-transparent blur-md"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gradient-to-b from-[#2d1b69]/20 to-[#1a0f40]/20 rounded-3xl backdrop-blur-lg border border-white/10">
          {stories.map((story, index) => (
            <Link
              href={story.type === 'book' ? `/book/${story.id}` : `/story/${story.id}`}
              key={story.id}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative cursor-pointer"
              >
                {/* Kitap Kapağı */}
                <div className="relative h-[360px] rounded-lg overflow-hidden transform group-hover:-rotate-6 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  {/* Kitap Sırtı Efekti */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/40 to-transparent"></div>
                  
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transform transition-transform duration-300 group-hover:scale-110"
                    priority={index < 4}
                  />
                  
                  {/* Pro/Ücretsiz Etiketi */}
                  <div className="absolute top-4 right-4 z-10">
                    {story.isPro ? (
                      <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Pro
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-green-400 to-teal-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        Ücretsiz
                      </div>
                    )}
                  </div>

                  {/* Kitap Bilgileri - Sürekli Görünür */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent transform transition-transform duration-300 group-hover:scale-110">
                    <h3 className="text-xl font-bold text-white mb-2 font-fredoka">
                      {story.title}
                    </h3>
                    <p className="text-white/80 text-sm line-clamp-2 mb-3">
                      {story.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-white/60 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {story.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                          {story.rating}
                        </div>
                      </div>
                      
                      {/* Okuma Butonu - Hover'da Görünür */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <button className="bg-white/90 backdrop-blur-md text-purple-600 px-4 py-2 rounded-full font-bold shadow-xl hover:bg-white transition-all duration-300 flex items-center gap-2 text-sm">
                          <Book className="w-4 h-4" />
                          Oku
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Kitap Gölgesi */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black/20 blur-md rounded-full transform group-hover:scale-110 transition-all duration-300"></div>
              </motion.div>
            </Link>
          ))}
        </div>
        
        {/* Raf Dekorasyonu */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20"></div>
      </div>
    ) : type === 'sleep' ? (
      // Uyku müzikleri için özel kart tasarımı
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stories.map((story) => (
          <Link 
            href={`/sleep/${story.id}`}
            key={story.id}
            className="group relative h-[300px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            {/* Arkaplan Görseli */}
            <div className="absolute inset-0">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/50 to-transparent" />
            </div>
            
            {/* PRO/Ücretsiz Etiketi */}
            <div className="absolute top-4 right-4 z-10">
              {story.isPro ? (
                <div className="bg-gradient-to-r from-indigo-400 to-blue-400 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  PRO
                </div>
              ) : (
                <div className="bg-gradient-to-r from-teal-400 to-emerald-400 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Ücretsiz
                </div>
              )}
            </div>

            {/* İçerik */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Moon className="w-5 h-5 text-blue-300" />
                <span className="text-blue-200 text-sm">Rahatlatıcı Müzik</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{story.title}</h3>
              <p className="text-blue-100 text-sm line-clamp-2 mb-4">{story.description}</p>
              
              {/* Alt Bilgiler */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-300" />
                    <span className="text-blue-200 text-sm">{story.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-blue-200 text-sm">{story.rating}</span>
                  </div>
                </div>
                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                    <Play className="w-4 h-4 mr-2" />
                    Dinle
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    ) : type === 'audio' ? (
      // Sesli Hikayeler için yeni kart tasarımı
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stories.map((story, index) => (
          <Link 
            href={`/story/${story.id}`}
            key={story.id}
            className="group relative h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Resim ve Gradient Overlay */}
            <div className="absolute inset-0">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/95 via-purple-900/50 to-transparent opacity-90 group-hover:opacity-100 transition-all duration-500" />
            </div>

            {/* PRO/Ücretsiz Etiketi */}
            <div className="absolute top-4 right-4 z-10">
              {story.isPro ? (
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  PRO
                </div>
              ) : (
                <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  Ücretsiz
                </div>
              )}
            </div>

            {/* Kategori Etiketi */}
            <div className="absolute top-4 left-4">
              <div className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium">
                {story.category}
              </div>
            </div>

            {/* İçerik - Alt Kısım */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {/* Başlık ve Açıklama */}
              <h3 className="text-2xl font-bold text-white mb-3 font-fredoka">
                {story.title}
              </h3>
              <p className="text-white/90 text-sm line-clamp-2 mb-4">
                {story.description}
              </p>

              {/* Alt Bilgiler */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-purple-300" />
                    <span className="text-purple-200 text-sm">{story.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-purple-200 text-sm">{story.rating}</span>
                  </div>
                </div>

                {/* Dinle Butonu */}
                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                    <Headphones className="w-4 h-4" />
                    Dinle
                  </button>
                </div>
              </div>
            </div>

            {/* Hover Efekti - Merkez İkon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
              <div className="bg-white/30 backdrop-blur-md p-6 rounded-full">
                <Headphones className="w-12 h-12 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    ) : type === 'video' ? (
      // Video hikayeler için özel kart tasarımı
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stories.map((story, index) => (
          <Link 
            href={`/story/${story.id}`}
            key={story.id}
            className="group relative h-[420px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Video Kapak Resmi ve Overlay */}
            <div className="absolute inset-0">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-500" />
            </div>

            {/* Video İkonu - Hover'da Büyür */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center transform group-hover:scale-125 transition-all duration-500">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Play className="w-10 h-10 text-white transform translate-x-0.5" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* PRO/Ücretsiz Etiketi */}
            <div className="absolute top-6 right-6 z-10">
              {story.isPro ? (
                <div className="bg-gradient-to-r from-red-400 to-pink-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  PRO
                </div>
              ) : (
                <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Ücretsiz
                </div>
              )}
            </div>

            {/* Kategori ve Süre */}
            <div className="absolute top-6 left-6 flex gap-3">
              <div className="bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                {story.category}
              </div>
              <div className="bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {story.duration}
              </div>
            </div>

            {/* İçerik Bilgileri */}
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-yellow-400 font-bold text-lg">{story.rating}</span>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-3 font-fredoka">
                {story.title}
              </h3>
              <p className="text-white/90 text-base line-clamp-2 mb-6">
                {story.description}
              </p>

              {/* İzle Butonu */}
              <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3">
                  <Play className="w-6 h-6" fill="currentColor" />
                  Hemen İzle
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    ) : null}
  </div>
);

// Ana sayfa komponenti
export default function StoriesPage() {
  const [selectedType, setSelectedType] = useState<'audio' | 'video' | 'book' | 'sleep'>('audio');
  const router = useRouter();

  // Seçilen türe göre hikayeleri getir
  const getStoriesByType = () => {
    switch (selectedType) {
      case 'audio':
        return audioStories;
      case 'video':
        return videoStories;
      case 'book':
        return bookStories;
      case 'sleep':
        return sleepSounds;
      default:
        return audioStories;
    }
  };

  // Seçilen türe göre başlığı getir
  const getTypeTitle = () => {
    switch (selectedType) {
      case 'audio':
        return 'Sesli Hikayeler';
      case 'video':
        return 'Videolu Hikayeler';
      case 'book':
        return 'Hikaye Kitapları';
      case 'sleep':
        return 'Uyku Müzikleri';
      default:
        return 'Sesli Hikayeler';
    }
  };

  const categories = getCategoriesByType(selectedType);
  const stories = getStoriesByType();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d1b69] to-[#1a0f40] py-12 relative overflow-hidden">
      {/* Arka plan yıldızları */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className={`absolute w-${Math.random() > 0.5 ? '1' : '2'} h-${Math.random() > 0.5 ? '1' : '2'} ${
              Math.random() > 0.5 ? 'bg-white' : 'bg-yellow-200'
            } rounded-full animate-twinkle`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDelay: `${Math.random() * 3}s`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-fredoka">
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
                Hayallerin
              </span>{" "}
              <span className="bg-gradient-to-r from-pink-500 to-yellow-400 text-transparent bg-clip-text">
                Büyülü Dünyası
              </span>
            </h1>
            <p className="text-lg text-purple-300 mb-8">
              Birbirinden güzel hikayelerle dolu masalsı bir yolculuğa çık
            </p>

            {/* Hikaye Türü Seçimi */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                onClick={() => setSelectedType('audio')}
                className={`rounded-full px-6 py-6 flex items-center gap-2 text-lg font-semibold transition-all duration-300 ${
                  selectedType === 'audio'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Headphones className="w-5 h-5" />
                Sesli Hikayeler
              </Button>
              <Button
                onClick={() => setSelectedType('video')}
                className={`rounded-full px-6 py-6 flex items-center gap-2 text-lg font-semibold transition-all duration-300 ${
                  selectedType === 'video'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Play className="w-5 h-5" />
                Videolu Hikayeler
              </Button>
              <Button
                onClick={() => setSelectedType('book')}
                className={`rounded-full px-6 py-6 flex items-center gap-2 text-lg font-semibold transition-all duration-300 ${
                  selectedType === 'book'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                Hikaye Kitapları
              </Button>
              <Button
                onClick={() => setSelectedType('sleep')}
                className={`rounded-full px-6 py-6 flex items-center gap-2 text-lg font-semibold transition-all duration-300 ${
                  selectedType === 'sleep'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Moon className="w-5 h-5" />
                Uyku Müzikleri
              </Button>
              <Link href="/create-story">
                <Button
                  className="rounded-full px-6 py-6 flex items-center gap-2 text-lg font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/30"
                >
                  <Wand2 className="w-5 h-5" />
                  Senin İçin Özel
                </Button>
              </Link>
            </div>

            {/* Seçilen Tür Başlığı */}
            <h2 className="text-3xl font-bold text-white mb-8">
              {getTypeTitle()}
            </h2>
          </div>

          {/* Kategori Bölümleri */}
          {categories.map((category) => (
            <CategorySection
              key={category}
              title={category}
              stories={getStoriesByCategory(stories, category)}
              type={selectedType}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 