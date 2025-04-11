"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Home, Book, Wand2, Settings, Crown, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpaceBackground from "@/components/space-background";
import Mascot from "@/components/mascot";
import { useSettings } from "@/hooks/use-settings";
import SettingsModal from "@/components/settings-modal";
import { useTheme } from "next-themes";

const DashboardPage = () => {
  const { setIsSettingsOpen, userSettings } = useSettings();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-black">
      {/* Sol Menü */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-xl z-50 flex flex-col"
      >
        {/* Kullanıcı Profili */}
        <div className="p-6 border-b border-purple-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold font-fredoka">
              {userSettings?.name?.[0] || "K"}
            </div>
            <div>
              <h3 className="font-fredoka text-purple-800 dark:text-purple-200">
                {userSettings?.name || "Kullanıcı"}
              </h3>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                Hikaye Kahramanı
              </p>
            </div>
          </div>
        </div>

        {/* Menü Öğeleri */}
        <nav className="flex-1 p-4 space-y-2">
          <motion.div whileHover={{ scale: 1.02 }} className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 px-4 font-fredoka text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
              asChild
            >
              <Link href="/dashboard" className="flex items-center">
                <Home className="w-5 h-5" />
                <span>Ana Sayfa</span>
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 px-4 font-fredoka text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
              asChild
            >
              <Link href="/stories" className="flex items-center">
                <Book className="w-5 h-5" />
                <span>Hikayeler</span>
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 px-4 font-fredoka text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
              asChild
            >
              <Link href="/create" className="flex items-center">
                <Wand2 className="w-5 h-5" />
                <span>Hikaye Oluştur</span>
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 px-4 font-fredoka text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings className="w-5 h-5" />
              <span>Ayarlar</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 px-4 font-fredoka text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
              asChild
            >
              <Link href="/pricing" className="flex items-center">
                <Crown className="w-5 h-5" />
                <span>Premium</span>
              </Link>
            </Button>
          </motion.div>
        </nav>

        {/* Premium Banner */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-6 text-white">
            <div className="relative z-10">
              <h3 className="font-fredoka text-lg mb-2">Premium'a Yükselt!</h3>
              <p className="text-sm text-purple-100 mb-4">
                Sınırsız hikaye ve özel temalar için hemen yükselt
              </p>
              <Button
                className="w-full bg-white hover:bg-purple-50 text-purple-600"
                asChild
              >
                <Link href="/pricing">Detayları Gör</Link>
              </Button>
            </div>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          </div>
        </motion.div>
      </motion.div>

      <div className="ml-64">
        {/* Hero Section */}
        <div className="relative min-h-[600px] bg-gradient-to-br from-purple-100 via-pink-50 to-white dark:from-purple-900 dark:via-pink-900 dark:to-black overflow-hidden">
          <SpaceBackground />
          
          <div className="container mx-auto px-8 pt-8">
            {/* Ana İçerik */}
            <div className="flex items-start justify-between gap-8">
              {/* Sol Taraf - Başlık ve Butonlar */}
              <div className="relative z-10 max-w-xl pt-8">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-6xl font-fredoka mb-6 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent"
                >
                  Hayal Gücünün<br />Sınırlarını Zorla!
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl bg-gradient-to-r from-purple-500 to-orange-400 bg-clip-text text-transparent mb-8"
                >
                  Bugün nasıl bir maceraya atılmak istersin? Yeni bir hikaye yaz veya sesli hikayeler dinle!
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-4"
                >
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 py-6 font-fredoka text-lg dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600"
                    asChild
                  >
                    <Link href="/create">Hikaye Oluştur</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-purple-300 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-600 rounded-full px-8 py-6 font-fredoka text-lg"
                    asChild
                  >
                    <Link href="/stories">Hikayeleri Keşfet</Link>
                  </Button>
                </motion.div>
              </div>

              {/* Sağ Taraf - Maskot */}
              <div className="relative z-10 hidden md:block">
                {/* Konuşma Balonu */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-4 -left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl z-10"
                  style={{ width: "320px" }}
                >
                  <p className="text-purple-800 dark:text-purple-200 text-lg font-fredoka">
                    Hayal gücünü kullanarak kendi hikayeni yaratmaya ne dersin?
                  </p>
                  <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transform rotate-45" />
                </motion.div>

                {/* Maskot Resmi */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative mt-16"
                >
                  <div className="relative w-[500px] h-[500px]">
                    {/* Parlayan arka plan efekti */}
                    <motion.div
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-purple-400/20 rounded-full blur-3xl"
                    />
                    <Image
                      src="/images/mascot.jpg"
                      alt="Maskot"
                      fill
                      className="object-contain drop-shadow-2xl"
                      priority
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* İstatistik Kartları - Alt Kısım */}
            <div className="grid grid-cols-3 gap-6 -mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900 p-2 flex-shrink-0">
                  <Image
                    src="/images/toplamhikaye.jpg"
                    alt="Toplam Hikaye"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Toplam Hikaye</p>
                  <h3 className="text-2xl font-fredoka text-purple-900 dark:text-purple-100">12</h3>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900 p-2 flex-shrink-0">
                  <Image
                    src="/images/seslihikaye.jpg"
                    alt="Sesli Hikaye"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Sesli Hikaye</p>
                  <h3 className="text-2xl font-fredoka text-blue-900 dark:text-blue-100">5</h3>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900 p-2 flex-shrink-0">
                  <Image
                    src="/images/okumasuresi.jpg"
                    alt="Okuma Süresi"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-sm text-pink-600 dark:text-pink-400">Okuma Süresi</p>
                  <h3 className="text-2xl font-fredoka text-pink-900 dark:text-pink-100">120dk</h3>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Popüler Hikayeler */}
        <div className="container mx-auto px-8 py-16">
          <h2 className="text-3xl font-fredoka text-purple-800 dark:text-purple-200 mb-8">
            Popüler Hikayeler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="relative h-48">
                <Image
                  src="/images/uzaydakimacera.jpg"
                  alt="Uzaydaki Macera"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-fredoka text-purple-800 dark:text-purple-200 mb-2">
                  Uzaydaki Macera
                </h3>
                <p className="text-purple-600 dark:text-purple-400">
                  Uzayda geçen heyecan dolu bir macera hikayesi
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="relative h-48">
                <Image
                  src="/images/sihirliorman.jpg"
                  alt="Sihirli Orman"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-fredoka text-purple-800 dark:text-purple-200 mb-2">
                  Sihirli Orman
                </h3>
                <p className="text-purple-600 dark:text-purple-400">
                  Sihirli ormanın gizemli sakinleriyle tanış
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="relative h-48">
                <Image
                  src="/images/denizinaltinda.jpg"
                  alt="Denizin Altında"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-fredoka text-purple-800 dark:text-purple-200 mb-2">
                  Denizin Altında
                </h3>
                <p className="text-purple-600 dark:text-purple-400">
                  Deniz altındaki renkli dünyayı keşfet
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal />
    </div>
  );
};

export default DashboardPage; 