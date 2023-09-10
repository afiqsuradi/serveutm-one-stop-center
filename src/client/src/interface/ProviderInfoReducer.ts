import { Language, Skill, UserProfile } from "./ProviderInfo";

export enum ProviderInfoActionTypes {
  SETINITIAL = "SETINITIAL",
  UPDATESKILL = "UPDATESKILL",
  UPDATELANGUAGES = "UPDATELANGUAGES",
  SETSKILL = "SETSKILL",
  SETLANGUAGES = "SETLANGUAGES",
  SETDESCRIPTION = "SETDESCRIPTION",
  SETWEBSITE = "SETWEBSITE",
}

interface SetInitialData {
  type: ProviderInfoActionTypes.SETINITIAL;
  payload: UserProfile;
}

interface SetSkills {
  type: ProviderInfoActionTypes.SETSKILL;
  payload: Skill[];
}

interface SetLanguages {
  type: ProviderInfoActionTypes.SETLANGUAGES;
  payload: Language[];
}

interface UpdateSkills {
  type: ProviderInfoActionTypes.UPDATESKILL;
  payload: Skill;
}

interface UpdateLanguages {
  type: ProviderInfoActionTypes.UPDATELANGUAGES;
  payload: Language;
}

interface UpdateDescription {
  type: ProviderInfoActionTypes.SETDESCRIPTION;
  payload: string;
}

interface UpdateWebsite {
  type: ProviderInfoActionTypes.SETWEBSITE;
  payload: string;
}

export type ProviderInfoAction =
  | UpdateSkills
  | UpdateLanguages
  | UpdateDescription
  | UpdateWebsite
  | SetSkills
  | SetLanguages
  | SetInitialData;
