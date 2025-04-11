"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "../page";
import Image from "next/image";

interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  image: string;
  content: string;
  featured: boolean;
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find(post => post.id === Number(params.id));

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-purple-800 mb-4">
            Blog yazısı bulunamadı
          </h1>
          <Button asChild>
            <Link href="/blog" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Blog Listesine Dön
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Üst Bar */}
        <div className="mb-8">
          <Button variant="ghost" className="text-purple-600 -ml-4" asChild>
            <Link href="/blog" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Blog Listesine Dön
            </Link>
          </Button>
        </div>

        {/* Blog Başlığı */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-purple-600 font-medium px-3 py-1 bg-purple-50 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-purple-500">
              {post.readTime} okuma
            </span>
          </div>
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center justify-between text-purple-600">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
        </div>

        {/* Blog Görseli */}
        <div className="relative h-64 md:h-96 mb-8 bg-purple-100 rounded-2xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Blog İçeriği */}
        <article className="prose prose-purple max-w-none">
          <p className="text-purple-800 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
          {post.content && post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-purple-800 mb-6 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Paylaşım Butonları */}
        <div className="mt-12 pt-8 border-t border-purple-100">
          <h3 className="text-lg font-semibold text-purple-800 mb-4">
            Bu Yazıyı Paylaş
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="text-purple-600">
              Twitter'da Paylaş
            </Button>
            <Button variant="outline" className="text-purple-600">
              Facebook'ta Paylaş
            </Button>
            <Button variant="outline" className="text-purple-600">
              LinkedIn'de Paylaş
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 