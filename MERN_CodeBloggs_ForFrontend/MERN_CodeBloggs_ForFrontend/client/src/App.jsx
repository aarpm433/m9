import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import NavSide from "./components/SideNav";
import Home from "./components/Home";


const App = () => {
  return (
    <div className="w-full p-6">
      <Navbar />
      <Outlet />
      <NavSide />
      <Home />
    </div>
  );
};
export default App;
