export const security = {
  stamp: { title: "Este site, conferido agora", link: "Ver a vistoria completa" },
  facts: ["Site estático", "Cloudflare Workers", "CSP por hash"],
  title: "Segurança deste site",
  intro:
    "Levo segurança para o dia a dia, e este site é o exemplo mais à mão: estático, servido pela Cloudflare (Workers Static Assets), com CSP por hash. O painel lê os cabeçalhos que o servidor acabou de enviar para o seu navegador.",
  command: "curl -sI https://augustooliveira.dev.br",
  status: {
    static: "Cabeçalhos que este site envia em cada resposta.",
    loading: "Conferindo os cabeçalhos desta página…",
    active: (present: number, total: number) =>
      `${present} de ${total} cabeçalhos ativos nesta resposta`,
    local:
      "Nenhum cabeçalho nesta resposta: esta é uma versão local, sem os cabeçalhos de produção.",
    missing: "O servidor não enviou os cabeçalhos esperados.",
    error: "Não deu para conferir agora. Verifique a conexão e tente de novo.",
    source: (host: string, checkedAt: string) => `Lido de ${host} às ${checkedAt}`,
    noScript: "Sem JavaScript não dá para ler aqui. Confira no terminal:",
  },
  seal: {
    static: "Cabeçalhos de segurança deste site",
    loading: "Conferindo cabeçalhos de segurança…",
    active: (present: number, total: number) =>
      `${present} de ${total} cabeçalhos de segurança ativos`,
    local: "Versão local, sem cabeçalhos de produção",
    error: "Não deu para conferir os cabeçalhos",
  },
  button: { check: "Conferir de novo", loading: "Conferindo…" },
  row: { active: "ativo", missing: "ausente", insecure: "inseguro", unchecked: "não conferido" },
  summary: {
    scripts: (hashes: number) => `script-src 'self' + ${hashes} hashes sha256`,
    safeScripts: ", sem 'unsafe-inline'",
    unsafeScripts: ", com 'unsafe-inline'",
    frameAncestors: ", frame-ancestors 'none'",
    permissions: (count: number) => `${count} recursos desligados`,
    hsts: (days: number) => `max-age de ${days} dias`,
    subdomains: ", includeSubDomains",
    hstsMissing: "não enviado nesta resposta",
    fullCsp: "Ver a CSP completa",
  },
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
