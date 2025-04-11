"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // Burada gerçek kimlik doğrulama işlemi yapılacak
    // Şimdilik direkt panel sayfasına yönlendiriyoruz
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-700 mb-2">Hoş Geldiniz!</h1>
          <p className="text-purple-600">Hesabınıza giriş yapın</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-purple-700">
              E-posta Adresi
            </label>
            <Input
              id="email"
              name="email"
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
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Giriş Yap
          </Button>

          <div className="text-center text-sm text-purple-600">
            <Link href="/forgot-password" className="hover:underline">
              Şifremi Unuttum
            </Link>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-purple-600">
            Hesabınız yok mu?{" "}
            <Link href="/register" className="text-purple-700 font-semibold hover:underline">
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 