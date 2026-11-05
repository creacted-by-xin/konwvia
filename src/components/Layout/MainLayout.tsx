import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTabsStore } from "../../store/useTabsStore";
import Header from "./Header";
import TabsBar from "./TabsBar";
import './MainLayout.css'

function MainLayout() {
  const { pathname, search } = useLocation();
  const tabs = useTabsStore(state => state.tabs);
  const active = useTabsStore(state => state.active);
  const setActive = useTabsStore(state => state.setActive);


  // tabsStore 中的 activeKey 需要与路由保持一致，确保刷新页面时，当前 tab 与路由匹配。
  useEffect(() => {
    // 首页
    const isFirstPage = pathname === '/' || pathname === '/knowledge-bases';
    // 判断是否首页tab，拿到对应的tab对象
    const currentTab = isFirstPage ? tabs.find(tab => tab.key === 'home')
      : tabs.find(tab => tab.path === pathname + search);
    // 没找到不处理
    if (!currentTab) return;
    // 如果当前页签不是 activeKey，则更新 activeKey
    if(currentTab.key !== active) {
      setActive(currentTab.key);
    }

  }, [pathname, search, tabs, active, setActive]);

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