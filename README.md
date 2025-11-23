# 🧩 Micro SaaS – Sistema de Pedidos e Vendas de Camisas de Futebol
### Uma plataforma moderna, responsiva, multi-loja e preparada para IA e WhatsApp  
**Status:** Em desenvolvimento  
**Última atualização:** 22/11/2025  

---

# 📘 Descrição

Este projeto é um **Micro SaaS** desenvolvido para vendedores e lojas que trabalham com camisas de futebol.  
O sistema permite:

- gerenciar clientes;  
- registrar pedidos;  
- calcular custos automaticamente (USD → BRL);  
- controlar fornecedores e preços;  
- manter medidas reais por tamanho e fornecedor;  
- enviar imagens ao fornecedor;  
- operar totalmente via celular;  
- integrar futuramente com IA e WhatsApp;  
- funcionar como uma plataforma multi-loja (SaaS comercial).

Ele foi estruturado desde o início para ser **simples para o vendedor**, mas **poderoso para escalar**.

---

# 🏗 Arquitetura

O sistema utiliza uma arquitetura moderna:

- **Frontend:** Next.js + TailwindCSS (mobile-first)  
- **Backend:** Supabase (PostgreSQL + Auth + Storage)  
- **Automação:** Supabase Edge Functions  
- **IA:** OpenAI (sugestão de tamanhos, atendimento inteligente, criação automática de pedidos)  
- **Mensageria:** Integração futura com WhatsApp Business  

---

# 🗄 Modelo de Dados

O banco possui:

### **Tabelas Globais (compartilhadas entre todas as lojas)**  
- fornecedores  
- fornecedor_produtos  
- tipos_produto  
- tamanhos  
- tamanhos_fornecedor  

### **Tabelas Privadas (multi-loja)**  
- lojas  
- usuarios  
- clientes  
- pedidos  
- itens_pedido  
- uploads_pedido  
- conversas_ia  
- atendimentos  

Todos os relacionamentos foram documentados em:

📄 [`docs/02-modelo-de-dados.md`](docs/02-modelo-de-dados.md)

---

# 📱 Telas Planejadas (MVP)

- Dashboard  
- Clientes  
- Pedidos  
- Itens de pedido  
- Fornecedores  
- Medidas e tamanhos  
- Tela mobile para vendedores  
- Configurações da loja (logo, cores, identidade visual)  

---

# 🤖 IA Integrada (Futuro)

A plataforma será capaz de:

- sugerir tamanho ideal com base em altura/peso/medidas;  
- interpretar fotos enviadas pelo cliente;  
- montar pedidos automaticamente;  
- realizar atendimento via WhatsApp;  
- classificar pedidos e repassar ao fornecedor;  
- identificar o melhor fornecedor por tipo de camisa.

Documentação de IA:  
📄 [`docs-ia/10-ia-visao-geral.md`](docs-ia/10-ia-visao-geral.md)

---

# 💬 Integração com WhatsApp (Futuro)

Fluxo planejado: Cliente → WhatsApp → IA → Supabase → IA → Cliente


A integração suportará:

- vendas via chat  
- consulta de catálogo  
- registro automático do cliente  
- criação de pedido via conversa  
- recebimento de imagens  
- confirmação de dados  
- envio automático do pedido ao fornecedor  

Documentação:  
📄 [`docs-ia/12-whatsapp-integracao.md`](docs-ia/12-whatsapp-integracao.md)

---

# 📦 Estrutura do Projeto

micro-saas-camisas/
│
├── docs/
│ ├── 00-visao-geral.md
│ ├── 01-arquitetura.md
│ ├── 02-modelo-de-dados.md
│ ├── 03-endpoints-api.md
│ ├── 04-fluxo-usuario.md
│ ├── 05-testes.md
│ ├── 06-changelog.md
│ ├── 07-manual-usuario.md
│ └── 09-planejamento-futuro.md
│
├── docs-ia/
│ ├── 10-ia-visao-geral.md
│ ├── 11-ia-fluxos.md
│ ├── 12-whatsapp-integracao.md
│ └── 13-agente-inteligente.md
│
├── sql/
│ ├── create_tables.sql
│ └── insert_data.sql
│
├── frontend/
├── backend/
├── tests/
├── assets/
└── README.md


---

# 🛠 Como Contribuir

Por enquanto, o projeto está sendo desenvolvido individualmente, mas seguirá um fluxo estruturado de commits:

1. Criar branch  
2. Desenvolver  
3. Atualizar documentação  
4. Criar PR  
5. Revisar  
6. Merge  

---

# 🚀 Roadmap Resumido

### **🔥 Atual**
- Medidas Jogador  
- Medidas Feminina  
- Medidas Infantil  

### **🟦 Próximos (curto prazo)**
- API Supabase  
- Tela de pedidos  
- Tela de clientes  

### **🟧 Médio prazo**
- Integração WhatsApp  
- IA para sugestão de tamanhos  
- Dashboard  

### **🟩 Longo prazo**
- Catálogo integrado  
- Sistema de afiliados  
- SaaS white-label completo  

---

# 👤 Autor

**Sérgio Melo**  
Criador e gestor do projeto.  

---

# 📄 Licença

Será definida futuramente (MIT / Proprietária / Comercial).



