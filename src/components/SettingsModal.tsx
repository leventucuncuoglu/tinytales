"use client";

import { useSettings } from "@/app/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { X, Moon, Sun, User, Lock } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function SettingsModal() {
  const { isSettingsOpen, setIsSettingsOpen, userSettings, setUserSettings } = useSettings();
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'theme'>('profile');
  const { theme, setTheme } = useTheme();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isSettingsOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => setIsSettingsOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
        >
          {/* Başlık */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-fredoka text-purple-800 dark:text-purple-200">
              Ayarlar
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSettingsOpen(false)}
              className="hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Sekmeler */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('profile')}
              className="gap-2"
            >
              <User className="w-4 h-4" />
              <span>Profil</span>
            </Button>
            <Button
              variant={activeTab === 'password' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('password')}
              className="gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Parola</span>
            </Button>
            <Button
              variant={activeTab === 'theme' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('theme')}
              className="gap-2"
            >
              {theme === 'dark' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
              <span>Tema</span>
            </Button>
          </div>

          {/* Profil Ayarları */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-4"
            >
              <div>
                <label className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1 block">
                  Ad Soyad
                </label>
                <Input
                  value={userSettings.name}
                  onChange={(e) => setUserSettings({ ...userSettings, name: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1 block">
                  E-posta
                </label>
                <Input
                  value={userSettings.email}
                  onChange={(e) => setUserSettings({ ...userSettings, email: e.target.value })}
                  className="w-full"
                  type="email"
                />
              </div>
              <Button className="w-full">Değişiklikleri Kaydet</Button>
            </motion.div>
          )}

          {/* Parola Değiştirme */}
          {activeTab === 'password' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-4"
            >
              <div>
                <label className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1 block">
                  Yeni Parola
                </label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1 block">
                  Parola Tekrar
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button className="w-full">Parolayı Değiştir</Button>
            </motion.div>
          )}

          {/* Tema Ayarları */}
          {activeTab === 'theme' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  onClick={() => setTheme('light')}
                  className="h-24 flex-col gap-2"
                >
                  <Sun className="w-6 h-6" />
                  <span>Aydınlık</span>
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => setTheme('dark')}
                  className="h-24 flex-col gap-2"
                >
                  <Moon className="w-6 h-6" />
                  <span>Karanlık</span>
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 