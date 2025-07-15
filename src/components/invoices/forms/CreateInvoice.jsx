import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import { useFetch } from "../../../hooks/useFetch";
import { useForm } from "react-hook-form";
import { chaoticOrbit } from "ldrs";

import Input from "../../inputs/Input";
import Select from "../../inputs/Select";

chaoticOrbit.register();

const CreateInvoice = () => {
  const { handleSubmit, control, reset } = useForm();
  const { fetch } = useFetch();
  const { openToastWithContent } = useContext(Context);

  const [boats, setBoats] = useState([]);
  const [parts, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { boat_id, part_id, ...rest } = data;

    const result = await fetch("/maintenances/invoice", "POST", { part: part_id.key, ...rest });
    if (result) setIsLoading(false);

    const arrayBuffer = Object.values(result);
    const pdfUint8Array = new Uint8Array(arrayBuffer);
    const blob = new Blob([pdfUint8Array], { type: "application/pdf" });

    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");

    /* if (result) openToastWithContent("s", "Parte creada con éxito");
    if (result) reset(); */
  };

  const handleChange = async (value) => {
    const { key } = value;
    const part = await fetch(`/parts/boat-keys/${key}`);
    if (part) setParts(part);
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
      <div className="flex gap-5 w-md">
        <div className="flex-1">
          <Select
            label="Lanchas"
            placeholder="Seleccione una lancha"
            data={boats}
            name="boat_id"
            control={control}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <Select
            label="Partes"
            placeholder="Seleccione una parte"
            data={parts}
            name="part_id"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <div className="flex gap-5 w-md">
        <div className="flex-1">
          <Input
            label="Fecha inicial"
            type="date"
            defaultValue=""
            name="date_start"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Fecha final"
            type="date"
            defaultValue=""
            name="date_end"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center gap-3">
          <l-chaotic-orbit size="25" speed="1.5" color="#d7b56d"></l-chaotic-orbit>
          <p>Generando factura...</p>
        </div>
      ) : (
        <button className="w-fit bg-primary text-white px-3 py-2 rounded-md hover:brightness-90">
          Generar factura
        </button>
      )}
    </form>
  );
};

export default CreateInvoice;
