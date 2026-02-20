import Link from "next/link"
import { 
  Wind, 
  Wrench, 
  Calendar, 
  CheckCircle, 
  Phone, 
  MapPin, 
  Clock,
  Star,
  Users,
  Award
} from "lucide-react"
import { Button, Card, CardContent } from "@/components/ui"
import { Navbar } from "@/components/navbar"
import { whatsappLink } from "@/lib/utils"

const services = [
  {
    icon: Wind,
    title: "Instalação",
    description: "Instalação profissional de ar condicionado split e janela com garantia.",
  },
  {
    icon: Wrench,
    title: "Manutenção",
    description: "Manutenção preventiva e corretiva para todos os modelos.",
  },
  {
    icon: Calendar,
    title: "Higienização",
    description: "Limpeza completa do equipamento para ar mais puro e saudável.",
  },
]

const diferenciais = [
  { icon: CheckCircle, text: "Técnicos certificados" },
  { icon: CheckCircle, text: "Garantia de 90 dias" },
  { icon: CheckCircle, text: "Atendimento emergencial" },
  { icon: CheckCircle, text: "Orçamento sem compromisso" },
]

const stats = [
  { icon: Calendar, value: "13+", label: "Anos de experiência" },
  { icon: CheckCircle, value: "20.000+", label: "Serviços executados" },
  { icon: Users, value: "5.000+", label: "Clientes atendidos" },
  { icon: Star, value: "4.9", label: "Avaliação média" },
]

export default function Home() {
  const whatsappNumber = "5598985855278"

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0277bd] to-[#01579b] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Especialistas em <span className="text-[#ffc107]">Ar Condicionado</span>
              </h1>
              <p className="text-xl text-blue-100">
                Instalação, manutenção e conserto com garantia. 
                Mais de 20.000 serviços executados em 13 anos de experiência.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#ffc107] text-gray-900 hover:bg-[#ffb300] font-semibold"
                  asChild
                >
                  <Link href={whatsappLink(whatsappNumber, "Olá! Gostaria de solicitar um orçamento.")} target="_blank">
                    <Phone className="w-5 h-5 mr-2" />
                    Solicitar Orçamento
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-[#0277bd]"
                  asChild
                >
                  <Link href="/servicos">Conhecer Serviços</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative w-96 h-96">
                <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
                <div className="absolute inset-4 bg-white/20 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Wind className="w-32 h-32 text-[#ffc107]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto text-[#0277bd] mb-3" />
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Oferecemos soluções completas para seu conforto térmico
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <service.icon className="w-12 h-12 text-[#0277bd] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild className="bg-[#0277bd] hover:bg-[#01579b]">
              <Link href="/servicos">Ver Todos os Serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Por que escolher a <span className="text-[#0277bd]">REFRIGELAR</span>?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Somos uma empresa consolidada no mercado de São Luís, 
                com compromisso de qualidade e satisfação garantida.
              </p>
              <div className="space-y-4">
                {diferenciais.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <item.icon className="w-6 h-6 text-[#ffc107]" />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0277bd] rounded-2xl p-8 text-white">
              <Award className="w-16 h-16 text-[#ffc107] mb-6" />
              <h3 className="text-2xl font-bold mb-4">Garantia de Qualidade</h3>
              <p className="text-blue-100 mb-6">
                Todos os nossos serviços possuem garantia de 90 dias. 
                Em caso de qualquer problema, atendemos rapidamente sem custo adicional.
              </p>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#0277bd]"
                asChild
              >
                <Link href="/sobre">Conheça Nossa História</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0277bd]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Precisa de assistência técnica?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Entre em contato agora mesmo e receba atendimento rápido e profissional
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#ffc107] text-gray-900 hover:bg-[#ffb300] font-semibold"
              asChild
            >
              <Link href={whatsappLink(whatsappNumber, "Olá! Preciso de assistência técnica.")} target="_blank">
                <Phone className="w-5 h-5 mr-2" />
                Falar no WhatsApp
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-[#0277bd]"
              asChild
            >
              <Link href="/contato">Outras Formas de Contato</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-white">REFRI</span>
                <span className="text-2xl font-bold text-[#ffc107]">GELAR</span>
              </div>
              <p className="text-sm">
                Especialistas em refrigeração e ar condicionado em São Luís - MA.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-[#ffc107]">Início</Link></li>
                <li><Link href="/servicos" className="hover:text-[#ffc107]">Serviços</Link></li>
                <li><Link href="/sobre" className="hover:text-[#ffc107]">Sobre</Link></li>
                <li><Link href="/contato" className="hover:text-[#ffc107]">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (98) 98585-5278
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Av. São Luís Rei de França - Turu
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Seg - Sex: 8h às 17:30
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Redes Sociais</h4>
              <div className="flex gap-4">
                <a 
                  href="https://instagram.com/refrigelar.serv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#ffc107]"
                >
                  Instagram
                </a>
                <a 
                  href="https://facebook.com/servrefrigelar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#ffc107]"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} REFRIGELAR Serviços LTDA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
