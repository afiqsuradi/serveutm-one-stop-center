import ROUTES from "@/constant/routes";
import { useAuth } from "@/hooks/Auth/useAuth";
import { useNavigate } from "react-router-dom";
import workspace from "@/assets/workspace.svg";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa6";
import { LiaConnectdevelop } from "react-icons/lia";

const Homepage = () => {
  const { Auth } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <section className="container text-foreground">
        <div className="grid w-full py-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="w-full mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Empowering UTMKL Students
            </h1>
            <p className="max-w-2xl mb-8 font-light text-foreground/75 lg:mb-8 md:text-lg lg:text-xl">
              Your One-Stop Solution for Services by UTM Students - Connect,
              Collaborate, and Excel Together
            </p>
            <a
              onClick={() => {
                if (Auth.username && Auth.username.length > 0) {
                  navigate(ROUTES.USER_PROFILE);
                } else {
                  navigate(ROUTES.REGISTER);
                }
              }}
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center  rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 hover:cursor-pointer hover:underline"
            >
              Get started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              onClick={() => {
                navigate(ROUTES.VIEW_SERVICES);
              }}
              className="inline-flex items-center hover:cursor-pointer justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Explore Services
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={workspace} alt="mockup" />
          </div>
        </div>
      </section>
      <section className="py-12 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="md:text-center text-4xl font-bold">
            "Streamline Your Services with ServeUTM"
          </h1>
          <p className="md:text-center text-secondary-foreground/75 my-2 mb-12">
            Connecting UTM Students with Services Made Simple
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
            <div className="flex flex-col gap-4 h-full w-[400px] p-6">
              <div>
                <PiChalkboardTeacherFill className="text-7xl text-secondary-foreground/70" />
                <h4 className="font-semibold text-xl">Highlight your skills</h4>
              </div>
              <p className="text-secondary-foreground/50">
                {" "}
                Showcase your talents and services on ServeUTM's user-friendly
                platform. Whether you excel in tutoring, item delivery, or other
                areas, make your offerings stand out for UTM students to
                discover and appreciate.
              </p>
            </div>
            <div className="flex flex-col gap-4 h-full w-[400px] p-6">
              <div>
                <FaWhatsapp className="text-7xl text-secondary-foreground/70" />
                <h4 className="font-semibold text-xl">Goodbye to WhatsApp</h4>
              </div>
              <p className="text-secondary-foreground/50">
                Drowning in endless WhatsApp notifications? ServeUTM offers a
                clean and organized inbox, ensuring that your service
                advertisements are seen by the right audience without the noise.
                Manage your service requests and inquiries effortlessly.
              </p>
            </div>
            <div className="flex flex-col gap-4 h-full w-[400px] p-6">
              <div>
                <LiaConnectdevelop className="text-7xl text-secondary-foreground/70" />
                <h4 className="font-semibold text-xl">
                  Connecting service providers
                </h4>
              </div>
              <p className="text-secondary-foreground/50">
                Looking for a specific service? ServeUTM's advanced search and
                matching feature makes it easy to find the perfect service
                provider. Whether you need a tutor, courier, or expert advice,
                we'll connect you with the right person.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
