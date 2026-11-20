import Link from "next/link";

export default function NotFound() {
  return (
    <main id="conteudo" tabIndex={-1} className="px-[var(--margin)] outline-none">
      <div className="nb-card mx-auto mt-24 max-w-md p-8">
        <h1 className="type-title">Página não encontrada</h1>
        <p className="mt-4 text-muted">O endereço que você acessou não existe ou foi movido.</p>
        <Link href="/" className="nb-btn nb-btn--primary mt-6">
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
