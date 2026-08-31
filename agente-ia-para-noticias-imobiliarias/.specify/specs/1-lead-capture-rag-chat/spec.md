# Feature Specification: Captura de Leads e Chat de Notícias com IA RAG

**Feature Branch**: `1-lead-capture-rag-chat`  
**Created**: 2026-08-26  
**Status**: Draft  
**Input**: User description: "Metas de Funcionalidades para o Agente de Notícias Imobiliárias: História de Usuário 1 (P1 - Captura de Leads): O visitante deve conseguir cadastrar nome e e-mail. Esses dados devem ser persistidos no banco de dados. História de Usuário 2 (P2 - Chat de Notícias com IA RAG): O usuário deve conseguir interagir com o Agente de IA para tirar dúvidas sobre o mercado imobiliário. O agente de IA deve consultar uma base de dados vetorizada para responder. Requisitos de Persistência (Postgres MCP): Fica definido o cumprimento da Regra I da nossa Constituição: Todas as escritas e leituras de banco de dados devem ocorrer de forma declarativa e segura por meio de ferramentas do MCP Toolbox para PostgreSQL configuradas no arquivo tools.yaml. Não usaremos SQLAlchemy ou SQL cru no código Python do backend. Requisitos de Memória e Sessão: Fica definido o cumprimento da Regra II da nossa Constituição: O estado e o histórico de conversação do agente do chat serão controlados exclusivamente através do ToolContext do Google ADK."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Captura de Leads (Priority: P1)

Como um visitante da landing page, quero poder cadastrar meu nome e meu e-mail para receber notícias relevantes e novidades do mercado imobiliário.

**Why this priority**: Crucial para a tração e geração de contatos da plataforma. É o ponto de entrada da jornada do cliente.

**Independent Test**: Submeter o formulário de cadastro com nome e e-mail válidos, e verificar no banco de dados se os dados foram persistidos exatamente como enviados.

**Acceptance Scenarios**:

1. **Given** que o visitante está na seção de cadastro da landing page, **When** ele preencher o nome com "João Silva", o e-mail com "joao.silva@exemplo.com" e clicar em enviar, **Then** o formulário é enviado com sucesso, exibe uma mensagem de confirmação e os dados são salvos no banco de dados.
2. **Given** que o visitante está na seção de cadastro, **When** ele tenta enviar o formulário sem preencher o nome ou o e-mail, **Then** a interface impede o envio e exibe um erro de validação nos campos obrigatórios.
3. **Given** que o visitante insere um e-mail com formato inválido (ex: "joao.silva@exemplo"), **When** ele clicar em enviar, **Then** o formulário impede o envio e exibe uma mensagem de validação de e-mail inválido.

---

### User Story 2 - Chat de Notícias com IA RAG (Priority: P2)

Como um usuário interessado no mercado imobiliário, quero interagir com o Agente de IA para tirar dúvidas sobre notícias, imóveis e tendências de mercado, recebendo respostas precisas e fundamentadas na base de dados vetorizada.

**Why this priority**: É o diferencial competitivo e a funcionalidade principal de entrega de valor cognitivo da aplicação. Depende da captura de leads ou do acesso de visitantes qualificados.

**Independent Test**: Enviar uma mensagem de pergunta em linguagem natural no chat (ex: "Como está a captação do HGLG11?") e obter uma resposta condizente fundamentada nas notícias armazenadas na base vetorial (ex: citando a captação de R$ 1,2 bi do HGLG11).

**Acceptance Scenarios**:

1. **Given** que o usuário abriu a aba do Chat de Notícias com IA, **When** ele enviar uma dúvida sobre tendências recentes de fundos imobiliários, **Then** o agente consulta a base de dados via busca vetorial, processa o contexto e exibe a resposta baseada exclusivamente nas notícias da base.
2. **Given** que uma conversa com o agente já foi iniciada e contém mensagens anteriores, **When** o usuário fizer uma pergunta de acompanhamento (ex: "E quanto a dividendos?"), **Then** o agente mantém o contexto das mensagens anteriores utilizando exclusivamente o histórico mantido no `ToolContext`.
3. **Given** que o usuário faz uma pergunta sobre um tema completamente fora do mercado imobiliário (ex: "Qual a distância até a Lua?"), **When** o agente processar, **Then** o agente responde de forma amigável dizendo que seu escopo é focado em notícias imobiliárias.

---

### Edge Cases

- **Email Duplicado**: Se o visitante tentar cadastrar um e-mail que já existe na base de leads, o sistema atualizará o nome correspondente no banco de dados e completará a operação de cadastro retornando sucesso para o usuário.
- **Busca Vetorial Sem Resultados**: Quando a dúvida do usuário não possuir similaridade semântica com nenhuma notícia na base de dados vetorizada, o agente deve responder educadamente informando que não encontrou notícias recentes sobre o assunto específico.
- **Falha no Serviço RAG/LLM**: Se a API de embeddings do Gemini ou a consulta do MCP falhar, o agente deve retornar uma resposta amigável de erro temporário no chat sem quebrar a interface ou a sessão.
- **Histórico Excedendo Limite**: Se o histórico de conversação armazenado no `ToolContext` ficar muito grande, deve ser aplicado um mecanismo de remoção das mensagens mais antigas (sliding window) para evitar estourar o limite de tokens do contexto do modelo.

## Clarifications

### Session 2026-08-26
- Q: Comportamento de Lead Duplicado → A: Option A (Atualizar o nome existente e retornar sucesso).


## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O formulário de captura de leads MUST exigir o preennemto de nome e e-mail válidos antes do envio.
- **FR-002**: O sistema MUST salvar os dados de leads de forma puramente declarativa no banco de dados PostgreSQL usando a ferramenta `insert_lead` configurada no `tools.yaml`.
- **FR-003**: O backend do Python MUST se comunicar com o banco de dados exclusivamente por meio das ferramentas expostas pelo MCP Toolbox para PostgreSQL, sendo proibido o uso de SQLAlchemy ou queries SQL cruas.
- **FR-004**: O Chat de Notícias com IA MUST realizar buscas vetoriais semânticas por similaridade de cosseno usando a ferramenta `search_properties_vector` configurada no `tools.yaml`.
- **FR-005**: O sistema MUST utilizar o modelo de embeddings do Gemini configurado no `tools.yaml` para vetorizar as consultas de texto do usuário antes de realizar a busca no banco.
- **FR-006**: O agente de IA MUST manter e controlar todo o estado e histórico de conversação do chat de maneira isolada através do `ToolContext` do Google ADK.
- **FR-007**: A resposta do chat MUST exibir referências ou fontes das notícias consultadas quando a resposta for baseada em informações da base RAG.

### Key Entities

- **Lead**: Representa o visitante interessado. Atributos: `id`, `nome`, `email`, `data_cadastro`.
- **Noticia**: Representa os artigos e clippings coletados pelo agente. Atributos: `id`, `titulo`, `conteudo`, `vetor_embedding`.
- **ChatSession**: Representa o histórico de conversas entre o usuário e o agente de IA mantido em memória temporária via `ToolContext`. Atributos: `session_id`, `messages` (lista de objetos contendo role e content).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O cadastro do lead deve ser concluído e persistido no banco de dados em menos de 2 segundos após o clique no botão de envio em condições normais de rede.
- **SC-002**: A resposta do Chat de Notícias RAG (incluindo vetorização e inferência de resposta do agente) deve ser entregue na interface do usuário em menos de 5 segundos.
- **SC-003**: 100% das transações de leitura e escrita de dados com o banco de dados PostgreSQL devem ser mapeadas declarativamente via MCP Toolbox no arquivo `tools.yaml`.
- **SC-004**: 100% do histórico de conversação do chat de uma sessão ativa deve ser retido de forma consistente em chamadas sucessivas do agente utilizando exclusivamente a estrutura de `ToolContext`.
