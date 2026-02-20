"use client"

import { Phone } from "lucide-react"
import { whatsappLink } from "@/lib/utils"

export function WhatsAppFloat() {
  const phone = "5598985855278"
  const message = "Olá! Gostaria de solicitar um orçamento para serviço de ar condicionado."

  return (
    <a
      href={whatsappLink(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center"
      aria-label="Contato WhatsApp"
    >
      <Phone className="w-6 h-6" />
    </a>
  )
}
