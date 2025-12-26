'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Clock, RotateCcw, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ArcLogo from '@/components/ArcLogo'

// Material Icons component
const MaterialIcon = ({ 
  name, 
  variant = "filled", 
  className = "text-xl" 
}: { 
  name: string; 
  variant?: "filled" | "outlined" | "round";
  className?: string;
}) => {
  const iconClass = variant === "outlined" ? "material-icons-outlined" : 
                   variant === "round" ? "material-icons-round" : 
                   "material-icons";
  
  return <span className={`${iconClass} ${className}`}>{name}</span>;
}

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "What makes Arc Network unique compared to other blockchains?",
    options: [
      "It uses Bitcoin as gas",
      "It uses USDC as native gas token",
      "It has no gas fees",
      "It only supports Python smart contracts"
    ],
    correctAnswer: 1,
    explanation: "Arc Network uses USDC as its native gas token, eliminating fee volatility and providing predictable, dollar-based transaction costs."
  },
  {
    id: 2,
    question: "What consensus mechanism does Arc Network use?",
    options: [
      "Proof of Work",
      "Proof of Stake",
      "Malachite (Tendermint BFT)",
      "Delegated Proof of Stake"
    ],
    correctAnswer: 2,
    explanation: "Arc runs on Malachite, a high-performance implementation of the Tendermint Byzantine Fault Tolerant (BFT) protocol."
  },
  {
    id: 3,
    question: "How fast is transaction finality on Arc Network?",
    options: [
      "10 minutes",
      "2-3 seconds",
      "Sub-second (less than 1 second)",
      "1 hour"
    ],
    correctAnswer: 2,
    explanation: "Arc Network achieves deterministic finality with blocks finalizing in less than one second."
  },
  {
    id: 4,
    question: "Is Arc Network compatible with Ethereum tools and smart contracts?",
    options: [
      "No, it uses a completely different system",
      "Yes, it's fully EVM-compatible",
      "Only partially compatible",
      "Compatible only with specific tools"
    ],
    correctAnswer: 1,
    explanation: "Arc is fully EVM-compatible, meaning developers can deploy existing Ethereum smart contracts without modification."
  },
  {
    id: 5,
    question: "What is Arc Network designed to serve as?",
    options: [
      "A gaming platform",
      "The Economic OS for the internet",
      "A social media blockchain",
      "A file storage system"
    ],
    correctAnswer: 1,
    explanation: "Arc is designed to serve as the Economic OS for the internet, enabling onchain lending, capital markets, FX, and payments."
  },
  {
    id: 6,
    question: "Which company developed Arc Network?",
    options: [
      "Ethereum Foundation",
      "Circle",
      "Coinbase",
      "Binance"
    ],
    correctAnswer: 1,
    explanation: "Arc Network was developed by Circle as their Layer-1 blockchain for stablecoin finance."
  },
  {
    id: 7,
    question: "What type of validator model does Arc use?",
    options: [
      "Open validator set",
      "Proof-of-Authority",
      "Proof-of-Work mining",
      "Random selection"
    ],
    correctAnswer: 1,
    explanation: "Arc uses a Proof-of-Authority validator model where validator participation is permissioned for security and compliance."
  },
  {
    id: 8,
    question: "What privacy features does Arc offer?",
    options: [
      "No privacy features",
      "Complete anonymity by default",
      "Opt-in configurable privacy",
      "Privacy only for validators"
    ],
    correctAnswer: 2,
    explanation: "Arc offers opt-in configurable privacy features, allowing applications to choose their privacy level based on regulatory requirements."
  }
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [quizStarted, setQuizStarted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [answerFeedback, setAnswerFeedback] = useState<{correct: boolean, explanation: string} | null>(null)

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResults) {
      handleSubmitQuiz()
    }
    
    // Auto-submit when last question feedback is shown
    if (showFeedback && currentQuestion === questions.length - 1) {
      setTimeout(() => {
        handleSubmitQuiz()
      }, 3000)
    }
  }, [timeLeft, quizStarted, showResults, showFeedback, currentQuestion])

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
    
    // Show immediate feedback
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer
    setAnswerFeedback({
      correct: isCorrect,
      explanation: questions[currentQuestion].explanation
    })
    setShowFeedback(true)
    
    // Auto-advance after 3 seconds
    setTimeout(() => {
      setShowFeedback(false)
      setAnswerFeedback(null)
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      }
    }, 3000)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitQuiz = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const score = calculateScore()
  const percentage = Math.round((score / questions.length) * 100)
  const passed = percentage >= 70

  if (!quizStarted) {
    return (
      <div className="min-h-screen px-6 py-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 max-w-2xl text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <ArcLogo className="text-slate-300 mr-3" width={80} height={27} />
            <div className="logo-separator h-5 w-px mx-3"></div>
            <span className="text-slate-400 font-semibold">Quiz</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Arc Network Quiz</h1>
          <p className="text-gray-300 mb-6">
            Test your knowledge of Arc Network fundamentals. You have 10 minutes to complete 8 questions.
            A score of 70% or higher is required to earn your certificate.
          </p>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Quiz Details:</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• 8 multiple choice questions</li>
              <li>• 10 minutes time limit</li>
              <li>• 70% minimum score to pass</li>
              <li>• Certificate awarded upon completion</li>
            </ul>
          </div>
          <button
            onClick={() => setQuizStarted(true)}
            className="glass-button text-lg px-8 py-3 bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30"
          >
            Start Quiz
          </button>
        </motion.div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {passed ? <MaterialIcon name="workspace_premium" variant="outlined" className="w-12 h-12 text-5xl" /> : <XCircle className="w-12 h-12" />}
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              {passed ? 'Congratulations!' : 'Quiz Complete'}
            </h1>
            
            <p className="text-xl text-gray-300 mb-6">
              You scored {score} out of {questions.length} ({percentage}%)
            </p>

            {passed ? (
              <div className="glass-card p-6 bg-green-500/10 border-green-500/20 mb-8">
                <p className="text-green-400 mb-4">
                  🎉 You've passed the Arc Network quiz! You're now eligible for your certificate.
                </p>
                <Link href="/certificate">
                  <button className="glass-button bg-green-500/20 border-green-500/30 hover:bg-green-500/30">
                    Get Your Certificate
                  </button>
                </Link>
              </div>
            ) : (
              <div className="glass-card p-6 bg-red-500/10 border-red-500/20 mb-8">
                <p className="text-red-400 mb-4">
                  You need 70% or higher to pass. Review the material and try again!
                </p>
                <button
                  onClick={() => {
                    setQuizStarted(false)
                    setShowResults(false)
                    setCurrentQuestion(0)
                    setSelectedAnswers([])
                    setTimeLeft(600)
                  }}
                  className="glass-button bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30 mr-4"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </button>
                <Link href="/tutorial">
                  <button className="glass-button">
                    Review Tutorial
                  </button>
                </Link>
              </div>
            )}
          </motion.div>

          {/* Results Breakdown */}
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index]
              const isCorrect = userAnswer === question.correctAnswer
              
              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glass-card p-6 border-l-4 ${
                    isCorrect ? 'border-green-500' : 'border-red-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold">{question.question}</h3>
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 ml-4" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 ml-4" />
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg ${
                          optionIndex === question.correctAnswer
                            ? 'bg-green-500/20 border border-green-500/30'
                            : optionIndex === userAnswer && !isCorrect
                            ? 'bg-red-500/20 border border-red-500/30'
                            : 'bg-gray-500/10'
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-300 bg-blue-500/10 p-3 rounded-lg">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Arc Network Quiz</h1>
            <p className="text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-blue-400">
              <Clock className="w-5 h-5 mr-2" />
              {formatTime(timeLeft)}
            </div>
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-bold mb-8">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4 mb-8">
              {questions[currentQuestion].options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion] === index
                const isCorrect = index === questions[currentQuestion].correctAnswer
                const showCorrectAnswer = showFeedback && isCorrect
                const showIncorrectAnswer = showFeedback && isSelected && !isCorrect
                
                return (
                  <motion.button
                    key={index}
                    whileHover={!showFeedback ? { scale: 1.02 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                    onClick={() => !showFeedback && handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`w-full p-4 text-left rounded-lg border transition-all ${
                      showCorrectAnswer
                        ? 'bg-green-500/20 border-green-500/50 text-green-400'
                        : showIncorrectAnswer
                        ? 'bg-red-500/20 border-red-500/50 text-red-400'
                        : isSelected
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                          showCorrectAnswer
                            ? 'border-green-500 bg-green-500'
                            : showIncorrectAnswer
                            ? 'border-red-500 bg-red-500'
                            : isSelected
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-400'
                        }`}>
                          {(isSelected || showCorrectAnswer) && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                      
                      {showFeedback && (
                        <div className="ml-4">
                          {showCorrectAnswer && <CheckCircle className="w-5 h-5 text-green-400" />}
                          {showIncorrectAnswer && <XCircle className="w-5 h-5 text-red-400" />}
                        </div>
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Feedback Panel */}
            {showFeedback && answerFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-lg mb-8 ${
                  answerFeedback.correct
                    ? 'bg-green-500/10 border border-green-500/20'
                    : 'bg-red-500/10 border border-red-500/20'
                }`}
              >
                <div className="flex items-start">
                  {answerFeedback.correct ? (
                    <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400 mr-3 mt-1 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className={`font-semibold mb-2 ${
                      answerFeedback.correct ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {answerFeedback.correct ? 'Correct!' : 'Incorrect'}
                    </h4>
                    <p className="text-gray-300">{answerFeedback.explanation}</p>
                    <div className="mt-3 text-sm text-gray-400">
                      {currentQuestion < questions.length - 1 
                        ? 'Moving to next question...' 
                        : 'Quiz completed! Calculating results...'}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0 || showFeedback}
                className="glass-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex space-x-4">
                {currentQuestion === questions.length - 1 ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={selectedAnswers[currentQuestion] === undefined || showFeedback}
                    className="glass-button bg-green-500/20 border-green-500/30 hover:bg-green-500/30 disabled:opacity-50"
                  >
                    {showFeedback ? 'Processing...' : 'Submit Quiz'}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={selectedAnswers[currentQuestion] === undefined || showFeedback}
                    className="glass-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {showFeedback ? 'Auto-advancing...' : 'Next'}
                    {!showFeedback && <ArrowRight className="w-4 h-4 ml-2" />}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicator */}
        <div className="mt-8 flex justify-center space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentQuestion
                  ? 'bg-blue-500'
                  : selectedAnswers[index] !== undefined
                  ? 'bg-green-500'
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}