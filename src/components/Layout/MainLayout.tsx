import { Outlet } from "react-router-dom";
import Header from "./Header";
import TabsBar from "./TabsBar";
import './MainLayout.css'

function MainLayout() {
  return <div className="main-layout">
    <div className="main-layout-top">
      <Header />
      <TabsBar />
    </div>
    <div className="main-layout-content">
      <Outlet />
    </div>
  </div>
};

export default MainLayout;