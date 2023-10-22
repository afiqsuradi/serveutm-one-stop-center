import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
}
const AddGigFormWrapper = ({ children, title }: Props) => {
  return (
    <>
      <h1 className="my-4 text-2xl font-semibold mb-4">{title}</h1>
      <div className=" md:grid md:grid-cols-[1fr_2fr] md:gap-6">{children}</div>
    </>
  );
};

export default AddGigFormWrapper;
