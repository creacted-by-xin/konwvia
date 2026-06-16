import React, { useRef, useState } from 'react';
import { Button, Tabs } from 'antd';
import { useTabsStore } from '../../store/useTabsStore';
import { useNavigate } from "react-router-dom";

const TabsBar: React.FC = () => {
  const navigate = useNavigate();
    const { tabs, active, addTab, removeTab, setActive } = useTabsStore();

  function onchangeTab (key: string){
    const currentTab = tabs.find(tab=> tab.key === key)

    if(!currentTab) return;

     setActive(key);
    navigate(currentTab.path);
  };

  return (
    <div>
      <Tabs
        hideAdd
        activeKey={active}
        items={tabs}
        onChange={onchangeTab}
      />
    </div>
  );
};

export default TabsBar;