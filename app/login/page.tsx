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
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Smartphone, 
  Globe,
  ArrowLeft,
  Shield,
  CheckCircle2
} from "lucide-react"
import Navbar from "@/components/navbar"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [notifications, setNotifications] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    
    const success = await login(email, password)
    if (success) {
      router.push("/")
    } else {
      setError("Invalid email or password")
    }
  }

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
          <div className="w-full max-w-md">
            {/* Back to Home */}
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentLanguage === "hi" ? "होम पर वापस जाएं" : "Back to Home"}
            </Link>

            {/* Login Card */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {currentLanguage === "hi" ? "लॉगिन करें" : "Welcome Back"}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {currentLanguage === "hi" 
                    ? "अपने खाते में लॉगिन करें" 
                    : "Sign in to your account to continue"
                  }
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Email/Phone Input */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      {currentLanguage === "hi" ? "ईमेल या फोन नंबर" : "Email or Phone Number"}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="text"
                        placeholder={currentLanguage === "hi" ? "example@email.com या +91 98765 43210" : "example@email.com or +91 98765 43210"}
                        className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      {currentLanguage === "hi" ? "पासवर्ड" : "Password"}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={currentLanguage === "hi" ? "अपना पासवर्ड दर्ज करें" : "Enter your password"}
                        className="pl-10 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-sm text-gray-600">
                        {currentLanguage === "hi" ? "मुझे याद रखें" : "Remember me"}
                      </Label>
                    </div>
                    <Link 
                      href="/forgot-password" 
                      className="text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      {currentLanguage === "hi" ? "पासवर्ड भूल गए?" : "Forgot password?"}
                    </Link>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {currentLanguage === "hi" ? "लॉगिन हो रहा है..." : "Signing in..."}
                      </div>
                    ) : (
                      currentLanguage === "hi" ? "लॉगिन करें" : "Sign In"
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">
                      {currentLanguage === "hi" ? "या" : "Or"}
                    </span>
                  </div>
                </div>

                {/* Alternative Login Options */}
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    {currentLanguage === "hi" ? "OTP के साथ लॉगिन करें" : "Login with OTP"}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    {currentLanguage === "hi" ? "आधार कार्ड से लॉगिन" : "Login with Aadhaar"}
                  </Button>
                </div>

                {/* Register Link */}
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    {currentLanguage === "hi" ? "खाता नहीं है?" : "Don't have an account?"}{" "}
                    <Link 
                      href="/register" 
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      {currentLanguage === "hi" ? "रजिस्टर करें" : "Sign up"}
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">
                  {currentLanguage === "hi" ? "सुरक्षित और एन्क्रिप्टेड लॉगिन" : "Secure & encrypted login"}
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">
                  {currentLanguage === "hi" ? "24/7 सहायता उपलब्ध" : "24/7 support available"}
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">
                  {currentLanguage === "hi" ? "ऑफलाइन मोड में भी काम करता है" : "Works in offline mode too"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 