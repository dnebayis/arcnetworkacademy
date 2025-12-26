'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Share, CheckCircle, Twitter } from 'lucide-react'
import html2canvas from 'html2canvas'
import ArcLogo from '@/components/ArcLogo'
import Link from 'next/link'

export default function CertificatePage() {
  const [userName, setUserName] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [certificateGenerated, setCertificateGenerated] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [quizPercentage, setQuizPercentage] = useState(0)
  const certificateRef = useRef<HTMLDivElement>(null)

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  useEffect(() => {
    // Check if quiz was completed by looking for quiz results in localStorage
    const checkQuizCompletion = () => {
      const quizResults = localStorage.getItem('arcQuizResults')
      if (quizResults) {
        const results = JSON.parse(quizResults)
        if (results.passed && results.score !== undefined) {
          setQuizCompleted(true)
          setQuizScore(results.score)
          setQuizPercentage(results.percentage)
        }
      }
    }

    checkQuizCompletion()
  }, [])

  const handleGenerateCertificate = () => {
    if (userName.trim() && quizCompleted) {
      setCertificateGenerated(true)
    }
  }

  const handleDownload = async () => {
    if (!certificateRef.current) return

    setIsGenerating(true)
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 1.5,
        backgroundColor: null,
        width: 800,
        height: 600
      })
      
      const link = document.createElement('a')
      link.download = `arc-network-certificate-${userName.replace(/\s+/g, '-').toLowerCase()}.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error('Error generating certificate:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleShareTwitter = async () => {
    if (!certificateRef.current) return

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 1.5,
        backgroundColor: null,
        width: 800,
        height: 600
      })
      
      // Convert to blob for sharing
      canvas.toBlob((blob) => {
        if (blob) {
          const text = `GET /arc-academy/certificate
{
  "status": 200,
  "verified": true,
  "skills": ["USDC_gas", "sub_second_finality", "EVM", "enterprise_DeFi"],
  "next": "build_future()"
}
@arc 🚀 https://arcacademy.vercel.app/`
          
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
          window.open(twitterUrl, '_blank')
        }
      }, 'image/png')
    } catch (error) {
      console.error('Error sharing certificate:', error)
    }
  }

  // If quiz not completed, show requirement message
  if (!quizCompleted) {
    return (
      <div className="min-h-screen px-6 py-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 max-w-md w-full text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <ArcLogo className="text-slate-300 mr-3" width={70} height={23} />
            <div className="logo-separator h-4 w-px mx-3"></div>
            <span className="text-slate-400 font-semibold">Academy</span>
          </div>
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Quiz Required</h1>
          <p className="text-gray-300 mb-6">
            You must complete the Arc Network quiz with a score of 70% or higher to earn your certificate.
          </p>
          
          <div className="space-y-4">
            <Link href="/quiz">
              <button className="w-full glass-button bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30">
                Take the Quiz
              </button>
            </Link>
            <Link href="/tutorial">
              <button className="w-full glass-button">
                Review Tutorial First
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  if (!certificateGenerated) {
    return (
      <div className="min-h-screen px-6 py-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 max-w-md w-full text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <ArcLogo className="text-slate-300 mr-3" width={70} height={23} />
            <div className="logo-separator h-4 w-px mx-3"></div>
            <span className="text-slate-400 font-semibold">Academy</span>
          </div>
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Generate Your Certificate</h1>
          <p className="text-gray-300 mb-4">
            Congratulations on completing the Network Academy! 
          </p>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
            <p className="text-green-400 text-sm">
              ✅ Quiz completed with {quizScore}/8 questions correct ({quizPercentage}%)
            </p>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500/50 focus:bg-white/15 transition-all"
            />
          </div>
          
          <button
            onClick={handleGenerateCertificate}
            disabled={!userName.trim()}
            className="w-full glass-button bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Certificate
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <ArcLogo className="text-slate-300 mr-3" width={80} height={27} />
            <div className="logo-separator h-5 w-px mx-3"></div>
            <span className="text-slate-400 font-semibold">Academy</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Your Arc Network Certificate</h1>
          <p className="text-xl text-gray-300">
            Congratulations! You've successfully completed the Network Academy.
          </p>
        </motion.div>

        {/* Certificate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 px-4"
        >
          <div className="max-w-full overflow-x-auto">
            <div
              ref={certificateRef}
              className="relative mx-auto rounded-2xl shadow-2xl overflow-hidden bg-slate-900 border border-slate-700"
              style={{ width: '800px', height: '600px', maxWidth: '100%', minWidth: '320px' }}
            >
              {/* Solidity Contract Style Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800">
                {/* Code-like grid pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="grid grid-cols-12 gap-px h-full">
                    {Array.from({ length: 96 }).map((_, i) => (
                      <div key={i} className="bg-green-400"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contract-style border */}
              <div className="absolute inset-6 border border-green-400/30 rounded-xl">
                <div className="absolute inset-3 border border-green-400/20 rounded-lg"></div>
              </div>

              {/* Content styled as Solidity contract */}
              <div className="relative z-10 p-12 h-full font-mono text-green-400 flex flex-col justify-between overflow-hidden">
                {/* Contract Header */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-green-500 text-xs mb-1">// SPDX-License-Identifier: MIT</div>
                      <div className="text-green-500 text-xs mb-1">pragma solidity ^0.8.19;</div>
                    </div>
                    <div className="opacity-60 hover:opacity-80 transition-opacity flex-shrink-0">
                      <ArcLogo className="text-green-300 certificate-logo" width={50} height={17} />
                    </div>
                  </div>
                  
                  <div className="text-yellow-400 text-base font-bold mb-2">
                    contract <span className="text-white">ArcCertificate</span> {'{'}
                  </div>
                </div>

                {/* Contract State Variables */}
                <div className="mb-3 ml-2 flex-1 overflow-hidden">
                  <div className="text-blue-400 text-xs mb-1 break-words">
                    string public <span className="text-white">holder</span> = "<span className="text-green-300 font-bold text-sm">{userName}</span>";
                  </div>
                  <div className="text-blue-400 text-xs mb-1">
                    string public <span className="text-white">course</span> = "<span className="text-green-300">Arc Network Fundamentals</span>";
                  </div>
                  <div className="text-blue-400 text-xs mb-4">
                    bool public <span className="text-white">verified</span> = <span className="text-yellow-300">true</span>;
                  </div>

                  {/* Skills Array */}
                  <div className="mb-4">
                    <div className="text-purple-400 text-xs mb-2 font-bold">// Skills mastered</div>
                    <div className="text-blue-400 text-xs mb-1">
                      string[] public <span className="text-white">skills</span> = [
                    </div>
                    <div className="ml-3 text-green-300 text-xs">
                      <div>"<span className="text-green-300">USDC Gas</span>", "<span className="text-green-300">Sub-second Finality</span>",</div>
                      <div>"<span className="text-green-300">EVM Contracts</span>", "<span className="text-green-300">Enterprise DeFi</span>"</div>
                    </div>
                    <div className="text-blue-400 text-xs mb-4">];</div>
                  </div>

                  {/* Quiz Performance */}
                  <div className="mb-4">
                    <div className="text-purple-400 text-xs mb-2 font-bold">// Performance</div>
                    <div className="text-blue-400 text-xs mb-2">
                      uint256 public <span className="text-white">score</span> = <span className="text-yellow-300 font-bold text-sm">{quizScore}</span>/<span className="text-yellow-300">8</span> (<span className="text-yellow-300 font-bold text-sm">{quizPercentage}%</span>);
                    </div>
                    <div className="text-blue-400 text-xs mb-3">
                      string public <span className="text-white">level</span> = "<span className="text-green-300 font-bold text-sm">{quizPercentage >= 90 ? 'Expert' : quizPercentage >= 80 ? 'Advanced' : 'Proficient'}</span>";
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end text-xs flex-shrink-0">
                  <div className="text-left">
                    <div className="text-purple-400 mb-1 font-bold">// Issued by</div>
                    <div className="text-green-300 font-bold">Arc Network Academy</div>
                    <div className="text-slate-400 text-xs">{currentDate}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-purple-400 mb-1">// Status</div>
                    <div className="text-green-300 flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      <span className="font-bold">VERIFIED</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-yellow-400 text-base font-bold text-right mt-2">{'}'}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="glass-button bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30 flex items-center"
          >
            <Download className="w-5 h-5 mr-2" />
            {isGenerating ? 'Generating...' : 'Download PNG'}
          </button>
          
          <button
            onClick={handleShareTwitter}
            className="glass-button bg-blue-400/20 border-blue-400/30 hover:bg-blue-400/30 flex items-center"
          >
            <Twitter className="w-5 h-5 mr-2" />
            Share on Twitter
          </button>
          
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Arc Network Certificate',
                  text: `I just completed the Network Academy and earned my certificate!`,
                  url: window.location.href
                })
              }
            }}
            className="glass-button flex items-center"
          >
            <Share className="w-5 h-5 mr-2" />
            Share Certificate
          </button>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">What's Next?</h3>
            <p className="text-gray-300 mb-6">
              Continue your Arc Network journey by exploring advanced modules, 
              building your first DApp, or joining the developer community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://docs.arc.network"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button"
              >
                Explore Documentation
              </a>
              <a
                href="https://www.arc.network"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button"
              >
                Visit Arc Network
              </a>
              <a
                href="/modules"
                className="glass-button bg-purple-500/20 border-purple-500/30 hover:bg-purple-500/30"
              >
                Advanced Modules
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}