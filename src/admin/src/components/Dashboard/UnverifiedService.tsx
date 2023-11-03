import { useNavigate } from "react-router-dom";
import { ServiceType } from "../../hooks/Services/useServices";

interface Props {
  data?: ServiceType[];
}
const UnverifiedService = ({ data }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="card text-black dark:bg-[#1D283A] dark:text-white p-6 col-start-2 row-span-2 w-full">
      <h1 className=" font-semibold text-2xl">Pending Services</h1>
      <div className="my-6">
        {data && data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>By</th>
                </tr>
              </thead>
              <tbody>
                {data.map((service, idx) => (
                  <tr
                    className="hover hover:cursor-pointer"
                    onClick={() =>
                      navigate(`/dashboard/services/setting/${service._id}`)
                    }
                  >
                    <th>{idx + 1}</th>
                    <td>I will {service.title}</td>
                    <td>{service.category}</td>
                    <td>{service.owner.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border rounded-lg flex justify-center items-center p-4">
            <h4>No Pending Services Found</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnverifiedService;
