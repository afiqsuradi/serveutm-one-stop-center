import LoginForm from "../../components/LoginForm";
import styles from "./style.module.css";
const SignIn = () => {
  return (
    <>
      <div
        className={`${styles["card-bg"]} bg-gradient-to-br from-purple-600 to-blue-400 div-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0`}
      >
        <header className="max-w-lg mx-auto">
          <a href="#">
            <h1 className="text-4xl font-bold text-white text-center">
              ServeUTM
            </h1>
          </a>
        </header>

        <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <section>
            <h3 className="font-bold text-2xl">Welcome to ServeUTM</h3>
            <p className="text-gray-600 pt-2">Sign in to your account.</p>
          </section>

          <section className="mt-10">
            <LoginForm />
          </section>
        </main>

        <div className="max-w-lg mx-auto text-center mt-12 mb-6">
          <p className="text-white">
            Don't have an account?{" "}
            <a href="#" className="font-bold hover:underline">
              Sign up
            </a>
            .
          </p>
        </div>

        <footer className="max-w-lg mx-auto flex justify-center text-white">
          <a href="#" className="hover:underline">
            Contact
          </a>
          <span className="mx-3">•</span>
          <a href="#" className="hover:underline">
            Privacy
          </a>
        </footer>
      </div>
    </>
  );
};

export default SignIn;
