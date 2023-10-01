import logoAlpha from "../assets/ServeUTM_Alpha.png";

const Footer = () => {
  return (
    <footer className=" rounded-lg shadow bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://www.serveutm.online/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <img src={logoAlpha} className="h-8 mr-3" alt="ServeUTM Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              ServeUTM
            </span>
          </a>
          <ul className="flex flex-wrap items-center  mb-6 text-sm font-medium sm:mb-0 text-gray-400">
            <li className="max-w-fit">
              <a href="#" className="mr-4 hover:underline md:mr-6">
                About
              </a>
            </li>
            <li className="max-w-fit">
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li className="max-w-fit">
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </a>
            </li>
            <li className="max-w-fit">
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6  sm:mx-auto border-gray-700 lg:my-8" />
        <span className="block text-sm  sm:text-center text-gray-400">
          © 2023{" "}
          <a href="https://www.serveutm.online/" className="hover:underline">
            ServeUTM™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
