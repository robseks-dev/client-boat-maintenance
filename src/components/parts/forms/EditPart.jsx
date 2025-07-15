import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import { useFetch } from "../../../hooks/useFetch";
import { useForm } from "react-hook-form";

import Input from "../../inputs/Input";
import Select from "../../inputs/Select";

const EditPart = ({ props }) => {
  const { handleSubmit, control } = useForm();
  const { fetch } = useFetch();
  const { openToastWithContent, closeModal } = useContext(Context);

  //const [boats, setBoats] = useState([]);

  const onSubmit = async (data) => {
    const { name, description, serial_number } = data;

    const result = await fetch(`/parts/${props.id}`, "PUT", { name, description, serial_number });
    if (result) openToastWithContent("s", "Parte editada con éxito");
    if (result) closeModal();
  };

  /* useEffect(() => {
    const getBoats = async () => {
      const result = await fetch("/boats");
      if (result) setBoats(result);
    };
    getBoats();
  }, []); */

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex gap-5">
        <div className="w-md">
          <Select
            label="Lanchas"
            placeholder="Seleccione una lancha"
            defaultValue={{ key: props.boat_id, value: props.boat }}
            data={[]}
            name="boat_id"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
            disabled
          />
        </div>
      </div>
      <div className="flex gap-5 w-md">
        <div className="flex-1">
          <Input
            label="Nombre"
            placeholder={"Nombre de la parte"}
            defaultValue={props.name}
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
            defaultValue={props.serial_number}
            name="serial_number"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <div className="flex gap-5 w-md">
        <div className="flex-1">
          <Input
            label="Descripcion"
            placeholder={"Descripcion de la parte"}
            defaultValue={props.description}
            name="description"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <button className="w-fit bg-primary text-white px-3 py-2 rounded-md hover:brightness-90">
        Editar parte
      </button>
    </form>
  );
};

export default EditPart;
