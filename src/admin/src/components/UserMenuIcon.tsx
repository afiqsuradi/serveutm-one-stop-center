import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import useLogout from "../hooks/useLogout";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import routes from "../constants/routes";

const UserMenuIcon = () => {
  const { Auth } = useAuth();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
  };
  return (
    <Menu as="div" className="relative ml-3 hover:cursor-pointer">
      <div>
        <Menu.Button>
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src={Auth.profileImage} />
            </div>
          </div>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white dark:bg-[#182235] border border-slate-700 rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => {
              return (
                <Link
                  to={routes.PROFILE}
                  className={`${
                    active ? "bg-gray-200 dark:bg-slate-900" : ""
                  } block px-4 py-2 text-sm text-gray-950 dark:text-slate-200`}
                >
                  Profile
                </Link>
              );
            }}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${
                  active ? "bg-gray-200 dark:bg-slate-900" : ""
                } block px-4 py-2 text-sm text-gray-950 dark:text-slate-200`}
              >
                Settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${
                  active ? "bg-gray-200 dark:bg-slate-900" : ""
                } block px-4 py-2 text-sm text-gray-950 dark:text-slate-200`}
                onClick={() => {
                  void signOut();
                }}
              >
                Sign Out
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenuIcon;
