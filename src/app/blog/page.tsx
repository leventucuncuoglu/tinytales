"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

const categories = [
  { id: "all", label: "Tümü" },
  { id: "psychology", label: "Psikoloji" },
  { id: "technology", label: "Teknoloji" },
  { id: "development", label: "Gelişim" },
  { id: "education", label: "Eğitim" },
  { id: "parenting", label: "Ebeveynlik" },
];

export const blogPosts = [
  {
    id: 1,
    title: "Hayal Gücünün Gücü: Masallar ve Çocukların İç Dünyası",
    author: "Uzman Psikolog Dr. Elif Demir",
    date: "15 Mart 2024",
    readTime: "6 dk",
    category: "psychology",
    excerpt: "Günümüzde çocukların zihinlerini eğlendiren, aynı zamanda zenginleştiren araçların başında masallar geliyor. Psikoloji alanında yapılan çalışmalar, düzenli olarak masal dinleyen veya okuyan çocukların hayal gücü, empati ve duygusal farkındalık becerilerinin geliştiğini ortaya koyuyor...",
    image: "/images/doktor1.jpg",
    featured: true,
    content: `Günümüzde çocukların zihinlerini eğlendiren, aynı zamanda zenginleştiren araçların başında masallar geliyor. Ancak masallar, yalnızca uyku öncesi bir ritüel olmaktan çok daha fazlası. Psikoloji alanında yapılan çalışmalar, düzenli olarak masal dinleyen veya okuyan çocukların hayal gücü, empati, duygusal farkındalık ve problem çözme becerilerinin geliştiğini ortaya koyuyor. Özellikle 3-10 yaş arası dönemde, hikayeler çocuğun zihninde adeta bir laboratuvar görevi görüyor; hayali karakterler, büyülü ormanlar, konuşan hayvanlar aracılığıyla çocuklar kendi korkularını, heyecanlarını, arzularını ve meraklarını keşfediyor.

Dr. Demir'e göre, çocuğunuzla düzenli hikaye saatleri yapmak, onun hem hayal gücünü hem de duygusal zekasını besliyor. Hayali bir krallıkta prensesin zorlukları aşması, bir kaplumbağanın sabırla hedefe ulaşması gibi temalar çocuğun iç dünyasında kalıcı semboller bırakıyor. Bu semboller, ileride sosyal ilişkilerinde, okul başarısında, kendine duyduğu güvende ve yaşam boyu sürecek ilgi alanlarında belirleyici etkilere sahip olabiliyor.

Masalların Çocuk Gelişimine Etkileri:

1. Duygusal Gelişim
- Empati becerisinin gelişmesi
- Duyguları tanıma ve ifade etme yeteneği
- Özgüven gelişimi
- Sosyal-duygusal öğrenme

2. Bilişsel Gelişim
- Problem çözme becerilerinin gelişmesi
- Yaratıcı düşünme
- Hafıza ve dikkat süresinin artması
- Dil gelişimi ve kelime hazinesinin zenginleşmesi

3. Sosyal Gelişim
- İletişim becerilerinin güçlenmesi
- Değerler eğitimi
- Kültürel farkındalık
- Sosyal normları öğrenme

Ebeveynler İçin Öneriler:

1. Düzenli Hikaye Saatleri
- Her gün belirli bir zaman ayırın
- Çocuğunuzun yaş grubuna uygun hikayeler seçin
- İnteraktif okuma yapın, sorular sorun
- Hikaye sonrası sohbet edin

2. Yaratıcı Aktiviteler
- Hikayeleri canlandırın
- Resim çizme etkinlikleri yapın
- Alternatif sonlar üretin
- Kendi hikayelerinizi oluşturun

3. Destekleyici Yaklaşım
- Çocuğun yorumlarını dinleyin
- Hayal gücünü destekleyin
- Sorularını cevaplayın
- Eleştirmekten kaçının

Sonuç olarak, masallar çocukların duygusal, bilişsel ve sosyal gelişiminde kritik bir rol oynuyor. Düzenli hikaye okuma rutini, çocuğunuzla güçlü bir bağ kurmanıza yardımcı olurken, onun sağlıklı bir birey olarak yetişmesine de katkı sağlıyor.`,
  },
  {
    id: 2,
    title: "Teknoloji ve Masallar: Dijital Çağda Hikaye Anlatıcılığı",
    author: "Eğitim Teknoloğu Doç. Dr. Mert Yalçın",
    date: "14 Mart 2024",
    readTime: "5 dk",
    category: "technology",
    excerpt: "Bir dönem sadece büyüklerin elinde tuttuğu tozlu masal kitapları, bugün yapay zeka destekli platformlar sayesinde kişiselleşmiş, etkileşimli deneyimlere dönüşüyor...",
    image: "/images/doktor2.jpg",
    featured: true,
    content: `Dijital çağ, hikaye anlatımını tamamen dönüştürdü. Artık masallar sadece kitap sayfalarında değil, interaktif uygulamalarda, sanal gerçeklik deneyimlerinde ve yapay zeka destekli platformlarda hayat buluyor. Bu dönüşüm, çocukların hikayelerle etkileşim kurma biçimini kökten değiştirirken, eğitimciler ve ebeveynler için de yeni fırsatlar sunuyor.

Teknolojinin Hikaye Anlatımına Katkıları:

1. Kişiselleştirilmiş Deneyim
- Çocuğun ilgi alanlarına göre özelleştirilmiş hikayeler
- Öğrenme hızına uygun içerik akışı
- Tercih edilen karakterler ve temalar
- Bireysel gelişim takibi

2. Etkileşimli Öğrenme
- Dokunmatik ekran etkileşimleri
- Sesli komutlarla yönlendirme
- Animasyonlu görseller
- Oyunlaştırma elementleri

3. Çoklu Ortam Entegrasyonu
- Sesli anlatım seçenekleri
- Müzik ve ses efektleri
- 3D görseller ve animasyonlar
- Artırılmış gerçeklik deneyimleri

Modern Hikaye Anlatımının Avantajları:

1. Erişilebilirlik
- Her an her yerde ulaşılabilirlik
- Çoklu dil desteği
- Farklı öğrenme stillerine uygunluk
- Ekonomik sürdürülebilirlik

2. Ölçülebilir Gelişim
- Okuma hızı takibi
- Kelime hazinesi gelişimi
- Anlama seviyesi ölçümü
- Etkileşim analizi

3. Sosyal Öğrenme
- Online okuma grupları
- Aile katılımı imkanları
- Akran etkileşimi
- Global kültür paylaşımı

Dikkat Edilmesi Gerekenler:

1. Ekran Süresi Dengesi
- Yaşa uygun kullanım süreleri
- Düzenli mola araları
- Fiziksel aktivitelerle denge
- Uyku düzenine dikkat

2. İçerik Kalitesi
- Pedagojik uygunluk
- Yaş grubu uyumu
- Değerler eğitimi
- Dil ve anlatım kalitesi

3. Güvenlik Önlemleri
- Ebeveyn kontrolü
- İçerik filtreleme
- Veri güvenliği
- Reklam kontrolü

Gelecek Trendleri:

1. Yapay Zeka Entegrasyonu
- Dinamik hikaye oluşturma
- Anlık geri bildirim
- Öğrenme patikası optimizasyonu
- Duygusal zeka gelişimi

2. Sanal Gerçeklik
- İmmersif hikaye deneyimleri
- 360 derece etkileşim
- Karakter canlandırma
- Mekan keşifleri

3. Sosyal Öğrenme Platformları
- Çocuk güvenliği odaklı sosyal ağlar
- Aile katılımlı aktiviteler
- Uluslararası etkileşim
- Kültürlerarası öğrenme

Sonuç olarak, teknoloji destekli hikaye anlatımı, geleneksel yöntemleri tamamen ortadan kaldırmak yerine, onları zenginleştiriyor ve tamamlıyor. Bu yeni yaklaşım, çocukların dijital çağın getirdiği fırsatlardan yararlanırken, klasik hikaye anlatımının büyüsünü de yaşamalarına olanak tanıyor.`,
  },
  {
    id: 3,
    title: "Duygusal Zeka Gelişiminde Hikayelerin Rolü",
    author: "Çocuk Gelişim Uzmanı Uzm. Ayşe Kara",
    date: "13 Mart 2024",
    readTime: "7 dk",
    category: "development",
    excerpt: "Çocuğunuzun sadece matematikte veya fen bilimlerinde başarılı olması değil, aynı zamanda duygusal olarak da güçlü...",
    image: "/images/doktor3.jpg",
    featured: true,
    content: `Duygusal zeka, modern dünyada başarının en önemli göstergelerinden biri haline geldi. Çocukların akademik başarılarının yanı sıra, duygusal zekalarının gelişimi de kritik önem taşıyor. Hikayeler, bu gelişim sürecinde eşsiz bir araç olarak karşımıza çıkıyor.

Duygusal Zekanın Temel Bileşenleri:

1. Öz Farkındalık
- Duyguları tanıma
- Güçlü ve zayıf yönleri anlama
- Öz değerlendirme yapabilme
- Duygusal tepkileri yönetme

2. Empati
- Başkalarının duygularını anlama
- Farklı bakış açılarını değerlendirme
- Sosyal ipuçlarını okuma
- Duygusal bağ kurabilme

3. Sosyal Beceriler
- İletişim yetenekleri
- İşbirliği yapabilme
- Çatışma çözümü
- Liderlik becerileri

Hikayelerin Duygusal Zeka Gelişimine Katkıları:

1. Duygu Tanıma ve İfade
- Karakterlerin duygularını anlama
- Duygusal kelime dağarcığını geliştirme
- Duygu-durum bağlantılarını kurma
- Duygusal deneyimleri paylaşma

2. Problem Çözme
- Karakter motivasyonlarını anlama
- Alternatif çözümler üretme
- Sonuçları değerlendirme
- Stratejik düşünme

3. Değerler Eğitimi
- Ahlaki değerleri keşfetme
- Etik kararlar alma
- Sorumluluk bilinci
- Toplumsal normları öğrenme

Ebeveynler İçin Stratejiler:

1. Hikaye Seçimi
- Yaş grubuna uygunluk
- Duygusal temalar
- Pozitif mesajlar
- Çözüm odaklı anlatım

2. Etkileşimli Okuma
- Duygu paylaşımı
- Tartışma fırsatları
- Rol yapma aktiviteleri
- Deneyim paylaşımı

3. Takip Aktiviteleri
- Resim çizme
- Hikaye tamamlama
- Karakter analizi
- Duygu günlüğü

Duygusal Gelişim İçin Öneriler:

1. Düzenli Okuma Rutini
- Günlük okuma zamanı
- Rahat ve güvenli ortam
- Aktif katılım
- Soru-cevap oturumları

2. Yaratıcı Etkinlikler
- Kukla gösterileri
- Drama aktiviteleri
- Müzikli anlatımlar
- Sanat projeleri

3. Aile Katılımı
- Ortak okuma saatleri
- Deneyim paylaşımı
- Duygu sohbetleri
- Aile hikayeleri

Uzun Vadeli Faydalar:

1. Kişisel Gelişim
- Öz güven artışı
- Duygusal dayanıklılık
- Stres yönetimi
- Karar verme becerileri

2. Sosyal Başarı
- Sağlıklı ilişkiler
- Etkili iletişim
- Liderlik özellikleri
- Takım çalışması

3. Akademik İlerleme
- Motivasyon artışı
- Odaklanma becerisi
- Yaratıcı düşünme
- Problem çözme yeteneği

Sonuç olarak, hikayeler aracılığıyla duygusal zeka gelişimi, çocukların sadece bugünü için değil, gelecekteki başarıları için de kritik öneme sahip. Bu süreçte ebeveynlerin ve eğitimcilerin bilinçli yaklaşımı, çocukların sağlıklı duygusal gelişimi için temel oluşturuyor.`,
  },
  {
    id: 4,
    title: "Yaratıcılık, Okur Yazarlık ve Eleştirel Düşünme: Masalların Akademik Katkısı",
    author: "İlköğretim Öğretmeni ve Okuma Danışmanı Nilgün Koç",
    date: "12 Mart 2024",
    readTime: "8 dk",
    category: "education",
    excerpt: "Hikayeler sadece eğlenceli değil, aynı zamanda öğrenmeye zemin hazırlayan kaynaklardır...",
    image: "/images/doktor4.jpg",
    featured: false,
    content: `Masallar ve hikayeler, çocukların akademik gelişiminde sandığımızdan çok daha büyük bir rol oynuyor. Okuma-yazma becerilerinin ötesinde, eleştirel düşünme, yaratıcılık ve analitik yeteneklerin gelişiminde de önemli bir araç olarak karşımıza çıkıyor.

Akademik Becerilerin Gelişimi:

1. Dil ve Okur-Yazarlık
- Kelime hazinesinin genişlemesi
- Dilbilgisi yapılarının kavranması
- Metin analiz yetenekleri
- İfade becerilerinin gelişimi

2. Eleştirel Düşünme
- Neden-sonuç ilişkileri kurma
- Analiz ve sentez yapabilme
- Mantıksal çıkarımlar
- Sorgulama becerileri

3. Yaratıcı Düşünme
- Hayal gücünün gelişimi
- Özgün fikirler üretme
- Problem çözme yaklaşımları
- Yenilikçi bakış açıları

Hikayelerin Öğrenmeye Katkıları:

1. Bilişsel Gelişim
- Hafıza güçlendirme
- Odaklanma süresi
- Bilgi işleme becerileri
- Kavram öğrenimi

2. Akademik Motivasyon
- Öğrenme isteği
- Merak duygusu
- Başarı motivasyonu
- Kendini geliştirme arzusu

3. Disiplinler Arası Öğrenme
- Fen ve matematik kavramları
- Sosyal bilgiler entegrasyonu
- Sanat ve müzik bağlantıları
- Tarih ve coğrafya bilgisi

Eğitimciler İçin Öneriler:

1. Müfredat Entegrasyonu
- Tema bazlı öğrenme
- Proje tabanlı aktiviteler
- İnteraktif tartışmalar
- Yaratıcı yazma çalışmaları

2. Değerlendirme Yöntemleri
- Portfolyo çalışmaları
- Süreç değerlendirmesi
- Akran değerlendirmesi
- Öz değerlendirme

3. Öğrenme Ortamı
- Rahat okuma alanları
- Grup çalışma imkanları
- Teknoloji entegrasyonu
- Materyal çeşitliliği

Uzun Vadeli Kazanımlar:

1. Akademik Başarı
- Yüksek not ortalaması
- Test başarısı
- Proje yönetimi
- Araştırma becerileri

2. Yaşam Boyu Öğrenme
- Öğrenme motivasyonu
- Kendini geliştirme
- Sürekli eğitim
- Profesyonel gelişim

3. Kariyer Hazırlığı
- İletişim becerileri
- Analitik düşünme
- Problem çözme
- Liderlik özellikleri

Sonuç olarak, masallar ve hikayeler, çocukların akademik gelişiminde vazgeçilmez bir rol oynuyor. Doğru yaklaşım ve yöntemlerle kullanıldığında, hem öğrenme sürecini keyifli hale getiriyor hem de kalıcı akademik başarıya katkı sağlıyor.`,
  },
  {
    id: 5,
    title: "Kültürel Aktarım ve Aile Bağları: Masalların Sosyal Rolü",
    author: "Kültür Antropoloğu Dr. Canan Özdemir",
    date: "11 Mart 2024",
    readTime: "6 dk",
    category: "parenting",
    excerpt: "Masallar, bir toplumun değerlerini, inançlarını, tarihini ve kültürel mirasını gelecek nesillere aktarmanın en etkili yollarından biridir...",
    image: "/images/doktor5.jpg",
    featured: false,
    content: `Masallar, toplumların kültürel DNA'sını taşıyan en önemli araçlardan biridir. Nesilden nesile aktarılan bu hikayeler, sadece eğlence aracı değil, aynı zamanda toplumsal değerlerin, geleneklerin ve aile bağlarının güçlendirilmesinde kritik bir rol oynuyor.

Kültürel Mirasın Aktarımı:

1. Değerler Sistemi
- Ahlaki prensipler
- Toplumsal normlar
- Geleneksel bilgelik
- Kültürel kimlik

2. Sosyal Kodlar
- Davranış kalıpları
- İletişim biçimleri
- Sosyal roller
- Toplumsal beklentiler

3. Tarihsel Bağlam
- Toplumsal hafıza
- Kolektif deneyimler
- Kültürel semboller
- Tarihi olaylar

Aile Bağlarının Güçlendirilmesi:

1. Kuşaklararası İletişim
- Deneyim paylaşımı
- Değer aktarımı
- Aile hikayeleri
- Ortak anılar

2. Duygusal Bağlar
- Güven ilişkisi
- Empati gelişimi
- Sevgi ifadesi
- Aidiyet duygusu

3. Aile Ritüelleri
- Ortak okuma zamanları
- Hikaye anlatma geleneği
- Paylaşım anları
- Aile toplantıları

Toplumsal Faydalar:

1. Sosyal Uyum
- Kültürel entegrasyon
- Toplumsal harmoni
- Sosyal dayanışma
- Kolektif bilinç

2. Kimlik Oluşumu
- Kültürel farkındalık
- Benlik algısı
- Toplumsal aidiyet
- Özgün kimlik

3. Sosyal Beceriler
- İletişim yetkinliği
- Çatışma çözümü
- İşbirliği
- Liderlik

Ebeveynler İçin Öneriler:

1. Hikaye Seçimi
- Kültürel değerler
- Aile gelenekleri
- Yerel motifler
- Evrensel temalar

2. Anlatım Teknikleri
- Etkileşimli paylaşım
- Dramatizasyon
- Görsel destekler
- Ses ve müzik

3. Takip Aktiviteleri
- Aile sohbetleri
- Kültürel etkinlikler
- Yaratıcı projeler
- Toplumsal katılım

Uzun Vadeli Etkiler:

1. Kültürel Sürdürülebilirlik
- Değerlerin korunması
- Geleneklerin yaşatılması
- Kültürel çeşitlilik
- Toplumsal hafıza

2. Güçlü Aile Yapısı
- Sağlıklı iletişim
- Duygusal bağlar
- Ortak değerler
- Aile birliği

3. Toplumsal Gelişim
- Kültürel zenginlik
- Sosyal uyum
- Kolektif bilinç
- Toplumsal ilerleme

Sonuç olarak, masallar aracılığıyla gerçekleşen kültürel aktarım ve aile bağlarının güçlendirilmesi, sağlıklı bir toplum yapısının temelini oluşturuyor. Bu süreçte bilinçli ve sistemli bir yaklaşım, gelecek nesillerin kültürel mirasımızı koruyarak geliştirmesine olanak sağlıyor.`,
  },
  {
    id: 6,
    title: "Korkuları Yenmek ve Özsaygı İnşa Etmek: Masalların Terapi Etkisi",
    author: "Çocuk Psikoterapisti Uzm. Psk. Emre Yıldız",
    date: "10 Mart 2024",
    readTime: "7 dk",
    category: "psychology",
    excerpt: "Masallar sadece eğlence için değil, aynı zamanda birer psikolojik destek aracıdır...",
    image: "/images/doktor6.jpg",
    featured: false,
    content: `Masallar, çocukların psikolojik gelişiminde ve duygusal sorunların çözümünde güçlü bir terapi aracı olarak kullanılabilir. Özellikle korkular, kaygılar ve özsaygı sorunlarıyla başa çıkmada hikayeler, güvenli bir alan yaratarak iyileştirici bir rol oynuyor.

Terapötik Etkiler:

1. Duygusal Güvenlik
- Güvenli alan yaratma
- Duygu düzenleme
- Kaygı yönetimi
- Stres azaltma

2. Özsaygı Gelişimi
- Kendini kabul
- Başarı duygusu
- Özgüven inşası
- Pozitif benlik algısı

3. Korkularla Yüzleşme
- Güvenli mesafe
- Aşamalı maruz kalma
- Başa çıkma stratejileri
- Cesaret geliştirme

Terapötik Hikaye Kullanımı:

1. Seçim Kriterleri
- Yaş uygunluğu
- Psikolojik ihtiyaçlar
- Terapötik hedefler
- Karakter özdeşimi

2. Anlatım Yöntemleri
- Ses tonu kontrolü
- Tempo ayarlaması
- Duygusal vurgular
- İnteraktif katılım

3. Terapi Teknikleri
- Metafor kullanımı
- Sembolik anlatım
- Çözüm odaklılık
- Pozitif pekiştirme

Uygulama Alanları:

1. Kaygı Bozuklukları
- Sosyal fobi
- Ayrılık kaygısı
- Performans kaygısı
- Genel kaygı

2. Davranış Sorunları
- Öfke kontrolü
- Saldırganlık
- Kurallara uyum
- Sosyal beceriler

3. Travma ve Kayıp
- Yas süreci
- Travma sonrası büyüme
- Duygusal iyileşme
- Adaptasyon

Terapist Önerileri:

1. Değerlendirme
- İhtiyaç analizi
- Gelişim düzeyi
- Aile dinamikleri
- Terapi hedefleri

2. Uygulama Süreci
- Düzenli seanslar
- Aile katılımı
- İlerleme takibi
- Geri bildirim

3. Destekleyici Teknikler
- Sanat terapisi
- Oyun terapisi
- Drama teknikleri
- Müzik entegrasyonu

Başarı Göstergeleri:

1. Duygusal İyileşme
- Kaygı azalması
- Duygu kontrolü
- Özsaygı artışı
- Psikolojik dayanıklılık

2. Davranış Değişimi
- Uyum becerileri
- Sosyal etkileşim
- Problem çözme
- Öz düzenleme

3. Uzun Vadeli Kazanımlar
- Duygusal olgunluk
- Psikolojik sağlamlık
- Kişisel gelişim
- Yaşam becerileri

Sonuç olarak, masalların terapötik kullanımı, çocukların psikolojik sorunlarıyla başa çıkmada etkili bir yöntem sunuyor. Profesyonel rehberlik eşliğinde kullanıldığında, kalıcı ve olumlu değişimlere zemin hazırlıyor.`,
  },
  {
    id: 7,
    title: "İki Dilli Hikayeler: Dil Gelişimi ve Küresel Farkındalık",
    author: "Dilbilimci Dr. Leyla Aksu",
    date: "9 Mart 2024",
    readTime: "6 dk",
    category: "education",
    excerpt: "Günümüz dünyasında birden fazla dil bilmek, çocuklara hem entelektüel hem de kültürel anlamda geniş ufuklar açıyor...",
    image: "/images/doktor7.jpg",
    featured: false,
    content: `İki dilli hikayeler, çocukların dil gelişimini desteklerken aynı zamanda kültürlerarası farkındalık ve global perspektif kazanmalarına yardımcı oluyor. Bu yaklaşım, modern dünyanın çok dilli ve çok kültürlü yapısına uyum sağlamada önemli avantajlar sunuyor.

Dil Gelişimi Avantajları:

1. Çift Dil Yetkinliği
- Eşzamanlı öğrenme
- Dil transferi
- Kelime hazinesi
- Dilbilgisi yapıları

2. Bilişsel Faydalar
- Zihinsel esneklik
- Çoklu perspektif
- Problem çözme
- Yaratıcı düşünme

3. Akademik Başarı
- Dil becerileri
- Analitik düşünme
- Konsantrasyon
- Öğrenme kapasitesi

Kültürel Kazanımlar:

1. Global Perspektif
- Kültürel farkındalık
- Dünya görüşü
- Uluslararası anlayış
- Çeşitlilik algısı

2. Kültürlerarası Yetkinlik
- İletişim becerileri
- Empati gelişimi
- Adaptasyon yeteneği
- Kültürel duyarlılık

3. Sosyal Entegrasyon
- Çok kültürlü ortamlar
- Sosyal ağlar
- Kültürel köprüler
- Uluslararası dostluklar

Eğitim Stratejileri:

1. Materyal Seçimi
- Yaş uygunluğu
- Kültürel içerik
- Dil seviyesi
- İlgi alanları

2. Öğretim Teknikleri
- İmmersif yaklaşım
- Etkileşimli öğrenme
- Multimedya kullanımı
- Oyun tabanlı aktiviteler

3. Değerlendirme Yöntemleri
- Dil yeterliliği
- Kültürel anlayış
- İletişim becerileri
- Öğrenme çıktıları

Uygulama Önerileri:

1. Günlük Rutinler
- Düzenli okuma
- Dil değişimi
- Kültürel aktiviteler
- Pratik uygulamalar

2. Aile Katılımı
- Ev içi dil politikası
- Kültürel paylaşım
- Ortak aktiviteler
- Destek sistemleri

3. Topluluk Entegrasyonu
- Dil toplulukları
- Kültürel etkinlikler
- Sosyal programlar
- Uluslararası bağlantılar

Gelecek Perspektifi:

1. Kariyer Avantajları
- İş fırsatları
- Uluslararası mobilite
- Profesyonel ağlar
- Rekabet üstünlüğü

2. Kişisel Gelişim
- Özgüven artışı
- Kültürel zenginlik
- Sosyal adaptasyon
- Yaşam boyu öğrenme

3. Global Vatandaşlık
- Dünya vatandaşlığı
- Kültürel diplomasi
- Sosyal sorumluluk
- Uluslararası işbirliği

Sonuç olarak, iki dilli hikayeler aracılığıyla gerçekleştirilen dil ve kültür eğitimi, çocukların gelecekteki başarıları için sağlam bir temel oluşturuyor. Bu yaklaşım, globalleşen dünyada başarılı bir kariyer ve zengin bir kültürel yaşam için gerekli becerileri kazandırıyor.`,
  }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Bölümü */}
      <div className="bg-gradient-to-r from-purple-100 via-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-800 mb-6 text-center">
            Uzman Tavsiyeleri
          </h1>
          <p className="text-xl text-purple-600 text-center max-w-3xl mx-auto">
            Çocuk gelişimi, eğitim ve teknoloji alanlarında uzman görüşleri ve güncel makaleler
          </p>
        </div>
      </div>

      {/* Filtreler ve Arama */}
      <div className="sticky top-16 bg-white/80 backdrop-blur-md border-b border-purple-100 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Kategori Filtreleri */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full"
                >
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Arama */}
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Makalelerde ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 px-4 py-2 rounded-full border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Blog İçeriği */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Blog Görseli */}
              <div className="aspect-[16/9] bg-purple-100 relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority={post.id === 1}
                />
              </div>

              {/* Blog İçeriği */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-purple-600 font-medium px-3 py-1 bg-purple-50 rounded-full">
                    {categories.find(c => c.id === post.category)?.label}
                  </span>
                  <span className="text-sm text-purple-500">
                    {post.readTime} okuma
                  </span>
                </div>

                <h2 className="text-xl font-bold text-purple-800 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-purple-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-sm font-medium text-purple-700">{post.author}</p>
                    <p className="text-sm text-purple-500">{post.date}</p>
                  </div>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                  >
                    Devamını Oku 
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
} 