'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Star, CheckCircle, PlayCircle, BookOpen, Code, ExternalLink, Terminal, Copy } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface ModuleContent {
  id: number
  title: string
  description: string
  duration: string
  difficulty: string
  rating: number
  sections: {
    id: number
    title: string
    type: 'video' | 'reading' | 'interactive' | 'quiz'
    duration: string
    completed?: boolean
    content: string
    keyPoints?: string[]
    simulation?: {
      contractCode: string
      steps: {
        step: number
        title: string
        description: string
        code: string
        output: string
      }[]
    }
  }[]
  learningObjectives: string[]
  prerequisites: string[]
  references: { title: string; url: string }[]
}

const moduleData: { [key: string]: ModuleContent } = {
  '1': {
    id: 1,
    title: "Arc Network Fundamentals",
    description: "Master the core concepts of Arc Network as the Economic OS for the internet. Learn about stablecoin-native architecture, Circle integration, and real-world use cases in finance and payments.",
    duration: "15 min",
    difficulty: "Beginner",
    rating: 4.8,
    sections: [
      { 
        id: 1, 
        title: "Introduction to Arc Network", 
        type: "video", 
        duration: "5 min",
        content: "Arc Network is Circle's Layer-1 blockchain designed as the Economic OS for the internet. Built to unite programmable money with real-world economic activity, Arc enables builders worldwide to power the next era of onchain lending, capital markets, FX, and payments. Unlike traditional blockchains, Arc is engineered for mass adoption with enterprise-grade infrastructure featuring predictable fiat-based fees, deterministic sub-second finality, and direct integration with Circle's platform.",
        keyPoints: [
          "Arc serves as the Economic OS for the internet",
          "Built by Circle for enterprise-grade applications",
          "Designed to bridge traditional finance with blockchain",
          "Enables lending, capital markets, FX, and payments"
        ]
      },
      { 
        id: 2, 
        title: "USDC Gas & Economic OS", 
        type: "reading", 
        duration: "6 min",
        content: "Arc's revolutionary approach uses USDC as its native gas token, eliminating the volatility associated with traditional blockchain fees. This stablecoin-native architecture provides predictable, dollar-based transaction costs that are essential for enterprise applications. The Economic OS concept means Arc functions as the foundational layer for internet-scale economic activity, providing the infrastructure needed for programmable money and automated financial services.",
        keyPoints: [
          "USDC gas eliminates fee volatility",
          "Predictable dollar-based transaction costs",
          "Economic OS enables programmable money",
          "Infrastructure for automated financial services"
        ]
      },
      { 
        id: 3, 
        title: "Real-World Applications", 
        type: "interactive", 
        duration: "4 min",
        content: "Arc Network enables a wide range of real-world financial applications including cross-border payments with instant settlement, decentralized lending protocols with institutional-grade security, automated market makers for stablecoin trading, and tokenized asset management. The platform's integration with Circle's ecosystem provides direct access to traditional financial rails, making it ideal for businesses looking to bridge Web2 and Web3 finance.",
        keyPoints: [
          "Cross-border payments with instant settlement",
          "Institutional-grade DeFi protocols",
          "Stablecoin trading and liquidity",
          "Bridge between Web2 and Web3 finance"
        ]
      }
    ],
    learningObjectives: [
      "Understand Arc Network's role as the Economic OS for the internet",
      "Learn how USDC gas eliminates fee volatility for predictable costs",
      "Explore Circle's platform integration and enterprise benefits",
      "Identify key use cases in payments, lending, and capital markets"
    ],
    prerequisites: [
      "Basic understanding of blockchain technology",
      "Familiarity with stablecoins (helpful but not required)"
    ],
    references: [
      { title: "Welcome to Arc", url: "https://docs.arc.network/arc/concepts/welcome-to-arc" }
    ]
  },
  '2': {
    id: 2,
    title: "Technical Architecture & Development",
    description: "Deep dive into Malachite consensus, system architecture, and smart contract development. Learn to build and deploy applications on Arc Network using familiar Ethereum tools.",
    duration: "25 min",
    difficulty: "Intermediate",
    rating: 4.9,
    sections: [
      { 
        id: 1, 
        title: "Malachite Consensus & Architecture", 
        type: "video", 
        duration: "8 min",
        content: "Arc runs on Malachite, a high-performance implementation of the Tendermint Byzantine Fault Tolerant (BFT) protocol. This consensus mechanism ensures deterministic finality with blocks finalizing in less than one second, providing irreversible transactions that cannot be reorganized. Arc's dual-layer architecture separates consensus and execution, with the consensus layer ordering transactions and the execution layer (built on Reth) processing them with stablecoin-native extensions.",
        keyPoints: [
          "Malachite implements Tendermint BFT protocol",
          "Sub-second deterministic finality",
          "Dual-layer architecture (consensus + execution)",
          "Built on Reth with stablecoin extensions"
        ]
      },
      { 
        id: 2, 
        title: "EVM Compatibility & Smart Contracts", 
        type: "interactive", 
        duration: "12 min",
        content: "Arc is fully EVM-compatible, allowing developers to deploy existing Ethereum smart contracts without modification. The execution layer maintains familiar development patterns while adding Arc-specific features like USDC gas handling. Developers can use standard tools like Hardhat, Foundry, and Remix, with additional Arc tooling for gas optimization and stablecoin-native features. Smart contracts automatically benefit from predictable fees and sub-second finality.",
        keyPoints: [
          "Full EVM compatibility with existing contracts",
          "Standard development tools supported",
          "Arc-specific gas optimization features",
          "Automatic benefits from USDC gas and fast finality"
        ]
      },
      { 
        id: 3, 
        title: "Deploy Your First Contract", 
        type: "interactive", 
        duration: "5 min",
        content: "Learn to deploy smart contracts on Arc Network through this interactive simulation. We'll walk through creating a simple 'Hello Arc' contract that demonstrates USDC gas usage and Arc's sub-second finality. This hands-on experience covers environment setup, contract compilation, deployment transaction, and verification - all simulated to show the real Arc Network development workflow.",
        keyPoints: [
          "Interactive contract deployment simulation",
          "Experience USDC gas estimation and payment",
          "Witness sub-second transaction finality",
          "Learn Arc Network development workflow"
        ],
        simulation: {
          contractCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HelloArc {
    string public message;
    address public owner;
    uint256 public deploymentBlock;
    
    event MessageUpdated(string newMessage, address updatedBy);
    
    constructor(string memory _initialMessage) {
        message = _initialMessage;
        owner = msg.sender;
        deploymentBlock = block.number;
    }
    
    function updateMessage(string memory _newMessage) public {
        message = _newMessage;
        emit MessageUpdated(_newMessage, msg.sender);
    }
    
    function getContractInfo() public view returns (
        string memory currentMessage,
        address contractOwner,
        uint256 blockDeployed,
        uint256 currentBlock
    ) {
        return (message, owner, deploymentBlock, block.number);
    }
}`,
          steps: [
            {
              step: 1,
              title: "Environment Setup",
              description: "Configure your development environment for Arc Network",
              code: `// Install dependencies
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers

// hardhat.config.js
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.19",
  networks: {
    arc: {
      url: "https://rpc.arc.network", // Arc Network RPC endpoint
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: "auto" // USDC gas pricing
    }
  }
};`,
              output: "✅ Arc Network configuration complete\n✅ Dependencies installed\n✅ Ready for deployment"
            },
            {
              step: 2,
              title: "Contract Compilation",
              description: "Compile the HelloArc contract for deployment",
              code: `npx hardhat compile`,
              output: `Compiling 1 file with 0.8.19
Compilation finished successfully
✅ HelloArc.sol compiled
✅ Bytecode generated: 2,847 bytes
✅ ABI generated with 5 functions`
            },
            {
              step: 3,
              title: "Gas Estimation",
              description: "Estimate deployment cost in USDC",
              code: `// Deployment script
const { ethers } = require("hardhat");

async function main() {
  const HelloArc = await ethers.getContractFactory("HelloArc");
  
  // Estimate gas for deployment
  const deploymentData = HelloArc.getDeployTransaction("Hello Arc Network!");
  const gasEstimate = await ethers.provider.estimateGas(deploymentData);
  
  console.log("Gas estimate:", gasEstimate.toString());
}`,
              output: `Gas estimate: 247,832 units
💰 Estimated cost: $0.0124 USDC
⚡ Expected finality: <1 second
🔒 Transaction will be irreversible`
            },
            {
              step: 4,
              title: "Contract Deployment",
              description: "Deploy to Arc Network with USDC gas",
              code: `async function deploy() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  
  const HelloArc = await ethers.getContractFactory("HelloArc");
  const contract = await HelloArc.deploy("Hello Arc Network!");
  
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}`,
              output: `Deploying with account: 0x742d35Cc6634C0532925a3b8D4C2C4e0C8b4C8b4
📤 Transaction submitted: 0x1a2b3c4d5e6f...
⚡ Block confirmed in 0.8 seconds
✅ Contract deployed to: 0x8ba1f109551bD432803012645Hac136c5c1b4c4c
💰 Gas used: 247,832 units ($0.0124 USDC)
🎉 Deployment successful!`
            },
            {
              step: 5,
              title: "Contract Interaction",
              description: "Test the deployed contract functionality",
              code: `// Interact with deployed contract
const contract = await HelloArc.attach("0x8ba1f109551bD432803012645Hac136c5c1b4c4c");

// Read current message
const message = await contract.message();
console.log("Current message:", message);

// Update message
const tx = await contract.updateMessage("Arc Network is amazing!");
await tx.wait();

console.log("Message updated successfully!");`,
              output: `Current message: "Hello Arc Network!"
📤 Update transaction: 0x9c8d7e6f5a4b...
⚡ Confirmed in 0.6 seconds
💰 Gas cost: $0.0021 USDC
✅ Message updated successfully!
📝 New message: "Arc Network is amazing!"`
            }
          ]
        }
      }
    ],
    learningObjectives: [
      "Master Malachite consensus and sub-second finality mechanisms",
      "Understand Arc's dual-layer architecture and validator network",
      "Learn EVM compatibility and smart contract development on Arc",
      "Build practical skills for deploying applications on Arc Network"
    ],
    prerequisites: [
      "Completion of Arc Network Fundamentals module",
      "Basic knowledge of Solidity and smart contract development",
      "Familiarity with development tools like MetaMask or Hardhat"
    ],
    references: [
      { title: "Arc System Overview", url: "https://docs.arc.network/arc/concepts/system-overview" }
    ]
  },
  '3': {
    id: 3,
    title: "Enterprise Features & DeFi",
    description: "Explore Arc's enterprise-grade features including privacy, compliance, and DeFi applications. Understand how Arc enables institutional capital markets and regulated financial services.",
    duration: "20 min",
    difficulty: "Advanced",
    rating: 4.8,
    sections: [
      { 
        id: 1, 
        title: "Privacy & Compliance Features", 
        type: "video", 
        duration: "8 min",
        content: "Arc Network offers opt-in privacy features designed for regulated financial institutions. These include selective disclosure mechanisms, confidential transaction capabilities, and compliance-friendly privacy models that meet regulatory requirements. The platform provides built-in KYC/AML integration, audit trails for regulatory reporting, and configurable privacy settings that allow institutions to balance transparency with confidentiality based on their specific compliance needs.",
        keyPoints: [
          "Opt-in privacy for regulated institutions",
          "Selective disclosure and confidential transactions",
          "Built-in KYC/AML compliance tools",
          "Configurable privacy settings for different use cases"
        ]
      },
      { 
        id: 2, 
        title: "Institutional DeFi & Capital Markets", 
        type: "reading", 
        duration: "8 min",
        content: "Arc enables institutional-grade DeFi applications including automated market makers optimized for stablecoin trading, yield farming protocols with enterprise risk management, and cross-chain liquidity management through Circle's CCTP. The platform supports tokenized assets, programmable money flows, and integration with traditional capital markets infrastructure, making it ideal for institutional adoption of decentralized finance.",
        keyPoints: [
          "Institutional AMMs for stablecoin trading",
          "Enterprise-grade yield farming protocols",
          "Cross-chain liquidity via CCTP",
          "Tokenized assets and programmable money"
        ]
      },
      { 
        id: 3, 
        title: "Enterprise Implementation Case Study", 
        type: "interactive", 
        duration: "4 min",
        content: "Explore a real-world case study of how a financial institution implemented Arc Network for cross-border payments and liquidity management. This interactive section covers the implementation process, regulatory considerations, integration challenges, and measurable business outcomes including cost reduction, settlement speed improvements, and enhanced compliance capabilities. Learn best practices for enterprise blockchain adoption and risk management strategies.",
        keyPoints: [
          "Real-world financial institution implementation",
          "Cross-border payments and liquidity management",
          "Regulatory compliance and risk management",
          "Measurable business outcomes and ROI"
        ]
      }
    ],
    learningObjectives: [
      "Understand Arc's opt-in privacy features and compliance tools",
      "Learn about institutional DeFi and capital markets infrastructure",
      "Explore regulatory considerations for enterprise blockchain adoption",
      "Analyze real-world Arc Network enterprise implementations"
    ],
    prerequisites: [
      "Completion of Technical Architecture & Development module",
      "Understanding of DeFi protocols and financial markets",
      "Knowledge of regulatory compliance in blockchain"
    ],
    references: [
      { title: "Circle Developer Documentation", url: "https://developers.circle.com" }
    ]
  }
}

export default function ModulePage() {
  const params = useParams()
  const moduleId = params.id as string
  const module = moduleData[moduleId]
  
  const [completedSections, setCompletedSections] = useState<number[]>([])
  const [currentSection, setCurrentSection] = useState(0)
  const [simulationStep, setSimulationStep] = useState(0)
  const [isRunningSimulation, setIsRunningSimulation] = useState(false)

  if (!module) {
    return (
      <div className="min-h-screen px-6 py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Module Not Found</h1>
          <p className="text-gray-300 mb-6">The requested module could not be found.</p>
          <Link href="/modules">
            <button className="glass-button">Back to Modules</button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSectionComplete = (sectionId: number) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId])
    }
  }

  const runSimulationStep = async (stepIndex: number) => {
    setIsRunningSimulation(true)
    setSimulationStep(stepIndex)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRunningSimulation(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const progressPercentage = (completedSections.length / module.sections.length) * 100

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'video': return PlayCircle
      case 'reading': return BookOpen
      case 'interactive': return Code
      case 'quiz': return CheckCircle
      default: return BookOpen
    }
  }

  const getSectionColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-red-400 bg-red-500/20'
      case 'reading': return 'text-blue-400 bg-blue-500/20'
      case 'interactive': return 'text-purple-400 bg-purple-500/20'
      case 'quiz': return 'text-green-400 bg-green-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/modules">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="glass-button mb-8 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Modules
          </motion.button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Module Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 mb-8"
            >
              <h1 className="text-3xl font-bold mb-4">{module.title}</h1>
              <p className="text-gray-300 text-lg mb-6">{module.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {module.duration}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-400" />
                  {module.rating} rating
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  module.difficulty === 'Beginner' ? 'text-green-400 bg-green-500/20' :
                  module.difficulty === 'Intermediate' ? 'text-yellow-400 bg-yellow-500/20' :
                  'text-red-400 bg-red-500/20'
                }`}>
                  {module.difficulty}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-gray-400">
                    {completedSections.length}/{module.sections.length} completed
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Learning Objectives */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 mb-8"
            >
              <h3 className="text-xl font-bold mb-4">Learning Objectives</h3>
              <ul className="space-y-2">
                {module.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{objective}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Current Section Content */}
            {module.sections[currentSection] && (
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 mb-8"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-lg p-2 mr-4 ${getSectionColor(module.sections[currentSection].type)}`}>
                    {(() => {
                      const SectionIcon = getSectionIcon(module.sections[currentSection].type)
                      return <SectionIcon className="w-full h-full" />
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{module.sections[currentSection].title}</h3>
                    <p className="text-sm text-gray-400">{module.sections[currentSection].duration}</p>
                  </div>
                </div>
                
                <div className="prose prose-invert max-w-none mb-6">
                  <p className="text-gray-300 leading-relaxed">
                    {module.sections[currentSection].content}
                  </p>
                </div>

                {module.sections[currentSection].keyPoints && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Key Points:</h4>
                    <ul className="space-y-2">
                      {module.sections[currentSection].keyPoints!.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                          <span className="text-gray-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Smart Contract Deployment Simulation */}
                {module.sections[currentSection].simulation && (
                  <div className="space-y-6">
                    <div className="border-t border-white/10 pt-6">
                      <h4 className="text-lg font-semibold mb-4">📋 Smart Contract Code</h4>
                      <div className="bg-gray-900/80 rounded-lg p-4 border border-gray-700 relative">
                        <button
                          onClick={() => copyToClipboard(module.sections[currentSection].simulation!.contractCode)}
                          className="absolute top-3 right-3 p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Copy code"
                        >
                          <Copy className="w-4 h-4 text-gray-400" />
                        </button>
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{module.sections[currentSection].simulation!.contractCode}</code>
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">🚀 Deployment Simulation</h4>
                      <div className="space-y-4">
                        {module.sections[currentSection].simulation!.steps.map((step, index) => (
                          <div key={index} className="glass-card p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                  simulationStep >= index ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                                }`}>
                                  {simulationStep > index ? <CheckCircle className="w-5 h-5" /> : step.step}
                                </div>
                                <div>
                                  <h5 className="font-semibold">{step.title}</h5>
                                  <p className="text-sm text-gray-400">{step.description}</p>
                                </div>
                              </div>
                              
                              <button
                                onClick={() => runSimulationStep(index)}
                                disabled={isRunningSimulation}
                                className="glass-button text-sm px-4 py-2 bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30 disabled:opacity-50"
                              >
                                {isRunningSimulation && simulationStep === index ? 'Running...' : 'Run Step'}
                              </button>
                            </div>

                            {/* Code Block */}
                            <div className="bg-gray-900/50 rounded-lg p-3 mb-3 border border-gray-700 relative">
                              <button
                                onClick={() => copyToClipboard(step.code)}
                                className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded transition-colors"
                                title="Copy code"
                              >
                                <Copy className="w-3 h-3 text-gray-400" />
                              </button>
                              <pre className="text-xs text-gray-300 overflow-x-auto">
                                <code>{step.code}</code>
                              </pre>
                            </div>

                            {/* Output */}
                            {simulationStep >= index && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-900/20 border border-green-500/30 rounded-lg p-3"
                              >
                                <div className="flex items-center mb-2">
                                  <Terminal className="w-4 h-4 text-green-400 mr-2" />
                                  <span className="text-sm font-semibold text-green-400">Output:</span>
                                </div>
                                <pre className="text-xs text-green-300 whitespace-pre-wrap">
                                  {step.output}
                                </pre>
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </div>

                      {simulationStep >= module.sections[currentSection].simulation!.steps.length && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="glass-card p-6 bg-green-500/10 border-green-500/20 text-center"
                        >
                          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                          <h4 className="text-xl font-bold text-green-400 mb-2">Deployment Complete! 🎉</h4>
                          <p className="text-gray-300">
                            You've successfully simulated deploying a smart contract on Arc Network. 
                            Your contract is now live and ready for interaction with USDC gas and sub-second finality.
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Prerequisites */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 mb-8"
            >
              <h3 className="text-xl font-bold mb-4">Prerequisites</h3>
              <ul className="space-y-2">
                {module.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{prerequisite}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Reference Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold mb-4">📚 Reference Materials</h3>
              <div className="space-y-3">
                {module.references.map((reference, index) => (
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
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-6">Module Content</h3>
              
              <div className="space-y-3">
                {module.sections.map((section, index) => {
                  const SectionIcon = getSectionIcon(section.type)
                  const isCompleted = completedSections.includes(section.id)
                  const isCurrent = index === currentSection
                  
                  return (
                    <motion.div
                      key={section.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setCurrentSection(index)}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-blue-500/20 border border-blue-500/30'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-lg p-2 mr-3 ${getSectionColor(section.type)}`}>
                            <SectionIcon className="w-full h-full" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{section.title}</h4>
                            <p className="text-xs text-gray-400">{section.duration}</p>
                          </div>
                        </div>
                        
                        {isCompleted && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={() => handleSectionComplete(module.sections[currentSection].id)}
                  className="w-full glass-button bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30"
                >
                  Mark as Complete
                </button>
                
                {progressPercentage === 100 && (
                  <Link href="/quiz">
                    <button className="w-full glass-button bg-green-500/20 border-green-500/30 hover:bg-green-500/30 mt-3">
                      Take Quiz
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}