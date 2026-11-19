import { stack } from "@/content/stack";

export function Stack() {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold">Stack</h3>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {stack.map((group) => (
          <div key={group.name}>
            <h4 className="text-sm font-medium text-muted">{group.name}</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded bg-surface px-2 py-1 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
