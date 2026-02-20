import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET - Buscar equipamento por ID ou código
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = params

    const equipamento = await prisma.equipamento.findFirst({
      where: {
        OR: [
          { id },
          { codigo: id }
        ]
      },
      include: {
        servicos: {
          include: {
            fotos: true
          },
          orderBy: { dataServico: "desc" }
        },
        fotos: true,
        tecnico: {
          select: { name: true }
        }
      }
    })

    if (!equipamento) {
      return NextResponse.json(
        { error: "Equipamento não encontrado" },
        { status: 404 }
      )
    }

    // Verificar permissão
    if (!equipamento.publico) {
      if (!session) {
        return NextResponse.json(
          { error: "Não autorizado" },
          { status: 401 }
        )
      }

      if (session.user.role === "CLIENTE" && equipamento.clienteId !== session.user.id) {
        return NextResponse.json(
          { error: "Não autorizado" },
          { status: 403 }
        )
      }
    }

    return NextResponse.json(equipamento)
  } catch (error) {
    console.error("Erro ao buscar equipamento:", error)
    return NextResponse.json(
      { error: "Erro ao buscar equipamento" },
      { status: 500 }
    )
  }
}

// PUT - Atualizar equipamento
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "TECNICO")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const data = await req.json()
    const { id } = params

    const equipamento = await prisma.equipamento.update({
      where: { id },
      data: {
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
        publico: data.publico,
        proximaManutencao: data.proximaManutencao ? new Date(data.proximaManutencao) : null,
      }
    })

    return NextResponse.json(equipamento)
  } catch (error) {
    console.error("Erro ao atualizar equipamento:", error)
    return NextResponse.json(
      { error: "Erro ao atualizar equipamento" },
      { status: 500 }
    )
  }
}

// DELETE - Excluir equipamento
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { id } = params

    await prisma.equipamento.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao excluir equipamento:", error)
    return NextResponse.json(
      { error: "Erro ao excluir equipamento" },
      { status: 500 }
    )
  }
}
