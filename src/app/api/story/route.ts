import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")

// Hikaye verilerini localStorage'dan al
const getStories = () => {
  if (typeof window !== 'undefined') {
    const savedStories = localStorage.getItem('stories');
    if (savedStories) {
      return new Map(JSON.parse(savedStories));
    }
  }
  return new Map();
};

export async function POST(req: Request) {
  try {
    const { childName, theme, characters, language } = await req.json()

    const prompt = language === "tr" 
      ? `3-10 yaş arası çocuklar için ${childName} adlı çocuğun başrol olduğu, ${theme || "eğlenceli"} temalı, ${characters ? `${characters} karakterlerini içeren` : ""} kısa bir hikaye yaz. Hikaye eğitici ve eğlenceli olmalı.`
      : `Write a short story for children aged 3-10 featuring a child named ${childName}, with a ${theme || "fun"} theme${characters ? `, including characters: ${characters}` : ""}. The story should be educational and entertaining.`

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({
      title: `${childName}'in ${theme || "Macera"} Hikayesi`,
      content: text,
      language,
    })
  } catch (error) {
    console.error("[STORY_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Hikaye ID\'si gerekli' },
        { status: 400 }
      );
    }

    // Global stories map'inden hikayeyi al
    const story = global.stories?.get(id);
    
    if (!story) {
      return NextResponse.json(
        { error: 'Hikaye bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(story);
  } catch (error) {
    console.error('Hikaye getirme hatası:', error);
    return NextResponse.json(
      { error: 'Hikaye getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 