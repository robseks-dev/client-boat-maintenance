import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import { useFetch } from "../../../hooks/useFetch";
import { useForm } from "react-hook-form";
import { Trash2, Edit, NotebookText } from "lucide-react";

import Input from "../../inputs/Input";
import EditPart from "../forms/EditPart";

const Parts = () => {
  const { control, watch } = useForm();
  const { fetch } = useFetch();
  const { openModalWithContent, openToastWithContent, openResumeWithContent } = useContext(Context);

  const search = watch("search");
  const [parts, setParts] = useState([]);

  const filteredData = parts.filter((part) =>
    part.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    const result = await fetch(`/parts/${id}`, "DELETE");
    if (result) openToastWithContent("s", "Parte eliminado con éxito");
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/parts/list");
      if (result) setParts(result);
    };
    fetchData();
  }, [fetch]);

  return (
    <div className="flex flex-col gap-3 h-full">
      <p className="text-gray-400">Listado de partes</p>
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
              <th className="font-medium text-center p-1">N° serie</th>
              <th className="font-medium text-center p-1">Lancha</th>
              <th className="font-medium text-center p-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((part, idx) => (
              <tr
                key={idx}
                className={`${idx !== parts.length - 1 ? "border-b border-gray-200" : ""}`}
              >
                <td className="px-5 py-4">{part.id}</td>
                <td className="px-1 py-4">{part.name}</td>
                <td className="px-1 py-4">{part.description}</td>
                <td className="w-[15%] text-center px-1 py-4">{part.serial_number}</td>
                <td className="w-[15%] text-center px-1 py-4">{part.boat}</td>
                <td className="w-[15%] text-center px-1 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      title="Editar parte"
                      onClick={() => openModalWithContent(EditPart, "Editar parte", part)}
                      className="text-gray-400 cursor-pointer hover:text-gray-600"
                    >
                      <Edit className="size-5" />
                    </button>
                    <button
                      title="Eliminar parte"
                      onClick={() => handleDelete(part.id)}
                      className="text-gray-400 cursor-pointer hover:text-gray-600"
                    >
                      <Trash2 className="size-5" />
                    </button>
                    <button
                      title="Hoja de vida"
                      onClick={() => openResumeWithContent(part)}
                      className="text-gray-400 cursor-pointer hover:text-gray-600"
                    >
                      <NotebookText className="size-5" />
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

export default Parts;
