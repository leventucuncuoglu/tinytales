import { NextResponse } from "next/server";

const sampleStory = {
  title: "Lena'nın Macerası",
  pages: [
    {
      content:
        "Bir varmış bir yokmuş, Lena adında meraklı bir kız çocuğu yaşarmış. Lena, minik pembe elbisesiyle ve dağınık saçlarıyla oynarken bir gün garip bir şey fark etti. Evi kıpır kıpır hareket ediyordu!",
      image: "/images/story/page1.jpg",
    },
    {
      content:
        "Lena hemen pencereye koştu ve dışarı baktı. Evin etrafında renkli ışıklar dans ediyordu. Bu ışıklar, evin yavaşça yerden yükselmeye başladığını gösteriyordu.",
      image: "/images/story/page2.jpg",
    },
    {
      content:
        "Korkması gerekirken, Lena çok heyecanlandı. Bu tam da onun hayal ettiği türden bir maceraydı! Hemen en sevdiği oyuncak ayısını kaptı ve pencerenin kenarına oturdu.",
      image: "/images/story/page3.jpg",
    },
  ],
};

export async function GET() {
  try {
    return NextResponse.json(sampleStory);
  } catch {
    return NextResponse.json(
      { error: "Hikaye yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
