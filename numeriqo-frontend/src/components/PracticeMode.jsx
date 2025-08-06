import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Lightbulb, RotateCcw, ArrowRight } from 'lucide-react';

const PracticeMode = () => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const problems = [
    {
      id: 1,
      question: "What is the value of x in the equation: 2x + 5 = 13?",
      options: ["x = 3", "x = 4", "x = 5", "x = 6"],
      correct: 1,
      hint: "Subtract 5 from both sides, then divide by 2",
      explanation: "2x + 5 = 13 → 2x = 8 → x = 4"
    },
    {
      id: 2,
      question: "Find the area of a circle with radius 5 units (π ≈ 3.14)",
      options: ["78.5 sq units", "31.4 sq units", "15.7 sq units", "62.8 sq units"],
      correct: 0,
      hint: "Use the formula A = πr²",
      explanation: "A = π × 5² = 3.14 × 25 = 78.5 square units"
    },
    {
      id: 3,
      question: "What is the derivative of f(x) = x³ + 2x²?",
      options: ["3x² + 4x", "x² + 2x", "3x² + 2x", "x³ + 4x"],
      correct: 0,
      hint: "Use the power rule: d/dx(xⁿ) = nxⁿ⁻¹",
      explanation: "f'(x) = 3x² + 4x using the power rule"
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (answerIndex === problems[currentProblem].correct) {
      setScore(score + 1);
    }
  };

  const nextProblem = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
    }
  };

  const resetPractice = () => {
    setCurrentProblem(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowHint(false);
  };

  const problem = problems[currentProblem];
  const isCorrect = selectedAnswer === problem.correct;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-heading text-2xl font-bold text-white">
              Practice Mode
            </h1>
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <span className="text-sm opacity-90">Score: </span>
                <span className="font-bold">{score}/{problems.length}</span>
              </div>
              <div className="text-white">
                <span className="text-sm opacity-90">Question: </span>
                <span className="font-bold">{currentProblem + 1}/{problems.length}</span>
              </div>
            </div>
          </div>
          <div className="mt-3 w-full bg-white/20 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
              className="bg-white h-2 rounded-full"
            />
          </div>
        </div>

        <div className="p-6">
          <motion.div
            key={currentProblem}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <h2 className="font-heading text-xl font-semibold text-gray-900 mb-6">
              {problem.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {problem.options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all font-medium ";
                
                if (showResult) {
                  if (index === problem.correct) {
                    buttonClass += "border-green-500 bg-green-50 text-green-700";
                  } else if (index === selectedAnswer && index !== problem.correct) {
                    buttonClass += "border-red-500 bg-red-50 text-red-700";
                  } else {
                    buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                  }
                } else {
                  buttonClass += selectedAnswer === index
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700";
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: showResult ? 1 : 1.02 }}
                    whileTap={{ scale: showResult ? 1 : 0.98 }}
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && index === problem.correct && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                      {showResult && index === selectedAnswer && index !== problem.correct && (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-lg mb-4 ${
                    isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h3 className={`font-semibold mb-1 ${
                        isCorrect ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </h3>
                      <p className={`text-sm ${
                        isCorrect ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {problem.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Lightbulb className="h-5 w-5" />
                <span className="font-medium">{showHint ? 'Hide Hint' : 'Show Hint'}</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={resetPractice}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span className="font-medium">Reset</span>
                </button>

                {showResult && currentProblem < problems.length - 1 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={nextProblem}
                    className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                )}
              </div>
            </div>

            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-1">Hint:</h4>
                      <p className="text-sm text-blue-700">{problem.hint}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PracticeMode;
