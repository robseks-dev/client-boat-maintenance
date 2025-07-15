import { useContext } from "react";
import { Context } from "../context/Context";
import { Navigate, Outlet } from "react-router";
import { chaoticOrbit } from "ldrs";

chaoticOrbit.register();

const AuthValidate = () => {
  const { auth, isLoading } = useContext(Context);

  if (isLoading) {
    return (
      <div className="grid justify-items-center items-center w-full h-screen">
        <l-chaotic-orbit size="40" speed="1.5" color="#d7b56d"></l-chaotic-orbit>
      </div>
    );
  }

  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthValidate;