import { Outlet } from "react-router-dom";
import Header from "./Header";
import TabsBar from "./TabsBar";

function MainLayout() {
  return <div style={{height: '100vh'}}>
    <Header />
    <div className="content" style={{padding: '0 20px'}}>
      <TabsBar />
      <Outlet />
    </div>
  </div>
};

export default MainLayout;