# Physical Data Model: Captura de Leads e Chat de Notícias com IA RAG

Este documento especifica a modelagem física do banco de dados PostgreSQL para suportar a captura de leads e o armazenamento de notícias com busca vetorial baseada na extensão `pgvector`.

## Extensões Habilitadas

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

## Tabelas

### 1. `leads`

Armazena as informações dos visitantes que se cadastraram no formulário da landing page.

```sql
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Índices e Restrições
- `UNIQUE(email)`: Garante que não existam cadastros duplicados com o mesmo endereço de e-mail.
- No caso de conflito de inserção de e-mail duplicado, a query declarativa configurada no Postgres MCP Toolbox executará o update do nome correspondente:
  ```sql
  INSERT INTO leads (nome, email) 
  VALUES ($1, $2) 
  ON CONFLICT (email) 
  DO UPDATE SET nome = EXCLUDED.nome;
  ```

### 2. `noticias`

Armazena notícias e clippings processados pelo agente imobiliário, contendo o vetor de embedding associado ao conteúdo textual para busca vetorial.

```sql
CREATE TABLE IF NOT EXISTS noticias (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    vetor_embedding VECTOR(768), -- Dimensões correspondentes ao gemini-embedding-001 (768 dimensões)
    data_publicacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Índices e Otimização de Busca Vetorial
- Criação de índice do tipo HNSW (Hierarchical Navigable Small World) para otimizar a velocidade das consultas por similaridade de cosseno:
  ```sql
  CREATE INDEX IF NOT EXISTS noticias_vetor_idx ON noticias USING hnsw (vetor_embedding vector_cosine_ops);
  ```
