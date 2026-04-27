export type SkillCategory =
  | "sales"
  | "research"
  | "productivity"
  | "writing"
  | "data"
  | "customer-success";

export interface Review {
  id: string;
  rating: number; // 1–5
  text: string;
  author: string;
  date: string; // ISO 8601
}

export interface Version {
  version: string; // semver
  changeSummary: string;
  createdAt: string; // ISO 8601
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: SkillCategory;
  tags: string[];
  author: string;
  authorBio: string;
  installs: number;
  rating: number; // 1–5, one decimal
  reviews: Review[];
  versions: Version[];
  triggers: string[];
  exampleOutput: string;
  featured?: boolean;
}
