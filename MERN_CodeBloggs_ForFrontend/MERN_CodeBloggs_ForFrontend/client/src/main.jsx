import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import Bloggs from "./components/Bloggs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "home", element: <Home /> }, // ✅ no need for leading slash
      { path: "settings", element: <h1>balls</h1> },
      {path: "bloggs", element: <Bloggs /> },
      {path: "Network", element: <div>Network Page (to be implemented)</div>},
      {path: "Admin", element: <div>Admin Page (to be implemented)</div>},
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />, // ✅ component must be capitalized
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
);
