# Quickstart: Captura de Leads e Chat de Notícias com IA RAG

## Requisitos de Sistema
- Docker & Docker Compose (para o PostgreSQL)
- Python 3.11+ (Backend)
- Node.js (Frontend)

## Configuração do Ambiente

1. **Variáveis de Ambiente**:
   Crie um arquivo `.env` na raiz do projeto contendo as credenciais de banco e IA:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=imoveisai
   DB_USER=postgres
   DB_PASSWORD=suasenha
   GEMINI_API_KEY=sua_gemini_api_key
   ```

2. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

3. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Verificação das Ferramentas MCP (Postgres MCP Toolbox)

O arquivo de configuração `tools.yaml` na raiz do projeto está mapeado com as credenciais declarativas. Certifique-se de que a conexão `postgres_db` e as ferramentas `insert_lead` e `search_properties_vector` estão carregadas corretamente pelo MCP host local.
