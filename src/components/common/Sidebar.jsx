import { useContext } from "react";
import { Context } from "../context/Context";
import { NavLink } from "react-router";
import { ChevronDown, Sailboat, Component, Wrench, Fuel, Cog, FileText, X } from "lucide-react";
import logo from "../../assets/images/logo.png";

import CreateBoat from "../boats/forms/CreateBoat";
import CreatePart from "../parts/forms/CreatePart";
import CreateInvoice from "../invoices/forms/CreateInvoice";
import CreateSpare from "../spares/forms/CreateSpare";
import CreateReport from "../inspection/forms/CreateReport";

const Sidebar = () => {
  const { openModalWithContent, isOpen, handleOpen } = useContext(Context);

  return (
    <div
      className={`absolute sm:relative ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } flex flex-col justify-start sm:justify-between w-72 h-full sm:size-full left-full bg-white ${
        isOpen && "shadow"
      } z-10 sm:z-0 animation`}
    >
      <div className="flex justify-end sm:hidden p-2">
        <X onClick={handleOpen} className="size-6" />
      </div>
      <div className="w-72 h-[10vh] p-2">
        <NavLink to="/platform">
          {/* <img src={logo} alt="size-full object-cover" /> */}
        </NavLink>
      </div>
      <div className="p-5 overflow-y-auto">
        <div className="flex flex-col gap-3 py-5">
          <p className="text-gray-500">Lanchas</p>
          <ul className="flex flex-col gap-3">
            <li className="flex flex-col gap-2">
              <div className="group flex items-center justify-between rounded-sm p-2 cursor-default">
                <div className="flex items-center gap-3">
                  <Sailboat strokeWidth={1.5} className="size-4" />
                  <span>Lanchas</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3 text-gray-500 cursor-default">
                <li
                  className="px-9 hover:text-primary"
                  onClick={() => openModalWithContent(CreateBoat, "Crear lancha")}
                >
                  Crear lancha
                </li>
                <li className="hidden sm:block px-9 hover:text-primary">
                  <NavLink to="boats" className="cursor-default">
                    Listar lanchas
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="flex flex-col gap-2">
              <div className="group flex items-center justify-between rounded-sm p-2 cursor-default">
                <div className="flex items-center gap-3">
                  <Component strokeWidth={1.5} className="size-4" />
                  <span>Partes</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3 text-gray-500 cursor-default">
                <li
                  className="px-9 hover:text-primary"
                  onClick={() => openModalWithContent(CreatePart, "Crear parte")}
                >
                  Crear parte
                </li>
                <li className="hidden sm:block px-9 hover:text-primary">
                  <NavLink to="parts" className="cursor-default">
                    Listar partes
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="hidden sm:flex flex-col gap-2">
              <div className="group flex items-center justify-between rounded-sm p-2 cursor-default">
                <div className="flex items-center gap-3">
                  <Wrench strokeWidth={1.5} className="size-4" />
                  <span>Mantenimiento</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3 text-gray-500 cursor-default">
                <li className="px-9 hover:text-primary">
                  <NavLink to="maintenance/create" className="cursor-default">
                    Crear periodo
                  </NavLink>
                </li>
                <li className="px-9 hover:text-primary">
                  <NavLink to="maintenance/schedule" className="cursor-default">
                    Cronograma
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="flex flex-col gap-2">
              <div className="group flex items-center justify-between rounded-sm p-2 cursor-default">
                <div className="flex items-center gap-3">
                  <Fuel strokeWidth={1.5} className="size-4" />
                  <span>Consumo</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3 text-gray-500 cursor-default">
                <li className="px-9 hover:text-primary">
                  <NavLink to="consumption/create" className="cursor-default">
                    Registrar consumo
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="flex flex-col gap-2">
              <div className="group flex items-center justify-between rounded-sm p-2 cursor-default">
                <div className="flex items-center gap-3">
                  <Cog strokeWidth={1.5} className="size-4" />
                  <span>Repuestos</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3 text-gray-500 cursor-default">
                <li
                  className="px-9 hover:text-primary"
                  onClick={() => openModalWithContent(CreateSpare, "Agregar repuesto")}
                >
                  Agregar repuesto
                </li>
                <li className="hidden sm:block px-9 hover:text-primary">
                  <NavLink to="spares" className="cursor-default">
                    Inventario
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="flex flex-col gap-2">
              <div className="group flex items-center justify-between rounded-sm p-2 cursor-default">
                <div className="flex items-center gap-3">
                  <FileText strokeWidth={1.5} className="size-4" />
                  <span>Inspeccion</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3 text-gray-500 cursor-default">
                <li className="px-9 hover:text-primary">
                  <NavLink to="inspection/boat" className="cursor-default">
                    Embarcacion
                  </NavLink>
                </li>
                <li className="px-9 hover:text-primary">
                  <NavLink to="inspection/passenger" className="cursor-default">
                    Pasajeros
                  </NavLink>
                </li>
                <li className="px-9 hover:text-primary">
                  <NavLink to="inspection/accident" className="cursor-default">
                    Accidentes/incidentes
                  </NavLink>
                </li>
                <li
                  onClick={() =>
                    openModalWithContent(CreateReport, "Generar reporte de inspeccion")
                  }
                  className="hidden sm:block px-9 hover:text-primary"
                >
                  Generar reporte
                </li>
              </ul>
            </li>
            <li className="hidden sm:flex flex-col gap-2">
              <div className="group flex items-center justify-between rounded-sm p-2 cursor-default">
                <div className="flex items-center gap-3">
                  <FileText strokeWidth={1.5} className="size-4" />
                  <span>Historial consumos</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3 text-gray-500 cursor-default">
                <li
                  onClick={() => openModalWithContent(CreateInvoice, "Generar factura")}
                  className="px-9 hover:text-primary"
                >
                  Generar historial
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
