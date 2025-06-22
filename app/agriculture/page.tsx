"use client"

import AgricultureModule from "@/components/agriculture-module"
import Navbar from "@/components/navbar"
import { useState, useEffect } from "react"

export default function AgriculturePage() {
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [isOnline, setIsOnline] = useState(true)
  const [notifications, setNotifications] = useState(5)

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.05) // 95% online simulation
      if (Math.random() > 0.9) {
        setNotifications((prev) => prev + 1) // Occasional new notifications
      }
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navbar */}
      <Navbar 
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        notifications={notifications}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentLanguage === "hi" ? "कृषि सहायता" : "Agriculture Services"}
          </h1>
          <p className="text-lg text-gray-600">
            {currentLanguage === "hi" 
              ? "स्मार्ट कृषि सलाह और फसल प्रबंधन" 
              : "Smart agriculture advice and crop management"
            }
          </p>
        </div>
        <AgricultureModule language={currentLanguage} isOnline={isOnline} />
      </div>
    </div>
  )
} 