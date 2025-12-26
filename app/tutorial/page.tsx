'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, CheckCircle, Circle, ExternalLink } from 'lucide-react'
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

interface TutorialStep {
  id: number
  title: string
  content: string
  type: 'concept' | 'example' | 'interactive' | 'summary'
  icon: string
  iconVariant: "filled" | "outlined" | "round"
  codeExample?: string
  references?: { title: string; url: string }[]
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to Arc Network",
    type: "concept",
    icon: "school",
    iconVariant: "outlined",
    content: "Arc Network is Circle's Layer-1 blockchain designed as the Economic OS for the internet. It enables builders worldwide to power the next era of onchain lending, capital markets, FX, and payments. Arc features predictable fiat-based fees using USDC as gas, deterministic sub-second finality, and enterprise-grade infrastructure.",
    references: [
      { title: "Welcome to Arc", url: "https://docs.arc.network/arc/concepts/welcome-to-arc" }
    ]
  },
  {
    id: 2,
    title: "Stablecoin-Native Architecture",
    type: "concept",
    icon: "account_balance",
    iconVariant: "outlined",
    content: "Unlike traditional blockchains that use volatile tokens for gas fees, Arc uses USDC as its native gas token. This eliminates fee volatility and provides predictable, dollar-based transaction costs. This makes Arc ideal for enterprise applications and financial services that require cost predictability.",
    references: [
      { title: "USDC on Arc Network", url: "https://docs.arc.network/arc/concepts/welcome-to-arc" }
    ]
  },
  {
    id: 3,
    title: "Consensus Layer: Malachite",
    type: "example",
    icon: "flash_on",
    iconVariant: "outlined",
    content: "Arc runs on Malachite, a high-performance implementation of the Tendermint Byzantine Fault Tolerant (BFT) protocol. Malachite ensures deterministic finality with blocks finalizing in less than one second, irreversible transactions that cannot be reorganized, and resilience through a Proof-of-Authority validator model.",
    references: [
      { title: "Arc System Overview", url: "https://docs.arc.network/arc/concepts/system-overview" }
    ]
  },
  {
    id: 4,
    title: "EVM Compatibility",
    type: "interactive",
    icon: "code",
    iconVariant: "outlined",
    content: "Arc is fully EVM-compatible, meaning developers can deploy existing Ethereum smart contracts without modification. The execution layer is built on Reth, a Rust implementation of the Ethereum execution layer, extended with stablecoin-native components.",
    codeExample: `// Example: Deploying a simple contract on Arc
pragma solidity ^0.8.0;

contract ArcExample {
    string public message;
    
    constructor(string memory _message) {
        message = _message;
    }
    
    function updateMessage(string memory _newMessage) public {
        message = _newMessage;
        // Gas fees paid in USDC automatically
    }
    
    // Get current gas price in USDC
    function getGasPrice() public view returns (uint256) {
        return tx.gasprice; // Returns price in USDC wei
    }
}`,
    references: [
      { title: "Arc Development Guide", url: "https://docs.arc.network/arc/concepts/system-overview" }
    ]
  },
  {
    id: 5,
    title: "Key Benefits for Developers",
    type: "summary",
    icon: "check_circle",
    iconVariant: "outlined",
    content: "Arc provides developers with: 1) Predictable costs with USDC gas fees, 2) Sub-second finality for fast user experiences, 3) Enterprise-grade security and compliance, 4) Full EVM compatibility with existing tools, 5) Direct integration with Circle's platform for liquidity access, and 6) Opt-in privacy features for regulated applications.",
    references: [
      { title: "Welcome to Arc", url: "https://docs.arc.network/arc/concepts/welcome-to-arc" }
    ]
  }
]

export default function TutorialPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  const currentTutorial = tutorialSteps[currentStep]
  const isLastStep = currentStep === tutorialSteps.length - 1
  const isCompleted = completedSteps.length === tutorialSteps.length

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <ArcLogo className="text-slate-300 mr-3" width={80} height={27} />
            <div className="logo-separator h-5 w-px mx-3"></div>
            <span className="text-slate-400 font-semibold">Tutorial</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Arc Network Tutorial</h1>
          <p className="text-xl text-gray-300">Learn the fundamentals of Arc Network step by step</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Progress</h3>
              <div className="space-y-3">
                {tutorialSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleStepClick(index)}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                      index === currentStep
                        ? 'bg-slate-700/50 border border-slate-600/50'
                        : 'hover:bg-slate-800/30'
                    }`}
                  >
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 mr-3" />
                    )}
                    <span className={`text-sm ${index === currentStep ? 'text-slate-200' : 'text-slate-300'}`}>
                      {step.title}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <div className="text-sm text-slate-400 mb-2">
                  Progress: {completedSteps.length}/{tutorialSteps.length}
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedSteps.length / tutorialSteps.length) * 100}%` }}
                    className="bg-gradient-to-r from-slate-500 to-slate-400 h-2 rounded-full"
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-8"
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-xl p-3 mr-4 ${
                    currentTutorial.type === 'concept' ? 'bg-blue-500/20' :
                    currentTutorial.type === 'example' ? 'bg-green-500/20' :
                    currentTutorial.type === 'interactive' ? 'bg-purple-500/20' :
                    'bg-orange-500/20'
                  }`}>
                    <MaterialIcon name={currentTutorial.icon} variant={currentTutorial.iconVariant} className="w-full h-full text-white text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{currentTutorial.title}</h2>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      currentTutorial.type === 'concept' ? 'bg-blue-500/20 text-blue-400' :
                      currentTutorial.type === 'example' ? 'bg-green-500/20 text-green-400' :
                      currentTutorial.type === 'interactive' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {currentTutorial.type.charAt(0).toUpperCase() + currentTutorial.type.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-lg leading-relaxed text-gray-300">
                    {currentTutorial.content}
                  </p>
                </div>

                {currentTutorial.codeExample && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4">Code Example:</h4>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        <code>{currentTutorial.codeExample}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* Reference Links */}
                {currentTutorial.references && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4">📚 Reference Links:</h4>
                    <div className="space-y-3">
                      {currentTutorial.references.map((reference, index) => (
                        <a
                          key={index}
                          href={reference.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 glass-card hover:bg-white/10 transition-all group"
                        >
                          <ExternalLink className="w-4 h-4 text-blue-400 mr-3 group-hover:scale-110 transition-transform" />
                          <span className="text-gray-300 group-hover:text-blue-400 transition-colors">
                            {reference.title}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center pt-6 border-t border-white/10">
                  <button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="glass-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Previous
                  </button>

                  <span className="text-gray-400">
                    {currentStep + 1} of {tutorialSteps.length}
                  </span>

                  {isLastStep ? (
                    <Link href="/quiz">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="glass-button bg-green-500/20 border-green-500/30 hover:bg-green-500/30"
                      >
                        Take Quiz
                      </motion.button>
                    </Link>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="glass-button flex items-center"
                    >
                      Next
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Completion Message */}
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 mt-6 text-center bg-green-500/10 border-green-500/20"
              >
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Tutorial Completed!</h3>
                <p className="text-gray-300 mb-4">
                  Great job! You've completed the Arc Network tutorial. Ready to test your knowledge?
                </p>
                <Link href="/quiz">
                  <button className="glass-button bg-green-500/20 border-green-500/30 hover:bg-green-500/30">
                    Take the Quiz
                  </button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}