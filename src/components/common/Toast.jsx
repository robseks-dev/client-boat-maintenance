import { format } from "date-fns";
import { Info, CircleAlert, CircleX, CircleCheck, X } from "lucide-react";

const Toast = ({ isOpen, onClose, type, message }) => {
  if (!isOpen) return null;
  const date = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  return (
    <div className="fixed flex gap-14 font-poppins text-xs sm:text-sm top-5 sm:top-10 right-5 sm:right-10 rounded-md bg-white p-5 select-none shadow">
      <div className="flex gap-4">
        <div>
          {
            {
              i: <Info className="size-4 sm:size-5 text-blue-500" />,
              w: <CircleAlert className="size-4 sm:size-5 text-yellow-500" />,
              e: <CircleX className="size-4 sm:size-5 text-red-500" />,
              s: <CircleCheck className="size-4 sm:size-5 text-green-500" />,
            }[type]
          }
        </div>
        <div className="flex flex-col gap-1">
          <p className="max-w-72 font-medium">{message}</p>
          <p>{date}</p>
        </div>
      </div>
      <X onClick={onClose} className="size-5 text-gray-400 cursor-pointer hover:text-black" />
    </div>
  );
};

export default Toast;
