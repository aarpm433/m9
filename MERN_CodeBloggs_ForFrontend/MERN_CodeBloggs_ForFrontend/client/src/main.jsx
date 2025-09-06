import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from "react-cookie"; // <-- Import this!
import './index.css';
import App from './App.jsx';
import Login from "./components/Login.jsx";
import Register from './components/Register.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider> {/* <-- Wrap everything inside this */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<div>Settings Page (to be implemented)</div>} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  </StrictMode>
);