import mascot from "@/assets/login-mascot.svg";
import LoginForm from "@/components/Auth/LoginForm";
const Login = () => {
  return (
    <div className="container self-center">
      <div className=" px-0 my-14 md:border md:grid md:grid-cols-2 md:rounded-2xl">
        <div className="hidden md:inline-block m-6 rounded-2xl bg-primary">
          <img src={mascot} />
        </div>
        <div className="m-6 flex flex-col">
          <div className="text-center w-[70%] mx-auto my-auto space-y-6">
            <div>
              <h1 className="text-2xl">Welcome Back!</h1>
              <p>Sign in to your account.</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
