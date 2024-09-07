// pages/tests/reaction-tests/page.tsx
"use client"
import React from 'react';
import ReactionTest from '@/components/tests/reaction-test';
import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'next/navigation';

export default function ReactionTestPage() {

  const searchParams = useSearchParams();
  const tId = searchParams.get("tId");
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Reaction Test</h1>
        <Separator />
        <ReactionTest tId= {tId} />
      </div>
    </div>
  );
}
