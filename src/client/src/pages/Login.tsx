import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { REGISTER } from "../constants/path";
const SignIn = () => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 bg-[#111827] items-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-[#e5e7eb]">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />

          <p className="mt-10 text-center text-base text-[#e5e7eb]">
            Not a member?{" "}
            <Link
              to={REGISTER}
              className="font-semibold leading-6 text-[#818cf8] hover:text-indigo-500"
            >
              Create an account.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
