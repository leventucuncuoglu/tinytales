'use client';

import StoryPage from './StoryPage.tsx';

export default function Page({ params }: { params: { id: string } }) {
  return <StoryPage id={params.id} />;
} 