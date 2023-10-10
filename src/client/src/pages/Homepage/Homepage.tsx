import { useMemo } from "react";
import ServicePublicCard from "../../components/ServicePublicCard";
import useServices from "../../hooks/Services/useServices";
import styles from "./style.module.css";
import { Grid } from "@chakra-ui/react";

const Homepage = () => {
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
        <div className="h-screen w-screen bg-gradient-to-b from-gray-900 to-indigo-900 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-center max-sm:text-xl">
            One stop, for <i className={styles["font-serif"]}>everything</i> you
            need.
          </h1>
          <h2 className="text-3xl font-bold p-4 pb-10">We got you covered</h2>

          <div className="pt-2 relative mx-auto text-gray-600 p">
            <input
              className="border-2 border-gray-300 bg-white h-10  px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
            <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
              <svg
                className="text-gray-600 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 56.966 56.966"
                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="bg-white w-screen p-14">
          <h1 className="text-4xl flex flex-col items-center justify-center font-bold text-black text-center">
            Recently Uploaded
          </h1>
          <div className="py-8 grid md:grid-cols-3 text-black">
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
