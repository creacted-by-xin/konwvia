import { Button, Space, } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useTabsStore } from '../../../store/useTabsStore';

export default function HeaderUserMenu() {
    const navigate = useNavigate();
    const resetTabs = useTabsStore( state => state.resetTabs )

    function handleLogOut() {
        localStorage.removeItem('token')
        resetTabs()
        navigate("/login", { replace: true });
    };

  return (
    <div className='logOut'>
        <div className='useInfo'>
            <Space>
                <UserOutlined />
                <div>用户名</div>
            </Space>
        </div>
        <Button onClick={handleLogOut} danger>退出登录</Button>
    </div>
  )
}
