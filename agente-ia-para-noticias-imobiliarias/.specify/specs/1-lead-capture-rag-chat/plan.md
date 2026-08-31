# Implementation Plan: Captura de Leads e Chat de Notícias com IA RAG

**Branch**: `1-lead-capture-rag-chat` | **Date**: 2026-08-26 | **Spec**: [.specify/specs/1-lead-capture-rag-chat/spec.md](file:///c:/Users/Usu%C3%A1rio/Documents/antigravity/agente-ia-para-noticias-imobiliarias/.specify/specs/1-lead-capture-rag-chat/spec.md)
**Input**: Feature specification from `/specs/1-lead-capture-rag-chat/spec.md`

## Summary

O objetivo é planejar e arquitetar os contratos e estruturas técnicas para suportar a Captura de Leads (Formulário no Frontend + API no Backend salvando no Postgres via MCP) e o Chat de Notícias com IA RAG (Interface de Chat + API RAG usando embeddings do Gemini e banco vetorial com pgvector, mantendo sessão no ToolContext).

## Technical Context

**Language/Version**: Python 3.11+ / Node.js (React Vite + Javascript)  
**Primary Dependencies**: FastAPI, Pydantic, `@google/genai` (Google ADK)  
**Storage**: PostgreSQL (com extensão `pgvector`)  
**Testing**: pytest, manual verification via browser  
**Target Platform**: Linux Server / Web Browser  
**Project Type**: Web application (backend + frontend)  
**Performance Goals**: Submissão de leads em < 2s; respostas do chat em < 5s  
**Constraints**: Sem SQLAlchemy ou queries brutas no código Python; estado do chat apenas no `ToolContext`  
**Scale/Scope**: MVP inicial  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **DB via MCP**: Todas as escritas e leituras do banco ocorrem de forma declarativa e segura por meio de ferramentas configuradas no `tools.yaml`.
- [x] **State via ToolContext**: O estado e o histórico de conversação do chat do agente de IA serão mantidos de forma exclusiva no `ToolContext` do Google ADK.
- [x] **Simplicity**: Segue estritamente as convenções do projeto.

## Project Structure

### Documentation (this feature)

```text
.specify/specs/1-lead-capture-rag-chat/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Research decisions
├── data-model.md        # Physical data model schema
├── quickstart.md        # Environment setup & run steps
└── contracts/           # API contract definition files (OpenAPI schemas)
```

### Source Code (repository root)

```text
backend/
├── main.py              # Backend logic (endpoints and ADK setup)
└── tests/

frontend/
├── src/
│   ├── components/      # UI components (LeadForm, ChatBox, design tokens)
│   ├── App.jsx          # Main client interface
│   └── index.css        # Core styles
└── tools.yaml           # Postgres MCP Config file (root)
```

**Structure Decision**: Web application layout containing `backend` for FastAPI services and `frontend` for React Vite client.
