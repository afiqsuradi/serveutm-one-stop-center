import { Fragment } from "react";
import { classNames } from ".";
import { Menu, Transition } from "@headlessui/react";
import useLogout from "../../hooks/useLogout";
import { Link } from "react-router-dom";
import ROUTES from "../../constants/path";
import { useAuth } from "../../hooks/useAuth";
import { Avatar } from "@chakra-ui/react";

const UserMenu = () => {
  const logout = useLogout();
  const { Auth } = useAuth();
  const signOut = async () => {
    await logout();
  };
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <Avatar src={`${Auth.profileImage}`} width="2.6rem" height="2.6rem" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => {
              return (
                <Link
                  to={ROUTES.USER_PROFILE}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Your Profile
                </Link>
              );
            }}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to={ROUTES.USER_SETTING}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Settings
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                onClick={() => void signOut()}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer "
                )}
              >
                Sign out
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
