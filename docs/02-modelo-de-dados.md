# 🗄️ Modelo de Dados – Micro SaaS de Camisas
## Documento Oficial da Estrutura de Banco de Dados  
Atualizado em: 22/11/2025

---

# 📘 1. Visão Geral do Banco de Dados

O banco foi projetado com foco em:

- operação multi-loja (SaaS multi-tenant);
- padronização de produtos, tamanhos e medidas;
- controle completo de pedidos e clientes;
- unificação de fornecedores e preços;
- base para IA e automação via WhatsApp.

A arquitetura utiliza PostgreSQL (Supabase) e está dividida em:

- **Tabelas globais** (compartilhadas entre todas as lojas)
- **Tabelas por loja** (dados individuais de cada negócio)
- **Tabelas auxiliares** (tamanhos, tipos de produto)
- **Tabelas de IA** (conversas e atendimentos)

---

# 🧱 2. Diagrama Conceitual (Resumido)

lojas (global)
└── usuarios (multi-loja)
└── configuracoes_loja
└── clientes
└── pedidos
└── itens_pedido
└── uploads_pedido

fornecedores (global)
└── fornecedor_produtos
└── tamanhos_fornecedor → tamanhos

tipos_produto (global)
tamanhos (global)


---

# 🧩 3. Tabelas Principais (Multi-Loja)

## 3.1. **lojas**
Representa cada loja do sistema SaaS.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | Identificador da loja |
| nome | text | Nome da loja |
| slug | text | URL amigável (futuro) |
| created_at | timestamptz | Data de criação |

---

## 3.2. **usuarios**
Usuários que pertencem a cada loja.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | ID do usuário |
| loja_id | uuid (FK) | Loja que o usuário pertence |
| email | text | E-mail de login |
| senha_hash | text | Hash da senha |
| nome | text | Nome do usuário |
| role | text | "admin", "vendedor" |
| created_at | timestamptz | Criado em |

---

## 3.3. **clientes**
Cadastro de clientes da loja.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | ID |
| loja_id | uuid (FK) | Loja |
| nome | text | Nome do cliente |
| whatsapp | text | WhatsApp |
| email | text | E-mail |
| cpf | text | Opcional |
| endereco | text | Opcional |
| codigo_indicador | text | Para sistema de afiliação |
| created_at | timestamptz | Criado em |

---

## 3.4. **pedidos**
Registro principal de cada pedido.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | ID |
| loja_id | uuid (FK) | Loja |
| cliente_id | uuid (FK) | Cliente |
| status | text | aberto, pago, enviado, concluído |
| total_pedido | numeric | Valor total em R$ |
| total_custo | numeric | Custo total em R$ |
| lucro_total | numeric | Lucro |
| observacoes | text | Observações gerais |
| created_at | timestamptz | Criado |

---

## 3.5. **itens_pedido**
Lista dos itens de um pedido.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | ID |
| loja_id | uuid (FK) | Loja |
| pedido_id | uuid (FK) | Pedido |
| fornecedor_id | uuid (FK) | Fornecedor |
| tipo_camisa | text | Torcedor, Jogador etc. |
| time | text | Flamengo, Real Madrid |
| tamanho | text | P, M, 2XL |
| modelo | text | N° do modelo |
| personalizacao_nome_numero | boolean | Opção |
| personalizacao_patch | boolean | Opção |
| personalizacao_patrocinador | boolean | Opção |
| custo_usd | numeric | Custo em USD |
| custo_reais | numeric | Custo convertido |
| preco_venda | numeric | Preço ao cliente |
| lucro_item | numeric | Lucro líquido |
| created_at | timestamptz | Criado |

---

## 3.6. **uploads_pedido**
Armazena imagens que o vendedor envia ao fornecedor.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | ID |
| pedido_id | uuid (FK) | Pedido |
| item_id | uuid (FK) | Item |
| url_arquivo | text | URL no Supabase |
| created_at | timestamptz | Criado |

---

# 🌐 4. Tabelas Globais (Compartilhadas entre todas as lojas)

Essas tabelas não dependem de `loja_id`.  
São públicas para todo o SaaS.

---

## 4.1. **fornecedores**
Informações dos fornecedores internacionais/nacionais.

| Campo | Tipo |
|-------|------|
| id | uuid |
| tipo_fornecedor | fabrica / revendedor |
| nome | text |
| whatsapp_contato | text |
| url_catalogo | text |
| qualidade_produto | text |
| video_enviado | boolean |
| confiavel | boolean |
| tempo_loja_meses | integer |
| avaliacao_nota | integer (1–5) |
| comentarios | text |
| created_at | timestamptz |

---

## 4.2. **fornecedor_produtos**
Lista os tipos de produtos e preços em USD por fornecedor.

| Campo | Tipo |
|-------|------|
| id | uuid |
| fornecedor_id | uuid (FK) |
| tipo_produto | text |
| tipo_produto_id | uuid (FK) |
| preco_usd | numeric |
| observacoes | text |
| created_at | timestamptz |

---

# 🏷 5. Tabelas Auxiliares

## 5.1. **tipos_produto**
Todos os tipos de produtos disponíveis no SaaS.

| Campo | Tipo |
|-------|------|
| id | uuid |
| nome | text |
| categoria | camisa, feminino, infantil, extra, personalizacao, adicional_tamanho |
| ativo | boolean |
| created_at | timestamptz |

---

## 5.2. **tamanhos**
Tabela padrão de tamanhos.

| Campo | Tipo |
|-------|------|
| id | uuid |
| codigo_fornecedor | text (S, M, L, XL, 2XL etc.) |
| descricao_interna | text (P, M, G etc.) |
| genero | masculino, feminino, infantil |
| faixa | adulto, kids |
| ordem | integer |
| ativo | boolean |
| created_at | timestamptz |

---

## 5.3. **tamanhos_fornecedor**
Medidas reais de cada tamanho específico de cada fornecedor.

| Campo | Tipo |
|-------|------|
| id | uuid |
| fornecedor_id | uuid (FK) |
| tamanho_id | uuid (FK) |
| categoria_produto | torcedor, jogador, feminina, infantil |
| comprimento_cm_min | numeric |
| comprimento_cm_max | numeric |
| largura_cm_min | numeric |
| largura_cm_max | numeric |
| altura_cm_min | numeric |
| altura_cm_max | numeric |
| peso_min_kg | numeric |
| peso_max_kg | numeric |
| idade_min | numeric |
| idade_max | numeric |
| cintura_min | numeric |
| cintura_max | numeric |
| created_at | timestamptz |

---

# 🤖 6. Tabelas de IA

Tabelas para histórico de conversas e automações.

---

## 6.1. **conversas_ia**
Registra interações do vendedor ou cliente com IA (futuro WhatsApp).

## 6.2. **atendimentos**
Histórico consolidado de fluxos inteligentes gerados pela IA.

---

# 🔁 7. Relacionamentos Principais

- **loja 1 → N usuarios**  
- **loja 1 → N clientes**  
- **loja 1 → N pedidos**  
- **pedido 1 → N itens_pedido**  
- **itens_pedido 1 → N uploads_pedido**  
- **fornecedor 1 → N fornecedor_produtos**  
- **fornecedor 1 → N tamanhos_fornecedor**  
- **tamanhos 1 → N tamanhos_fornecedor**  
- **tipos_produto 1 → N fornecedor_produtos**  

---

# 🧭 8. Conclusão

Este documento descreve todo o modelo de dados do sistema, servindo como referência técnica oficial para desenvolvimento, testes, integração de IA, API e front-end.

Qualquer nova tabela, ajuste de campo ou relacionamento deverá ser registrado aqui para manter a coerência e evolução futura do projeto.
# Modelo de Dados — Atualizado em 23/11/2025 – 15:45

## ENTIDADES PRINCIPAIS

### **1. lojas**
Armazena informações básicas da loja:
- nome_fantasia  
- razao_social  
- cnpj  
- email_contato  
- nome_proprietario  
- contato_proprietario  

---

### **2. clientes**
Armazena os dados do cliente final:
- nome  
- whatsapp  
- email  
- cpf  
- cep  
- endereco  
- complemento  
- loja_id  

---

### **3. fornecedor_frete_regras**
Regras de frete por fornecedor.

Campos:
- fornecedor_id  
- min_itens  
- max_itens  
- frete_total_usd  
- frete_gratis  

---

### **4. pedidos_cliente**
Pedidos registrados pelo vendedor.

Campos:
- loja_id  
- cliente_id  
- fornecedor_id  
- modalidade_frete  
- dolar_frete_brl  
- frete_cobrado_brl  
- total_itens  
- total_venda_brl  
- status  

Relacionamentos:
- 1 cliente → N pedidos_cliente  
- 1 pedido_cliente → N itens_pedido_cliente  

---

### **5. itens_pedido_cliente**
Itens que o cliente comprou.

Campos:
- pedido_cliente_id  
- cliente_id  
- produto_id  
- categoria  
- tamanho  
- quantidade  
- preco_venda_brl  

---

### **6. pedidos_fornecedor**
Pedidos reais enviados ao fornecedor.

Campos:
- fornecedor_id  
- loja_id  
- total_usd_itens  
- frete_usd_total  
- valor_pago_brl  
- taxa_ml_brl  
- taxa_alfandega_brl  
- outros_custos_brl  
- dolar_efetivo  
- codigo_rastreio  

Relacionamentos:
- 1 pedido_fornecedor → N itens_pedido_fornecedor  

---

### **7. itens_pedido_fornecedor**
Representa cada item real comprado do fornecedor.

Campos:
- pedido_fornecedor_id  
- pedido_cliente_id  
- cliente_id  
- produto_id  
- valor_usd_item  
- frete_usd_item  
- custo_brl_item  
- preco_venda_brl  
- lucro_brl_item  
- margem_real  

---

## VISÃO GERAL DO FLUXO

Cliente faz pedido → vendedor registra → itens são armazenados →  
quando há compra no fornecedor → cria-se pedidos_fornecedor →  
itens são vinculados e custos calculados → lucro e margem consolidados.

Próximo passo: construir as interfaces do frontend para operar esse fluxo.

