import { useContext } from "react";
import { Context } from "../../context/Context";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../hooks/useFetch";

import Input from "../../inputs/Input";

const EditBoat = ({ props }) => {
  const { handleSubmit, control } = useForm();
  const { fetch } = useFetch();
  const { openToastWithContent, closeModal } = useContext(Context);

  const onSubmit = async (data) => {
    const result = await fetch(`/boats/${props.id}`, "PUT", data);
    if (result) openToastWithContent("s", "Lancha editada con éxito");
    if (result) closeModal();
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex gap-5">
        <div className="w-64">
          <Input
            label="Nombre"
            placeholder={"Nombre de la lancha"}
            defaultValue={props.name}
            name="name"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
        <div className="w-64">
          <Input
            label="N° de registro"
            type="number"
            placeholder={"123456"}
            defaultValue={props.registration_number}
            name="registration_number"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="w-64">
          <Input
            label="Modelo"
            placeholder={"Modelo de la lancha"}
            type="number"
            defaultValue={props.model}
            name="model"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
        <div className="w-64">
          <Input
            label="Marca"
            placeholder={"Marca de la lancha"}
            defaultValue={props.brand}
            name="brand"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="w-64">
          <Input
            label="Año"
            placeholder={"Año de la lancha"}
            type="number"
            defaultValue={props.year}
            name="year"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
        <div className="w-64">
          <Input
            label="Placa"
            placeholder={"Placa de la lancha"}
            defaultValue={props.plate}
            name="plate"
            control={control}
            uppercase
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <button className="w-fit bg-primary text-white px-3 py-2 rounded-md hover:brightness-90">
        Editar lancha
      </button>
    </form>
  );
};

export default EditBoat;
