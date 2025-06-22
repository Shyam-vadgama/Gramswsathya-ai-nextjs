"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Users,
  Heart,
  Wheat,
  Phone,
  Bell,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Download,
} from "lucide-react"

export default function AdminDashboard() {
  const villageStats = [
    { village: "Rampur", health: 45, agri: 78, calls: 23, alerts: 5 },
    { village: "Krishnanagar", health: 67, agri: 56, calls: 34, alerts: 8 },
    { village: "Govindpur", health: 34, agri: 89, calls: 12, alerts: 3 },
    { village: "Shyampur", health: 56, agri: 67, calls: 28, alerts: 6 },
  ]

  const recentAlerts = [
    { type: "health", message: "Dengue outbreak reported in Rampur", time: "2 hours ago", severity: "high" },
    { type: "agri", message: "Pest attack on wheat crops in Krishnanagar", time: "4 hours ago", severity: "medium" },
    { type: "health", message: "Vaccination drive completed in Govindpur", time: "1 day ago", severity: "low" },
    { type: "agri", message: "Market prices updated for all regions", time: "2 days ago", severity: "low" },
  ]

  const callStats = {
    totalCalls: 1247,
    healthCalls: 678,
    agriCalls: 569,
    avgDuration: "4.2 min",
    successRate: "94%",
  }

  const userEngagement = {
    activeUsers: 2456,
    newUsers: 234,
    voiceQueries: 1876,
    textQueries: 580,
    photoUploads: 345,
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <BarChart3 className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Monitor village-wise health and agriculture activities, track system usage, and manage alerts.
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="villages">Villages</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{userEngagement.activeUsers.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Active Users</p>
                <Badge variant="secondary" className="mt-2">
                  +{userEngagement.newUsers} new
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{callStats.totalCalls.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Calls</p>
                <Badge variant="secondary" className="mt-2">
                  {callStats.successRate} success
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{callStats.healthCalls}</p>
                <p className="text-sm text-gray-600">Health Queries</p>
                <Badge variant="secondary" className="mt-2">
                  54% of total
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Wheat className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{callStats.agriCalls}</p>
                <p className="text-sm text-gray-600">Agriculture Queries</p>
                <Badge variant="secondary" className="mt-2">
                  46% of total
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Usage Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Query Types</CardTitle>
                <CardDescription>Breakdown of user interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Voice Queries</span>
                  </div>
                  <span className="font-semibold">{userEngagement.voiceQueries}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Text Queries</span>
                  </div>
                  <span className="font-semibold">{userEngagement.textQueries}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Photo Uploads</span>
                  </div>
                  <span className="font-semibold">{userEngagement.photoUploads}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAlerts.slice(0, 4).map((alert, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                    {alert.type === "health" ? (
                      <Heart className="w-4 h-4 text-red-600" />
                    ) : (
                      <Wheat className="w-4 h-4 text-green-600" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="villages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Village-wise Statistics</CardTitle>
              <CardDescription>Health and agriculture activity across villages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {villageStats.map((village, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-lg">{village.village}</h4>
                        <div className="flex space-x-2">
                          <Badge variant="outline">{village.calls} calls</Badge>
                          <Badge variant={village.alerts > 5 ? "destructive" : "secondary"}>
                            {village.alerts} alerts
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Health Queries</span>
                            <span className="text-sm font-medium">{village.health}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${village.health}%` }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Agriculture Queries</span>
                            <span className="text-sm font-medium">{village.agri}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${village.agri}%` }}></div>
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

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-orange-600" />
                <span>System Alerts</span>
              </CardTitle>
              <CardDescription>Monitor and manage health and agriculture alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <Card
                  key={index}
                  className={`border-l-4 ${
                    alert.severity === "high"
                      ? "border-l-red-500 bg-red-50"
                      : alert.severity === "medium"
                        ? "border-l-yellow-500 bg-yellow-50"
                        : "border-l-green-500 bg-green-50"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {alert.severity === "high" ? (
                          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                        ) : alert.severity === "medium" ? (
                          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-gray-600">{alert.time}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant={alert.type === "health" ? "destructive" : "secondary"}>
                              {alert.type === "health" ? "Health" : "Agriculture"}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={
                                alert.severity === "high"
                                  ? "border-red-500 text-red-600"
                                  : alert.severity === "medium"
                                    ? "border-yellow-500 text-yellow-600"
                                    : "border-green-500 text-green-600"
                              }
                            >
                              {alert.severity} priority
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Resolve
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Reports & Analytics</span>
              </CardTitle>
              <CardDescription>Generate and download system reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Monthly Usage Report</h4>
                    <p className="text-sm text-gray-600 mb-4">Detailed usage statistics for the current month</p>
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Heart className="w-8 h-8 text-red-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Health Impact Report</h4>
                    <p className="text-sm text-gray-600 mb-4">Health outcomes and intervention effectiveness</p>
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Wheat className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Agriculture Advisory Report</h4>
                    <p className="text-sm text-gray-600 mb-4">Crop advisory effectiveness and farmer outcomes</p>
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Performance Analytics</h4>
                    <p className="text-sm text-gray-600 mb-4">System performance and user satisfaction metrics</p>
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
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
