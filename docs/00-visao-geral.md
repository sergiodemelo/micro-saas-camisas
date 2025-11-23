# 📘 Visão Geral do Sistema – Micro SaaS de Pedidos e Vendas de Camisas

## 🎯 Objetivo do Sistema
O sistema tem como finalidade oferecer uma plataforma completa, moderna e responsiva para gestão de vendas de camisas de futebol, contemplando:

- cadastro de clientes;
- criação e controle de pedidos;
- cálculo automático de custos (USD → BRL);
- acompanhamento de fornecedores e preços;
- organização de tamanhos e medidas por fornecedor;
- upload de imagens para confirmação do pedido;
- estrutura multi-loja (SaaS comercial);
- integração futura com IA e WhatsApp;
- catálogo integrado (futuro).

O sistema foi projetado desde o início para atender tanto:

- **pequenos vendedores**,  
- **lojas de camisas**,  
- **revendedores**,  
- **e operações que desejam escalar usando automação e IA**.

---

## 🧩 Escopo Atual (MVP)
A versão inicial engloba:

1. Gestão de clientes  
2. Gestão de pedidos  
3. Cadastro de fornecedores  
4. Cadastro de produtos e preços por fornecedor  
5. Tabela de tamanhos (adulto, feminino, infantil)  
6. Medidas detalhadas por fornecedor  
7. Conversão automática de dólar  
8. Upload de imagens do pedido  
9. Estrutura multi-loja  
10. Base para IA e automações

---

## 🚧 Escopo Futuro (planejado)
- Loja white-label (marca, logo e cores por loja)
- Sistema de afiliação (“Indique e Ganhe”)
- Catálogo de produtos integrado
- App mobile
- Dashboard gerencial
- IA para atendimento automático
- IA para recomendação de tamanho
- Integração com WhatsApp (venda via chat)
- Integração com gateways de pagamento (PIX/Cartão)
- Gestão financeira da loja
- Automação de fornecedores
- Exportação automática de pedidos

---

## 🏗 Arquitetura Geral do Sistema

### 🔹 Banco de Dados
- PostgreSQL (Supabase)
- Tabela multi-loja (modelo SaaS)
- Tabelas públicas (fornecedores, medidas)
- Tabelas privadas por loja (clientes, pedidos, itens)
- Tabelas auxiliares (tamanhos, tipos de produto)

### 🔹 Backend
- Rotas API (Next.js ou Supabase Functions)
- Autenticação via Supabase Auth
- RLS (Row Level Security) — ativado em fases futuras

### 🔹 Frontend
- Next.js  
- Mobile-first (projetado para uso via celular)
- TailwindCSS

### 🔹 IA (futuro)
- Agente inteligente com OpenAI
- Fluxo WhatsApp → IA → Supabase → IA → WhastApp
- Sugestão de tamanhos
- Criação automática de pedidos

---

## 🌐 Modelo de Operação: Multi-Loja (SaaS)
O sistema foi projetado desde a modelagem para ser um **SaaS multi-tenant**, permitindo que:

- cada loja tenha sua própria conta, domínio e identidade visual;
- tabelas sejam isoladas por `loja_id`;
- fornecedores e medidas sejam compartilhados entre todas as lojas;
- dados sensíveis sigam a LGPD.

Isso possibilita transformar o sistema em um **produto comercial** no futuro.

---

## 👥 Público-Alvo do Sistema
- Vendedores autônomos  
- Lojas de camisas  
- Revendedores de clubes  
- Criadores de conteúdo que desejam vender camisas  
- Operações com equipe de vendas  
- Times amadores ou organizadores de campeonatos  
- Qualquer pessoa que deseje vender camisas online com simplicidade

---

## 📦 Benefícios Principais
- Controle centralizado de clientes e pedidos  
- Padronização de tamanhos e medidas  
- Comparação entre fornecedores  
- Cálculo automático de custo, preço e lucro  
- Consulta rápida por celular  
- Estrutura escalável, segura e profissional  
- Preparado para expansão com IA e WhatsApp  

---

## 🏁 Conclusão
Este documento serve como visão geral do sistema e guia conceitual.  
Todas as outras documentações (arquitetura, modelo de dados, changelog, testes etc.) foram construídas com base nessa visão.

O projeto está sendo construído com foco em **organização**, **escalabilidade**, **uso real** e **preparo para IA e automação**, garantindo resultados sólidos no presente e suporte para crescimento futuro.
