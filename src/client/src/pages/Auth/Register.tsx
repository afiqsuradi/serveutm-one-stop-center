import mascot from "@/assets/register-mascot.svg";
import RegisterForm from "@/components/Auth/RegisterForm";

const Register = () => {
  return (
    <div className="container self-center">
      <div className=" px-0 my-14 md:border md:grid md:grid-cols-2 md:rounded-2xl">
        <div className="m-6 flex flex-col">
          <div className="text-center w-[70%] mx-auto my-auto space-y-6">
            <div>
              <h1 className="text-2xl">Create An Account</h1>
              <p className="mb-8">Start your journey today.</p>
              <RegisterForm />
            </div>
          </div>
        </div>
        <div className="hidden md:inline-block m-6 rounded-2xl bg-primary">
          <img src={mascot} />
        </div>
      </div>
    </div>
  );
};

export default Register;
