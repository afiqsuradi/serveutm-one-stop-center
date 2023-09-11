import styles from "./style.module.css";
import { Grid } from "@chakra-ui/react";

function Homepage() {
  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
      </style>
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

          <div className="img-block flex flex-row flex-wrap">
            <div className="max-w-3xl mx-auto py-14 flex flex-row items-center justify-center">
              <div className="bg-white shadow-2xl max-w-4xl w-60  border-gray-900">
                <a href="#">
                  <img
                    className="flex justify-center rounded- p-8 w-full m-0 h-50 justify-items-center"
                    src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/88c3280a-1b77-4cf9-957f-d71b91e90393/revolution-6-road-running-shoes-NC0P7k.png"
                    alt="product image"
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h3 className="text-gray-900 font-semibold text-xs tracking-tight pb-4">
                      Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
                    </h3>
                  </a>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900 ">
                      $599
                    </span>
                    <a
                      href="#"
                      className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-3xl mx-auto py-14 flex flex-row items-center justify-center">
              <div className="bg-white shadow-2xl max-w-4xl w-60  border-gray-900">
                <a href="#">
                  <img
                    className="flex justify-center rounded- p-8 w-full m-0 h-50 justify-items-center"
                    src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/88c3280a-1b77-4cf9-957f-d71b91e90393/revolution-6-road-running-shoes-NC0P7k.png"
                    alt="product image"
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h3 className="text-gray-900 font-semibold text-xs tracking-tight pb-4">
                      Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
                    </h3>
                  </a>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900 ">
                      $599
                    </span>
                    <a
                      href="#"
                      className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-3xl mx-auto py-14 flex flex-row items-center justify-center">
              <div className="bg-white shadow-2xl max-w-4xl w-60  border-gray-900">
                <a href="#">
                  <img
                    className="flex justify-center rounded- p-8 w-full m-0 h-50 justify-items-center"
                    src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/88c3280a-1b77-4cf9-957f-d71b91e90393/revolution-6-road-running-shoes-NC0P7k.png"
                    alt="product image"
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h3 className="text-gray-900 font-semibold text-xs tracking-tight pb-4">
                      Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
                    </h3>
                  </a>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900 ">
                      $599
                    </span>
                    <a
                      href="#"
                      className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-3xl mx-auto py-14 flex flex-row items-center justify-center">
              <div className="bg-white shadow-2xl max-w-4xl w-60  border-gray-900">
                <a href="#">
                  <img
                    className="flex justify-center rounded- p-8 w-full m-0 h-50 justify-items-center"
                    src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/88c3280a-1b77-4cf9-957f-d71b91e90393/revolution-6-road-running-shoes-NC0P7k.png"
                    alt="product image"
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h3 className="text-gray-900 font-semibold text-xs tracking-tight pb-4">
                      Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
                    </h3>
                  </a>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900 ">
                      $599
                    </span>
                    <a
                      href="#"
                      className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
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
              templateColumns={{ base: "1fr", sm: "repeat(4, 1fr)" }}
              className="categories-list text-black text-xl font-thin pb-10"
            >
              <a href="#" className="flex flex-col items-center justify-center">
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
                  Electronics
                </li>
              </a>
              <a href="#" className="flex flex-col items-center justify-center">
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
                      d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                    />
                  </svg>
                  Fashion
                </li>
              </a>
              <a
                href="#"
                className="flex flex-col items-center justify-center gap-1"
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
                      d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                    />
                  </svg>
                  Home & Furniture
                </li>
              </a>
              <a
                href="#"
                className="flex flex-col items-center justify-center gap-1"
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
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                  Beauty & Personal Care
                </li>
              </a>
              <a
                href="#"
                className="flex flex-col items-center justify-center gap-1"
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
                      d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
                    />
                  </svg>
                  Sports & Outdoor
                </li>
              </a>
              <a
                href="#"
                className="flex flex-col items-center justify-center gap-1"
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
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  Book & Media
                </li>
              </a>
              <a
                href="#"
                className="flex flex-col items-center justify-center gap-1"
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
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                  Automotive
                </li>
              </a>
              <a
                href="#"
                className="flex flex-col items-center justify-center gap-1"
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
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                  Health & Wellness
                </li>
              </a>
              <a
                href="#"
                className="flex flex-col items-center justify-center gap-1"
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
                      d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                  Jewerly & Accessories
                </li>
              </a>
              <a
                href="#"
                className="flex flex-col items-center justify-center gap-1"
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  Services
                </li>
              </a>
              <a
                href="#"
                className="flex flex-col items-center justify-center gap-1"
              >
                <li className="flex flex-col items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                    />
                  </svg>
                  Industrial & Tools
                </li>
              </a>
              <a
                href="#"
                className="flex flex-col items-center justify-center gap-1"
              >
                <li className="flex flex-col items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082"
                    />
                  </svg>
                  Toys & Games
                </li>
              </a>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
