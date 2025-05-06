import { Outlet } from "react-router-dom";
import AuthComponent from "./AuthComponent";

const Body = () => {
  return (
    <>
      <AuthComponent />
      <Outlet />
    </>
  );
};

export default Body;