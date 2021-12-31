import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isToken = localStorage.getItem("token") ? true : false;

  return isToken ? <Outlet /> : <Navigate replace to="/login" />;
};

export default PrivateRoute;
