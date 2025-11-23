# 🚀 Planejamento Futuro – Micro SaaS de Camisas
## Documento Oficial de Roadmap  
Atualizado em: 22/11/2025

---

# 📘 1. Objetivo

Este documento consolida o **planejamento futuro** do projeto, organizado por fases, prioridades, funcionalidades previstas e visão estratégica.  
Ele serve como guia para orientar decisões, coordenar desenvolvimento e acompanhar a evolução do sistema até a versão SaaS comercial.

---

# 🧭 2. Fases do Projeto (Roadmap Geral)

## 🔵 **Fase 1 — Estruturação Inicial (BANCO + DOCUMENTAÇÃO) – CONCLUÍDA**
- Criação do projeto Supabase  
- Definição do modelo de dados  
- Criação das tabelas multi-loja  
- Criação das tabelas globais (fornecedores, produtos, tipos, tamanhos)  
- Criação da tabela de medidas por fornecedor  
- Inserção do primeiro fornecedor  
- Inserção dos tipos de produto  
- Criação e inserção dos tamanhos  
- Inserção das medidas da categoria Torcedor  
- Organização do repositório local  
- Criação da documentação-base  
- Criação do changelog  
- Documentação completa até 22/11/2025  

Status: **100% concluído**

---

## 🟦 **Fase 2 — Completar medidas e dados (BANCO)**  
**Status atual: Em andamento**

Tarefas:
- Inserir medidas da categoria Jogador  
- Inserir medidas da categoria Feminina  
- Inserir medidas da categoria Infantil  
- Revisar todos os tamanhos e medidas  
- Criar VIEW consolidada (opcional)  
- Criar SELECT geral de medidas por categoria/tamanho  

---

## 🟩 **Fase 3 — Backend e API (Supabase + Functions)**  
Tarefas:
- Criar endpoints para:
  - clientes  
  - pedidos  
  - itens_pedido  
  - uploads  
  - fornecedores  
  - medidas  
- Criar funções serverless para:
  - cálculo automático de custo e lucro  
  - atualização de pedidos  
  - manipulação de imagens (se necessário)  
- Criar policies RLS para multi-loja  
- Criar tokens e regras de acesso  

---

## 🟧 **Fase 4 — Frontend (Next.js + Tailwind)**  
Tarefas:
- Tela de login e criação de loja  
- Dashboard da loja  
- Tela de pedidos  
- Tela de itens de pedido  
- Tela de clientes  
- Tela de fornecedores  
- Tela de medidas e tamanhos  
- Tela de configurações da loja  
- Tela mobile-first  
- Tema personalizável com logo da loja (white-label)  

---

## 🟪 **Fase 5 — IA integrada ao sistema**  
Tarefas:
- IA para sugestão de tamanho  
- IA para calcular automaticamente o custo baseado no fornecedor  
- IA para interpretar fotos enviadas pelo cliente  
- IA para gerar pedidos automaticamente  
- IA para responder dúvidas via chat integrado  
- IA para recomendar fornecedor ideal baseado no tipo de camisa  

---

## 🟫 **Fase 6 — Integração WhatsApp**  
(Muito importante para vendas)

Tarefas:
- Criar canal WhatsApp Business (Meta API ou UltraMsg/Z-API)  
- Definir fluxo de conversa (cliente → IA → sistema)  
- Criar webhook para receber mensagens  
- Criar automação para criar pedidos via WhatsApp  
- IA para atendimento automático  
- IA para entender imagens de camisas enviadas  
- IA para solicitar dados do cliente  
- Envio automático do catálogo (futuro)  

---

## 🟨 **Fase 7 — Catálogo Integrado (futuro)**  
Tarefas:
- Tela de catálogo interna  
- Exportação de catálogo  
- Link público para compartilhamento  
- Integração do fornecedor com catálogo  
- Imagens automáticas geradas por IA (futuro)  
- Organização do catálogo por time, ano, liga etc.  

---

## 🟫 **Fase 8 — Comercialização como SaaS**  
Tarefas:
- Tela “Minha Loja” com identidade visual  
- Plano mensal e anual  
- Módulo de cobrança e assinaturas  
- Painel administrativo (owner)  
- Suporte ao cliente  
- Onboarding guiado  
- Tabelas públicas para fornecedores  
- Segurança reforçada (RLS por loja)  
- Políticas de privacidade (LGPD)  

---

# 📌 3. Funcionalidades Prioritárias (Curto Prazo)

1. Completar as medidas de Jogador, Feminina e Infantil  
2. Criar API básica dos pedidos  
3. Criar tela inicial de pedidos  
4. Criar tela de cadastro de clientes  
5. Criar tela de fornecedores  
6. Criar fluxo de criação de pedido com:
   - seleção de fornecedor  
   - seleção de tamanho  
   - preço automático  
   - upload de imagens  

---

# 📌 4. Funcionalidades Prioritárias (Médio Prazo)

- Relatórios  
- Dashboard  
- Comparação entre fornecedores  
- Histórico de pedidos por cliente  
- Sistema de indicação (“Indique e ganhe”)  
- Personalização por loja (cores, logo, identidade visual)  

---

# 📌 5. Funcionalidades Prioritárias (Longo Prazo)

- IA avançada (agente full no WhatsApp)  
- Módulo financeiro completo  
- Aplicativo mobile (React Native)  
- Catálogo profissional interno  
- Venda com pagamento integrado  
- Perfil de usuário com permissões (admin/vendedor)  

---

# 🎯 6. Visão Estratégica

A visão do sistema é se tornar:

> **“O melhor sistema de vendas de camisas personalizado do Brasil, com IA integrada e operação multiplataforma”.**

Características-chave da visão:

- **SaaS completo**  
- **IA conversacional**  
- **Automação máxima**  
- **Totalmente mobile-first**  
- **Integrado com WhatsApp**  
- **Arquitetura profissional e escalável**  
- **Preparado para milhares de lojas**  

---

# 🏁 7. Conclusão

Este planejamento documenta o **rumo do projeto**, garantindo clareza, organização e foco nas próximas etapas.  
Ele deverá ser atualizado semanalmente ou sempre que novas funcionalidades forem adicionadas ou ajustadas.

