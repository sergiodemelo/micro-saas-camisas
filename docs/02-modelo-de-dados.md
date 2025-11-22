# Modelo de Dados – Micro SaaS

## Tabelas Principais
- lojas
- usuarios
- clientes
- pedidos
- itens_pedido
- uploads_pedido
- configuracoes_loja
- conversas_ia
- atendimentos

Cada tabela está devidamente relacionada por `loja_id` para aderência ao modelo SaaS multi-tenant.

## Resumo das Relações
lojas 1—N usuarios  
lojas 1—N clientes  
lojas 1—N pedidos  
pedidos 1—N itens_pedido  
pedidos 1—N uploads_pedido  
clientes 1—N pedidos  
