"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();

  const handlePlanSelect = (planType: string) => {
    if (planType === 'free') {
      router.push('/dashboard');
    } else {
      // Seçilen planı URL parametresi olarak ekliyoruz
      router.push(`/payment?plan=${planType}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            Size Uygun Planı Seçin
          </h1>
          <p className="text-xl text-purple-600">
            Her ihtiyaca uygun esnek fiyatlandırma seçenekleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-2">Free</h2>
              <div className="text-4xl font-bold text-purple-600 mb-4">
                ₺0<span className="text-lg font-normal text-purple-400">/ay</span>
              </div>
              <p className="text-purple-600">Başlangıç için ideal</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-purple-700">
                <span className="mr-2">✓</span>
                5 hikaye/ay
              </li>
              <li className="flex items-center text-purple-700">
                <span className="mr-2">✓</span>
                Temel temalar
              </li>
              <li className="flex items-center text-purple-700">
                <span className="mr-2">✓</span>
                Standart destek
              </li>
            </ul>

            <Button 
              onClick={() => handlePlanSelect('free')}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Ücretsiz Başla
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm">
                En Popüler
              </span>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-2">Premium</h2>
              <div className="text-4xl font-bold text-purple-600 mb-4">
                ₺49<span className="text-lg font-normal text-purple-400">/ay</span>
              </div>
              <p className="text-purple-600">Aktif kullanıcılar için</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-purple-700">
                <span className="mr-2">✓</span>
                Sınırsız hikaye
              </li>
              <li className="flex items-center text-purple-700">
                <span className="mr-2">✓</span>
                Tüm temalar
              </li>
              <li className="flex items-center text-purple-700">
                <span className="mr-2">✓</span>
                Öncelikli destek
              </li>
              <li className="flex items-center text-purple-700">
                <span className="mr-2">✓</span>
                Sesli hikaye özelliği
              </li>
            </ul>

            <Button 
              onClick={() => handlePlanSelect('premium')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Premium'a Geç
            </Button>
          </div>

          {/* Unlimited Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-2">Unlimited</h2>
              <div className="text-4xl font-bold text-purple-600 mb-4">
                ₺99<span className="text-lg font-normal text-purple-400">/ay</span>
              </div>
              <p className="text-purple-600">Profesyonel kullanım için</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-purple-700">
                <span className="mr-2">✓</span>
                Sınırsız her şey
              </li>
              <li className="flex items-center text-purple-700">
                <span className="mr-2">✓</span>
                Özel temalar
              </li>
              <li className="flex items-center text-purple-700">
                <span className="mr-2">✓</span>
                7/24 VIP destek
              </li>
              <li className="flex items-center text-purple-700">
                <span className="mr-2">✓</span>
                AI özelleştirme
              </li>
              <li className="flex items-center text-purple-700">
                <span className="mr-2">✓</span>
                Toplu hikaye oluşturma
              </li>
            </ul>

            <Button 
              onClick={() => handlePlanSelect('unlimited')}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Unlimited'a Geç
            </Button>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-purple-600 text-lg">
            30 gün içinde iade garantisi. Risk olmadan deneyin!
          </p>
        </div>
      </div>
    </div>
  );
} 