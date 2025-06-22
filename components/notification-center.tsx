"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, Heart, Wheat, AlertTriangle, CheckCircle, X } from "lucide-react"

interface NotificationCenterProps {
  count: number
  language: string
}

export default function NotificationCenter({ count, language }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "health",
      title: language === "hi" ? "डेंगू अलर्ट - उच्च प्राथमिकता" : "Dengue Alert - High Priority",
      message:
        language === "hi"
          ? "आपके क्षेत्र में डेंगू के 15 नए मामले मिले हैं। सावधानी बरतें।"
          : "15 new dengue cases reported in your area. Take precautions.",
      time: "2 hours ago",
      priority: "high",
      read: false,
      actionable: true,
    },
    {
      id: 2,
      type: "agriculture",
      title: language === "hi" ? "मौसम चेतावनी - भारी बारिश" : "Weather Warning - Heavy Rain",
      message:
        language === "hi"
          ? "अगले 72 घंटों में भारी बारिश की संभावना। फसल की सुरक्षा करें।"
          : "Heavy rainfall expected in next 72 hours. Protect your crops.",
      time: "4 hours ago",
      priority: "medium",
      read: false,
      actionable: true,
    },
    {
      id: 3,
      type: "health",
      title: language === "hi" ? "दवा रिमाइंडर" : "Medicine Reminder",
      message: language === "hi" ? "रक्तचाप की दवा लेने का समय हो गया है।" : "Time to take your blood pressure medicine.",
      time: "6 hours ago",
      priority: "low",
      read: false,
      actionable: false,
    },
    {
      id: 4,
      type: "agriculture",
      title: language === "hi" ? "बाजार अपडेट" : "Market Update",
      message:
        language === "hi" ? "गेहूं का भाव 8% बढ़ा है। बेचने का अच्छा समय।" : "Wheat prices increased by 8%. Good time to sell.",
      time: "1 day ago",
      priority: "medium",
      read: true,
      actionable: true,
    },
    {
      id: 5,
      type: "health",
      title: language === "hi" ? "टीकाकरण अभियान" : "Vaccination Drive",
      message:
        language === "hi"
          ? "कल सुबह 10 बजे से गांव में कोविड बूस्टर शिविर।"
          : "COVID booster camp tomorrow at 10 AM in village.",
      time: "1 day ago",
      priority: "low",
      read: true,
      actionable: false,
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />
      case "medium":
        return <Bell className="w-4 h-4" />
      case "low":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="relative hover:shadow-md transition-shadow">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-6 h-6 p-0 flex items-center justify-center bg-red-500 text-white text-xs animate-pulse">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0 shadow-xl">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-green-50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Bell className="w-5 h-5 mr-2 text-blue-600" />
                {language === "hi" ? "सूचनाएं" : "Notifications"}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {unreadCount} {language === "hi" ? "नई" : "new"}
                </Badge>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs hover:bg-blue-100">
                    {language === "hi" ? "सभी पढ़ें" : "Mark all read"}
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium mb-1">{language === "hi" ? "कोई सूचना नहीं" : "No notifications"}</p>
                <p className="text-sm">{language === "hi" ? "सभी अपडेट यहाँ दिखेंगे" : "All updates will appear here"}</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors relative ${
                      !notification.read ? "bg-blue-50/30 border-l-4 border-l-blue-500" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          notification.type === "health" ? "bg-red-100" : "bg-green-100"
                        }`}
                      >
                        {notification.type === "health" ? (
                          <Heart className="w-5 h-5 text-red-600" />
                        ) : (
                          <Wheat className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-semibold text-gray-900 leading-tight">{notification.title}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-6 h-6 p-0 hover:bg-red-100 ml-2 flex-shrink-0"
                            onClick={() => removeNotification(notification.id)}
                          >
                            <X className="w-3 h-3 text-gray-400 hover:text-red-500" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className={`text-xs ${getPriorityColor(notification.priority)}`}>
                              {getPriorityIcon(notification.priority)}
                              <span className="ml-1 capitalize">{notification.priority}</span>
                            </Badge>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs hover:bg-blue-100 text-blue-600"
                            >
                              {language === "hi" ? "पढ़ा" : "Mark read"}
                            </Button>
                          )}
                        </div>
                        {notification.actionable && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs border-blue-500 text-blue-600 hover:bg-blue-50"
                            >
                              {language === "hi" ? "कार्य करें" : "Take Action"}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
