# Arquitetura do Sistema

A arquitetura utiliza tecnologias modernas, seguras e escaláveis.

## Camadas do Sistema
- **Frontend:** Next.js (responsivo)
- **Backend:** Rotas API (Next.js) e/ou funções do Supabase
- **Banco:** Supabase (PostgreSQL)
- **Armazenamento:** Supabase Storage (imagens dos pedidos)
- **Autenticação:** Supabase Auth
- **IA (futuro):** Agentes OpenAI + WhatsApp API via n8n

## Estrutura Multi-Loja
Cada loja tem:
- Logo
- Nome do sistema (branding)
- Cores
- Configurações próprias
- Isolamento via `loja_id` e RLS

## Fluxo de Dados
Usuário → Frontend → API → Supabase → Retorno ao Frontend
