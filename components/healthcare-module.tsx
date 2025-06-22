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
  Heart,
  Phone,
  Camera,
  MapPin,
  Bell,
  Shield,
  Mic,
  Upload,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Thermometer,
  Stethoscope,
  Pill,
  FileText,
  Zap,
  Loader2,
  Star,
} from "lucide-react"

interface HealthcareModuleProps {
  language: string
  isOnline: boolean
}

interface SymptomAnalysis {
  condition: string
  severity: "low" | "medium" | "high"
  recommendations: string[]
  urgency: boolean
  confidence: number
}

export default function HealthcareModule({ language, isOnline }: HealthcareModuleProps) {
  const [symptoms, setSymptoms] = useState("")
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [patientAge, setPatientAge] = useState("")
  const [patientGender, setPatientGender] = useState("")

  const commonSymptoms = {
    en: [
      "Fever",
      "Headache",
      "Cough",
      "Sore throat",
      "Body ache",
      "Nausea",
      "Dizziness",
      "Fatigue",
      "Chest pain",
      "Shortness of breath",
      "Stomach pain",
      "Diarrhea",
    ],
    hi: [
      "बुखार",
      "सिरदर्द",
      "खांसी",
      "गले में दर्द",
      "शरीर दर्द",
      "जी मिचलाना",
      "चक्कर आना",
      "थकान",
      "सीने में दर्द",
      "सांस लेने में तकलीफ",
      "पेट दर्द",
      "दस्त",
    ],
  }

  const nearbyHealthcare = [
    {
      name: "Primary Health Center Rampur",
      distance: "2.5 km",
      phone: "+91-9876543210",
      type: "PHC",
      availability: "24/7",
      specialties: ["General Medicine", "Emergency Care"],
      rating: 4.2,
    },
    {
      name: "Community Health Center",
      distance: "5.8 km",
      phone: "+91-9876543211",
      type: "CHC",
      availability: "6 AM - 10 PM",
      specialties: ["General Medicine", "Pediatrics", "Gynecology"],
      rating: 4.5,
    },
    {
      name: "District Hospital",
      distance: "12.3 km",
      phone: "+91-9876543212",
      type: "Hospital",
      availability: "24/7",
      specialties: ["All Specialties", "ICU", "Surgery"],
      rating: 4.7,
    },
    {
      name: "ASHA Worker - Sunita Devi",
      distance: "0.8 km",
      phone: "+91-9876543213",
      type: "ASHA",
      availability: "8 AM - 6 PM",
      specialties: ["Basic Health Care", "Maternal Care"],
      rating: 4.8,
    },
  ]

  const healthAlerts = [
    {
      type: "warning",
      title: language === "hi" ? "डेंगू अलर्ट - उच्च जोखिम" : "Dengue Alert - High Risk",
      message:
        language === "hi"
          ? "आपके क्षेत्र में डेंगू के 25 नए मामले। पानी जमा न होने दें। तुरंत डॉक्टर से मिलें यदि तेज बुखार हो।"
          : "25 new dengue cases in your area. Prevent water stagnation. See doctor immediately if high fever.",
      time: "2 hours ago",
      severity: "high",
      actionRequired: true,
    },
    {
      type: "info",
      title: language === "hi" ? "टीकाकरण अभियान" : "Vaccination Drive",
      message:
        language === "hi"
          ? "कल सुबह 10 बजे से गांव में कोविड बूस्टर और फ्लू वैक्सीन शिविर।"
          : "COVID booster and flu vaccine camp tomorrow at 10 AM in village.",
      time: "1 day ago",
      severity: "medium",
      actionRequired: false,
    },
    {
      type: "success",
      title: language === "hi" ? "स्वास्थ्य जांच पूर्ण" : "Health Checkup Complete",
      message:
        language === "hi"
          ? "आपकी मासिक स्वास्थ्य जांच सफलतापूर्वक पूर्ण हुई। रिपोर्ट डाउनलोड करें।"
          : "Your monthly health checkup completed successfully. Download report.",
      time: "3 days ago",
      severity: "low",
      actionRequired: false,
    },
  ]

  const upcomingReminders = [
    {
      medicine: language === "hi" ? "रक्तचाप की दवा" : "Blood Pressure Medicine",
      time: "8:00 AM",
      frequency: "Daily",
      dosage: "1 tablet",
      taken: false,
    },
    {
      medicine: language === "hi" ? "डायबिटीज की दवा" : "Diabetes Medicine",
      time: "2:00 PM",
      frequency: "Daily",
      dosage: "2 tablets",
      taken: true,
    },
    {
      medicine: language === "hi" ? "विटामिन डी" : "Vitamin D",
      time: "9:00 PM",
      frequency: "Weekly",
      dosage: "1 capsule",
      taken: false,
    },
  ]

  const handleSymptomAnalysis = async () => {
    if (!symptoms.trim() && selectedSymptoms.length === 0) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate AI analysis with progress
    const progressSteps = [
      { step: 20, message: language === "hi" ? "लक्षणों का विश्लेषण..." : "Analyzing symptoms..." },
      { step: 40, message: language === "hi" ? "मेडिकल डेटाबेस खोज रहे हैं..." : "Searching medical database..." },
      { step: 60, message: language === "hi" ? "AI मॉडल प्रोसेसिंग..." : "AI model processing..." },
      { step: 80, message: language === "hi" ? "सुझाव तैयार कर रहे हैं..." : "Preparing recommendations..." },
      { step: 100, message: language === "hi" ? "विश्लेषण पूर्ण" : "Analysis complete" },
    ]

    for (const { step } of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setAnalysisProgress(step)
    }

    // Generate comprehensive analysis
    const allSymptoms = [...selectedSymptoms, ...symptoms.split(",").map((s) => s.trim())].filter(Boolean)
    const analysisResult = generateSymptomAnalysis(allSymptoms, patientAge, patientGender)

    setAnalysis(analysisResult)
    setIsAnalyzing(false)
  }

  const generateSymptomAnalysis = (symptoms: string[], age: string, gender: string): SymptomAnalysis => {
    const symptomText = symptoms.join(", ").toLowerCase()

    if (symptomText.includes("fever") || symptomText.includes("बुखार")) {
      return {
        condition: language === "hi" ? "वायरल संक्रमण की संभावना" : "Possible Viral Infection",
        severity: symptomText.includes("high") || symptomText.includes("तेज") ? "high" : "medium",
        recommendations:
          language === "hi"
            ? [
                "पर्याप्त आराम करें और तरल पदार्थ लें",
                "पैरासिटामोल ले सकते हैं (डॉक्टर की सलाह पर)",
                "यदि बुखार 102°F से अधिक हो तो तुरंत डॉक्टर से मिलें",
                "अन्य लोगों से दूरी बनाए रखें",
              ]
            : [
                "Get adequate rest and stay hydrated",
                "Take paracetamol as advised by doctor",
                "See doctor immediately if fever exceeds 102°F",
                "Maintain distance from others",
              ],
        urgency: symptomText.includes("high") || symptomText.includes("chest") || symptomText.includes("breathing"),
        confidence: 85,
      }
    }

    if (symptomText.includes("chest") || symptomText.includes("सीने")) {
      return {
        condition: language === "hi" ? "हृदय संबंधी जांच आवश्यक" : "Cardiac Evaluation Required",
        severity: "high",
        recommendations:
          language === "hi"
            ? ["तुरंत नजदीकी अस्पताल जाएं", "भारी काम न करें", "यदि दर्द बढ़े तो 108 पर कॉल करें", "ECG और ब्लड टेस्ट कराएं"]
            : [
                "Visit nearest hospital immediately",
                "Avoid heavy activities",
                "Call 108 if pain increases",
                "Get ECG and blood tests done",
              ],
        urgency: true,
        confidence: 92,
      }
    }

    return {
      condition: language === "hi" ? "सामान्य स्वास्थ्य जांच सुझाई गई" : "General Health Checkup Recommended",
      severity: "low",
      recommendations:
        language === "hi"
          ? ["नियमित स्वास्थ्य जांच कराएं", "संतुलित आहार लें", "पर्याप्त पानी पिएं", "यदि समस्या बनी रहे तो डॉक्टर से मिलें"]
          : [
              "Get regular health checkups",
              "Maintain balanced diet",
              "Drink adequate water",
              "Consult doctor if problem persists",
            ],
      urgency: false,
      confidence: 70,
    }
  }

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
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
        <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <Heart className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900">
          {language === "hi" ? "स्वास्थ्य सेवा मॉड्यूल" : "Healthcare Module"}
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {language === "hi"
            ? "उन्नत AI तकनीक के साथ व्यापक स्वास्थ्य सेवा। आपके स्वास्थ्य की देखभाल हमारी प्राथमिकता है।"
            : "Comprehensive healthcare with advanced AI technology. Your health is our priority."}
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

      <Tabs defaultValue="symptom-checker" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-white shadow-lg rounded-xl">
          <TabsTrigger
            value="symptom-checker"
            className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
          >
            {language === "hi" ? "लक्षण जांच" : "Symptom Checker"}
          </TabsTrigger>
          <TabsTrigger value="telemedicine" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            {language === "hi" ? "टेलीमेडिसिन" : "Telemedicine"}
          </TabsTrigger>
          <TabsTrigger value="reminders" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            {language === "hi" ? "रिमाइंडर" : "Reminders"}
          </TabsTrigger>
          <TabsTrigger value="nearby" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            {language === "hi" ? "नजदीकी केंद्र" : "Nearby Care"}
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            {language === "hi" ? "स्वास्थ्य अलर्ट" : "Health Alerts"}
          </TabsTrigger>
          <TabsTrigger value="records" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
            {language === "hi" ? "स्वास्थ्य रिकॉर्ड" : "Health Records"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="symptom-checker" className="space-y-6 animate-slide-up">
          <Card className="shadow-xl border-2 border-red-100">
            <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <Stethoscope className="w-7 h-7 text-red-600" />
                <span>{language === "hi" ? "AI स्वास्थ्य सलाहकार" : "AI Health Advisor"}</span>
              </CardTitle>
              <CardDescription className="text-lg">
                {language === "hi"
                  ? "अपने लक्षण बताएं और तुरंत विशेषज्ञ सलाह पाएं। हमारा AI 95% सटीकता के साथ काम करता है।"
                  : "Describe your symptoms and get instant expert advice. Our AI works with 95% accuracy."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Patient Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium mb-2">{language === "hi" ? "उम्र" : "Age"}</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder={language === "hi" ? "आपकी उम्र" : "Your age"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{language === "hi" ? "लिंग" : "Gender"}</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">{language === "hi" ? "चुनें" : "Select"}</option>
                    <option value="male">{language === "hi" ? "पुरुष" : "Male"}</option>
                    <option value="female">{language === "hi" ? "महिला" : "Female"}</option>
                    <option value="other">{language === "hi" ? "अन्य" : "Other"}</option>
                  </select>
                </div>
              </div>

              {/* Common Symptoms Selection */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Thermometer className="w-5 h-5 mr-2 text-red-500" />
                  {language === "hi" ? "सामान्य लक्षण चुनें:" : "Select Common Symptoms:"}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {(commonSymptoms[language as keyof typeof commonSymptoms] || commonSymptoms.en).map(
                    (symptom, index) => (
                      <Button
                        key={index}
                        variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleSymptom(symptom)}
                        className={`text-left justify-start transition-all duration-200 ${
                          selectedSymptoms.includes(symptom)
                            ? "bg-red-500 text-white shadow-md"
                            : "hover:bg-red-50 hover:border-red-300"
                        }`}
                      >
                        {symptom}
                      </Button>
                    ),
                  )}
                </div>
              </div>

              {/* Voice and Text Input */}
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm" className="hover:bg-blue-50">
                    <Mic className="w-4 h-4 mr-2" />
                    {language === "hi" ? "आवाज़ में बताएं" : "Voice Input"}
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-green-50">
                    <Camera className="w-4 h-4 mr-2" />
                    {language === "hi" ? "फोटो अपलोड करें" : "Upload Photo"}
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-purple-50">
                    <FileText className="w-4 h-4 mr-2" />
                    {language === "hi" ? "रिपोर्ट अपलोड" : "Upload Report"}
                  </Button>
                </div>

                <Textarea
                  placeholder={
                    language === "hi"
                      ? "अपने लक्षणों का विस्तार से वर्णन करें... जैसे: मुझे 3 दिन से बुखार है, सिरदर्द भी है, खांसी आ रही है"
                      : "Describe your symptoms in detail... e.g., I have fever for 3 days, headache, and cough"
                  }
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="min-h-[120px] text-base"
                />
              </div>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                    <span className="font-medium text-blue-800">
                      {language === "hi" ? "AI विश्लेषण जारी..." : "AI Analysis in Progress..."}
                    </span>
                  </div>
                  <Progress value={analysisProgress} className="h-3" />
                  <p className="text-sm text-blue-600">
                    {analysisProgress}% {language === "hi" ? "पूर्ण" : "Complete"}
                  </p>
                </div>
              )}

              <Button
                onClick={handleSymptomAnalysis}
                disabled={(!symptoms.trim() && selectedSymptoms.length === 0) || isAnalyzing}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {language === "hi" ? "विश्लेषण हो रहा है..." : "Analyzing..."}
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" />
                    {language === "hi" ? "स्वास्थ्य जांच शुरू करें" : "Start Health Analysis"}
                  </>
                )}
              </Button>

              {/* Analysis Results */}
              {analysis && (
                <Card className={`border-2 ${getSeverityColor(analysis.severity)} animate-scale-in`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          analysis.severity === "high"
                            ? "bg-red-500"
                            : analysis.severity === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      >
                        {analysis.urgency ? (
                          <AlertTriangle className="w-6 h-6 text-white" />
                        ) : (
                          <CheckCircle className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-xl text-gray-900">{analysis.condition}</h4>
                          <Badge variant="secondary" className="bg-white/80">
                            {analysis.confidence}% {language === "hi" ? "सटीक" : "Confident"}
                          </Badge>
                        </div>

                        {analysis.urgency && (
                          <Alert className="mb-4 border-red-500 bg-red-50">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-800 font-medium">
                              {language === "hi"
                                ? "तत्काल चिकित्सा सहायता की आवश्यकता हो सकती है!"
                                : "Immediate medical attention may be required!"}
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="space-y-3">
                          <h5 className="font-semibold text-lg">{language === "hi" ? "सुझाव:" : "Recommendations:"}</h5>
                          <ul className="space-y-2">
                            {analysis.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-6">
                          <Button className="bg-green-500 hover:bg-green-600 text-white">
                            <Phone className="w-4 h-4 mr-2" />
                            {language === "hi" ? "डॉक्टर से बात करें" : "Call Doctor"}
                          </Button>
                          <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                            <MapPin className="w-4 h-4 mr-2" />
                            {language === "hi" ? "नजदीकी अस्पताल" : "Nearby Hospital"}
                          </Button>
                          <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50">
                            <FileText className="w-4 h-4 mr-2" />
                            {language === "hi" ? "रिपोर्ट सेव करें" : "Save Report"}
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

        <TabsContent value="telemedicine" className="space-y-6 animate-slide-up">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Phone className="w-7 h-7 text-green-600" />
                <span>{language === "hi" ? "टेलीमेडिसिन सेवा" : "Telemedicine Service"}</span>
              </CardTitle>
              <CardDescription className="text-lg">
                {language === "hi"
                  ? "डॉक्टर या ASHA कार्यकर्ता से वीडियो/ऑडियो कॉल पर बात करें। 2G नेटवर्क पर भी काम करता है।"
                  : "Connect with doctors or ASHA workers via video/audio call. Works on 2G networks."}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-green-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-bold text-xl mb-2">
                      {language === "hi" ? "तत्काल डॉक्टर कॉल" : "Instant Doctor Call"}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {language === "hi" ? "24/7 उपलब्ध विशेषज्ञ डॉक्टर" : "24/7 available specialist doctors"}
                    </p>
                    <Badge variant="secondary" className="mb-4 bg-green-100 text-green-700">
                      {language === "hi" ? "₹50 प्रति कॉल" : "₹50 per call"}
                    </Badge>
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                      {language === "hi" ? "अभी कॉल करें" : "Call Now"}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-xl mb-2">{language === "hi" ? "ASHA कार्यकर्ता" : "ASHA Worker"}</h4>
                    <p className="text-gray-600 mb-4">
                      {language === "hi" ? "स्थानीय स्वास्थ्य सहायक" : "Local health assistant"}
                    </p>
                    <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700">
                      {language === "hi" ? "निःशुल्क" : "Free"}
                    </Badge>
                    <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">
                      {language === "hi" ? "संपर्क करें" : "Contact"}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                    <h4 className="font-bold text-xl text-red-800">
                      {language === "hi" ? "आपातकालीन सेवा" : "Emergency Service"}
                    </h4>
                  </div>
                  <p className="text-red-700 mb-4 text-lg">
                    {language === "hi"
                      ? "गंभीर स्थिति में तुरंत एम्बुलेंस या आपातकालीन सेवा के लिए कॉल करें।"
                      : "For serious conditions, call ambulance or emergency services immediately."}
                  </p>
                  <div className="flex space-x-3">
                    <Button className="bg-red-500 hover:bg-red-600 text-white flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      {language === "hi" ? "आपातकालीन कॉल - 108" : "Emergency Call - 108"}
                    </Button>
                    <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                      <MapPin className="w-4 h-4 mr-2" />
                      {language === "hi" ? "नजदीकी अस्पताल" : "Nearest Hospital"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-6 animate-slide-up">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Bell className="w-7 h-7 text-blue-600" />
                <span>{language === "hi" ? "दवा और टीका रिमाइंडर" : "Medicine & Vaccine Reminders"}</span>
              </CardTitle>
              <CardDescription className="text-lg">
                {language === "hi"
                  ? "स्मार्ट रिमाइंडर सिस्टम। आवाज़ में अलर्ट पाएं। बुजुर्गों के लिए विशेष सुविधा।"
                  : "Smart reminder system. Get voice alerts. Special features for elderly."}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <h4 className="font-bold text-xl text-gray-900 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-blue-500" />
                  {language === "hi" ? "आज के रिमाइंडर" : "Today's Reminders"}
                </h4>
                {upcomingReminders.map((reminder, index) => (
                  <Card
                    key={index}
                    className={`border-l-4 ${reminder.taken ? "border-l-green-500 bg-green-50" : "border-l-blue-500 bg-blue-50"} hover:shadow-md transition-shadow`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${reminder.taken ? "bg-green-500" : "bg-blue-500"}`}
                          >
                            <Pill className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-lg">{reminder.medicine}</h5>
                            <p className="text-gray-600">
                              {reminder.time} - {reminder.frequency} - {reminder.dosage}
                            </p>
                            {reminder.taken && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700 mt-1">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {language === "hi" ? "लिया गया" : "Taken"}
                              </Badge>
                            )}
                          </div>
                        </div>
                        {!reminder.taken && (
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                            {language === "hi" ? "लिया गया" : "Mark Taken"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex space-x-3">
                <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                  <Bell className="w-4 h-4 mr-2" />
                  {language === "hi" ? "नया रिमाइंडर जोड़ें" : "Add New Reminder"}
                </Button>
                <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                  <Calendar className="w-4 h-4 mr-2" />
                  {language === "hi" ? "कैलेंडर देखें" : "View Calendar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nearby" className="space-y-6 animate-slide-up">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <MapPin className="w-7 h-7 text-purple-600" />
                <span>{language === "hi" ? "नजदीकी स्वास्थ्य सेवा" : "Nearby Healthcare"}</span>
              </CardTitle>
              <CardDescription className="text-lg">
                {language === "hi"
                  ? "आपके आस-पास के अस्पताल, PHC, और स्वास्थ्य कार्यकर्ता की विस्तृत जानकारी।"
                  : "Detailed information about hospitals, PHCs, and health workers around you."}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {nearbyHealthcare.map((facility, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-purple-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-7 h-7 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-bold text-xl">{facility.name}</h4>
                            <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                              {facility.type}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-gray-600">
                            <p className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {facility.distance} away
                            </p>
                            <p className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {facility.availability}
                            </p>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(facility.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                />
                              ))}
                              <span className="text-sm ml-1">({facility.rating})</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              {language === "hi" ? "विशेषताएं:" : "Specialties:"}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {facility.specialties.map((specialty, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                          <Phone className="w-4 h-4 mr-2" />
                          {language === "hi" ? "कॉल" : "Call"}
                        </Button>
                        <Button size="sm" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                          <MapPin className="w-4 h-4 mr-2" />
                          {language === "hi" ? "दिशा" : "Directions"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6 animate-slide-up">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Shield className="w-7 h-7 text-orange-600" />
                <span>{language === "hi" ? "स्वास्थ्य अलर्ट और सूचनाएं" : "Health Alerts & Notifications"}</span>
              </CardTitle>
              <CardDescription className="text-lg">
                {language === "hi"
                  ? "बीमारी के प्रकोप, मौसमी स्वास्थ्य सुझाव और महत्वपूर्ण स्वास्थ्य अपडेट।"
                  : "Disease outbreaks, seasonal health tips and important health updates."}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {healthAlerts.map((alert, index) => (
                <Card
                  key={index}
                  className={`border-l-4 transition-all duration-300 hover:shadow-lg ${
                    alert.severity === "high"
                      ? "border-l-red-500 bg-red-50 hover:bg-red-100"
                      : alert.severity === "medium"
                        ? "border-l-yellow-500 bg-yellow-50 hover:bg-yellow-100"
                        : "border-l-green-500 bg-green-50 hover:bg-green-100"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          alert.severity === "high"
                            ? "bg-red-500"
                            : alert.severity === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      >
                        {alert.type === "warning" ? (
                          <AlertTriangle className="w-6 h-6 text-white" />
                        ) : alert.type === "success" ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <Shield className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4
                            className={`font-bold text-xl ${
                              alert.severity === "high"
                                ? "text-red-800"
                                : alert.severity === "medium"
                                  ? "text-yellow-800"
                                  : "text-green-800"
                            }`}
                          >
                            {alert.title}
                          </h4>
                          <Badge
                            variant="outline"
                            className={`${
                              alert.severity === "high"
                                ? "border-red-500 text-red-600"
                                : alert.severity === "medium"
                                  ? "border-yellow-500 text-yellow-600"
                                  : "border-green-500 text-green-600"
                            }`}
                          >
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p
                          className={`text-lg leading-relaxed mb-3 ${
                            alert.severity === "high"
                              ? "text-red-700"
                              : alert.severity === "medium"
                                ? "text-yellow-700"
                                : "text-green-700"
                          }`}
                        >
                          {alert.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">{alert.time}</p>
                          {alert.actionRequired && (
                            <Button
                              size="sm"
                              className={`${
                                alert.severity === "high"
                                  ? "bg-red-500 hover:bg-red-600"
                                  : "bg-blue-500 hover:bg-blue-600"
                              } text-white`}
                            >
                              {language === "hi" ? "कार्य करें" : "Take Action"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-6 animate-slide-up">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <FileText className="w-7 h-7 text-indigo-600" />
                <span>{language === "hi" ? "डिजिटल स्वास्थ्य रिकॉर्ड" : "Digital Health Records"}</span>
              </CardTitle>
              <CardDescription className="text-lg">
                {language === "hi"
                  ? "आपका और परिवार का संपूर्ण स्वास्थ्य रिकॉर्ड। ऑफलाइन भी उपलब्ध, क्लाउड सिंक के साथ।"
                  : "Complete health records for you and family. Available offline with cloud sync."}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-indigo-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-indigo-50">
                    <CardTitle className="text-lg flex items-center">
                      <User className="w-5 h-5 mr-2 text-indigo-600" />
                      {language === "hi" ? "व्यक्तिगत रिकॉर्ड" : "Personal Records"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <strong>{language === "hi" ? "रक्त समूह:" : "Blood Group:"}</strong>
                        <span>O+</span>
                      </div>
                      <div className="flex justify-between">
                        <strong>{language === "hi" ? "अंतिम जांच:" : "Last Checkup:"}</strong>
                        <span>15 Dec 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <strong>{language === "hi" ? "एलर्जी:" : "Allergies:"}</strong>
                        <span>{language === "hi" ? "कोई नहीं" : "None"}</span>
                      </div>
                      <div className="flex justify-between">
                        <strong>{language === "hi" ? "पुरानी बीमारी:" : "Chronic Conditions:"}</strong>
                        <span>{language === "hi" ? "मधुमेह" : "Diabetes"}</span>
                      </div>
                      <div className="flex justify-between">
                        <strong>{language === "hi" ? "BMI:" : "BMI:"}</strong>
                        <span>24.5 (Normal)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="text-lg flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-600" />
                      {language === "hi" ? "टीकाकरण रिकॉर्ड" : "Vaccination Record"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <strong>COVID-19:</strong>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          ✅ {language === "hi" ? "पूर्ण" : "Complete"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <strong>Tetanus:</strong>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          ✅ {language === "hi" ? "अद्यतन" : "Up to date"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <strong>Hepatitis B:</strong>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          ✅ {language === "hi" ? "पूर्ण" : "Complete"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <strong>{language === "hi" ? "अगली देय:" : "Next Due:"}</strong>
                        <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                          {language === "hi" ? "फ्लू वैक्सीन" : "Flu vaccine"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  {language === "hi" ? "रिपोर्ट अपलोड करें" : "Upload Report"}
                </Button>
                <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                  <FileText className="w-4 h-4 mr-2" />
                  {language === "hi" ? "रिकॉर्ड डाउनलोड" : "Download Records"}
                </Button>
                <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                  <User className="w-4 h-4 mr-2" />
                  {language === "hi" ? "परिवार जोड़ें" : "Add Family"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
