import relax from "@/assets/relax.svg";
const Publish = () => {
  return (
    <div className="flex flex-col gap-6 justify-center text-center my-12">
      <img src={relax} className="w-[20rem] ml-auto mr-auto" />
      <div>
        <h1 className="text-3xl">You're almost there!</h1>
        <p className="text-lg font-thin">
          Let’s publish your Gig and get you ready to start selling.
        </p>
      </div>
    </div>
  );
};

export default Publish;
