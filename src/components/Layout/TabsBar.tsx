import React from 'react';
import { Button, Tabs, Tooltip } from 'antd';
import { useTabsStore } from '../../store/useTabsStore';
import { useNavigate } from "react-router-dom";
import { CloseCircleOutlined, ReloadOutlined } from '@ant-design/icons';

// Ant Design Tabs 的 onEdit 会传入鼠标事件、键盘事件或字符串 key，这里统一声明类型。
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const TabsBar: React.FC = () => {
  const navigate = useNavigate();
  const { tabs, active, setActive, removeTab, closeOtherTabs } = useTabsStore();

  // 切换标签时，以 store 中保存的 path 为准，确保点击 tab 与路由跳转保持一致。
  function onchangeTab(key: string) {
    const currentTab = tabs.find(tab => tab.key === key);

    if (!currentTab) return;

    setActive(key);
    navigate(currentTab.path);
  };

  // 删除某个标签页：只允许删除 closable=true 的业务页签，首页不允许删除。
  function remove(key: string) {
    const currentTab = tabs.find(tab => tab.key === key);
    const currentTabIndex = tabs.findIndex(tab => tab.key === key);

    if (!currentTab || currentTab.closable === false) return;

    const nextTab = tabs[currentTabIndex - 1];

    if (active === key) {
      if (nextTab) {
        setActive(nextTab.key);
        navigate(nextTab.path);
      }
    };

    removeTab(key);
  }

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove') {
      remove(targetKey as string)
    }
  };

  // 快速整理工作台：保留首页和当前页签，继续停留在当前页面。
  const handleCloseOtherTabs = () => {
    closeOtherTabs(); 
  };

  return (
    <div className="tabs-shell">
      <Tabs
        hideAdd 
        activeKey={active} 
        items={tabs}
        onChange={onchangeTab} 
        type="editable-card"
        onEdit={onEdit}
      />

      {/* 右侧快捷操作区：用图标按钮减少顶部空间占用。 */}
      <div className="tabs-actions">
        <Tooltip title="刷新当前页面">
          <Button
            type="text" // 文本按钮更轻，不会抢主操作视觉。
            size="small" 
            icon={<ReloadOutlined />} 
            onClick={() => window.location.reload()} 
          />
        </Tooltip>

        <Tooltip title="关闭其他标签">
          <Button
            type="text" // 保持和刷新按钮一致的轻量样式。
            size="small"
            icon={<CloseCircleOutlined />} 
            onClick={handleCloseOtherTabs} 
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default TabsBar;
