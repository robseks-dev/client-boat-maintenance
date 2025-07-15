import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import { useFetch } from "../../../hooks/useFetch";
import { useForm } from "react-hook-form";
import { Trash2, Edit, NotebookText } from "lucide-react";

import Input from "../../inputs/Input";
import EditBoat from "../forms/EditBoat";

const Boats = () => {
  const { control, watch } = useForm();
  const { fetch } = useFetch();
  const { openModalWithContent, openToastWithContent, openResumeWithContent } = useContext(Context);

  const search = watch("search");
  const [boats, setBoats] = useState([]);

  const filteredData = boats.filter((boat) =>
    boat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    const result = await fetch(`/boats/${id}`, "DELETE");
    if (result) openToastWithContent("s", "Lancha eliminada con éxito");
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/boats/list");
      if (result) setBoats(result);
    };
    fetchData();
  }, [fetch]);

  return (
    <div className="flex flex-col gap-3 h-full">
      <p className="text-gray-400">Listado de lanchas</p>
      <div className="self-end w-72">
        <Input placeholder="Buscar..." defaultValue="" name="search" control={control} />
      </div>
      <div className="h-full overflow-y-auto">
        <table className="w-full max-h-full border-collapse select-none">
          <thead className="text-xs">
            <tr className="bg-gray-100 text-gray-500 text-left">
              <th className="font-medium px-5 py-1">#</th>
              <th className="font-medium p-1">Nombre</th>
              <th className="font-medium p-1">Numero de registro</th>
              <th className="font-medium text-center p-1">Marca</th>
              <th className="font-medium text-center p-1">Modelo</th>
              <th className="font-medium text-center p-1">Año</th>
              <th className="font-medium text-center p-1">Placa</th>
              <th className="font-medium text-center p-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((boat, idx) => (
              <tr
                key={idx}
                className={`${idx !== boats.length - 1 ? "border-b border-gray-200" : ""}`}
              >
                <td className="px-5 py-4">{boat.id}</td>
                <td className="px-1 py-4">{boat.name}</td>
                <td className="px-1 py-4">{boat.registration_number}</td>
                <td className="w-[15%] text-center px-1 py-4">{boat.brand}</td>
                <td className="w-[15%] text-center px-1 py-4">{boat.model}</td>
                <td className="w-[15%] text-center px-1 py-4">{boat.year}</td>
                <td className="w-[15%] text-center px-1 py-4">{boat.plate}</td>
                <td className="w-[15%] text-center px-1 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      title="Editar parte"
                      onClick={() => openModalWithContent(EditBoat, "Editar lancha", boat)}
                      className="text-gray-400 cursor-pointer hover:text-gray-600"
                    >
                      <Edit className="size-5" />
                    </button>
                    <button
                      title="Eliminar parte"
                      onClick={() => handleDelete(boat.id)}
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

export default Boats;
