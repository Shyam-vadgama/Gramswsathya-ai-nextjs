"use client"

import HealthcareModule from "@/components/healthcare-module"
import Navbar from "@/components/navbar"
import { useState, useEffect } from "react"

export default function HealthcarePage() {
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50">
      {/* Navbar */}
      <Navbar 
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        notifications={notifications}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentLanguage === "hi" ? "स्वास्थ्य सेवा" : "Healthcare Services"}
          </h1>
          <p className="text-lg text-gray-600">
            {currentLanguage === "hi" 
              ? "AI-संचालित स्वास्थ्य सहायता और टेलीमेडिसिन सेवाएं" 
              : "AI-powered health assistance and telemedicine services"
            }
          </p>
        </div>
        <HealthcareModule language={currentLanguage} isOnline={isOnline} />
      </div>
    </div>
  )
} 