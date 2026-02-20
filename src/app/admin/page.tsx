"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { 
  Users, 
  Wrench, 
  Settings, 
  BarChart3,
  Plus,
  LogOut,
  Home
} from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { signOut } from "next-auth/react"

const menuItems = [
  { href: "/admin/usuarios", icon: Users, title: "Usuários", description: "Gerenciar clientes e técnicos" },
  { href: "/admin/equipamentos", icon: Settings, title: "Equipamentos", description: "Todos os equipamentos" },
  { href: "/admin/servicos", icon: Wrench, title: "Serviços", description: "Histórico de serviços" },
  { href: "/admin/relatorios", icon: BarChart3, title: "Relatórios", description: "Estatísticas e relatórios" },
]

export default function AdminPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>
  }

  if (!session || session.user.role !== "ADMIN") {
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
              <span className="text-gray-600">Painel Administrativo</span>
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
          <h1 className="text-3xl font-bold text-gray-900">Bem-vindo, Administrador</h1>
          <p className="text-gray-600">Gerencie o sistema REFRIGELAR</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-[#0277bd]">--</div>
              <div className="text-sm text-gray-600">Total de Clientes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-[#0277bd]">--</div>
              <div className="text-sm text-gray-600">Total de Técnicos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-[#0277bd]">--</div>
              <div className="text-sm text-gray-600">Equipamentos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-[#0277bd]">--</div>
              <div className="text-sm text-gray-600">Serviços este mês</div>
            </CardContent>
          </Card>
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

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-[#0277bd] hover:bg-[#01579b]">
              <Link href="/admin/usuarios/novo">
                <Plus className="w-4 h-4 mr-2" />
                Novo Usuário
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/tecnico/equipamentos/novo">
                <Plus className="w-4 h-4 mr-2" />
                Novo Equipamento
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Voltar ao Site
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
