import { sleepSounds } from "@/app/data/stories";
import { notFound } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { ArrowLeft, Moon, Play } from "lucide-react";

export default function SleepSoundPage({ params }: { params: { id: string } }) {
  const story = sleepSounds.find((s) => s.id === parseInt(params.id));

  if (!story) {
    return notFound();
  }

  // Rastgele yıldızlar oluştur
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`
  }));

  return (
    <div className={styles.container}>
      {/* Yıldızlar */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={styles.star}
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.animationDelay
          }}
        />
      ))}

      <Link href="/stories" className={styles.backButton}>
        <ArrowLeft className="w-5 h-5" />
        Şarkılara Dön
      </Link>

      <div className={styles.playerCard}>
        <div className={styles.imageWrapper}>
          <Image
            src={story.image}
            alt={story.title}
            width={800}
            height={500}
            className={styles.storyImage}
            priority
          />
          <div className={styles.imageOverlay}>
            <div className={styles.audioPlayer}>
              <audio
                controls
                src={story.audio}
                className={styles.audio}
                autoPlay
              >
                Tarayıcınız audio elementini desteklemiyor.
              </audio>
            </div>
          </div>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{story.title}</h1>
            <p className={styles.info}>
              <Moon className="inline-block w-4 h-4 mr-1" />
              {story.duration} • {story.category}
            </p>
          </div>
        </div>

        <p className={styles.description}>{story.description}</p>
      </div>
    </div>
  );
} 