import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../hooks/useFetch";
import { chaoticOrbit } from "ldrs";

import Input from "../../inputs/Input";
import Select from "../../inputs/Select";

chaoticOrbit.register();

const CreateReport = () => {
  const { handleSubmit, control, reset } = useForm();
  const { fetch } = useFetch();
  const { openToastWithContent } = useContext(Context);

const [isLoading, setIsLoading] = useState(false);

  const data = [
    { key: "boat", value: "Embarcacion" },
    { key: "passenger", value: "Pasajeros" },
  ];

  const onSubmit = async (data) => {
    data.report = data.report.key;

    setIsLoading(true);
    const result = await fetch(`/inspection/${data.report}/date`, "POST", { date: data.date });
    if (result) setIsLoading(false);

    const arrayBuffer = Object.values(result);
    const pdfUint8Array = new Uint8Array(arrayBuffer);
    const blob = new Blob([pdfUint8Array], { type: "application/pdf" });

    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-5">
        <div className="w-full sm:w-64">
          <Select
            label="Reportes"
            placeholder="Seleccione un reporte"
            data={data}
            name="report"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
        <div className="w-full sm:w-64">
          <Input
            label="Fecha"
            type="date"
            defaultValue=""
            name="date"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center gap-3">
          <l-chaotic-orbit size="25" speed="1.5" color="#d7b56d"></l-chaotic-orbit>
          <p>Generando reporte...</p>
        </div>
      ) : (
        <button className="w-fit bg-primary text-white px-3 py-2 rounded-md hover:brightness-90">
          Generar
        </button>
      )}
    </form>
  );
};

export default CreateReport;
