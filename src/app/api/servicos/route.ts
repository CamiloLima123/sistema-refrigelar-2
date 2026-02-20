import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET - Listar serviços
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const equipamentoId = searchParams.get("equipamentoId")

    let where: any = {}

    if (equipamentoId) {
      where.equipamentoId = equipamentoId
    }

    if (session.user.role === "TECNICO") {
      where.tecnicoId = session.user.id
    }

    const servicos = await prisma.servico.findMany({
      where,
      include: {
        fotos: true,
        equipamento: {
          select: {
            codigo: true,
            clienteNome: true,
            marca: true,
            modelo: true,
          }
        }
      },
      orderBy: { dataServico: "desc" }
    })

    return NextResponse.json(servicos)
  } catch (error) {
    console.error("Erro ao listar serviços:", error)
    return NextResponse.json(
      { error: "Erro ao listar serviços" },
      { status: 500 }
    )
  }
}

// POST - Criar serviço
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "TECNICO")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const data = await req.json()

    const servico = await prisma.servico.create({
      data: {
        equipamentoId: data.equipamentoId,
        tecnicoId: session.user.id,
        tecnicoNome: session.user.name,
        dataServico: new Date(data.dataServico),
        tipoServico: data.tipoServico,
        descricao: data.descricao,
        pecasUtilizadas: data.pecasUtilizadas,
        observacoes: data.observacoes,
        status: data.status || "CONCLUIDO",
        proximaManutencao: data.proximaManutencao ? new Date(data.proximaManutencao) : null,
      }
    })

    // Atualizar próxima manutenção do equipamento
    if (data.proximaManutencao) {
      await prisma.equipamento.update({
        where: { id: data.equipamentoId },
        data: { proximaManutencao: new Date(data.proximaManutencao) }
      })
    }

    return NextResponse.json(servico, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar serviço:", error)
    return NextResponse.json(
      { error: "Erro ao criar serviço" },
      { status: 500 }
    )
  }
}
