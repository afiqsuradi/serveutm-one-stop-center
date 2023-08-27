import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { defaultAuthValue } from "../context/authProvider";

const Layout = () => {
  const { Auth, setAuth } = useAuth();

  const logOut = () => {
    setAuth(defaultAuthValue);
  };
  return (
    <>
      <header>
        {Auth.username !== "" ? (
          <button onClick={logOut}>Logout</button>
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
