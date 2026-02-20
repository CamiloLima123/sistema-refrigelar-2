"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { 
  Settings,
  Wrench,
  Calendar,
  LogOut,
  Home,
  Bell
} from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { signOut } from "next-auth/react"

const menuItems = [
  { href: "/cliente/equipamentos", icon: Settings, title: "Meus Equipamentos", description: "Ver todos os seus equipamentos" },
  { href: "/cliente/servicos", icon: Wrench, title: "Histórico de Serviços", description: "Serviços realizados" },
  { href: "/cliente/manutencoes", icon: Calendar, title: "Próximas Manutenções", description: "Agenda de manutenções" },
  { href: "/cliente/notificacoes", icon: Bell, title: "Notificações", description: "Alertas e lembretes" },
]

export default function ClientePage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>
  }

  if (!session) {
    redirect("/login")
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-[#0277bd]">REFRI</span>
                <span className="text-xl font-bold text-[#ffc107]">GELAR</span>
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600">Área do Cliente</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{session.user.name}</span>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bem-vindo, {session.user.name}</h1>
          <p className="text-gray-600">Acompanhe seus equipamentos e serviços</p>
        </div>

        {/* Menu */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <item.icon className="w-10 h-10 text-[#0277bd] mb-2" />
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Precisa de ajuda?</h2>
          <p className="text-blue-700 mb-4">
            Entre em contato conosco pelo WhatsApp para solicitar serviços ou tirar dúvidas.
          </p>
          <Button asChild variant="outline" className="border-blue-500 text-blue-700 hover:bg-blue-100">
            <Link href="https://wa.me/5598985855278" target="_blank">
              Falar no WhatsApp
            </Link>
          </Button>
        </div>

        {/* Back to site */}
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Voltar ao Site
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
