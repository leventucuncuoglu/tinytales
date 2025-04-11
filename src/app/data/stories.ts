interface Story {
  id: number;
  title: string;
  description: string;
  content?: string;
  image: string;
  audio?: string;
  video?: string;
  type: 'audio' | 'video' | 'book' | 'sleep';
  duration: string;
  rating: string;
  category: string;
  isPro: boolean;
  pages?: {
    pageNumber: number;
    content: string;
    image: string;
    audio: string;
  }[];
}

// Sesli Hikayeler
export const audioStories: Story[] = [
  {
    id: 1,
    title: "Kırmızı Atkı",
    description: "Ayşegül'ün kırmızı atkısıyla yaşadığı sıcacık bir kış masalı...",
    content: `Bir zamanlar Ayşegül adında küçük bir kız vardı. Ayşegül'ün en sevdiği eşyası, büyükannesinin ona hediye ettiği kırmızı atkısıydı...`,
    image: "/images/kirmiziatki.jpg",
    audio: "/sounds/kirmiziatkiaysegul.mp3",
    type: "audio",
    duration: "5 dk",
    rating: "4.9",
    category: "Masal",
    isPro: false,
  },
  {
    id: 2,
    title: "Uzay Kaşifi Lio",
    description: "Küçük astronot Lio'nun yıldızlar arasındaki heyecan dolu keşif yolculuğu...",
    content: "Uzay Kaşifi Lio'nun hikayesi içeriği...",
    image: "/images/uzay.jpg",
    audio: "/sounds/lio.mp3",
    type: "audio",
    duration: "8 dk",
    rating: "4.7",
    category: "Uzay",
    isPro: false
  },
  {
    id: 3,
    title: "Mira ve Dostu Unicorn",
    description: "Küçük astronot Mira'nın uzay gemisiyle yıldızlar arasında yaşadığı büyülü macera. Her yıldızda yeni bir arkadaş ediniyor.",
    image: "/images/mira.jpg",
    audio: "/sounds/mira.mp3",
    type: "audio",
    duration: "12 dk",
    rating: "4.9",
    category: "Uzay",
    isPro: false
  },
  {
    id: 4,
    title: "Deniz Kızı Lena'nın Su Altı Macerası",
    description: "Küçük deniz kızı Lena'nın okyanuslardaki büyülü macerası. Renkli balıklar, konuşan deniz yıldızları ve neşeli yunuslarla dolu bir hikaye.",
    image: "/images/denizkizi.jpg",
    duration: "8 dk",
    category: "Macera",
    rating: "4.8",
    type: "audio",
    isPro: true
  },
  {
    id: 5,
    title: "Cesur Aslan Yavrusu Leka",
    description: "Savanada yaşayan küçük aslan Leka'nın cesaret ve arkadaşlık dolu hikayesi. Farklı hayvanlarla tanışıp yeni şeyler öğreniyor.",
    image: "/images/8cesuraslanyavrusuleka.jpg",
    duration: "10 dk",
    category: "Macera",
    rating: "4.7",
    type: "audio",
    isPro: true
  },
  {
    id: 6,
    title: "Yıldızlı Gece Maceraları",
    description: "Küçük yıldız tozu perisi Luna'nın gökyüzündeki sihirli yolculuğu. Her gece farklı bir yıldızı parlatarak çocukların dileklerini gerçekleştiriyor.",
    image: "/images/10yildizligecemaceralari.jpg",
    duration: "12 dk",
    category: "Fantastik",
    rating: "4.9",
    type: "audio",
    isPro: true
  },
  {
    id: 7,
    title: "Konuşan Çaydanlık",
    description: "Büyükanneden kalan sihirli çaydanlığın mutfaktaki eğlenceli maceraları. Diğer mutfak eşyalarıyla arkadaş olup neşeli şarkılar söylüyor.",
    image: "/images/12konusancaydanlik.jpg",
    duration: "7 dk",
    category: "Komedi",
    rating: "4.6",
    type: "audio",
    isPro: true
  },
  {
    id: 8,
    title: "Tim'in Büyük Balonu",
    description: "Küçük Tim'in renkli balonuyla çıktığı gökyüzü yolculuğu. Bulutların üzerinde dans edip gökkuşağının renklerini keşfediyor.",
    image: "/images/14timinbuyukbalonu.jpg",
    duration: "9 dk",
    category: "Macera",
    rating: "4.8",
    type: "audio",
    isPro: true
  },
  {
    id: 9,
    title: "Gökkuşağı Ağacı",
    description: "Sihirli tohumlardan büyüyen ve rengarenk meyveler veren özel bir ağacın hikayesi. Her meyvesi farklı bir sürpriz taşıyor.",
    image: "/images/9gokkusagiagaci.jpg",
    type: "audio",
    duration: "11 dk",
    rating: "4.8",
    category: "Fantastik",
    isPro: true
  },
  {
    id: 10,
    title: "Meraklı Penguen",
    description: "Antarktika'nın en meraklı pengueni Pingu'nun buz dağlarında keşfettiği gizemli mağaranın hikayesi.",
    image: "/images/15meraklipenguen.jpg",
    type: "audio",
    duration: "8 dk",
    rating: "4.7",
    category: "Macera",
    isPro: true
  },
  {
    id: 11,
    title: "Ellie'nin Doğum Günü",
    description: "Küçük fil Ellie'nin unutulmaz doğum günü partisi ve arkadaşlarının hazırladığı sürprizler.",
    image: "/images/11fildogumgunusuprizi.jpg",
    type: "audio",
    duration: "10 dk",
    rating: "4.9",
    category: "Kutlama",
    isPro: true
  },
  {
    id: 12,
    title: "Kaptan Koala ve Hazine Avcısı",
    description: "Kaptan Koala'nın okaliptus ormanlarında gizli bir harita bulmasıyla başlayan heyecanlı hazine avı macerası.",
    image: "/images/13kaptankoalahazineavcisi.jpg",
    type: "audio",
    duration: "13 dk",
    rating: "4.8",
    category: "Macera",
    isPro: true
  }
];

// Videolu Hikayeler
export const videoStories: Story[] = [
  {
    id: 101,
    title: "Gizemli Orman",
    description: "Küçük tavşan Pıtır'ın sihirli ormanın derinliklerindeki maceraları. Işıldayan mantarlar, konuşan ağaçlar ve renkli perilerle dolu bir yolculuk.",
    image: "/images/gizemliorman.jpg",
    video: "/videos/gizemliorman.mp4",
    type: "video",
    duration: "15 dk",
    category: "Macera",
    rating: "4.9",
    isPro: false
  },
  {
    id: 102,
    title: "Uzay Kaşifi Mira",
    description: "Küçük astronot Mira'nın uzay gemisiyle gezegenleri keşfetme macerası. Her gezegende yeni arkadaşlar ediniyor.",
    image: "/images/uzay.jpg",
    duration: "14 dk",
    category: "Uzay",
    rating: "4.8",
    type: "video",
    isPro: true
  },
  {
    id: 103,
    title: "Sihirli Fırça",
    description: "Ressam kedi Minnoş'un sihirli fırçasıyla çizdiği resimlerin canlanma hikayesi. Her resim yeni bir maceraya kapı açıyor.",
    image: "/images/firca.jpg",
    duration: "11 dk",
    category: "Fantastik",
    rating: "4.7",
    type: "video",
    isPro: false
  },
  {
    id: 104,
    title: "Uzayda Bir Gün",
    description: "Küçük astronot Ada'nın uzay istasyonundaki heyecanlı bir günü...",
    content: "Uzayda Bir Gün hikayesi içeriği...",
    image: "/images/uzay.jpg",
    video: "/videos/uzaydabirgun.mp4",
    type: "video",
    duration: "10 dk",
    rating: "4.8",
    category: "Uzay",
    isPro: false
  },
  {
    id: 105,
    title: "Denizin Altında",
    description: "Deniz canlılarının renkli dünyasına yapılan büyülü bir yolculuk...",
    image: "/images/denizinaltinda.jpg",
    video: "/videos/denizinalti.mp4",
    type: "video",
    duration: "8 dk",
    rating: "4.9",
    category: "Deniz",
    isPro: false
  }
];

// Hikaye Kitapları
export const bookStories: Story[] = [
  {
    id: 201,
    title: "Rüya Bahçesi",
    description: "Minik kelebek Rüya'nın rengarenk çiçeklerle dolu bahçedeki arkadaşlık hikayesi. Her çiçeğin farklı bir sırrı var.",
    image: "/images/bahce.jpg",
    duration: "5 dk",
    category: "Doğa",
    rating: "4.6",
    type: "book",
    isPro: false,
    pages: [
      {
        pageNumber: 1,
        content: "Bir zamanlar, rengarenk çiçeklerle dolu büyülü bir bahçede yaşayan minik bir kelebek varmış. Bu kelebeğin adı Rüya'ymış...",
        image: "/images/bahce.jpg",
        audio: "/audio/books/ruya-bahcesi/page1.mp3"
      },
      {
        pageNumber: 2,
        content: "Rüya her sabah güneşle birlikte uyanır, çiçekleri tek tek ziyaret edermiş...",
        image: "/images/kirmiziatki.jpg",
        audio: "/audio/books/ruya-bahcesi/page2.mp3"
      },
      {
        pageNumber: 3,
        content: "Bir gün, bahçenin en güzel çiçeklerinden biri olan Gül ile tanışmış...",
        image: "/images/uzay.jpg",
        audio: "/audio/books/ruya-bahcesi/page3.mp3"
      },
      {
        pageNumber: 4,
        content: "Gül, Rüya'ya bahçedeki sihirli bir sırrı anlatmış...",
        image: "/images/mira.jpg",
        audio: "/audio/books/ruya-bahcesi/page4.mp3"
      },
      {
        pageNumber: 5,
        content: "Meğer her gece yarısı, çiçekler dans edip şarkılar söylüyormuş...",
        image: "/images/denizkizi.jpg",
        audio: "/audio/books/ruya-bahcesi/page5.mp3"
      }
    ]
  },
  {
    id: 202,
    title: "Müzisyen Fare Bıdık",
    description: "Küçük fare Bıdık'ın kendi orkestrasını kurma hayali. Farklı hayvanlarla bir araya gelip muhteşem bir konser veriyorlar.",
    image: "/books/Müzisyen Fare Bıdık/muzisyenfarebidik-kapak.jpg",
    duration: "6 dk",
    category: "Müzik",
    rating: "4.8",
    type: "book",
    isPro: true
  },
  {
    id: 203,
    title: "Sihirli Gökkuşağı Yolu",
    description: "Küçük Ayşe'nin gökkuşağı üzerinde çıktığı büyülü yolculuk. Her renkte farklı bir macera ve yeni arkadaşlar onu bekliyor...",
    image: "/books/Sihirli Gökkuşağı Yolu/kapak.jpg",
    type: "book",
    duration: "15 dk",
    rating: "4.9",
    category: "Fantastik",
    isPro: false,
    pages: [
      {
        pageNumber: 1,
        content: "Bir zamanlar, gökyüzünü çok seven küçük bir kız vardı. Adı Ayşe'ydi ve en büyük hayali gökkuşağına dokunabilmekti...",
        image: "/books/Sihirli Gökkuşağı Yolu/1.jpg",
        audio: "/audio/books/sihirli-gokkusagi-yolu/page1.mp3"
      },
      {
        pageNumber: 2,
        content: "Bir gün, bahçede oynarken gökyüzünde parlak bir gökkuşağı belirdi. Ayşe'nin gözleri hayranlıkla parladı...",
        image: "/books/Sihirli Gökkuşağı Yolu/2.jpg",
        audio: "/audio/books/sihirli-gokkusagi-yolu/page2.mp3"
      },
      {
        pageNumber: 3,
        content: "Gökkuşağı yavaşça Ayşe'nin bahçesine doğru eğildi. Sanki ona 'Gel, benimle yolculuğa çık!' der gibiydi...",
        image: "/books/Sihirli Gökkuşağı Yolu/3.jpg",
        audio: "/audio/books/sihirli-gokkusagi-yolu/page3.mp3"
      },
      {
        pageNumber: 4,
        content: "Ayşe cesurca gökkuşağına adım attı. Rengarenk yol, onun küçük ayaklarının altında parıldıyordu...",
        image: "/books/Sihirli Gökkuşağı Yolu/4.jpg",
        audio: "/audio/books/sihirli-gokkusagi-yolu/page4.mp3"
      },
      {
        pageNumber: 5,
        content: "Kırmızı rengin üzerinde, ateş perisi ile tanıştı. Perinin saçları alev alev dans ediyordu...",
        image: "/books/Sihirli Gökkuşağı Yolu/5.jpg",
        audio: "/audio/books/sihirli-gokkusagi-yolu/page5.mp3"
      },
      {
        pageNumber: 6,
        content: "Turuncu bölgede, neşeli bir sonbahar cini ona yaprakların dansını öğretti...",
        image: "/books/Sihirli Gökkuşağı Yolu/6.jpg",
        audio: "/audio/books/sihirli-gokkusagi-yolu/page6.mp3"
      },
      {
        pageNumber: 7,
        content: "Sarı renkte, güneş çocukları ile parlak toplarla oyunlar oynadı...",
        image: "/books/Sihirli Gökkuşağı Yolu/7.jpg",
        audio: "/audio/books/sihirli-gokkusagi-yolu/page7.mp3"
      },
      {
        pageNumber: 8,
        content: "Yeşil bölgede, orman perileri ona en güzel şarkılarını söylediler...",
        image: "/books/Sihirli Gökkuşağı Yolu/8.jpg",
        audio: "/audio/books/sihirli-gokkusagi-yolu/page8.mp3"
      },
      {
        pageNumber: 9,
        content: "Mavi renkte, gökyüzü kuşları ile bulutların üzerinde süzüldü...",
        image: "/books/Sihirli Gökkuşağı Yolu/9.jpg",
        audio: "/audio/books/sihirli-gokkusagi-yolu/page9.mp3"
      },
      {
        pageNumber: 10,
        content: "Ve son olarak mor renkte, yıldız toplayıcıları ile gecenin güzelliklerini keşfetti...",
        image: "/books/Sihirli Gökkuşağı Yolu/10.jpg",
        audio: "/audio/books/sihirli-gokkusagi-yolu/page10.mp3"
      }
    ]
  },
  {
    id: 204,
    title: "Küçük Bilim İnsanı",
    description: "Meraklı Elif'in laboratuvardaki keşifleri...",
    image: "/books/Küçük Bilim İnsanı/kucukbiliminsani.jpg",
    type: "book",
    duration: "20 dk",
    rating: "4.8",
    category: "Bilim",
    isPro: false
  },
  {
    id: 205,
    title: "Ormanın Şarkısı",
    description: "Orman sakinlerinin muhteşem müzik festivali...",
    image: "/books/Ormanın Şarkısı/ormaninsarkisi-kapak.jpg",
    type: "book",
    duration: "18 dk",
    rating: "4.7",
    category: "Doğa",
    isPro: true
  }
];

// Uyku Müzikleri
export const sleepSounds: Story[] = [
  {
    id: 301,
    title: "Rüya Fısıltısı",
    description: "Tatlı rüyalara dalmak için huzur veren melodiler...",
    image: "/images/ruyafisiltisi.jpg",
    audio: "/sounds/ruyafisiltisi.mp3",
    type: "sleep",
    duration: "30 dk",
    rating: "4.9",
    category: "Ninni",
    isPro: false
  },
  {
    id: 302,
    title: "Rüya Tarlası",
    description: "Renkli çiçekler ve kelebekler arasında sakin bir uyku yolculuğu...",
    image: "/images/ruyatarlasi.jpg",
    audio: "/sounds/ruyatarlasi.mp3",
    type: "sleep",
    duration: "45 dk",
    rating: "4.8",
    category: "Doğa Sesleri",
    isPro: false
  },
  {
    id: 303,
    title: "Uyku Bulutu",
    description: "Pamuk gibi yumuşak bulutların üzerinde tatlı bir uyku...",
    image: "/images/uykubulutu.jpg",
    audio: "/sounds/uykubulutu.mp3",
    type: "sleep",
    duration: "20 dk",
    rating: "4.7",
    category: "Ninni",
    isPro: true
  },
  {
    id: 304,
    title: "Yıldızlı Gece Maceraları",
    description: "Gökyüzündeki yıldızların büyülü dünyasında sakin bir yolculuk...",
    image: "/images/10yildizligecemaceralari.jpg",
    audio: "/sounds/yildizligecemaceralari.mp3",
    type: "sleep",
    duration: "60 dk",
    rating: "4.9",
    category: "Doğa Sesleri",
    isPro: true
  }
]; 