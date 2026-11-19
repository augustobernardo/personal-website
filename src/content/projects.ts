import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "economizaai",
    name: "EconomizaAI",
    result:
      "Bot de Telegram em produção que registra gastos por texto ou áudio com IA e controla cartões, faturas e parcelamentos.",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Gemini", "Docker", "GitHub Actions"],
    repoUrl: "https://github.com/augustobernardo/economizaAi",
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
    name: "Classificador de fotos de vistoria",
    result:
      "Serviço que avalia qualidade, enquadramento e ângulo das fotos de vistoria e devolve “ok”, “refazer” ou “revisão”. Em homologação com o time de produto.",
    stack: ["Python", "FastAPI", "ONNX Runtime", "YOLOX", "DINOv2", "Docker", "AWS Lambda"],
    corporate: true,
    decisions: [
      "Modelos abertos com licença compatível com uso comercial (YOLOX em vez de Ultralytics, que é AGPL).",
      "Inferência só em CPU, com mediana de 246 ms por foto e pico de 633 MiB.",
      "Classificador treinado com cerca de 17 mil imagens reais e calibração de confiança.",
    ],
    published: true,
  },
  {
    slug: "superheros-api",
    name: "Superheros API",
    result:
      "API REST com autenticação JWT (access e refresh token), revogação de tokens, RBAC, rate limiting e logs de auditoria.",
    stack: ["NestJS", "PostgreSQL", "MongoDB", "Docker", "Swagger"],
    repoUrl: "https://github.com/augustobernardo/superheros-api",
    // TODO(augusto): fill in the technical decisions.
    decisions: [],
    published: true,
  },
  {
    slug: "romanos-oito",
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
