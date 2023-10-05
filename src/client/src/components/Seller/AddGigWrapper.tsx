import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};
const AddGigWrapper = ({ children, title }: Props) => {
  return (
    <div className="border-2 max-w-[85%] mx-auto px-10">
      <h1 className="my-4 text-3xl font-bold">{title}</h1>
      <div className="grid md:grid-cols-[1fr_2fr] md:gap-8">{children}</div>
    </div>
  );
};

export default AddGigWrapper;
