import { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface Props {
  children: ReactNode;
  title: string;
  key: string;
}
const RegisterFormWrapper = ({ children, title, key: name }: Props) => {
  return (
    <>
      <Label htmlFor={name} className="text-lg">
        {title}
      </Label>
      <div>{children}</div>
    </>
  );
};

export default RegisterFormWrapper;
