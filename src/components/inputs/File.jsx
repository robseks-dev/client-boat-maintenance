import { useState, useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import { ImageUp, Loader2, X, CircleCheck, Trash2 } from "lucide-react";

const File = ({ onChange, disabled = false, ...config }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileRef = useRef(null);

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
    if (!config.file) {
      removeFile();
    };
  }, [config.file]);

  return (
    <Controller
      {...config}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-5">
          <div className="relative flex flex-col justify-center items-center gap-5 w-full border border-dashed border-gray-300 rounded-md py-6">
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
              onChange={(e) => {
                field.onChange(e.target.files[0]);
                onChange?.(e.target.files[0]);
                handleFileChange(e);
              }}
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          {selectedFile && (
            <div className="flex flex-col gap-3 w-full border border-gray-300 rounded-md p-2">
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
      )}
    />
  );
};

export default File;
