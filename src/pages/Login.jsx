import { useContext, useState } from "react";
import { Context } from "../components/context/Context";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import logo from "../assets/images/logo.png";

import Input from "../components/inputs/Input";

const Login = () => {
  const { handleSubmit, control } = useForm();
  const { auth, signIn } = useContext(Context);

  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    const response = await signIn(data);
    if (!response) setError("Credenciales incorrectas");
  };

  if (auth) {
    return <Navigate to="/platform" />;
  }

  return (
    <section className="flex items-center justify-center h-screen bg-[#f8f8f8] font-inter text-sm">
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 bg-white p-5 rounded-md border border-[#e1e1e1]"
      >
        <div className="w-80">
          <img src={logo} alt="logo" className="size-full object-cover" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-5">
              <div className="w-80">
                <Input
                  label="Usuario"
                  placeholder="Ingrese su usuario"
                  defaultValue=""
                  name="username"
                  control={control}
                />
              </div>
              <div className="w-80">
                <Input
                  label="Contraseña"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  defaultValue=""
                  name="password"
                  control={control}
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <button className="w-fit bg-primary text-white px-3 py-2 rounded-md hover:brightness-90">
            Entrar
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
