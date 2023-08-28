import React from "react";
import { Link } from "react-router-dom";
import { LOGIN } from "../../constants/path";

const SignIn = () => {
  return (
    <>
      <Link
        to={LOGIN}
        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
      >
        Sign In
      </Link>
      <a
        href="#"
        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
      >
        Join Us
      </a>
    </>
  );
};

export default SignIn;
