import { Disclosure } from "@headlessui/react";
import { classNames, navigation } from ".";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const MobileNav = () => {
  const { Auth } = useAuth();
  const location = useLocation();
  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {navigation.map((item) => {
          const res = item.role.reduce((acc, curr) => {
            if (!acc) {
              return (acc = curr === "all" || curr === Auth.role);
            }
            return acc;
          }, false);
          if (res) {
            return (
              <Disclosure.Button
                as={Link}
                to={item.to}
                key={item.name}
                className={classNames(
                  item.to === location.pathname
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </Disclosure.Button>
            );
          }
        })}
      </div>
    </Disclosure.Panel>
  );
};
export default MobileNav;
