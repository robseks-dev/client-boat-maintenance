import { useContext } from "react";
import { Context } from "../../context/Context";
import { useFetch } from "../../../hooks/useFetch";
import { useForm } from "react-hook-form";

const PassengerForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { fetch } = useFetch();
  const { openToastWithContent } = useContext(Context);

  const onSubmit = async (data) => {
    const verificate = Object.values(data).every(value => value !== null);
    if (!verificate) return openToastWithContent("w", "Todos los campos son obligatorios.");

    const dataForm = [
      {
        description:
          "Una vez atraca la embarcación se baja el Ayudante del bote para hacer recepción de Pasajeros.",
        value: data["1"],
      },
      {
        description:
          "El Piloto al momento del ingreso de las personas se encarga de realizar el conteo de los Pasajeros.",
        value: data["2"],
      },
      {
        description:
          "Una vez todo el personal a bordo de la embarcación, el Piloto Ayudante procede a entregar los chalecos y a dar las indicaciones de seguridad a tener en cuenta como no caminar ni lanzarse al agua mientras los motores estén encendidos.",
        value: data["3"],
      },
      {
        description: "Zarpa la embarcación.",
        value: data["4"],
      },
      {
        description: "Fin de la maniobra.",
        value: data["5"],
      },
      {
        description: "Se realiza el atraque de la embarcación.",
        value: data["6"],
      },
      {
        description: "Se quitan los chalecos a los Pasajeros",
        value: data["7"],
      },
      {
        description: "El Ayudante se baja y ayuda a realizar el desembarque de los Pasajeros.",
        value: data["8"],
      },
      {
        description: "Fin de la maniobra.",
        value: data["9"],
      },
      {
        description:
          "Piloto Informa a las autoridades, se informa al personal de la maniobra se pide calmay manteniendo el control de la maniobra",
        value: data["10"],
      },
      {
        description: "Se le da prioridad a los niños y ancianos.",
        value: data["11"],
      },
      {
        description: "Realiza conteo de Pasajeros",
        value: data["12"],
      },
      {
        description: "Verifica el uso del chaleco",
        value: data["13"],
      },
      {
        description:
          "Las indicaciones de seguridad a tener en cuenta como no caminar ni lanzarse al aguamientras los motores estén encendidos.",
        value: data["14"],
      },
    ];

    for (const item of dataForm) {
      await fetch("inspection/passenger", "POST", item);
    }

    openToastWithContent("s", "Inspección creada con exito");
    reset();
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full overflow-y-auto"
    >
      <div className="flex flex-col gap-3">
        <p className="text-gray-400">Embarque, desembarque y transbordo de pasajeros</p>
        <div className="flex flex-col gap-5">
          <div>
            <table className="w-full sm:w-1/2">
              <thead>
                <tr className="text-left">
                  <th className="px-3 py-2">
                    Embarque de Pasajeros: listado de operación y verificación
                  </th>
                  <th className="w-[20%] px-3 py-2">Cumple SI/NO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2">
                    Una vez atraca la embarcación se baja el Ayudante del bote para hacer recepción
                    de Pasajeros.
                  </td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("1")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("1")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    El Piloto al momento del ingreso de las personas se encarga de realizar el
                    conteo de los Pasajeros.
                  </td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("2")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("2")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    Una vez todo el personal a bordo de la embarcación, el Piloto Ayudante procede a
                    entregar los chalecos y a dar las indicaciones de seguridad a tener en cuenta
                    como no caminar ni lanzarse al agua mientras los motores estén encendidos.
                  </td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("3")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("3")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Zarpa la embarcación.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("4")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("4")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Fin de la maniobra.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("5")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("5")} />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="w-full sm:w-1/2">
              <thead>
                <tr className="text-left">
                  <th className="px-3 py-2">
                    Desembarque de Pasajeros: listado de operación y verificación
                  </th>
                  <th className="w-[20%] px-3 py-2">Cumple SI/NO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2">Se realiza el atraque de la embarcación.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("6")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("6")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Se quitan los chalecos a los Pasajeros</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("7")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("7")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    El Ayudante se baja y ayuda a realizar el desembarque de los Pasajeros.
                  </td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("8")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("8")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Fin de la maniobra.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("9")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("9")} />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="w-full sm:w-1/2">
              <thead>
                <tr className="text-left">
                  <th className="px-3 py-2">
                    Transbordo de Pasajeros: listado de operación y verificación
                  </th>
                  <th className="w-[20%] px-3 py-2">Cumple SI/NO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2">
                    Piloto Informa a las autoridades, se informa al personal de la maniobra se pide
                    calma y manteniendo el control de la maniobra
                  </td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("10")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("10")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Se le da prioridad a los niños y ancianos.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("11")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("11")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Realiza conteo de Pasajeros</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("12")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("12")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Verifica el uso del chaleco</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("13")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("13")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    Las indicaciones de seguridad a tener en cuenta como no caminar ni lanzarse al
                    agua mientras los motores estén encendidos.
                  </td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("14")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("14")} />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button className="w-fit bg-primary text-white px-3 py-2 rounded-md hover:brightness-90">
        Registrar inspeccion
      </button>
    </form>
  );
};

export default PassengerForm;
