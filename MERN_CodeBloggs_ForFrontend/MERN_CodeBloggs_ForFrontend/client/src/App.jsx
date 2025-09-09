import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import NavSide from "./components/SideNav";

const App = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex flex-1 min-h-0">
      <aside className="w-64 bg-gray-100 border-r h-full">
        <NavSide />
      </aside>
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50 min-h-0">
        <Outlet />
      </main>
    </div>
  </div>
);

export default App;