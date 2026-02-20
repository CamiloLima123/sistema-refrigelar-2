import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Criar usuário admin
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@refrigelar.com' },
    update: {},
    create: {
      email: 'admin@refrigelar.com',
      name: 'Administrador',
      password: adminPassword,
      role: 'ADMIN',
      active: true,
    },
  })

  // Criar usuário técnico de exemplo
  const tecnicoPassword = await bcrypt.hash('tecnico123', 10)
  const tecnico = await prisma.user.upsert({
    where: { email: 'tecnico@refrigelar.com' },
    update: {},
    create: {
      email: 'tecnico@refrigelar.com',
      name: 'Técnico Exemplo',
      phone: '(98) 99999-9999',
      password: tecnicoPassword,
      role: 'TECNICO',
      active: true,
    },
  })

  // Criar usuário cliente de exemplo
  const clientePassword = await bcrypt.hash('cliente123', 10)
  const cliente = await prisma.user.upsert({
    where: { email: 'cliente@exemplo.com' },
    update: {},
    create: {
      email: 'cliente@exemplo.com',
      name: 'Cliente Exemplo',
      phone: '(98) 98888-8888',
      password: clientePassword,
      role: 'CLIENTE',
      active: true,
    },
  })

  console.log('Seed executado com sucesso!')
  console.log('Admin:', admin.email, 'Senha: admin123')
  console.log('Técnico:', tecnico.email, 'Senha: tecnico123')
  console.log('Cliente:', cliente.email, 'Senha: cliente123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
