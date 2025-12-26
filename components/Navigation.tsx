'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ArcLogo from '@/components/ArcLogo'

// Material Icons component with variants
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

const navItems = [
  { href: '/', label: 'Home', icon: 'home', variant: 'round' as const },
  { href: '/tutorial', label: 'Tutorial', icon: 'school', variant: 'outlined' as const },
  { href: '/modules', label: 'Modules', icon: 'auto_stories', variant: 'outlined' as const },
  { href: '/quiz', label: 'Quiz', icon: 'quiz', variant: 'round' as const },
  { href: '/certificate', label: 'Certificate', icon: 'workspace_premium', variant: 'outlined' as const },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Navigation - Floating Left Sidebar */}
      <nav className="hidden md:block fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="nav-glass rounded-2xl p-2"
        >
          {/* Logo */}
          <div className="flex justify-center mb-4 pb-3 border-b border-slate-600/30">
            <Link href="/" className="group">
              <div className="flex items-center justify-center p-2 rounded-xl hover:bg-white/5 transition-all duration-300">
                <ArcLogo className="text-slate-300 group-hover:text-white transition-colors" width={60} height={20} />
              </div>
            </Link>
          </div>
          
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`nav-item relative flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500/25 to-purple-500/25 text-blue-300 shadow-lg'
                        : 'hover:bg-white/8 text-gray-300 hover:text-white'
                    }`}
                    title={item.label}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-xl border border-blue-400/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <MaterialIcon name={item.icon} variant={item.variant} className="text-lg" />
                      <span className="text-xs font-medium text-center mt-1">{item.label}</span>
                    </div>
                    
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </motion.div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 right-4 z-50 nav-glass p-3 rounded-xl"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MaterialIcon name="close" variant="round" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MaterialIcon name="menu" variant="round" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 nav-glass z-50 p-6"
            >
              {/* Mobile Logo */}
              <div className="flex justify-center mb-6 pb-4 border-b border-slate-600/30">
                <Link href="/" onClick={() => setIsOpen(false)} className="group">
                  <div className="flex items-center justify-center p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                    <ArcLogo className="text-slate-300 group-hover:text-white transition-colors" width={80} height={27} />
                  </div>
                </Link>
              </div>
              
              <div className="mt-16 space-y-3">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={item.href} onClick={() => setIsOpen(false)}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`nav-item flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-r from-blue-500/25 to-purple-500/25 text-blue-300 shadow-lg border border-blue-400/20'
                              : 'hover:bg-white/8 text-gray-300 hover:text-white'
                          }`}
                        >
                          <MaterialIcon name={item.icon} variant={item.variant} />
                          <span className="font-medium">{item.label}</span>
                        </motion.div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}