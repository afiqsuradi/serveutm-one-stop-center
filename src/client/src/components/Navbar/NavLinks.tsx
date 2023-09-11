import { Link, useLocation } from "react-router-dom";
import { NavLinksType, classNames, navigation } from ".";
import { useAuth } from "../../hooks/useAuth";

const NavLink = ({ name, to }: NavLinksType) => {
  return (
    <Link
      to={to}
      className={classNames(
        to === location.pathname
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white",
        "rounded-md px-3 py-2 text-sm font-medium"
      )}
    >
      {name}
    </Link>
  );
};

const NavLinks = () => {
  const { Auth } = useAuth();
  const location = useLocation();
  return (
    <div className="hidden sm:ml-6 sm:block">
      <div className="flex space-x-4">
        {navigation.map((item) => {
          if (item.role === "all" || item.role === Auth.role) {
            return (
              <NavLink
                key={item.name}
                {...item}
                currentLocation={location.pathname}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default NavLinks;
