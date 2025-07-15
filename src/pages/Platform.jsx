import { useContext } from "react";
import { Context } from "../components/context/Context";
import { Outlet } from "react-router";
import { useFetch } from "../hooks/useFetch";
import { Menu, LogOut } from "lucide-react";

import Sidebar from "../components/common/Sidebar";
import Modal from "../components/common/Modal";
import Toast from "../components/common/Toast";
import Resume from "../components/common/Resume";

const Platform = () => {
  const {
    isModalOpen,
    modalTitle,
    modalContent,
    closeModal,
    isToastOpen,
    toastType,
    toastContent,
    closeToast,
    isResumeOpen,
    resumeData,
    closeResume,
    isOpen,
    handleOpen,
    setAuth,
    setLogin,
  } = useContext(Context);

  const { fetch } = useFetch();

  const logOut = async () => {
    await fetch("auth/logout", "POST");
    setAuth(false);
    setLogin(null);
  };

  return (
    <div className="h-screen flex font-inter text-sm">
      <div className="relative sm:min-w-72">
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between sm:justify-end h-[6vh] border-l border-gray-300 px-3">
          <Menu onClick={handleOpen} className="block sm:hidden size-6" />
          <div
            className={`flex items-center gap-2 border border-[#e1e1e1] p-2 rounded-md ${
              isOpen && "pointer-events-none"
            } cursor-default`}
            onClick={logOut}
          >
            <LogOut className="size-4" />
            <p>Cerrar sesion</p>
          </div>
        </div>
        <div
          className={`h-[94vh] border-l border-t border-gray-300 p-5 ${
            isOpen && "pointer-events-none"
          }`}
        >
          <Outlet />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </Modal>
      <Toast isOpen={isToastOpen} onClose={closeToast} type={toastType} message={toastContent} />
      <Resume isOpen={isResumeOpen} onClose={closeResume} data={resumeData} />
    </div>
  );
};

export default Platform;
