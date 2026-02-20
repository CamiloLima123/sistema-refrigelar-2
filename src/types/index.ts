export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: 'ADMIN' | 'TECNICO' | 'CLIENTE'
  active: boolean
}

export interface Equipamento {
  id: string
  codigo: string
  qrCode: string
  clienteId: string
  clienteNome: string
  clienteTelefone: string
  clienteEmail?: string
  clienteEndereco: string
  localInstalacao: string
  marca: string
  modelo: string
  numeroSerie: string
  capacidadeBTU: string
  tipoEquipamento: string
  tecnicoId: string
  tecnicoNome?: string
  publico: boolean
  proximaManutencao?: string
  createdAt: string
  updatedAt: string
  servicos?: Servico[]
  fotos?: Foto[]
}

export interface Servico {
  id: string
  equipamentoId: string
  tecnicoId: string
  tecnicoNome: string
  dataServico: string
  tipoServico: string
  descricao: string
  pecasUtilizadas?: string
  observacoes?: string
  assinaturaCliente?: string
  assinaturaData?: string
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO' | 'CANCELADO'
  proximaManutencao?: string
  createdAt: string
  fotos?: Foto[]
}

export interface Foto {
  id: string
  url: string
  descricao?: string
  createdAt: string
}

export interface ServicoFormData {
  clienteNome: string
  clienteTelefone: string
  clienteEmail?: string
  clienteEndereco: string
  localInstalacao: string
  marca: string
  modelo: string
  numeroSerie: string
  capacidadeBTU: string
  tipoEquipamento: string
  dataServico: string
  tipoServico: string
  descricao: string
  pecasUtilizadas?: string
  observacoes?: string
  proximaManutencao?: string
  fotos: File[]
  publico: boolean
}
