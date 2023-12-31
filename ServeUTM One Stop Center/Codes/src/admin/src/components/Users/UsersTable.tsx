import { User } from "../../hooks/Users/useUsers";
import useDeleteUser from "../../hooks/Users/useDeleteUser";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Props {
  Users: User[];
}

const UsersTable = ({ Users }: Props) => {
  const { Auth } = useAuth();
  const navigate = useNavigate();
  const { deleteUser } = useDeleteUser();
  return (
    <div className="overflow-x-auto">
      <table className="table ">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Users.map((user) => {
            if (Auth.username === user.username) return "";
            return (
              <tr key={user.username}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.profileImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.username}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <div className="badge badge-accent">Admin</div>
                  ) : user.role === "user" ? (
                    <div className="badge badge-primary">User</div>
                  ) : user.role === "service_provider" ? (
                    <div className="badge h-max badge-secondary">
                      Service Provider
                    </div>
                  ) : (
                    ""
                  )}
                </td>
                <th>
                  <button
                    className="btn btn-primary btn-sm m-1 w-20"
                    onClick={() => {
                      navigate(`/dashboard/users/setting/${user.username}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn bg-red-700 hover:bg-red-800 text-white m-1 w-20 btn-sm"
                    onClick={() => {
                      void deleteUser(user.username);
                    }}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
