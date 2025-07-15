import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import { useFetch } from "../../../hooks/useFetch";
import { useForm } from "react-hook-form";

import Input from "../../inputs/Input";
import Select from "../../inputs/Select";

const CreatePart = () => {
  const { handleSubmit, control, reset } = useForm();
  const { fetch } = useFetch();
  const { openToastWithContent } = useContext(Context);

  const [boats, setBoats] = useState([]);

  const onSubmit = async (data) => {
    const { boat_id, ...rest } = data;

    const result = await fetch("/parts", "POST", { boat_id: boat_id.key, ...rest });
    if (result) openToastWithContent("s", "Parte creada con éxito");
    if (result) reset();
  };

  useEffect(() => {
    const getBoats = async () => {
      const result = await fetch("/boats");
      if (result) setBoats(result);
    };
    getBoats();
  }, []);

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex gap-5">
        <div className="w-full sm:w-md">
          <Select
            label="Lanchas"
            placeholder="Seleccione una lancha"
            data={boats}
            name="boat_id"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 w-fit sm:w-md">
        <div className="flex-1">
          <Input
            label="Nombre"
            placeholder={"Nombre de la parte"}
            defaultValue=""
            name="name"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
        <div className="flex-1">
          <Input
            label="N° serie"
            placeholder={"N° serial"}
            type="number"
            defaultValue=""
            name="serial_number"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <div className="flex gap-5 w-full sm:w-md">
        <div className="flex-1">
          <Input
            label="Descripcion"
            placeholder={"Descripcion de la parte"}
            defaultValue=""
            name="description"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <button className="w-fit bg-primary text-white px-3 py-2 rounded-md hover:brightness-90">
        Crear parte
      </button>
    </form>
  );
};

export default CreatePart;
