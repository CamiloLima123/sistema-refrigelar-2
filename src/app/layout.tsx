import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { WhatsAppFloat } from "@/components/whatsapp-float"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "REFRIGELAR - Serviços de Refrigeração e Ar Condicionado",
  description: "Especialistas em instalação, manutenção e conserto de ar condicionado e refrigeração em São Luís - MA. Mais de 20.000 serviços executados em 13 anos.",
  keywords: "ar condicionado, refrigeração, manutenção, instalação, São Luís, MA",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          {children}
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  )
}
