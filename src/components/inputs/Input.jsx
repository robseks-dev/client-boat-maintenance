import { Controller } from "react-hook-form";

const Input = ({ label, placeholder, onChange, disabled = false, uppercase, ...config }) => {
  return (
    <Controller
      {...config}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-1 w-full">
          <label>{label}</label>
          <div>
            <input
              placeholder={placeholder}
              type={config.type || "text"}
              className={`w-full border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-md outline-none p-[10px] focus:border-primary ${
                disabled ? "opacity-50" : ""
              } ${uppercase ? "uppercase" : ""} placeholder:normal-case`}
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

export default Input;
