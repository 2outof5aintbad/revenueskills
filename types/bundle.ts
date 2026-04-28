export interface Bundle {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  icon: string;
  skillSlugs: string[];
  featured?: boolean;
}
