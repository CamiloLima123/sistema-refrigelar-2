"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { 
  Eye, 
  EyeOff, 
  LogIn, 
  QrCode, 
  ArrowLeft,
  Camera,
  X
} from "lucide-react"
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const [scannedCode, setScannedCode] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      })

      if (result?.error) {
        setError("E-mail ou senha incorretos")
        setLoading(false)
        return
      }

      router.push(callbackUrl)
      router.refresh()
    } catch (error) {
      setError("Erro ao fazer login. Tente novamente.")
      setLoading(false)
    }
  }

  const handleQrScan = (code: string) => {
    setScannedCode(code)
    setQrDialogOpen(false)
    router.push(`/equipamento/${code}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0277bd] to-[#01579b] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center">
            <span className="text-3xl font-bold text-white">REFRI</span>
            <span className="text-3xl font-bold text-[#ffc107]">GELAR</span>
          </Link>
          <p className="text-blue-100 mt-2">Sistema de Gestão de Equipamentos</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Área Restrita</CardTitle>
            <CardDescription>
              Faça login para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="qrcode">
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Code
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#0277bd] hover:bg-[#01579b]"
                    disabled={loading}
                  >
                    {loading ? (
                      "Entrando..."
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 mr-2" />
                        Entrar
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="qrcode">
                <div className="text-center space-y-4">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <QrCode className="w-16 h-16 mx-auto text-[#0277bd] mb-4" />
                    <p className="text-gray-600 mb-4">
                      Escaneie o QR Code do equipamento para visualizar informações
                    </p>
                    <Button 
                      onClick={() => setQrDialogOpen(true)}
                      className="bg-[#0277bd] hover:bg-[#01579b]"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Escanear QR Code
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Ou digite o código manualmente:
                  </p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Código do equipamento"
                      value={scannedCode}
                      onChange={(e) => setScannedCode(e.target.value)}
                    />
                    <Button 
                      onClick={() => scannedCode && router.push(`/equipamento/${scannedCode}`)}
                      disabled={!scannedCode}
                    >
                      Buscar
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t text-center">
              <Link 
                href="/" 
                className="text-sm text-gray-500 hover:text-[#0277bd] flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para o site
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-blue-100 text-sm mt-8">
          © {new Date().getFullYear()} REFRIGELAR Serviços LTDA
        </p>
      </div>

      {/* QR Code Scanner Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Escanear QR Code
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setQrDialogOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-center p-4">
                <Camera className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                Câmera do dispositivo será ativada aqui
                <br />
                <span className="text-sm">
                  (Requer permissão de câmera)
                </span>
              </p>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Posicione o QR Code do equipamento na área de leitura
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Ou digite o código manualmente"
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
              />
              <Button 
                onClick={() => scannedCode && handleQrScan(scannedCode)}
                disabled={!scannedCode}
              >
                Buscar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
