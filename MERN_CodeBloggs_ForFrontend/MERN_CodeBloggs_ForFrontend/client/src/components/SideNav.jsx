import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [cookies] = useCookies(["user"]);
  let isAdmin = false;
  if (cookies.user) {
    try {
      const userObj = typeof cookies.user === "string" ? JSON.parse(cookies.user) : cookies.user;
      isAdmin = userObj.auth_level === "admin";
    } catch {}
  }

  const linkClass =
    "btn btn-outline";
  const activeClass = "btn btn-primary";

  return (
    <nav className="flex flex-col h-full p-4 space-y-2">
      <ul className="flex-1 space-y-4">
        <li>
          <NavLink
            to="/home"
            className={({ isActive}) =>
              isActive ? `${linkClass} ${activeClass}` : linkClass
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bloggs"
            className={({ isActive }) =>
              isActive ? `${linkClass} ${activeClass}` : linkClass
            }
          >
            Bloggs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Network"
            className={({ isActive }) =>
              isActive ? `${linkClass} ${activeClass}` : linkClass
            }
          >
            Network
          </NavLink>
        </li>
        {isAdmin && (
          <li>
            <NavLink
              to="/Admin"
              className={({ isActive }) =>
                isActive ? `${linkClass} ${activeClass}` : linkClass
              }
            >
              Admin
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}