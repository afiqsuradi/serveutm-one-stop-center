import { useState } from "react";
import UserSearchBar from "../../../components/Users/UserSearchBar";
import UsersTable from "../../../components/Users/UsersTable";
import useUsers, { UsersFilterType } from "../../../hooks/Users/useUsers";
import UserTablePagination from "../../../components/Users/UserTablePagination";

const Users = () => {
  const [filters, setFilters] = useState<UsersFilterType>({ limit: 5 });
  const { data, setError } = useUsers(filters);
  if (!data) return;
  return (
    <div className="card bg-white text-black dark:bg-[#1D283A] dark:text-white md:w-[90%] mx-auto my-8">
      <div className="card-body">
        <h2 className="card-title max-w-fit">List of users</h2>
        <UserSearchBar setFilters={setFilters} setError={setError} />
        <UsersTable Users={data?.users} />
        <UserTablePagination
          count={data.count}
          setFilters={setFilters}
          limit={filters.limit || 1}
          page={filters.page || 1}
        />
      </div>
    </div>
  );
};

export default Users;
