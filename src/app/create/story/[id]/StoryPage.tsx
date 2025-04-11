'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './StoryPage.module.css';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaMusic } from 'react-icons/fa';
import { MdSlowMotionVideo, MdFastForward, MdMusicNote } from 'react-icons/md';
import Image from 'next/image';

interface Story {
  title: string;
  content: string;
}

interface StoryPageProps {
  id: string;
}

export default function StoryPage({ id }: StoryPageProps) {
  const [story, setStory] = useState<Story | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [backgroundVolume, setBackgroundVolume] = useState(0.3);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [backgroundSound, setBackgroundSound] = useState('none');
  const [audioSrc, setAudioSrc] = useState<string>('/sounds/background.mp3');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const fetchStory = async () => {
      try {
        // Önceki sesleri temizle
        window.speechSynthesis.cancel();
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
          audioRef.current = null;
        }

        const response = await fetch(`/api/generate-story?id=${id}`);
        if (!response.ok) {
          throw new Error('Hikaye yüklenemedi');
        }
        const data = await response.json();
        setStory(data);

        if (data.content) {
          const utterance = new SpeechSynthesisUtterance(data.content);
          utterance.lang = 'tr-TR';
          utterance.rate = playbackSpeed;
          utterance.volume = volume;
          speechRef.current = utterance;

          // Süre bilgisini ayarla
          utterance.onstart = () => {
            setDuration(data.content.length / 5); // Yaklaşık süre
          };
          utterance.onboundary = (event) => {
            setCurrentTime(event.charIndex / 5);
          };
        }
      } catch (error) {
        console.error('Hikaye yüklenirken hata:', error);
      }
    };

    fetchStory();

    // Component unmount olduğunda cleanup
    return () => {
      window.speechSynthesis.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      setIsPlaying(false);
      setBackgroundSound('none');
    };
  }, [id, playbackSpeed, volume]);

  // Router değişikliğini dinle
  useEffect(() => {
    const handleRouteChange = () => {
      window.speechSynthesis.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      setIsPlaying(false);
      setBackgroundSound('none');
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('beforeunload', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('beforeunload', handleRouteChange);
    };
  }, []);

  const togglePlay = () => {
    if (!story || !speechRef.current) return;

    if (!isPlaying) {
      window.speechSynthesis.cancel(); // Önceki sesi temizle
      speechRef.current.rate = playbackSpeed;
      speechRef.current.volume = volume;
      window.speechSynthesis.speak(speechRef.current);
      audioRef.current?.play();
    } else {
      window.speechSynthesis.pause();
      audioRef.current?.pause();
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (speechRef.current) {
      const currentText = speechRef.current.text;
      window.speechSynthesis.cancel();
      const newUtterance = new SpeechSynthesisUtterance(currentText);
      newUtterance.lang = 'tr-TR';
      newUtterance.rate = speed;
      newUtterance.volume = volume;
      speechRef.current = newUtterance;
      
      if (isPlaying) {
        window.speechSynthesis.speak(speechRef.current);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (speechRef.current) {
      speechRef.current.volume = newVolume;
      if (isPlaying) {
        const currentText = speechRef.current.text;
        window.speechSynthesis.cancel();
        const newUtterance = new SpeechSynthesisUtterance(currentText);
        newUtterance.lang = 'tr-TR';
        newUtterance.rate = playbackSpeed;
        newUtterance.volume = newVolume;
        speechRef.current = newUtterance;
        window.speechSynthesis.speak(speechRef.current);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (speechRef.current) {
      speechRef.current.volume = isMuted ? volume : 0;
      if (isPlaying) {
        const currentText = speechRef.current.text;
        window.speechSynthesis.cancel();
        const newUtterance = new SpeechSynthesisUtterance(currentText);
        newUtterance.lang = 'tr-TR';
        newUtterance.rate = playbackSpeed;
        newUtterance.volume = isMuted ? volume : 0;
        speechRef.current = newUtterance;
        window.speechSynthesis.speak(speechRef.current);
      }
    }
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (speechRef.current && story) {
      const charIndex = Math.floor(time * 5);
      const text = story.content;
      window.speechSynthesis.cancel();
      const newUtterance = new SpeechSynthesisUtterance(text.slice(charIndex));
      newUtterance.lang = 'tr-TR';
      newUtterance.rate = playbackSpeed;
      newUtterance.volume = volume;
      speechRef.current = newUtterance;
      if (isPlaying) {
        window.speechSynthesis.speak(speechRef.current);
      }
    }
  };

  const handleBackgroundSound = (type: string) => {
    const currentTime = audioRef.current?.currentTime || 0;
    const wasPlaying = isPlaying;
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    let newSrc = '';
    switch (type) {
      case 'music':
        newSrc = '/sounds/muzikkutusu1.mp3';
        break;
      case 'nature':
        newSrc = '/sounds/muzikkutusu2.mp3';
        break;
      case 'wind':
        newSrc = '';
        break;
      default:
        newSrc = '';
    }
    
    setAudioSrc(newSrc);
    setBackgroundSound(type);
    
    if (newSrc) {
      const newAudio = new Audio(newSrc);
      newAudio.loop = true;
      newAudio.volume = backgroundVolume;
      audioRef.current = newAudio;
      
      if (wasPlaying) {
        newAudio.play().then(() => {
          if (currentTime > 0) {
            newAudio.currentTime = currentTime;
          }
        });
      }
    }
  };

  const handleBackgroundVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setBackgroundVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  if (!story) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingText}>Hikaye yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.mediaSection}>
          <div className={styles.mediaPlayer}>
            <div className={styles.mediaContent}>
              <Image
                src="/images/uzay.jpg"
                alt="Media Player Background"
                layout="fill"
                objectFit="cover"
                className={styles.mediaBackground}
              />
            </div>
            <div className={styles.playerControls}>
              <div className={styles.timeline}>
                <span className={styles.timeDisplay}>{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleTimelineChange}
                  className={styles.timelineSlider}
                />
                <span className={styles.timeDisplay}>{formatTime(duration)}</span>
              </div>
              
              <div className={styles.playbackControls}>
                <button 
                  onClick={() => handleSpeedChange(0.75)} 
                  className={`${styles.speedButton} ${playbackSpeed === 0.75 ? styles.active : ''}`}
                >
                  <MdSlowMotionVideo />
                </button>
                <button onClick={togglePlay} className={styles.playButton}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button 
                  onClick={() => handleSpeedChange(1.25)} 
                  className={`${styles.speedButton} ${playbackSpeed === 1.25 ? styles.active : ''}`}
                >
                  <MdFastForward />
                </button>
              </div>

              <div className={styles.volumeControls}>
                <div className={styles.volumeControl}>
                  <button onClick={toggleMute} className={styles.muteButton}>
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>
                  <div className={styles.volumeSliderContainer}>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className={styles.volumeSlider}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.backgroundSounds}>
                <button 
                  onClick={() => handleBackgroundSound('music')} 
                  className={`${styles.soundButton} ${backgroundSound === 'music' ? styles.active : ''}`}
                  title="Müzik Kutusu 1"
                >
                  <FaMusic />
                </button>
                <button 
                  onClick={() => handleBackgroundSound('nature')} 
                  className={`${styles.soundButton} ${backgroundSound === 'nature' ? styles.active : ''}`}
                  title="Müzik Kutusu 2"
                >
                  <MdMusicNote />
                </button>
                <div className={styles.volumeControl}>
                  <button 
                    onClick={() => handleBackgroundSound('wind')} 
                    className={`${styles.soundButton} ${backgroundSound === 'wind' ? styles.active : ''}`}
                    title="Sesi Kapat"
                  >
                    <FaVolumeMute />
                  </button>
                  <div className={styles.volumeSliderContainer}>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={backgroundVolume}
                      onChange={handleBackgroundVolumeChange}
                      className={styles.volumeSlider}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.storyInfo}>
          <div className={styles.storyHeader}>
            <h1 className={styles.title}>{story.title}</h1>
          </div>
          <div className={styles.storyImage}>
            <Image 
              src="/images/lamba.jpg"
              alt={story.title}
              width={400}
              height={300}
              objectFit="cover"
            />
          </div>
          <div className={styles.storyDetails}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Kahraman:</span>
              <span className={styles.detailValue}>Ahmer</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Konu:</span>
              <span className={styles.detailValue}>Kaza</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Yaş Grubu:</span>
              <span className={styles.detailValue}>2-7 yaş</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.storyContent}>
        {showFullStory ? (
          story.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))
        ) : (
          <>
            <p className={styles.paragraph}>
              {story.content.split('\n\n')[0]}
            </p>
            <p className={styles.paragraph}>
              {story.content.split('\n\n')[1]}
            </p>
          </>
        )}
        <button
          onClick={() => setShowFullStory(!showFullStory)}
          className={styles.readMoreButton}
        >
          {showFullStory ? 'Daha Az Göster' : 'Devamını Oku'}
        </button>
      </div>
    </div>
  );
} 