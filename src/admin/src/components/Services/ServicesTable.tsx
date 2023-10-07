import { useNavigate } from "react-router-dom";
import { ServiceType } from "../../hooks/Services/useServices";

interface Props {
  services?: ServiceType[];
}

const ServicesTable = ({ services }: Props) => {
  const navigate = useNavigate();
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
                    <td>
                      {service.isApproved ? "Approved" : "Pending Approval"}
                    </td>
                    <td>
                      <button className="btn btn-active btn-sm btn-primary w-[5rem]">
                        Edit
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
