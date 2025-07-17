import { useContext } from "react";
import { Context } from "../../context/Context";
import { useFetch } from "../../../hooks/useFetch";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import Input from "../../inputs/Input";

const BoatForm = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const { fetch } = useFetch();
  const { openToastWithContent } = useContext(Context);

  const onSubmit = async (data) => {
    const verificate = Object.values(data).every(value => value !== null);
    if (!verificate) return openToastWithContent("w", "Todos los campos son obligatorios.");

    const response = await fetch("inspection/boat");
    if (response.length) return openToastWithContent("i", "Ya se realizo la inspección de hoy.");

    const dataForm = [
      {
        title: "CASCO Y ESTRUCTURA",
        description: "Verifique la obra viva.",
        value: data["1"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "CASCO Y ESTRUCTURA",
        description: "Verifique la obra muerta.",
        value: data["2"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "CASCO Y ESTRUCTURA",
        description: "Verifique el espejo.",
        value: data["3"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "CASCO Y ESTRUCTURA",
        description: "Verifique la lona o carpa.",
        value: data["4"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "CASCO Y ESTRUCTURA",
        description: "Abra y cierre las tapas de bodega, verifique bisagras.",
        value: data["5"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "CASCO Y ESTRUCTURA",
        description: "Sentina achicada.",
        value: data["6"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "CASCO Y ESTRUCTURA",
        description: "Verifique tornillos del acrílico.",
        value: data["7"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "CASCO Y ESTRUCTURA",
        description: "Verifique la consola y puertas aseguradas.",
        value: data["8"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "PROPULSIÓN Y SISTEMA ELECTRICO",
        description: "Alimente los sistemas con corriente.",
        value: data["9"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "PROPULSIÓN Y SISTEMA ELECTRICO",
        description: "Abra swicht de encendido y conecte la cangreja.",
        value: data["10"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "PROPULSIÓN Y SISTEMA ELECTRICO",
        description: "Verifique tacómetros de propulsores.",
        value: data["11"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "PROPULSIÓN Y SISTEMA ELECTRICO",
        description: "Verifique carga de baterías",
        value: data["12"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "PROPULSIÓN Y SISTEMA ELECTRICO",
        description: "Verifique los filtros primarios de combustible.",
        value: data["13"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "PROPULSIÓN Y SISTEMA ELECTRICO",
        description: "Verifique los filtros secundarios de combustible.",
        value: data["14"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "PROPULSIÓN Y SISTEMA ELECTRICO",
        description: "Verifique el nivel de aceite y su estado.",
        value: data["15"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "PROPULSIÓN Y SISTEMA ELECTRICO",
        description: "Verifique líneas eléctricas de alta.",
        value: data["16"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "SISTEMAS AUXILIARES",
        description: "Verifique bombas de achique en manual.",
        value: data["17"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "SISTEMAS AUXILIARES",
        description:
          "Suba y baje los motores. ( power trim )Verifique que el tubo no este rayado y no exista fuga de aceite en gato hidráulico.",
        value: data["18"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "SISTEMAS AUXILIARES",
        description:
          "Gire el timón todo a babor y todo a estribor. Verifique nivel aceite hidráulico de la botella del timón.",
        value: data["19"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "SISTEMAS AUXILIARES",
        description:
          "Verifique sistema de gobierno en motores constate atornillamiento de las barras.",
        value: data["20"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "SISTEMAS AUXILIARES",
        description: "Energice luz interna de la consola.",
        value: data["21"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "SISTEMAS AUXILIARES",
        description: "Energice luces de navegación.",
        value: data["22"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "NAVEGACIÓN Y EQUIPOS DE NAVEGACIÓN",
        description: "Estado del clima (según reporte de Dimar – CIOH)",
        value: data["23"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "NAVEGACIÓN Y EQUIPOS DE NAVEGACIÓN",
        description: "Energice radio VHF MARINO efectué prueba.",
        value: data["24"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "NAVEGACIÓN Y EQUIPOS DE NAVEGACIÓN",
        description: "Energice radio FM.",
        value: data["25"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "NAVEGACIÓN Y EQUIPOS DE NAVEGACIÓN",
        description: "Verifique compás magnético.",
        value: data["26"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "NAVEGACIÓN Y EQUIPOS DE NAVEGACIÓN",
        description: "verifique GPS de navegación",
        value: data["27"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "SISTEMA DE FONDEO",
        description: "Verifique mínimo 50 m de cabo.",
        value: data["28"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "SISTEMA DE FONDEO",
        description: "Verifique ancla con grillete giratorio.",
        value: data["29"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "SISTEMA DE FONDEO",
        description: "Verifique mínimo 2 metros de cadena.",
        value: data["30"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "LOGÍSTICA",
        description: "Combustible.",
        value: data["31"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "LOGÍSTICA",
        description: "Lubricante.",
        value: data["32"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "ACCESORIOS",
        description: "Verifique fecha de próximo recargue de extintores",
        value: data["33"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "ACCESORIOS",
        description: "Verifique caja de herramientas a bordo",
        value: data["34"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "ACCESORIOS",
        description: "Verifique anillos salvavidas con su línea de mínimo 50 mts",
        value: data["35"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "ACCESORIOS",
        description: "Verifique achicador abordo.",
        value: data["36"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "ACCESORIOS",
        description: "Verifique remos abordo.",
        value: data["37"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "ACCESORIOS",
        description: "Verifique bicheros abordo.",
        value: data["38"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "ACCESORIOS",
        description: "Verifique chalecos salvavidas.",
        value: data["39"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "ACCESORIOS",
        description: "Verifique las defensas de la Unidad.",
        value: data["40"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "ACCESORIOS",
        description: "Botiquín de enfermero, verifique fecha de vencimiento de los  medicamentos.",
        value: data["41"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "MEDIDAS DE SEGURIDAD",
        description: "Se encuentra la embarcación firmemente asegurada al muelle",
        value: data["42"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "MEDIDAS DE SEGURIDAD",
        description: "Hay un extintor cerca de la toma",
        value: data["43"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "MEDIDAS DE SEGURIDAD",
        description:
          "Cuenta con los equipos de seguridad necesarios para contra incendios, según certificados de seguridad.",
        value: data["44"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "MEDIDAS DE SEGURIDAD",
        description: "El capitán y encargado de la toma, tiene el equipo adecuado para el proceso",
        value: data["45"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "MEDIDAS DE SEGURIDAD",
        description: "Se coloca el aviso de no fumar",
        value: data["46"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "VERIFICACIÓN",
        description: "Posee canecas y bolsas dispuestas",
        value: data["47"],
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "TOMA DE COMBUSTIBLE Y LUBRICANTE",
        description: "TOMA DE COMBUSTIBLE Y LUBRICANTE",
        value: `Cantidad de producto a recibir: ${data.product_quantity} - Cantidad: ${data.quantity} - Lugar de la toma: ${data.area}`,
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        title: "BASURAS Y SENTINAS",
        description: "BASURAS Y SENTINAS",
        value: `Tipo de basura: ${data.type_trash} - Cantidad dejada en tierra: ${data.trash_quantity}`,
        date: format(new Date(), "yyyy-MM-dd"),
      },
    ];

    for (const item of dataForm) {
      await fetch("inspection/boat", "POST", item);
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
        <p className="text-gray-400">
          Formato de inspeccion, puntos criticos de la embarcacion, manejo de basuras y consumo de
          combustible
        </p>
        <div className="flex flex-col gap-5">
          <div>
            <table className="w-full sm:w-1/2">
              <thead>
                <tr className="text-left">
                  <th className="px-3 py-2">CASCO Y ESTRUCTURA</th>
                  <th className="w-[20%] px-3 py-2">Cumple SI/NO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2">Verifique la obra viva.</td>
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
                  <td className="px-3 py-2">Verifique la obra muerta.</td>
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
                  <td className="px-3 py-2">Verifique el espejo.</td>
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
                  <td className="px-3 py-2">Verifique la lona o carpa.</td>
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
                  <td className="px-3 py-2">
                    Abra y cierre las tapas de bodega, verifique bisagras.
                  </td>
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
                <tr>
                  <td className="px-3 py-2">Sentina achicada.</td>
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
                  <td className="px-3 py-2">Verifique tornillos del acrílico.</td>
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
                  <td className="px-3 py-2">Verifique la consola y puertas aseguradas.</td>
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
              </tbody>
            </table>
          </div>
          <div>
            <table className="w-full sm:w-1/2">
              <thead>
                <tr className="text-left">
                  <th className="px-3 py-2">PROPULSIÓN Y SISTEMA ELECTRICO</th>
                  <th className="w-[20%] px-3 py-2">Cumple SI/NO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2">Alimente los sistemas con corriente.</td>
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
                <tr>
                  <td className="px-3 py-2">Abra swicht de encendido y conecte la cangreja.</td>
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
                  <td className="px-3 py-2">Verifique tacómetros de propulsores.</td>
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
                  <td className="px-3 py-2">Verifique carga de baterías</td>
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
                  <td className="px-3 py-2">Verifique los filtros primarios de combustible.</td>
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
                  <td className="px-3 py-2">Verifique los filtros secundarios de combustible.</td>
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
                <tr>
                  <td className="px-3 py-2">Verifique el nivel de aceite y su estado.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("15")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("15")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Verifique líneas eléctricas de alta.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("16")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("16")} />
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
                  <th className="px-3 py-2">SISTEMAS AUXILIARES</th>
                  <th className="w-[20%] px-3 py-2">Cumple SI/NO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2">Verifique bombas de achique en manual.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("17")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("17")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    Suba y baje los motores. ( power trim )Verifique que el tubo no este rayado y no
                    exista fuga de aceite en gato hidráulico.
                  </td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("18")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("18")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    Gire el timón todo a babor y todo a estribor. Verifique nivel aceite hidráulico
                    de la botella del timón.
                  </td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("19")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("19")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    Verifique sistema de gobierno en motores constate atornillamiento de las barras.
                  </td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("20")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("20")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Energice luz interna de la consola.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("21")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("21")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Energice luces de navegación.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("22")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("22")} />
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
                  <th className="px-3 py-2">NAVEGACIÓN Y EQUIPOS DE NAVEGACIÓN</th>
                  <th className="w-[20%] px-3 py-2">Cumple SI/NO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2">Estado del clima (según reporte de Dimar – CIOH)</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("23")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("23")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Energice radio VHF MARINO efectué prueba.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("24")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("24")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Energice radio FM.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("25")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("25")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Verifique compás magnético.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("26")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("26")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">verifique GPS de navegación</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("27")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("27")} />
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
                  <th className="px-3 py-2">SISTEMA DE FONDEO</th>
                  <th className="w-[20%] px-3 py-2">Cumple SI/NO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2">Verifique mínimo 50 m de cabo.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("28")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("28")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Verifique ancla con grillete giratorio.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("29")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("29")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Verifique mínimo 2 metros de cadena.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("30")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("30")} />
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
                  <th className="px-3 py-2">LOGÍSTICA</th>
                  <th className="w-[20%] px-3 py-2">Cumple SI/NO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2">Combustible.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("31")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("31")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Lubricante.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("32")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("32")} />
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
                  <th className="px-3 py-2">ACCESORIOS</th>
                  <th className="w-[20%] px-3 py-2">Cumple SI/NO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2">Verifique fecha de próximo recargue de extintores</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("33")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("33")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Verifique caja de herramientas a bordo</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("34")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("34")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    Verifique anillos salvavidas con su línea de mínimo 50 mts
                  </td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("35")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("35")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Verifique achicador abordo.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("36")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("36")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Verifique remos abordo.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("37")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("37")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Verifique bicheros abordo.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("38")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("38")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Verifique chalecos salvavidas.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("39")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("39")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Verifique las defensas de la Unidad.</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("40")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("40")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    Botiquín de enfermero, verifique fecha de vencimiento de los medicamentos.
                  </td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("41")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("41")} />
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
                  <th className="px-3 py-2">MEDIDAS DE SEGURIDAD</th>
                  <th className="w-[20%] px-3 py-2">Cumple SI/NO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2">
                    Se encuentra la embarcación firmemente asegurada al muelle.
                  </td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("42")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("42")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Hay un extintor cerca de la toma</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("43")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("43")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    Cuenta con los equipos de seguridad necesarios para contra incendios, según
                    certificados de seguridad.
                  </td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("44")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("44")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    El capitán y encargado de la toma, tiene el equipo adecuado para el proceso
                  </td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("45")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("45")} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Se coloca el aviso de no fumar</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("46")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("46")} />
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
                  <th className="px-3 py-2">VERIFICACIÓN</th>
                  <th className="w-[20%] px-3 py-2">Cumple SI/NO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2">Posee canecas y bolsas dispuestas</td>
                  <td>
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex items-center gap-2">
                        <label>Si</label>
                        <input type="radio" name="" value={"si"} {...register("47")} />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>No</label>
                        <input type="radio" name="" value={"no"} {...register("47")} />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-3">
            <p className="font-medium">TOMA DE COMBUSTIBLE Y LUBRICANTE </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:w-fit py-2">
              <div className="w-full sm:w-80">
                <Input
                  placeholder="Cantidad de producto a recibir"
                  type="number"
                  defaultValue=""
                  name="product_quantity"
                  control={control}
                  rules={{ required: { value: true, message: "Campo requerido" } }}
                />
              </div>
              <div className="w-full sm:w-80">
                <Input
                  placeholder="Cantidad"
                  type="number"
                  defaultValue=""
                  name="quantity"
                  control={control}
                  rules={{ required: { value: true, message: "Campo requerido" } }}
                />
              </div>
              <div className="w-full sm:w-80">
                <Input
                  placeholder="Lugar de la toma"
                  type="text"
                  defaultValue=""
                  name="area"
                  control={control}
                  rules={{ required: { value: true, message: "Campo requerido" } }}
                />
              </div>
            </div>
          </div>
          <div className="px-3">
            <p className="font-medium">BASURAS Y SENTINAS</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:w-fit py-2">
              <div className="w-full sm:w-80">
                <Input
                  placeholder="Tipo de basura"
                  type="text"
                  defaultValue=""
                  name="type_trash"
                  control={control}
                  rules={{ required: { value: true, message: "Campo requerido" } }}
                />
              </div>
              <div className="w-full sm:w-80">
                <Input
                  placeholder="Cantidad dejada en tierra"
                  type="number"
                  defaultValue=""
                  name="trash_quantity"
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

export default BoatForm;
