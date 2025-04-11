import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  notFound();
}
