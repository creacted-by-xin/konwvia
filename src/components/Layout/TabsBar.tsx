import React from 'react';
import { Button, Tabs, Tooltip } from 'antd';
import { useTabsStore } from '../../store/useTabsStore';
import { useNavigate } from "react-router-dom";
import { CompressOutlined, ReloadOutlined } from '@ant-design/icons';

// Ant Design Tabs 的 onEdit 会传入鼠标事件、键盘事件或字符串 key，这里统一声明类型。
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const TabsBar: React.FC = () => {
  const navigate = useNavigate();
  const { tabs, active, setActive, removeTab, closeOtherTabs } = useTabsStore();
  // 是否存在“默认标签和当前标签以外”的标签。
  // 这个值用于控制“关闭其他标签”按钮是否可点击：
  // 1. 如果只有 home，按钮禁用。
  // 2. 如果只有 home + 当前标签，按钮也禁用，因为没有“其他标签”需要关闭。
  // 3. 如果还有第三个、第四个标签，按钮才启用。
  const hasOtherClosableTabs = tabs.some(tab => tab.key !== 'home' && tab.key !== active);

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

    // 如果关闭的是当前激活标签，优先回到它左侧的标签。
    if (active === key) {
      if (nextTab) {
        setActive(nextTab.key);
        navigate(nextTab.path);
      }
    };

    removeTab(key);
  }

  // Ant Design editable-card 类型 Tabs 的关闭事件入口。
  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove') {
      remove(targetKey as string)
    }
  };

  // 快速整理工作台：保留默认首页和当前正在查看的标签，关闭其他所有标签。
  const handleCloseOtherTabs = () => {
    // 这里不 navigate("/")，因为需求是保留当前标签并继续停留在当前页面。
    closeOtherTabs(); // 清理掉默认标签和当前标签以外的其他标签。
  };

  return (
    <div className="tabs-shell">
      <Tabs
        hideAdd // 隐藏 antd editable-card 默认的新增按钮，因为项目的 tab 是由页面操作自动添加的。
        activeKey={active} // 当前激活 tab key 来自 store，保证全局同步。
        items={tabs} // tab 列表来自 store，页面进入详情/对话时会向这里添加。
        onChange={onchangeTab} // 点击 tab 时同步切换 store 状态和路由。
        type="editable-card" // 使用可关闭卡片式标签，适合后台多页面工作台。
        onEdit={onEdit} // 点击 tab 的关闭按钮时触发。
      />

      <div className="tabs-actions">
        <Tooltip title="刷新当前页面">
          <Button
            type="text" // 文本按钮更轻，不会抢主操作视觉。
            size="small" 
            icon={<ReloadOutlined />} // 刷新图标，比文字更节省空间。
            onClick={() => window.location.reload()}
          />
        </Tooltip>

        <Tooltip title={hasOtherClosableTabs ? "关闭其他标签" : "当前没有可关闭的其他标签"}>
          <Button
            type="text" // 保持和刷新按钮一致的轻量样式。
            size="small" // 小尺寸让标签栏高度保持稳定。
            className="tabs-action-text" // 文字按钮需要额外样式控制宽度和字号。
            icon={<CompressOutlined />} // 图标表示“收拢/关闭其他”，比纯文字更容易快速识别。
            disabled={!hasOtherClosableTabs} // 没有其他标签可关闭时禁用，避免用户误以为点击无效。
            onClick={handleCloseOtherTabs} // 点击后只清理标签，不改变当前路由。
          >
            关闭其他标签
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default TabsBar;
