"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, LogOut, LogIn, UserPlus } from "lucide-react"
import Link from "next/link"

export default function TestAuthPage() {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth()

  const handleTestLogin = async () => {
    const success = await login("test@example.com", "password123")
    if (success) {
      alert("Login successful! Check the navbar for emergency and weather widgets.")
    } else {
      alert("Login failed!")
    }
  }

  const handleTestLogout = () => {
    logout()
    alert("Logged out! Emergency and weather widgets should be hidden.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Authentication Test Page
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Status */}
            <div className="text-center">
              <Badge 
                variant={isAuthenticated ? "default" : "secondary"}
                className="text-lg px-4 py-2"
              >
                {isAuthenticated ? "✅ Logged In" : "❌ Not Logged In"}
              </Badge>
            </div>

            {/* User Info */}
            {isAuthenticated && user && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">Current User:</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Type:</strong> {user.userType}</p>
                  <p><strong>Location:</strong> {user.village}, {user.district}, {user.state}</p>
                </div>
              </div>
            )}

            {/* Test Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Button
                    onClick={handleTestLogin}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    {isLoading ? "Logging in..." : "Test Login"}
                  </Button>
                  <Link href="/login">
                    <Button variant="outline">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Go to Login Page
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleTestLogout}
                    variant="destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Test Logout
                  </Button>
                  <Link href="/">
                    <Button variant="outline">
                      <User className="w-4 h-4 mr-2" />
                      Go to Home Page
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Test Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
                <li>Click "Test Login" to simulate a user login</li>
                <li>Check the navbar - you should see emergency and weather widgets instead of login/register buttons</li>
                <li>Go to the home page to see the welcome message</li>
                <li>Click "Test Logout" to log out</li>
                <li>Verify that login/register buttons appear again in the navbar</li>
              </ol>
            </div>

            {/* Navigation */}
            <div className="text-center pt-4 border-t">
              <Link href="/">
                <Button variant="ghost">
                  ← Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 