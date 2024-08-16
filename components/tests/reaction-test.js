// components/reaction-test.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCircle, faStar, faClover, faDiamond, faHeart, faBurst } from '@fortawesome/free-solid-svg-icons';

const getRandomInt = (max) => Math.floor(Math.random() * max);
const getRandomBoolean = () => Math.random() < 0.5; // Returns true or false randomly

const ReactionTest = () => {
  const [leftObject, setLeftObject] = useState('');
  const [rightObject, setRightObject] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [timer, setTimer] = useState(60); // 30-second timer
  const [gameOver, setGameOver] = useState(false);

  // Add more object types
  const objects = [faSquare, faCircle, faStar, faClover, faDiamond, faHeart, faBurst];

  useEffect(() => {
    const intervalId = setInterval(generateObjectRandomly, 1000); // Generate a new object every 1 second
    const timerId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(timerId);
          clearInterval(intervalId);
          setGameOver(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(timerId);
    };
  }, []);

  const generateObjectRandomly = () => {

    if (gameOver) return;

    const object = objects[getRandomInt(objects.length)];
    
    // Set initial objects
    if (startTime == null) {
      setLeftObject(objects[getRandomInt(objects.length)])
      setRightObject(objects[getRandomInt(objects.length)])
    } else if (getRandomBoolean()) {
      setLeftObject(object);
    } else {
      setRightObject(object);
    }
    

    setStartTime(new Date().getTime());
  };

  const handleButtonClick = () => {

    if (gameOver) return;

    const currentTime = new Date().getTime();
    if (leftObject === rightObject) {
      setReactionTime(currentTime - startTime);
      setScore(score + 1);
      generateObjectRandomly();
    } else {
      setWrong(wrong + 1)
    }
  };

  return (
    <div className="reaction-test">
      <div className="instructions">
        <h1>Rules</h1>
        <p>You are presented with objects on screen and you must press the "EQUAL" button as quickly as possible when two objects that are the same appear.</p>
        <h1>Example</h1>
        <p>Since two rectangles are presented on the screen, press the "EQUAL" button as quickly as possible.</p>
      </div>
      <div className="game-area">
        <div className="timer">
          <h2>Time Remaining: {timer} seconds</h2>
        </div>
        <div className="objects">
          <div className="object">
            {leftObject && <FontAwesomeIcon icon={leftObject} size="4x" />}
          </div>
          <div className={`squiggly-line ${gameOver ? 'stopped' : ''}`}></div> {/* Squiggly line */}
          <div className="object">
            {rightObject && <FontAwesomeIcon icon={rightObject} size="4x" />}
          </div>
        </div>
        <button onClick={handleButtonClick} className="equal-button" disabled={gameOver}>
          {gameOver ? "Game Over" : "EQUAL"}
        </button>
        {reactionTime && <p>Your reaction time: {reactionTime} ms</p>}
        <p>Score: {score}</p>
        <p>Mistakes: {wrong}</p>
        {gameOver && <p>Time's up! Your final score is {score - wrong}.</p>}
      </div>
      <style jsx>{`
        .reaction-test {
          text-align: center;
        }
        .game-area {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .objects {
          display: flex;
          justify-content: space-around;
          width: 50%;
          margin: 20px;
        }
        .object {
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2px solid black;
        }
        .oval {
          background-color: black;
          border-radius: 50% / 100%;
        }
        .equal-button {
          padding: 10px 20px;
          font-size: 18px;
          font-weight: bold;
          color: white;
          background: linear-gradient(135deg, #ff7e5f, #feb47b);
          border: none;
          border-radius: 5px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .equal-button:hover {
          background: linear-gradient(135deg, #feb47b, #ff7e5f);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        .equal-button.disabled {
          cursor: not-allowed;
          background-color: gray;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default ReactionTest;
