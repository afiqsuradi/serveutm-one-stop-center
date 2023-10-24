interface Props {
  children: string;
}

const ErrorLabel = ({ children }: Props) => {
  return (
    <p className="inline text-red-700 text-sm bg-red-100 px-2 rounded-lg">
      {children}
    </p>
  );
};

export default ErrorLabel;
