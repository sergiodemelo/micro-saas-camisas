import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

// LOJA PADRÃO (a sua!)
const LOJA_ID_PADRAO = '42331aa2-817a-4bd0-99a1-e9e195b1a420'

// Funções de formatação (máscaras)
function formatCpf(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''

  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(
    6,
    9
  )}-${digits.slice(9)}`
}

function formatCep(value) {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (!digits) return ''
  if (digits.length <= 5) return digits
  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

function formatTelefone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''

  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6)
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`

  if (digits.length <= 10) {
    // fixo: (21) 2222-2222
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  // celular: (21) 99999-9999
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function validarCPF(cpfStr) {
  const digits = cpfStr.replace(/\D/g, '')
  if (!digits) return true
  return digits.length === 11
}

function validarCEP(cepStr) {
  const digits = cepStr.replace(/\D/g, '')
  if (!digits) return true
  return digits.length === 8
}

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // campos
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')

  const [cpf, setCpf] = useState('')
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState('')
  const [complemento, setComplemento] = useState('')

  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    async function loadClientes() {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('loja_id', LOJA_ID_PADRAO)
        .order('nome', { ascending: true })

      if (error) {
        console.error(error)
        setError('Erro ao carregar clientes.')
      } else {
        setClientes(data)
      }

      setLoading(false)
    }

    loadClientes()
  }, [])

  async function handleSalvarCliente(e) {
    e.preventDefault()
    setError(null)

    // obrigatórios
    if (!nome.trim()) return setError('O nome é obrigatório.')
    if (!telefone.trim()) return setError('O telefone é obrigatório.')
    if (!email.trim()) return setError('O e-mail é obrigatório.')

    // formatos opcionais
    if (!validarCPF(cpf))
      return setError('CPF inválido. Formato correto: 000.000.000-00')

    if (!validarCEP(cep))
      return setError('CEP inválido. Formato correto: 00000-000')

    setSalvando(true)

    const { data, error } = await supabase
      .from('clientes')
      .insert([
        {
          loja_id: LOJA_ID_PADRAO,
          nome: nome.trim(),
          whatsapp: telefone.trim(),
          email: email.trim(),

          cpf: cpf.trim() || null,
          cep: cep.trim() || null,
          endereco: endereco.trim() || null,
          complemento: complemento.trim() || null,
        },
      ])
      .select()

    if (error) {
      console.error(error)
      setError('Erro ao salvar cliente.')
      setSalvando(false)
      return
    }

    // adiciona à lista local
    if (data && data.length > 0) {
      setClientes((prev) =>
        [...prev, data[0]].sort((a, b) =>
          a.nome.localeCompare(b.nome, 'pt-BR')
        )
      )
    }

    // limpa form
    setNome('')
    setTelefone('')
    setEmail('')
    setCpf('')
    setCep('')
    setEndereco('')
    setComplemento('')

    setSalvando(false)
  }

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h1>Clientes</h1>

      <form
        onSubmit={handleSalvarCliente}
        style={{
          marginTop: '16px',
          marginBottom: '24px',
          padding: '16px',
          border: '1px solid #ddd',
          borderRadius: '6px',
          maxWidth: '480px',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: '12px',
            color: '#1e4976',
            fontWeight: 600,
          }}
        >
          Novo Cliente
        </h2>

        {error && (
          <p style={{ color: 'red', marginBottom: '8px' }}>{error}</p>
        )}

        {/* Nome */}
        <div style={{ marginBottom: '8px' }}>
          <label style={label}>Nome*</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={input}
            placeholder="Ex.: João da Silva"
          />
        </div>

        {/* Telefone */}
        <div style={{ marginBottom: '8px' }}>
          <label style={label}>Telefone* (WhatsApp)</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(formatTelefone(e.target.value))}
            style={input}
            placeholder="(21) 99999-0000"
          />
        </div>

        {/* E-mail */}
        <div style={{ marginBottom: '8px' }}>
          <label style={label}>E-mail*</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
            placeholder="nome@email.com"
          />
        </div>

        {/* CPF */}
        <div style={{ marginBottom: '8px' }}>
          <label style={label}>CPF (opcional)</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(formatCpf(e.target.value))}
            style={input}
            placeholder="000.000.000-00"
          />
        </div>

        {/* CEP */}
        <div style={{ marginBottom: '8px' }}>
          <label style={label}>CEP (opcional)</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(formatCep(e.target.value))}
            style={input}
            placeholder="00000-000"
          />
        </div>

        {/* Endereço */}
        <div style={{ marginBottom: '8px' }}>
          <label style={label}>Endereço (opcional)</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            style={input}
            placeholder="Rua, número, bairro"
          />
        </div>

        {/* Complemento */}
        <div style={{ marginBottom: '12px' }}>
          <label style={label}>Complemento (opcional)</label>
          <input
            type="text"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
            style={input}
            placeholder="Apto 101, bloco 2..."
          />
        </div>

        <button
          type="submit"
          disabled={salvando}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#1e4976',
            color: 'white',
            fontWeight: 500,
          }}
        >
          {salvando ? 'Salvando...' : 'Salvar cliente'}
        </button>
      </form>

      {/* LISTA */}
      {loading && <p>Carregando...</p>}

      {!loading && clientes.length === 0 && (
        <p>Nenhum cliente cadastrado.</p>
      )}

      {!loading && clientes.length > 0 && (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
            color: '#000',
          }}
        >
          <thead>
            <tr>
              <th style={th}>Nome</th>
              <th style={th}>Telefone</th>
              <th style={th}>E-mail</th>
              <th style={th}>CPF</th>
              <th style={th}>CEP</th>
              <th style={th}>Endereço</th>
              <th style={th}>Complemento</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id}>
                <td style={td}>{c.nome}</td>
                <td style={td}>{c.whatsapp}</td>
                <td style={td}>{c.email}</td>
                <td style={td}>{c.cpf}</td>
                <td style={td}>{c.cep}</td>
                <td style={td}>{c.endereco}</td>
                <td style={td}>{c.complemento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const th = {
  border: '1px solid #ccc',
  padding: '8px',
  backgroundColor: '#1e4976',
  color: 'white',
  textAlign: 'left',
}

const td = {
  border: '1px solid #ddd',
  padding: '8px',
}

const input = {
  width: '100%',
  padding: '6px 8px',
  boxSizing: 'border-box',
  backgroundColor: '#ffffff',
  color: '#000000',
  border: '1px solid #ccc',
  borderRadius: '4px',
}

const label = {
  display: 'block',
  marginBottom: '4px',
  color: '#333',
  fontWeight: 500,
}
