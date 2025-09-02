import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check for existing session token on load
  useEffect(() => {
    const token = localStorage.getItem("session_token");
    if (token) {
      // Optionally validate the token with backend
      fetch(`/validate_token?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok" && data.data.valid) {
            navigate("/"); // redirect if token is valid
          } else {
            localStorage.removeItem("session_token");
            localStorage.removeItem("user");
          }
        })
        .catch(() => {
          localStorage.removeItem("session_token");
          localStorage.removeItem("user");
        });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Login
      const loginRes = await fetch("/session/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const loginData = await loginRes.json();
      if (!loginRes.ok) {
        setError(loginData.error || "Login failed");
        return;
      }

      // Create session
      const sessionRes = await fetch(`/session/${loginData.id}`, {
        method: "POST",
      });
      const sessionData = await sessionRes.json();
      if (!sessionRes.ok) {
        setError(sessionData.message || "Session creation failed");
        return;
      }

      localStorage.setItem("session_token", sessionData.data.token);
      localStorage.setItem("user", JSON.stringify(loginData));

      navigate("/"); // redirect to dashboard/home
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mx-auto" style={{ maxWidth: "400px" }}>
      <h2 className="mb">Login</h2>

      <div className="mb">
        <label htmlFor="email" className="form-label"></label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="mb">
        <label htmlFor="password" className="form-label"></label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your password"
          required
        />
      </div>
    <a href="/register">Don't have an account? Register here.</a>
      {error && <Alert variant="danger">{error}</Alert>}

      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  );
}
