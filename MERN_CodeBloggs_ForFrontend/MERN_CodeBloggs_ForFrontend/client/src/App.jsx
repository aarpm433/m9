import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SideNav";

const App = () => (
  <div className="d-flex flex-column vh-100">
    {/* Top Navbar */}
    <Navbar />

    <div className="d-flex flex-grow-1 overflow-hidden">
      {/* Sidebar */}
      <aside className="bg-light border-end" style={{ width: "16rem" }}>
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4 overflow-auto bg-light">
        <Outlet />
      </main>
    </div>
  </div>
);

export default App;
