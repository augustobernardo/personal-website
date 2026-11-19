import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "economizaai",
    status: { label: "Em produção", tone: "pass" },
    name: "EconomizaAI",
    result:
      "Bot de Telegram em produção que registra gastos por texto ou áudio com IA e controla cartões, faturas e parcelamentos.",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Gemini", "Docker", "GitHub Actions"],
    repoUrl: "https://github.com/augustobernardo/economizaAi",
    visual: {
      kind: "chat",
      title: "EconomizaAI",
      caption: "Ilustração da conversa com o bot. Mensagens de exemplo, não são dados reais.",
      messages: [
        { from: "user", text: "mercado 230,00 no cartão em 2x" },
        {
          from: "bot",
          text: "Gasto registrado: Mercado, R$ 230,00 no cartão, em 2 parcelas de R$ 115,00.",
        },
        { from: "user", audioSeconds: 5 },
        { from: "bot", text: "Áudio entendido: farmácia, R$ 42,90. Gasto registrado." },
      ],
    },
    decisions: [
      "Clean Architecture com portas e adaptadores: trocar o provedor de IA não mexe nos casos de uso.",
      "Toda resposta do LLM é validada com zod antes de virar domínio.",
      "CI com CodeQL, gitleaks, Trivy e testes de integração com Postgres real.",
      "Valores em centavos inteiros.",
      "Long polling em vez de webhook.",
    ],
    published: true,
  },
  {
    slug: "classificador-vistoria",
    status: { label: "Em homologação", tone: "warn" },
    name: "Classificador de fotos de vistoria",
    result:
      "Serviço que avalia qualidade, enquadramento e ângulo das fotos de vistoria e devolve “ok”, “refazer” ou “revisão”. Em homologação com o time de produto.",
    stack: ["Python", "FastAPI", "ONNX Runtime", "YOLOX", "DINOv2", "Docker", "AWS Lambda"],
    corporate: true,
    visual: {
      kind: "verdicts",
      intro: "Cada foto recebe um veredito:",
      caption: "Vereditos e números do serviço em homologação.",
      verdicts: [
        { label: "ok", tone: "pass" },
        { label: "refazer", tone: "fail" },
        { label: "revisão", tone: "warn" },
      ],
      stats: [
        { value: "246 ms", label: "mediana por foto, só CPU" },
        { value: "633 MiB", label: "pico de memória" },
        { value: "~17 mil", label: "imagens reais no treino" },
      ],
    },
    decisions: [
      "Modelos abertos com licença compatível com uso comercial (YOLOX em vez de Ultralytics, que é AGPL).",
      "Inferência só em CPU, com mediana de 246 ms por foto e pico de 633 MiB.",
      "Classificador treinado com cerca de 17 mil imagens reais e calibração de confiança.",
    ],
    published: true,
  },
  {
    slug: "superheros-api",
    status: { label: "Código público", tone: "neutral" },
    name: "Superheros API",
    result:
      "API REST com autenticação JWT (access e refresh token), revogação de tokens, RBAC, rate limiting e logs de auditoria.",
    stack: ["NestJS", "PostgreSQL", "MongoDB", "Docker", "Swagger"],
    repoUrl: "https://github.com/augustobernardo/superheros-api",
    visual: {
      kind: "flow",
      caption: "Fluxo de autenticação da API, simplificado.",
      steps: [
        { event: "Login", results: ["access token", "refresh token"] },
        { event: "Requisição com access token", results: ["RBAC confere o papel"] },
        { event: "Access token expirado", results: ["refresh token → novo access token"] },
        { event: "Token revogado", results: ["requisição recusada"] },
      ],
      note: "Além disso: rate limiting e logs de auditoria.",
    },
    // TODO(augusto): fill in the technical decisions.
    decisions: [],
    published: true,
  },
  {
    slug: "romanos-oito",
    status: { label: "Site no ar", tone: "pass" },
    name: "Romanos Oito",
    result: "Site do movimento católico Romanos Oito, desenvolvido como trabalho freelance.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
    repoUrl: "https://github.com/augustobernardo/romanos_oito",
    liveUrl: "https://romanosoito.com",
    // TODO(augusto): fill in the technical decisions.
    decisions: [],
    // TODO(augusto): set to true after the client authorizes publication.
    published: false,
  },
];

export const publishedProjects = projects.filter((project) => project.published);
