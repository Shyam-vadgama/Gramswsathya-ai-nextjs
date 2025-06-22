"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface MarketTickerProps {
  language: string
}

export default function MarketTicker({ language }: MarketTickerProps) {
  const prices = [
    { crop: language === "hi" ? "गेहूं" : "Wheat", price: "₹2,150", change: "+5%", trend: "up" },
    { crop: language === "hi" ? "चावल" : "Rice", price: "₹3,200", change: "-2%", trend: "down" },
    { crop: language === "hi" ? "प्याज" : "Onion", price: "₹28", change: "+12%", trend: "up" },
    { crop: language === "hi" ? "आलू" : "Potato", price: "₹22", change: "+3%", trend: "up" },
  ]

  return (
    <div className="bg-green-600 text-white py-2 overflow-hidden">
      <div className="animate-scroll flex space-x-8 whitespace-nowrap">
        {prices.concat(prices).map((item, index) => (
          <div key={index} className="flex items-center space-x-2 mx-4">
            <span className="font-medium">{item.crop}:</span>
            <span>{item.price}</span>
            <Badge variant="secondary" className={`${item.trend === "up" ? "bg-green-500" : "bg-red-500"} text-white`}>
              {item.trend === "up" ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {item.change}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
