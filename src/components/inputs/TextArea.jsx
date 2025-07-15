import { Controller } from "react-hook-form";

const TextArea = ({ label, placeholder, onChange, disabled = false, ...config }) => {
  return (
    <Controller
      {...config}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-1 w-full">
          <label>{label}</label>
          <div>
            <textarea
              placeholder={placeholder}
              className={`w-full h-44 border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-md resize-none outline-none p-[10px] focus:border-primary ${
                disabled ? "opacity-50" : ""
              }`}
              value={field.value}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(config.type !== "file" ? e.target.value : e.target.files[0]);
              }}
              disabled={disabled}
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
      )}
    />
  );
};

export default TextArea;
