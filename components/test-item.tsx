// components/TestItem.tsx
"use client"
import { useRouter } from 'next/navigation';

interface Test {
    id: string;
    testName: string;
    description: string;
    tips: string[];
    testPath: string;
}

const TestItem = ({ test, isLoading }) => {
    const router = useRouter();

    const handleTestClick = () => {
        // Navigate to the test details page, passing the data via URL query parameters
        router.push(`/tests?id=${test.id}&name=${encodeURIComponent(test.testName)}&path=${encodeURIComponent(test.testPath)}&description=${encodeURIComponent(test.description)}&tips=${encodeURIComponent(JSON.stringify(test.tips))}`);
    };

    return (
        <div
          className="p-4 bg-white shadow-md rounded-md block hover:bg-gray-100 cursor-pointer"
          onClick={handleTestClick}
        >
          <h2 className="text-xl font-semibold">{test.testName}</h2>
          <p>{test.description}</p>
        {isLoading ? (
          <div className="text-blue-500 font-bold">
            Loading new high score...
          </div>
        ) : (test.highScores && (
            <div className="text-green-500 font-bold">
              <p>Highscores:</p>
              <p>{test.highScores.correct}/{test.highScores.total}</p>
            </div>)
          )}
        </div>
      );
} 

export default TestItem;