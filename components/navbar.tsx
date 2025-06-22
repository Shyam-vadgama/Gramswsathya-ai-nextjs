"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  Wheat, 
  BarChart3, 
  Home, 
  Globe, 
  Bell,
  Mic,
  Smartphone,
  LogIn,
  UserPlus,
  LogOut,
  User
} from "lucide-react"
import { useState } from "react"
import LanguageSelector from "./language-selector"
import NotificationCenter from "./notification-center"
import EmergencyButton from "./emergency-button"
import WeatherWidget from "./weather-widget"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface NavbarProps {
  currentLanguage?: string
  onLanguageChange?: (language: string) => void
  notifications?: number
}

export default function Navbar({ 
  currentLanguage = "en", 
  onLanguageChange = () => {},
  notifications = 0 
}: NavbarProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const navigation = [
    {
      name: currentLanguage === "hi" ? "होम" : "Home",
      href: "/",
      icon: Home,
      current: pathname === "/"
    },
    {
      name: currentLanguage === "hi" ? "स्वास्थ्य" : "Healthcare",
      href: "/healthcare",
      icon: Heart,
      current: pathname === "/healthcare"
    },
    {
      name: currentLanguage === "hi" ? "कृषि" : "Agriculture",
      href: "/agriculture",
      icon: Wheat,
      current: pathname === "/agriculture"
    },
    {
      name: currentLanguage === "hi" ? "डैशबोर्ड" : "Dashboard",
      href: "/admin",
      icon: BarChart3,
      current: pathname === "/admin"
    }
  ]

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm w-full">
      <div className="container mx-auto px-4 w-full">
        <div className="flex flex-row items-center justify-between h-16 w-full">
          {/* Logo and Brand - Left Side */}
          <div className="flex flex-row items-center flex-shrink-0">
            <Link href="/" className="flex flex-row items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent hidden sm:block">
                Gramswasthya AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex flex-row items-center justify-center flex-1 mx-8">
            <div className="flex flex-row items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={item.current ? "default" : "ghost"}
                      className={`flex flex-row items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        item.current
                          ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md"
                          : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{item.name}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex flex-row items-center space-x-2 flex-shrink-0">
            {/* Voice Interface Button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex flex-row items-center space-x-2 border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Mic className="w-4 h-4 flex-shrink-0" />
              <span className="hidden lg:inline whitespace-nowrap">
                {currentLanguage === "hi" ? "आवाज़" : "Voice"}
              </span>
            </Button>

            {/* Notification Center */}
            <div className="relative flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="relative border-gray-200 hover:bg-gray-50 flex flex-row items-center"
                onClick={() => {/* Toggle notifications */}}
              >
                <Bell className="w-4 h-4 flex-shrink-0" />
                {notifications > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {notifications > 9 ? "9+" : notifications}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Language Selector */}
            <div className="flex-shrink-0">
              <LanguageSelector 
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
              />
            </div>

            {/* Emergency and Weather Widgets (when logged in) */}
            {isAuthenticated && (
              <div className="hidden sm:flex flex-row items-center space-x-2">
                <div className="flex-shrink-0">
                  <EmergencyButton language={currentLanguage} />
                </div>
                <div className="flex-shrink-0">
                  <WeatherWidget language={currentLanguage} />
                </div>
              </div>
            )}

            {/* Auth Buttons (when not logged in) */}
            {!isAuthenticated && (
              <div className="hidden sm:flex flex-row items-center space-x-2">
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-row items-center space-x-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <LogIn className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden lg:inline whitespace-nowrap">
                      {currentLanguage === "hi" ? "लॉगिन" : "Login"}
                    </span>
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="flex flex-row items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                  >
                    <UserPlus className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden lg:inline whitespace-nowrap">
                      {currentLanguage === "hi" ? "रजिस्टर" : "Register"}
                    </span>
                  </Button>
                </Link>
              </div>
            )}

            {/* User Profile (when logged in) */}
            {isAuthenticated && (
              <div className="hidden sm:flex flex-row items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex flex-row items-center space-x-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-green-100 text-green-600">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden lg:inline whitespace-nowrap text-sm">
                        {user?.name?.split(' ')[0] || "User"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.village}, {user?.district}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>{currentLanguage === "hi" ? "प्रोफाइल" : "Profile"}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>{currentLanguage === "hi" ? "मेरी गतिविधियां" : "My Activities"}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{currentLanguage === "hi" ? "लॉगआउट" : "Logout"}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden flex-shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 w-full">
            <div className="flex flex-col space-y-2 w-full">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.name} href={item.href} className="w-full">
                    <Button
                      variant={item.current ? "default" : "ghost"}
                      className={`w-full justify-start flex flex-row items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        item.current
                          ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                          : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="whitespace-nowrap">{item.name}</span>
                    </Button>
                  </Link>
                )
              })}
              
              {/* Mobile Voice Button */}
              <Button
                variant="outline"
                className="w-full justify-start flex flex-row items-center space-x-3 px-4 py-3 rounded-lg border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Mic className="w-5 h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">{currentLanguage === "hi" ? "आवाज़ सहायता" : "Voice Help"}</span>
              </Button>

              {/* Mobile Emergency and Weather (when logged in) */}
              {isAuthenticated && (
                <>
                  <div className="flex flex-row items-center space-x-2 px-4 py-2">
                    <EmergencyButton language={currentLanguage} />
                    <WeatherWidget language={currentLanguage} />
                  </div>
                  
                  {/* Mobile User Profile */}
                  <div className="flex flex-row items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-sm bg-green-100 text-green-600">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.village}, {user?.district}</p>
                    </div>
                  </div>
                </>
              )}

              {/* Mobile Auth Buttons (when not logged in) */}
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                  <Link href="/login" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full justify-start flex flex-row items-center space-x-3 px-4 py-3 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LogIn className="w-5 h-5 flex-shrink-0" />
                      <span className="whitespace-nowrap">{currentLanguage === "hi" ? "लॉगिन करें" : "Login"}</span>
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full">
                    <Button
                      className="w-full justify-start flex flex-row items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <UserPlus className="w-5 h-5 flex-shrink-0" />
                      <span className="whitespace-nowrap">{currentLanguage === "hi" ? "रजिस्टर करें" : "Register"}</span>
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Logout (when logged in) */}
              {isAuthenticated && (
                <Button
                  variant="outline"
                  className="w-full justify-start flex flex-row items-center space-x-3 px-4 py-3 rounded-lg border-red-200 text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">{currentLanguage === "hi" ? "लॉगआउट" : "Logout"}</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 