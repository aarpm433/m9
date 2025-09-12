import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function Sidebar() {
  const [cookies] = useCookies(["user"]);
  let isAdmin = false;

  if (cookies.user) {
    try {
      const userObj = typeof cookies.user === "string" ? JSON.parse(cookies.user) : cookies.user;
      isAdmin = userObj.auth_level === "admin";
    } catch {}
  }

  const linkClass = "btn btn-outline-primary w-100 text-start";
  const activeClass = "btn btn-primary w-100 text-start";

  return (
    <Nav className="d-flex flex-column p-3 vh-100" style={{ gap: "0.5rem", backgroundColor: "#D3D1EE" }}>
      <Nav.Item>
        <NavLink
          to="/home"
          className="btn w-100 text-start"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#403E6B" : "",
            color: isActive ? "white" : "#0d6efd" 
          })}
        >
          Home
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          to="/bloggs"
          className="btn w-100 text-start"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#403E6B" : "",
            color: isActive ? "white" : "#0d6efd" 
          })}
        >
          Bloggs
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          to="/network"
          className="btn w-100 text-start"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#403E6B" : "",
            color: isActive ? "white" : "#0d6efd" 
          })}
        >
          Network
        </NavLink>
      </Nav.Item>
      {isAdmin && (
        <Nav.Item>
          <NavLink
            to="/admin"
            className="btn w-100 text-start"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#403E6B" : "",
              color: isActive ? "white" : "#0d6efd" 
            })}
          >
            Admin
          </NavLink>
        </Nav.Item>
      )}
    </Nav>
  );
}
