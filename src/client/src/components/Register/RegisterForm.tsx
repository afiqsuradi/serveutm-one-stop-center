const RegisterForm = () => {
  return (
    <form className="flex flex-col" method="POST" action="#">
      <div className="flex gap-4">
        <div className="mb-6 pt-3 rounded bg-gray-200">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 ml-3"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>
        <div className="mb-6 pt-3 rounded bg-gray-200">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 ml-3"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>
      </div>
      <div className="mb-6 pt-3 rounded bg-gray-200">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 ml-3"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
        />
      </div>
      <div className="mb-6 pt-3 rounded bg-gray-200">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 ml-3"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
        />
      </div>
      <div className="mb-6 pt-3 rounded bg-gray-200">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 ml-3"
          htmlFor="passwordConfirm"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="passwordConfirm"
          className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
        />
      </div>

      <button
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
