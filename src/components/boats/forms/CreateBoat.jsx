import { useContext } from "react";
import { Context } from "../../context/Context";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../hooks/useFetch";

import Input from "../../inputs/Input";

const CreateBoat = () => {
  const { handleSubmit, control, reset } = useForm();
  const { fetch } = useFetch();
  const { openToastWithContent } = useContext(Context);

  const onSubmit = async (data) => {
    const result = await fetch("/boats", "POST", data);
    if (result) openToastWithContent("s", "Lancha creada con éxito");
    if (result) reset();
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-5">
        <div className="w-full sm:w-64">
          <Input
            label="Nombre"
            placeholder={"Nombre de la lancha"}
            defaultValue=""
            name="name"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
        <div className="w-full sm:w-64">
          <Input
            label="N° de registro"
            type="number"
            placeholder={"123456"}
            defaultValue=""
            name="registration_number"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="w-full sm:w-64">
          <Input
            label="Modelo"
            placeholder={"Modelo de la lancha"}
            type="number"
            defaultValue=""
            name="model"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
        <div className="w-full sm:w-64">
          <Input
            label="Marca"
            placeholder={"Marca de la lancha"}
            defaultValue=""
            name="brand"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="w-full sm:w-64">
          <Input
            label="Año"
            placeholder={"Año de la lancha"}
            type="number"
            defaultValue=""
            name="year"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
        <div className="w-full sm:w-64">
          <Input
            label="Placa"
            placeholder={"Placa de la lancha"}
            defaultValue=""
            name="plate"
            control={control}
            uppercase
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <button className="w-fit bg-primary text-white px-3 py-2 rounded-md hover:brightness-90">
        Crear lancha
      </button>
    </form>
  );
};

export default CreateBoat;
