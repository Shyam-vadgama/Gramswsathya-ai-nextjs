"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface EmergencyButtonProps {
  language: string
}

export default function EmergencyButton({ language }: EmergencyButtonProps) {
  const [isEmergency, setIsEmergency] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleEmergencyClick = () => {
    setIsEmergency(true)
    setCountdown(5)

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Simulate emergency call
          alert(language === "hi" ? "आपातकालीन सेवा से जुड़ रहे हैं..." : "Connecting to emergency services...")
          setIsEmergency(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const cancelEmergency = () => {
    setIsEmergency(false)
    setCountdown(0)
  }

  if (isEmergency) {
    return (
      <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-80 bg-red-50 border-2 border-red-500">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" />
          <h3 className="text-lg font-bold text-red-800 mb-2">
            {language === "hi" ? "आपातकालीन कॉल" : "Emergency Call"}
          </h3>
          <p className="text-red-700 mb-4">
            {language === "hi" ? `${countdown} सेकंड में कॉल होगी` : `Calling in ${countdown} seconds`}
          </p>
          <Button onClick={cancelEmergency} variant="outline" className="border-red-500 text-red-600">
            {language === "hi" ? "रद्द करें" : "Cancel"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Button onClick={handleEmergencyClick} className="bg-red-500 hover:bg-red-600 text-white shadow-lg" size="sm">
      <AlertTriangle className="w-4 h-4 mr-2" />
      {language === "hi" ? "आपातकाल" : "Emergency"}
    </Button>
  )
}
