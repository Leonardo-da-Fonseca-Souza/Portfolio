# Design System & Especificação Visual

Este documento define o Design System, tokens visuais, paleta de cores, tipografia e mapeamento estrutural das telas do **ImoveisAI** (Agente de Notícias Imobiliárias), extraídos diretamente do arquivo do Figma.

---

## 🎯 Visão Geral da Interface

O painel administrativo do **ImoveisAI** é composto por uma SPA (Single Page Application) em tema escuro (Dark Mode) de alto contraste, com foco em monitoramento em tempo real do processamento de notícias de mercado imobiliário e distribuição para canais.

A interface possui quatro visualizações principais (Tabs):
1. **Feed de Notícias:** Lista de artigos processados pelo agente com pontuação de relevância (score IA), estado de moderação (Publicado, Aguardando, Em revisão, Descartado) e canais de destino de publicação.
2. **Fontes de Coleta:** Configuração e status dos crawlers ativos.
3. **Destinos de Publicação:** Status de integração com redes sociais (LinkedIn, Telegram, Beehiiv, Make.com webhook).
4. **Configuração:** Definição dos parâmetros operacionais do agente (LLM utilizado, score mínimo, limite de palavras, idioma e palavras-chave prioritárias).

---

## 🎨 Paleta de Cores e Equivalentes Tailwind

A interface utiliza uma paleta escura futurista baseada em azul-escuro com acentos em verde menta vibrante, acompanhado de cores de status semânticas com fundo translúcido (opacity 15%).

| Cor Figma | RGBA Real | Classe Tailwind Proposta / Customizada | Função no Sistema |
| :--- | :--- | :--- | :--- |
| **`#07091a`** | `rgba(7, 9, 26, 1.0)` | `bg-slate-950` / `bg-[#07091a]` | Background principal do app |
| **`#0d1130`** | `rgba(13, 17, 48, 1.0)` | `bg-[#0d1130]` | Background de seções/cards/cabeçalhos |
| **`#131840`** | `rgba(19, 24, 64, 1.0)` | `bg-[#131840]` / `hover:bg-[#131840]` | Hover de itens de lista e backgrounds de tags neutras |
| **`#00c896`** | `rgba(0, 200, 150, 1.0)` | `text-[#00c896]` / `bg-[#00c896]` | Verde marca (Cor ativa/primária, botões selecionados) |
| **`#00d492`** | `rgba(0, 212, 146, 1.0)` | `text-[#00d492]` | Cor ativa para badges e texto de status de sucesso |
| **`#00bc7d`** | `rgba(0, 188, 125, 0.15)` | `bg-[#00bc7d]/15` | Background translúcido de status "Publicado" |
| **`#ffffff`** | `rgba(255, 255, 255, 1.0)` | `text-white` | Texto primário, títulos principais e ícones ativos |
| **`#6b7499`** | `rgba(107, 116, 153, 1.0)` | `text-[#6b7499]` | Texto secundário (subtítulos, descrições, abas inativas) |
| **`#a0a8c0`** | `rgba(160, 168, 192, 1.0)` | `text-[#a0a8c0]` | Texto terciário/placeholder, tags de categorias |
| **`#ffb900`** | `rgba(255, 185, 0, 1.0)` | `text-[#ffb900]` | Amarelo para status "Aguardando" |
| **`#fe9a00`** | `rgba(254, 154, 0, 0.15)` | `bg-[#fe9a00]/15` | Background translúcido de status "Aguardando" |
| **`#ff6467`** | `rgba(255, 100, 103, 1.0)` | `text-[#ff6467]` | Vermelho para status "Descartado" / Erro |
| **`#fb2c36`** | `rgba(251, 44, 54, 0.15)` | `bg-[#fb2c36]/15` | Background translúcido de status "Descartado" |
| **`#51a2ff`** | `rgba(81, 162, 255, 1.0)` | `text-[#51a2ff]` | Azul para status "Em revisão" ou informativo |
| **`#2b7fff`** | `rgba(43, 127, 255, 0.15)` | `bg-[#2b7fff]/15` | Background translúcido de status "Em revisão" |

---

## 🔤 Escala Tipográfica

As três fontes padrão utilizadas na interface para criar hierarquia visual clara são:
- **Outfit:** Usada para títulos e valores métricos (display).
- **Inter:** Usada para corpo de textos, botões e descrições (sans-serif).
- **JetBrains Mono:** Usada para badges de categoria, metadados de score, contadores e código de endpoints (monospace).

### Tamanhos e Pesos

| Família | Peso | Tamanho | Line-height | Utilização |
| :--- | :--- | :--- | :--- | :--- |
| **Outfit** | 500 (Medium) | `24px` | `32px` | Título da seção (ex: "Fontes de Coleta", "Destinos de Publicação") |
| **Outfit** | 400 (Regular) | `16px` | `24px` | Títulos secundários |
| **Outfit** | 400 (Regular) | `14px` | `19.25px` | Títulos de cards de notícias e contadores métricos secundários |
| **Outfit** | 500 (Medium) | `12px` | `16px` | Botões de abas principais |
| **Inter** | 400 (Regular) | `16px` | `24px` | Corpo de texto principal |
| **Inter** | 400 (Regular) | `13px` | `21.125px` | Textos de descrição geral |
| **Inter** | 500 (Medium) | `14px` | `20px` | Texto de botões primários / Ações principais |
| **Inter** | 500 (Medium) | `12px` | `16px` | Rótulos secundários de links ou inputs |
| **JetBrains Mono** | 500 (Medium) | `11px` | `16.5px` | Filtros de categorias (ex: "TODOS", "FIIS", "MERCADO") |
| **JetBrains Mono** | 400 (Regular) | `11px` | `16.5px` | Contadores numéricos secundários (ex: "6 notícias") |
| **JetBrains Mono** | 500 (Medium) | `10px` | `15px` | Badges de status da notícia (ex: "Publicado", "FIIs", tags) |
| **JetBrains Mono** | 400 (Regular) | `9px` | `13.5px` | Rótulo pequeno (ex: "SCORE" abaixo da pontuação) |

---

## 📐 Estrutura das Seções (Wireframe / Grid)

A estrutura visual segue uma disposição fixa em container centrado:

### 1. Header (Navbar Superior)
- **Marca:** Alinhado à esquerda. Logotipo `ImoveisAI` seguido de um divisor vertical `|` e do subtítulo `Agente de Notícias Imobiliárias · Brasil`.
- **Status do Agente:** Alinhado à direita. Badge de status (`Agente Ativo` em `#00c896`) com o indicador de timestamp de execução (`Última execução: 08:47:12`).

### 2. Grid de Métricas (Stats Cards)
Uma linha horizontal contendo 4 cards de métricas iguais:
- **Card 1:** NOTÍCIAS PROCESSADAS: `1.847` (`+23 hoje` em verde)
- **Card 2:** PUBLICAÇÕES ENVIADAS: `943` (`+12 hoje` em verde)
- **Card 3:** SCORE MÉDIO IA: `84.2` (`+1.4 pts` em verde)
- **Card 4:** TAXA DE APROVAÇÃO: `78%` (`-2% semana` em vermelho)

### 3. Abas de Navegação (Tabs)
Barra horizontal de botões com cantos levemente arredondados:
- Botões: `Feed de Notícias`, `Fontes`, `Destinos`, `Configuração` (todas as abas mapeadas nos nós `1:79`, `1:534`, `1:782` e `6:79` respectivamente).
- O item ativo possui a borda ou background verde (`#00c896`).

### 4. Conteúdo Dinâmico (Tabs)

#### A. Feed de Notícias
- **Barra de Filtros:** Lista horizontal de categorias (`TODOS`, `FIIS`, `MERCADO`, `LANÇAMENTOS`, etc.) seguido do total à direita (`6 notícias`).
- **Lista de Notícias (Grid / List):** Cards de artigos contendo:
  - **Relevância:** Círculo com nota (ex: `94`) e legenda `SCORE`.
  - **Metadados:** Tags de estado (`Publicado`, `Aguardando`, etc.) e tags de categoria (`#FII`, `#Logística`).
  - **Conteúdo:** Título do artigo, portal de origem (ex: `Valor Econômico`), timestamp (`há 5 min`), e destinos em formato de texto/ícone (ex: `LinkedIn · Telegram`).

#### B. Fontes de Coleta
- **Título & Ação:** Título `Fontes de Coleta` e subtítulo `6 de 7 ativas · Ciclo de varredura: 15 min`. Botão `+ Adicionar fonte`.
- **Lista de Linhas:** Tabela/Lista contendo Nome do Site, URL e tempo desde a última coleta, além de status ativado/pausado (com checkbox ou switch).

#### C. Destinos de Publicação
- **Canais:** Lista de cards ou linhas exibindo destinos integrados (`LinkedIn`, `Telegram`, `Beehiiv`, `Twitter` - pausado, `Make Webhook`) mostrando a quantidade total de postagens efetuadas por cada um.
- **Área do Webhook:** Campo de texto contendo a URL de integração do Make.com com botão para `Copiar` no clipboard.

#### D. Configuração
- **Título & Parâmetros:** Título `Parâmetros do Agente IA` e campos de formulário para configuração:
  - **Modelo de Linguagem:** Menu suspenso (dropdown) exibindo o modelo selecionado (ex: `Claude 3.5 Sonnet`) e descrição `LLM usado para geração de resumos`.
  - **Score mínimo para publicação:** Campo numérico (ex: `75`) e descrição `Notícias abaixo do threshold vão para revisão`.
  - **Limite de palavras por resumo:** Campo numérico (ex: `120`) e descrição `Tamanho máximo dos clippings gerados`.
  - **Idioma de saída:** Menu suspenso (dropdown) exibindo o idioma selecionado (ex: `Português (Brasil)`) e descrição `Idioma dos resumos publicados`.
- **Palavras-chave Prioritárias:** Lista horizontal de tags contendo termos prioritários que guiam o agente (`FII`, `Fundos Imobiliários`, `SELIC`, `Crédito Imobiliário`, `Lançamentos`, `VGV`, `Vacância`, `IGPM`, `Minha Casa Minha Vida`, `CRI`, `CRA`) com botão `+ nova` para adicionar novos termos.
- **Botão de Ação:** Botão de submissão verde (`#00c896`) com o rótulo `Salvar configurações`.

### 5. Footer (Rodapé de Status)
- Linha de texto horizontal contendo informações de diagnóstico:
  `AGENTE RODANDO · CICLO #1.847  ·  6 FONTES ATIVAS  ·  PRÓXIMA VARREDURA: 08:52:00`
- Alinhado à direita: versão `ImoveisAI v0.9.1 · make.com/integração ativo`.
