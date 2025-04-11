"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef } from "react";

const stats = [
  { 
    number: "50K+", 
    label: "Mutlu Çocuk",
    icon: "👶",
    description: "Binlerce çocuğun hayal dünyasına dokunduk"
  },
  { 
    number: "100K+", 
    label: "Oluşturulan Hikaye",
    icon: "📚",
    description: "Her biri benzersiz ve özel hikayeler"
  },
  { 
    number: "4.9/5", 
    label: "Kullanıcı Puanı",
    icon: "⭐",
    description: "Ebeveynlerin güvenini kazandık"
  },
  { 
    number: "30+", 
    label: "Hikaye Teması",
    icon: "🎨",
    description: "Sınırsız hayal gücü için çeşitli temalar"
  },
];

const testimonials = [
  {
    name: "Ayşe H.",
    role: "Anne",
    content: "Kızım artık her akşam kendi hikayesini dinlemek istiyor. Harika bir uygulama! Özellikle sesli masallar çok başarılı.",
    avatar: "https://ui-avatars.com/api/?name=Ayşe+H&background=7c3aed&color=fff",
    rating: 5,
    date: "2 gün önce"
  },
  {
    name: "Mehmet K.",
    role: "Baba",
    content: "Oğlumun hayal gücü bu hikayelerle inanılmaz gelişti. Çok memnunuz. Her gün yeni bir macera yaşıyoruz.",
    avatar: "https://ui-avatars.com/api/?name=Mehmet+K&background=7c3aed&color=fff",
    rating: 5,
    date: "3 gün önce"
  },
  {
    name: "Zeynep A.",
    role: "Öğretmen",
    content: "Öğrencilerim için mükemmel bir kaynak. Her biri kendi hikayelerini heyecanla bekliyor. Eğitici yönü çok güçlü!",
    avatar: "https://ui-avatars.com/api/?name=Zeynep+A&background=7c3aed&color=fff",
    rating: 5,
    date: "1 hafta önce"
  },
  {
    name: "Elif D.",
    role: "Anne",
    content: "Çocuğumun okuma alışkanlığı kazanmasında çok yardımcı oldu. Artık kitaplarla daha çok vakit geçiriyor.",
    avatar: "https://ui-avatars.com/api/?name=Elif+D&background=7c3aed&color=fff",
    rating: 5,
    date: "5 gün önce"
  },
  {
    name: "Can B.",
    role: "Baba",
    content: "İkizlerim için özelleştirilmiş hikayeler harika! Her gece farklı bir macera yaşıyoruz. Çok keyifli vakit geçiriyoruz.",
    avatar: "https://ui-avatars.com/api/?name=Can+B&background=7c3aed&color=fff",
    rating: 5,
    date: "1 gün önce"
  },
  {
    name: "Selin Y.",
    role: "Anne",
    content: "Yapay zeka teknolojisiyle oluşturulan hikayeler gerçekten çok yaratıcı. Kızım bayılıyor!",
    avatar: "https://ui-avatars.com/api/?name=Selin+Y&background=7c3aed&color=fff",
    rating: 5,
    date: "4 gün önce"
  },
  {
    name: "Ahmet R.",
    role: "Baba",
    content: "Çocuğumla kaliteli zaman geçirmek için harika bir fırsat. Birlikte hikaye oluşturmak çok keyifli.",
    avatar: "https://ui-avatars.com/api/?name=Ahmet+R&background=7c3aed&color=fff",
    rating: 5,
    date: "6 gün önce"
  },
  {
    name: "Deniz K.",
    role: "Anne",
    content: "Bu platform sayesinde çocuğumun hayal dünyası çok zenginleşti. Her akşam yeni bir macera!",
    avatar: "https://ui-avatars.com/api/?name=Deniz+K&background=7c3aed&color=fff",
    rating: 5,
    date: "2 hafta önce"
  }
];

const sampleStories = [
  {
    title: "Ayşe'nin Uzay Macerası",
    summary: "Küçük Ayşe'nin uzay gemisiyle yıldızlar arasında yaptığı unutulmaz yolculuk.",
    theme: "uzay",
    age: "5-8",
    duration: "5 dk",
    image: "/images/uzay.jpg",
  },
  {
    title: "Orman Kahramanı Mert",
    summary: "Mert ve sevimli köpeği Max'in ormandaki hayvanları kurtarma macerası.",
    theme: "orman",
    age: "4-7",
    duration: "4 dk",
    image: "/images/orman.jpg",
  },
  {
    title: "Deniz Kızı Lena",
    summary: "Lena'nın okyanuslarda keşfettiği gizemli hazineler ve yeni arkadaşlıklar.",
    theme: "deniz",
    age: "6-9",
    duration: "6 dk",
    image: "/images/denizkizi.jpg",
  },
  {
    title: "Sihirli Sirk",
    summary: "Ali'nin sirkteki akrobatlar ve sihirbazlarla yaşadığı büyülü bir gün.",
    theme: "sirk",
    age: "5-8",
    duration: "5 dk",
    image: "/images/sirk.jpg",
  },
];

const featuredBlogs = [
  {
    id: 1,
    title: "Hayal Gücünün Gücü: Masallar ve Çocukların İç Dünyası",
    author: "Uzman Psikolog Dr. Elif Demir",
    excerpt: "Günümüzde çocukların zihinlerini eğlendiren, aynı zamanda zenginleştiren araçların başında masallar geliyor...",
    category: "Psikoloji",
    image: "/images/doktor1.jpg",
    readTime: "6 dk",
    date: "15 Mart 2024"
  },
  {
    id: 2,
    title: "Teknoloji ve Masallar: Dijital Çağda Hikaye Anlatıcılığı",
    author: "Eğitim Teknoloğu Doç. Dr. Mert Yalçın",
    excerpt: "Bir dönem sadece büyüklerin elinde tuttuğu tozlu masal kitapları, bugün yapay zeka destekli platformlar sayesinde...",
    category: "Teknoloji",
    image: "/images/doktor2.jpg",
    readTime: "5 dk",
    date: "14 Mart 2024"
  },
  {
    id: 3,
    title: "Duygusal Zeka Gelişiminde Hikayelerin Rolü",
    author: "Çocuk Gelişim Uzmanı Uzm. Ayşe Kara",
    excerpt: "Çocuğunuzun sadece matematikte veya fen bilimlerinde başarılı olması değil, aynı zamanda duygusal olarak da güçlü...",
    category: "Gelişim",
    image: "/images/doktor3.jpg",
    readTime: "7 dk",
    date: "13 Mart 2024"
  },
];

const features = [
  {
    title: "Yapay Zeka Destekli",
    description: "En son yapay zeka teknolojileri ile kişiselleştirilmiş hikayeler",
    icon: "/images/yapay-zeka.jpg",
  },
  {
    title: "Sesli Hikayeler",
    description: "Profesyonel seslendirme ile masalları dinleme deneyimi",
    icon: "/images/sesli-hikaye.jpg",
  },
  // ... diğer özellikler aynı ...
];

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center py-12 overflow-hidden">
        {/* Hareketli Yıldızlar */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              filter: 'drop-shadow(0 0 4px rgba(250, 204, 21, 0.7))'
            }}
          />
        ))}

        {/* Hareketli Balonlar */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`balloon-${i}`}
            className="absolute w-8 h-8 rounded-full bg-pink-400/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 4}s`,
              animationDelay: `${Math.random() * 2}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Sol Taraf - Başlık ve Butonlar */}
            <div className="flex-1 text-center lg:text-left relative z-10">
              <div className="mb-8 max-w-[400px] mx-auto lg:mx-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl filter blur-3xl"></div>
                  <Image
                    src="/images/sihirli-lamba.jpg"
                    alt="Sihirli Lamba"
                    width={400}
                    height={300}
                    className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Sihirli Lambadan
                </span>
                <br />
                <span className="text-purple-950">
                  Masallar Fısıldayın...
                </span>
              </h1>
              <p className="text-lg md:text-xl text-purple-700 mb-8">
                Çocuğunuzun hayal gücünü besleyen, her gece yeni bir macera sunan sihirli masallar dünyasına hoş geldiniz!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  className="h-14 px-8 text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 shadow-lg transform hover:scale-105 transition-all duration-300 rounded-full"
                  asChild
                >
                  <Link href="/create">
                    <span className="flex items-center gap-2">
                      <span>✨</span>
                      Hikaye Yarat
                      <span>✨</span>
                    </span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-14 px-8 text-lg border-purple-200 hover:bg-purple-50 shadow-lg transform hover:scale-105 transition-all duration-300 rounded-full"
                  asChild
                >
                  <Link href="/stories">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                      <span className="bg-gradient-to-r from-orange-500 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                        📚 Hazır Hikayeler
                      </span>
                    </span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Sağ Taraf - Story Tree */}
            <div className="flex-1 relative">
              <div className="relative w-full max-w-2xl mx-auto -mt-24">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <Image
                    src="/images/story-tree.jpg"
                    alt="Masal Ağacı"
                    width={700}
                    height={700}
                    className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
                {/* Uygulama Mağazası Butonları */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 px-4">
                  <Link 
                    href="#" 
                    className="transform hover:scale-105 transition-all duration-300 w-full sm:w-64"
                  >
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-xl shadow-lg flex items-center gap-3 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                      </svg>
                      <div>
                        <div className="text-xs">HEMEN İNDİR</div>
                        <div className="text-lg font-bold">Google Play Store</div>
                      </div>
                    </div>
                  </Link>
                  <Link 
                    href="#" 
                    className="transform hover:scale-105 transition-all duration-300 w-full sm:w-64"
                  >
                    <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4 rounded-xl shadow-lg flex items-center gap-3 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                      <div>
                        <div className="text-xs">HEMEN İNDİR</div>
                        <div className="text-lg font-bold">App Store</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="mt-16 md:mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
          {/* Mutlu Çocuk */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center relative overflow-hidden group">
            <div className="relative h-20 w-20 mx-auto mb-4">
              <Image
                src="/images/50k.jpg"
                alt="Mutlu Çocuk"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>
            <h3 className="text-4xl font-bold text-purple-600 mb-2">50K+</h3>
            <h4 className="text-xl font-semibold text-purple-800 mb-2">Mutlu Çocuk</h4>
            <p className="text-purple-600 text-sm">Binlerce çocuğun hayal dünyasına dokunduk</p>
          </div>

          {/* Oluşturulan Hikaye */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center relative overflow-hidden group">
            <div className="relative h-20 w-20 mx-auto mb-4">
              <Image
                src="/images/olusturulanhikaye.jpg"
                alt="Oluşturulan Hikaye"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <h3 className="text-4xl font-bold text-purple-600 mb-2">100K+</h3>
            <h4 className="text-xl font-semibold text-purple-800 mb-2">Oluşturulan Hikaye</h4>
            <p className="text-purple-600 text-sm">Her biri benzersiz ve özel hikayeler</p>
          </div>

          {/* Kullanıcı Puanı */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center relative overflow-hidden group">
            <div className="relative h-20 w-20 mx-auto mb-4">
              <Image
                src="/images/kullanicipuani.jpg"
                alt="Kullanıcı Puanı"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <h3 className="text-4xl font-bold text-purple-600 mb-2">4.9/5</h3>
            <h4 className="text-xl font-semibold text-purple-800 mb-2">Kullanıcı Puanı</h4>
            <p className="text-purple-600 text-sm">Ebeveynlerin güvenini kazandık</p>
          </div>

          {/* Hikaye Teması */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center relative overflow-hidden group">
            <div className="relative h-20 w-20 mx-auto mb-4">
              <Image
                src="/images/hikayetemasi.jpg"
                alt="Hikaye Teması"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <h3 className="text-4xl font-bold text-purple-600 mb-2">30+</h3>
            <h4 className="text-xl font-semibold text-purple-800 mb-2">Hikaye Teması</h4>
            <p className="text-purple-600 text-sm">Sınırsız hayal gücü için çeşitli temalar</p>
          </div>
        </div>
      </section>

      {/* Özelliklerimiz */}
      <section className="py-24 bg-gradient-to-b from-purple-50 via-white to-purple-50 relative overflow-hidden">
        {/* Arkaplan Efektleri */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 relative">
          {/* Başlık */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Sihirli Dünyamızda Neler Var?
            </h2>
            <p className="text-lg text-purple-600">
              Çocuğunuzun hayal dünyasını zenginleştirmek için özel olarak tasarlandı
            </p>
          </div>

          {/* Özellik Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Mobil Uygulama */}
            <div className="group">
              <div className="relative h-72 mb-8 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                <img
                  src="/images/telefon.jpg"
                  alt="Mobil Uygulama"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Mobil Uygulama</h3>
                  <p className="text-purple-100">Her an, her yerde yeni hikayeler</p>
                </div>
              </div>
              <div className="space-y-4 px-2">
                <p className="text-purple-800 leading-relaxed">
                  Çocuğunuz için özel hikayeler oluşturmak artık çok kolay. İster evde, ister yolda, 
                  dilediğiniz her an yeni bir maceraya başlayın.
                </p>
                <ul className="space-y-2 text-purple-700">
                  <li className="flex items-center">
                    <span className="mr-2">✨</span>
                    Kullanıcı dostu arayüz
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✨</span>
                    Hızlı hikaye oluşturma
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✨</span>
                    Çevrimdışı okuma
                  </li>
                </ul>
              </div>
            </div>

            {/* Sesli Masallar */}
            <div className="group">
              <div className="relative h-72 mb-8 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                <img
                  src="/images/sesli-hikaye.jpg"
                  alt="Sesli Masallar"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Sesli Masallar</h3>
                  <p className="text-purple-100">Hikayeler hayat buluyor</p>
                </div>
              </div>
              <div className="space-y-4 px-2">
                <p className="text-purple-800 leading-relaxed">
                  Profesyonel seslendirmenler ve özel ses efektleri ile hikayeleriniz 
                  bambaşka bir boyuta taşınıyor. Her karakter kendine has bir sese sahip.
                </p>
                <ul className="space-y-2 text-purple-700">
                  <li className="flex items-center">
                    <span className="mr-2">✨</span>
                    Profesyonel seslendirme
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✨</span>
                    Özel ses efektleri
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✨</span>
                    Müzik koleksiyonu
                  </li>
                </ul>
              </div>
            </div>

            {/* Yapay Zeka */}
            <div className="group">
              <div className="relative h-72 mb-8 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                <img
                  src="/images/yapay-zeka.jpg"
                  alt="Yapay Zeka Sihri"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Yapay Zeka Sihri</h3>
                  <p className="text-purple-100">Benzersiz hikayeler</p>
                </div>
              </div>
              <div className="space-y-4 px-2">
                <p className="text-purple-800 leading-relaxed">
                  En son yapay zeka teknolojisi ile her hikaye tamamen özgün ve çocuğunuza özel. 
                  Karakterler, olaylar ve öğretiler çocuğunuzun gelişim düzeyine uygun olarak şekilleniyor.
                </p>
                <ul className="space-y-2 text-purple-700">
                  <li className="flex items-center">
                    <span className="mr-2">✨</span>
                    Kişiselleştirilmiş içerik
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✨</span>
                    Yaşa uygun anlatım
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✨</span>
                    Eğitici temalar
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nasıl Çalışır */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Hikaye Yolculuğunuz Nasıl Başlıyor?
            </h2>
            <p className="text-lg text-purple-600">
              Üç basit adımda kişiye özel masallar oluşturun
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-full h-48 mb-6 overflow-hidden rounded-2xl">
                    <Image
                      src="/images/bir.jpg"
                      alt="Bilgileri Girin"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 group-hover:bg-pink-600 transition-colors duration-300">
                    1
                  </div>
                  
                  <h3 className="text-2xl font-bold text-purple-800 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                    Bilgileri Girin
                  </h3>
                  
                  <p className="text-purple-600 leading-relaxed">
                    Çocuğunuzun adını ve tercih ettiğiniz tema ve karakterleri seçin. Size özel bir hikaye için ilk adımı atın.
                  </p>
                </div>
              </div>

              <div className="group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-full h-48 mb-6 overflow-hidden rounded-2xl">
                    <Image
                      src="/images/iki.jpg"
                      alt="Yapay Zeka Çalışsın"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 group-hover:bg-pink-600 transition-colors duration-300">
                    2
                  </div>
                  
                  <h3 className="text-2xl font-bold text-purple-800 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                    Yapay Zeka Çalışsın
                  </h3>
                  
                  <p className="text-purple-600 leading-relaxed">
                    Yapay zekamız seçimlerinize göre benzersiz ve öğretici bir hikaye oluşturur. Her hikaye tamamen size özeldir.
                  </p>
                </div>
              </div>

              <div className="group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-full h-48 mb-6 overflow-hidden rounded-2xl">
                    <Image
                      src="/images/uc.jpg"
                      alt="Keyfini Çıkarın"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 group-hover:bg-pink-600 transition-colors duration-300">
                    3
                  </div>
                  
                  <h3 className="text-2xl font-bold text-purple-800 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                    Keyfini Çıkarın
                  </h3>
                  
                  <p className="text-purple-600 leading-relaxed">
                    Hikayenizi okuyun, dinleyin ve çocuğunuzla paylaşın. Birlikte unutulmaz anlar yaşayın.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Örnek Hikayeler */}
      <section className="py-24 bg-gradient-to-b from-purple-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Masallarımızdan Örnekler
            </h2>
            <p className="text-lg text-purple-600">
              Her biri benzersiz ve öğretici hikayelerden bir seçki
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {sampleStories.map((story, index) => (
              <div key={story.title} className="group transform hover:scale-105 transition-all duration-300">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-purple-700 mb-2">
                      {story.title}
                    </h3>
                    <p className="text-purple-600 mb-4 text-sm line-clamp-2">
                      {story.summary}
                    </p>
                    <div className="flex items-center justify-between text-sm text-purple-500">
                      <span>🎯 {story.age} yaş</span>
                      <span>⏱️ {story.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mutlu Ailelerden Hikayeler */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Mutlu Ailelerden Hikayeler
            </h2>
            <p className="text-lg text-purple-600">
              Binlerce ailenin güvenini kazandık, işte onların deneyimleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 relative ${
                  index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Süsleme Elementleri */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -z-10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-50 rounded-tr-full -z-10" />
                
                {/* Yıldızlar */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* İçerik */}
                <blockquote className="relative">
                  <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-purple-100 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="relative text-lg text-purple-800 mb-6">
                    {testimonial.content}
                  </p>
                </blockquote>

                {/* Kullanıcı Bilgisi */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-purple-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold shadow-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-purple-900">{testimonial.name}</div>
                    <div className="text-sm text-purple-600 flex items-center gap-2">
                      <span>{testimonial.role}</span>
                      <span className="w-1 h-1 rounded-full bg-purple-300" />
                      <span>{testimonial.date}</span>
                    </div>
                  </div>
                </div>

                {/* Dekoratif Elementler */}
                <div className="absolute bottom-4 right-4 text-4xl opacity-10">
                  {index % 3 === 0 ? '✨' : index % 3 === 1 ? '🌟' : '💫'}
                </div>
              </div>
            ))}
          </div>

          {/* Daha Fazla Yorum Butonu */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="bg-white hover:bg-purple-50 text-purple-700 border-purple-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <span>Daha Fazla Yorum</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5M21 12H3" />
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Uzmanlardan İpuçları */}
      <section className="py-24 bg-gradient-to-b from-purple-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Uzmanlardan İpuçları
            </h2>
            <p className="text-lg text-purple-600">
              Çocuk gelişimi ve eğitim uzmanlarından değerli bilgiler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredBlogs.slice(0, 3).map((blog) => (
              <div key={blog.id} className="group">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                  {/* Blog Görseli */}
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      priority={blog.id === 1}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        {blog.category}
                      </span>
                      <span className="text-sm text-purple-500">{blog.readTime} okuma</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-purple-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {blog.title}
                    </h3>
                    
                    <p className="text-purple-600 text-sm mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium">
                          {blog.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="text-sm text-purple-700">{blog.author.split(' ')[0]}</div>
                      </div>
                      <span className="text-sm text-purple-500">{blog.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog" className="inline-block group">
              <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 p-[2px] rounded-2xl transition-all duration-300 hover:shadow-[0_0_2rem_-0.5rem_#8b5cf6] hover:scale-105">
                <div className="relative bg-white dark:bg-gray-900 rounded-2xl">
                  <div className="relative px-8 py-4">
                    <div className="flex items-center gap-4">
                      <span className="relative inline-flex overflow-hidden rounded-full p-[1px]">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600" />
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-gray-900 text-sm backdrop-blur-3xl">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-purple-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                          </svg>
                        </div>
                      </span>
                      <div className="text-left">
                        <h3 className="font-bold text-xl text-purple-900">
                          Blogları Keşfet
                        </h3>
                        <p className="text-sm text-purple-600">
                          Eğitici ve eğlenceli içerikler
                        </p>
                      </div>
                      <div className="ml-auto">
                        <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA - Hemen Başlayın */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-purple-400/10" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Hayal Gücü Yolculuğuna Başlayın
            </h2>
            <p className="text-lg text-purple-600 mb-8">
              Çocuğunuzun dünyasını renklendirecek özel bir hikaye oluşturun
            </p>
            <Button
              className="px-12 py-6 text-xl font-bold text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 magical-button relative"
              size="lg"
              asChild
              className="magical-button relative px-12 py-6 text-xl font-bold text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Link href="/create">
                <span className="relative z-10">✨ İlk Hikayeni Oluştur ✨</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
