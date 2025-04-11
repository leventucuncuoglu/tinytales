"use client";

import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Settings, Star, Music, Lock, MessageCircle, Send, ArrowLeft, ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import Link from "next/link";
import { audioStories, videoStories, bookStories } from "@/app/data/stories";

// Yorum tipi tanımı
interface Comment {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export default function StoryDetailPage() {
  const params = useParams();
  const storyId = Number(params.id);
  const [currentPage, setCurrentPage] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const pageAudioRef = useRef<HTMLAudioElement | null>(null);
  const pageTurnRef = useRef<HTMLAudioElement | null>(null);
  
  // Tüm hikayeleri birleştir
  const allStories = [...audioStories, ...videoStories, ...bookStories];
  const story = allStories.find(s => s.id === storyId);

  // Video kontrolleri için state'ler
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [backgroundVolume, setBackgroundVolume] = useState(0.1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  // Yorum state'leri
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: "Ayşe",
      rating: 5,
      comment: "Harika bir hikaye! Çocuğum çok sevdi.",
      date: "2 gün önce"
    },
    {
      id: 2,
      user: "Mehmet",
      rating: 4,
      comment: "Çok eğlenceli ve öğretici.",
      date: "1 hafta önce"
    }
  ]);

  useEffect(() => {
    // Ana hikaye sesini yükle
    if (story?.audio) {
      const mainAudio = new Audio(story.audio);
      mainAudio.addEventListener('loadedmetadata', () => {
        setDuration(mainAudio.duration);
      });
      mainAudio.addEventListener('timeupdate', () => {
        setCurrentTime(mainAudio.currentTime);
      });
      mainAudio.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
        if (bgMusicRef.current) {
          bgMusicRef.current.pause();
        }
      });
      audioRef.current = mainAudio;

      // Arka plan müziğini yükle
      const bgMusic = new Audio('/sounds/muzikkutusu1.mp3');
      bgMusic.loop = true;
      bgMusic.volume = backgroundVolume;
      bgMusicRef.current = bgMusic;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    };
  }, [story]);

  useEffect(() => {
    // Sayfa çevirme sesi için audio elementi oluştur
    const pageTurnSound = new Audio('/sounds/page-turn.mp3');
    pageTurnRef.current = pageTurnSound;

    return () => {
      if (pageAudioRef.current) {
        pageAudioRef.current.pause();
        pageAudioRef.current = null;
      }
      if (pageTurnRef.current) {
        pageTurnRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Sayfa değiştiğinde otomatik seslendirme başlat
    if (story?.type === 'book' && story.pages && currentPage > 0) {
      if (pageAudioRef.current) {
        pageAudioRef.current.pause();
      }
      
      // Sayfa çevirme sesi çal
      if (pageTurnRef.current) {
        pageTurnRef.current.play();
      }

      // Mevcut sayfanın sesini yükle ve oynat
      const pageIndex = currentPage * 2 - 1;
      if (story.pages[pageIndex]?.audio) {
        const audio = new Audio(story.pages[pageIndex].audio);
        audio.onended = () => {
          // Sol sayfa bitince sağ sayfayı oku
          if (story.pages[pageIndex + 1]?.audio) {
            const rightAudio = new Audio(story.pages[pageIndex + 1].audio);
            rightAudio.play();
            pageAudioRef.current = rightAudio;
          }
        };
        audio.play();
        pageAudioRef.current = audio;
      }
    }
  }, [currentPage, story]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
    } else {
      audioRef.current.play();
      if (bgMusicRef.current) {
        bgMusicRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handlePlaybackSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    if (bgMusicRef.current) {
      bgMusicRef.current.muted = !isMuted;
    }
  };

  const handleBackgroundVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setBackgroundVolume(newVolume);
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = newVolume;
    }
  };

  // Yorum gönderme fonksiyonu
  const handleSubmitComment = () => {
    if (userComment.trim() === "" || userRating === 0) return;

    const newComment: Comment = {
      id: comments.length + 1,
      user: "Kullanıcı",
      rating: userRating,
      comment: userComment,
      date: "Az önce"
    };

    setComments([newComment, ...comments]);
    setUserComment("");
    setUserRating(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2d1b69] to-[#1a0f40] py-12 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl text-center">
          <h1 className="text-2xl font-bold text-white mb-4 font-fredoka">
            Hikaye Bulunamadı
          </h1>
          <p className="text-gray-200 mb-6">
            Aradığınız hikaye mevcut değil veya kaldırılmış olabilir.
          </p>
          <Link href="/stories" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  // Kitap görünümü için sayfa çevirme fonksiyonları
  const nextPage = () => {
    if (currentPage < (story.pages?.length || 0) / 2) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Kitap türü için özel görünüm
  if (story?.type === 'book') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2d1b69] to-[#1a0f40] py-12 relative overflow-hidden">
        {/* Geri Dönme Butonu */}
        <div className="absolute top-4 left-4 z-50">
          <Link
            href="/stories"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Geri Dön</span>
          </Link>
        </div>

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
          <div className="max-w-6xl mx-auto">
            {/* Kitap Görünümü */}
            <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden perspective mt-8">
              <AnimatePresence mode="wait">
                {/* Kitap Kapağı */}
                {currentPage === 0 ? (
                  <motion.div
                    key="cover"
                    initial={{ opacity: 0, rotateY: -180 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 180 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="grid grid-cols-2 aspect-[2/1] book-pages"
                    style={{ transformOrigin: "center center" }}
                  >
                    {/* Sol Kapak Sayfası - Bilgiler */}
                    <div className="p-8 bg-gradient-to-br from-purple-50 to-white border-r border-purple-100 page-left flex flex-col justify-center items-center relative">
                      <motion.h1 
                        className="text-4xl md:text-5xl font-bold mb-6 font-fredoka"
                      >
                        <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-transparent bg-clip-text animate-gradient">
                          {story.title}
                        </span>
                      </motion.h1>
                      <p className="text-purple-700 text-lg mb-4 text-center">{story.description}</p>
                      <div className="text-sm text-purple-600 text-center">
                        <p>Süre: {story.duration}</p>
                        <p>Kategori: {story.category}</p>
                      </div>
                      {/* Sol Sayfa Butonu */}
                      <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className="absolute bottom-4 left-4 transform bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-all border-4 border-white hover:border-purple-200 hover:shadow-2xl group"
                      >
                        <ArrowLeftCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                        <span className="sr-only">Önceki Sayfa</span>
                      </button>
                    </div>
                    {/* Sağ Kapak Sayfası - Fotoğraf */}
                    <div className="p-8 bg-gradient-to-br from-purple-50 to-white page-right flex items-center justify-center relative">
                      <div className="relative w-full aspect-video">
                        <Image
                          src="/images/toplamhikaye.jpg"
                          alt={story.title}
                          fill
                          className="object-cover rounded-lg shadow-lg"
                          priority
                        />
                      </div>
                      {/* Sağ Sayfa Butonu */}
                      <button
                        onClick={nextPage}
                        className="absolute bottom-4 right-4 transform bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-full shadow-xl hover:scale-110 transition-all border-4 border-white hover:border-purple-200 hover:shadow-2xl group"
                      >
                        <ArrowRightCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                        <span className="sr-only">Sonraki Sayfa</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="pages"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-2 aspect-[2/1] book-pages"
                  >
                    {/* Sol Sayfa */}
                    <motion.div
                      initial={{ opacity: 0, rotateY: -90, x: -100 }}
                      animate={{ opacity: 1, rotateY: 0, x: 0 }}
                      exit={{ opacity: 0, rotateY: 90, x: -100 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="p-8 bg-gradient-to-br from-purple-50 to-white border-r border-purple-100 page-left relative"
                    >
                      <div className="h-full flex flex-col">
                        <div className="relative w-full aspect-video mb-4">
                          <Image
                            src={story.pages[currentPage * 2 - 1]?.image || story.image}
                            alt={`Sayfa ${currentPage * 2 - 1}`}
                            fill
                            className="object-cover rounded-lg shadow-md"
                          />
                        </div>
                        <p className="text-purple-800 text-lg leading-relaxed flex-grow">
                          {story.pages[currentPage * 2 - 1]?.content}
                        </p>
                        <div className="text-sm text-purple-400 text-right mt-4">
                          Sayfa {currentPage * 2 - 1}
                        </div>
                      </div>
                      {/* Sol Sayfa Butonu */}
                      <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className="absolute bottom-4 left-4 transform bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-all border-4 border-white hover:border-purple-200 hover:shadow-2xl group"
                      >
                        <ArrowLeftCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                        <span className="sr-only">Önceki Sayfa</span>
                      </button>
                    </motion.div>

                    {/* Sağ Sayfa */}
                    <motion.div
                      initial={{ opacity: 0, rotateY: 90, x: 100 }}
                      animate={{ opacity: 1, rotateY: 0, x: 0 }}
                      exit={{ opacity: 0, rotateY: -90, x: 100 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="p-8 bg-gradient-to-br from-purple-50 to-white page-right relative"
                    >
                      <div className="h-full flex flex-col">
                        <div className="relative w-full aspect-video mb-4">
                          <Image
                            src={story.pages[currentPage * 2]?.image || story.image}
                            alt={`Sayfa ${currentPage * 2}`}
                            fill
                            className="object-cover rounded-lg shadow-md"
                          />
                        </div>
                        <p className="text-purple-800 text-lg leading-relaxed flex-grow">
                          {story.pages[currentPage * 2]?.content}
                        </p>
                        <div className="text-sm text-purple-400 text-right mt-4">
                          Sayfa {currentPage * 2}
                        </div>
                      </div>
                      {/* Sağ Sayfa Butonu */}
                      <button
                        onClick={nextPage}
                        disabled={currentPage >= (story.pages?.length || 0) / 2}
                        className="absolute bottom-4 right-4 transform bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-full shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-all border-4 border-white hover:border-purple-200 hover:shadow-2xl group"
                      >
                        <ArrowRightCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                        <span className="sr-only">Sonraki Sayfa</span>
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          .animate-twinkle {
            animation: twinkle 3s ease-in-out infinite;
          }
          .animate-gradient {
            background-size: 300% auto;
            animation: shine 6s ease-in-out infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
          }
          @keyframes shine {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .perspective {
            perspective: 2000px;
          }
          .book-pages {
            transform-style: preserve-3d;
          }
          .page-left, .page-right {
            backface-visibility: hidden;
            transform-origin: center;
            position: relative;
          }
          .page-left {
            box-shadow: inset -10px 0 10px -10px rgba(0,0,0,0.2);
          }
          .page-right {
            box-shadow: inset 10px 0 10px -10px rgba(0,0,0,0.2);
          }
          .page-left::after,
          .page-right::after {
            content: '';
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 20%;
            background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.05));
            pointer-events: none;
          }
        `}</style>
      </div>
    );
  }

  // Video türü için özel görünüm
  if (story?.type === 'video') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2d1b69] to-[#1a0f40] py-12 relative overflow-hidden">
        {/* Geri Dönme Butonu */}
        <div className="absolute top-4 left-4 z-50">
          <Link
            href="/stories"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Geri Dön</span>
          </Link>
        </div>

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
          <div className="max-w-8xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sol Kısım - Video Player ve Bilgiler */}
              <div className="lg:col-span-8">
                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
                  {/* Pro/Ücretsiz Etiketi */}
                  <div className="absolute top-4 right-4 z-10">
                    {story.isPro ? (
                      <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <Lock className="w-4 h-4" />
                        <span className="font-bold">Pro</span>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-green-400 to-teal-400 text-white px-4 py-2 rounded-full shadow-lg font-bold">
                        Ücretsiz
                      </div>
                    )}
                  </div>

                  {/* Video Player */}
                  <div className="aspect-video relative">
                    <video
                      src={story.video}
                      controls
                      className="w-full h-full object-cover"
                      poster={story.image}
                    />
                  </div>

                  {/* Video Bilgileri */}
                  <div className="p-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-fredoka">
                      <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-transparent bg-clip-text animate-gradient">
                        {story.title}
                      </span>
                    </h1>
                    <p className="text-purple-800 text-lg mb-6">{story.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/50 rounded-xl p-4">
                        <h3 className="font-semibold text-purple-800 mb-2">Öğrenme Hedefleri</h3>
                        <ul className="list-disc list-inside text-purple-700 space-y-1">
                          <li>Hayal gücünü geliştirme</li>
                          <li>Problem çözme becerilerini artırma</li>
                          <li>Empati duygusunu güçlendirme</li>
                          <li>Yaratıcı düşünmeyi teşvik etme</li>
                        </ul>
                      </div>
                      <div className="bg-white/50 rounded-xl p-4">
                        <h3 className="font-semibold text-purple-800 mb-2">Yaş Grubu ve Süre</h3>
                        <ul className="list-none text-purple-700 space-y-2">
                          <li className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-purple-200 rounded-full flex items-center justify-center">
                              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            </span>
                            Yaş Aralığı: 4-8 yaş
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-purple-200 rounded-full flex items-center justify-center">
                              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            </span>
                            Süre: {story.duration}
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-purple-200 rounded-full flex items-center justify-center">
                              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            </span>
                            Kategori: {story.category}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sağ Kısım - Yorumlar */}
              <div className="lg:col-span-4">
                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 font-fredoka text-purple-800">Yorumlar</h2>
                    
                    {/* Yorum Yapma Formu */}
                    <div className="mb-8 bg-white/50 rounded-xl p-4">
                      <h3 className="text-lg font-semibold mb-4 text-purple-800">Yorum Yap</h3>
                      <div className="space-y-4">
                        {/* Yıldız Derecelendirme */}
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setUserRating(star)}
                              className={`text-2xl transition-colors ${
                                star <= userRating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                        {/* Yorum Metni */}
                        <textarea
                          value={userComment}
                          onChange={(e) => setUserComment(e.target.value)}
                          placeholder="Yorumunuzu buraya yazın..."
                          className="w-full p-3 rounded-lg border border-purple-100 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none resize-none"
                          rows={4}
                        />
                        {/* Gönder Butonu */}
                        <button
                          onClick={handleSubmitComment}
                          disabled={!userComment.trim() || userRating === 0}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Yorum Gönder
                        </button>
                      </div>
                    </div>

                    {/* Yorum Listesi */}
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="bg-white/50 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-purple-800">{comment.user}</span>
                            <div className="flex items-center">
                              <span className="text-yellow-400 mr-1">{'★'.repeat(comment.rating)}</span>
                              <span className="text-gray-300">{'★'.repeat(5 - comment.rating)}</span>
                            </div>
                          </div>
                          <p className="text-purple-700 mb-2">{comment.comment}</p>
                          <span className="text-sm text-purple-400">{comment.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          .animate-twinkle {
            animation: twinkle 3s ease-in-out infinite;
          }
          .animate-gradient {
            background-size: 300% auto;
            animation: shine 6s ease-in-out infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
          }
          @keyframes shine {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    );
  }

  // Diğer hikaye türleri için mevcut görünüm
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d1b69] to-[#1a0f40] py-12 relative overflow-hidden">
      {/* Geri Dönme Butonu */}
      <div className="absolute top-4 left-4 z-50">
        <Link
          href="/stories"
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Geri Dön</span>
        </Link>
      </div>

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
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sol Kısım - Video Player */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-8 bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden lg:sticky lg:top-4 h-fit"
            >
              {/* Pro/Ücretsiz Etiketi */}
              <motion.div 
                className="absolute top-4 right-4 z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {story.isPro ? (
                  <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Lock className="w-4 h-4" />
                    <span className="font-bold">Pro</span>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-green-400 to-teal-400 text-white px-4 py-2 rounded-full shadow-lg font-bold">
                    Ücretsiz
                  </div>
                )}
              </motion.div>

              {/* Video/Ses Oynatıcı */}
              <div className="aspect-video bg-black/30 rounded-2xl mb-8 relative overflow-hidden backdrop-blur-sm group">
                <div className="relative w-full h-full">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover cursor-pointer"
                    priority
                    onClick={togglePlay}
                  />
                  <div 
                    className="absolute inset-0 bg-black/30 cursor-pointer"
                    onClick={togglePlay}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-4 bg-black/75 backdrop-blur-md p-4 rounded-xl transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100">
                        {/* Timeline */}
                        <div className="flex-1 flex items-center gap-2">
                          <span className="text-white text-sm">{formatTime(currentTime)}</span>
                          <input
                            type="range"
                            min="0"
                            max={duration || 100}
                            value={currentTime}
                            onChange={handleTimelineChange}
                            className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                          />
                          <span className="text-white text-sm">{formatTime(duration)}</span>
                        </div>

                        {/* Playback Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePlaybackSpeedChange(0.75)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              playbackSpeed === 0.75 ? 'bg-purple-500' : 'bg-white/10'
                            }`}
                          >
                            <Settings className="w-4 h-4 text-white" />
                          </button>

                          <button
                            onClick={togglePlay}
                            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4 text-white" />
                            ) : (
                              <Play className="w-4 h-4 text-white ml-1" />
                            )}
                          </button>

                          <button
                            onClick={() => handlePlaybackSpeedChange(1.25)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              playbackSpeed === 1.25 ? 'bg-purple-500' : 'bg-white/10'
                            }`}
                          >
                            <Settings className="w-4 h-4 text-white" />
                          </button>
                        </div>

                        {/* Volume Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleMuteToggle}
                            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                          >
                            {isMuted ? (
                              <VolumeX className="w-4 h-4 text-white" />
                            ) : (
                              <Volume2 className="w-4 h-4 text-white" />
                            )}
                          </button>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                          />
                        </div>

                        {/* Arka Plan Müziği Kontrolü */}
                        <div className="flex items-center gap-2 border-l border-white/10 pl-2">
                          <div className="flex items-center gap-2">
                            <Music className="w-4 h-4 text-white" />
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={backgroundVolume}
                              onChange={handleBackgroundVolumeChange}
                              className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Açıklaması */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 mb-8 shadow-xl border border-purple-100">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 font-fredoka">
                  <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-transparent bg-clip-text animate-gradient">
                    {story.title}
                  </span>
                </h2>
                <div className="prose prose-purple max-w-none">
                  <p className="text-purple-900 leading-relaxed mb-4">
                    {story.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/50 rounded-xl p-4">
                      <h3 className="font-semibold text-purple-800 mb-2">Öğrenme Hedefleri</h3>
                      <ul className="list-disc list-inside text-purple-700 space-y-1">
                        <li>Hayal gücünü geliştirme</li>
                        <li>Problem çözme becerilerini artırma</li>
                        <li>Empati duygusunu güçlendirme</li>
                        <li>Yaratıcı düşünmeyi teşvik etme</li>
                      </ul>
                    </div>
                    <div className="bg-white/50 rounded-xl p-4">
                      <h3 className="font-semibold text-purple-800 mb-2">Yaş Grubu ve Süre</h3>
                      <ul className="list-none text-purple-700 space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="w-4 h-4 bg-purple-200 rounded-full flex items-center justify-center">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          </span>
                          Yaş Aralığı: 4-8 yaş
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-4 h-4 bg-purple-200 rounded-full flex items-center justify-center">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          </span>
                          Süre: {story.duration}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-4 h-4 bg-purple-200 rounded-full flex items-center justify-center">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          </span>
                          Kategori: {story.category}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sağ Kısım - Yorumlar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4 space-y-6"
            >
              {/* Kullanıcı Yorumları */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-purple-100">
                <h2 className="text-xl font-bold text-purple-800 mb-4 font-fredoka flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Yorumlar ({comments.length})
                </h2>
                <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {comments.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-purple-100 last:border-0 pb-4 last:pb-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-purple-800">{review.user}</span>
                        <span className="text-sm text-purple-600">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4"
                            fill={i < review.rating ? "#FFB800" : "#E2E8F0"}
                          />
                        ))}
                      </div>
                      <p className="text-purple-900 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Yorum Yazma Alanı */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-purple-100">
                <h2 className="text-xl font-bold text-purple-800 mb-4 font-fredoka flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Yorum Yap
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setUserRating(star)}
                        className={`transform hover:scale-110 transition-all ${
                          star <= userRating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        <Star className="w-6 h-6" fill={star <= userRating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    className="w-full h-24 px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-purple-100 focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-purple-900 placeholder-purple-400 text-sm"
                    placeholder="Hikaye hakkında düşüncelerini paylaş..."
                  />
                  <Button
                    onClick={handleSubmitComment}
                    disabled={userComment.trim() === "" || userRating === 0}
                    className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    <Send className="w-4 h-4" />
                    Yorumu Gönder
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 300% auto;
          animation: shine 6s ease-in-out infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        @keyframes shine {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.4);
        }
      `}</style>
    </div>
  );
} 