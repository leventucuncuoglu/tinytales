"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BlogDetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold text-purple-800 mb-4">
          Bu blog detay sayfası şu anda devre dışı.
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
