# TinyTales 📚

TinyTales, çocuklar için interaktif hikayeler ve sesli masallar sunan modern bir web uygulamasıdır. Next.js, TypeScript ve Tailwind CSS kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- 📖 İnteraktif çocuk hikayeleri
- 🎵 Sesli masallar
- 🌙 Uyku hikayeleri ve rahatlatıcı sesler
- 🎨 Çocuk dostu, renkli arayüz
- 🌐 Responsive tasarım
- 🔒 Kullanıcı kimlik doğrulama sistemi
- 🎯 Kişiselleştirilmiş içerik önerileri

## 🛠️ Teknolojiler

- Next.js 15.0
- React 18
- TypeScript
- Tailwind CSS
- Prisma
- NextAuth.js
- Framer Motion
- Zustand
- Stripe (Ödeme entegrasyonu)

## 🚀 Başlangıç

### Gereksinimler

- Node.js 18 veya üzeri
- npm veya yarn
- PostgreSQL veritabanı

### Kurulum

1. Projeyi klonlayın:
\`\`\`bash
git clone [repo-url]
cd tinytales
\`\`\`

2. Bağımlılıkları yükleyin:
\`\`\`bash
npm install
\`\`\`

3. Çevre değişkenlerini ayarlayın:
\`\`\`bash
cp .env.example .env
\`\`\`
.env dosyasını kendi değerlerinizle güncelleyin.

4. Veritabanı migration'larını çalıştırın:
\`\`\`bash
npx prisma migrate dev
\`\`\`

5. Geliştirme sunucusunu başlatın:
\`\`\`bash
npm run dev
\`\`\`

Uygulama http://localhost:3000 adresinde çalışacaktır.

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👥 Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (\`git checkout -b feature/amazing-feature\`)
3. Değişikliklerinizi commit edin (\`git commit -m 'feat: Add amazing feature'\`)
4. Branch'inizi push edin (\`git push origin feature/amazing-feature\`)
5. Pull Request oluşturun
