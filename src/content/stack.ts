import type { StackGroup } from "./types";

export const stack: StackGroup[] = [
  {
    name: "Front-end",
    items: ["Angular", "React", "TypeScript", "Tailwind CSS", "Ionic/Capacitor", "SAP UI5"],
  },
  { name: "Back-end", items: ["NestJS", "Node.js", "FastAPI", "Spring Boot", "APIs REST"] },
  { name: "Dados", items: ["PostgreSQL", "MongoDB", "TypeORM", "Supabase"] },
  {
    name: "Cloud e DevOps",
    items: [
      "Docker",
      "AWS (Lambda, ECR, S3, IAM)",
      "GitHub Actions",
      "Azure DevOps",
      "Cloudflare",
      "Easypanel",
    ],
  },
  { name: "Segurança", items: ["OWASP", "CodeQL", "Trivy", "gitleaks"] },
  { name: "SAP", items: ["ABAP OO", "Fiori/UI5", "S/4HANA", "CDS Views"] },
];
