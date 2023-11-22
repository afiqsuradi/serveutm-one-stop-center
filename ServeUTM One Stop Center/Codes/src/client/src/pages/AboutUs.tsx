import Introduction from "@/partials/AboutUs/Introduction";
import TeamCard from "@/partials/AboutUs/TeamCard";
import Vision from "@/partials/AboutUs/Vision";

const AboutUs = () => {
  return (
    <>
      <div className="container py-12">
        <Introduction />
      </div>
      <div className="light bg-slate-300 w-full">
        <div className="container text-center space-y-6 p-12">
          <Vision />
        </div>
      </div>
      <div className="light bg-background/90 w-full">
        <div className="container">
          <TeamCard />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
