import useData from "../useData";

export const SkillLevel = ["Beginner", "Intermediate", "Expert"] as const;
export type SkillLevelType = (typeof SkillLevel)[number];

export const LanguageLevel = ["Basic", "Fluent", "Native"] as const;
export type LanguageLevelType = (typeof LanguageLevel)[number];

export interface SkillType {
  name: string;
  level: SkillLevelType;
}

export interface LanguageType {
  name: string;
  level: LanguageLevelType;
}

export interface ServiceProviderInfo {
  description: string;
  language: LanguageType[];
  skills: SkillType[];
  PersonalWebsite?: string;
}

const useServiceProviderProfile = (username: string, deps?: any[]) => {
  const { isLoading, response, success } = useData<ServiceProviderInfo>(
    `api/service-provider/${username}`,
    {},
    deps
  );
  return { isLoading, response, success };
};

export default useServiceProviderProfile;
