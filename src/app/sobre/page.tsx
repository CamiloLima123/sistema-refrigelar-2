import Link from "next/link"
import { 
  Calendar, 
  CheckCircle, 
  Users, 
  Award,
  Target,
  Heart,
  Phone
} from "lucide-react"
import { Button, Card, CardContent } from "@/components/ui"
import { Navbar } from "@/components/navbar"
import { whatsappLink } from "@/lib/utils"

const valores = [
  {
    icon: Heart,
    title: "Compromisso",
    description: "Comprometidos com a satisfação de cada cliente.",
  },
  {
    icon: Award,
    title: "Qualidade",
    description: "Serviços executados com excelência e materiais de primeira.",
  },
  {
    icon: Target,
    title: "Pontualidade",
    description: "Respeitamos seu tempo e cumprimos prazos.",
  },
]

const timeline = [
  { year: "2011", event: "Fundação da REFRIGELAR" },
  { year: "2015", event: "Expansão da equipe técnica" },
  { year: "2018", event: "10.000 serviços executados" },
  { year: "2021", event: "Certificação técnica avançada" },
  { year: "2024", event: "20.000 serviços executados" },
]

export default function SobrePage() {
  const whatsappNumber = "5598985855278"

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-[#0277bd] to-[#01579b] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Sobre a REFRIGELAR</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            13 anos de experiência em refrigeração e ar condicionado em São Luís - MA
          </p>
        </div>
      </section>

      {/* História */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa História</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  A REFRIGELAR foi fundada em 2011 com uma missão clara: oferecer serviços 
                  de refrigeração e ar condicionado com qualidade, honestidade e compromisso 
                  em São Luís - MA.
                </p>
                <p>
                  Ao longo de 13 anos, construímos uma sólida reputação no mercado, 
                  atendendo mais de 5.000 clientes e executando mais de 20.000 serviços 
                  com excelência.
                </p>
                <p>
                  Nossa equipe é formada por técnicos certificados e em constante 
                  atualização, prontos para atender desde residências até grandes 
                  empresas com a mesma dedicação.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Calendar className="w-8 h-8 mx-auto text-[#0277bd] mb-2" />
                  <div className="text-2xl font-bold text-gray-900">13+</div>
                  <div className="text-sm text-gray-600">Anos</div>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 mx-auto text-[#0277bd] mb-2" />
                  <div className="text-2xl font-bold text-gray-900">20k+</div>
                  <div className="text-sm text-gray-600">Serviços</div>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 mx-auto text-[#0277bd] mb-2" />
                  <div className="text-2xl font-bold text-gray-900">5k+</div>
                  <div className="text-sm text-gray-600">Clientes</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Linha do Tempo</h3>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 text-[#0277bd] font-bold">{item.year}</div>
                    <div className="flex-1 pb-4 border-b border-gray-200">
                      {item.event}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Valores</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Princípios que guiam nosso trabalho diário
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {valores.map((valor, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <valor.icon className="w-12 h-12 mx-auto text-[#0277bd] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{valor.title}</h3>
                  <p className="text-gray-600">{valor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0277bd]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Faça parte da nossa história
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Entre em contato e experimente o atendimento REFRIGELAR
          </p>
          <Button 
            size="lg" 
            className="bg-[#ffc107] text-gray-900 hover:bg-[#ffb300] font-semibold"
            asChild
          >
            <Link href={whatsappLink(whatsappNumber, "Olá! Gostaria de conhecer os serviços da REFRIGELAR.")} target="_blank">
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
