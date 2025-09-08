import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import NavSide from "./components/SideNav";
import Home from "./components/Home";


const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <div className="w-64 flex-shrink-0">
          <NavSide />
        </div>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default App;
