"use client"

import { useState } from "react"

export default function NovoUsuario() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [role, setRole] = useState("CLIENTE")

  async function salvar(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch("/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, role }),
    })

    if (res.ok) {
      alert("Usuário criado!")
    } else {
      alert("Erro ao criar usuário")
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Novo Usuário</h1>

      <form onSubmit={salvar} className="space-y-4 max-w-md">
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="border p-2 w-full"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="CLIENTE">Cliente</option>
          <option value="TECNICO">Técnico</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2">
          Salvar
        </button>
      </form>
    </main>
  )
}
