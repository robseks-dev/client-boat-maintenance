import { useSelect } from "../../hooks/useSelect";
import { Controller } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react"; // Import useState, useEffect, useRef

const Select = ({ label, placeholder, data, onChange, ...controllerConfig }) => {
  return (
    <Controller
      {...controllerConfig}
      render={({ field, fieldState: { error } }) => {
        const {
          isOpen,
          inputValue,
          filteredData,
          selectRef,
          handleToggle,
          handleClose,
          setInputValue,
        } = useSelect(data, field.value);

        const [openDirection, setOpenDirection] = useState("down");
        const inputRef = useRef(null);

        useEffect(() => {
          if (isOpen && inputRef.current) {
            const inputRect = inputRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            const spaceBelow = viewportHeight - inputRect.bottom;
            const spaceAbove = inputRect.top;

            if (spaceBelow < 250 && spaceAbove > spaceBelow) {
              setOpenDirection("up");
            } else {
              setOpenDirection("down");
            }
          }
        }, [isOpen]);

        const handleSelect = (item) => {
          setInputValue(item.value);
          onChange?.(item);
          field.onChange(item);
          handleClose();
        };

        const handleInputChange = (e) => {
          const newValue = e.target.value;
          setInputValue(newValue);
          onChange?.({ key: null, value: null });
          field.onChange(newValue);
        };

        return (
          <div ref={selectRef} className="relative flex flex-col gap-1 w-full">
            {label && <label htmlFor={controllerConfig.name}>{label}</label>}
            <div
              className={`flex items-center justify-between gap-2 border rounded-md focus-within:ring-1 focus-within:ring-primary ${
                error ? "border-red-500" : "border-gray-300"
              } ${controllerConfig.disabled ? "opacity-50 pointer-events-none" : ""}`}
            >
              <input
                id={controllerConfig.name}
                className="w-full outline-none p-[10px] bg-transparent"
                placeholder={placeholder}
                autoComplete="off"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleToggle}
                ref={(e) => {
                  field.ref(e);
                  inputRef.current = e;
                }}
              />
              <button
                type="button"
                onClick={handleToggle}
                aria-label="Toggle dropdown"
                className="p-2"
              >
                <ChevronDown className={`size-5 mx-2 animation ${isOpen ? "-rotate-180" : ""}`} />
              </button>
            </div>
            {isOpen && (
              <ul
                role="listbox"
                className={`absolute flex flex-col gap-1 w-full max-h-[206px] bg-white border border-gray-300 rounded-md p-1 select-none z-10 shadow-lg overflow-y-auto ${
                  openDirection === "up" ? "bottom-[calc(100%+10px)]" : "top-[calc(100%+10px)]"
                }`}
              >
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <li
                      key={item.key}
                      role="option"
                      aria-selected={inputValue === item.value}
                      onClick={() => handleSelect(item)}
                      onMouseDown={(e) => e.preventDefault()}
                      className="p-2 rounded-md hover:bg-gray-100"
                      tabIndex={0}
                    >
                      {item.value}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">No se encontraron resultados</li>
                )}
              </ul>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          </div>
        );
      }}
    />
  );
};

export default Select;
