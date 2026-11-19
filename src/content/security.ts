export const security = {
  title: "Segurança deste site",
  intro:
    "Levo segurança para o dia a dia, e este site é o exemplo mais à mão: estático, servido por nginx em contêiner sem root, com CSP por hash. O painel lê os cabeçalhos que o servidor acabou de enviar para o seu navegador.",
  command: "curl -sI https://augustooliveira.dev.br",
  headers: [
    {
      name: "content-security-policy",
      explain: "Só executa script deste domínio ou com hash conferido no build.",
    },
    {
      name: "x-frame-options",
      explain: "Nenhum site consegue embutir esta página num iframe.",
    },
    {
      name: "x-content-type-options",
      explain: "O navegador não adivinha o tipo dos arquivos.",
    },
    {
      name: "referrer-policy",
      explain: "Outros sites recebem só o domínio de origem, nunca o caminho.",
    },
    {
      name: "permissions-policy",
      explain: "Câmera, microfone, localização e outros recursos ficam desligados.",
    },
    {
      name: "cross-origin-opener-policy",
      explain: "Janelas de outros sites não acessam esta página.",
    },
  ],
  hsts: {
    name: "strict-transport-security",
    explain: "O navegador só acessa este domínio por HTTPS.",
  },
} as const;
