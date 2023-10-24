import { createContext, useReducer } from "react";
import { UserProfile, defaultProfileValue } from "../interface/ProviderInfo";
import {
  ProviderInfoAction,
  ProviderInfoActionTypes,
} from "../interface/ProviderInfoReducer";

interface ServiceProviderContextType {
  ProviderInfo: UserProfile;
  ProviderInfoDispatch: React.Dispatch<ProviderInfoAction>;
}

export const ServiceProviderContext = createContext<ServiceProviderContextType>(
  {
    ProviderInfo: defaultProfileValue,
    ProviderInfoDispatch: () => defaultProfileValue,
  }
);

const providerInfoReducer = (
  state: UserProfile,
  action: ProviderInfoAction
): UserProfile => {
  switch (action.type) {
    case ProviderInfoActionTypes.SETINITIAL:
      return action.payload;
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

interface Props {
  children: React.ReactNode;
}

const SellerProvider = ({ children }: Props) => {
  const [ProviderInfo, ProviderInfoDispatch] = useReducer(
    providerInfoReducer,
    defaultProfileValue
  );
  return (
    <ServiceProviderContext.Provider
      value={{ ProviderInfo, ProviderInfoDispatch }}
    >
      {children}
    </ServiceProviderContext.Provider>
  );
};

export default SellerProvider;
