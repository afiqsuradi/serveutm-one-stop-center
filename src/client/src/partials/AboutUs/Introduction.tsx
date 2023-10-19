import teams from "@/assets/teams.svg";
const Introduction = () => {
  return (
    <div className="md:grid md:grid-cols-2 items-center">
      <div>
        <h1 className="text-7xl">About Us</h1>
        <p className="text-2xl my-6 max-w-[90%]">
          "Welcome to our one-stop-center website, tailored exclusively for UTM
          students. Created by a team of six dedicated third-year students, we
          provide essential resources and support for your academic journey."
        </p>
      </div>
      <div className="hidden md:inline-block">
        <img src={teams} />
      </div>
    </div>
  );
};

export default Introduction;
