import { useEffect, useState, useContext } from "react";
import { Context } from "../context/Context";
import { useFetch } from "../../hooks/useFetch";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  differenceInMonths,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  getDay,
  getDate,
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Wrench, Check } from "lucide-react";

import CreateMaintenance from "../maintenance/forms/CreateMaintenance";

const Calendar = () => {
  const { fetch } = useFetch();
  const { openModalWithContent } = useContext(Context);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [periodicities, setPeriodicities] = useState([]);
  const [dataVerification, setDataVerification] = useState({});

  const startOfMonthDate = startOfMonth(currentDate);

  const calendarDays = [];

  const firstDayOfWeek = getDay(startOfMonthDate);
  const daysToPrepend = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  for (let i = 0; i < daysToPrepend; i++) {
    calendarDays.unshift(addMonths(startOfMonthDate, 0));
  }

  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);

  let calendarStart = startDate;
  const dayOfWeekOfStart = getDay(startDate, { locale: es });

  if (dayOfWeekOfStart !== 1) {
    const daysToSubtract = dayOfWeekOfStart === 0 ? 6 : dayOfWeekOfStart - 1;
    calendarStart = new Date(startDate.setDate(startDate.getDate() - daysToSubtract));
  }

  let calendarEnd = endDate;
  const dayOfWeekOfEnd = getDay(endDate, { locale: es });
  if (dayOfWeekOfEnd !== 0) {
    const daysToAdd = 7 - dayOfWeekOfEnd;
    calendarEnd = new Date(endDate.setDate(endDate.getDate() + daysToAdd));
  }

  const allDaysInCalendar = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const isMaintenanceDue = (maintenanceDate, currentCalendarDay, periodicity) => {
    if (!periodicity || periodicity === 0) {
      return false;
    }

    const maintenanceDayOfMonth = getDate(maintenanceDate);
    const currentCalendarDayOfMonth = getDate(currentCalendarDay);

    if (maintenanceDayOfMonth !== currentCalendarDayOfMonth) {
      return false;
    }

    const startOfMaintenanceMonth = new Date(
      maintenanceDate.getFullYear(),
      maintenanceDate.getMonth(),
      1
    );
    const startOfCurrentMonth = new Date(
      currentCalendarDay.getFullYear(),
      currentCalendarDay.getMonth(),
      1
    );

    const monthDifference = differenceInMonths(startOfCurrentMonth, startOfMaintenanceMonth);

    return monthDifference >= 0 && monthDifference % periodicity === 0;
  };

  const daysOfWeek = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"];

  const handleModal = (boolean, day, periodicity) => {
    if (!boolean) {
      openModalWithContent(CreateMaintenance, "Registrar mantenimiento", {
        ...periodicity,
        date: format(day, "yyyy-MM-dd"),
      });
    }
  };

  const verification = (data) => {
    const { id, date, part_id } = data;

    let maintenance = null;
    if (dataVerification.length > 0) {
      maintenance = dataVerification.find(
        (maintenance) =>
          maintenance.periodicity_id === id &&
          format(maintenance.date, "yyyy-MM-dd") === date &&
          maintenance.part_id === part_id
      );
    }

    return maintenance ? true : false;
  };

  useEffect(() => {
    const fetchPeriodicities = async () => {
      const periodicities = await fetch("/periodicities");
      setPeriodicities(periodicities);
    };
    fetchPeriodicities();
  }, []);

  useEffect(() => {
    const fetchMaintenances = async () => {
      const maintenances = await fetch("/maintenances");
      setDataVerification(maintenances);
    };
    fetchMaintenances();
  }, [fetch]);

  return (
    <div className="flex flex-col size-full">
      <div className="flex items-center justify-between p-3">
        <button
          onClick={handlePrevMonth}
          className="border border-gray-300 rounded-md p-[6px] cursor-pointer"
        >
          <ChevronLeft className="size-5" />
        </button>
        <h2>{format(currentDate, "MMMM yyyy", { locale: es })}</h2>
        <button
          onClick={handleNextMonth}
          className="border border-gray-300 rounded-md p-[6px] cursor-pointer"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      <div className="flex flex-col h-full border-l border-gray-300 overflow-y-auto">
        <div className="grid grid-cols-7">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="text-center border-b border-r border-t border-gray-300 font-medium text-xs py-2"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 h-full">
          {allDaysInCalendar.map((day, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between gap-2 aspect-square border-b border-r border-gray-300 p-2 ${
                !isSameMonth(day, currentDate) ? "bg-[#f8f8fa]" : ""
              } ${isSameDay(day, new Date()) ? "current-day" : ""}`}
            >
              {format(day, "d")}
              {periodicities.map((periodicity, idx) => {
                const periodicityDate = new Date(periodicity.date);
                return (
                  (isSameDay(periodicityDate, day) ||
                    (isMaintenanceDue(periodicityDate, day, periodicity.periodicity) &&
                      getDate(periodicityDate) === getDate(day))) && (
                    <div
                      key={idx}
                      onClick={() => {
                        handleModal(
                          verification({ ...periodicity, date: format(day, "yyyy-MM-dd") }),
                          day,
                          periodicity
                        );
                      }}
                      className={`flex flex-col gap-3 w-full bg-white border border-primary rounded-md text-xs p-2 select-none ${
                        !verification({ ...periodicity, date: format(day, "yyyy-MM-dd") }) &&
                        "hover:bg-secondary"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Wrench className="size-4" />
                        {verification({ ...periodicity, date: format(day, "yyyy-MM-dd") }) ? (
                          <div className="size-2 bg-green-400 rounded-full"></div>
                        ) : (
                          <div className="size-2 bg-red-400 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <p>{periodicity.name}</p>
                        <p>{periodicity.description}</p>
                        <p>{periodicity.type}</p>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
