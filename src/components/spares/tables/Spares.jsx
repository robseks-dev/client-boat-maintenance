import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import { useFetch } from "../../../hooks/useFetch";
import { useForm } from "react-hook-form";
import { Trash2, Edit } from "lucide-react";

import Input from "../../inputs/Input";
import EditSpare from "../forms/EditSpare";

const Spares = () => {
  const { control, watch } = useForm();
  const { fetch } = useFetch();
  const { openModalWithContent, openToastWithContent } = useContext(Context);

  const search = watch("search");
  const [spares, setSpares] = useState([]);

  const filteredData = spares.filter((spare) =>
    spare.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    const result = await fetch(`/spares/${id}`, "DELETE");
    if (result) openToastWithContent("s", "Repuesto eliminado con éxito");
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/spares");
      if (result) setSpares(result);
    };
    fetchData();
  }, [fetch]);

  return (
    <div className="flex flex-col gap-3 h-full">
      <p className="text-gray-400">Inventario Repuestos</p>
      <div className="self-end w-72">
        <Input placeholder="Buscar..." defaultValue="" name="search" control={control} />
      </div>
      <div className="h-full overflow-y-auto">
        <table className="w-full max-h-full border-collapse select-none">
          <thead className="text-xs">
            <tr className="bg-gray-100 text-gray-500 text-left">
              <th className="font-medium px-5 py-1">#</th>
              <th className="font-medium p-1">Nombre</th>
              <th className="font-medium p-1">Descripcion</th>
              <th className="font-medium text-center p-1">Tipo</th>
              <th className="font-medium text-center p-1">Cantidad</th>
              <th className="font-medium text-center p-1">Ubicacion</th>
              <th className="font-medium text-center p-1">Estado</th>
              <th className="font-medium text-center p-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((spare, idx) => (
              <tr
                key={idx}
                className={`${idx !== spares.length - 1 ? "border-b border-gray-200" : ""}`}
              >
                <td className="px-5 py-4">{spare.id}</td>
                <td className="px-1 py-4">{spare.name}</td>
                <td className="px-1 py-4">{spare.description}</td>
                <td className="w-[15%] text-center px-1 py-4">{spare.type}</td>
                <td className="w-[15%] text-center px-1 py-4">{spare.quantity}</td>
                <td className="w-[15%] text-center px-1 py-4">{spare.location}</td>
                <td className="w-[15%] text-center px-1 py-4">{spare.status}</td>
                <td className="w-[15%] text-center px-1 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      title="Editar parte"
                      onClick={() => openModalWithContent(EditSpare, "Editar repuesto", spare)}
                      className="text-gray-400 cursor-pointer hover:text-gray-600"
                    >
                      <Edit className="size-5" />
                    </button>
                    <button
                      title="Eliminar parte"
                      onClick={() => handleDelete(spare.id)}
                      className="text-gray-400 cursor-pointer hover:text-gray-600"
                    >
                      <Trash2 className="size-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Spares;
