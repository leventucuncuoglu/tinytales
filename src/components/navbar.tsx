"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-100 dark:border-gray-800 z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="h-14 w-20 relative">
              <Image
                src="/images/sihirli-lamba.jpg"
                alt="Sihirli Lamba"
                width={120}
                height={96}
                className="h-full w-full object-cover rounded-xl opacity-95 dark:opacity-90"
                style={{
                  filter: 'drop-shadow(0 0 5px rgba(168, 85, 247, 0.15))'
                }}
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/blog"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              Bloglar
            </Link>
            <Link 
              href="/about"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              Hakkımızda
            </Link>
            <Link 
              href="/pricing"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              Paketler
            </Link>
            <Link 
              href="/contact"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              İletişim
            </Link>

            {/* Auth Buttons */}
            <Button
              asChild
              variant="ghost"
              className="rounded-full hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-500 hover:text-white"
            >
              <Link href="/login">Giriş</Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
            >
              <Link href="/register">Kayıt Ol</Link>
            </Button>

            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <button className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                TR
              </button>
              <span className="text-gray-300">|</span>
              <button className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                ENG
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full w-9 h-9 p-0 hover:bg-purple-50 dark:hover:bg-purple-900/50 flex items-center justify-center text-gray-700 dark:text-gray-300"
              aria-label="Tema Değiştir"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
} 