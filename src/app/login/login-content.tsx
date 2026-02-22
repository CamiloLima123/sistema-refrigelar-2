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

import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui"

export default function LoginContent() {
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

  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  })

  if (result?.error) {
    setError("E-mail ou senha incorretos")
    setLoading(false)
    return
  }

  // ✅ REDIRECIONA PARA O PAINEL ADMIN
  router.push("/admin")
  router.refresh()
}

  const handleQrScan = (code: string) => {
    setScannedCode(code)
    setQrDialogOpen(false)
    router.push(`/equipamento/${code}`)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
  <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle>Entrar</CardTitle>
      <CardDescription>
        Acesse sua conta
      </CardDescription>
    </CardHeader>

    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <Label>E-mail</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Senha</Label>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <Button className="w-full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>

      </form>
    </CardContent>
  </Card>
</main>
  )
}
