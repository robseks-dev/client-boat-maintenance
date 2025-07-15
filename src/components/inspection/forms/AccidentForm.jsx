import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import { useFetch } from "../../../hooks/useFetch";
import { useForm } from "react-hook-form";

import Input from "../../inputs/Input";
import Select from "../../inputs/Select";
import TextArea from "../../inputs/TextArea";

const AccidentForm = () => {
  const { handleSubmit, control, reset } = useForm();
  const { fetch } = useFetch();
  const { login, openToastWithContent } = useContext(Context);

  const [boats, setBoats] = useState([]);

  const onSubmit = async (data) => {
    data.boat_id = data.boat_id.key;
    data.username = login.username;
    const response = await fetch("/inspection/accident", "POST", data);

    if (response) openToastWithContent("s", "Inspección creada con exito");
    if (response) reset();
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
        <p className="text-gray-400">
          Formato informe de accidentes, incidentes y no conformidades
        </p>
        <div className="flex flex-col gap-5">
          <div className="px-3">
            <div className="w-full sm:w-80 py-2">
              <Select
                label="Lanchas"
                placeholder="Seleccione una lancha"
                data={boats}
                name="boat_id"
                control={control}
                rules={{ required: { value: true, message: "Campo requerido" } }}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:w-fit py-2">
              <div className="w-full sm:w-xl">
                <TextArea
                  placeholder="Detalle Del Accidente/Incidente / No Conformidad"
                  defaultValue=""
                  name="description"
                  control={control}
                  rules={{ required: { value: true, message: "Campo requerido" } }}
                />
              </div>
              <div className="w-full sm:w-xl">
                <Input
                  placeholder="Operacion que estaba siendo realizada"
                  type="text"
                  defaultValue=""
                  name="operation"
                  control={control}
                  rules={{ required: { value: true, message: "Campo requerido" } }}
                />
              </div>
              <div className="w-full sm:w-xl">
                <TextArea
                  placeholder="Accion inmediata"
                  defaultValue=""
                  name="immediate_action"
                  control={control}
                  rules={{ required: { value: true, message: "Campo requerido" } }}
                />
              </div>
              <div className="w-full sm:w-xl">
                <TextArea
                  placeholder="Accion correctiva"
                  defaultValue=""
                  name="corrective_action"
                  control={control}
                  rules={{ required: { value: true, message: "Campo requerido" } }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="w-fit bg-primary text-white px-3 py-2 rounded-md hover:brightness-90">
        Registrar inspeccion
      </button>
    </form>
  );
};

export default AccidentForm;
