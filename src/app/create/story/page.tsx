"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Music, Wind, Bird } from "lucide-react";

export default function StoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storyId = searchParams.get('id');
  
  const [story, setStory] = useState<{ title: string; content: string } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [backgroundSounds, setBackgroundSounds] = useState({
    music: false,
    nature: false,
    birds: false
  });

  // Sayfa yüklendiğinde ve kaldırıldığında çalışacak
  useEffect(() => {
    // Cleanup function
    return () => {
      // Sesli okumayı durdur
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      // Tüm arka plan seslerini durdur
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => audio.pause());
      // State'i sıfırla
      setIsPlaying(false);
      setBackgroundSounds({
        music: false,
        nature: false,
        birds: false
      });
    };
  }, []);

  // Hikayeyi yükle
  useEffect(() => {
    const fetchStory = async () => {
      if (!storyId) return;
      
      try {
        const response = await fetch(`/api/story?id=${storyId}`);
        if (!response.ok) throw new Error('Hikaye bulunamadı');
        
        const data = await response.json();
        setStory(data);
      } catch (error) {
        console.error('Hikaye yüklenirken hata:', error);
      }
    };

    fetchStory();
  }, [storyId]);

  // Text-to-speech fonksiyonları
  const speak = (text: string) => {
    if (!window.speechSynthesis) return;

    // Önceki konuşmayı durdur
    window.speechSynthesis.cancel();

    // Yeni konuşma oluştur
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.9;
    utterance.volume = volume / 100;

    // Konuşma bittiğinde
    utterance.onend = () => {
      setIsPlaying(false);
    };

    // Hata durumunda
    utterance.onerror = (event) => {
      console.error('Sesli okuma hatası:', event);
      setIsPlaying(false);
    };

    // Konuşmayı başlat
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!story) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      speak(story.content);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    
    // Aktif konuşmanın sesini değiştir
    if (isPlaying && story) {
      window.speechSynthesis.cancel();
      speak(story.content);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (window.speechSynthesis.speaking) {
      if (!isMuted) {
        window.speechSynthesis.pause();
      } else {
        window.speechSynthesis.resume();
      }
    }
  };

  // Arka plan sesleri
  const toggleBackgroundSound = (type: 'music' | 'nature' | 'birds') => {
    setBackgroundSounds(prev => {
      const newState = { ...prev, [type]: !prev[type] };
      const audio = document.querySelector(`audio[data-type="${type}"]`) as HTMLAudioElement;
      
      if (audio) {
        if (newState[type]) {
          audio.volume = 0.2;
          audio.play().catch(error => {
            console.error(`Ses çalma hatası (${type}):`, error);
          });
        } else {
          audio.pause();
        }
      }
      
      return newState;
    });
  };

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-12 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-3xl font-comic text-purple-600 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-xl"
        >
          Sihirli Hikaye Yükleniyor... ✨
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Başlık */}
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-comic text-center mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent"
          >
            {story.title}
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sol Taraf - Media Player */}
            <div className="md:col-span-1">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl"
              >
                {/* Oynatma Butonu */}
                <div className="flex justify-center mb-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg text-white"
                  >
                    {isPlaying ? (
                      <Pause className="w-10 h-10" />
                    ) : (
                      <Play className="w-10 h-10 ml-1" />
                    )}
                  </motion.button>
                </div>

                {/* Ses Kontrolü */}
                <div className="flex items-center space-x-3 mb-6 bg-purple-50 p-3 rounded-xl">
                  <button
                    onClick={toggleMute}
                    className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-6 h-6 text-purple-600" />
                    ) : (
                      <Volume2 className="w-6 h-6 text-purple-600" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-2 bg-purple-200 rounded-full appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                {/* Arka Plan Sesleri */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { type: 'music' as const, icon: Music, label: 'Müzik' },
                    { type: 'nature' as const, icon: Wind, label: 'Doğa' },
                    { type: 'birds' as const, icon: Bird, label: 'Kuşlar' }
                  ].map(({ type, icon: Icon, label }) => (
                    <button
                      key={type}
                      onClick={() => toggleBackgroundSound(type)}
                      className={`flex flex-col items-center p-3 rounded-xl transition-colors ${
                        backgroundSounds[type]
                          ? 'bg-purple-100 text-purple-600'
                          : 'hover:bg-purple-50 text-gray-600'
                      }`}
                    >
                      <Icon className="w-6 h-6 mb-1" />
                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sağ Taraf - Hikaye */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="md:col-span-2 bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl"
            >
              <div className="prose prose-lg max-w-none">
                {story.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-4 text-lg font-comic leading-relaxed text-gray-700"
                    >
                      {paragraph}
                    </motion.p>
                  )
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Arka plan ses elementleri */}
      <audio data-type="music" src="/sounds/background-music.mp3" loop />
      <audio data-type="nature" src="/sounds/nature.mp3" loop />
      <audio data-type="birds" src="/sounds/birds.mp3" loop />
    </div>
  );
} 