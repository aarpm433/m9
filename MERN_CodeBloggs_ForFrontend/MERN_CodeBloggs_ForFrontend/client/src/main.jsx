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
import AdminView from "./components/Admin.jsx";
import Network from "./components/network.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { path: "home", element: <Home /> },
          { path: "settings", element: <h1>under construction</h1> },
          { path: "bloggs", element: <Bloggs /> },
          { path: "network", element: <Network /> },
          { path: "admin", element: <AdminView /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CookiesProvider>
  </React.StrictMode>
);
