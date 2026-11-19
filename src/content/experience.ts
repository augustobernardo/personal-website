import type { ExperienceItem } from "./types";

export const careerArc = ["Estágio SAP", "ABAP e Fiori", "Full Stack"];

export const experience: ExperienceItem[] = [
  {
    company: "Union Solutions",
    role: "Desenvolvedor Full Stack",
    start: "2026-06",
    end: null,
    tags: ["Angular", "NestJS", "Ionic/Capacitor", "Python", "Java", "Spring Boot"],
    highlights: [
      "Plataforma de vistoria em Angular e NestJS e app em Ionic/Capacitor.",
      "Serviço de validação de fotos.",
      "Refatoração de sistema legado em Java/Spring Boot com o padrão Registry para múltiplos gateways de pagamento.",
      "Auditorias e correções de segurança na API (headers, validação de requisições e exigência de JWT em endpoints).",
    ],
  },
  {
    company: "Linkup Consultoria",
    role: "Consultor de Informática I, Desenvolvedor SAP ABAP/Fiori",
    start: "2023-05",
    end: "2026-02",
    tags: ["ABAP OO", "Fiori/UI5", "CDS Views", "SmartForms", "S/4HANA"],
    highlights: ["ABAP OO, Fiori/UI5, CDS Views e SmartForms no S/4HANA."],
  },
  {
    company: "Linkup Consultoria",
    role: "Estagiário em Desenvolvimento SAP",
    start: "2022-05",
    end: "2023-05",
    tags: [],
    highlights: [],
  },
];
