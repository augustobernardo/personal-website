const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

// Manual table instead of Intl: output must not vary with the ICU build.
export function formatMonth(iso: string): string {
  const [year, month] = iso.split("-");
  return `${MONTHS[Number(month) - 1]}/${year}`;
}

export function formatPeriod(start: string, end: string | null): string {
  return `${formatMonth(start)} – ${end === null ? "atual" : formatMonth(end)}`;
}
