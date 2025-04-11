"use client";

import { useSettings } from "@/hooks/use-settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsModal() {
  const { isSettingsOpen, setIsSettingsOpen, userSettings, setUserSettings } = useSettings();

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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-fredoka text-purple-800 dark:text-purple-200 mb-6">
            Ayarlar
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                İsim
              </Label>
              <Input
                type="text"
                value={userSettings?.name || ""}
                onChange={(e) => setUserSettings({ name: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                placeholder="İsminizi girin"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tema
              </Label>
              <Select
                value={userSettings?.theme || "light"}
                onValueChange={(value) => setUserSettings({ theme: value as "light" | "dark" })}
              >
                <SelectTrigger className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <SelectValue placeholder="Tema seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Açık</SelectItem>
                  <SelectItem value="dark">Koyu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Dil
              </Label>
              <Select
                value={userSettings?.language || "tr"}
                onValueChange={(value) => setUserSettings({ language: value as "tr" | "en" })}
              >
                <SelectTrigger className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <SelectValue placeholder="Dil seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tr">Türkçe</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsSettingsOpen(false)}
              className="px-6 py-2 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            >
              İptal
            </Button>
            <Button
              onClick={() => setIsSettingsOpen(false)}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Kaydet
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 