import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";
import './index.css';
import App from './App.jsx';
import Login from "./components/Login.jsx";
import Register from './components/Register.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Home />} />
            <Route path="settings" element={<div>Settings Page (to be implemented)</div>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  </StrictMode>
);