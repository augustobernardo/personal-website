import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-line py-6 text-center text-sm text-muted">
      © {new Date().getFullYear()} {profile.name}
    </footer>
  );
}
