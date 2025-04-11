import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Global tip tanımlaması
declare global {
  // eslint-disable-next-line no-var
  var stories: Map<string, { title: string; content: string }>;
}

// Stories Map'ini başlat
if (!global.stories) {
  global.stories = new Map();
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { characterName, characterAge, storyTheme, additionalDetails } = await request.json();

    const prompt = `2-7 yaş arası çocuklar için benzersiz, ilgi çekici ve hayal gücünü harekete geçiren bir hikaye oluştur.

Ana Karakter: ${characterName}
Karakterin Yaşı: ${characterAge}
Ana Tema: ${storyTheme}
Ek Detaylar: ${additionalDetails}

Hikaye şu özelliklere sahip olmalı:

1. Merak uyandıran ve dikkat çeken bir başlangıçla başla ve benzersiz bir giriş yap (örn: 'Bir gün, gökyüzünden düşen bir yıldız küçük bir köye bir hediye getirdi...' veya 'Denizin altında, mercanların arasında saklanan bir sır ortaya çıkmayı bekliyordu...').

2. Ana karakter ${characterName} olmalı ve şu özelliklere sahip olmalı:
   - Meraklı, cesur ve nazik bir kişilik
   - Çocukların kolayca ilişki kurabileceği özellikler
   - ${characterAge} yaşında bir çocuk için uygun davranışlar

3. Yaratıcı ve yaşa uygun unsurlar içeren macera dolu veya büyülü bir olay örgüsü:
   - Sihirli diyarlar
   - Dost canlısı fantastik yaratıklar
   - Konuşan hayvanlar
   - Büyülü nesneler
   - ${storyTheme} temasını hikayeye ustaca yerleştir

4. İnce bir şekilde işlenmiş ahlaki ders veya ilham verici mesajlar:
   - Nezaket ve empati
   - Cesaret ve azim
   - Takım çalışması
   - Dostluk ve yardımlaşma

5. Kaçınılması gerekenler:
   - Şiddet içeren sahneler
   - Korku veya endişe yaratan durumlar
   - Karmaşık veya soyut fikirler
   - Olumsuz duygular

6. Anlatım özellikleri:
   - Canlı ve betimleyici bir dil kullan
   - Çocukların anlayabileceği basit kelimeler seç
   - Her cümle kısa ve net olmalı
   - Diyaloglar samimi ve doğal olmalı

7. Son:
   - Mutlu ve tatmin edici bir sonla bitir
   - ${characterName}'nin hedefine ulaşmasını sağla
   - Çocuklara ilham ve mutluluk veren bir kapanış yap

Hikaye uzunluğu 800-1000 kelime arasında olmalı ve paragraflar 3-4 kısa cümleden oluşmalı.`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const storyId = Date.now().toString();
    const story = {
      title: `${characterName}'nin ${storyTheme} Macerası`,
      content: text
    };
    global.stories.set(storyId, story);

    return NextResponse.json({ id: storyId, ...story });

  } catch (err) {
    console.error('Hikaye oluşturma hatası:', err);
    return NextResponse.json(
      { error: 'Hikaye oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Hikaye ID'si gerekli" },
        { status: 400 }
      );
    }

    const story = global.stories.get(id);
    if (!story) {
      return NextResponse.json(
        { error: "Hikaye bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(story);
  } catch (err) {
    console.error('Hikaye getirme hatası:', err);
    return NextResponse.json(
      { error: "Hikaye getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
