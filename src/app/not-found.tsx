import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-start justify-center gap-4 px-4">
      <h1 className="text-3xl font-semibold">Página não encontrada</h1>
      <p className="text-muted">O endereço que você acessou não existe ou foi movido.</p>
      <Link href="/" className="font-medium text-accent underline underline-offset-4">
        Voltar para o início
      </Link>
    </div>
  );
}
