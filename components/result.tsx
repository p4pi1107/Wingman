import React from 'react';
interface ReactionTestResultsProps {
  totalQuestions: number;
  correctAnswers: number;
  aiTips: string[];
}

const ReactionTestResults: React.FC<ReactionTestResultsProps> = ({ totalQuestions, correctAnswers, aiTips }) => {
  return (
    <div className="result-container">
        <h2 className="result-title">Your Results</h2>
        <div className="result-box">
        <h3 className="result-heading">Reaction Test</h3>
        <div className="result-stats">
            <div className="result-stat">
            <p className="stat-title">Total Questions</p>
            <p className="stat-value">{totalQuestions}</p>
            </div>
            <div className="result-stat">
            <p className="stat-title">Correct</p>
            <p className="stat-value">{correctAnswers}</p>
            </div>
            <div className="result-stat">
            <p className="stat-title">Incorrect</p>
            <p className="stat-value">{totalQuestions - correctAnswerss}</p>
            </div>
        </div>
        <div className="ai-tips">
            <h4 className="ai-tips-title">AI Tips</h4>
            <div className="ai-tips-content">
            {aiTips.map((tip, index) => (
                <p key={index}>{tip}</p>
            ))}
            </div>
        </div>
        </div>
        <style jsx>{`
        .result-container {
            text-align: center;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 12px;
            box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
        }
        .result-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .plane-icon {
            width: 50px;
            margin-bottom: 20px;
        }
        .result-box {
            background-color: #fff;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
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
        }
        .result-stat {
            text-align: center;
        }
        .stat-title {
            font-size: 16px;
            color: #777;
        }
        .stat-value {
            font-size: 18px;
            font-weight: bold;
        }
        .ai-tips {
            background-color: #ffe0cc;
            border-radius: 8px;
            padding: 10px;
        }
        .ai-tips-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .ai-tips-content p {
            margin: 0;
        }
        `}</style>
    </div>
    );
};

export default ReactionTestResults;
