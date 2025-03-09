'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Quiz questions data
const quizQuestions = [
  {
    id: 1,
    question: "What is the correct meaning of 'ubiquitous'?",
    options: [
      "Very rare",
      "Present everywhere",
      "Extremely large",
      "Highly dangerous"
    ],
    correctAnswer: 1, // Index of the correct answer (0-based)
    explanation: "'Ubiquitous' means present, appearing, or found everywhere."
  },
  {
    id: 2,
    question: "Choose the correct sentence:",
    options: [
      "She don't like coffee.",
      "She doesn't likes coffee.",
      "She doesn't like coffee.",
      "She not like coffee."
    ],
    correctAnswer: 2,
    explanation: "The correct negative form uses 'doesn't' with the base form of the verb."
  },
  {
    id: 3,
    question: "What is a synonym for 'benevolent'?",
    options: [
      "Kind",
      "Angry",
      "Confused",
      "Tired"
    ],
    correctAnswer: 0,
    explanation: "'Benevolent' means kind, helpful, or generous."
  },
  {
    id: 4,
    question: "Which word is a preposition in this sentence: 'The book is on the table'?",
    options: [
      "The",
      "Book",
      "Is",
      "On"
    ],
    correctAnswer: 3,
    explanation: "'On' is a preposition that shows the relationship between 'book' and 'table'."
  },
  {
    id: 5,
    question: "What is the past tense of 'begin'?",
    options: [
      "Beginned",
      "Began",
      "Begined",
      "Beginning"
    ],
    correctAnswer: 1,
    explanation: "The past tense of 'begin' is 'began'. It's an irregular verb."
  }
];

const EnglishQuizPage = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswered(true);
    setShowExplanation(true);
    
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
    setShowExplanation(false);
  };

  return (
    <div className="min-h-screen bg-[#E6F7EC] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="font-bold text-xl">Home</span>
          </Link>
          <h1 className="text-2xl font-bold text-center text-purple-700">English Quiz</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-6 max-w-3xl">
        {!quizCompleted ? (
          <Card className="p-6 shadow-lg">
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
                <span className="text-sm font-medium">Score: {score}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
              
              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedOption === index 
                        ? isAnswered
                          ? index === currentQuestion.correctAnswer
                            ? 'bg-green-100 border-green-500'
                            : 'bg-red-100 border-red-500'
                          : 'bg-purple-100 border-purple-500'
                        : isAnswered && index === currentQuestion.correctAnswer
                          ? 'bg-green-100 border-green-500'
                          : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleOptionSelect(index)}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        selectedOption === index ? 'bg-purple-600 text-white' : 'bg-gray-200'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-1">Explanation:</h3>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-between">
              {!isAnswered ? (
                <Button 
                  onClick={handleCheckAnswer} 
                  disabled={selectedOption === null}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Check Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion} 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <Card className="p-6 shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <div className="text-5xl font-bold text-purple-600 mb-4">{score}/{quizQuestions.length}</div>
            <p className="text-lg mb-6">
              {score === quizQuestions.length 
                ? 'Perfect score! Amazing job!' 
                : score >= quizQuestions.length / 2 
                  ? 'Good job! Keep practicing to improve.' 
                  : 'Keep practicing to improve your English skills.'}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleRestartQuiz} className="bg-purple-600 hover:bg-purple-700">
                Restart Quiz
              </Button>
              <Button onClick={() => router.push('/')} variant="outline">
                Back to Home
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default EnglishQuizPage; 