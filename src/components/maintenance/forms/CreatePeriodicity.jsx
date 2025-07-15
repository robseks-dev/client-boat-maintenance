import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../hooks/useFetch";

import Input from "../../inputs/Input";
import Select from "../../inputs/Select";
import TextArea from "../../inputs/TextArea";

const CreatePeriodicity = () => {
  const { handleSubmit, control, reset } = useForm();
  const { fetch } = useFetch();
  const { openToastWithContent } = useContext(Context);

  const [boats, setBoats] = useState([]);
  const [parts, setParts] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleChange = async (e) => {
    const { key } = e;
    if (key === "") return setParts([]);

    const result = await fetch(`/parts/boat/${key}`);
    if (result) setParts(result);
  };

  const handleSelectAll = () => {
    const newSelectAll = !allSelected;
    setAllSelected(newSelectAll);

    if (newSelectAll) {
      setSelectedRows(parts);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowChange = (row) => {
    let updatedSelectedRows;

    if (selectedRows.some((selectedRow) => selectedRow.id === row.id)) {
      updatedSelectedRows = selectedRows.filter((selectedRow) => selectedRow.id !== row.id);
    } else {
      updatedSelectedRows = [...selectedRows, row];
    }

    setSelectedRows(updatedSelectedRows);
    setAllSelected(updatedSelectedRows.length === row.length);
  };

  const onSubmit = async (data) => {
    if (selectedRows.length === 0)
      return openToastWithContent("w", "Debe seleccionar al menos un parte para continuar");

    const { planning, ...rest } = data;

    const result = await fetch("/periodicities", "POST", {
      ...rest,
      type: planning.value,
      parts: selectedRows,
    });

    if (result) openToastWithContent("s", "Periodo de mantenimiento creado con éxito");
    if (result) setAllSelected(false);
    if (result) setSelectedRows([]);
    if (result) setParts([]);
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
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full overflow-y-auto"
    >
      <div className="flex flex-col gap-3">
        <p className="text-gray-400">Crear periodos de mantenimiento</p>
        <div className="flex gap-5">
          <div className="w-64">
            <Select
              label="Lanchas"
              placeholder="Seleccione una lancha"
              data={boats}
              name="boat_id"
              control={control}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="min-h-96 max-h-96 overflow-y-auto">
        <table className="w-full max-h-full border-collapse select-none">
          <thead className="text-xs">
            <tr className="bg-gray-100 text-gray-500 text-left">
              <th className="font-medium px-5 py-1">
                <input type="checkbox" onChange={handleSelectAll} />
              </th>
              <th className="font-medium p-1">Nombre</th>
              <th className="font-medium p-1">Descripcion</th>
              <th className="font-medium text-center p-1">N° serie</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part, idx) => (
              <tr key={idx} className={`${idx % 2 === 0 ? "border-b border-gray-200" : ""}`}>
                <td className="px-5 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.some((selectedRow) => selectedRow.id === part.id)}
                    onChange={() => handleRowChange(part)}
                  />
                </td>
                <td className="px-1 py-4">{part.name}</td>
                <td className="w-[40%] px-1 py-4">{part.description}</td>
                <td className="w-[30%] text-center px-1 py-4">{part.serial_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex">
        <div className="flex-1">
          <TextArea
            label="Descripcion del mantenimiento"
            defaultValue=""
            name="description"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex-1">
          <Input
            label="Fecha inicial"
            type="date"
            defaultValue=""
            name="date"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Periodicidad (meses)"
            type="number"
            placeholder="Ingrese la periodicidad en meses"
            defaultValue=""
            name="periodicity"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
        <div className="flex-1">
          <Select
            label="Tipo de planeacion"
            placeholder="Seleccione el tipo de planeacion"
            data={[
              {
                key: 1,
                value: "Preventiva",
              },
              {
                key: 2,
                value: "Correctiva",
              },
            ]}
            name="planning"
            control={control}
            rules={{ required: { value: true, message: "Campo requerido" } }}
          />
        </div>
      </div>
      <button className="w-fit bg-primary text-white px-3 py-2 rounded-md hover:brightness-90">
        Crear periodo
      </button>
    </form>
  );
};

export default CreatePeriodicity;
