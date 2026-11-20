import { existsSync } from "node:fs";
import { join } from "node:path";
import { profile } from "@/content/profile";

// Evaluated at build time (static export): the button appears once the PDF exists in public/.
export const hasResume = existsSync(join(process.cwd(), "public", profile.resumePath));
