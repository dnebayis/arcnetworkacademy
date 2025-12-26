'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Star, ArrowRight } from 'lucide-react'
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

interface Module {
  id: number
  title: string
  description: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  rating: number
  icon: string
  iconVariant: "filled" | "outlined" | "round"
  topics: string[]
  color: string
}

const modules: Module[] = [
  {
    id: 1,
    title: "Arc Network Fundamentals",
    description: "Master the core concepts of Arc Network as the Economic OS for the internet. Learn about stablecoin-native architecture, Circle integration, and real-world use cases in finance and payments.",
    duration: "15 min",
    difficulty: "Beginner",
    rating: 4.8,
    icon: "school",
    iconVariant: "outlined",
    topics: ["Economic OS Concept", "Stablecoin Finance", "Circle Integration", "Enterprise Use Cases", "USDC Gas System", "Sub-second Finality"],
    color: "from-slate-600 to-slate-500"
  },
  {
    id: 2,
    title: "Technical Architecture & Development",
    description: "Deep dive into Malachite consensus, system architecture, and smart contract development. Learn to build and deploy applications on Arc Network using familiar Ethereum tools.",
    duration: "25 min",
    difficulty: "Intermediate",
    rating: 4.9,
    icon: "architecture",
    iconVariant: "outlined",
    topics: ["Malachite Protocol", "BFT Consensus", "EVM Compatibility", "Smart Contracts", "Deployment Tools", "Best Practices"],
    color: "from-slate-700 to-slate-600"
  },
  {
    id: 3,
    title: "Enterprise Features & DeFi",
    description: "Explore Arc's enterprise-grade features including privacy, compliance, and DeFi applications. Understand how Arc enables institutional capital markets and regulated financial services.",
    duration: "20 min",
    difficulty: "Advanced",
    rating: 4.8,
    icon: "security",
    iconVariant: "outlined",
    topics: ["Privacy Models", "Regulatory Compliance", "DeFi Protocols", "Institutional Finance", "Liquidity Management", "Risk Management"],
    color: "from-slate-600 to-slate-700"
  }
]

export default function ModulesPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')
  const [hoveredModule, setHoveredModule] = useState<number | null>(null)

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']
  
  const filteredModules = selectedDifficulty === 'All' 
    ? modules 
    : modules.filter(module => module.difficulty === selectedDifficulty)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20'
      case 'Advanced': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <ArcLogo className="text-slate-300 mr-3" width={80} height={27} />
            <div className="logo-separator h-5 w-px mx-3"></div>
            <span className="text-slate-400 font-semibold">Modules</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Learning Modules</h1>
          <p className="text-xl text-gray-300 mb-8">
            Comprehensive modules covering every aspect of Arc Network
          </p>

          {/* Difficulty Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedDifficulty === difficulty
                    ? 'bg-blue-500/30 border border-blue-500/50 text-blue-400'
                    : 'glass-button'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {filteredModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredModule(module.id)}
              onHoverEnd={() => setHoveredModule(null)}
              className="glass-card module-card p-6 group cursor-pointer hover:scale-105 transition-all duration-300 flex flex-col h-full"
            >
              {/* Module Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${module.color} p-3 group-hover:scale-110 transition-transform`}>
                  <MaterialIcon name={module.icon} variant={module.iconVariant} className="w-full h-full text-white text-2xl" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(module.difficulty)}`}>
                  {module.difficulty}
                </span>
              </div>

              {/* Module Content - Flexible grow area */}
              <div className="flex-grow">
                {/* Module Info */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  {module.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {module.description}
                </p>

                {/* Topics */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {module.topics.slice(0, 3).map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="px-2 py-1 bg-white/10 rounded-md text-xs text-gray-300"
                      >
                        {topic}
                      </span>
                    ))}
                    {module.topics.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 rounded-md text-xs text-gray-400">
                        +{module.topics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {module.duration}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    {module.rating}
                  </div>
                </div>
              </div>

              {/* Action Button - Fixed at bottom */}
              <div className="mt-auto">
                <Link href={`/modules/${module.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full glass-button flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/30"
                  >
                    Start Module
                    {hoveredModule === module.id && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="ml-2"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    )}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Path Suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <MaterialIcon name="lightbulb" variant="outlined" className="w-12 h-12 text-blue-400 mx-auto mb-4 text-5xl" />
            <h3 className="text-2xl font-bold mb-4">Recommended Learning Path</h3>
            <p className="text-gray-300 mb-6">
              New to Arc Network? Start with Fundamentals, then move to Consensus & Architecture, 
              followed by Smart Contract Development for a comprehensive understanding.
            </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 bg-slate-700/50 rounded-full text-slate-300 text-sm">
                  1. Fundamentals
                </span>
                <ArrowRight className="w-5 h-5 text-slate-400 mt-2" />
                <span className="px-4 py-2 bg-slate-700/50 rounded-full text-slate-300 text-sm">
                  2. Technical & Development
                </span>
                <ArrowRight className="w-5 h-5 text-slate-400 mt-2" />
                <span className="px-4 py-2 bg-slate-700/50 rounded-full text-slate-300 text-sm">
                  3. Enterprise & DeFi
                </span>
              </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}