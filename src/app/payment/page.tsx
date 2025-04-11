"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

const planDetails = {
  premium: {
    name: "Premium",
    price: "₺49",
    features: [
      "Sınırsız hikaye oluşturma",
      "Özel tema ve karakterler",
      "Sesli hikaye özelliği",
      "Öncelikli destek hizmeti"
    ]
  },
  unlimited: {
    name: "Unlimited",
    price: "₺99",
    features: [
      "Premium'un tüm özellikleri",
      "AI özelleştirme",
      "7/24 VIP destek",
      "Toplu hikaye oluşturma",
      "Özel API erişimi"
    ]
  }
};

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'premium' | 'unlimited' | null>(null);

  useEffect(() => {
    const plan = searchParams.get('plan') as 'premium' | 'unlimited';
    if (!plan || !planDetails[plan]) {
      router.push('/pricing');
      return;
    }
    setSelectedPlan(plan);
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Burada normalde ödeme işlemi yapılacak
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push('/dashboard');
    } catch (error) {
      console.error('Ödeme işlemi hatası:', error);
      setIsProcessing(false);
    }
  };

  if (!selectedPlan) return null;

  const plan = planDetails[selectedPlan];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sol Taraf - Ödeme Formu */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-purple-800 mb-2">Ödeme Bilgileri</h1>
              <p className="text-purple-600">{plan.name} üyeliğiniz için son adım</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
              {/* Kart Bilgileri */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-purple-700">Kart Bilgileri</h2>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-700">Kart Üzerindeki İsim</label>
                  <Input required placeholder="Ad Soyad" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-700">Kart Numarası</label>
                  <Input required placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-700">Son Kullanma Tarihi</label>
                    <Input required placeholder="AA/YY" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-700">CVV</label>
                    <Input required placeholder="123" type="password" maxLength={3} />
                  </div>
                </div>
              </div>

              {/* Fatura Bilgileri */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-purple-700">Fatura Bilgileri</h2>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-700">Adres</label>
                  <Input required placeholder="Adres" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-700">Şehir</label>
                    <Input required placeholder="Şehir" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-700">Posta Kodu</label>
                    <Input required placeholder="34000" />
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-xl">
                <div className="flex justify-between items-center text-purple-800">
                  <span className="font-semibold">Toplam Tutar:</span>
                  <span className="text-xl font-bold">{plan.price}/ay</span>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isProcessing}
              >
                {isProcessing ? "İşleminiz Gerçekleştiriliyor..." : "Ödemeyi Tamamla"}
              </Button>
            </form>
          </div>

          {/* Sağ Taraf - Bilgi ve Görsel */}
          <div className="space-y-8">
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <Image
                src="/images/sihirli-lamba.jpg"
                alt="Sihirli Lamba"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="bg-purple-50 p-6 rounded-2xl space-y-4">
              <h2 className="text-xl font-semibold text-purple-800">{plan.name} Üyelik Avantajları</h2>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-purple-700">
                    <span className="text-lg">✨</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl">
              <h3 className="font-semibold text-purple-800 mb-2">Güvenli Ödeme</h3>
              <p className="text-purple-700 text-sm">
                Tüm ödemeleriniz 256-bit SSL sertifikası ile şifrelenerek güvenle gerçekleştirilmektedir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 