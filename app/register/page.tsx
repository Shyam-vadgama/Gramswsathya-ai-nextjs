"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone,
  MapPin,
  Globe,
  ArrowLeft,
  Shield,
  CheckCircle2,
  Calendar
} from "lucide-react"
import Navbar from "@/components/navbar"
import { useAuth } from "@/contexts/auth-context"

export default function RegisterPage() {
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [notifications, setNotifications] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const { register, isLoading } = useAuth()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    village: "",
    district: "",
    state: "",
    userType: "",
    agreeToTerms: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        !formData.password || !formData.confirmPassword || !formData.village || 
        !formData.district || !formData.state || !formData.userType) {
      setError("Please fill in all required fields")
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }
    
    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions")
      return
    }
    
    const success = await register(formData)
    if (success) {
      router.push("/")
    } else {
      setError("Registration failed. Please try again.")
    }
  }

  const states = [
    "Uttar Pradesh", "Maharashtra", "Gujarat", "Rajasthan", "Madhya Pradesh",
    "Karnataka", "Tamil Nadu", "Andhra Pradesh", "Telangana", "Kerala",
    "West Bengal", "Bihar", "Odisha", "Assam", "Punjab"
  ]

  const userTypes = [
    { value: "farmer", label: currentLanguage === "hi" ? "किसान" : "Farmer" },
    { value: "healthcare_worker", label: currentLanguage === "hi" ? "स्वास्थ्य कार्यकर्ता" : "Healthcare Worker" },
    { value: "asha_worker", label: currentLanguage === "hi" ? "आशा कार्यकर्ता" : "ASHA Worker" },
    { value: "student", label: currentLanguage === "hi" ? "छात्र" : "Student" },
    { value: "other", label: currentLanguage === "hi" ? "अन्य" : "Other" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      {/* Navbar */}
      <Navbar 
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        notifications={notifications}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            {/* Back to Home */}
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentLanguage === "hi" ? "होम पर वापस जाएं" : "Back to Home"}
            </Link>

            {/* Register Card */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {currentLanguage === "hi" ? "खाता बनाएं" : "Create Account"}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {currentLanguage === "hi" 
                    ? "Gramswasthya AI में शामिल हों और ग्रामीण भारत को सशक्त बनाएं" 
                    : "Join Gramswasthya AI and empower rural India"
                  }
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleRegister} className="space-y-6">
                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                      {currentLanguage === "hi" ? "व्यक्तिगत जानकारी" : "Personal Information"}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                          {currentLanguage === "hi" ? "पहला नाम" : "First Name"}
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="firstName"
                            type="text"
                            placeholder={currentLanguage === "hi" ? "पहला नाम" : "First name"}
                            className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                          {currentLanguage === "hi" ? "अंतिम नाम" : "Last Name"}
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="lastName"
                            type="text"
                            placeholder={currentLanguage === "hi" ? "अंतिम नाम" : "Last name"}
                            className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          {currentLanguage === "hi" ? "ईमेल" : "Email"}
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="example@email.com"
                            className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                          {currentLanguage === "hi" ? "फोन नंबर" : "Phone Number"}
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                      {currentLanguage === "hi" ? "स्थान जानकारी" : "Location Information"}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="village" className="text-sm font-medium text-gray-700">
                          {currentLanguage === "hi" ? "गांव/शहर" : "Village/City"}
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="village"
                            type="text"
                            placeholder={currentLanguage === "hi" ? "गांव का नाम" : "Village name"}
                            className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            value={formData.village}
                            onChange={(e) => handleInputChange("village", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="district" className="text-sm font-medium text-gray-700">
                          {currentLanguage === "hi" ? "जिला" : "District"}
                        </Label>
                        <Input
                          id="district"
                          type="text"
                          placeholder={currentLanguage === "hi" ? "जिला" : "District"}
                          className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                          value={formData.district}
                          onChange={(e) => handleInputChange("district", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                          {currentLanguage === "hi" ? "राज्य" : "State"}
                        </Label>
                        <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                          <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                            <SelectValue placeholder={currentLanguage === "hi" ? "राज्य चुनें" : "Select state"} />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Account Type */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                      {currentLanguage === "hi" ? "खाता प्रकार" : "Account Type"}
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="userType" className="text-sm font-medium text-gray-700">
                        {currentLanguage === "hi" ? "मैं एक हूं" : "I am a"}
                      </Label>
                      <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
                        <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                          <SelectValue placeholder={currentLanguage === "hi" ? "अपना प्रकार चुनें" : "Select your type"} />
                        </SelectTrigger>
                        <SelectContent>
                          {userTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Security */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                      {currentLanguage === "hi" ? "सुरक्षा" : "Security"}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                          {currentLanguage === "hi" ? "पासवर्ड" : "Password"}
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder={currentLanguage === "hi" ? "मजबूत पासवर्ड बनाएं" : "Create strong password"}
                            className="pl-10 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                          {currentLanguage === "hi" ? "पासवर्ड की पुष्टि करें" : "Confirm Password"}
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder={currentLanguage === "hi" ? "पासवर्ड दोहराएं" : "Repeat password"}
                            className="pl-10 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                        className="mt-1"
                      />
                      <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                        {currentLanguage === "hi" ? (
                          <>
                            मैं <Link href="/terms" className="text-green-600 hover:text-green-700">नियम और शर्तों</Link> और{" "}
                            <Link href="/privacy" className="text-green-600 hover:text-green-700">गोपनीयता नीति</Link> से सहमत हूं
                          </>
                        ) : (
                          <>
                            I agree to the <Link href="/terms" className="text-green-600 hover:text-green-700">Terms & Conditions</Link> and{" "}
                            <Link href="/privacy" className="text-green-600 hover:text-green-700">Privacy Policy</Link>
                          </>
                        )}
                      </Label>
                    </div>
                  </div>

                  {/* Register Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading || !formData.agreeToTerms}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {currentLanguage === "hi" ? "खाता बन रहा है..." : "Creating account..."}
                      </div>
                    ) : (
                      currentLanguage === "hi" ? "खाता बनाएं" : "Create Account"
                    )}
                  </Button>
                </form>

                {/* Login Link */}
                <div className="text-center pt-6 border-t mt-6">
                  <p className="text-gray-600">
                    {currentLanguage === "hi" ? "पहले से खाता है?" : "Already have an account?"}{" "}
                    <Link 
                      href="/login" 
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      {currentLanguage === "hi" ? "लॉगिन करें" : "Sign in"}
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg">
                <Shield className="w-6 h-6 text-green-500" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {currentLanguage === "hi" ? "सुरक्षित" : "Secure"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {currentLanguage === "hi" ? "एंड-टू-एंड एन्क्रिप्शन" : "End-to-end encryption"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg">
                <Globe className="w-6 h-6 text-blue-500" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {currentLanguage === "hi" ? "मुफ्त" : "Free"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {currentLanguage === "hi" ? "कोई शुल्क नहीं" : "No charges"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {currentLanguage === "hi" ? "तुरंत" : "Instant"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {currentLanguage === "hi" ? "तुरंत एक्सेस" : "Instant access"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 