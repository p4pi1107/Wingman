"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const TestDetail = () => {

  const searchParams = useSearchParams();
  const router = useRouter();


  const [testInfo, setTestInfo] = useState({
    tId: searchParams.get('id') || '',
    name: searchParams.get('name') || '',
    description: searchParams.get('description') || '',
    tips: searchParams.get('tips') ? JSON.parse(searchParams.get('tips') || '') : [],
    path: searchParams.get('path') || ''
  });

  if (!testInfo.name) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">{testInfo.name}</h1>
        <p className="mb-4">{testInfo.description}</p>
        <h2 className="text-xl font-semibold mb-2">Tips & Tricks</h2>
        <ul className="mb-4 list-disc list-inside">
          {testInfo.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
        <Link href={`/tests/${testInfo.path}?tId=${testInfo.tId}`}>
          <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Play {testInfo.name}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TestDetail;
