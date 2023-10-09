import { ServiceType } from "../hooks/Services/useService";

export const languageLevel = ["Basic", "Fluent", "Native"] as const;
export const skillLevel = ["Beginner", "Intermediate", "Expert"] as const;

export interface Language {
  name: string;
  level: (typeof languageLevel)[number];
}

export interface Skill {
  name: string;
  level: (typeof skillLevel)[number];
}

export type UserProfile = {
  description: string;
  language: Language[];
  skills: Skill[];
  PersonalWebsite?: string;
  services?: ServiceType[];
};
export const defaultProfileValue: UserProfile = {
  description: "",
  language: [{ name: "", level: "Basic" }],
  skills: [{ name: "", level: "Beginner" }],
};
