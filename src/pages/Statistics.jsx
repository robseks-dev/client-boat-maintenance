import { useState, useEffect, useContext } from "react";
import { Context } from "../components/context/Context";
import { useFetch } from "../hooks/useFetch";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import Input from "../components/inputs/Input";
import Select from "../components/inputs/Select";

const Statistics = () => {
  const { control, watch } = useForm();
  const { fetch } = useFetch();

  const boat = watch("boat_id");
  const date = watch("date");

  const [data, setData] = useState([]);
  const [boats, setBoats] = useState([]);
  const [filterIndividual, setFilterIndividual] = useState(null);
  const [filter, setFilter] = useState("M");

  const handleFilter = (filter) => setFilter(filter);

  const handleIndividual = (filter) => {
    if (filterIndividual === filter) setFilterIndividual(null);
    else setFilterIndividual(filter);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { boat_id, date } = watch();

      const result = await fetch(
        `/statistics/${
          filterIndividual === "T"
            ? "tanking/"
            : filterIndividual === "N"
            ? "navigation/"
            : filterIndividual === "P"
            ? "preventive/"
            : filterIndividual === "C"
            ? "corrective/"
            : ""
        }${filter === "M" ? "month" : "year"}`,
        "POST",
        { boat: boat_id?.key, date }
      );
      if (result) setData(result);
    };
    fetchData();
  }, [filterIndividual, filter, boat, date]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/boats");
      if (result) setBoats(result);
    };
    fetchData();
  }, []);

  return (
    <div className="hidden sm:block h-full overflow-y-auto">
      <div className="flex flex-col gap-3 h-full">
        <p className="text-gray-400">Estadisticas consumos</p>
        <div className="flex h-full">
          <div className="w-5/6">
            <div className="flex flex-col gap-5 h-full">
              <div className="flex items-center gap-3 h-1/6">
                <div className="flex items-end gap-3">
                  <div className="w-64">
                    <Select
                      label="Lanchas"
                      placeholder="Seleccione una lancha"
                      data={boats}
                      name="boat_id"
                      control={control}
                      rules={{ required: { value: true, message: "Campo requerido" } }}
                    />
                  </div>
                  <div className="flex items-center gap-3 ml-3">
                    <div
                      title="Tanqueo total"
                      className="border border-gray-300 rounded-md px-[14px] py-[10px] cursor-pointer"
                      onClick={() => handleIndividual("T")}
                    >
                      <p>T</p>
                    </div>
                    <div
                      title="Valor navegacion"
                      className="border border-gray-300 rounded-md px-[14px] py-[10px] cursor-pointer"
                      onClick={() => handleIndividual("N")}
                    >
                      <p>N</p>
                    </div>
                    <div
                      title="Mantenimientos preventivos"
                      className="border border-gray-300 rounded-md px-[14px] py-[10px] cursor-pointer"
                      onClick={() => handleIndividual("P")}
                    >
                      <p>P</p>
                    </div>
                    <div
                      title="Mantenimientos correctivos"
                      className="border border-gray-300 rounded-md px-[14px] py-[10px] cursor-pointer"
                      onClick={() => handleIndividual("C")}
                    >
                      <p>C</p>
                    </div>
                  </div>
                  <div className="w-64">
                    <Input
                      label="Fecha"
                      type="date"
                      defaultValue={format(new Date(), "yyyy-MM-dd")}
                      name="date"
                      control={control}
                      rules={{ required: { value: true, message: "Campo requerido" } }}
                    />
                  </div>
                  <div className="flex items-center gap-3 ml-3">
                    <div
                      className="border border-gray-300 rounded-md px-[14px] py-[10px] cursor-pointer"
                      onClick={() => handleFilter("M")}
                    >
                      <p>M</p>
                    </div>
                    <div
                      className="border border-gray-300 rounded-md px-[14px] py-[10px] cursor-pointer"
                      onClick={() => handleFilter("Y")}
                    >
                      <p>Y</p>
                    </div>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="5 5" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip filterIndividual={filterIndividual} />} />
                  <Legend />
                  <Line type="monotone" stroke="#5e4074" fill="#5e4074" dataKey="tanking_total" />
                  <Line
                    type="monotone"
                    stroke="#7b011e"
                    fill="#7b011e"
                    dataKey="value_navigation"
                  />
                  <Line
                    type="monotone"
                    stroke="#52b2cf"
                    fill="#52b2cf"
                    dataKey="value_maintenance_preventive"
                  />
                  <Line
                    type="monotone"
                    stroke="#52b2cf"
                    fill="#52b2cf"
                    dataKey="value_maintenance_corrective"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label, filterIndividual }) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-2 bg-white border border-primary p-3 rounded-lg">
        <p className="font-medium">{label}</p>
        <div className="flex flex-col gap-1">
          {(!filterIndividual || filterIndividual === "T") && (
            <div className="flex items-center gap-2">
              <div className={`size-2 bg-[#5e4074] rounded-full`}></div>
              <p className="flex items-center gap-2">
                Tanqueo total:
                <span>${formatNumber(payload[0].value)}</span>
              </p>
            </div>
          )}
          {(!filterIndividual || filterIndividual === "N") && (
            <div className="flex items-center gap-2">
              <div className={`size-2 bg-[#7b011e] rounded-full`}></div>
              <p className="flex items-center gap-2">
                Valor navegacion:
                <span>${formatNumber(filterIndividual ? payload[0].value : payload[1].value)}</span>
              </p>
            </div>
          )}
          {(!filterIndividual || filterIndividual === "P") && (
            <div className="flex items-center gap-2">
              <div className={`size-2 bg-[#52b2cf] rounded-full`}></div>
              <p className="flex items-center gap-2">
                Valor mantenimientos preventivos:
                <span>${formatNumber(filterIndividual ? payload[0].value : payload[2].value)}</span>
              </p>
            </div>
          )}
          {(!filterIndividual || filterIndividual === "C") && (
            <div className="flex items-center gap-2">
              <div className={`size-2 bg-[#52b2cf] rounded-full`}></div>
              <p className="flex items-center gap-2">
                Valor mantenimientos correctivos:
                <span>${formatNumber(filterIndividual ? payload[0].value : payload[3].value)}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
};

const formatNumber = (number) => {
  const parsed = parseFloat(number);
  if (isNaN(parsed)) return "";
  return parsed
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default Statistics;
