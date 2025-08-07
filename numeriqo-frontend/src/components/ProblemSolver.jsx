import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Lightbulb, CheckCircle, RotateCcw, ArrowRight, Camera } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/motion';
import { problemData } from '../utils/mockData';

const ProblemSolver = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(problemData[0]);
  const [showCamera, setShowCamera] = useState(false);

  const handleSubmit = () => {
    const correct = userAnswer.trim() === selectedProblem.answer;
    setIsCorrect(correct);
  };

  const resetProblem = () => {
    setCurrentStep(0);
    setUserAnswer('');
    setShowHint(false);
    setIsCorrect(null);
  };

  const handleCameraCapture = () => {
    // Simulate camera functionality for mobile
    setShowCamera(true);
    setTimeout(() => {
      setShowCamera(false);
      setUserAnswer('Camera problem detected: 2x + 5 = 15');
    }, 2000);
  };

  return (
    <motion.div 
      className="space-y-6 pb-20 lg:pb-6"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-lg"
        variants={fadeInUp}
      >
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-2">
          Interactive Problem Solver 🧮
        </h1>
        <p className="text-gray-600 font-body">
          Step-by-step guidance with visual explanations to strengthen your understanding.
        </p>
      </motion.div>

      {/* Problem Selection */}
      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-lg"
        variants={fadeInUp}
      >
        <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">Select Problem Type</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {problemData.map((problem) => (
            <button
              key={problem.id}
              onClick={() => {
                setSelectedProblem(problem);
                resetProblem();
              }}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedProblem.id === problem.id
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Calculator className="w-5 h-5 text-primary" />
                <h3 className="font-heading font-bold">{problem.type}</h3>
              </div>
              <p className="text-sm text-gray-600">{problem.description}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Problem Solving Interface */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Problem Statement */}
        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg"
          variants={fadeInUp}
        >
          <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">Problem</h2>
          <div className="bg-gray-50 rounded-xl p-6 mb-4">
            <p className="text-lg font-body text-gray-800 leading-relaxed">
              {selectedProblem.question}
            </p>
          </div>
          
          {/* Visual Aid */}
          <div className="bg-primary/5 rounded-xl p-4 mb-4">
            <h3 className="font-heading font-bold text-gray-900 mb-2">Visual Aid</h3>
            <div className="bg-white rounded-lg p-4 border-2 border-dashed border-primary/30">
              <p className="text-center text-gray-600">{selectedProblem.visualAid}</p>
            </div>
          </div>

          {/* Camera Integration */}
          <div className="mb-4">
            <button
              onClick={handleCameraCapture}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 border-2 border-dashed border-primary/30 rounded-xl text-primary hover:bg-primary/5 transition-colors"
            >
              <Camera className="w-5 h-5" />
              <span>Scan Problem with Camera</span>
            </button>
            {showCamera && (
              <motion.div 
                className="mt-3 p-4 bg-blue-50 rounded-xl border border-blue-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-blue-800 text-center">📷 Camera scanning... Please hold steady</p>
              </motion.div>
            )}
          </div>

          {/* Answer Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Answer
              </label>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your answer..."
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-primary text-white py-3 px-6 rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Submit Answer
              </button>
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-6 py-3 border border-primary text-primary rounded-xl font-medium hover:bg-primary/5 transition-colors"
              >
                <Lightbulb className="w-5 h-5" />
              </button>
              <button
                onClick={resetProblem}
                className="px-6 py-3 border border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Feedback */}
          {isCorrect !== null && (
            <motion.div 
              className={`mt-4 p-4 rounded-xl ${
                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className={`w-5 h-5 ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`} />
                <p className={`font-medium ${
                  isCorrect ? 'text-green-800' : 'text-red-800'
                }`}>
                  {isCorrect ? 'Correct! Well done!' : 'Not quite right. Try again!'}
                </p>
              </div>
              {isCorrect && (
                <p className="text-green-700 mt-2">{selectedProblem.explanation}</p>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Step-by-Step Solution */}
        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg"
          variants={fadeInUp}
        >
          <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">Step-by-Step Solution</h2>
          
          {/* Hint */}
          {showHint && (
            <motion.div 
              className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <div className="flex items-start space-x-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">Hint</p>
                  <p className="text-yellow-700">{selectedProblem.hint}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Solution Steps */}
          <div className="space-y-4">
            {selectedProblem.steps.map((step, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  index <= currentStep ? 'border-primary bg-primary/5' : 'border-gray-200'
                }`}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: index <= currentStep ? 1 : 0.5 }}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-gray-800">{step}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous Step
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(selectedProblem.steps.length - 1, currentStep + 1))}
              disabled={currentStep === selectedProblem.steps.length - 1}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProblemSolver;
