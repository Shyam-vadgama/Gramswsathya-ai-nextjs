"use client"

import { Sun } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface WeatherWidgetProps {
  language: string
}

export default function WeatherWidget({ language }: WeatherWidgetProps) {
  const weather = {
    temp: "28°C",
    condition: language === "hi" ? "धूप" : "Sunny",
    humidity: "65%",
    rain: language === "hi" ? "बारिश की संभावना" : "Rain likely",
  }

  return (
    <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-2">
      <Sun className="w-4 h-4 mr-2" />
      {weather.temp}
    </Badge>
  )
}
