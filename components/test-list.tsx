"use client";
import { useState, useEffect } from 'react';
import TestItem from "./test-item";
import { createClient } from '@/utils/supabase/client';

const TestList = () => {
  const [testsWithScores, setTestsWithScores] = useState([]);
  const [loadingScores, setLoadingScores] = useState(true);

  useEffect(() => {
    // Client-side fetching for up-to-date high scores
    const fetchUpdatedScores = async () => {
      const supabase = createClient();

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: updatedTests, error: updateError } = await supabase
        .from('tests')
        .select(`
          *,
          test_userResults (
            highScores
          )
        `)
        .eq('test_userResults.user_id', user.id);

      if (updateError) {
        console.error(updateError);
        return;
      }

      const updatedTestsWithScores = updatedTests.map(test => ({
        ...test,
        highScores: test.test_userResults[0] ? test.test_userResults[0].highScores : null,
        test_userResults: undefined
      }));

      setTestsWithScores(updatedTestsWithScores);
      setLoadingScores(false);
    };

    fetchUpdatedScores();

    // Simulate a 1.5-second loading delay before showing scores
    const timer = setTimeout(() => {
      setLoadingScores(false);
    }, 1500);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {testsWithScores.map((test) => (
        <TestItem key={test.id} test={test} isLoading={loadingScores} />
      ))}
    </div>
  );
};

export default TestList;
