"use client";

import { Providers } from "@/app/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeProvider>
      <Providers>
        <div className="relative min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          {/* Dark Mode Toggle */}
          <div className="fixed top-4 right-24 z-50">
            <motion.button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="group relative h-10 w-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm hover:shadow-purple-500/20 hover:shadow-xl transition-all duration-300 border border-purple-100 dark:border-purple-800/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={theme === "light" ? "Karanlık Moda Geç" : "Aydınlık Moda Geç"}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Sun className="h-5 w-5 text-yellow-500 rotate-0 scale-100 transition-all duration-300 dark:rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 text-purple-400 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
              </div>
              <span className="sr-only">
                {theme === "light" ? "Karanlık Moda Geç" : "Aydınlık Moda Geç"}
              </span>
              
              {/* Tooltip */}
              <div className="absolute top-12 right-0 w-32 px-2 py-1 bg-white dark:bg-gray-800 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {theme === "light" ? "Karanlık Moda Geç" : "Aydınlık Moda Geç"}
              </div>
            </motion.button>
          </div>

          <Navbar />
          <main className="pt-16 dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900">
            {children}
          </main>
          <Toaster richColors position="top-center" />
        </div>
      </Providers>
    </ThemeProvider>
  );
} 