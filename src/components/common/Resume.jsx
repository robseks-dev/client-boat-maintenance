import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";

import { X, Hash, Sailboat, Wrench } from "lucide-react";

const Resume = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;
  const { fetch } = useFetch();

  const [maintenances, setMaintenances] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchMaintenances = async () => {
      const result = await fetch(`/maintenances/part/${data.id}`);
      setMaintenances(result);
    };
    fetchMaintenances();
  }, [data.id]);

  useEffect(() => {
    const fetchMaintenances = async () => {
      const result = await fetch(`/maintenances/count/${data.id}`);
      setCount(result[0].maintenances);
    };
    fetchMaintenances();
  }, [data.id]);

  return (
    <div className="fixed inset-0 flex items-center justify-end bg-black/50 p-5 select-none">
      <div className="flex flex-col gap-7 min-w-md max-w-md h-full bg-white p-4 rounded-md">
        <div className="flex items-center justify-between">
          <h2 className="font-poppins font-medium text-gray-400">
            {data.name.toUpperCase()} <span className="text-black">#{data.id}</span>
          </h2>
          <X onClick={onClose} className="size-5 cursor-pointer" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 w-36 text-gray-500">
              <Hash className="size-4" />
              <p>N° serie</p>
            </div>
            <div>
              <p>{data.serial_number}</p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 w-36 text-gray-500">
              <Sailboat className="size-4" />
              <p>Lancha</p>
            </div>
            <div>
              <p>{data.boat}</p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 w-36 text-gray-500">
              <Wrench className="size-4" />
              <p>Mantenimientos</p>
            </div>
            <div>
              <p>{count}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 overflow-y-auto">
          {maintenances.map((maintenance, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between font-medium">
                  <p>CAMBIO DE ACEITE</p>
                  <p>{maintenance.date.split("T")[0]}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>{maintenance.type}</p>
                  <div className="w-fit bg-green-100 text-green-500 p-[6px] rounded-md">
                    <p>Realizado</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 border border-gray-300 rounded-md p-2">
                <div className="flex items-center justify-between">
                  <p>Subtotal</p>
                  <p>${formatNumber(maintenance.value)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>IVA</p>
                  <p>${formatNumber(maintenance.value * 0.19)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Total</p>
                  <p>${formatNumber(maintenance.value + maintenance.value * 0.19)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const formatNumber = (number) => {
  const parsed = parseFloat(number);
  if (isNaN(parsed)) return "";
  return parsed
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default Resume;
