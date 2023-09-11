import { Link, useLocation } from "react-router-dom";
import { NavLinksType, classNames, navigation } from ".";
import { useAuth } from "../../hooks/useAuth";
import ROUTES from "../../constants/path";
const NavLink = ({ name, to }: NavLinksType) => {
  return (
    <Link
      to={to}
      className={classNames(
        to === location.pathname
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white",
        "rounded-md px-3 py-2 text-sm font-medium flex justify-center items-center"
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
        <Link
          to={ROUTES.HOMEPAGE}
          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium"
        >
          ServeUTM
        </Link>
        {navigation.map((item) => {
          const res = item.role.reduce((_acc, curr) => {
            return curr === "all" || curr === Auth.role;
          }, false);
          if (res) {
            return (
              <NavLink
                key={item.name}
                {...item}
                currentLocation={location.pathname}
              />
            );
          }
          return "";
        })}
      </div>
    </div>
  );
};

export default NavLinks;
