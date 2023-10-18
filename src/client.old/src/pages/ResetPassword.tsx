import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 bg-[#111827] items-center lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-[#e5e7eb]">
          Reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
