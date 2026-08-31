# Research Decisions: Captura de Leads e Chat de Notícias com IA RAG

## Decisions

### 1. Database Persistence Pattern
- **Decision**: Usar o MCP Toolbox para PostgreSQL via arquivo `tools.yaml` na raiz do projeto.
- **Rationale**: Em total conformidade com a Regra I da Constituição do projeto. Evita o vazamento de SQL cru ou acoplamento de ORM (como SQLAlchemy) no código Python do backend.
- **Alternatives considered**: SQLAlchemy Core (rejeitado por infringir a Regra I).

### 2. Semantic Search Strategy
- **Decision**: Busca vetorial por similaridade de cosseno baseada no operador `<=>` do pgvector no PostgreSQL.
- **Rationale**: A busca por similaridade semântica direta no banco de dados permite associar notícias relacionadas de forma precisa. O uso do modelo `gemini-embedding-001` no parâmetro `embeddedBy` do `tools.yaml` permite a vetorização automática da entrada do usuário de forma transparente para o backend.
- **Alternatives considered**: Busca textual clássica (rejeitado por não ser semântica).

### 3. Session & History Memory State
- **Decision**: `ToolContext` do Google ADK para manter histórico de chat.
- **Rationale**: Alinhado com a Regra II da Constituição. Mantém o estado da conversa e a memória de contexto do LLM sem depender de bancos de dados adicionais ou variáveis globais de sessão no backend.
