"use client"

import { Users, Phone, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type StatsOverviewProps = {
  language: string
}

/**
 * Small metric strip shown in the hero that highlights live usage stats.
 * Values are dummy-static for now and can later be replaced with real data.
 */
export default function StatsOverview({ language }: StatsOverviewProps) {
  const stats = [
    {
      icon: Users,
      value: "12.5K",
      label: language === "hi" ? "सक्रिय उपयोगकर्ता" : "Active Users",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Phone,
      value: "7.8K",
      label: language === "hi" ? "सफल कॉल्स" : "Successful Calls",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Activity,
      value: "98%",
      label: language === "hi" ? "संतुष्टि रेट" : "Satisfaction Rate",
      color: "bg-purple-100 text-purple-600",
    },
  ]

  return (
    <div className="mx-auto max-w-3xl grid grid-cols-3 gap-4">
      {stats.map(({ icon: Icon, value, label, color }) => (
        <div key={label} className={`rounded-xl ${color} py-4 flex flex-col items-center justify-center shadow-sm`}>
          <Icon className="w-6 h-6 mb-1" />
          <p className="text-xl font-bold leading-none">{value}</p>
          <Badge variant="secondary" className="mt-1 text-xs bg-white/60">
            {label}
          </Badge>
        </div>
      ))}
    </div>
  )
}
