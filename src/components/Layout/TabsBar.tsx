import React from 'react';
import { Tabs } from 'antd';
import { useTabsStore } from '../../store/useTabsStore';
import { useNavigate } from "react-router-dom";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const TabsBar: React.FC = () => {
  const navigate = useNavigate();
  const { tabs, active, setActive, removeTab } = useTabsStore();

  function onchangeTab(key: string) {
    const currentTab = tabs.find(tab => tab.key === key);

    if (!currentTab) return;

    setActive(key);
    navigate(currentTab.path);
  };

  function remove(key: string) {
    const currentTab = tabs.find(tab => tab.key === key);
    const currentTabIndex = tabs.findIndex(tab => tab.key === key);

    if (!currentTab || currentTab.closable === false) return;

    const nextTab = tabs[currentTabIndex - 1];

      // 如果删除的是active标签，跳到上一个
    if (active === key) {
      if (nextTab) {
        setActive(nextTab.key);
        navigate(nextTab.path);
      }
    };

    // 删除该标签
    removeTab(key);
  }

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove') {
      console.log('targetKey', targetKey)
      remove(targetKey as string)
    }
  };

  return (
    <div>
      <Tabs
        hideAdd
        activeKey={active}
        items={tabs}
        onChange={onchangeTab}
        type="editable-card"
        onEdit={onEdit}
      />
    </div>
  );
};

export default TabsBar;