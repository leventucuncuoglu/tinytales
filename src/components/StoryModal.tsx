"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Volume2, VolumeX, SkipBack, Play, Pause, SkipForward } from "lucide-react";

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: {
    title: string;
    content: string;
    image?: string;
  };
}

const backgroundMusics = [
  { id: 1, name: "Huzurlu Orman", url: "/music/peaceful-forest.mp3" },
  { id: 2, name: "Sihirli Melodiler", url: "/music/magical-melodies.mp3" },
  { id: 3, name: "Yıldızlı Gece", url: "/music/starry-night.mp3" },
  { id: 4, name: "Deniz Sesleri", url: "/music/ocean-waves.mp3" },
];

export default function StoryModal({ isOpen, onClose, story }: StoryModalProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMusic, setCurrentMusic] = useState(backgroundMusics[0]);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white animate-slide-up">
      <div className="h-full flex flex-col">
        {/* Üst Bar */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-2xl font-bold text-purple-700">{story.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Ana İçerik */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {story.image && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="prose prose-lg max-w-none">
              <p className="font-story text-xl leading-relaxed text-purple-900">
                {story.content}
              </p>
            </div>
          </div>
        </div>

        {/* Müzik Çalar */}
        <div className="border-t bg-white p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {/* Müzik Seçici */}
              <select
                className="bg-purple-50 border border-purple-100 rounded-lg px-4 py-2 text-purple-700"
                onChange={(e) => setCurrentMusic(backgroundMusics[Number(e.target.value) - 1])}
                value={currentMusic.id}
              >
                {backgroundMusics.map((music) => (
                  <option key={music.id} value={music.id}>
                    {music.name}
                  </option>
                ))}
              </select>

              {/* Kontroller */}
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <SkipBack className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
                <Button variant="ghost" size="icon">
                  <SkipForward className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? (
                    <VolumeX className="h-6 w-6" />
                  ) : (
                    <Volume2 className="h-6 w-6" />
                  )}
                </Button>
              </div>

              {/* İlerleme Çubuğu */}
              <div className="w-full max-w-md mx-4">
                <div className="h-2 bg-purple-100 rounded-full">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: "45%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 