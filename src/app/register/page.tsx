"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Burada normalde API'ye kayıt isteği atılacak
    // Şimdilik direkt pricing sayfasına yönlendiriyoruz
    setTimeout(() => {
      router.push("/pricing");
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-700 mb-2">Kayıt Ol</h1>
          <p className="text-purple-600">Yeni bir hesap oluşturun</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-purple-700">
              Ad Soyad
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Ad Soyad"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-purple-700">
              E-posta Adresi
            </label>
            <Input
              id="email"
              type="email"
              placeholder="ornek@mail.com"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-purple-700">
              Şifre
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-purple-700">
              Şifre Tekrar
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              className="w-full"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? "Kaydediliyor..." : "Kayıt Ol"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-purple-600">
            Zaten hesabınız var mı?{" "}
            <Link href="/login" className="text-purple-700 font-semibold hover:underline">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 