import { useThemeProvider } from "../utils/ThemeContext";
import Logo from "../assets/ServeUTM.png";
import LogoAlpha from "../assets/ServeUTM_Alpha.png";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const { currentTheme } = useThemeProvider();
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-[#111827]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={currentTheme === "light" ? Logo : LogoAlpha}
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-slate-50">
          Sign in to admin panel
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
