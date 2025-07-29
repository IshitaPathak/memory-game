"use client"

import { useState } from "react"
import { Clock } from "lucide-react"

interface RetroHeaderProps {
  // Branding
  title?: string
  subtitle?: string
  highlightedWord?: string
  // Navigation
  navToggleOptions?: string[]
  statusText?: string
  // Colors
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
  backgroundColor?: string
  textColor?: string
  // Callbacks
  onNavToggle?: (option: string) => void
  onStatusClick?: () => void
  className?: string
}

export function RetroHeader({
  title = "GLIMPSE",
  subtitle = "SEARCH ALMOST",
  highlightedWord = "ANYTHING",
  navToggleOptions = ["WEB", "ARNS"],
  statusText = "STATUS",
  primaryColor = "#2d2d2d",
  secondaryColor = "#f5f5dc",
  accentColor = "#4ade80",
  backgroundColor = "#f5f5dc",
  textColor = "#2d2d2d",
  onNavToggle,
  onStatusClick,
  className = "",
}: RetroHeaderProps) {
  const [activeNavOption, setActiveNavOption] = useState(navToggleOptions[0])

  const handleNavToggle = (option: string) => {
    setActiveNavOption(option)
    onNavToggle?.(option)
  }

  return (
    <header
      className={`relative min-h-[40vh] overflow-hidden ${className}`}
      style={{ backgroundColor, color: textColor }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-current rounded-lg rotate-12"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-current rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 border-2 border-current rotate-45"></div>
        <div className="absolute bottom-20 right-40 w-16 h-16 border-2 border-current rounded-lg -rotate-12"></div>
      </div>

      {/* Top Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-12">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl lg:text-3xl font-mono font-bold" style={{ color: textColor }}>
            {title}
          </h1>
        </div>

        {/* Status Button */}
        <button
          onClick={onStatusClick}
          className="flex items-center gap-2 px-4 py-2 font-mono font-bold rounded-lg border-2 transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: primaryColor,
            color: secondaryColor,
            borderColor: primaryColor,
            boxShadow: `3px 3px 0px ${primaryColor}`,
          }}
        >
          <Clock className="w-4 h-4" />
          <span className="hidden sm:inline">{statusText}</span>
        </button>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 px-6 lg:px-12 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Character Illustrations - Decorative */}
          <div className="absolute top-20 right-0 hidden xl:block">
            <div
              className="w-32 h-32 rounded-lg border-2 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center rotate-12"
              style={{ borderColor: primaryColor, boxShadow: `4px 4px 0px ${primaryColor}` }}
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-4">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-mono font-bold leading-tight mb-4">
              <div className="mb-2">{subtitle}</div>
              <div className="relative inline-block">
                <span
                  className="px-4 py-2 -rotate-2 inline-block"
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                    boxShadow: `6px 6px 0px ${primaryColor}`,
                  }}
                >
                  {highlightedWord}
                </span>
              </div>
            </h2>
          </div>
        </div>
      </div>
    </header>
  )
}