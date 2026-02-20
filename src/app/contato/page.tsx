import Link from "next/link"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Instagram,
  Facebook,
  MessageCircle
} from "lucide-react"
import { Button, Card, CardContent } from "@/components/ui"
import { Navbar } from "@/components/navbar"
import { whatsappLink } from "@/lib/utils"

export default function ContatoPage() {
  const whatsappNumber = "5598985855278"
  const phoneNumber = "(98) 98585-5278"
  const email = "servrefrigelar@gmail.com"
  const address = "Av. São Luís Rei de França - Turu, São Luís - MA, 65065-470"

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-[#0277bd] to-[#01579b] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Estamos prontos para atender você. Escolha a melhor forma de contato.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
                <p className="text-gray-600 mb-4">{phoneNumber}</p>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600"
                  asChild
                >
                  <Link href={whatsappLink(whatsappNumber, "Olá! Gostaria de mais informações.")} target="_blank">
                    Iniciar Conversa
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-[#0277bd]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-[#0277bd]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Telefone</h3>
                <p className="text-gray-600 mb-4">{phoneNumber}</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  asChild
                >
                  <Link href={`tel:${whatsappNumber}`}>Ligar Agora</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">E-mail</h3>
                <p className="text-gray-600 mb-4 text-sm">{email}</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  asChild
                >
                  <Link href={`mailto:${email}`}>Enviar E-mail</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-[#ffc107]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-[#ffc107]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Endereço</h3>
                <p className="text-gray-600 mb-4 text-sm">{address}</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  asChild
                >
                  <Link 
                    href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver no Mapa
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Horário e Redes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Horário de Funcionamento</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <Clock className="w-6 h-6 text-[#0277bd]" />
                  <div>
                    <div className="font-semibold">Segunda a Sexta</div>
                    <div className="text-gray-600">08:00 às 17:30</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <Clock className="w-6 h-6 text-gray-400" />
                  <div>
                    <div className="font-semibold text-gray-500">Sábado e Domingo</div>
                    <div className="text-gray-500">Atendimento emergencial</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Redes Sociais</h2>
              <div className="space-y-4">
                <a 
                  href="https://instagram.com/refrigelar.serv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Instagram className="w-6 h-6 text-pink-600" />
                  <div>
                    <div className="font-semibold">Instagram</div>
                    <div className="text-gray-600">@refrigelar.serv</div>
                  </div>
                </a>
                <a 
                  href="https://facebook.com/servrefrigelar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Facebook className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-semibold">Facebook</div>
                    <div className="text-gray-600">@servrefrigelar</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0277bd]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Precisa de atendimento urgente?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Entre em contato pelo WhatsApp para atendimento rápido
          </p>
          <Button 
            size="lg" 
            className="bg-[#ffc107] text-gray-900 hover:bg-[#ffb300] font-semibold"
            asChild
          >
            <Link href={whatsappLink(whatsappNumber, "Olá! Preciso de atendimento urgente.")} target="_blank">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chamar no WhatsApp
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
