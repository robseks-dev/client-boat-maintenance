import { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../../context/Context";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../hooks/useFetch";
import { format, set } from "date-fns";
import { ImageUp, Loader2, X, CircleCheck, Trash2 } from "lucide-react";
import { chaoticOrbit } from "ldrs";

import Input from "../../inputs/Input";
import Select from "../../inputs/Select";
import TextArea from "../../inputs/TextArea";

chaoticOrbit.register();

const CreateConsumption = () => {
  const { handleSubmit, control, watch, setValue, reset } = useForm();
  const { fetch } = useFetch();
  const { openToastWithContent } = useContext(Context);

  const shrs = watch("hours_start");
  const ehrs = watch("hours_end");

  const tnk = watch("tanking");
  const vtnk = watch("value_tanking");
  const tnkt = watch("tanking_total");

  const fileRef = useRef(null);

  const [boats, setBoats] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const formatFileSize = (size) => {
    return size < 1024 * 1024
      ? `${(size / 1024).toFixed(2)} KB`
      : `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setUploadProgress(0);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setUploadProgress(0);
    fileRef.current.value = null;
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { boat_id, ...rest } = data;

    const formData = new FormData();
    formData.append("date", rest.date);
    formData.append("route", rest.route);
    formData.append("boat_id", boat_id.key);
    formData.append("hours_start", rest.hours_start);
    formData.append("hours_end", rest.hours_end);
    formData.append("difference", rest.difference);
    formData.append("tanking", rest.tanking);
    formData.append("value_tanking", rest.value_tanking);
    formData.append("tanking_total", rest.tanking_total);
    formData.append("pax", rest.pax);
    formData.append("value_navigation", rest.value_navigation);
    formData.append("observation", rest.observation);
    formData.append("image", selectedFile);

    const result = await fetch("/consumptions", "POST", formData);
    if (result) openToastWithContent("s", "Consumo creado con éxito");
    if (result) removeFile();
    if (result) reset();
    if (result) setIsLoading(false);
  };

  useEffect(() => {
    const getBoats = async () => {
      const result = await fetch("/boats");
      if (result) setBoats(result);
    };
    getBoats();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (shrs && ehrs) {
      const total = ehrs - shrs;
      setValue("difference", Math.round(total));
    }
  }, [shrs, ehrs]);

  useEffect(() => {
    if (tnk && vtnk) {
      const total = tnk * vtnk;
      setValue("tanking_total", Math.round(total));
    }
  }, [tnk, vtnk]);

  useEffect(() => {
    if (tnkt) {
      const total = tnkt / 2;
      setValue("value_navigation", Math.round(total));
    }
  }, [tnkt]);

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full overflow-y-auto"
    >
      <div className="flex flex-col gap-3">
        <p className="text-gray-400">Registrar lancha</p>
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input
              label="Fecha"
              type="date"
              defaultValue={format(new Date(), "yyyy-MM-dd")}
              name="date"
              control={control}
              rules={{ required: { value: true, message: "Campo requerido" } }}
            />

            <Input
              label="Ruta"
              placeholder="Ingrese la ruta"
              defaultValue=""
              name="route"
              control={control}
            />

            <Select
              label="Lanchas"
              placeholder="Seleccione una lancha"
              data={boats}
              name="boat_id"
              control={control}
              rules={{ required: { value: true, message: "Campo requerido" } }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 border-t-2 border-primary pt-4">
        <p className="text-gray-400">Horas de navegacion</p>
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input
              label="Horas navegacion inicio"
              type="number"
              placeholder="Horas de navegacion"
              defaultValue=""
              name="hours_start"
              control={control}
              rules={{ required: { value: true, message: "Campo requerido" } }}
            />
            <Input
              label="Horas navegacion fin"
              type="number"
              placeholder="Horas de navegacion"
              defaultValue=""
              name="hours_end"
              control={control}
              rules={{ required: { value: true, message: "Campo requerido" } }}
            />
            <Input
              label="Diferencia de hrs"
              type="number"
              placeholder="Diferencia de horas"
              defaultValue=""
              name="difference"
              control={control}
              rules={{ required: { value: true, message: "Campo requerido" } }}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 border-t-2 border-primary pt-4">
        <p className="text-gray-400">Tanqueo</p>
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input
              label="Tanqueo por galon"
              type="number"
              placeholder="Tanqueo por galon"
              defaultValue=""
              name="tanking"
              control={control}
              rules={{ required: { value: true, message: "Campo requerido" } }}
            />
            <Input
              label="Precio por galon"
              type="number"
              placeholder="Precio por galon"
              defaultValue=""
              name="value_tanking"
              control={control}
              rules={{ required: { value: true, message: "Campo requerido" } }}
            />
            <Input
              label="Tanqueo total"
              type="number"
              placeholder="Tanqueo total"
              defaultValue=""
              name="tanking_total"
              control={control}
              rules={{ required: { value: true, message: "Campo requerido" } }}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 border-t-2 border-primary pt-4">
        <p className="text-gray-400">Pax</p>
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 sm:flex gap-5">
            <div className="sm:w-80">
              <Input
                label="Pax diarios"
                type="number"
                placeholder="Pax diarios"
                defaultValue=""
                name="pax"
                control={control}
                rules={{ required: { value: true, message: "Campo requerido" } }}
              />
            </div>
            <div className="sm:w-80">
              <Input
                label="Valor por navegacion"
                placeholder="Valor por navegacion"
                type="number"
                defaultValue=""
                name="value_navigation"
                control={control}
                rules={{ required: { value: true, message: "Campo requerido" } }}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 border-t-2 border-primary pt-4">
        <p className="text-gray-400">Imagen</p>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <div className="relative flex flex-col justify-center items-center gap-5 w-full sm:w-md border border-dashed border-gray-300 rounded-md py-6">
              <ImageUp className="size-10 text-gray-400" />
              <div className="flex flex-col items-center cursor-default">
                <p className="font-medium">Eliga una imagen o arrastela & sueltela aqui.</p>
                <p className="text-gray-500">JPEG, PNG, hasta 50MB.</p>
              </div>
              <div>
                <div className="border border-gray-300 rounded-md px-3 py-2 text-gray-500">
                  Buscar Imagen
                </div>
              </div>
              <input
                ref={fileRef}
                type="file"
                className="absolute size-full opacity-0"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
              />
            </div>
            {selectedFile && (
              <div className="flex flex-col gap-3 w-full sm:w-md border border-gray-300 rounded-md p-2">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="size-11 rounded-md overflow-hidden">
                      <img src={preview} alt="upload-image" className="size-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">{selectedFile.name}</p>
                      <div className="flex gap-3 text-gray-500">
                        {formatFileSize(selectedFile.size)}{" "}
                        {uploadProgress < 100 ? (
                          <div className="flex items-center gap-2">
                            <span className="text-primary">Subiendo... {uploadProgress}%</span>
                            <Loader2 className="size-4 text-primary animate-spin" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <CircleCheck className="size-4 text-green-600" />
                            <span className="text-green-600">Completado</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    {uploadProgress < 100 ? (
                      <X
                        onClick={removeFile}
                        className="size-5 text-gray-400 cursor-pointer hover:text-primary"
                      />
                    ) : (
                      <Trash2
                        onClick={removeFile}
                        className="size-5 text-gray-400 cursor-pointer hover:text-primary"
                      />
                    )}
                  </div>
                </div>
                <div className="h-1 bg-gray-300 rounded-lg">
                  <div
                    className="h-full bg-primary rounded-lg transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-3 border-t-2 border-primary pt-4">
        <p className="text-gray-400">Observaciones</p>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <div className="flex-1">
              <TextArea
                label="Observacion"
                defaultValue=""
                name="observation"
                control={control}
                rules={{ required: { value: true, message: "Campo requerido" } }}
              />
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center gap-3">
          <l-chaotic-orbit size="25" speed="1.5" color="#d7b56d"></l-chaotic-orbit>
          <p>Registrando consumo...</p>
        </div>
      ) : (
        <button className="w-fit bg-primary text-white px-3 py-2 rounded-md hover:brightness-90">
          Registrar consumo
        </button>
      )}
    </form>
  );
};

export default CreateConsumption;
