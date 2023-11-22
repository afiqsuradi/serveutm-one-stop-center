import { Link } from "react-router-dom";
import ROUTES from "../../constants/path";

const SignIn = () => {
  return (
    <>
      <Link
        to={ROUTES.LOGIN}
        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
      >
        Sign In
      </Link>
      <Link
        to={ROUTES.REGISTER}
        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
      >
        Join Us
      </Link>
    </>
  );
};

export default SignIn;
