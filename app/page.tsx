'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
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

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const features = [
    {
      icon: "auto_stories",
      iconVariant: "outlined" as const,
      title: "Interactive Tutorials",
      description: "Learn Arc Network fundamentals through hands-on, step-by-step tutorials",
      color: "from-slate-600 to-slate-500"
    },
    {
      icon: "architecture",
      iconVariant: "outlined" as const,
      title: "Practical Modules",
      description: "Deep dive into stablecoin finance, consensus mechanisms, and DApp development",
      color: "from-slate-700 to-slate-600"
    },
    {
      icon: "workspace_premium",
      iconVariant: "outlined" as const,
      title: "Earn Certificates",
      description: "Complete quizzes and earn shareable certificates to showcase your expertise",
      color: "from-slate-600 to-slate-700"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center mb-6">
            <ArcLogo className="text-slate-300 mr-3" width={100} height={34} />
            <div className="logo-separator h-6 w-px mx-3"></div>
            <span className="text-slate-400 font-semibold text-lg">Network Academy</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Master the{' '}
            <span className="gradient-text">Economic OS</span>
            {' '}of the Internet
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Learn Arc Network through interactive tutorials, practical modules, and earn certificates 
            that showcase your expertise in stablecoin-native blockchain technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tutorial">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button text-lg font-semibold group"
              >
                Start Learning
                <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            
            <Link href="/modules">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button text-lg font-semibold"
              >
                Explore Modules
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose Arc Academy?</h2>
            <p className="text-xl text-gray-300">
              The most comprehensive learning platform for Arc Network
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="glass-card p-8 text-center group cursor-pointer"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                  <MaterialIcon name={feature.icon} variant={feature.iconVariant} className="w-full h-full text-white text-3xl" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                
                {hoveredCard === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4"
                  >
                    <ArrowRight className="w-6 h-6 mx-auto text-blue-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <MaterialIcon name="verified" variant="outlined" className="w-16 h-16 mx-auto mb-6 text-green-400 text-6xl" />
          <h2 className="text-4xl font-bold mb-6">Ready to Become an Arc Expert?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers and finance professionals mastering the future of stablecoin finance
          </p>
          
          <Link href="/tutorial">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-button text-xl font-semibold px-8 py-4"
            >
              Begin Your Journey
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}