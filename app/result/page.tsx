// pages/tests/reaction-tests/page.tsx
"use client"
import React from 'react';
import { Separator } from '@/components/ui/separator';
import ReactionTestResults from '@/components/result';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function TestResultPage() {

  // Get test results from router
  const searchParams = useSearchParams();
  const totalQuestions = searchParams.get('totalQuestions');
  const correctAnswers = searchParams.get('correctAnswers');
  const testName= searchParams.get('testName');

  const supabase = createClient();
  const {
    data: { publicUrl },
  } = supabase.storage.from('public_bucket').getPublicUrl('plane.png')
  const aiTips = ['Could try to spend less time on...', 'Be more careful of shapes']
  
  return (
    <div className="w-full max-w-6xl flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg border border-gray-300">
          <h1 className="text-3xl font-bold mb-4 text-center">Your Results</h1>
          {publicUrl ? (
              <img src={publicUrl} alt="Header Image" className="plane-icon mx-auto" />
            ) : (
              <div>Loading...</div>
            )}
          <div className="inner-container">
            <h3 className="result-heading text-center">{testName}</h3>
            <Separator />
            <div className="result-stats">
              <div className="result-stat">
                <p className="stat-title">
                <span>Total</span>
                  <br />
                  <span>Questions</span>
                </p>
                <p className="stat-value">{totalQuestions}</p>
              </div>
              <div className="result-stat">
                <p className="stat-title">Correct</p>
                <p className="stat-value">{correctAnswers}</p>
              </div>
              <div className="result-stat">
                <p className="stat-title">Incorrect</p>
                <p className="stat-value">{Number(totalQuestions) - Number(correctAnswers)}</p>
              </div>
            </div>
            <div className="ai-tips">
              <div className="ai-avatar">
                <img src="/ai-avatar.png" alt="AI Assistant" className="avatar-image" /> {/* Replace with your AI assistant image */}
              </div>
              <div className="ai-dialogue">
                <h4 className="ai-tips-title">AI Assistant</h4>
                <div className="ai-tips-content">
                  {aiTips.map((tip, index) => (
                    <p key={index}>{tip}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        
      </div>
      <style jsx>{`
        .outer-container {
          text-align: center;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
          max-width: 700px;
          margin: 0 auto;
          border: 1px solid black;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        }
        .inner-container {
          background-color: #f9f9f9;
          border-radius: 12px;
          padding: 20px;
          margin-top: 10px;
          box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
        }
        .result-heading {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .result-stats {
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
          text-align: center
        }
        .result-stat {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .stat-title {
          font-size: 18px; /* Increased font size */
          color: #777;
          line-height: 1.5;
          min-height: 40px;
        }
        .stat-value {
          font-size: 18px;
          font-weight: bold;
        }
        .ai-tips {
          display: flex;
          align-items: center;
          background-color: #f0f4ff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
        }
        .ai-avatar {
          margin-right: 20px;
        }
        .avatar-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 2px solid #d1d9ff;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        }
        .ai-dialogue {
          background-color: white;
          border-radius: 12px;
          padding: 20px;
          flex: 1;
          
        }
        .ai-tips-title {
          font-size: 20px;
          font-weight: bold;
          color: #4f5dff;
          margin-bottom: 12px;
        }
        .ai-tips-content p {
          margin: 0;
          font-size: 16px;
          color: #333;
          line-height: 1.5;
        }
        .plane-icon {
          width: 100px;
          margin-bottom: 20px;
        }
      `}</style>
  </div>
  );
}