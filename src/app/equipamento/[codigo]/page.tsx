"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { 
  Settings, 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  Wrench,
  ArrowLeft,
  QrCode,
  Lock
} from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"
import { formatDate } from "@/lib/utils"

interface Equipamento {
  id: string
  codigo: string
  clienteNome: string
  clienteTelefone: string
  clienteEndereco: string
  localInstalacao: string
  marca: string
  modelo: string
  numeroSerie: string
  capacidadeBTU: string
  tipoEquipamento: string
  publico: boolean
  proximaManutencao?: string
  createdAt: string
  tecnico?: { name: string }
  servicos: Servico[]
  fotos: Foto[]
}

interface Servico {
  id: string
  dataServico: string
  tipoServico: string
  descricao: string
  pecasUtilizadas?: string
  observacoes?: string
  tecnicoNome: string
  fotos: Foto[]
}

interface Foto {
  id: string
  url: string
  descricao?: string
}

export default function EquipamentoPublicPage() {
  const params = useParams()
  const codigo = params.codigo as string

  const [equipamento, setEquipamento] = useState<Equipamento | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [requiresLogin, setRequiresLogin] = useState(false)

  useEffect(() => {
    async function fetchEquipamento() {
      try {
        const response = await fetch(`/api/equipamentos/${codigo}`)

        if (response.status === 401) {
          setRequiresLogin(true)
          setLoading(false)
          return
        }

        if (!response.ok) {
          throw new Error("Equipamento não encontrado")
        }

        const data = await response.json()
        setEquipamento(data)
      } catch (err) {
        setError("Erro ao carregar equipamento")
      } finally {
        setLoading(false)
      }
    }

    if (codigo) {
      fetchEquipamento()
    }
  }, [codigo])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Settings className="w-12 h-12 animate-spin text-[#0277bd] mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (requiresLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <Lock className="w-16 h-16 text-[#0277bd] mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Acesso Restrito
            </h1>
            <p className="text-gray-600 mb-6">
              Este equipamento está configurado como privado. 
              Faça login para visualizar as informações.
            </p>
            <div className="flex flex-col gap-3">
              <Button asChild className="bg-[#0277bd] hover:bg-[#01579b]">
                <Link href={`/login?callbackUrl=/equipamento/${codigo}`}>
                  Fazer Login
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao Site
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !equipamento) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Equipamento Não Encontrado
            </h1>
            <p className="text-gray-600 mb-6">
              O código do equipamento não foi encontrado em nosso sistema.
            </p>
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Site
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-[#0277bd]">REFRI</span>
              <span className="text-xl font-bold text-[#ffc107]">GELAR</span>
            </Link>
            <Badge variant="outline" className="flex items-center gap-1">
              <QrCode className="w-3 h-3" />
              {equipamento.codigo}
            </Badge>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link 
            href="/" 
            className="text-sm text-gray-500 hover:text-[#0277bd] flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao site
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Ficha do Equipamento
        </h1>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="servicos">Serviços</TabsTrigger>
            <TabsTrigger value="fotos">Fotos</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6">
            {/* Dados do Equipamento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#0277bd]" />
                  Dados do Equipamento
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Marca</label>
                  <p className="font-medium">{equipamento.marca}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Modelo</label>
                  <p className="font-medium">{equipamento.modelo}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Número de Série</label>
                  <p className="font-medium">{equipamento.numeroSerie}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Capacidade</label>
                  <p className="font-medium">{equipamento.capacidadeBTU} BTU</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Tipo</label>
                  <p className="font-medium">{equipamento.tipoEquipamento}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Local de Instalação</label>
                  <p className="font-medium">{equipamento.localInstalacao}</p>
                </div>
              </CardContent>
            </Card>

            {/* Dados do Cliente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#0277bd]" />
                  Dados do Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <label className="text-sm text-gray-500">Nome</label>
                    <p className="font-medium">{equipamento.clienteNome}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <label className="text-sm text-gray-500">Telefone</label>
                    <p className="font-medium">{equipamento.clienteTelefone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <label className="text-sm text-gray-500">Endereço</label>
                    <p className="font-medium">{equipamento.clienteEndereco}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {equipamento.proximaManutencao && (
              <Card className="border-yellow-400 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-yellow-600" />
                    <div>
                      <label className="text-sm text-yellow-700">Próxima Manutenção Recomendada</label>
                      <p className="font-bold text-yellow-800">
                        {formatDate(equipamento.proximaManutencao)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="servicos">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-[#0277bd]" />
                  Histórico de Serviços
                </CardTitle>
              </CardHeader>
              <CardContent>
                {equipamento.servicos && equipamento.servicos.length > 0 ? (
                  <div className="space-y-4">
                    {equipamento.servicos.map((servico) => (
                      <div key={servico.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Badge className="mb-2">{servico.tipoServico}</Badge>
                            <p className="text-sm text-gray-500">
                              {formatDate(servico.dataServico)}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{servico.descricao}</p>
                        {servico.pecasUtilizadas && (
                          <p className="text-sm text-gray-600">
                            <strong>Peças:</strong> {servico.pecasUtilizadas}
                          </p>
                        )}
                        {servico.observacoes && (
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>Obs:</strong> {servico.observacoes}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mt-2">
                          Técnico: {servico.tecnicoNome}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Nenhum serviço registrado ainda.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fotos">
            <Card>
              <CardHeader>
                <CardTitle>Fotos do Equipamento</CardTitle>
              </CardHeader>
              <CardContent>
                {equipamento.fotos && equipamento.fotos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {equipamento.fotos.map((foto) => (
                      <div key={foto.id} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={foto.url} 
                          alt={foto.descricao || "Foto do equipamento"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Nenhuma foto disponível.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Precisa de assistência técnica?
          </p>
          <Button asChild className="bg-green-500 hover:bg-green-600">
            <Link href={`https://wa.me/5598985855278`} target="_blank">
              <Phone className="w-4 h-4 mr-2" />
              Falar no WhatsApp
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-xl font-bold text-white">REFRI</span>
            <span className="text-xl font-bold text-[#ffc107]">GELAR</span>
          </div>
          <p className="text-sm">
            Especialistas em refrigeração e ar condicionado
          </p>
          <p className="text-sm mt-2">
            © {new Date().getFullYear()} REFRIGELAR Serviços LTDA
          </p>
        </div>
      </footer>
    </main>
  )
}
