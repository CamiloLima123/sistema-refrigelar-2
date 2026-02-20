import Link from "next/link"
import { 
  Wind, 
  Wrench, 
  Calendar, 
  Phone
} from "lucide-react"
import { Button, Card, CardContent, Badge } from "@/components/ui"
import { Navbar } from "@/components/navbar"
import { whatsappLink } from "@/lib/utils"

const trabalhos = [
  {
    tipo: "Instalação",
    cliente: "Residência - Calhau",
    descricao: "Instalação de ar condicionado split 12.000 BTU em sala de estar.",
    data: "Janeiro 2024",
    icon: Wind,
  },
  {
    tipo: "Manutenção",
    cliente: "Escritório - Renascença",
    descricao: "Manutenção preventiva em 5 equipamentos split.",
    data: "Fevereiro 2024",
    icon: Wrench,
  },
  {
    tipo: "Higienização",
    cliente: "Clínica - Jardim Renascença",
    descricao: "Higienização completa de 8 equipamentos.",
    data: "Março 2024",
    icon: Calendar,
  },
  {
    tipo: "Instalação",
    cliente: "Loja comercial - Centro",
    descricao: "Instalação de ar condicionado cassete 36.000 BTU.",
    data: "Março 2024",
    icon: Wind,
  },
  {
    tipo: "Reparo",
    cliente: "Residência - Cohama",
    descricao: "Conserto de vazamento e recarga de gás.",
    data: "Abril 2024",
    icon: Wrench,
  },
  {
    tipo: "Instalação",
    cliente: "Apartamento - São Francisco",
    descricao: "Instalação de 3 splits em quartos e sala.",
    data: "Maio 2024",
    icon: Wind,
  },
]

export default function TrabalhosPage() {
  const whatsappNumber = "5598985855278"

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-[#0277bd] to-[#01579b] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Trabalhos Realizados</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Conheça alguns dos nossos projetos recentes em São Luís e região.
          </p>
        </div>
      </section>

      {/* Trabalhos Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trabalhos.map((trabalho, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#0277bd]/10 rounded-lg flex items-center justify-center">
                      <trabalho.icon className="w-6 h-6 text-[#0277bd]" />
                    </div>
                    <Badge variant="secondary">{trabalho.tipo}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{trabalho.cliente}</h3>
                  <p className="text-gray-600 mb-4">{trabalho.descricao}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {trabalho.data}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#0277bd] mb-2">20.000+</div>
              <div className="text-gray-600">Serviços executados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0277bd] mb-2">5.000+</div>
              <div className="text-gray-600">Clientes atendidos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0277bd] mb-2">50+</div>
              <div className="text-gray-600">Bairros atendidos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0277bd] mb-2">4.9</div>
              <div className="text-gray-600">Avaliação média</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0277bd]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Quer ser nosso próximo cliente satisfeito?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Solicite um orçamento sem compromisso
          </p>
          <Button 
            size="lg" 
            className="bg-[#ffc107] text-gray-900 hover:bg-[#ffb300] font-semibold"
            asChild
          >
            <Link href={whatsappLink(whatsappNumber, "Olá! Gostaria de solicitar um orçamento.")} target="_blank">
              <Phone className="w-5 h-5 mr-2" />
              Falar no WhatsApp
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} REFRIGELAR Serviços LTDA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
