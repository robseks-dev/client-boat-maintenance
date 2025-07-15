import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 select-none">
      <div className="flex flex-col gap-4 bg-white p-4 rounded-md w-[90%] sm:w-fit">
        <div className="flex items-center justify-between">
          <h2 className="font-poppins font-medium">{title}</h2>
          <X onClick={onClose} className="size-5 cursor-pointer" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
