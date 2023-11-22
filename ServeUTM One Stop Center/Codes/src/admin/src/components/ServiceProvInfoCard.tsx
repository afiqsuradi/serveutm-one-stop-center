import useServiceProviderProfile from "../hooks/Users/useServiceProviderProfile";

const ServiceProvInfoCard = ({
  username,
  deps,
}: {
  username: string;
  deps?: any[];
}) => {
  const { response, success } = useServiceProviderProfile(
    username,
    deps,
    false
  );
  if (!success) return "";
  return (
    <div className="card card-side bg-white dark:bg-[#1D283A] shadow-xl text-black dark:text-white my-8 max-w-[24rem]">
      <div className="card-body">
        <div>
          <h3>Description</h3>
          <p>{response?.description}</p>
        </div>
        <div className="divider"></div>
        <div>
          <h3>Languages</h3>
          <div className="mt-4">
            {response?.language.map((lang) => (
              <div className="tooltip px-2" data-tip={lang.level}>
                <div className="badge badge-primary">{lang.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="divider"></div>
        <div>
          <h3>Skills</h3>
          <div className="mt-4">
            {response?.skills.map((skill) => (
              <div className="tooltip px-2" data-tip={skill.level}>
                <div className="badge badge-primary">{skill.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="divider"></div>
        <a className="link link-info">Personal Website</a>
      </div>
    </div>
  );
};

export default ServiceProvInfoCard;
