# Cyron

> Uma rotina mais clara para pequenos escritórios de contabilidade.

Landing page para o Cyron, uma experiência conceitual de gestão de relacionamento, clientes, demandas e prazos.

**Status:** 🚧 projeto em desenvolvimento · demonstração interativa disponível

O projeto apresenta uma interface de produto, dados demonstrativos e uma direção visual baseada em glassmorphism discreto: superfícies translúcidas, bordas suaves, iluminação ambiente e movimento com propósito.

## 🚀 Executar localmente

Não há etapa de build nem dependências para instalar. Abra `index.html` diretamente no navegador ou sirva a raiz do projeto com Python:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Depois, acesse `http://127.0.0.1:4173`.

Não é necessário instalar dependências ou executar um processo de build. O servidor local é recomendado porque permite carregar corretamente os módulos, imagens e arquivos servidos pela página.

## 🧪 Verificação

Antes de publicar, valide a sintaxe do JavaScript:

```powershell
node --check app.js
```

Também é possível conferir a página diretamente no navegador em diferentes larguras, especialmente em 320px, 375px, 768px e desktop.

## 📁 Organização

```text
cyron/
├── index.html
├── styles.css
├── app.js
├── sitemap.xml
├── assets/
│   ├── hero-atmosphere.webp
│   └── vendor/
└── README.md
```

### 📌 Arquivos principais

- `index.html`: estrutura semântica, conteúdo e demonstrações da landing page.
- `styles.css`: tokens visuais, glassmorphism, layout, responsividade, estados de foco e scrollbar customizado.
- `app.js`: carregamento inicial, animações, ScrollTrigger, contadores, menu móvel, abas e cursor orbital.
- `assets/hero-atmosphere.webp`: atmosfera visual do hero.
- `assets/vendor/`: GSAP, ScrollTrigger e Lucide servidos localmente.
- `sitemap.xml`: sitemap da página pública do projeto.

## ✨ Experiência

- Dock fixa que se aproxima do topo ao rolar, com indicação da seção atual. A faixa de anúncio acompanha a rolagem da página.
- Demonstração interativa com abas de visão geral, clientes e demandas.
- Contadores animados para números demonstrativos da rotina do escritório.
- Seção editorial com situações para as quais o Cyron foi pensado.
- Cards de recursos, comparação de rotina, calendário, demandas e perfil de cliente.
- FAQ nativo com abertura animada e navegação acessível.
- Chamadas principais consistentes para explorar a demonstração, com atalhos compactos para cada aba.
- Footer com navegação, link para o repositório real do projeto, página inicial do Instagram e e-mail de exemplo fornecido pelo autor.

## 🎨 Direção visual

A interface combina fundo azul profundo, tipografia Manrope/DM Sans e superfícies de vidro com contraste controlado. A iluminação aparece como um reflexo ambiente nas superfícies e ganha intensidade com a aproximação do cursor, sem depender de brilhos neon ou gradientes dominantes.

Os componentes compartilham bordas, raios, sombras e divisórias em gradiente para manter unidade entre a dock, os cards, os painéis da demonstração e o footer.

A hero usa tipografia ampla e apresenta explicitamente o público e a função do CRM. O vidro tem mais presença nos painéis principais; elementos internos usam superfícies e bordas discretas. Os cards de exploração abrem as abas correspondentes da demonstração e movem o foco para a aba selecionada.

## ♿ Movimento e acessibilidade

- A tela de entrada possui fallback de segurança caso os recursos de animação não carreguem.
- Contadores e transições respeitam `prefers-reduced-motion`.
- Há link para pular ao conteúdo, foco visível, navegação por teclado e menu móvel com estado expandido.
- As abas usam semântica de tabs e o FAQ usa `details`/`summary` nativos.
- O cursor orbital aparece apenas em dispositivos com mouse e movimento permitido; toque e teclado mantêm o comportamento nativo.

## 🧭 Escopo

Esta é uma landing page com uma demonstração local. Os dados, contatos e números são ilustrativos. O projeto não possui backend, autenticação, persistência, envio de mensagens ou operação real de CRM.

## 📄 Licença e dados

Este repositório é um projeto autoral em desenvolvimento. Os dados exibidos na demonstração são fictícios e não representam clientes, métricas ou operações reais.

## 🛠️ Tecnologias

- HTML semântico, CSS e JavaScript vanilla.
- GSAP e ScrollTrigger para movimento e entrada das seções.
- Lucide para os ícones da interface.
- Manrope e DM Sans carregadas do Google Fonts, com fallback sans-serif.
