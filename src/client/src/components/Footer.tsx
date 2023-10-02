import { Image } from "@chakra-ui/react";
import logoAlpha from "../assets/ServeUTM_Alpha.png";
import { useNavigate } from "react-router-dom";
import ROUTES from "../constants/path";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className=" rounded-lg shadow bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex items-center justify-start flex-col md:flex-row md:justify-between">
          <div className="self-start md:self-center">
            <Image src={logoAlpha} />
          </div>
          <ul className="list-none text-lg flex justify-between text-center pt-6 md:min-w-[30rem] md:text-xl self-start md:pt-0 min-w-full">
            <li
              className="border-none m-0 p-0 hover:underline hover:cursor-pointer max-w-fit"
              onClick={() => {
                navigate(ROUTES.ABOUT_US);
              }}
            >
              About
            </li>
            <li className="border-none m-0 p-0 hover:underline hover:cursor-pointer max-w-fit">
              Privacy Policy
            </li>
            <li className="border-none m-0 p-0 hover:underline hover:cursor-pointer max-w-fit">
              Licensing
            </li>
            <li
              className="border-none m-0 p-0 hover:underline hover:cursor-pointer max-w-fit"
              onClick={() => {
                navigate(ROUTES.CONTACT_US);
              }}
            >
              Contact
            </li>
          </ul>
        </div>
        <hr className="my-6  sm:mx-auto border-gray-700 lg:my-8" />
        <span className="block text-sm sm:text-center text-gray-400">
          © 2023{" "}
          <a href="https://www.serveutm.online/" className="hover:underline">
            ServeUTM
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
