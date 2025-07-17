import { useContext } from "react";
import { Context } from "../../context/Context";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../hooks/useFetch";

import Input from "../../inputs/Input";
import TextArea from "../../inputs/TextArea";

const EditSpare = ({ props }) => {
  const { handleSubmit, control } = useForm();
  const { fetch } = useFetch();
  const { openToastWithContent, closeModal } = useContext(Context);

  const onSubmit = async (data) => {
    const result = await fetch(`/spares/${props.id}`, "PUT", data);
    if (result) openToastWithContent("s", "Repuesto editado con éxito");
    if (result) closeModal();
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-5">
        <div className="w-full sm:w-64">
          <Input
            label="Nombre"
            placeholder={"Nombre del repuesto/elemento"}
            defaultValue={props.name}
            name="name"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
        <div className="w-full sm:w-64">
          <Input
            label="Tipo"
            type="text"
            placeholder={"Ej: Motores, Electricidad, Casco"}
            defaultValue={props.type}
            name="type"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        <div className="w-full">
          <TextArea
            label="Descripcion"
            placeholder={"Incluye especificaciones técnicas, material, color, etc."}
            name="description"
            defaultValue={props.description}
            control={control}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="w-full sm:w-64">
          <Input
            label="Ubicacion"
            placeholder={"Ubicacion en bodega"}
            type="text"
            defaultValue={props.location}
            name="location"
            control={control}
          />
        </div>
        <div className="w-full sm:w-64">
          <Input
            label="Cantidad"
            placeholder={"Cantidad en bodega"}
            type="number"
            defaultValue={props.quantity}
            name="quantity"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="w-full sm:w-64">
          <Input
            label="Valor"
            placeholder={"Valor del repuesto"}
            type="number"
            defaultValue={props.value}
            name="value"
            control={control}
          />
        </div>
        <div className="w-full sm:w-64">
          <Input
            label="Fecha de ingreso"
            placeholder={"Fecha de ingreso"}
            type="date"
            defaultValue={props.entry_date.split("T")[0]}
            name="entry_date"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        <div className="w-full">
          <Input
            label="Estado"
            placeholder={"Activo, descontinuado, en pedido, etc."}
            type="text"
            defaultValue={props.status}
            name="status"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <button className="w-fit bg-primary text-white px-3 py-2 rounded-md hover:brightness-90">
        Editar repuesto
      </button>
    </form>
  );
};

export default EditSpare;
