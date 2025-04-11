import { NextResponse } from "next/server";

const stories = [
  {
    id: "1",
    title: "Lena'nın Renkli Balonları",
    content: "Bir gün Lena, gökyüzüne doğru süzülen rengarenk balonları takip etti...",
  },
  {
    id: "2",
    title: "Lena ve Minik Ejderha",
    content: "Lena, ormanda kaybolmuş minik bir ejderha buldu ve ona yardım etmeye karar verdi...",
  },
];

export async function GET() {
  return NextResponse.json(stories);
}
