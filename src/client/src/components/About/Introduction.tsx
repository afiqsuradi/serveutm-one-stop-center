const Introduction = () => {
  return (
    <>
      <div className="w-full max-h-max px-20 py-20 bg-slate-200 flex flex-row justify-around items-center text-gray-700 font-bold text-8xl ">
        About Us
      </div>
      <div className="w-full max-h-max px-20 py-20 bg-slate-200 flex flex-row justify-around items-center">
        <div className=" max-w-2xl shadow-2xl bg-slate-200 rounded-xl flex flex-col justify-center items-center text-center text-black font-thin">
          <p className="leading-10 p-28 text-3xl opacity-60 leading- italic">
            "Welcome to our one-stop-center website, tailored exclusively for
            UTM students. Created by a team of six dedicated third-year
            students, we provide essential resources and support for your
            academic journey."
          </p>
        </div>
        <p className="text-7xl text-black opacity-70 font-[Splash] text-center">
          Opening
          <br /> Standing!
        </p>
      </div>
    </>
  );
};

export default Introduction;
