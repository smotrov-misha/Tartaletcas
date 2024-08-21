import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root/Root.jsx";
import Menus from "./routes/MenusPage/Menus.jsx";
import History from "./routes/HistoryPage/History.jsx";
import Dishes from "./routes/DishesPage/Dishes.jsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

Amplify.configure(outputs);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "menus",
        element: <Menus />,
      },
      {
        path: "dishes",
        element: <Dishes />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        index: true,
        element: <Navigate to="menus" replace />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
