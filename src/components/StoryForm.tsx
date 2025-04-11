"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const themes = [
  { value: "magic", label: "✨ Sihir ve Büyü" },
  { value: "adventure", label: "🌟 Macera" },
  { value: "friendship", label: "🤝 Dostluk" },
  { value: "nature", label: "🌳 Doğa" },
  { value: "space", label: "🚀 Uzay" },
  { value: "underwater", label: "🌊 Deniz Altı" },
  { value: "dragons", label: "🐲 Ejderhalar" },
  { value: "fairytale", label: "👑 Peri Masalı" },
  { value: "animals", label: "🦁 Hayvanlar Alemi" },
  { value: "magical_forest", label: "🌲 Sihirli Orman" },
  { value: "time_travel", label: "⌛ Zaman Yolculuğu" },
  { value: "random", label: "🎲 Sihirli Tema (Rastgele)" },
];

const styles = [
  { value: "funny", label: "😄 Eğlenceli" },
  { value: "educational", label: "📚 Eğitici" },
  { value: "exciting", label: "🎢 Heyecanlı" },
  { value: "calm", label: "🌸 Sakin" },
  { value: "mysterious", label: "🔍 Gizemli" },
  { value: "magical", label: "✨ Büyülü" },
  { value: "adventurous", label: "🗺️ Maceralı" },
  { value: "heartwarming", label: "💖 Duygu Dolu" },
];

export default function StoryForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    character: "",
    companions: "",
    theme: "magic",
    ageGroup: "3-5",
    length: "short",
    style: "funny"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      console.log("Hikaye oluşturma isteği gönderiliyor:", formData)

      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Hikaye oluşturulamadı")
      }

      const data = await response.json()
      console.log("Hikaye başarıyla oluşturuldu:", data)
      
      router.push(`/story/${data.id}`)
    } catch (error) {
      console.error("Hikaye oluşturma hatası:", error)
      setError(error instanceof Error ? error.message : "Hikaye oluşturulurken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sol Kolon */}
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-purple-700 mb-2">
                Ana Karakter
              </label>
              <Input
                type="text"
                placeholder="Örn: Cesur Prenses Ela"
                className="w-full"
                value={formData.character}
                onChange={(e) => setFormData({ ...formData, character: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-purple-700 mb-2">
                Yardımcı Karakterler
              </label>
              <Input
                type="text"
                placeholder="Örn: En yakın arkadaşı Ali, kedisi Pamuk, sihirli değneği"
                className="w-full"
                value={formData.companions}
                onChange={(e) => setFormData({ ...formData, companions: e.target.value })}
              />
              <p className="mt-1 text-sm text-purple-600">
                Karakterin arkadaşları, evcil hayvanları veya özel eşyaları
              </p>
            </div>

            <div>
              <label className="block text-lg font-medium text-purple-700 mb-2">
                Hikaye Teması
              </label>
              <select 
                className="w-full rounded-md border border-purple-200 bg-white px-3 py-2 text-purple-900"
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
              >
                {themes.map((theme) => (
                  <option key={theme.value} value={theme.value}>
                    {theme.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sağ Kolon */}
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-purple-700 mb-2">
                Yaş Grubu
              </label>
              <select 
                className="w-full rounded-md border border-purple-200 bg-white px-3 py-2 text-purple-900"
                value={formData.ageGroup}
                onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
              >
                <option value="3-5">👶 3-5 Yaş</option>
                <option value="6-8">🧒 6-8 Yaş</option>
                <option value="9-12">🧑 9-12 Yaş</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-medium text-purple-700 mb-2">
                Hikaye Uzunluğu
              </label>
              <select 
                className="w-full rounded-md border border-purple-200 bg-white px-3 py-2 text-purple-900"
                value={formData.length}
                onChange={(e) => setFormData({ ...formData, length: e.target.value })}
              >
                <option value="short">⭐ Kısa (500 kelime)</option>
                <option value="medium">⭐⭐ Orta (1000 kelime)</option>
                <option value="long">⭐⭐⭐ Uzun (1500 kelime)</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-medium text-purple-700 mb-2">
                Hikaye Tarzı
              </label>
              <select 
                className="w-full rounded-md border border-purple-200 bg-white px-3 py-2 text-purple-900"
                value={formData.style}
                onChange={(e) => setFormData({ ...formData, style: e.target.value })}
              >
                {styles.map((style) => (
                  <option key={style.value} value={style.value}>
                    {style.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto px-12 py-6 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                <span>Sihirli Kalem Yazıyor...</span>
              </div>
            ) : (
              <span className="flex items-center gap-2">
                ✨ Masalın Büyüsünü Başlat ✨
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
} 