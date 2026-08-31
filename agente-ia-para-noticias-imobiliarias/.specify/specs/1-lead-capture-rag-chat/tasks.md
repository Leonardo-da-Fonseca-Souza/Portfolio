# Tasks: Captura de Leads e Chat de Notícias com IA RAG

**Input**: Design documents from `/.specify/specs/1-lead-capture-rag-chat/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and base configurations

- [x] T001 Initialize database container configuration with PostgreSQL and pgvector in [docker-compose.yml](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/docker-compose.yml)
- [x] T002 Configure database and Gemini API keys environment variables in [.env.example](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/backend/.env.example)
- [x] T003 [P] Verify declarative Postgres MCP Toolbox tools mapping in [tools.yaml](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/tools.yaml)

---

## Phase 2: Foundational (Infraestrutura de Banco e Conexão MCP)

**Purpose**: Database schema initialization, dependencies, and core server routing setup

- [x] T004 Define Python package requirements for backend (including ADK, pydantic, psycopg2) in [backend/requirements.txt](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/backend/requirements.txt)
- [x] T005 Implement physical database tables creation (leads, noticias) with HNSW indices in [backend/init_db.py](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/backend/init_db.py)
- [x] T006 Setup Google GenAI SDK integration wrapper in [backend/main.py](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/backend/main.py)
- [x] T007 Configure initial FastAPI base router endpoints hierarchy in [backend/main.py](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/backend/main.py)

---

## Phase 3: User Story 1 - Cadastro de Leads (Priority: P1) 🎯 MVP

**Goal**: Permitir que o visitante se cadastre fornecendo nome e e-mail, persistindo declarativamente no Postgres via ferramenta MCP `insert_lead` (atualizando o nome se o e-mail já existir).

**Independent Test**: Submeter dados válidos ao endpoint `/api/v1/lead` e validar a criação/atualização de registros na tabela `leads`.

### Implementation for User Story 1

- [x] T008 [P] [US1] Define validation schemas for Lead capturing in [backend/main.py](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/backend/main.py)
- [x] T009 [US1] Implement FastAPI endpoint `/api/v1/lead` calling Postgres MCP tool `insert_lead` in [backend/main.py](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/backend/main.py)
- [x] T010 [US1] Create frontend Lead Capture form interface layout in [frontend/src/components/sections/LeadForm.jsx](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/frontend/src/components/sections/LeadForm.jsx)
- [x] T011 [US1] Integrate Lead Capture form submission with backend endpoint in [frontend/src/App.jsx](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/frontend/src/App.jsx)

---

## Phase 4: User Story 2 - Agente RAG e Chat (Priority: P2)

**Goal**: Permitir interação com o Agente de IA para responder dúvidas imobiliárias com busca vetorial de proximidade e histórico de sessão no ToolContext.

**Independent Test**: Enviar mensagem para o chat do agente de IA e verificar que as respostas utilizam as notícias contidas no banco de dados e relembram mensagens anteriores da mesma sessão.

### Implementation for User Story 2

- [x] T012 [P] [US2] Define validation schemas for Chat messages in [backend/main.py](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/backend/main.py)
- [x] T013 [US2] Implement semantic search utility calling Postgres MCP tool `search_properties_vector` in [backend/main.py](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/backend/main.py)
- [x] T014 [US2] Implement chat endpoint `/api/v1/chat` leveraging Gemini ADK integration and `ToolContext` state logic in [backend/main.py](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/backend/main.py)
- [x] T015 [US2] Create responsive Chat UI panel in [frontend/src/components/sections/ChatBox.jsx](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/frontend/src/components/sections/ChatBox.jsx)
- [x] T016 [US2] Integrate Chat UI component tab views in [frontend/src/App.jsx](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/frontend/src/App.jsx)

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Visual corrections, error handling refactoring, and validation tests

- [x] T017 Customize fonts styling for chat UI in [frontend/src/index.css](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/frontend/src/index.css)
- [x] T018 Refine global exception handling for database RAG tool errors in [backend/main.py](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/backend/main.py)
- [x] T019 Run verification procedures detailed in [quickstart.md](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/.specify/specs/1-lead-capture-rag-chat/quickstart.md)
