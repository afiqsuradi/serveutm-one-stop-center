import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { defaultAuthValue } from "../context/authProvider";
import apiClient from "../services/apiClient";

const Layout = () => {
  const { Auth, setAuth } = useAuth();

  const logOut = async () => {
    setAuth(defaultAuthValue);
    try {
      await apiClient.get("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };
  console.log(Auth);
  return (
    <>
      <header>
        {Auth.username !== "" ? (
          <button
            onClick={() => {
              void logOut();
            }}
          >
            Logout
          </button>
        ) : (
          <></>
        )}
      </header>
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
