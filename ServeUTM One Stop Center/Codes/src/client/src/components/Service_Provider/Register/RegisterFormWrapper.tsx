import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
}
const RegisterFormWrapper = ({ children, title }: Props) => {
  return (
    <>
      <h1 className="text-lg">{title}</h1>
      <div className="mb-6 md:mb-0">{children}</div>
    </>
  );
};

export default RegisterFormWrapper;
