import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: Props) => {
  const { Auth } = useAuth();
  const navigate = useNavigate();
  if (Auth.isVerified) return children;
  navigate("/", { replace: true });
  return null;
};
import React from "react";
import { useAuth } from "../hooks/useAuth";
