"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mic,
  MicOff,
  Heart,
  Wheat,
  Leaf,
  Users,
  Shield,
  Globe,
  Smartphone,
  Award,
  Activity,
  Star,
  Brain,
  Sparkles,
  Target,
  CheckCircle2,
  ArrowRight,
  PlayCircle,
} from "lucide-react"
import VoiceInterface from "@/components/voice-interface"
import LanguageSelector from "@/components/language-selector"
import NotificationCenter from "@/components/notification-center"
import QuickActions from "@/components/quick-actions"
import StatsOverview from "@/components/stats-overview"
import MarketTicker from "@/components/market-ticker"
import Navbar from "@/components/navbar"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function GramswasthyaAI() {
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [isOnline, setIsOnline] = useState(true)
  const [notifications, setNotifications] = useState(5)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [userLocation, setUserLocation] = useState("Rampur, UP")
  const { user, isAuthenticated } = useAuth()

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
      setIsOnline(Math.random() > 0.05) // 95% online simulation
      if (Math.random() > 0.9) {
        setNotifications((prev) => prev + 1) // Occasional new notifications
      }
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Heart,
      title: currentLanguage === "hi" ? "स्वास्थ्य सेवा" : "Healthcare Module",
      description:
        currentLanguage === "hi"
          ? "AI लक्षण जांच, टेलीमेडिसिन, दवा रिमाइंडर, आपातकालीन सेवा"
          : "AI symptom checker, telemedicine, medicine reminders, emergency services",
      color:
        "bg-gradient-to-br from-red-50 to-pink-50 text-red-600 border-red-200 hover:from-red-100 hover:to-pink-100",
      stats: "2,456 users helped today",
      growth: "+23%",
      trend: "up",
      features: ["24/7 AI Doctor", "Emergency Response", "Health Records", "Medicine Tracking"],
    },
    {
      icon: Wheat,
      title: currentLanguage === "hi" ? "कृषि सहायता" : "Agriculture Module",
      description:
        currentLanguage === "hi"
          ? "स्मार्ट फसल सलाह, मौसम पूर्वानुमान, बाजार भाव, कीट नियंत्रण"
          : "Smart crop advisor, weather forecasts, market prices, pest control",
      color:
        "bg-gradient-to-br from-green-50 to-emerald-50 text-green-600 border-green-200 hover:from-green-100 hover:to-emerald-100",
      stats: "1,834 farmers assisted today",
      growth: "+31%",
      trend: "up",
      features: ["Crop Planning", "Pest Detection", "Market Analysis", "Weather Alerts"],
    },
    {
      icon: Brain,
      title: currentLanguage === "hi" ? "AI आवाज़ सहायक" : "AI Voice Assistant",
      description:
        currentLanguage === "hi"
          ? "उन्नत AI के साथ क्षेत्रीय भाषाओं में पूर्ण आवाज़ सहायता"
          : "Advanced AI with full voice support in regional languages",
      color:
        "bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 border-blue-200 hover:from-blue-100 hover:to-indigo-100",
      stats: "15,678 voice queries today",
      growth: "+45%",
      trend: "up",
      features: ["Natural Language", "Multi-lingual", "Context Aware", "Offline Capable"],
    },
    {
      icon: Smartphone,
      title: currentLanguage === "hi" ? "ऑफलाइन-फर्स्ट" : "Offline-First Technology",
      description:
        currentLanguage === "hi"
          ? "इंटरनेट के बिना काम, स्मार्ट सिंक, कम डेटा उपयोग"
          : "Works without internet, smart sync, low data usage",
      color:
        "bg-gradient-to-br from-purple-50 to-violet-50 text-purple-600 border-purple-200 hover:from-purple-100 hover:to-violet-100",
      stats: "98.5% uptime achieved",
      growth: "+12%",
      trend: "stable",
      features: ["Offline Mode", "Smart Sync", "Low Bandwidth", "Edge Computing"],
    },
  ]

  const achievements = [
    {
      icon: Award,
      title: currentLanguage === "hi" ? "राष्ट्रीय पुरस्कार" : "National Award Winner",
      desc: currentLanguage === "hi" ? "डिजिटल इंडिया पुरस्कार 2024" : "Digital India Award 2024",
    },
    {
      icon: Users,
      title: currentLanguage === "hi" ? "10 लाख+ उपयोगकर्ता" : "1M+ Users Served",
      desc: currentLanguage === "hi" ? "भारत भर में सक्रिय" : "Active across India",
    },
    {
      icon: Target,
      title: currentLanguage === "hi" ? "95% सटीकता" : "95% Accuracy Rate",
      desc: currentLanguage === "hi" ? "AI निदान में" : "In AI diagnostics",
    },
    {
      icon: Sparkles,
      title: currentLanguage === "hi" ? "AI इनोवेशन" : "AI Innovation",
      desc: currentLanguage === "hi" ? "अत्याधुनिक तकनीक" : "Cutting-edge technology",
    },
  ]

  const testimonials = [
    {
      name: currentLanguage === "hi" ? "डॉ. प्रिया शर्मा" : "Dr. Priya Sharma",
      role: currentLanguage === "hi" ? "मुख्य चिकित्सा अधिकारी" : "Chief Medical Officer",
      text:
        currentLanguage === "hi"
          ? "यह प्लेटफॉर्म ग्रामीण स्वास्थ्य सेवा में क्रांति ला रहा है। AI की सटीकता अद्भुत है।"
          : "This platform is revolutionizing rural healthcare. The AI accuracy is remarkable.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
    {
      name: currentLanguage === "hi" ? "रामेश कुमार पटेल" : "Ramesh Kumar Patel",
      role: currentLanguage === "hi" ? "प्रगतिशील किसान" : "Progressive Farmer",
      text:
        currentLanguage === "hi"
          ? "फसल की समस्या की तुरंत पहचान हो जाती है। मेरी आय 40% बढ़ गई है।"
          : "Instant crop problem identification. My income increased by 40%.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
    {
      name: currentLanguage === "hi" ? "सुनीता देवी" : "Sunita Devi",
      role: currentLanguage === "hi" ? "ASHA कार्यकर्ता" : "ASHA Worker",
      text:
        currentLanguage === "hi"
          ? "गांव में स्वास्थ्य सेवा पहुंचाने में अमूल्य सहायता मिली है।"
          : "Invaluable help in delivering healthcare to villages.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
    {
      name: currentLanguage === "hi" ? "अजय सिंह" : "Ajay Singh",
      role: currentLanguage === "hi" ? "कृषि विशेषज्ञ" : "Agriculture Expert",
      text:
        currentLanguage === "hi"
          ? "किसानों को सही समय पर सही सलाह मिल रही है। बहुत प्रभावी।"
          : "Farmers get right advice at the right time. Very effective.",
      rating: 4,
      image: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <Navbar 
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        notifications={notifications}
      />

      {/* Welcome Message for Logged-in Users */}
      {isAuthenticated && user && (
        <div className="bg-gradient-to-r from-green-100 to-blue-100 border-b border-green-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center space-x-2 text-green-800">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">
                {currentLanguage === "hi" 
                  ? `स्वागत है, ${user.name}! आपके लिए आपातकालीन और मौसम विजेट उपलब्ध हैं।`
                  : `Welcome back, ${user.name}! Emergency and weather widgets are available for you.`
                }
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Market Ticker */}
      <MarketTicker language={currentLanguage} />

      {/* Enhanced Voice Interface */}
      {isVoiceActive && <VoiceInterface language={currentLanguage} isOnline={isOnline} />}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Hero Section */}
        <div className="text-center space-y-8 py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-3xl backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <Badge
                variant="secondary"
                className="px-8 py-4 text-lg font-medium bg-white/90 backdrop-blur-sm shadow-lg rounded-full border-2 border-green-200 hover:border-green-300 transition-colors"
              >
                <Sparkles className="w-5 h-5 mr-2 text-green-500" />🌿{" "}
                {currentLanguage === "hi" ? "ग्रामीण भारत को सशक्त बनाना" : "Empowering Rural India"}
              </Badge>
            </div>

            <h2 className="text-6xl md:text-8xl font-bold text-gray-900 leading-tight mb-8">
              {currentLanguage === "hi" ? "स्मार्ट स्वास्थ्य और" : "Smart Health &"}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 block animate-gradient">
                {currentLanguage === "hi" ? "कृषि सहायता" : "Agri Assistance"}
              </span>
            </h2>

            <p className="text-2xl text-gray-600 max-w-5xl mx-auto mb-12 leading-relaxed">
              {currentLanguage === "hi"
                ? "अत्याधुनिक AI तकनीक के साथ ग्रामीण क्षेत्रों में स्वास्थ्य और कृषि सेवाओं को बेहतर बनाना। आवाज़, छवि और पाठ - सभी माध्यमों से सहायता।"
                : "Revolutionizing rural health and agriculture with cutting-edge AI technology. Support through voice, image, and text - all in your local language."}
            </p>

            <StatsOverview language={currentLanguage} />

            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg"
              >
                <Heart className="w-6 h-6 mr-3" />
                {currentLanguage === "hi" ? "स्वास्थ्य सेवा शुरू करें" : "Start Healthcare"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-green-500 text-green-600 hover:bg-green-50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg"
              >
                <Wheat className="w-6 h-6 mr-3" />
                {currentLanguage === "hi" ? "कृषि सलाह लें" : "Get Agri Advice"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setIsVoiceActive(true)}
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg"
              >
                <PlayCircle className="w-6 h-6 mr-3" />
                {currentLanguage === "hi" ? "डेमो देखें" : "Watch Demo"}
              </Button>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-2 border-gray-100"
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{achievement.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {currentLanguage === "hi" ? "त्वरित कार्य" : "Quick Actions"}
            </h3>
            <p className="text-gray-600">
              {currentLanguage === "hi" ? "सबसे उपयोगी सुविधाओं तक तुरंत पहुंच" : "Instant access to most useful features"}
            </p>
          </div>
          <QuickActions language={currentLanguage} />
        </div>

        {/* Enhanced Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`border-2 ${feature.color} hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group overflow-hidden`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                      <div className="flex items-center space-x-2 text-sm">
                        <Badge variant="secondary" className="bg-white/80">
                          {feature.stats}
                        </Badge>
                        <Badge variant="outline" className="text-green-600 border-green-500">
                          {feature.growth}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>  
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed mb-4">{feature.description}</CardDescription>
                <div className="grid grid-cols-2 gap-2">
                  {feature.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20"></div>
          <div className="relative z-10">
            {isAuthenticated ? (
              <>
                <h3 className="text-4xl font-bold mb-4">
                  {currentLanguage === "hi" ? "आपका स्वागत है!" : "Welcome Back!"}
                </h3>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  {currentLanguage === "hi" 
                    ? "आपके लिए आपातकालीन और मौसम विजेट उपलब्ध हैं। नेविगेशन बार में इन सुविधाओं का लाभ उठाएं।"
                    : "Emergency and weather widgets are available for you. Access these features in the navigation bar."
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/healthcare">
                    <Button
                      size="lg"
                      className="bg-white text-green-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-medium"
                    >
                      {currentLanguage === "hi" ? "स्वास्थ्य सेवा" : "Healthcare Services"}
                    </Button>
                  </Link>
                  <Link href="/agriculture">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-green-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-medium"
                    >
                      {currentLanguage === "hi" ? "कृषि सलाह" : "Agriculture Advice"}
                    </Button>
                  </Link>
                </div>
                <div className="mt-6 flex items-center justify-center space-x-6 text-sm opacity-80">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {currentLanguage === "hi" ? "आपातकालीन बटन" : "Emergency Button"}
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {currentLanguage === "hi" ? "मौसम विजेट" : "Weather Widget"}
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {currentLanguage === "hi" ? "24/7 सहायता" : "24/7 Support"}
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-4xl font-bold mb-4">
                  {currentLanguage === "hi" ? "आज ही शुरू करें" : "Get Started Today"}
                </h3>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  {currentLanguage === "hi" 
                    ? "मुफ्त खाता बनाएं और ग्रामीण भारत के डिजिटल भविष्य का हिस्सा बनें। AI-संचालित स्वास्थ्य और कृषि सेवाओं का लाभ उठाएं।"
                    : "Create a free account and be part of rural India's digital future. Access AI-powered health and agriculture services."
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="bg-white text-green-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-medium"
                    >
                      {currentLanguage === "hi" ? "मुफ्त खाता बनाएं" : "Create Free Account"}
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-green-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-medium"
                    >
                      {currentLanguage === "hi" ? "लॉगिन करें" : "Sign In"}
                    </Button>
                  </Link>
                </div>
                <div className="mt-6 flex items-center justify-center space-x-6 text-sm opacity-80">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {currentLanguage === "hi" ? "100% मुफ्त" : "100% Free"}
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {currentLanguage === "hi" ? "कोई क्रेडिट कार्ड नहीं" : "No Credit Card"}
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {currentLanguage === "hi" ? "तुरंत एक्सेस" : "Instant Access"}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Enhanced Testimonials */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              {currentLanguage === "hi" ? "उपयोगकर्ता समीक्षा" : "User Testimonials"}
            </h3>
            <p className="text-xl text-gray-600">
              {currentLanguage === "hi" ? "हमारे उपयोगकर्ता क्या कहते हैं" : "What our users are saying"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-2 border-gray-100"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                        {testimonial.verified && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{testimonial.text}</p>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 mt-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Gramswasthya AI</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {currentLanguage === "hi"
                  ? "ग्रामीण भारत को सशक्त बनाने के लिए अत्याधुनिक AI तकनीक। स्वास्थ्य और कृषि सेवाओं को सभी के लिए सुलभ बनाना।"
                  : "Empowering rural India with cutting-edge AI technology. Making health and agriculture services accessible to all."}
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Smartphone className="w-4 h-4 mr-2" />
                  {currentLanguage === "hi" ? "ऐप डाउनलोड" : "Download App"}
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Activity className="w-4 h-4 mr-2" />
                  {currentLanguage === "hi" ? "लाइव डेमो" : "Live Demo"}
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-xl text-green-400">{currentLanguage === "hi" ? "सुविधाएं" : "Features"}</h4>
              <ul className="space-y-4 text-gray-300">
                <li className="hover:text-white transition-colors cursor-pointer flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                  {currentLanguage === "hi" ? "AI स्वास्थ्य सलाहकार" : "AI Health Advisor"}
                </li>
                <li className="hover:text-white transition-colors cursor-pointer flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                  {currentLanguage === "hi" ? "स्मार्ट कृषि गाइड" : "Smart Agriculture Guide"}
                </li>
                <li className="hover:text-white transition-colors cursor-pointer flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                  {currentLanguage === "hi" ? "आवाज़ पहचान" : "Voice Recognition"}
                </li>
                <li className="hover:text-white transition-colors cursor-pointer flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                  {currentLanguage === "hi" ? "ऑफलाइन सपोर्ट" : "Offline Support"}
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-xl text-blue-400">{currentLanguage === "hi" ? "सेवाएं" : "Services"}</h4>
              <ul className="space-y-4 text-gray-300">
                <li className="hover:text-white transition-colors cursor-pointer">
                  {currentLanguage === "hi" ? "टेलीमेडिसिन" : "Telemedicine"}
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  {currentLanguage === "hi" ? "फसल निदान" : "Crop Diagnosis"}
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  {currentLanguage === "hi" ? "मार्केट प्राइस" : "Market Prices"}
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  {currentLanguage === "hi" ? "आपातकालीन सेवा" : "Emergency Services"}
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-xl text-purple-400">
                {currentLanguage === "hi" ? "सहायता" : "Support"}
              </h4>
              <ul className="space-y-4 text-gray-300">
                <li className="hover:text-white transition-colors cursor-pointer">
                  {currentLanguage === "hi" ? "हेल्प सेंटर" : "Help Center"}
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  {currentLanguage === "hi" ? "ट्रेनिंग वीडियो" : "Training Videos"}
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  {currentLanguage === "hi" ? "कम्युनिटी फोरम" : "Community Forum"}
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  {currentLanguage === "hi" ? "फीडबैक" : "Feedback"}
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Gramswasthya AI. {currentLanguage === "hi" ? "सर्वाधिकार सुरक्षित" : "All rights reserved"}. 
              {currentLanguage === "hi" ? "राज कंजरिया और श्याम वडगामा द्वारा निर्मित" : "Created by Raj Kanzariya & Shyam Vadgama"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
