import { useReducer } from "react";
import {
  Language,
  Skill,
  UserProfile,
  defaultProfileValue,
} from "./useRegisterProvider";

export enum ProviderInfoActionTypes {
  UPDATESKILL = "UPDATESKILL",
  UPDATELANGUAGES = "UPDATELANGUAGES",
  SETSKILL = "SETSKILL",
  SETLANGUAGES = "SETLANGUAGES",
  SETDESCRIPTION = "SETDESCRIPTION",
  SETWEBSITE = "SETWEBSITE",
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
  | SetLanguages;

const providerInfoReducer = (
  state: UserProfile,
  action: ProviderInfoAction
): UserProfile => {
  switch (action.type) {
    case ProviderInfoActionTypes.UPDATESKILL:
      return { ...state, skills: [...state.skills, action.payload] };
    case ProviderInfoActionTypes.UPDATELANGUAGES:
      return { ...state, language: [...state.language, action.payload] };
    case ProviderInfoActionTypes.SETSKILL:
      return { ...state, skills: action.payload };
    case ProviderInfoActionTypes.SETLANGUAGES:
      return { ...state, language: action.payload };
    case ProviderInfoActionTypes.SETDESCRIPTION:
      return { ...state, description: action.payload };
    case ProviderInfoActionTypes.SETWEBSITE:
      return { ...state, PersonalWebsite: action.payload };
    default:
      return state;
  }
};

const useProviderReducer = (providerData?: UserProfile) => {
  const [providerInfo, providerInfoDispatch] = useReducer(
    providerInfoReducer,
    providerData || defaultProfileValue
  );

  //   //fix language input
  //   const language = providerInfo.language.filter((lang) => lang.name.length > 0);
  //   providerInfoDispatch({
  //     type: ProviderInfoActionTypes.SETLANGUAGES,
  //     payload: language,
  //   });
  //   //fix skill input
  //   const skill = providerInfo.skills.filter((sk) => sk.name.length > 0);
  //   providerInfoDispatch({
  //     type: ProviderInfoActionTypes.SETSKILL,
  //     payload: skill,
  //   });
  return { providerInfo, providerInfoDispatch };
};

export default useProviderReducer;
