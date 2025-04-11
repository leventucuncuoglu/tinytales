import { NextResponse } from "next/server";

// Sahte hikaye listesi (ileride veritabanı ile entegre edilebilir)
const stories = [
  {
    id: "1",
    title: "Lena'nın Renkli Yolculuğu",
    description: "Lena, gökyüzünde uçan renkli bir balonla çıktığı büyülü yolculukta neler yaşayacak?",
    language: "tr",
  },
  {
    id: "2",
    title: "The Magical Forest of Ava",
    description: "Ava discovers a talking squirrel in a glowing forest full of surprises!",
    language: "en",
  }
];

export async function GET() {
  try {
    return NextResponse.json(stories);
  } catch {
    return NextResponse.json(
      { error: "Hikayeler yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
