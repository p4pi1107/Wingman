// components/dot-test.js
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { saveTestResults } from '@/app/tests/actions';

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getRandomVelocity = () => getRandomNumber(0.7, 0.9) * (Math.random() > 0.5 ? 1 : -1);
const getPosRandomVelocity = () => getRandomNumber(0.7, 0.9) ;

const DotTest = (tId) => {

  const router = useRouter();

  const [dotCount, setDotCount] = useState(getRandomInt(8, 15)); // Random number of dots between 10 and 20
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [key, setKey] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [dotTimer, setDotTimer] = useState(10); // Timer for the dots to keep moving
  const [score, setScore] = useState(0);
  const [isMounted, setIsMounted] = useState(false); // Track if the component has mounted
  const [reset, setReset] = useState(false);
  const [rounds, setRounds] = useState(5)
  const timerRef = useRef(null); // Use a ref to store the interval ID
  // Can change dot size to parametisable
  const dotSize = 45;
  const dotRefs = useRef([]);
  const velocities = useRef([]);
  const positions = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    setIsMounted(true); // Mark the component as mounted
    generateOptions();
    initializeDots();
    startDotTimer();
    if (rounds > 0) {
      setRounds((prev) => prev - 1)
    } else {
      saveTestResults(tId, 5, score)
      router.push(`/result?testName=${"Dot Test"}&totalQuestions=${5}&correctAnswers=${score}`);
    }
    return () => {
      clearInterval(timerRef.current); // Clean up the interval on unmount
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [key]);

  const generateOptions = () => {
    const correctOption = dotCount;
    const otherOptions = new Set();
    console.log("correct:", correctOption)
    while (otherOptions.size < 3) {
      const option = getRandomInt(8, 15);
      if (option !== correctOption) {
        otherOptions.add(option);
      }
    }

    const allOptions = [...otherOptions, correctOption].sort((a, b) => a - b);
    console.log(allOptions)
    setOptions(allOptions);
  };

  const initializeDots = () => {
    dotRefs.current = [...Array(dotCount)].map(() => React.createRef());
    velocities.current = [...Array(dotCount)].map(() => ({
      x: getRandomVelocity(),
      y: getRandomVelocity(),
    }));

    positions.current = [...Array(dotCount)].map(() => generateRandomPosition());
    console.log(positions.current)
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(updateDots);
  };

  const updateDots = () => {
    dotRefs.current.forEach((dotRef, index) => {
      const dot = dotRef.current;
      if (!dot) return;
      const velocity = velocities.current[index];
      const position = positions.current[index];
      const box = dot.parentElement;

      position.left += velocity.x;
      position.top += velocity.y;

      if (position.left <= 0 || Math.floor(position.left) >= Math.floor(box.clientWidth - dot.clientWidth)) {
        velocity.x = velocity.x <= 0? getPosRandomVelocity() : getPosRandomVelocity() * -1
      } 
      if (position.top <= 0 || Math.floor(position.top) >= Math.floor(box.clientHeight - dot.clientHeight)) {
        velocity.y = velocity.y <= 0? getPosRandomVelocity() : getPosRandomVelocity() * -1
      }

      dot.style.left = `${position.left}px`;
      dot.style.top = `${position.top}px`;
    });

    animationFrameRef.current = requestAnimationFrame(updateDots);
  };

  const startDotTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // Clear any existing interval
    }

    timerRef.current = setInterval(() => {
      setDotTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          resetDots()
          return 10;
        }
        return prev - 1;
      });
    }, 1000); // Ensure the timer decreases every 1 second
  };

  const resetDots = () => {
    // Set resets acts a dependancy for incorrect message to show if timer runs out
    setReset(true)
    setTimeout(() => {
      setReset(false)
      // Generate a new random dot count
      setDotCount(getRandomInt(8, 15)); // Generate a new random dot count
      // key value to signal change to fire useEffect
      setKey((prevKey) => prevKey + 1);
    }, 1000);
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    console.log(option, dotCount)
    setIsCorrect(option === dotCount);

    // Add score
    if (option === dotCount) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      clearInterval(timerRef.current);
      setDotCount(getRandomInt(8, 15)); // Generate a new random dot count
      setSelectedOption(null);
      setIsCorrect(false);
      setDotTimer(10); // Reset the timer
      setKey((prevKey) => prevKey + 1);
    }, 1000); // Delay to show the result before generating new dots
  };

  const generateRandomPosition = () => {
    const x = getRandomInt(0, 150 - dotSize); // Adjust values to keep dots within the box
    const y = getRandomInt(0, 150 - dotSize);
    return { left: x, top: y };
  };

  return (
    <div className="dot-test">
      <div className="instructions">
        <h1>Dot Test</h1>
        <p>Count the dots moving in the box and select the correct number from the options below.</p>
        <p>Time remaining: {dotTimer} seconds</p>
      </div>
      <div className="dot-box">
        {isMounted && [...Array(dotCount)].map((_, index) => (
          <div
            key={index}
            ref={dotRefs.current[index]}
            className="dot"
            style={{
              left: `${positions.current[index]?.left}px`,
              top: `${positions.current[index]?.top}px`,
            }}
          ></div>
        ))}
      </div>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null || dotTimer <= 0 || reset == true}
          >
            {option}
          </button>
        ))}
      </div>
      <p className="score">Score: {score}</p> {/* Display the score */}
      {(selectedOption !== null || reset == true) && (
        <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? 'Correct!' : `Incorrect, the correct answer was ${dotCount}.`}
        </div>
      )}
      <style jsx>{`
        .dot-test {
          text-align: center;
          padding: 20px;
        }
        .dot-box {
          width: 40vw; /* Adjusted size to scale with screen width */
          height: 40vw; /* Adjusted size to scale with screen height */
          max-width: 400px;
          max-height: 400px;
          margin: 20px auto;
          position: relative;
          border: 2px solid #000;
          overflow: hidden;
        }
        .dot {
          width: 45px;
          height: 45px;
          background-color: red;
          border-radius: 50%;
          position: absolute;
          border: 2px solid black;
        }
        .options {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        .option-button {
          padding: 10px 20px;
          margin: 0 10px;
          font-size: 16px;
          font-weight: bold;
          background: linear-gradient(135deg, #ff7e5f, #feb47b);
          border: none;
          border-radius: 5px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .option-button:hover {
          background: linear-gradient(135deg, #feb47b, #ff7e5f);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        .option-button:disabled {
          cursor: not-allowed;
          background-color: gray;
          box-shadow: none;
        }
        .result {
          margin-top: 20px;
          font-size: 20px;
          font-weight: bold;
        }
        .correct {
          color: green;
        }
        .incorrect {
          color: red;
        }
          .score {
        margin-top: 40px; /* Increase this value to add more spacing */
        font-size: 24px;
        font-weight: bold;
      }
      `}</style>
    </div>
  );
};

export default DotTest;
