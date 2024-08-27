// pages/tests/reaction-tests/page.tsx
"use client"
import React from 'react';
import DotTest from '@/components/tests/dot-test';
import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'next/navigation';

export default function DotTestPage() {
  const searchParams = useSearchParams();
  const tId = searchParams.get("tId");
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Counting Dot Test</h1>
        <Separator />
        <DotTest tId={tId}/>
      </div>
    </div>
  );
}
