import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { ContextProvider } from "./components/context/Context";
import "./assets/css/index.css";

import Login from "./pages/Login";
import AuthValidate from "./components/validate/AuthValidate";

import Platform from "./pages/Platform";
import Statistics from "./pages/Statistics";
import Schedule from "./pages/Schedule";

import CreateConsumption from "./components/consumption/forms/CreateConsumption";
import CreatePeriodicity from "./components/maintenance/forms/CreatePeriodicity";

import Boats from "./components/boats/tables/Boats";
import Parts from "./components/parts/tables/Parts";

import Spares from "./components/spares/tables/Spares";

import BoatForm from "./components/inspection/forms/BoatForm";
import PassengerForm from "./components/inspection/forms/PassengerForm";
import AccidentForm from "./components/inspection/forms/AccidentForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <AuthValidate />,
    children: [
      {
        path: "/platform",
        element: <Platform />,
        children: [
          {
            index: true,
            element: <Statistics />,
          },
          {
            path: "boats",
            children: [
              {
                index: true,
                element: <Boats />,
              },
            ],
          },
          {
            path: "parts",
            children: [
              {
                index: true,
                element: <Parts />,
              },
            ],
          },
          {
            path: "maintenance",
            children: [
              {
                path: "create",
                element: <CreatePeriodicity />,
              },
              {
                path: "schedule",
                element: <Schedule />,
              },
            ],
          },
          {
            path: "consumption",
            children: [
              {
                path: "create",
                element: <CreateConsumption />,
              },
            ],
          },
          {
            path: "spares",
            children: [
              {
                index: true,
                element: <Spares />,
              },
            ],
          },
          {
            path: "inspection",
            children: [
              {
                path: "boat",
                element: <BoatForm />,
              },
              {
                path: "passenger",
                element: <PassengerForm />,
              },
              {
                path: "accident",
                element: <AccidentForm />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);
