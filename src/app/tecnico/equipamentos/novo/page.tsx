"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft,
  Save,
  QrCode,
  Camera,
  Check
} from "lucide-react"
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle, Checkbox, Textarea, Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui"

export default function NovoEquipamentoPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [showQrDialog, setShowQrDialog] = useState(false)
  const [equipamentoCriado, setEquipamentoCriado] = useState<any>(null)

  const [formData, setFormData] = useState({
    clienteNome: "",
    clienteTelefone: "",
    clienteEmail: "",
    clienteEndereco: "",
    localInstalacao: "",
    marca: "",
    modelo: "",
    numeroSerie: "",
    capacidadeBTU: "",
    tipoEquipamento: "",
    dataServico: new Date().toISOString().split('T')[0],
    tipoServico: "",
    descricao: "",
    pecasUtilizadas: "",
    observacoes: "",
    proximaManutencao: "",
    publico: true,
  })

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>
  }

  if (!session || (session.user.role !== "TECNICO" && session.user.role !== "ADMIN")) {
    redirect("/login")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/equipamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          clienteId: session.user.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao criar equipamento")
      }

      const equipamento = await response.json()
      setEquipamentoCriado(equipamento)
      setShowQrDialog(true)
    } catch (error) {
      alert("Erro ao salvar equipamento. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/tecnico" className="flex items-center">
                <span className="text-xl font-bold text-[#0277bd]">REFRI</span>
                <span className="text-xl font-bold text-[#ffc107]">GELAR</span>
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600">Novo Equipamento</span>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tecnico">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Cadastrar Novo Equipamento
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados do Cliente */}
          <Card>
            <CardHeader>
              <CardTitle>Dados do Cliente</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clienteNome">Nome do Cliente *</Label>
                <Input
                  id="clienteNome"
                  name="clienteNome"
                  value={formData.clienteNome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clienteTelefone">Telefone *</Label>
                <Input
                  id="clienteTelefone"
                  name="clienteTelefone"
                  value={formData.clienteTelefone}
                  onChange={handleChange}
                  placeholder="(98) 99999-9999"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clienteEmail">E-mail</Label>
                <Input
                  id="clienteEmail"
                  name="clienteEmail"
                  type="email"
                  value={formData.clienteEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="clienteEndereco">Endereço Completo *</Label>
                <Input
                  id="clienteEndereco"
                  name="clienteEndereco"
                  value={formData.clienteEndereco}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Dados do Equipamento */}
          <Card>
            <CardHeader>
              <CardTitle>Dados do Equipamento</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="marca">Marca *</Label>
                <Input
                  id="marca"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  placeholder="Ex: Samsung, LG, Consul"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modelo">Modelo *</Label>
                <Input
                  id="modelo"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numeroSerie">Número de Série *</Label>
                <Input
                  id="numeroSerie"
                  name="numeroSerie"
                  value={formData.numeroSerie}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacidadeBTU">Capacidade (BTU) *</Label>
                <Input
                  id="capacidadeBTU"
                  name="capacidadeBTU"
                  value={formData.capacidadeBTU}
                  onChange={handleChange}
                  placeholder="Ex: 9000, 12000, 18000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipoEquipamento">Tipo de Equipamento *</Label>
                <select
                  id="tipoEquipamento"
                  name="tipoEquipamento"
                  value={formData.tipoEquipamento}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Split Hi-Wall">Split Hi-Wall</option>
                  <option value="Split Piso Teto">Split Piso Teto</option>
                  <option value="Split Cassete">Split Cassete</option>
                  <option value="Ar de Janela">Ar de Janela</option>
                  <option value="Portátil">Portátil</option>
                  <option value="Multi-Split">Multi-Split</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="localInstalacao">Local de Instalação *</Label>
                <Input
                  id="localInstalacao"
                  name="localInstalacao"
                  value={formData.localInstalacao}
                  onChange={handleChange}
                  placeholder="Ex: Sala, Quarto 1"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Dados do Serviço */}
          <Card>
            <CardHeader>
              <CardTitle>Dados do Serviço</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataServico">Data do Serviço *</Label>
                <Input
                  id="dataServico"
                  name="dataServico"
                  type="date"
                  value={formData.dataServico}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipoServico">Tipo de Serviço *</Label>
                <select
                  id="tipoServico"
                  name="tipoServico"
                  value={formData.tipoServico}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Instalação">Instalação</option>
                  <option value="Manutenção Preventiva">Manutenção Preventiva</option>
                  <option value="Manutenção Corretiva">Manutenção Corretiva</option>
                  <option value="Higienização">Higienização</option>
                  <option value="Reparo">Reparo</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="descricao">Descrição do Serviço *</Label>
                <Textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pecasUtilizadas">Peças Utilizadas</Label>
                <Input
                  id="pecasUtilizadas"
                  name="pecasUtilizadas"
                  value={formData.pecasUtilizadas}
                  onChange={handleChange}
                  placeholder="Ex: Filtro, capacitor, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proximaManutencao">Próxima Manutenção Recomendada</Label>
                <Input
                  id="proximaManutencao"
                  name="proximaManutencao"
                  type="date"
                  value={formData.proximaManutencao}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observacoes">Observações Técnicas</Label>
                <Textarea
                  id="observacoes"
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacidade */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="publico"
                  checked={formData.publico}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, publico: checked as boolean })
                  }
                />
                <Label htmlFor="publico" className="font-normal">
                  Página pública (qualquer pessoa pode visualizar com o QR Code)
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="bg-[#0277bd] hover:bg-[#01579b]"
              disabled={loading}
            >
              {loading ? (
                "Salvando..."
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Equipamento
                </>
              )}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/tecnico">Cancelar</Link>
            </Button>
          </div>
        </form>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={showQrDialog} onOpenChange={setShowQrDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Check className="w-6 h-6 text-green-500" />
              Equipamento Cadastrado!
            </DialogTitle>
          </DialogHeader>
          {equipamentoCriado && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-2">Código do Equipamento</p>
                <p className="text-2xl font-bold text-[#0277bd]">{equipamentoCriado.codigo}</p>
              </div>
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg border">
                  <QrCode className="w-32 h-32 text-gray-800" />
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                O QR Code foi gerado e está pronto para impressão.
              </p>
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-[#0277bd] hover:bg-[#01579b]"
                  onClick={() => window.print()}
                >
                  Imprimir Etiqueta
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setShowQrDialog(false)
                    router.push("/tecnico/equipamentos")
                  }}
                >
                  Ver Equipamentos
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
