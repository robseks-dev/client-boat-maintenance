import { useState, useEffect, createContext } from "react";
import { useFetch } from "../../hooks/useFetch";
import Cookies from "js-cookie";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const { isLoading, setIsLoading, fetch } = useFetch();

  const [auth, setAuth] = useState(false);
  const [login, setLogin] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastType, setToastType] = useState(null);
  const [toastContent, setToastContent] = useState(null);

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [resumeData, setResumeData] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const openModalWithContent = (ContentComponent, title, data) => {
    setModalContent(<ContentComponent props={data} />);
    setIsModalOpen(true);
    setModalTitle(title);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setModalTitle(null);
  };

  const openToastWithContent = (type, message) => {
    setToastType(type);
    setToastContent(message);
    setIsToastOpen(true);

    setTimeout(() => {
      setIsToastOpen(false);
      setToastContent(null);
    }, 10000);
  };

  const closeToast = () => {
    setIsToastOpen(false);
    setToastContent(null);
  };

  const openResumeWithContent = (data) => {
    setResumeData(data);
    setIsResumeOpen(true);
  };

  const closeResume = () => {
    setIsResumeOpen(false);
    setResumeData(null);
  };

  const handleOpen = () => setIsOpen(!isOpen);

  const signIn = async (request) => {
    try {
      const response = await fetch("auth/login", "POST", request);

      if (response) {
        setLogin(response);
        setAuth(true);

        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const verify = async () => {
      const token = Cookies.get("token_boat_maintenance");

      if (token) {
        try {
          const response = await fetch("auth/verify");
          setLogin(response);
          setAuth(true);
        } catch (error) {
          setLogin(null);
          setAuth(false);
        }
      } else {
        setAuth(false);
        setLogin(null);
        setIsLoading(false);
      }
    };

    verify();
  }, []);

  return (
    <Context.Provider
      value={{
        isModalOpen,
        modalContent,
        modalTitle,
        openModalWithContent,
        closeModal,
        isToastOpen,
        toastContent,
        toastType,
        openToastWithContent,
        closeToast,
        isResumeOpen,
        resumeData,
        openResumeWithContent,
        closeResume,
        isOpen,
        handleOpen,
        auth,
        setAuth,
        login,
        setLogin,
        isLoading,
        signIn
      }}
    >
      {children}
    </Context.Provider>
  );
};
