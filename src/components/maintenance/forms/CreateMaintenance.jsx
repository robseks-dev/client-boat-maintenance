import { useContext } from "react";
import { Context } from "../../context/Context";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../hooks/useFetch";

import Input from "../../inputs/Input";
import File from "../../inputs/File";

const CreateMaintenance = ({ props }) => {
  const { handleSubmit, control, watch, reset } = useForm();
  const { fetch } = useFetch();
  const { openToastWithContent } = useContext(Context);

  const file = watch("evidence");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("date", data.date);
    formData.append("hours_navigation", data.hours_navigation);
    formData.append("description", data.description);
    formData.append("report", data.report);
    formData.append("result", data.result);
    formData.append("value", data.value);
    formData.append("periodicity_id", props.id);
    formData.append("part_id", props.part_id);
    formData.append("boat_id", props.boat_id);
    formData.append("evidence", data.evidence);

    const result = await fetch("/maintenances", "POST", formData);
    if (result) openToastWithContent("s", "Mantenimiento registrado con éxito");
    if (result) reset();
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex gap-5">
        <div className="w-64">
          <Input
            label="Fecha"
            type="date"
            defaultValue={props.date}
            name="date"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
            disabled
          />
        </div>
        <div className="w-64">
          <Input
            label="Horas de navegacion"
            type="number"
            placeholder="Ingrese las horas de navegacion"
            defaultValue=""
            name="hours_navigation"
            control={control}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex-1">
          <Input
            label="Novedades"
            placeholder={"Novedades del mantenimiento"}
            defaultValue={props.description}
            name="description"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex-1">
          <Input
            label="Informe del trabajo"
            placeholder={"Informe del mantenimiento"}
            defaultValue=""
            name="report"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex-1">
          <Input
            label="Resultado del trabajo"
            placeholder={"Resultado del mantenimiento"}
            defaultValue=""
            name="result"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex-1">
          <Input
            label="Valor del trabajo"
            placeholder={"Valor del mantenimiento"}
            type="number"
            defaultValue=""
            name="value"
            control={control}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex-1">
          <File
            label="Resultado del trabajo"
            defaultValue={null}
            name="evidence"
            control={control}
            file={file}
            rules={{ required: { value: true, message: "Evidencia requerida" } }}
          />
        </div>
      </div>
      <button className="w-fit bg-primary text-white px-3 py-2 rounded-md hover:brightness-90">
        Registrar mantenimiento
      </button>
    </form>
  );
};

export default CreateMaintenance;
