"use client"

import AdminDashboard from "@/components/admin-dashboard"
import Navbar from "@/components/navbar"
import { useState } from "react"

export default function AdminPage() {
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [notifications, setNotifications] = useState(5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navbar */}
      <Navbar 
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        notifications={notifications}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentLanguage === "hi" ? "प्रशासन डैशबोर्ड" : "Admin Dashboard"}
          </h1>
          <p className="text-lg text-gray-600">
            {currentLanguage === "hi" 
              ? "सिस्टम प्रबंधन और विश्लेषण" 
              : "System management and analytics"
            }
          </p>
        </div>
        <AdminDashboard />
      </div>
    </div>
  )
} 