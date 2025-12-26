'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Download, Share, CheckCircle, Twitter } from 'lucide-react'
import html2canvas from 'html2canvas'
import ArcLogo from '@/components/ArcLogo'

export default function CertificatePage() {
  const [userName, setUserName] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [certificateGenerated, setCertificateGenerated] = useState(false)
  const certificateRef = useRef<HTMLDivElement>(null)

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const handleGenerateCertificate = () => {
    if (userName.trim()) {
      setCertificateGenerated(true)
    }
  }

  const handleDownload = async () => {
    if (!certificateRef.current) return

    setIsGenerating(true)
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: null,
        width: 1200,
        height: 800
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
        scale: 2,
        backgroundColor: null,
        width: 1200,
        height: 800
      })
      
      // Convert to blob for sharing
      canvas.toBlob((blob) => {
        if (blob) {
          const text = `Just earned my Arc Network certificate! 🎓@arc is Circle's L1 blockchain - the Economic OS for the internet. Mastered:• USDC gas & predictable fees• Sub-second finality• EVM smart contracts• Enterprise DeFi Ready to build the future of stablecoin finance! 🚀`
          
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
          window.open(twitterUrl, '_blank')
        }
      }, 'image/png')
    } catch (error) {
      console.error('Error sharing certificate:', error)
    }
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
          <h1 className="text-3xl font-bold mb-4">Generate Your Certificate</h1>
          <p className="text-gray-300 mb-6">
            Congratulations on completing the Network Academy! 
            Enter your name to generate your personalized certificate.
          </p>
          
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
              style={{ width: '1200px', height: '800px', maxWidth: '100%', minWidth: '320px' }}
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
              <div className="absolute inset-4 border border-green-400/30 rounded-xl">
                <div className="absolute inset-2 border border-green-400/20 rounded-lg"></div>
              </div>

              {/* Content styled as Solidity contract */}
              <div className="relative z-10 p-8 h-full font-mono text-green-400 flex flex-col justify-between">
                {/* Contract Header */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-green-500 text-xs mb-1">// SPDX-License-Identifier: MIT</div>
                      <div className="text-green-500 text-xs mb-2">pragma solidity ^0.8.19;</div>
                    </div>
                    <div className="opacity-60 hover:opacity-80 transition-opacity">
                      <ArcLogo className="text-green-300 certificate-logo" width={60} height={20} />
                    </div>
                  </div>
                  <div className="text-blue-400 text-xs mb-1">import "./ArcNetworkAcademy.sol";</div>
                  <div className="text-blue-400 text-xs mb-4">import "./Circle.sol";</div>
                  
                  <div className="text-yellow-400 text-lg font-bold mb-2">
                    contract <span className="text-white">ArcNetworkCertificate</span> {'{'}
                  </div>
                </div>

                {/* Contract State Variables */}
                <div className="mb-4 ml-2 flex-1">
                  <div className="text-purple-400 text-xs mb-2">// Certificate holder information</div>
                  <div className="text-blue-400 text-sm mb-1">
                    string public <span className="text-white">holderName</span> = "<span className="text-green-300">{userName}</span>";
                  </div>
                  <div className="text-blue-400 text-sm mb-1">
                    string public <span className="text-white">course</span> = "<span className="text-green-300">Arc Network Fundamentals</span>";
                  </div>
                  <div className="text-blue-400 text-sm mb-1">
                    uint256 public <span className="text-white">issueDate</span> = <span className="text-yellow-300">{Math.floor(Date.now() / 1000)}</span>;
                  </div>
                  <div className="text-blue-400 text-sm mb-1">
                    address public <span className="text-white">academy</span> = <span className="text-green-300">0xArcNetworkAcademy</span>;
                  </div>
                  <div className="text-blue-400 text-sm mb-3">
                    bool public <span className="text-white">verified</span> = <span className="text-yellow-300">true</span>;
                  </div>

                  {/* Skills Array */}
                  <div className="mb-3">
                    <div className="text-purple-400 text-xs mb-1">// Skills mastered</div>
                    <div className="text-blue-400 text-sm mb-1">
                      string[] public <span className="text-white">skillsAcquired</span> = [
                    </div>
                    <div className="ml-4 text-green-300 text-xs">
                      <div>"<span className="text-green-300">Stablecoin Architecture</span>",</div>
                      <div>"<span className="text-green-300">USDC Gas Mechanics</span>",</div>
                      <div>"<span className="text-green-300">Malachite Consensus</span>",</div>
                      <div>"<span className="text-green-300">Enterprise DeFi</span>"</div>
                    </div>
                    <div className="text-blue-400 text-sm mb-3">];</div>
                  </div>

                  {/* Achievement Struct */}
                  <div className="mb-3">
                    <div className="text-purple-400 text-xs mb-1">// Achievement details</div>
                    <div className="text-yellow-400 text-sm mb-1">struct <span className="text-white">Achievement</span> {'{'}</div>
                    <div className="ml-4 text-blue-400 text-xs">
                      <div>uint256 <span className="text-white">completionScore</span>: <span className="text-yellow-300">100</span>;</div>
                      <div>uint256 <span className="text-white">totalModules</span>: <span className="text-yellow-300">3</span>;</div>
                      <div>uint256 <span className="text-white">quizScore</span>: <span className="text-yellow-300">85</span>;</div>
                      <div>string <span className="text-white">level</span>: "<span className="text-green-300">Expert</span>";</div>
                    </div>
                    <div className="text-yellow-400 text-sm mb-2">{'}'}</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end text-xs">
                  <div className="text-left">
                    <div className="text-purple-400 mb-1">// Issued by</div>
                    <div className="text-green-300">Arc Network Academy</div>
                    <div className="text-slate-400">{currentDate}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-purple-400 mb-1">// Certificate ID</div>
                    <div className="text-yellow-300">0x{Date.now().toString(16).slice(-8)}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-purple-400 mb-1">// Status</div>
                    <div className="text-green-300 flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      VERIFIED
                    </div>
                  </div>
                </div>
                
                <div className="text-yellow-400 text-lg font-bold text-right mt-2">{'}'}</div>
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