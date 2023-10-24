import { useMemo } from "react";
import ServicePublicCard from "../../components/ServicePublicCard";
import useServices from "../../hooks/Services/useServices";
import styles from "./style.module.css";
import { Grid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ROUTES from "../../constants/path";

const Homepage = () => {
  const navigate = useNavigate();
  const { Auth } = useAuth();
  const memoizedObject = useMemo(() => {
    return {
      limit: 12,
      page: 1,
      gigStatus: "Approved",
    };
  }, []);
  const { data } = useServices(memoizedObject);
  return (
    <>
      <div className="container">
        <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                Empowering UTMKL Students
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
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
                className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 hover:cursor-pointer hover:underline"
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
              <img
                src="https://layoutsfordivibuilder.com/wp-content/uploads/2019/10/hero-banner.png"
                alt="mockup"
              />
            </div>
          </div>
        </section>

        <div className="bg-white w-screen p-14">
          <h1 className="text-4xl flex flex-col items-center justify-center font-bold text-black text-center">
            Recently Uploaded
          </h1>
          <div className="py-8 grid md:grid-cols-3 text-black gap-8">
            {data
              ? data.services.map((service) => (
                  <ServicePublicCard serviceData={service} />
                ))
              : ""}
          </div>
        </div>

        <div className="become-a-seller">
          <div className="w-screen bg-pink-50 pt-14 pl-14 flex justify-between items-start">
            <div className="flex flex-col sm:p-5">
              <h1 className="text-black text-5xl font-bold opacity-75 flex-wrap max-sm:text-sm text-center">
                Want to join our{" "}
                <i className="font-serif max-sm:text-lg">community ?</i>
              </h1>
              <h2 className="pt-5 text-2xl pb-12 text-black font-bold opacity-75 max-sm:text-sm max-sm:text-center">
                Click the button below to discover more!
              </h2>
              <div className="become-a-seller-button pt-20 max-sm:pt-0 max-sm:pb-10">
                <a
                  href="#"
                  className="bg-gray-800 font-medium rounded-lg text-xl px-2 py-1 text-center dark:hover:bg-gradient-to-br from-indigo-900 to-slate-900 shadow-md bg-opacity-90 max-sm:flex max-sm:items-center max-sm:justify-center max-w-sm mx-auto max-sm:text-sm"
                >
                  Become a seller
                </a>
              </div>
            </div>
            <img
              src="https://opendoodles.s3-us-west-1.amazonaws.com/swinging.svg"
              alt="product image"
              className="self-end w-96 h-96 flex-wrap hidden sm:block"
            />
          </div>

          <div className="categories bg-slate-50 w-screen p-14">
            <p className="text-black text-3xl font-bold opacity-80 pb-20 flex-wrap max-sm:text-center">
              Wide selection, unmatched convenience.
            </p>
            <Grid
              textAlign={"center"}
              placeItems={"center"}
              templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }}
              className="categories-list text-black text-xl font-thin pb-10"
            >
              <a
                href="#"
                className={`flex flex-col items-center justify-center ${styles["lists"]}`}
              >
                <li className="flex flex-col items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 flex items-center justify-center mx-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
                    />
                  </svg>
                  Technical Expertise
                </li>
              </a>
              <a
                href="#"
                className={`flex flex-col items-center justify-center ${styles["lists"]}`}
              >
                <li className="flex flex-col items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 flex items-center justify-center mx-auto"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M19.938 8H21a2 2 0 012 2v4a2 2 0 01-2 2h-1.062A8.001 8.001 0 0112 23v-2a6 6 0 006-6V9A6 6 0 106 9v7H3a2 2 0 01-2-2v-4a2 2 0 012-2h1.062a8.001 8.001 0 0115.876 0zM3 10v4h1v-4H3zm17 0v4h1v-4h-1zM7.76 15.785l1.06-1.696A5.972 5.972 0 0012 15a5.972 5.972 0 003.18-.911l1.06 1.696A7.963 7.963 0 0112 17a7.963 7.963 0 01-4.24-1.215z" />
                  </svg>
                  Service
                </li>
              </a>
              <a
                href="#"
                className={`flex flex-col items-center justify-center ${styles["lists"]}`}
              >
                <li className="flex flex-col items-center justify-center">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6 flex items-center justify-center mx-auto"
                  >
                    <path d="M3.33 8L10 12l10-6-10-6L0 6h10v2H3.33zM0 8v8l2-2.22V9.2L0 8zm10 12l-5-3-2-1.2v-6l7 4.2 7-4.2v6L10 20z" />
                  </svg>
                  Education
                </li>
              </a>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
