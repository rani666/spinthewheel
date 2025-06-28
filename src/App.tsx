import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Sparkles } from 'lucide-react';
import { hebrewQuestions, Question } from './questions';
import logoLevHasharon from './assets/logo-lev-hasharon.png';

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
      const correct = chosenAnswer === correctAnswer;
      setIsCorrect(correct);
      // Hide modal after 2 seconds
      setTimeout(() => {
        setShowQuestion(false);
        setSelectedLetter(null);
        setSelectedQuestion(null);
        setShuffledAnswers([]);
        setSelectedAnswerIdx(null);
        setIsCorrect(null);
      }, 2000);
    }
  };

  // Generate wheel slices with distinct colors
  const generateWheelSlices = () => {
    const slices = [];
    const degreesPerSlice = 360 / numberOfLetters;
    
    for (let i = 0; i < numberOfLetters; i++) {
      const startAngle = i * degreesPerSlice;
      const endAngle = (i + 1) * degreesPerSlice;
      
      // Create alternating green shades for better visibility
      const hue = 120 + (i * 20) % 40; // Green variations
      const saturation = 60 + (i % 3) * 15; // Vary saturation
      const lightness = 45 + (i % 2) * 15; // Alternate lightness
      
      slices.push(`hsl(${hue}, ${saturation}%, ${lightness}%) ${startAngle}deg ${endAngle}deg`);
    }
    
    return slices.join(', ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0ECCF] via-[#E6F0DB] to-[#D4E8C4] flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo above header */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#E0ECCF] rounded-xl p-3 shadow-md">
            <img src={logoLevHasharon} alt="לב השרון לוגו" className="h-16 w-auto sm:h-20 object-contain mx-auto" />
          </div>
        </div>
        {/* Header */}
        <div className="mb-8 bg-[#2A7F31] rounded-2xl p-6 shadow-lg">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-[#F28D2B]" size={48} />
            גלגל האלף-בית
            <Sparkles className="text-[#F28D2B]" size={48} />
          </h1>
          <p className="text-xl text-[#E6F0DB]">
            סובב את הגלגל כדי לקבל אות ולענות על השאלה!
          </p>
        </div>

        {/* Wheel Container */}
        <div className="relative mb-8">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-[#F28D2B] filter drop-shadow-lg"></div>
          </div>
          {/* Wheel */}
          <div className="relative w-96 h-96 mx-auto">
            <div
              ref={wheelRef}
              className={`w-full h-full rounded-full border-8 border-[#2A7F31] shadow-2xl transition-transform duration-4000 ease-out ${isSpinning ? '' : ''}`}
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
                      isSelected ? 'scale-125 text-[#F28D2B] font-extrabold drop-shadow-lg' : ''
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
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full shadow-inner flex items-center justify-center border-4 border-[#2A7F31]">
                <div className="w-4 h-4 bg-[#333333] rounded-full"></div>
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
                ? 'bg-[#CCCCCC] text-[#666666] cursor-not-allowed scale-95' 
                : 'bg-gradient-to-r from-[#2A7F31] to-[#1F5F26] text-white hover:from-[#1F5F26] hover:to-[#2A7F31] hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            <Play className="inline mr-2" size={20} />
            {isSpinning ? 'מסתובב...' : 'סובב את הגלגל!'}
          </button>
          <button
            onClick={resetGame}
            className="px-6 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-[#F28D2B] to-[#E67E22] text-white hover:from-[#E67E22] hover:to-[#F28D2B] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="inline mr-2" size={20} />
            איפוס
          </button>
        </div>

        {/* Result Display as Modal */}
        {selectedLetter && (
          <div className={`fixed inset-0 z-30 flex items-center justify-center bg-black/50 transition-all duration-500 ${showQuestion ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4 transition-all duration-500 transform ${showQuestion ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
              <div className="text-6xl font-bold text-[#2A7F31] mb-4 animate-pulse text-center" style={{ fontFamily: 'serif' }}>
                {selectedLetter}
              </div>
              {showQuestion && selectedQuestion && (
                <div className="space-y-4">
                  <div className="text-xl font-bold text-[#333333] leading-relaxed text-center">
                    {selectedQuestion.question}
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-3">
                    {shuffledAnswers.map((answer, idx) => (
                      <button
                        key={answer}
                        onClick={() => handleAnswer(idx)}
                        disabled={isCorrect !== null}
                        className={`px-4 py-3 rounded-xl font-bold text-base border-2 transition-all duration-300 w-full
                          ${selectedAnswerIdx === idx && isCorrect === true ? 'bg-green-200 border-green-500 text-green-800 scale-105' : ''}
                          ${selectedAnswerIdx === idx && isCorrect === false ? 'bg-red-200 border-red-500 text-red-800 scale-105' : ''}
                          ${selectedAnswerIdx !== idx && isCorrect !== null ? 'opacity-60' : 'bg-white border-[#CCCCCC] text-[#333333] hover:bg-[#E6F0DB] hover:border-[#2A7F31]'}
                        `}
                      >
                        {answer}
                      </button>
                    ))}
                  </div>
                  {isCorrect === true && (
                    <div className="mt-4 text-green-700 font-bold text-lg flex items-center gap-2 justify-center">
                      ✔️ תשובה נכונה!
                    </div>
                  )}
                  {isCorrect === false && (
                    <div className="mt-4 text-red-700 font-bold text-lg flex items-center gap-2 justify-center">
                      ❌ תשובה שגויה. נסה שוב בפעם הבאה!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {/* End Modal */}

        {!selectedLetter && !isSpinning && (
          <div className="text-[#333333] text-xl bg-white/80 rounded-xl p-4 shadow-md">
            לחץ על "סובב את הגלגל" כדי להתחיל! 🎯
          </div>
        )}
      </div>
    </div>
  );
}

export default App;