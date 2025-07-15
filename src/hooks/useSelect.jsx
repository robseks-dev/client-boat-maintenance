import { useState, useEffect, useRef, useCallback } from "react";

const useSelect = (data, value) => {
  const getDisplayValue = (val) => {
    if (typeof val === "object" && val !== null) {
      return val.value;
    }
    return val || "";
  };

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(() => getDisplayValue(value));
  const [filteredData, setFilteredData] = useState(data || []);
  const selectRef = useRef(null);

  useEffect(() => {
    setInputValue(getDisplayValue(value));
  }, [value]);

  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (!inputValue) {
      setFilteredData(data || []);
      return;
    }
    const filter = (data || []).filter((item) =>
      item.value.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredData(filter);
  }, [inputValue, data]);

  return {
    isOpen,
    inputValue,
    filteredData,
    selectRef,
    handleToggle,
    handleClose,
    setInputValue,
  };
};

export { useSelect };
