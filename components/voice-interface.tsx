"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Mic, Volume2, Loader2, Wifi, WifiOff, Zap, Brain } from "lucide-react"

interface VoiceInterfaceProps {
  language: string
  isOnline: boolean
}

export default function VoiceInterface({ language, isOnline }: VoiceInterfaceProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [confidence, setConfidence] = useState(0)
  const [processingStage, setProcessingStage] = useState("")

  const greetings = {
    en: "Hello! I'm your AI health and agriculture assistant. How can I help you today?",
    hi: "नमस्ते! मैं आपका AI स्वास्थ्य और कृषि सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    gu: "નમસ્તે! હું તમારો AI આરોગ્ય અને કૃષિ સહાયક છું. આજે હું તમારી કેવી રીતે મદદ કરી શકું?",
    mr: "नमस्कार! मी तुमचा AI आरोग्य आणि शेती सहाय्यक आहे. आज मी तुम्हाला कशी मदत करू शकतो?",
  }

  const sampleQueries = {
    en: [
      "I have fever and headache since 2 days",
      "My wheat crop leaves are turning yellow",
      "What's today's onion price in nearby mandi?",
      "Find nearest doctor for chest pain",
      "How to treat stem borer in rice?",
      "When should I apply fertilizer to cotton?",
    ],
    hi: [
      "मुझे 2 दिन से बुखार और सिरदर्द है",
      "मेरी गेहूं की फसल के पत्ते पीले हो रहे हैं",
      "नजदीकी मंडी में आज प्याज का भाव क्या है?",
      "सीने के दर्द के लिए नजदीकी डॉक्टर खोजें",
      "धान में तना छेदक का इलाज कैसे करें?",
      "कपास में खाद कब डालना चाहिए?",
    ],
    gu: [
      "મને 2 દિવસથી તાવ અને માથાનો દુખાવો છે",
      "મારા ઘઉંના પાકના પાંદડા પીળા થઈ રહ્યા છે",
      "નજીકના મંડીમાં આજે ડુંગળીનો ભાવ શું છે?",
      "છાતીના દુખાવા માટે નજીકના ડૉક્ટર શોધો",
      "ચોખામાં દાંડી છેદકનો ઇલાજ કેવી રીતે કરવો?",
      "કપાસમાં ખાતર ક્યારે નાખવું જોઈએ?",
    ],
    mr: [
      "मला 2 दिवसांपासून ताप आणि डोकेदुखी आहे",
      "माझ्या गव्हाच्या पिकाची पाने पिवळी होत आहेत",
      "जवळच्या मंडीत आज कांद्याचा भाव काय आहे?",
      "छातीच्या दुखण्यासाठी जवळचा डॉक्टर शोधा",
      "भातामध्ये स्टेम बोररचा उपचार कसा करावा?",
      "कापसाला खत कधी घालावे?",
    ],
  }

  const handleVoiceInput = async (query: string) => {
    setTranscript(query)
    setIsProcessing(true)
    setConfidence(Math.random() * 30 + 70) // Simulate confidence 70-100%

    // Simulate AI processing stages
    const stages = [
      language === "hi" ? "आवाज़ पहचान रहा है..." : "Recognizing voice...",
      language === "hi" ? "भाषा समझ रहा है..." : "Understanding language...",
      language === "hi" ? "AI विश्लेषण कर रहा है..." : "AI analyzing...",
      language === "hi" ? "उत्तर तैयार कर रहा है..." : "Preparing response...",
    ]

    for (let i = 0; i < stages.length; i++) {
      setProcessingStage(stages[i])
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    // Generate contextual AI response
    let aiResponse = ""
    const queryLower = query.toLowerCase()

    if (
      queryLower.includes("fever") ||
      queryLower.includes("बुखार") ||
      queryLower.includes("તાવ") ||
      queryLower.includes("ताप")
    ) {
      aiResponse =
        language === "hi"
          ? "🌡️ बुखार और सिरदर्द के लक्षण: \n\n✅ तुरंत करें:\n• पानी अधिक पिएं (8-10 गिलास)\n• आराम करें और नींद लें\n• पैरासिटामोल ले सकते हैं\n\n⚠️ डॉक्टर से मिलें अगर:\n• बुखार 102°F से ज्यादा हो\n• 3 दिन से ज्यादा रहे\n• सांस लेने में तकलीफ हो\n\n📞 क्या मैं आपके लिए नजदीकी डॉक्टर खोजूं?"
          : "🌡️ Fever and headache symptoms:\n\n✅ Immediate care:\n• Drink plenty of water (8-10 glasses)\n• Rest and sleep well\n• Take paracetamol if needed\n\n⚠️ See doctor if:\n• Fever above 102°F\n• Persists more than 3 days\n• Breathing difficulty\n\n📞 Should I find a nearby doctor for you?"
    } else if (
      queryLower.includes("crop") ||
      queryLower.includes("yellow") ||
      queryLower.includes("फसल") ||
      queryLower.includes("पीले") ||
      queryLower.includes("પીળા") ||
      queryLower.includes("पिवळी")
    ) {
      aiResponse =
        language === "hi"
          ? "🌾 गेहूं के पत्ते पीले होना:\n\n🔍 संभावित कारण:\n• नाइट्रोजन की कमी (सबसे आम)\n• पानी की कमी या अधिकता\n• आयरन की कमी\n• बीमारी (पत्ती का धब्बा रोग)\n\n💡 समाधान:\n• यूरिया 50 किलो/एकड़ डालें\n• सिंचाई नियमित करें\n• मिट्टी की जांच कराएं\n\n📱 क्या मैं नजदीकी कृषि केंद्र की जानकारी दूं?"
          : "🌾 Wheat leaves turning yellow:\n\n🔍 Possible causes:\n• Nitrogen deficiency (most common)\n• Water stress (too little/much)\n• Iron deficiency\n• Disease (leaf spot)\n\n💡 Solutions:\n• Apply 50kg urea per acre\n• Regular irrigation\n• Get soil tested\n\n📱 Should I provide nearby agriculture center info?"
    } else if (
      queryLower.includes("price") ||
      queryLower.includes("mandi") ||
      queryLower.includes("भाव") ||
      queryLower.includes("मंडी") ||
      queryLower.includes("ભાવ") ||
      queryLower.includes("मंडी")
    ) {
      aiResponse =
        language === "hi"
          ? "💰 आज की मंडी रेट (नजदीकी मंडी):\n\n🧅 प्याज: ₹25-30/किलो\n📈 कल से 5% बढ़ने की संभावना\n\n📊 अन्य भाव:\n• आलू: ₹22/किलो\n• टमाटर: ₹35/किलो\n• गेहूं: ₹2,150/क्विंटल\n\n📱 SMS अलर्ट चाहिए? मैं आपको रोज भेज सकता हूं।\n\n💡 सुझाव: कल बेचना बेहतर होगा।"
          : "💰 Today's mandi rates (nearest mandi):\n\n🧅 Onion: ₹25-30/kg\n📈 Expected to rise 5% tomorrow\n\n📊 Other rates:\n• Potato: ₹22/kg\n• Tomato: ₹35/kg\n• Wheat: ₹2,150/quintal\n\n📱 Want SMS alerts? I can send daily updates.\n\n💡 Tip: Better to sell tomorrow."
    } else if (
      queryLower.includes("doctor") ||
      queryLower.includes("chest") ||
      queryLower.includes("pain") ||
      queryLower.includes("डॉक्टर") ||
      queryLower.includes("सीने") ||
      queryLower.includes("दर्द")
    ) {
      aiResponse =
        language === "hi"
          ? "🚨 सीने में दर्द - तुरंत ध्यान दें!\n\n⚠️ गंभीर लक्षण हैं तो 108 कॉल करें:\n• तेज दर्द\n• सांस लेने में तकलीफ\n• पसीना आना\n• चक्कर आना\n\n🏥 नजदीकी डॉक्टर:\n• Dr. राम शर्मा - 2.1 km\n• PHC रामपुर - 3.5 km\n• जिला अस्पताल - 12 km\n\n📞 तुरंत कॉल करूं? (हां/नहीं)"
          : "🚨 Chest pain - Immediate attention needed!\n\n⚠️ Call 108 if severe symptoms:\n• Sharp pain\n• Breathing difficulty\n• Sweating\n• Dizziness\n\n🏥 Nearest doctors:\n• Dr. Ram Sharma - 2.1 km\n• PHC Rampur - 3.5 km\n• District Hospital - 12 km\n\n📞 Should I call immediately? (Yes/No)"
    } else {
      aiResponse = greetings[language as keyof typeof greetings] || greetings.en
    }

    setResponse(aiResponse)
    setIsProcessing(false)
    setProcessingStage("")
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 z-50 shadow-2xl border-2 border-blue-200 bg-white/95 backdrop-blur-md">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse"></div>
            <h3 className="font-semibold text-blue-600 flex items-center">
              <Brain className="w-4 h-4 mr-1" />
              {language === "hi" ? "AI आवाज़ सहायक" : "AI Voice Assistant"}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Wifi className="w-3 h-3 mr-1" />
                Online
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                <WifiOff className="w-3 h-3 mr-1" />
                Offline
              </Badge>
            )}
          </div>
        </div>

        {!transcript && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              {greetings[language as keyof typeof greetings] || greetings.en}
            </p>
            <div className="space-y-3">
              <p className="text-xs font-medium text-gray-500 flex items-center">
                <Zap className="w-3 h-3 mr-1" />
                {language === "hi" ? "ये पूछकर देखें:" : "Try asking:"}
              </p>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {(sampleQueries[language as keyof typeof sampleQueries] || sampleQueries.en).map((query, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full text-left justify-start h-auto p-3 text-xs hover:bg-blue-50 border border-gray-200 rounded-lg"
                    onClick={() => handleVoiceInput(query)}
                  >
                    <span className="text-blue-600 mr-2">💬</span>"{query}"
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {transcript && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-blue-800">{language === "hi" ? "आपने कहा:" : "You said:"}</p>
                {confidence > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(confidence)}% {language === "hi" ? "सटीक" : "confident"}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-blue-700 font-medium">"{transcript}"</p>
            </div>

            {isProcessing ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="relative">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                    <div className="absolute inset-0 w-5 h-5 border-2 border-blue-200 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-sm font-medium">{processingStage}</span>
                </div>
                <Progress value={(processingStage.length / 4) * 100} className="h-2" />
              </div>
            ) : (
              response && (
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Volume2 className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-sm font-medium text-green-800">
                      {language === "hi" ? "AI सुझाव:" : "AI Response:"}
                    </p>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                      <Brain className="w-3 h-3 mr-1" />
                      Smart
                    </Badge>
                  </div>
                  <div className="text-sm text-green-700 whitespace-pre-line leading-relaxed">{response}</div>
                </div>
              )
            )}

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setTranscript("")
                  setResponse("")
                  setIsProcessing(false)
                  setConfidence(0)
                }}
                className="flex-1"
              >
                {language === "hi" ? "नया सवाल" : "New Question"}
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-center pt-2">
          <Button
            size="lg"
            className={`rounded-full w-16 h-16 shadow-lg transition-all duration-300 ${
              isListening
                ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse"
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            }`}
            onClick={() => setIsListening(!isListening)}
          >
            <Mic className={`w-8 h-8 ${isListening ? "animate-pulse" : ""}`} />
          </Button>
        </div>

        <p className="text-xs text-center text-gray-500">
          {language === "hi"
            ? "बटन दबाकर बोलें या ऊपर के सुझाव पर क्लिक करें"
            : "Press button to speak or click suggestions above"}
        </p>
      </CardContent>
    </Card>
  )
}
