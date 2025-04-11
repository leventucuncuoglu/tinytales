"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Animasyonlu Arka Plan Elementleri */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Hakkımızda
            </h1>
            <p className="text-lg text-purple-600">
              Çocukların hayal dünyasını zenginleştirmek için buradayız
            </p>
          </div>

          {/* Ana İçerik */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Sol Taraf - Misyon ve Vizyon */}
            <div className="space-y-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-2xl text-white">🎯</span>
                  </div>
                  <h2 className="text-2xl font-bold text-purple-800">Misyonumuz</h2>
                </div>
                <p className="text-purple-700 leading-relaxed">
                  Her çocuğun kendi özel hikayesini yaşamasını sağlamak ve okuma sevgisini aşılamak için çalışıyoruz. 
                  Teknoloji ve eğitimi bir araya getirerek, çocukların gelişimine katkıda bulunuyoruz.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-2xl text-white">🌟</span>
                  </div>
                  <h2 className="text-2xl font-bold text-purple-800">Vizyonumuz</h2>
                </div>
                <p className="text-purple-700 leading-relaxed">
                  Yapay zeka teknolojisini kullanarak, her çocuğa özel, benzersiz ve eğitici hikayeler oluşturan 
                  dünyanın en yaratıcı çocuk hikaye platformu olmayı hedefliyoruz.
                </p>
              </div>
            </div>

            {/* Sağ Taraf - Değerlerimiz */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-2xl text-white">💫</span>
                </div>
                <h2 className="text-2xl font-bold text-purple-800">Değerlerimiz</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600">✨</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-700 mb-1">Çocuk Güvenliği</h3>
                    <p className="text-purple-600 text-sm">Çocukların güvenliği ve gizliliği en öncelikli konumuzdur</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600">📚</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-700 mb-1">Eğitici İçerik</h3>
                    <p className="text-purple-600 text-sm">Her hikaye eğitici ve geliştirici unsurlar içerir</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600">🎨</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-700 mb-1">Yaratıcılık</h3>
                    <p className="text-purple-600 text-sm">Yaratıcılık ve hayal gücünü destekleriz</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600">👨‍👩‍👧‍👦</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-700 mb-1">Aile Katılımı</h3>
                    <p className="text-purple-600 text-sm">Aile katılımını teşvik ederiz</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600">🚀</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-700 mb-1">Sürekli Gelişim</h3>
                    <p className="text-purple-600 text-sm">Sürekli yenilik ve gelişim odaklıyız</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ekip Bölümü */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-purple-800 mb-12">Ekibimiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Ayşe Yılmaz",
                  role: "Kurucu & CEO",
                  avatar: "👩‍💼"
                },
                {
                  name: "Mehmet Kaya",
                  role: "Teknoloji Direktörü",
                  avatar: "👨‍💻"
                },
                {
                  name: "Zeynep Demir",
                  role: "İçerik Yöneticisi",
                  avatar: "👩‍🎨"
                }
              ].map((member) => (
                <div key={member.name} className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">{member.avatar}</span>
                  </div>
                  <h3 className="font-bold text-xl text-purple-800 mb-1">{member.name}</h3>
                  <p className="text-purple-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 