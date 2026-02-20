import Link from "next/link"
import { 
  Wind, 
  Wrench, 
  Calendar, 
  Zap, 
  Thermometer, 
  Settings,
  ArrowRight,
  Phone
} from "lucide-react"
import { Button, Card, CardContent } from "@/components/ui"
import { Navbar } from "@/components/navbar"
import { whatsappLink } from "@/lib/utils"

const allServices = [
  {
    icon: Wind,
    title: "Instalação de Ar Condicionado",
    description: "Instalação completa e profissional de ar condicionado split, janela e portátil. Inclui furação, instalação de suporte, conexão de tubulação e teste completo do sistema.",
    features: ["Split Hi-Wall", "Split Piso Teto", "Split Cassete", "Ar de Janela"],
  },
  {
    icon: Wrench,
    title: "Manutenção Corretiva",
    description: "Reparos em equipamentos com problemas de funcionamento, vazamentos, barulhos anormais ou falta de refrigeração. Diagnóstico preciso e solução definitiva.",
    features: ["Diagnóstico completo", "Troca de peças", "Recarga de gás", "Conserto de placas"],
  },
  {
    icon: Calendar,
    title: "Manutenção Preventiva",
    description: "Revisão periódica do equipamento para evitar problemas futuros e garantir o funcionamento eficiente. Ideal para prolongar a vida útil do aparelho.",
    features: ["Limpeza de filtros", "Verificação de pressão", "Inspeção de componentes", "Relatório técnico"],
  },
  {
    icon: Settings,
    title: "Higienização Completa",
    description: "Limpeza profunda do equipamento eliminando fungos, bactérias e ácaros. Essencial para a saúde respiratória da sua família ou funcionários.",
    features: ["Limpeza química", "Higienização de tubulação", "Eliminação de odores", "Ar mais puro"],
  },
  {
    icon: Zap,
    title: "Instalação Elétrica",
    description: "Instalação e adequação da parte elétrica para suportar a carga do ar condicionado. Inclui disjuntor, cabeamento e tomada dedicada.",
    features: ["Cabeamento adequado", "Disjuntor dedicado", "Aterramento", "Conforme normas"],
  },
  {
    icon: Thermometer,
    title: "Câmara Fria",
    description: "Instalação e manutenção de câmaras frias para comércios e indústrias. Soluções sob medida para suas necessidades de refrigeração.",
    features: ["Projeto personalizado", "Instalação completa", "Manutenção", "Reparos"],
  },
]

export default function ServicosPage() {
  const whatsappNumber = "5598985855278"

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-[#0277bd] to-[#01579b] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Nossos Serviços</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Oferecemos soluções completas em refrigeração e ar condicionado 
            com qualidade e garantia.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <service.icon className="w-12 h-12 text-[#0277bd] mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-sm text-gray-700">
                        <ArrowRight className="w-4 h-4 text-[#ffc107]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-[#0277bd] hover:bg-[#01579b]"
                    asChild
                  >
                    <Link href={whatsappLink(whatsappNumber, `Olá! Gostaria de solicitar orçamento para ${service.title}.`)} target="_blank">
                      <Phone className="w-4 h-4 mr-2" />
                      Solicitar Orçamento
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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
