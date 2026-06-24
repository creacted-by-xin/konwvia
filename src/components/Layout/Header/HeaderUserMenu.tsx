import { Button, Space, Tag } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useTabsStore } from '../../../store/useTabsStore';

export default function HeaderUserMenu() {
    const navigate = useNavigate();
    const resetTabs = useTabsStore(state => state.resetTabs);

    // 退出时同时清理登录态和页面标签，避免下一次登录继续停留在旧页面。
    function handleLogOut() {
        localStorage.removeItem('token'); 
        resetTabs(); 
        navigate("/login", { replace: true }); // 跳到登录页，replace 防止浏览器后退直接回到受保护页面。
    };

  return (
    <div className='logOut'>
        <div className='useInfo'>
            <Space>
                <span className="menu-avatar">
                    <UserOutlined />
                </span>
                <div>
                    <div className="menu-name">用户名</div>
                    <Tag color="processing">管理员</Tag>
                </div>
            </Space>
        </div>

        {/* block 让退出按钮占满弹层宽度，点击区域更明确。 */}
        <Button icon={<LogoutOutlined />} onClick={handleLogOut} danger block>
            退出登录
        </Button>
    </div>
  )
}
