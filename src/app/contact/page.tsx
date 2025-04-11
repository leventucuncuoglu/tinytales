"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Burada form gönderme işlemi simüle ediliyor
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    toast.success("Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.")
    setIsSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Animasyonlu Arka Plan Elementleri */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              İletişime Geçin
            </h1>
            <p className="text-lg text-purple-600">
              Sorularınız için buradayız, size yardımcı olmaktan mutluluk duyarız
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Sol Taraf - İletişim Bilgileri */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
                <h2 className="text-2xl font-bold text-purple-800 mb-6">Bize Ulaşın</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-800">E-posta</h3>
                      <a href="mailto:info@tinytales.com" className="text-purple-600 hover:text-purple-700 transition-colors">
                        info@tinytales.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-800">Telefon</h3>
                      <a href="tel:+902121234567" className="text-purple-600 hover:text-purple-700 transition-colors">
                        +90 (212) 123 45 67
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-800">Adres</h3>
                      <p className="text-purple-600">
                        İstanbul, Türkiye
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-800">Çalışma Saatleri</h3>
                      <p className="text-purple-600">
                        Pazartesi - Cuma: 09:00 - 18:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sosyal Medya */}
              <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
                <h2 className="text-2xl font-bold text-purple-800 mb-6">Sosyal Medya</h2>
                <div className="flex gap-4">
                  {[
                    { icon: "twitter", href: "#" },
                    { icon: "facebook", href: "#" },
                    { icon: "instagram", href: "#" },
                    { icon: "linkedin", href: "#" }
                  ].map((social) => (
                    <a
                      key={social.icon}
                      href={social.href}
                      className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center hover:bg-purple-200 transition-colors"
                    >
                      <span className="text-2xl">{
                        social.icon === "twitter" ? "𝕏" :
                        social.icon === "facebook" ? "f" :
                        social.icon === "instagram" ? "📸" :
                        "in"
                      }</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Sağ Taraf - İletişim Formu */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
              <h2 className="text-2xl font-bold text-purple-800 mb-6">Mesaj Gönderin</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    Adınız Soyadınız
                  </label>
                  <Input
                    type="text"
                    required
                    className="w-full"
                    placeholder="Adınızı giriniz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    E-posta Adresiniz
                  </label>
                  <Input
                    type="email"
                    required
                    className="w-full"
                    placeholder="E-posta adresinizi giriniz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    Konu
                  </label>
                  <Input
                    type="text"
                    required
                    className="w-full"
                    placeholder="Mesajınızın konusu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    Mesajınız
                  </label>
                  <textarea
                    required
                    className="w-full min-h-[150px] rounded-md border border-purple-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-purple-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
                    placeholder="Mesajınızı yazınız"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Gönderiliyor...
                    </span>
                  ) : (
                    "Mesaj Gönder"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 