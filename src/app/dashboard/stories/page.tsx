import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Örnek hikayeler - Gerçek verilerle değiştirilecek
const stories = [
  {
    id: 1,
    title: "Uzaydaki Macera",
    date: "20 Ocak 2024",
    type: "audio",
    theme: "Uzay",
    duration: "5 dk",
  },
  {
    id: 2,
    title: "Sihirli Orman",
    date: "19 Ocak 2024",
    type: "text",
    theme: "Doğa",
    duration: "4 dk",
  },
  {
    id: 3,
    title: "Deniz Altında",
    date: "18 Ocak 2024",
    type: "audio",
    theme: "Deniz",
    duration: "6 dk",
  },
  // ... daha fazla hikaye
]

export default async function StoriesPage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Büyülü Arka Plan */}
      <div className="magical-background" />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Başlık ve Geri Dön */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-purple-700 hover:text-purple-800 group"
            >
              <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
              <span className="text-lg">Panele Dön</span>
            </Link>
            <h1 className="text-3xl font-bold text-purple-700">
              📚 Tüm Hikayelerim
            </h1>
          </div>

          {/* Filtreler */}
          <div className="feature-card p-4 mb-8">
            <div className="flex flex-wrap gap-4">
              <Button variant="ghost" className="rounded-full">
                Tümü
              </Button>
              <Button variant="ghost" className="rounded-full">
                Sesli Hikayeler
              </Button>
              <Button variant="ghost" className="rounded-full">
                Yazılı Hikayeler
              </Button>
              <Button variant="ghost" className="rounded-full">
                En Yeniler
              </Button>
              <Button variant="ghost" className="rounded-full">
                En Eskiler
              </Button>
            </div>
          </div>

          {/* Hikaye Listesi */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div key={story.id} className="feature-card p-6 hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">
                    {story.type === "audio" ? "🎧" : "📝"}
                  </span>
                  <span className="text-sm text-purple-600">{story.date}</span>
                </div>
                <h3 className="text-xl font-bold text-purple-700 mb-2">
                  {story.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-purple-600">
                  <span>🎯 {story.theme}</span>
                  <span>⏱️ {story.duration}</span>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="ghost" size="sm" className="rounded-full">
                    {story.type === "audio" ? "Dinle" : "Oku"}
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    Düzenle
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 