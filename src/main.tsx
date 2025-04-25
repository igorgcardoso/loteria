import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import { Home } from "./pages";
import { Game } from "./pages/game";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/game",
    Component: Game,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
