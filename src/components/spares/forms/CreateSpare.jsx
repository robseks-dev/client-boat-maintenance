import { useContext } from "react";
import { Context } from "../../context/Context";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../hooks/useFetch";

import Input from "../../inputs/Input";
import TextArea from "../../inputs/TextArea";

const CreateSpare = () => {
  const { handleSubmit, control, reset, setValue } = useForm();
  const { fetch } = useFetch();
  const { openToastWithContent } = useContext(Context);

  const onSubmit = async (data) => {
    const result = await fetch("/spares", "POST", data);
    if (result) openToastWithContent("s", "Repuesto creado con éxito");
    if (result) reset();
    if (result) setValue("description", "");
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-5">
        <div className="w-full sm:w-64">
          <Input
            label="Nombre"
            placeholder={"Nombre del repuesto/elemento"}
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
            name="location"
            control={control}
          />
        </div>
        <div className="w-full sm:w-64">
          <Input
            label="Cantidad"
            placeholder={"Cantidad en bodega"}
            type="number"
            defaultValue=""
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
            defaultValue=""
            name="value"
            control={control}
          />
        </div>
        <div className="w-full sm:w-64">
          <Input
            label="Fecha de ingreso"
            placeholder={"Fecha de ingreso"}
            type="date"
            defaultValue=""
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
            defaultValue=""
            name="status"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <button className="w-fit bg-primary text-white px-3 py-2 rounded-md hover:brightness-90">
        Agregar repuesto
      </button>
    </form>
  );
};

export default CreateSpare;
