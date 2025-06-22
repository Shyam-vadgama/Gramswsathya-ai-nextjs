"use client"

import { Button } from "@/components/ui/button"
import { Heart, Wheat, Mic, MapPin } from "lucide-react"
import Link from "next/link"

interface QuickActionsProps {
  language: string
}

/**
 * A compact grid of "shortcut" buttons that let users jump
 * directly to the most-used flows (healthcare, agriculture, voice help, nearby centres).
 */
export default function QuickActions({ language }: QuickActionsProps) {
  const actions = [
    {
      icon: Heart,
      label: language === "hi" ? "स्वास्थ्य सेवा" : "Healthcare",
      href: "/healthcare",
      color: "bg-red-500 hover:bg-red-600 text-white",
    },
    {
      icon: Wheat,
      label: language === "hi" ? "कृषि सलाह" : "Agriculture",
      href: "/agriculture",
      color: "bg-green-500 hover:bg-green-600 text-white",
    },
    {
      icon: Mic,
      label: language === "hi" ? "आवाज़ सहायता" : "Voice Help",
      href: "/#voice", // stays on same page but scrolls to voice section
      color: "bg-blue-500 hover:bg-blue-600 text-white",
    },
    {
      icon: MapPin,
      label: language === "hi" ? "नजदीकी केंद्र" : "Nearby Care",
      href: "/healthcare#nearby", // goes to healthcare page and scrolls to nearby section
      color: "bg-purple-500 hover:bg-purple-600 text-white",
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {actions.map(({ icon: Icon, label, href, color }) => (
        <Link key={label} href={href}>
          <Button
            className={`${color} flex-col h-28 py-4 shadow-md hover:shadow-lg transition-shadow w-full`}
          >
            <Icon className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">{label}</span>
          </Button>
        </Link>
      ))}
    </div>
  )
}
