import { Link } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { LOGIN } from "../../constants/path";
const Register = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 bg-[#111827] items-center lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-[#e5e7eb]">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <RegisterForm />

        <p className="mt-10 text-center text-base text-[#e5e7eb]">
          Already have an account?{" "}
          <Link
            to={LOGIN}
            className="font-semibold leading-6 text-[#818cf8] hover:text-indigo-500"
          >
            Sign in.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
