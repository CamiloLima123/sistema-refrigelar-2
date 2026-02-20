import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateCodigoEquipamento, generateQRCodeData } from "@/lib/utils"

// GET - Listar equipamentos
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const clienteId = searchParams.get("clienteId")
    const tecnicoId = searchParams.get("tecnicoId")

    let where: any = {}

    if (session.user.role === "CLIENTE") {
      where.clienteId = session.user.id
    } else if (clienteId) {
      where.clienteId = clienteId
    }

    if (tecnicoId) {
      where.tecnicoId = tecnicoId
    }

    const equipamentos = await prisma.equipamento.findMany({
      where,
      include: {
        servicos: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        fotos: true,
        _count: {
          select: { servicos: true }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(equipamentos)
  } catch (error) {
    console.error("Erro ao listar equipamentos:", error)
    return NextResponse.json(
      { error: "Erro ao listar equipamentos" },
      { status: 500 }
    )
  }
}

// POST - Criar equipamento
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "TECNICO")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const data = await req.json()

    // Gerar código único e QR Code
    const codigo = generateCodigoEquipamento()
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"
    const qrCode = generateQRCodeData(codigo, baseUrl)

    const equipamento = await prisma.equipamento.create({
      data: {
        codigo,
        qrCode,
        clienteId: data.clienteId,
        clienteNome: data.clienteNome,
        clienteTelefone: data.clienteTelefone,
        clienteEmail: data.clienteEmail,
        clienteEndereco: data.clienteEndereco,
        localInstalacao: data.localInstalacao,
        marca: data.marca,
        modelo: data.modelo,
        numeroSerie: data.numeroSerie,
        capacidadeBTU: data.capacidadeBTU,
        tipoEquipamento: data.tipoEquipamento,
        tecnicoId: session.user.id,
        publico: data.publico ?? true,
        proximaManutencao: data.proximaManutencao ? new Date(data.proximaManutencao) : null,
      }
    })

    return NextResponse.json(equipamento, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar equipamento:", error)
    return NextResponse.json(
      { error: "Erro ao criar equipamento" },
      { status: 500 }
    )
  }
}
