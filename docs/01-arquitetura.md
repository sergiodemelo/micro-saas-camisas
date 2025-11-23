# 🏗 Arquitetura do Sistema – Micro SaaS de Camisas
## Documento Técnico Oficial  
Atualizado em: 22/11/2025

---

# 📘 1. Visão Geral da Arquitetura

O sistema segue uma arquitetura **modular, escalável e multi-tenant (SaaS)**, projetada para:

- suportar múltiplas lojas independentes;  
- oferecer alta segurança;  
- permitir crescimento com IA e automações;  
- ser responsivo (mobile-first);  
- integrar com WhatsApp e outros canais futuramente.

A arquitetura é composta por:

- **Frontend (Next.js / React / Tailwind)**  
- **Backend (API Supabase + funções serverless)**  
- **Banco de Dados (PostgreSQL/Supabase)**  
- **Armazenamento (Supabase Storage)**  
- **IA (OpenAI / agentes inteligentes)**  
- **Integrações externas (WhatsApp, pagamentos etc.)**

---

# 🧩 2. Componentes Principais

frontend (Next.js)
↓
backend (Supabase API)
↓
PostgreSQL (tabelas multi-loja + tabelas globais)
↓
Storage (imagens + uploads)
↓
IA (OpenAI)
↓
Integrações externas (WhatsApp, Pagamentos, etc.)


---

# 🗄️ 3. Banco de Dados

### ✔ PostgreSQL via Supabase  
O banco foi cuidadosamente modelado para:

- suportar multi-loja via `loja_id`;  
- manter fornecedores e tabelas de medidas como globais (compartilhadas);  
- organizar bem tamanhos, produtos e medidas;  
- preparar o sistema para IA;  
- permitir escalabilidade total para SaaS.

### ✔ Tabelas Globais  
Usadas por todas as lojas:

- fornecedores  
- fornecedor_produtos  
- tipos_produto  
- tamanhos  
- tamanhos_fornecedor  

### ✔ Tabelas por Loja (multi-tenant)  
- lojas  
- usuarios  
- clientes  
- pedidos  
- itens_pedido  
- uploads_pedido  
- conversas_ia  
- atendimentos  

### ✔ Segurança (planejada)  
O RLS (Row Level Security) será ativado quando o frontend começar a consumir dados.  
Isso garante que cada loja só veja seus próprios dados.

---

# 🧠 4. IA e Automação

O sistema foi **planejado desde o início** para:

### ✔ IA interna (OpenAI)  
- sugerir tamanhos  
- interpretar imagens de camisas enviadas  
- montar pedidos automaticamente  
- responder clientes (WhatsApp)  
- gerar resumo de pedidos  
- consultar fornecedores ideais

### ✔ IA no WhatsApp  
Fluxo futuro: Cliente → WhatsApp → IA → Supabase → IA → Cliente


Exemplos de funcionalidades:
- chatbot inteligente  
- vendedor automático  
- conferência de tamanho por foto  
- cadastro automático de cliente  
- geração de pedido por conversa  

---

# 📱 5. Frontend

### ✔ Tecnologias
- **Next.js 14+**  
- **React**  
- **TailwindCSS (mobile-first)**  
- **Shadcn/UI (componentes profissionais)**  
- **Zustand ou Redux Toolkit (estado)**  

### ✔ Principais telas planejadas

1. Login / Registro da loja  
2. Dashboard  
3. Pedidos  
4. Itens de pedido  
5. Upload de imagens  
6. Clientes  
7. Fornecedores  
8. Tamanhos / Medidas  
9. Configurações da loja (logo, cores, identidade visual)  
10. Tela mobile para uso rápido

### ✔ Responsividade  
Todo o sistema será projetado para uso intenso via celular — principal ambiente dos vendedores.

---

# 🔙 6. Backend

Como o Supabase já fornece:

- autenticação  
- banco  
- storage  
- permissões  
- RPC / Functions  

O backend será construído assim:

### ✔ API Primária
Via **RLS + Policies + Views + Funcs** do Supabase.

### ✔ API Secundária
Via **Supabase Edge Functions** (Node.js):

Usada para:
- cálculos de preço automático  
- integração com WhatsApp  
- IA (pre-processamento)  
- rotinas cron/automáticas  

---

# ☁️ 7. Supabase

Utilização do Supabase inclui:

### ✔ PostgreSQL  
Banco central com segurança por linha (RLS).

### ✔ Authentication  
Autenticação com e-mail/senha.

### ✔ Storage  
Onde ficarão armazenadas:
- imagens dos pedidos  
- imagens enviadas ao fornecedor  
- anexos de clientes (futuro)  

### ✔ Edge Functions  
Para processos de backend automatizados.

### ✔ Logs e Monitoramento  
Acompanhamento direto na plataforma.

---

# 🏷️ 8. Multi-Loja (SaaS Multi-Tenant)

O sistema foi projetado com:

- lojas independentes;  
- identidade visual por loja;  
- cadastro e login isolado;  
- fornecedores compartilhados;  
- pedidos, clientes e configurações exclusivos de cada loja;  
- escalabilidade horizontal (várias lojas simultâneas);  
- IA isolada por loja (futuro).

A separação é garantida por:

- `loja_id` em todas as tabelas privadas  
- RLS por loja  
- tokens únicos por usuário  

---

# 🔌 9. Integrações Externas (Futuras)

### 🟦 WhatsApp (Meta API / Z-API / UltraMsg)
- pedido automático por conversa  
- atendimento inteligente  
- envio automático de catálogo  
- sugestões de tamanho por IA  

### 🟧 pagamentos (futuro)
- PIX  
- Mercado Pago  
- Stripe  
- PagSeguro  

### 🟩 e-commerce / catálogo
- lojinha integrada  
- impressão de catálogo  
- geração automática de lista de camisas  

---

# 📦 10. Fluxo de Dados (simplificado)

Cliente → Pedido → Itens → Fornecedor → Medidas → Custo → Preço → WhatsApp (opcional)


Ou:

Vendedor → Sistema → Cálculo automático → Envio → Atualização do Pedido


---

# 🎯 11. Princípios de Arquitetura

- **Mobile-first**  
- **SaaS-ready**  
- **Modular**  
- **Redundante**  
- **Segurança por padrão (RLS)**  
- **IA integrada desde o começo**  
- **Expansível**  
- **Multi-loja**  
- **Foco em performance**

---

# 🏁 12. Conclusão

A arquitetura foi desenhada para escalar, receber IA, integrar com WhatsApp e atender múltiplas lojas com segurança.

Ela garante:

- organização  
- consistência  
- robustez  
- base sólida para crescer  
- estrutura profissional para um SaaS comercial  

A partir deste documento, qualquer desenvolvedor consegue entender **como o sistema funciona**, para manter ou expandir o projeto.



