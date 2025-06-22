"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Wheat,
  Cloud,
  TrendingUp,
  Camera,
  BarChart3,
  CreditCard,
  Mic,
  Upload,
  Droplets,
  Sun,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  MapPin,
  Wind,
  Eye,
  Leaf,
  Bug,
  Sprout,
  Calendar,
  Loader2,
  Zap,
  Activity,
  Shield,
  TrendingDown,
} from "lucide-react"

interface AgricultureModuleProps {
  language: string
  isOnline: boolean
}

interface CropAnalysis {
  issue: string
  severity: "low" | "medium" | "high"
  treatment: string[]
  prevention: string[]
  confidence: number
  urgency: boolean
}

export default function AgricultureModule({ language, isOnline }: AgricultureModuleProps) {
  const [cropQuery, setCropQuery] = useState("")
  const [cropAnalysis, setCropAnalysis] = useState<CropAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [selectedCrop, setSelectedCrop] = useState("")
  const [farmSize, setFarmSize] = useState("")

  const crops = {
    en: ["Wheat", "Rice", "Cotton", "Sugarcane", "Maize", "Soybean", "Onion", "Potato", "Tomato", "Chili"],
    hi: ["गेहूं", "चावल", "कपास", "गन्ना", "मक्का", "सोयाबीन", "प्याज", "आलू", "टमाटर", "मिर्च"],
  }

  const marketPrices = [
    {
      crop: language === "hi" ? "गेहूं" : "Wheat",
      price: "₹2,150",
      change: "+5%",
      trend: "up",
      volume: "2,450 quintals",
      quality: "Grade A",
    },
    {
      crop: language === "hi" ? "चावल" : "Rice",
      price: "₹3,200",
      change: "-2%",
      trend: "down",
      volume: "1,890 quintals",
      quality: "Grade A",
    },
    {
      crop: language === "hi" ? "प्याज" : "Onion",
      price: "₹28",
      change: "+12%",
      trend: "up",
      volume: "5,670 quintals",
      quality: "Medium",
    },
    {
      crop: language === "hi" ? "आलू" : "Potato",
      price: "₹22",
      change: "+3%",
      trend: "up",
      volume: "3,240 quintals",
      quality: "Grade A",
    },
    {
      crop: language === "hi" ? "टमाटर" : "Tomato",
      price: "₹35",
      change: "-8%",
      trend: "down",
      volume: "1,560 quintals",
      quality: "Grade B",
    },
    {
      crop: language === "hi" ? "कपास" : "Cotton",
      price: "₹6,800",
      change: "+7%",
      trend: "up",
      volume: "890 quintals",
      quality: "Premium",
    },
  ]

  const weatherData = {
    temperature: "28°C",
    humidity: "65%",
    rainfall: language === "hi" ? "12mm अपेक्षित" : "12mm expected",
    windSpeed: "8 km/h",
    uvIndex: "High",
    soilMoisture: "45%",
    forecast:
      language === "hi" ? "अगले 3 दिन बारिश की संभावना। सिंचाई रोक दें।" : "Rain expected for next 3 days. Stop irrigation.",
    alerts: [
      {
        type: "warning",
        message: language === "hi" ? "तेज हवा की चेतावनी" : "Strong wind warning",
      },
    ],
  }

  const govSchemes = [
    {
      name: language === "hi" ? "PM-किसान योजना" : "PM-Kisan Scheme",
      amount: "₹6,000/year",
      eligibility: language === "hi" ? "सभी किसान" : "All farmers",
      status: "Active",
      description:
        language === "hi" ? "सभी भूमिधारक किसानों को वित्तीय सहायता" : "Financial assistance to all landholding farmers",
      applicationLink: "#",
    },
    {
      name: language === "hi" ? "फसल बीमा योजना" : "Crop Insurance Scheme",
      amount: language === "hi" ? "फसल का 100%" : "100% crop value",
      eligibility: language === "hi" ? "बीमित किसान" : "Insured farmers",
      status: "Available",
      description: language === "hi" ? "प्राकृतिक आपदाओं से फसल सुरक्षा" : "Crop protection from natural disasters",
      applicationLink: "#",
    },
    {
      name: language === "hi" ? "किसान क्रेडिट कार्ड" : "Kisan Credit Card",
      amount: language === "hi" ? "₹3 लाख तक" : "Up to ₹3 lakh",
      eligibility: language === "hi" ? "भूमि मालिक" : "Land owners",
      status: "Apply Now",
      description: language === "hi" ? "कम ब्याज दर पर कृषि ऋण" : "Agricultural loans at low interest rates",
      applicationLink: "#",
    },
    {
      name: language === "hi" ? "सोलर पंप योजना" : "Solar Pump Scheme",
      amount: language === "hi" ? "90% सब्सिडी" : "90% subsidy",
      eligibility: language === "hi" ? "सभी किसान" : "All farmers",
      status: "Available",
      description: language === "hi" ? "सौर ऊर्जा से चलने वाले पंप" : "Solar powered irrigation pumps",
      applicationLink: "#",
    },
  ]

  const pestDiseases = [
    {
      name: language === "hi" ? "पत्ती का धब्बा रोग" : "Leaf Spot Disease",
      crop: language === "hi" ? "गेहूं" : "Wheat",
      treatment: language === "hi" ? "कॉपर सल्फेट का छिड़काव" : "Copper sulfate spray",
      severity: "Medium",
      symptoms:
        language === "hi"
          ? ["पत्तियों पर भूरे धब्बे", "पत्तियों का पीला होना"]
          : ["Brown spots on leaves", "Yellowing of leaves"],
      prevention: language === "hi" ? ["बीज उपचार", "उचित दूरी बनाए रखें"] : ["Seed treatment", "Maintain proper spacing"],
    },
    {
      name: language === "hi" ? "तना छेदक कीट" : "Stem Borer",
      crop: language === "hi" ? "चावल" : "Rice",
      treatment: language === "hi" ? "ट्राइकोग्रामा कार्ड का उपयोग" : "Use Trichogramma cards",
      severity: "High",
      symptoms: language === "hi" ? ["तने में छेद", "पौधे का मुरझाना"] : ["Holes in stem", "Plant wilting"],
      prevention: language === "hi" ? ["जैविक नियंत्रण", "फेरोमोन ट्रैप"] : ["Biological control", "Pheromone traps"],
    },
    {
      name: language === "hi" ? "सफेद मक्खी" : "Whitefly",
      crop: language === "hi" ? "कपास" : "Cotton",
      treatment: language === "hi" ? "नीम तेल का छिड़काव" : "Neem oil spray",
      severity: "Medium",
      symptoms:
        language === "hi" ? ["पत्तियों पर सफेद कीट", "पत्तियों का मुड़ना"] : ["White insects on leaves", "Leaf curling"],
      prevention:
        language === "hi"
          ? ["पीली चिपचिपी ट्रैप", "प्राकृतिक शत्रु संरक्षण"]
          : ["Yellow sticky traps", "Natural enemy conservation"],
    },
  ]

  const soilHealthData = {
    ph: 6.8,
    nitrogen: "Medium",
    phosphorus: "Low",
    potassium: "High",
    organicMatter: "3.2%",
    recommendations:
      language === "hi"
        ? ["फास्फोरस की कमी है", "जैविक खाद डालें", "मिट्टी की जांच 6 महीने में कराएं"]
        : ["Phosphorus deficiency detected", "Add organic manure", "Test soil every 6 months"],
  }

  const handleCropAnalysis = async () => {
    if (!cropQuery.trim() && !selectedCrop) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate AI analysis with progress
    const progressSteps = [
      { step: 20, message: language === "hi" ? "फसल डेटा विश्लेषण..." : "Analyzing crop data..." },
      { step: 40, message: language === "hi" ? "कृषि डेटाबेस खोज..." : "Searching agriculture database..." },
      { step: 60, message: language === "hi" ? "AI मॉडल प्रोसेसिंग..." : "AI model processing..." },
      { step: 80, message: language === "hi" ? "समाधान तैयार कर रहे हैं..." : "Preparing solutions..." },
      { step: 100, message: language === "hi" ? "विश्लेषण पूर्ण" : "Analysis complete" },
    ]

    for (const { step } of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setAnalysisProgress(step)
    }

    // Generate comprehensive analysis
    const analysisResult = generateCropAnalysis(cropQuery, selectedCrop)
    setCropAnalysis(analysisResult)
    setIsAnalyzing(false)
  }

  const generateCropAnalysis = (query: string, crop: string): CropAnalysis => {
    const queryLower = query.toLowerCase()

    if (queryLower.includes("yellow") || queryLower.includes("पीले") || queryLower.includes("पीला")) {
      return {
        issue: language === "hi" ? "नाइट्रोजन की कमी" : "Nitrogen Deficiency",
        severity: "medium",
        treatment:
          language === "hi"
            ? ["यूरिया 50 किलो प्रति एकड़ डालें", "नीम कोटेड यूरिया का उपयोग करें", "2-3 बार में बांटकर डालें", "सिंचाई के बाद डालें"]
            : ["Apply 50kg urea per acre", "Use neem coated urea", "Apply in 2-3 splits", "Apply after irrigation"],
        prevention:
          language === "hi"
            ? ["मिट्टी की नियमित जांच", "जैविक खाद का उपयोग", "हरी खाद की फसल लगाएं", "संतुलित उर्वरक प्रयोग"]
            : [
                "Regular soil testing",
                "Use organic manure",
                "Grow green manure crops",
                "Balanced fertilizer application",
              ],
        confidence: 88,
        urgency: false,
      }
    }

    if (queryLower.includes("pest") || queryLower.includes("insect") || queryLower.includes("कीट")) {
      return {
        issue: language === "hi" ? "कीट प्रकोप" : "Pest Infestation",
        severity: "high",
        treatment:
          language === "hi"
            ? ["तुरंत कीटनाशक का छिड़काव करें", "नीम तेल का प्राकृतिक उपचार", "फेरोमोन ट्रैप लगाएं", "जैविक नियंत्रण अपनाएं"]
            : [
                "Apply pesticide immediately",
                "Use neem oil natural treatment",
                "Install pheromone traps",
                "Adopt biological control",
              ],
        prevention:
          language === "hi"
            ? ["नियमित फसल निरीक्षण", "साफ-सफाई बनाए रखें", "प्राकृतिक शत्रुओं को संरक्षित करें", "फसल चक्र अपनाएं"]
            : [
                "Regular crop monitoring",
                "Maintain field hygiene",
                "Conserve natural enemies",
                "Practice crop rotation",
              ],
        confidence: 92,
        urgency: true,
      }
    }

    return {
      issue: language === "hi" ? "सामान्य फसल देखभाल" : "General Crop Care",
      severity: "low",
      treatment:
        language === "hi"
          ? ["नियमित सिंचाई करें", "संतुलित उर्वरक डालें", "खरपतवार नियंत्रण करें", "मिट्टी की नमी बनाए रखें"]
          : ["Regular irrigation", "Apply balanced fertilizers", "Control weeds", "Maintain soil moisture"],
      prevention:
        language === "hi"
          ? ["उन्नत बीजों का उपयोग", "उचित बुआई समय", "मिट्टी की तैयारी", "कृषि विशेषज्ञ से सलाह"]
          : ["Use improved seeds", "Proper sowing time", "Soil preparation", "Consult agriculture expert"],
      confidence: 75,
      urgency: false,
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-500 bg-red-50"
      case "medium":
        return "border-yellow-500 bg-yellow-50"
      case "low":
        return "border-green-500 bg-green-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <Wheat className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900">
          {language === "hi" ? "कृषि सहायता मॉड्यूल" : "Agriculture Module"}
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {language === "hi"
            ? "उन्नत AI तकनीक के साथ स्मार्ट खेती। बेहतर उत्पादन और आय के लिए वैज्ञानिक सलाह।"
            : "Smart farming with advanced AI technology. Scientific advice for better yield and income."}
        </p>
        <div className="flex justify-center space-x-4">
          <Badge
            variant="secondary"
            className={`${isOnline ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
          >
            <Activity className="w-3 h-3 mr-1" />
            {isOnline ? (language === "hi" ? "ऑनलाइन" : "Online") : language === "hi" ? "ऑफलाइन" : "Offline"}
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            <Zap className="w-3 h-3 mr-1" />
            {language === "hi" ? "AI संचालित" : "AI Powered"}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="crop-advisor" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 bg-white shadow-lg rounded-xl">
          <TabsTrigger value="crop-advisor" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            {language === "hi" ? "फसल सलाह" : "Crop Advisor"}
          </TabsTrigger>
          <TabsTrigger value="weather" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            {language === "hi" ? "मौसम" : "Weather"}
          </TabsTrigger>
          <TabsTrigger value="market" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            {language === "hi" ? "बाजार भाव" : "Market Prices"}
          </TabsTrigger>
          <TabsTrigger value="pest-detection" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
            {language === "hi" ? "कीट पहचान" : "Pest Detection"}
          </TabsTrigger>
          <TabsTrigger value="soil-health" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            {language === "hi" ? "मिट्टी स्वास्थ्य" : "Soil Health"}
          </TabsTrigger>
          <TabsTrigger value="schemes" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
            {language === "hi" ? "सरकारी योजना" : "Govt Schemes"}
          </TabsTrigger>
          <TabsTrigger value="education" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
            {language === "hi" ? "शिक्षा" : "Education"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="crop-advisor" className="space-y-6 animate-slide-up">
          <Card className="shadow-xl border-2 border-green-100">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <Sprout className="w-7 h-7 text-green-600" />
                <span>{language === "hi" ? "स्मार्ट फसल सलाहकार" : "Smart Crop Advisor"}</span>
              </CardTitle>
              <CardDescription className="text-lg">
                {language === "hi"
                  ? "फसल संबंधी समस्याओं का तुरंत समाधान। AI की मदद से वैज्ञानिक सलाह पाएं।"
                  : "Instant solutions for crop problems. Get scientific advice with AI assistance."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Farm Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === "hi" ? "फसल चुनें" : "Select Crop"}
                  </label>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">{language === "hi" ? "फसल चुनें" : "Choose crop"}</option>
                    {(crops[language as keyof typeof crops] || crops.en).map((crop, index) => (
                      <option key={index} value={crop}>
                        {crop}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === "hi" ? "खेत का आकार (एकड़)" : "Farm Size (Acres)"}
                  </label>
                  <input
                    type="number"
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder={language === "hi" ? "एकड़ में" : "In acres"}
                  />
                </div>
              </div>

              {/* Input Methods */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="hover:bg-green-50">
                    <Mic className="w-4 h-4 mr-2" />
                    {language === "hi" ? "आवाज़ में पूछें" : "Voice Query"}
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-blue-50">
                    <Camera className="w-4 h-4 mr-2" />
                    {language === "hi" ? "फसल की फोटो" : "Crop Photo"}
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-purple-50">
                    <Upload className="w-4 h-4 mr-2" />
                    {language === "hi" ? "रिपोर्ट अपलोड" : "Upload Report"}
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-orange-50">
                    <Eye className="w-4 h-4 mr-2" />
                    {language === "hi" ? "लाइव निरीक्षण" : "Live Inspection"}
                  </Button>
                </div>

                <Textarea
                  placeholder={
                    language === "hi"
                      ? "अपनी समस्या का विस्तार से वर्णन करें... जैसे: मेरी गेहूं की फसल के पत्ते पीले हो रहे हैं, क्या करूं?"
                      : "Describe your problem in detail... e.g., My wheat crop leaves are turning yellow, what should I do?"
                  }
                  value={cropQuery}
                  onChange={(e) => setCropQuery(e.target.value)}
                  className="min-h-[120px] text-base"
                />
              </div>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="space-y-3 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin text-green-600" />
                    <span className="font-medium text-green-800">
                      {language === "hi" ? "कृषि विशेषज्ञ AI विश्लेषण..." : "Agriculture Expert AI Analysis..."}
                    </span>
                  </div>
                  <Progress value={analysisProgress} className="h-3" />
                  <p className="text-sm text-green-600">
                    {analysisProgress}% {language === "hi" ? "पूर्ण" : "Complete"}
                  </p>
                </div>
              )}

              <Button
                onClick={handleCropAnalysis}
                disabled={(!cropQuery.trim() && !selectedCrop) || isAnalyzing}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {language === "hi" ? "विश्लेषण हो रहा है..." : "Analyzing..."}
                  </>
                ) : (
                  <>
                    <Wheat className="w-5 h-5 mr-2" />
                    {language === "hi" ? "कृषि सलाह प्राप्त करें" : "Get Agriculture Advice"}
                  </>
                )}
              </Button>

              {/* Analysis Results */}
              {cropAnalysis && (
                <Card className={`border-2 ${getSeverityColor(cropAnalysis.severity)} animate-scale-in`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          cropAnalysis.severity === "high"
                            ? "bg-red-500"
                            : cropAnalysis.severity === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      >
                        {cropAnalysis.urgency ? (
                          <AlertTriangle className="w-6 h-6 text-white" />
                        ) : (
                          <CheckCircle className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-xl text-gray-900">{cropAnalysis.issue}</h4>
                          <Badge variant="secondary" className="bg-white/80">
                            {cropAnalysis.confidence}% {language === "hi" ? "सटीक" : "Confident"}
                          </Badge>
                        </div>

                        {cropAnalysis.urgency && (
                          <Alert className="mb-4 border-red-500 bg-red-50">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-800 font-medium">
                              {language === "hi" ? "तत्काल कार्रवाई की आवश्यकता!" : "Immediate action required!"}
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <h5 className="font-semibold text-lg flex items-center">
                              <Leaf className="w-5 h-5 mr-2 text-green-500" />
                              {language === "hi" ? "उपचार:" : "Treatment:"}
                            </h5>
                            <ul className="space-y-2">
                              {cropAnalysis.treatment.map((treatment, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700">{treatment}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-3">
                            <h5 className="font-semibold text-lg flex items-center">
                              <Shield className="w-5 h-5 mr-2 text-blue-500" />
                              {language === "hi" ? "रोकथाम:" : "Prevention:"}
                            </h5>
                            <ul className="space-y-2">
                              {cropAnalysis.prevention.map((prevention, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700">{prevention}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-6">
                          <Button className="bg-green-500 hover:bg-green-600 text-white">
                            <MapPin className="w-4 h-4 mr-2" />
                            {language === "hi" ? "नजदीकी कृषि केंद्र" : "Nearby Agri Center"}
                          </Button>
                          <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            {language === "hi" ? "बाजार भाव देखें" : "Check Market Price"}
                          </Button>
                          <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50">
                            <BookOpen className="w-4 h-4 mr-2" />
                            {language === "hi" ? "विस्तृत गाइड" : "Detailed Guide"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weather" className="space-y-6 animate-slide-up">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Cloud className="w-7 h-7 text-blue-600" />
                <span>{language === "hi" ? "मौसम और सिंचाई सुझाव" : "Weather & Irrigation Tips"}</span>
              </CardTitle>
              <CardDescription className="text-lg">
                {language === "hi"
                  ? "वास्तविक समय मौसम रिपोर्ट और स्मार्ट सिंचाई सलाह।"
                  : "Real-time weather reports and smart irrigation guidance."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="text-center p-4 hover:shadow-md transition-shadow">
                  <Sun className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-1">Temperature</p>
                  <p className="text-2xl font-bold">{weatherData.temperature}</p>
                </Card>
                <Card className="text-center p-4 hover:shadow-md transition-shadow">
                  <Droplets className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-1">Humidity</p>
                  <p className="text-2xl font-bold">{weatherData.humidity}</p>
                </Card>
                <Card className="text-center p-4 hover:shadow-md transition-shadow">
                  <Cloud className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-1">Rainfall</p>
                  <p className="text-xl font-bold">{weatherData.rainfall}</p>
                </Card>
                <Card className="text-center p-4 hover:shadow-md transition-shadow">
                  <Wind className="w-10 h-10 text-green-500 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-1">Wind Speed</p>
                  <p className="text-2xl font-bold">{weatherData.windSpeed}</p>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <Droplets className="w-5 h-5 mr-2" />
                      {language === "hi" ? "सिंचाई सुझाव:" : "Irrigation Advice:"}
                    </h4>
                    <p className="text-blue-700 mb-3">{weatherData.forecast}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">{language === "hi" ? "मिट्टी की नमी:" : "Soil Moisture:"}</span>
                        <span className="font-medium">{weatherData.soilMoisture}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">{language === "hi" ? "UV इंडेक्स:" : "UV Index:"}</span>
                        <span className="font-medium">{weatherData.uvIndex}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      {language === "hi" ? "मौसम चेतावनी:" : "Weather Alerts:"}
                    </h4>
                    {weatherData.alerts.map((alert, index) => (
                      <div key={index} className="bg-orange-100 p-3 rounded-lg">
                        <p className="text-orange-800 font-medium">{alert.message}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="flex space-x-3">
                <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  {language === "hi" ? "7 दिन का पूर्वानुमान" : "7-Day Forecast"}
                </Button>
                <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                  <Droplets className="w-4 h-4 mr-2" />
                  {language === "hi" ? "सिंचाई कैलेंडर" : "Irrigation Calendar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-6 animate-slide-up">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <TrendingUp className="w-7 h-7 text-purple-600" />
                <span>{language === "hi" ? "दैनिक मंडी भाव" : "Daily Market Prices"}</span>
              </CardTitle>
              <CardDescription className="text-lg">
                {language === "hi"
                  ? "नजदीकी मंडी से ताजा फसल के भाव। SMS या WhatsApp पर भी पा सकते हैं।"
                  : "Fresh crop prices from nearest mandi. Available via SMS or WhatsApp."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketPrices.map((item, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-purple-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-lg">{item.crop}</h4>
                        <Badge
                          variant={item.trend === "up" ? "default" : "secondary"}
                          className={`${item.trend === "up" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                        >
                          {item.trend === "up" ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {item.change}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language === "hi" ? "मूल्य:" : "Price:"}</span>
                          <span className="text-2xl font-bold text-gray-900">{item.price}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{language === "hi" ? "मात्रा:" : "Volume:"}</span>
                          <span>{item.volume}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{language === "hi" ? "गुणवत्ता:" : "Quality:"}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.quality}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50">
                  <span className="mr-2">📱</span>
                  {language === "hi" ? "SMS अलर्ट" : "SMS Alerts"}
                </Button>
                <Button variant="outline" className="flex-1 border-green-500 text-green-600 hover:bg-green-50">
                  <span className="mr-2">💬</span>
                  {language === "hi" ? "WhatsApp अपडेट" : "WhatsApp Updates"}
                </Button>
                <Button variant="outline" className="flex-1 border-purple-500 text-purple-600 hover:bg-purple-50">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  {language === "hi" ? "मूल्य ट्रेंड" : "Price Trends"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pest-detection" className="space-y-6 animate-slide-up">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Bug className="w-7 h-7 text-red-600" />
                <span>{language === "hi" ? "कीट और रोग पहचान" : "Pest & Disease Detection"}</span>
              </CardTitle>
              <CardDescription className="text-lg">
                {language === "hi"
                  ? "फसल या कीट की फोटो खींचें, AI तुरंत पहचान कर इलाज बताएगा।"
                  : "Take photo of crop or pest, AI will identify and suggest treatment instantly."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4 text-lg">
                  {language === "hi" ? "फसल की पत्ती या कीट की फोटो अपलोड करें" : "Upload photo of crop leaf or pest"}
                </p>
                <div className="flex justify-center space-x-3">
                  <Button className="bg-red-500 hover:bg-red-600 text-white">
                    <Upload className="w-4 h-4 mr-2" />
                    {language === "hi" ? "फोटो अपलोड करें" : "Upload Photo"}
                  </Button>
                  <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                    <Camera className="w-4 h-4 mr-2" />
                    {language === "hi" ? "कैमरा खोलें" : "Open Camera"}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-xl">
                  {language === "hi" ? "आम कीट और रोग:" : "Common Pests & Diseases:"}
                </h4>
                {pestDiseases.map((pest, index) => (
                  <Card key={index} className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Bug className="w-6 h-6 text-red-500" />
                            <h5 className="font-bold text-lg">{pest.name}</h5>
                            <Badge variant={pest.severity === "High" ? "destructive" : "secondary"}>
                              {pest.severity}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">
                            <strong>{language === "hi" ? "फसल:" : "Crop:"}</strong> {pest.crop}
                          </p>
                          <p className="text-green-600 mb-3">
                            <strong>{language === "hi" ? "उपचार:" : "Treatment:"}</strong> {pest.treatment}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h6 className="font-semibold text-sm mb-2">
                                {language === "hi" ? "लक्षण:" : "Symptoms:"}
                              </h6>
                              <ul className="text-sm space-y-1">
                                {pest.symptoms.map((symptom, idx) => (
                                  <li key={idx} className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                    <span>{symptom}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h6 className="font-semibold text-sm mb-2">
                                {language === "hi" ? "रोकथाम:" : "Prevention:"}
                              </h6>
                              <ul className="text-sm space-y-1">
                                {pest.prevention.map((prev, idx) => (
                                  <li key={idx} className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span>{prev}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="soil-health" className="space-y-6 animate-slide-up">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <BarChart3 className="w-7 h-7 text-orange-600" />
                <span>{language === "hi" ? "मिट्टी स्वास्थ्य सहायता" : "Soil Health Support"}</span>
              </CardTitle>
              <CardDescription className="text-lg">
                {language === "hi"
                  ? "मिट्टी जांच केंद्र की जानकारी और रिपोर्ट के आधार पर सुझाव।"
                  : "Soil test center information and recommendations based on reports."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="w-6 h-6 text-yellow-600" />
                    <div>
                      <h4 className="font-bold text-yellow-800">
                        {language === "hi" ? "नजदीकी मिट्टी जांच केंद्र" : "Nearest Soil Test Center"}
                      </h4>
                      <p className="text-yellow-700">Krishi Vigyan Kendra - 3.2 km away</p>
                      <p className="text-sm text-yellow-600">Cost: ₹50 per sample • Results in 7 days</p>
                    </div>
                  </div>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    {language === "hi" ? "दिशा प्राप्त करें" : "Get Directions"}
                  </Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-orange-200">
                  <CardHeader className="bg-orange-50">
                    <CardTitle className="text-lg flex items-center">
                      <Upload className="w-5 h-5 mr-2 text-orange-600" />
                      {language === "hi" ? "मिट्टी रिपोर्ट अपलोड" : "Upload Soil Report"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="border-2 border-dashed border-orange-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-3">
                        {language === "hi" ? "PDF या इमेज फॉर्मेट में अपलोड करें" : "Upload in PDF or image format"}
                      </p>
                      <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                        {language === "hi" ? "फाइल चुनें" : "Choose File"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="text-lg flex items-center">
                      <Sprout className="w-5 h-5 mr-2 text-green-600" />
                      {language === "hi" ? "वर्तमान मिट्टी स्थिति" : "Current Soil Status"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">pH Level:</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {soilHealthData.ph} (Good)
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Nitrogen:</span>
                        <Badge variant="outline">{soilHealthData.nitrogen}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Phosphorus:</span>
                        <Badge variant="destructive">{soilHealthData.phosphorus}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Potassium:</span>
                        <Badge variant="default" className="bg-green-500">
                          {soilHealthData.potassium}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Organic Matter:</span>
                        <span className="font-medium">{soilHealthData.organicMatter}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-bold text-blue-800 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {language === "hi" ? "AI सुझाव:" : "AI Recommendations:"}
                  </h4>
                  <ul className="space-y-2">
                    {soilHealthData.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-blue-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schemes" className="space-y-6 animate-slide-up">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <CreditCard className="w-7 h-7 text-indigo-600" />
                <span>{language === "hi" ? "सरकारी योजना सहायक" : "Government Scheme Assistant"}</span>
              </CardTitle>
              <CardDescription className="text-lg">
                {language === "hi"
                  ? "PM-किसान, फसल बीमा, KCC और अन्य योजनाओं की विस्तृत जानकारी।"
                  : "Detailed information about PM-Kisan, crop insurance, KCC and other schemes."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {govSchemes.map((scheme, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-indigo-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xl">{scheme.name}</h4>
                            <p className="text-green-600 font-semibold text-lg">{scheme.amount}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3 leading-relaxed">{scheme.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                          <span>
                            <strong>{language === "hi" ? "पात्रता:" : "Eligibility:"}</strong> {scheme.eligibility}
                          </span>
                          <Badge
                            variant={scheme.status === "Active" ? "default" : "secondary"}
                            className={scheme.status === "Active" ? "bg-green-500" : ""}
                          >
                            {scheme.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
                          {language === "hi" ? "आवेदन करें" : "Apply Now"}
                        </Button>
                        <Button variant="outline" size="sm" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                          {language === "hi" ? "विवरण देखें" : "View Details"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-6 animate-slide-up">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <BookOpen className="w-7 h-7 text-pink-600" />
                <span>{language === "hi" ? "किसान शिक्षा केंद्र" : "Farmer Education Center"}</span>
              </CardTitle>
              <CardDescription className="text-lg">
                {language === "hi"
                  ? "जैविक खेती, बीज उपचार और आधुनिक तकनीक के वीडियो। ऑफलाइन भी देख सकते हैं।"
                  : "Videos on organic farming, seed treatment and modern techniques. Available offline."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-gray-100 hover:border-pink-200">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-3 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-green-600" />
                    </div>
                    <h4 className="font-bold mb-2">
                      {language === "hi" ? "जैविक खेती की तकनीक" : "Organic Farming Techniques"}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {language === "hi" ? "रसायन मुक्त खेती के आधुनिक तरीके" : "Modern methods of chemical-free farming"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">15 minutes • Hindi</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Downloaded
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-gray-100 hover:border-pink-200">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-3 flex items-center justify-center">
                      <Sprout className="w-12 h-12 text-blue-600" />
                    </div>
                    <h4 className="font-bold mb-2">
                      {language === "hi" ? "बीज उपचार विधि" : "Seed Treatment Methods"}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {language === "hi" ? "बीज को रोग मुक्त करने की विधि" : "Methods to make seeds disease-free"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">12 minutes • Hindi</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-blue-500 text-blue-600 hover:bg-blue-50"
                      >
                        {language === "hi" ? "डाउनलोड करें" : "Download"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-gray-100 hover:border-pink-200">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-3 flex items-center justify-center">
                      <Droplets className="w-12 h-12 text-purple-600" />
                    </div>
                    <h4 className="font-bold mb-2">
                      {language === "hi" ? "ड्रिप सिंचाई प्रणाली" : "Drip Irrigation System"}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {language === "hi" ? "पानी की बचत करने वाली सिंचाई" : "Water-saving irrigation method"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">18 minutes • Hindi</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-purple-500 text-purple-600 hover:bg-purple-50"
                      >
                        {language === "hi" ? "डाउनलोड करें" : "Download"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-gray-100 hover:border-pink-200">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg mb-3 flex items-center justify-center">
                      <Bug className="w-12 h-12 text-orange-600" />
                    </div>
                    <h4 className="font-bold mb-2">
                      {language === "hi" ? "प्राकृतिक कीट नियंत्रण" : "Natural Pest Control"}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {language === "hi" ? "रसायन रहित कीट नियंत्रण" : "Chemical-free pest control"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">20 minutes • Hindi</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-orange-500 text-orange-600 hover:bg-orange-50"
                      >
                        {language === "hi" ? "डाउनलोड करें" : "Download"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-gray-100 hover:border-pink-200">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg mb-3 flex items-center justify-center">
                      <Sun className="w-12 h-12 text-yellow-600" />
                    </div>
                    <h4 className="font-bold mb-2">{language === "hi" ? "सोलर फार्मिंग" : "Solar Farming"}</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {language === "hi"
                        ? "सौर ऊर्जा का उपयोग कर खेती में लागत कम करें"
                        : "Lower farming costs using solar energy"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">22 minutes • Hindi</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                      >
                        {language === "hi" ? "डाउनलोड करें" : "Download"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
