import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Clientes from './Clientes'

function App() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categoriaFiltro, setCategoriaFiltro] = useState('') // vazio = todas
  const [editId, setEditId] = useState(null)
  const [editValues, setEditValues] = useState({
    comprimento_cm_min: '',
    comprimento_cm_max: '',
    largura_cm_min: '',
    largura_cm_max: '',
    altura_cm_min: '',
    altura_cm_max: '',
  })
  const [saving, setSaving] = useState(false)
  const [view, setView] = useState('tamanhos') // 'tamanhos' ou 'clientes'

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('vw_tamanhos_fornecedor_admin')
        .select('*')
        .order('fornecedor_nome', { ascending: true })
        .order('categoria_produto', { ascending: true })
        .order('faixa', { ascending: true })
        .order('genero', { ascending: true })
        .order('tamanho_codigo', { ascending: true })

      if (error) {
        console.error(error)
        setError('Erro ao carregar dados. Veja o console para detalhes.')
      } else {
        setRows(data || [])
      }

      setLoading(false)
    }

    // só carrega tamanhos se a view atual for tamanhos
    if (view === 'tamanhos') {
      loadData()
    }
  }, [view])

  // aplica filtro de categoria apenas na visualização
  const rowsFiltradas = categoriaFiltro
    ? rows.filter((r) => r.categoria_produto === categoriaFiltro)
    : rows

  function handleStartEdit(row) {
    setEditId(row.tamanho_fornecedor_id)
    setEditValues({
      comprimento_cm_min: row.comprimento_cm_min ?? '',
      comprimento_cm_max: row.comprimento_cm_max ?? '',
      largura_cm_min: row.largura_cm_min ?? '',
      largura_cm_max: row.largura_cm_max ?? '',
      altura_cm_min: row.altura_cm_min ?? '',
      altura_cm_max: row.altura_cm_max ?? '',
    })
    setError(null)
  }

  function handleChange(field, value) {
    setEditValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleCancelEdit() {
    setEditId(null)
    setSaving(false)
  }

  async function handleSaveEdit() {
    if (!editId) return

    setSaving(true)
    setError(null)

    const payload = {
      comprimento_cm_min: editValues.comprimento_cm_min
        ? Number(editValues.comprimento_cm_min)
        : null,
      comprimento_cm_max: editValues.comprimento_cm_max
        ? Number(editValues.comprimento_cm_max)
        : null,
      largura_cm_min: editValues.largura_cm_min
        ? Number(editValues.largura_cm_min)
        : null,
      largura_cm_max: editValues.largura_cm_max
        ? Number(editValues.largura_cm_max)
        : null,
      altura_cm_min: editValues.altura_cm_min
        ? Number(editValues.altura_cm_min)
        : null,
      altura_cm_max: editValues.altura_cm_max
        ? Number(editValues.altura_cm_max)
        : null,
    }

    const { error } = await supabase
      .from('tamanhos_fornecedor')
      .update(payload)
      .eq('id', editId)

    if (error) {
      console.error(error)
      setError('Erro ao salvar alterações. Veja o console para detalhes.')
      setSaving(false)
      return
    }

    // atualiza em memória
    setRows((prev) =>
      prev.map((row) =>
        row.tamanho_fornecedor_id === editId
          ? {
              ...row,
              ...payload,
            }
          : row
      )
    )

    setSaving(false)
    setEditId(null)
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      {/* MENU SIMPLE */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setView('tamanhos')}
          style={{
            ...menuBtn,
            backgroundColor: view === 'tamanhos' ? '#1e4976' : '#f0f0f0',
            color: view === 'tamanhos' ? 'white' : '#333',
          }}
        >
          Tamanhos do Fornecedor
        </button>
        <button
          onClick={() => setView('clientes')}
          style={{
            ...menuBtn,
            backgroundColor: view === 'clientes' ? '#1e4976' : '#f0f0f0',
            color: view === 'clientes' ? 'white' : '#333',
          }}
        >
          Clientes
        </button>
      </div>

      {view === 'tamanhos' && (
        <>
          <h1>Admin – Tamanhos do Fornecedor</h1>

          {/* Filtro de categoria */}
          <div style={{ marginTop: '12px', marginBottom: '12px' }}>
            <label style={{ marginRight: '8px', fontWeight: 'bold' }}>
              Categoria:
            </label>
            <select
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
              style={{ padding: '4px 8px' }}
            >
              <option value="">Todas</option>
              <option value="torcedor">Torcedor</option>
              <option value="jogador">Jogador</option>
              <option value="feminina">Feminina</option>
              <option value="infantil">Infantil</option>
            </select>
          </div>

          {loading && <p>Carregando...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {!loading && !error && (
            <table
              style={{
                borderCollapse: 'collapse',
                width: '100%',
                marginTop: '8px',
                fontSize: '14px',
              }}
            >
              <thead>
                <tr>
                  <th style={th}>Fornecedor</th>
                  <th style={th}>Categoria</th>
                  <th style={th}>Tamanho</th>
                  <th style={th}>Gênero</th>
                  <th style={th}>Faixa</th>
                  <th style={th}>Comp. (min)</th>
                  <th style={th}>Comp. (max)</th>
                  <th style={th}>Larg. (min)</th>
                  <th style={th}>Larg. (max)</th>
                  <th style={th}>Alt. (min)</th>
                  <th style={th}>Alt. (max)</th>
                  <th style={th}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {rowsFiltradas.map((row) => {
                  const isEditing = row.tamanho_fornecedor_id === editId

                  return (
                    <tr key={row.tamanho_fornecedor_id}>
                      <td style={td}>{row.fornecedor_nome}</td>
                      <td style={td}>{row.categoria_produto}</td>
                      <td style={td}>{row.tamanho_codigo}</td>
                      <td style={td}>{row.genero}</td>
                      <td style={td}>{row.faixa}</td>

                      {isEditing ? (
                        <>
                          <td style={td}>
                            <input
                              type="number"
                              value={editValues.comprimento_cm_min}
                              onChange={(e) =>
                                handleChange(
                                  'comprimento_cm_min',
                                  e.target.value
                                )
                              }
                              style={input}
                            />
                          </td>
                          <td style={td}>
                            <input
                              type="number"
                              value={editValues.comprimento_cm_max}
                              onChange={(e) =>
                                handleChange(
                                  'comprimento_cm_max',
                                  e.target.value
                                )
                              }
                              style={input}
                            />
                          </td>
                          <td style={td}>
                            <input
                              type="number"
                              value={editValues.largura_cm_min}
                              onChange={(e) =>
                                handleChange(
                                  'largura_cm_min',
                                  e.target.value
                                )
                              }
                              style={input}
                            />
                          </td>
                          <td style={td}>
                            <input
                              type="number"
                              value={editValues.largura_cm_max}
                              onChange={(e) =>
                                handleChange(
                                  'largura_cm_max',
                                  e.target.value
                                )
                              }
                              style={input}
                            />
                          </td>
                          <td style={td}>
                            <input
                              type="number"
                              value={editValues.altura_cm_min}
                              onChange={(e) =>
                                handleChange(
                                  'altura_cm_min',
                                  e.target.value
                                )
                              }
                              style={input}
                            />
                          </td>
                          <td style={td}>
                            <input
                              type="number"
                              value={editValues.altura_cm_max}
                              onChange={(e) =>
                                handleChange(
                                  'altura_cm_max',
                                  e.target.value
                                )
                              }
                              style={input}
                            />
                          </td>
                          <td style={td}>
                            <button
                              style={{
                                ...btn,
                                backgroundColor: '#28a745',
                                marginRight: '4px',
                              }}
                              onClick={handleSaveEdit}
                              disabled={saving}
                            >
                              {saving ? 'Salvando...' : 'Salvar'}
                            </button>
                            <button
                              style={{
                                ...btn,
                                backgroundColor: '#6c757d',
                              }}
                              onClick={handleCancelEdit}
                              disabled={saving}
                            >
                              Cancelar
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td style={td}>{row.comprimento_cm_min}</td>
                          <td style={td}>{row.comprimento_cm_max}</td>
                          <td style={td}>{row.largura_cm_min}</td>
                          <td style={td}>{row.largura_cm_max}</td>
                          <td style={td}>{row.altura_cm_min}</td>
                          <td style={td}>{row.altura_cm_max}</td>
                          <td style={td}>
                            <button
                              style={btn}
                              onClick={() => handleStartEdit(row)}
                            >
                              Editar
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </>
      )}

      {view === 'clientes' && <Clientes />}
    </div>
  )
}

const th = {
  border: '1px solid #1b3a57',
  padding: '6px 8px',
  backgroundColor: '#1e4976',
  color: 'white',
  textAlign: 'left',
  fontWeight: 'bold',
}

const td = {
  border: '1px solid #ddd',
  padding: '6px 8px',
}

const input = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '2px 4px',
}

const btn = {
  padding: '4px 8px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
}

const menuBtn = {
  padding: '8px 12px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  cursor: 'pointer',
  fontWeight: '500',
}

export default App
