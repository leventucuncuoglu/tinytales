"use client";

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from 'next/image';
import { Play, Pause, Volume2, ChevronLeft, Music } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { motion } from "framer-motion";

interface Story {
  title: string;
  content: string;
  characterName: string;
  characterAge: string;
  storyTheme: string;
  additionalDetails: string;
}

export default function CreatePage() {
  const searchParams = useSearchParams();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(true);
  const [volume, setVolume] = useState(0.15); // Varsayılan ses seviyesini 0.15'e düşürdük
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/sounds/muzikkutusu1.mp3');
      if (audioRef.current) {
        audioRef.current.loop = true;
        audioRef.current.volume = volume;
      }
    }

    // Cleanup: Component unmount olduğunda
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      // Seslendirmeyi durdur
      if (synth) {
        synth.cancel();
      }
      setIsPlaying(false);
      setIsMusicPlaying(false);
    };
  }, []);

  useEffect(() => {
    const loadStory = () => {
      const storyParam = searchParams.get('story');
      if (!storyParam) {
        setError('Hikaye verisi bulunamadı');
        setLoading(false);
        return;
      }

      try {
        const storyData = JSON.parse(decodeURIComponent(storyParam));
        setStory(storyData);
        // Modal'ı 3 saniye sonra kapat
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 3000);
      } catch {
        setError('Hikaye yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
      
    };

    loadStory();
  }, [searchParams]);

  // Router değişikliklerini dinle
  useEffect(() => {
    const handleRouteChange = () => {
      // Sayfa değiştiğinde seslendirmeyi ve müziği durdur
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (synth) {
        synth.cancel();
      }
      setIsPlaying(false);
      setIsMusicPlaying(false);
    };

    // Router event listener'ları ekle
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('beforeunload', handleRouteChange);

    return () => {
      // Event listener'ları temizle
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('beforeunload', handleRouteChange);
    };
  }, []);

  const handlePlayPause = () => {
    if (!story) return;

    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Sesli okuma başladığında arka plan müziğini başlat
      if (audioRef.current && !isMusicPlaying) {
        audioRef.current.play();
        setIsMusicPlaying(true);
      }
      if (synth) {
        const utterance = new SpeechSynthesisUtterance(story.content);
        utterance.lang = 'tr-TR';
        utterance.rate = 0.9;
        synth.speak(utterance);
      }
    } else {
      // Sesli okuma durduğunda arka plan müziğini de durdur
      if (audioRef.current) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      }
      if (synth) {
        synth.cancel();
      }
    }
  };

  const handleMusicToggle = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  if (loading || !story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      {/* Animasyonlu Yıldızlar */}
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className={`star ${i % 2 === 0 ? 'star-yellow' : 'star-white'}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`
          }}
        />
      ))}

      <div className="container mx-auto px-4 py-8">
        {/* Geri Dön Butonu */}
        <div className="mb-8">
          <Link href="/stories">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ChevronLeft className="w-5 h-5 mr-2" />
              Geri Dön
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sol - Medya Player (9 birim) */}
          <div className="col-span-9">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-xl">
              <div className="relative h-[500px] rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/olusturulanhikaye.jpg"
                  alt={story.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <button 
                  onClick={handlePlayPause}
                  className="absolute inset-0 flex items-center justify-center hover:bg-black/20 transition-colors group"
                >
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    {isPlaying ? (
                      <Pause className="w-10 h-10 text-white" />
                    ) : (
                      <Play className="w-10 h-10 text-white ml-1" />
                    )}
                  </div>
                </button>
              </div>
              
              {/* Medya Kontrolleri */}
              <div className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                {/* Ses Kontrolü */}
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-white" />
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1"
                    value={volume}
                    className="w-24 accent-purple-500"
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  />
                </div>
                
                {/* Müzik Kontrolü */}
                <button
                  onClick={handleMusicToggle}
                  className={`flex items-center gap-2 ${
                    isMusicPlaying ? 'text-purple-400' : 'text-white'
                  }`}
                >
                  <Music className="w-5 h-5" />
                  <span className="text-sm">Arka Plan Müziği</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sağ - Hikaye Bilgileri (3 birim) */}
          <div className="col-span-3">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-xl h-full">
              <motion.h1 
                className="text-3xl font-bold mb-6"
                animate={{
                  color: ['#8b5cf6', '#ec4899', '#8b5cf6'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {story.title}
              </motion.h1>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <span className="text-purple-300">Karakter</span>
                  <p className="font-semibold">{story.characterName}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <span className="text-purple-300">Yaş</span>
                  <p className="font-semibold">{story.characterAge}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <span className="text-purple-300">Tema</span>
                  <p className="font-semibold">{story.storyTheme}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <span className="text-purple-300">Tür</span>
                  <p className="font-semibold">Sesli Hikaye</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alt - Hikaye İçeriği */}
        <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Hikaye
          </h2>
          <div className="prose prose-invert max-w-none">
            <div className={`relative ${!showFullStory && 'max-h-48 overflow-hidden'}`}>
              {story.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
              {!showFullStory && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-purple-900 to-transparent" />
              )}
            </div>
            <Button
              onClick={() => setShowFullStory(!showFullStory)}
              className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
            >
              {showFullStory ? 'Hikayeyi Kısalt' : 'Devamını Oku'}
            </Button>
          </div>
        </div>
      </div>

      {/* Başarı Modalı */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="fixed top-[15%] left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-purple-600 to-pink-500 text-white border-0 rounded-[32px] max-w-xl w-full mx-4 relative overflow-hidden shadow-2xl z-50">
          <div className="relative p-8">
            {/* Animasyonlu Yıldızlar */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full shadow-lg shadow-yellow-300/50"
                initial={{
                  x: Math.random() * 600,
                  y: Math.random() * 400,
                  scale: 0.5,
                  opacity: 0.3,
                }}
                animate={{
                  x: Math.random() * 600,
                  y: Math.random() * 400,
                  scale: [0.5, 1.5, 0.5],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Yuvarlak Resim */}
            <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <Image
                src="/images/lamba.jpg"
                alt="Sihirli Lamba"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent" />
            </div>

            {/* Mesaj */}
            <div className="text-center relative z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">
                  <span className="text-yellow-300">{story.characterName}</span> için lambadan
                  <br />sihirli hikaye oluşturuluyor...
                </h2>
              </motion.div>

              {/* Loading Animasyonu */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{
                      y: ["0%", "-50%", "0%"],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .star {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          animation: twinkle 3s infinite;
        }

        .star-yellow {
          background: #ffd700;
          box-shadow: 0 0 10px #ffd700;
        }

        .star-white {
          background: #ffffff;
          box-shadow: 0 0 10px #ffffff;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
} 