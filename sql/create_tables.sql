-- =========================================================
-- create_tables.sql
-- Esquema inicial do banco para o micro SaaS de camisas
-- Banco alvo: PostgreSQL (Supabase)
-- =========================================================

-- Extensões (Supabase normalmente já tem, mas não custa garantir)
-- Se der erro de permissão no Supabase, pode remover esses comandos.
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================================================
-- TABELA: lojas
-- Cada loja é um cliente do SaaS (no início, só a sua)
-- =========================================================

CREATE TABLE IF NOT EXISTS lojas (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nome_fantasia       text NOT NULL,
    razao_social        text,
    cnpj                text,
    email_contato       text,
    whatsapp_contato    text,
    plano               text,              -- ex.: 'free', 'mensal', 'anual'
    ativa               boolean NOT NULL DEFAULT true,

    -- White-label / branding
    brand_nome_sistema   text,             -- ex.: "Camisas 10"
    brand_logo_url       text,
    brand_cor_primaria   text,             -- ex.: "#0F172A"
    brand_cor_secundaria text,
    dominio_personalizado text,            -- ex.: "app.sualoja.com"
    subdominio           text,             -- ex.: "minhaloja"

    created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lojas_ativa ON lojas (ativa);

-- =========================================================
-- TABELA: usuarios
-- Usuários que acessam o sistema (admin, vendedor)
-- =========================================================

CREATE TABLE IF NOT EXISTS usuarios (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    loja_id     uuid NOT NULL REFERENCES lojas(id) ON DELETE CASCADE,
    nome        text NOT NULL,
    email       text NOT NULL,
    role        text NOT NULL,             -- 'admin', 'vendedor'
    ativo       boolean NOT NULL DEFAULT true,
    created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_usuarios_loja ON usuarios (loja_id);
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios (email);

-- =========================================================
-- TABELA: clientes
-- Clientes finais que compram camisas
-- =========================================================

CREATE TABLE IF NOT EXISTS clientes (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    loja_id             uuid NOT NULL REFERENCES lojas(id) ON DELETE CASCADE,

    nome                text NOT NULL,
    whatsapp            text NOT NULL,
    email               text,
    cpf_criptografado   bytea,             -- CPF será criptografado na aplicação
    endereco            text,

    codigo_indicacao    text UNIQUE,       -- código para campanhas "indique e ganhe"
    indicado_por_id     uuid REFERENCES clientes(id), -- cliente que indicou

    observacoes         text,
    created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_clientes_loja ON clientes (loja_id);
CREATE INDEX IF NOT EXISTS idx_clientes_whatsapp ON clientes (whatsapp);

-- =========================================================
-- TABELA: pedidos
-- Pedidos de venda realizados pela loja
-- =========================================================

CREATE TABLE IF NOT EXISTS pedidos (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    loja_id         uuid NOT NULL REFERENCES lojas(id) ON DELETE CASCADE,
    cliente_id      uuid NOT NULL REFERENCES clientes(id),
    usuario_id      uuid REFERENCES usuarios(id),  -- quem registrou o pedido

    data_pedido     timestamptz NOT NULL DEFAULT now(),
    status          text NOT NULL,                -- 'aberto', 'aguardando_pagamento', 'pago', 'encomendado', 'em_transporte', 'entregue'
    forma_pagamento text,                         -- 'pix', 'cartao', 'dinheiro', etc.

    valor_total     numeric(12,2),
    custo_total     numeric(12,2),
    lucro_total     numeric(12,2),

    -- Dólar efetivamente utilizado neste pedido (copiado de configuracoes_loja no momento da criação)
    dolar_utilizado numeric(10,4),

    created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pedidos_loja ON pedidos (loja_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_cliente ON pedidos (cliente_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_status ON pedidos (status);
CREATE INDEX IF NOT EXISTS idx_pedidos_data ON pedidos (data_pedido);

-- =========================================================
-- TABELA: itens_pedido
-- Itens (camisas) de cada pedido
-- =========================================================

CREATE TABLE IF NOT EXISTS itens_pedido (
    id                          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    loja_id                     uuid NOT NULL REFERENCES lojas(id) ON DELETE CASCADE,
    pedido_id                   uuid NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,

    tipo_camisa                 text NOT NULL,    -- Torcedor, Retro, NBA, etc.
    time                        text NOT NULL,    -- Ex.: Flamengo, Real Madrid
    tamanho                     text NOT NULL,    -- P, M, G, GG, 2G, 3G, ...
    modelo                      text,             -- 1, 2, 3, goleiro, etc.

    personalizacao_nome_numero  boolean NOT NULL DEFAULT false,
    personalizacao_patch        boolean NOT NULL DEFAULT false,
    personalizacao_patrocinador boolean NOT NULL DEFAULT false,

    custo_usd                   numeric(10,2),
    custo_reais                 numeric(12,2),
    preco_venda                 numeric(12,2),
    lucro_item                  numeric(12,2),

    created_at                  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_itens_pedido_loja ON itens_pedido (loja_id);
CREATE INDEX IF NOT EXISTS idx_itens_pedido_pedido ON itens_pedido (pedido_id);

-- =========================================================
-- TABELA: uploads_pedido
-- Imagens anexadas aos pedidos (referência para o fornecedor)
-- =========================================================

CREATE TABLE IF NOT EXISTS uploads_pedido (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    loja_id     uuid NOT NULL REFERENCES lojas(id) ON DELETE CASCADE,
    pedido_id   uuid NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    url         text NOT NULL,                       -- URL do arquivo no Supabase Storage
    created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_uploads_pedido_loja ON uploads_pedido (loja_id);
CREATE INDEX IF NOT EXISTS idx_uploads_pedido_pedido ON uploads_pedido (pedido_id);

-- =========================================================
-- TABELA: configuracoes_loja
-- Configurações financeiras e gerais por loja
-- =========================================================

CREATE TABLE IF NOT EXISTS configuracoes_loja (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    loja_id         uuid NOT NULL UNIQUE REFERENCES lojas(id) ON DELETE CASCADE,

    dolar_padrao    numeric(10,4) NOT NULL,  -- ex.: 6.0000
    margem_minima   numeric(5,2),            -- ex.: 50.00 (%)

    atualizado_por  uuid REFERENCES usuarios(id),
    atualizado_em   timestamptz NOT NULL DEFAULT now(),

    created_at      timestamptz NOT NULL DEFAULT now()
);

-- =========================================================
-- TABELA: conversas_ia
-- Histórico de mensagens entre cliente e IA (WhatsApp, webchat, etc.)
-- =========================================================

CREATE TABLE IF NOT EXISTS conversas_ia (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    loja_id         uuid REFERENCES lojas(id) ON DELETE CASCADE,
    cliente_id      uuid REFERENCES clientes(id),

    origem          text NOT NULL,         -- 'whatsapp', 'web', 'instagram', etc.
    plataforma_id   text,                  -- ID da mensagem na plataforma
    mensagem        text NOT NULL,
    resposta_ia     text,
    tipo            text NOT NULL DEFAULT 'cliente',   -- 'cliente', 'ia', 'humano'

    created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_conversas_ia_loja ON conversas_ia (loja_id);
CREATE INDEX IF NOT EXISTS idx_conversas_ia_cliente ON conversas_ia (cliente_id);
CREATE INDEX IF NOT EXISTS idx_conversas_ia_tipo ON conversas_ia (tipo);

-- =========================================================
-- TABELA: atendimentos
-- Sessões de atendimento (um atendimento pode ter várias mensagens em conversas_ia)
-- =========================================================

CREATE TABLE IF NOT EXISTS atendimentos (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    loja_id         uuid REFERENCES lojas(id) ON DELETE CASCADE,
    cliente_id      uuid REFERENCES clientes(id),

    status          text NOT NULL DEFAULT 'aberto',     -- 'aberto', 'finalizado', 'convertido'
    origem          text,                               -- 'whatsapp', 'web', etc.

    created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_atendimentos_loja ON atendimentos (loja_id);
CREATE INDEX IF NOT EXISTS idx_atendimentos_cliente ON atendimentos (cliente_id);
CREATE INDEX IF NOT EXISTS idx_atendimentos_status ON atendimentos (status);

-- =========================================================
-- FIM DO SCRIPT
-- =========================================================
