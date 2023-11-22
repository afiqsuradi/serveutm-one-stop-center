import { useNavigate } from "react-router-dom";
import { ServiceType } from "../../hooks/Services/useServices";
import useDeleteService from "../../hooks/Services/useDeleteService";

interface Props {
  services?: ServiceType[];
}

const ServicesTable = ({ services }: Props) => {
  const navigate = useNavigate();
  const { deleteService } = useDeleteService();

  const deleteUser = async (username: string, id: string) => {
    await deleteService(username, id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table ">
        {/* head */}
        <thead>
          <tr>
            <th>Title</th>
            <th>By</th>
            <th>Category</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {services
            ? services.map((service) => {
                return (
                  <tr key={service.title}>
                    <td>I will {service.title}</td>
                    <td>
                      <p
                        className="hover:underline hover:cursor-pointer"
                        onClick={() => {
                          navigate(
                            `/dashboard/users/setting/${service.owner.username}`
                          );
                        }}
                      >
                        {service.owner.username}
                      </p>
                    </td>
                    <td>{service.category}</td>
                    <td>{service.isApproved}</td>
                    <td>
                      <button
                        className="btn btn-active btn-sm btn-primary w-[5rem] mx-2"
                        onClick={() =>
                          navigate(`/dashboard/services/setting/${service._id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn bg-red-700 hover:bg-red-800 btn-sm w-[5rem] mx-2 text-white"
                        onClick={() =>
                          void deleteUser(service.owner.username, service._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesTable;
