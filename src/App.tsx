import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Sparkles } from 'lucide-react';
import { hebrewQuestions, Question } from './questions';

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const hebrewAlphabet = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת'];
  const numberOfLetters = hebrewAlphabet.length; // 22 letters
  
  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowQuestion(false);
    setSelectedLetter(null);
    setSelectedQuestion(null);
    setShuffledAnswers([]);
    setSelectedAnswerIdx(null);
    setIsCorrect(null);
    
    // Random number of rotations (3-6 full rotations plus random position)
    const spins = Math.floor(Math.random() * 4) + 3;
    const finalPosition = Math.random() * 360;
    const totalRotation = rotation + (spins * 360) + finalPosition;
    
    setRotation(totalRotation);
    
    // Calculate which letter we landed on
    const normalizedPosition = (360 - (totalRotation % 360)) % 360;
    const letterIndex = Math.floor((normalizedPosition + (360 / numberOfLetters / 2)) / (360 / numberOfLetters)) % numberOfLetters;
    const letter = hebrewAlphabet[letterIndex];
    
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedLetter(letter);
      // Select a random question for the letter
      const questionsForLetter = hebrewQuestions[letter] || [];
      const randomIdx = Math.floor(Math.random() * questionsForLetter.length);
      const question = questionsForLetter[randomIdx] || null;
      setSelectedQuestion(question);
      if (question) {
        // Shuffle answers
        const answers = [...question.answers];
        for (let i = answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        setShuffledAnswers(answers);
      }
      setTimeout(() => {
        setShowQuestion(true);
      }, 500);
    }, 4000);
  };

  const resetGame = () => {
    setSelectedLetter(null);
    setSelectedQuestion(null);
    setShuffledAnswers([]);
    setSelectedAnswerIdx(null);
    setIsCorrect(null);
    setShowQuestion(false);
    setRotation(0);
    setIsSpinning(false);
  };

  const handleAnswer = (idx: number) => {
    if (selectedQuestion && isCorrect === null) {
      setSelectedAnswerIdx(idx);
      const correctAnswer = selectedQuestion.answers[selectedQuestion.correct];
      const chosenAnswer = shuffledAnswers[idx];
      setIsCorrect(chosenAnswer === correctAnswer);
    }
  };

  // Generate wheel slices with distinct colors
  const generateWheelSlices = () => {
    const slices = [];
    const degreesPerSlice = 360 / numberOfLetters;
    
    for (let i = 0; i < numberOfLetters; i++) {
      const startAngle = i * degreesPerSlice;
      const endAngle = (i + 1) * degreesPerSlice;
      
      // Create alternating bright colors for better visibility
      const hue = (i * 360 / numberOfLetters + (i % 2 === 0 ? 0 : 30)) % 360;
      const saturation = 70 + (i % 3) * 10; // Vary saturation slightly
      const lightness = 55 + (i % 2) * 10; // Alternate lightness
      
      slices.push(`hsl(${hue}, ${saturation}%, ${lightness}%) ${startAngle}deg ${endAngle}deg`);
    }
    
    return slices.join(', ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-yellow-300" size={48} />
            גלגל האלף-בית
            <Sparkles className="text-yellow-300" size={48} />
          </h1>
          <p className="text-xl text-blue-100">
            סובב את הגלגל כדי לקבל אות ולענות על השאלה!
          </p>
        </div>

        {/* Wheel Container */}
        <div className="relative mb-8">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500 filter drop-shadow-lg"></div>
          </div>
          {/* Wheel */}
          <div className="relative w-96 h-96 mx-auto">
            <div
              ref={wheelRef}
              className={`w-full h-full rounded-full border-8 border-white shadow-2xl transition-transform duration-4000 ease-out ${isSpinning ? '' : ''}`}
              style={{
                transform: `rotate(${rotation}deg)`,
                background: `conic-gradient(${generateWheelSlices()})`
              }}
            >
              {/* Letters */}
              {hebrewAlphabet.map((letter, index) => {
                const angle = (index * 360) / numberOfLetters;
                const isSelected = selectedLetter === letter && !isSpinning;
                return (
                  <div
                    key={letter}
                    className={`absolute w-10 h-10 flex items-center justify-center font-bold text-white text-2xl transition-all duration-300 ${
                      isSelected ? 'scale-125 text-yellow-300 font-extrabold drop-shadow-lg' : ''
                    }`}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${angle + (360 / numberOfLetters / 2)}deg) translateY(-160px) rotate(-${angle + (360 / numberOfLetters / 2)}deg)`,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                      fontFamily: 'serif'
                    }}
                  >
                    {letter}
                  </div>
                );
              })}
              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full shadow-inner flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform ${
              isSpinning 
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed scale-95' 
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            <Play className="inline mr-2" size={20} />
            {isSpinning ? 'מסתובב...' : 'סובב את הגלגל!'}
          </button>
          <button
            onClick={resetGame}
            className="px-6 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="inline mr-2" size={20} />
            איפוס
          </button>
        </div>

        {/* Result Display */}
        <div className="min-h-[200px] flex items-center justify-center">
          {selectedLetter && (
            <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto transition-all duration-500 transform ${
              showQuestion ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}>
              <div className="text-8xl font-bold text-indigo-600 mb-4 animate-pulse" style={{ fontFamily: 'serif' }}>
                {selectedLetter}
              </div>
              {showQuestion && selectedQuestion && (
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-indigo-500 uppercase tracking-wide">
                    {selectedQuestion.category}
                  </div>
                  <div className="text-2xl font-bold text-gray-800 leading-relaxed">
                    {selectedQuestion.question}
                  </div>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {shuffledAnswers.map((answer, idx) => (
                      <button
                        key={answer}
                        onClick={() => handleAnswer(idx)}
                        disabled={isCorrect !== null}
                        className={`px-6 py-4 rounded-xl font-bold text-lg border-2 transition-all duration-300
                          ${selectedAnswerIdx === idx && isCorrect === true ? 'bg-green-200 border-green-500 text-green-800 scale-105' : ''}
                          ${selectedAnswerIdx === idx && isCorrect === false ? 'bg-red-200 border-red-500 text-red-800 scale-105' : ''}
                          ${selectedAnswerIdx !== idx && isCorrect !== null ? 'opacity-60' : 'bg-white/80 border-gray-300 text-gray-800 hover:bg-blue-100 hover:border-blue-400'}
                        `}
                      >
                        {answer}
                      </button>
                    ))}
                  </div>
                  {isCorrect === true && (
                    <div className="mt-4 text-green-700 font-bold text-xl flex items-center gap-2">
                      ✔️ תשובה נכונה!
                    </div>
                  )}
                  {isCorrect === false && (
                    <div className="mt-4 text-red-700 font-bold text-xl flex items-center gap-2">
                      ❌ תשובה שגויה. נסה שוב בפעם הבאה!
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {!selectedLetter && !isSpinning && (
            <div className="text-white/70 text-xl">
              לחץ על "סובב את הגלגל" כדי להתחיל! 🎯
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;