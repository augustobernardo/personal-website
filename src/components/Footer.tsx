import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer id="rodape" className="pb-12 pt-8 text-sm text-muted lg:pb-0">
      © {new Date().getFullYear()} {profile.name}
    </footer>
  );
}
