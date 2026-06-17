import { Button, Space, } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

export default function HeaderUserMenu() {
    const navigate = useNavigate();

    function handleLogOut() {
        localStorage.removeItem('token')
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
